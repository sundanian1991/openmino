#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""SOAP helpers for JoyMail/EWS-style mail querying."""

from __future__ import annotations

import json
import os
import sys
import base64
from pathlib import Path
from dataclasses import dataclass
from datetime import datetime, timedelta, timezone
from typing import Any, Optional
from xml.etree import ElementTree as ET
from xml.sax.saxutils import escape

import requests

try:
    import truststore

    truststore.inject_into_ssl()
except Exception:
    pass

try:
    from zoneinfo import ZoneInfo
except ImportError:  # pragma: no cover
    ZoneInfo = None  # type: ignore

NS = {
    "soap": "http://schemas.xmlsoap.org/soap/envelope/",
    "m": "http://schemas.microsoft.com/exchange/services/2006/messages",
    "t": "http://schemas.microsoft.com/exchange/services/2006/types",
}

DEFAULT_ENDPOINT = "https://mail-skill.jd.com/mail/api/clawmail/mailpost"
DEFAULT_LOGIN_URL = "http://joymail-skill.jd.com/sso/clawJwtLogin"
DEFAULT_ERP_QUERY_URL = "http://joymail-skill.jd.com/hr/user/queryByErp"
DEFAULT_TIMEOUT = 30
DEFAULT_SERVER_VERSION = "Exchange2016"
DEFAULT_TOKEN_CACHE_PATH = "/tmp/mail-token.json"
DEFAULT_LOGIN_RETRY_TIMES = 3
DEFAULT_MAILPOST_401_RETRY_TIMES = 3
DEFAULT_FALLBACK_TZ_NAME = "Asia/Shanghai"

DISTINGUISHED_FOLDERS = {
    "inbox": "inbox",
    "sent": "sentitems",
    "sentitems": "sentitems",
    "draft": "drafts",
    "drafts": "drafts",
    "deleted": "deleteditems",
    "deleteditems": "deleteditems",
    "junk": "junkemail",
    "junkemail": "junkemail",
    "archive": "archiveinbox",
    "msgfolderroot": "msgfolderroot",
    "root": "msgfolderroot",
}


class SoapMailError(Exception):
    pass


@dataclass
class MailSearchFilters:
    sender: str = ""
    recipient: str = ""
    subject: str = ""
    body_keyword: str = ""
    after: str = ""
    before: str = ""
    unread_only: bool = False
    read_only: bool = False
    has_attachments: bool = False
    category: str = ""
    importance: str = ""


def _token_cache_path() -> str:
    return os.environ.get("MAIL_TOKEN_CACHE_PATH") or os.environ.get("JOYMAIL_SOAP_TOKEN_CACHE_PATH", DEFAULT_TOKEN_CACHE_PATH)


def _login_url() -> str:
    return os.environ.get("MAIL_LOGIN_URL") or os.environ.get("JOYMAIL_SOAP_LOGIN_URL", DEFAULT_LOGIN_URL)


def _erp_query_url() -> str:
    return os.environ.get("MAIL_ERP_QUERY_URL") or DEFAULT_ERP_QUERY_URL


def _fallback_tz():
    if ZoneInfo is not None:
        try:
            return ZoneInfo(DEFAULT_FALLBACK_TZ_NAME)
        except Exception:
            pass
    return timezone(timedelta(hours=8))


def _effective_local_tz():
    local_tz = datetime.now().astimezone().tzinfo
    if local_tz is not None and local_tz.utcoffset(datetime.now()) is not None:
        return local_tz
    return _fallback_tz()


def local_now() -> datetime:
    return datetime.now(_effective_local_tz())


def _safe_text(value: Optional[str]) -> str:
    return (value or "").strip()


def _dedupe_preserve_order(values: list[str]) -> list[str]:
    seen: set[str] = set()
    result: list[str] = []
    for value in values:
        normalized = value.strip()
        if not normalized:
            continue
        key = normalized.lower()
        if key in seen:
            continue
        seen.add(key)
        result.append(normalized)
    return result


def _bool_text(value: Optional[str]) -> bool:
    return _safe_text(value).lower() == "true"


def _parse_dt(value: Optional[str]) -> Optional[datetime]:
    raw = _safe_text(value)
    if not raw:
        return None
    try:
        dt = datetime.fromisoformat(raw.replace("Z", "+00:00"))
        if dt.tzinfo is None:
            dt = dt.replace(tzinfo=_effective_local_tz())
        return dt.astimezone(_effective_local_tz())
    except ValueError:
        return None


def _parse_expire_dt(value: Optional[str]) -> Optional[datetime]:
    raw = _safe_text(value)
    if not raw:
        return None
    try:
        naive = datetime.strptime(raw, "%Y-%m-%d %H:%M:%S")
        return naive.replace(tzinfo=_effective_local_tz())
    except ValueError:
        return None


def _to_system_tz_string(value: Optional[str]) -> str:
    dt = _parse_dt(value)
    if dt is None:
        return _safe_text(value)
    return dt.astimezone(_effective_local_tz()).isoformat(timespec="seconds")


def _has_explicit_time(value: str) -> bool:
    raw = _safe_text(value)
    return ":" in raw


def _parse_date_boundary(value: str, end_of_day: bool = False) -> Optional[datetime]:
    raw = _safe_text(value)
    if not raw:
        return None

    dt: Optional[datetime] = None

    try:
        normalized = raw.replace(" ", "T")
        if normalized.endswith("Z"):
            normalized = normalized[:-1] + "+00:00"
        dt = datetime.fromisoformat(normalized)
    except ValueError:
        dt = None

    if dt is None:
        try:
            dt = datetime.strptime(raw, "%Y-%m-%d")
        except ValueError:
            return None

    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=_effective_local_tz())
    else:
        dt = dt.astimezone(_effective_local_tz())

    if end_of_day and not _has_explicit_time(raw):
        dt = dt + timedelta(days=1) - timedelta(microseconds=1)

    return dt


def _to_ews_utc_string(dt: datetime) -> str:
    return dt.astimezone(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def _build_received_time_restriction_xml(after: str = "", before: str = "") -> str:
    after_raw = _safe_text(after)
    before_raw = _safe_text(before)

    after_dt = _parse_date_boundary(after_raw, end_of_day=False) if after_raw else None
    before_dt = _parse_date_boundary(before_raw, end_of_day=True) if before_raw else None

    if after_raw and after_dt is None:
        raise SoapMailError("invalid --after format, expected YYYY-MM-DD or YYYY-MM-DD HH:MM:SS")
    if before_raw and before_dt is None:
        raise SoapMailError("invalid --before format, expected YYYY-MM-DD or YYYY-MM-DD HH:MM:SS")

    conditions: list[str] = []
    if after_dt is not None:
        conditions.append(
            "<t:IsGreaterThanOrEqualTo>"
            '<t:FieldURI FieldURI="item:DateTimeReceived" />'
            "<t:FieldURIOrConstant>"
            f'<t:Constant Value="{escape(_to_ews_utc_string(after_dt))}" />'
            "</t:FieldURIOrConstant>"
            "</t:IsGreaterThanOrEqualTo>"
        )
    if before_dt is not None:
        conditions.append(
            "<t:IsLessThanOrEqualTo>"
            '<t:FieldURI FieldURI="item:DateTimeReceived" />'
            "<t:FieldURIOrConstant>"
            f'<t:Constant Value="{escape(_to_ews_utc_string(before_dt))}" />'
            "</t:FieldURIOrConstant>"
            "</t:IsLessThanOrEqualTo>"
        )

    if not conditions:
        return ""

    if len(conditions) == 1:
        return f"<m:Restriction>{conditions[0]}</m:Restriction>"

    return f"<m:Restriction><t:And>{''.join(conditions)}</t:And></m:Restriction>"


def _contains(haystack: str, needle: str) -> bool:
    return needle.lower() in haystack.lower()


def _mailbox(node: Optional[ET.Element]) -> dict[str, str]:
    if node is None:
        return {"name": "", "email": ""}
    return {
        "name": _safe_text(node.findtext("t:Name", default="", namespaces=NS)),
        "email": _safe_text(node.findtext("t:EmailAddress", default="", namespaces=NS)),
    }


def _mailboxes(parent: Optional[ET.Element]) -> list[dict[str, str]]:
    if parent is None:
        return []
    return [_mailbox(node) for node in parent.findall("t:Mailbox", NS)]


def _mailbox_to_wire(box: dict[str, str]) -> str:
    email = _safe_text(box.get("email"))
    name = _safe_text(box.get("name")) or email
    return f"{email}|{name}" if email else ""


def _mailboxes_to_wire(mailboxes: list[dict[str, str]]) -> str:
    return "*".join(filter(None, [_mailbox_to_wire(box) for box in mailboxes]))


def _parse_token_user_id(token: str) -> str:
    try:
        parts = token.split(".")
        if len(parts) < 2:
            return ""
        payload = json.loads(base64.b64decode(parts[1] + "==").decode("utf-8", errors="replace"))
        for field in ("UserId", "email", "sub", "userId", "user_id"):
            value = str(payload.get(field, "")).strip()
            if "@" in value:
                return value
    except Exception:
        return ""
    return ""


def _read_windows_me_cookie_token() -> str:
    """从 Windows 京 ME Electron Cookie DB 读取 me_token。

    京 ME Windows 客户端的 me_token 通常保存在：
    %APPDATA%\\ME\\Network\\Cookies，且当前版本在 cookies.value 字段中
    以明文形式保存。为兼容后续 Chromium 加密格式，这里也支持 DPAPI / v10 AES-GCM
    encrypted_value 解密。失败时静默返回空字符串。
    """
    if sys.platform != "win32":
        return ""
    try:
        import sqlite3
        import ctypes
        from ctypes import wintypes
    except ImportError:
        return ""

    class _DataBlob(ctypes.Structure):
        _fields_ = [("cbData", wintypes.DWORD), ("pbData", ctypes.POINTER(ctypes.c_char))]

    def _dpapi_unprotect(data: bytes) -> bytes:
        in_buf = ctypes.create_string_buffer(data)
        in_blob = _DataBlob(len(data), ctypes.cast(in_buf, ctypes.POINTER(ctypes.c_char)))
        out_blob = _DataBlob()
        ok = ctypes.windll.crypt32.CryptUnprotectData(
            ctypes.byref(in_blob), None, None, None, None, 0, ctypes.byref(out_blob)
        )
        if not ok:
            return b""
        try:
            return ctypes.string_at(out_blob.pbData, out_blob.cbData)
        finally:
            ctypes.windll.kernel32.LocalFree(out_blob.pbData)

    def _read_local_state_key(local_state_path: str) -> bytes:
        try:
            with open(local_state_path, "r", encoding="utf-8") as fh:
                data = json.load(fh)
            encrypted_key = _safe_text((data.get("os_crypt") or {}).get("encrypted_key"))
            if not encrypted_key:
                return b""
            raw = base64.b64decode(encrypted_key)
            if raw.startswith(b"DPAPI"):
                raw = raw[5:]
            return _dpapi_unprotect(raw)
        except Exception:
            return b""

    def _decrypt_cookie_value(encrypted_value: bytes, key: bytes) -> str:
        if not encrypted_value:
            return ""
        try:
            if (encrypted_value.startswith(b"v10") or encrypted_value.startswith(b"v11")) and key:
                from cryptography.hazmat.primitives.ciphers.aead import AESGCM

                plaintext = AESGCM(key).decrypt(encrypted_value[3:15], encrypted_value[15:], None)
            else:
                plaintext = _dpapi_unprotect(encrypted_value)
            return plaintext.decode("utf-8", errors="ignore").strip()
        except Exception:
            return ""

    appdata = os.environ.get("APPDATA") or os.path.expanduser("~/AppData/Roaming")
    candidates = [
        os.path.join(appdata, "ME", "Network", "Cookies"),
        os.path.join(appdata, "Relay", "Electron", "Network", "Cookies"),
        os.path.join(appdata, "Relay", "Electron", "Partitions", "zerocode-embedded-browser", "Network", "Cookies"),
    ]
    for cookie_db in candidates:
        if not os.path.exists(cookie_db):
            continue
        try:
            uri = "file:///" + cookie_db.replace("\\", "/") + "?mode=ro&immutable=1"
            conn = sqlite3.connect(uri, uri=True, timeout=1)
            rows = conn.execute(
                "SELECT host_key, value, encrypted_value FROM cookies "
                "WHERE name='me_token' AND host_key LIKE '%.jd.com' LIMIT 3"
            ).fetchall()
            conn.close()
        except Exception:
            continue
        if not rows:
            continue
        local_state = os.path.join(os.path.dirname(os.path.dirname(cookie_db)), "Local State")
        key = _read_local_state_key(local_state)
        for _host, value, encrypted_value in rows:
            token = _safe_text(value)
            if not token and encrypted_value:
                token = _decrypt_cookie_value(encrypted_value, key)
            if token:
                return token
    return ""


def _read_relay_cookie_me_token() -> str:
    """从 Relay/Zero/JD Electron Cookie DB 中读取 me_token。

    Windows 优先读取京 ME Cookie DB；macOS 保留原 Relay 内嵌浏览器 Cookie DB 解密逻辑。
    失败时静默返回空字符串。
    """
    if sys.platform == "win32":
        return _read_windows_me_cookie_token()
    if sys.platform != "darwin":
        return ""
    try:
        import sqlite3
        import hashlib
        import subprocess as _sp
    except ImportError:
        return ""

    # 1. 从 Keychain 读取加密密钥（timeout 延长至 30s 以应对权限弹窗）
    try:
        r = _sp.run(
            ["security", "find-generic-password", "-s", "Relay Safe Storage", "-w"],
            capture_output=True, text=True, timeout=30,
        )
        if r.returncode != 0 or not r.stdout.strip():
            return ""
        keychain_pass = r.stdout.strip()
    except Exception:
        return ""

    # 2. 打开 Cookie DB（只读）
    cookie_db = os.path.expanduser(
        "~/Library/Application Support/Relay/Electron"
        "/Partitions/zerocode-embedded-browser/Cookies"
    )
    if not os.path.exists(cookie_db):
        return ""
    try:
        conn = sqlite3.connect(f"file:{cookie_db}?mode=ro", uri=True)
        cur = conn.execute(
            "SELECT encrypted_value FROM cookies "
            "WHERE name='me_token' AND host_key LIKE '%.jd.com' LIMIT 1"
        )
        row = cur.fetchone()
        conn.close()
        if not row:
            return ""
        enc: bytes = row[0]
    except Exception:
        return ""

    # 3. 解密（尝试 AES-128-CBC，Relay v10- 格式）
    if not isinstance(enc, bytes) or not enc.startswith(b"v10-"):
        return ""
    try:
        from Crypto.Cipher import AES  # pycryptodome

        dk = hashlib.pbkdf2_hmac("sha1", keychain_pass.encode(), b"saltysalt", 1003, dklen=16)
        iv = b" " * 16
        ct = enc[4:]  # strip 'v10-'
        if len(ct) % 16 != 0:
            ct = ct + b"\x00" * (16 - len(ct) % 16)
        cipher = AES.new(dk, AES.MODE_CBC, iv)
        dec = cipher.decrypt(ct)
        pad = dec[-1]
        if 0 < pad <= 16:
            dec = dec[:-pad]
        token = dec.decode("utf-8", errors="replace").strip()
        if token and token.isascii() and len(token) > 10:
            return token
    except Exception:
        pass
    return ""


def get_sso_token() -> str:
    """解析可用于 clawJwtLogin 的 SSO token（SSA 企业 SSO cookie）。

    注意：ME_TOKEN 虽然也在这里检查，但它实际上无法通过 clawJwtLogin 鉴权。
    ME_TOKEN 的真正用途是走 Color Gateway 路径（见 _fetch_token_via_color_gateway）。
    这里保留 ME_TOKEN 检查是为了兼容 JoyClaw 等场景下 ME_TOKEN 同时可作为 SSO token 使用的情况。
    """
    sso_token = _safe_text(os.environ.get("SSO_TOKEN"))
    if sso_token:
        return sso_token

    me_token = _safe_text(os.environ.get("ME_TOKEN"))
    if not me_token:
        me_token = _safe_text(os.environ.get("SO_TOKEN"))
    if me_token:
        return me_token

    config_path = os.path.expanduser("~/.joyclaw/openclaw.json")
    try:
        with open(config_path, "r", encoding="utf-8") as fh:
            config = json.load(fh)
        cookie = (
            config.get("models", {})
            .get("providers", {})
            .get("jdcloud", {})
            .get("headers", {})
            .get("Cookie", "")
        )
        if "me_token=" in cookie:
            extracted = cookie.split("me_token=", 1)[1].split(";", 1)[0].strip()
            if extracted:
                return extracted
    except Exception:
        pass

    # Fallback：从 Relay/Zero Electron 内嵌浏览器 Cookie DB 中读取 me_token
    relay_token = _read_relay_cookie_me_token()
    if relay_token:
        return relay_token

    for var_name in ("AUTH_TOKEN", "ACCESS_TOKEN", "TOKEN"):
        token = _safe_text(os.environ.get(var_name))
        if token:
            return token
    return ""


def _load_cached_token_record() -> Optional[dict[str, Any]]:
    cache_path = _token_cache_path()
    try:
        if not os.path.exists(cache_path):
            return None
        with open(cache_path, "r", encoding="utf-8") as fh:
            data = json.load(fh)
        if not isinstance(data, dict):
            return None
        return data
    except Exception:
        return None


def _save_cached_token_record(record: dict[str, Any]) -> None:
    cache_path = _token_cache_path()
    os.makedirs(os.path.dirname(cache_path), exist_ok=True)
    with open(cache_path, "w", encoding="utf-8") as fh:
        json.dump(record, fh, ensure_ascii=False, indent=2)


def _is_cached_token_valid(record: Optional[dict[str, Any]]) -> bool:
    if not record:
        return False
    token = _safe_text(record.get("token"))
    expire = _parse_expire_dt(record.get("expire"))
    if not token or expire is None:
        return False
    return local_now() < expire


def _fetch_token_via_color_gateway() -> dict[str, Any]:
    """通过京ME 的 me_token 走 Color Gateway 获取邮件 JWT。

    这条路径绕过 SSA 企业 SSO，使用 api.m.jd.com 的 joymail.authentication
    接口直接获取 token。需要环境变量 ME_TOKEN（由 Zero Desktop App 从京ME
    桌面端 Cookie 中自动读取并注入）。
    """
    me_token = _safe_text(os.environ.get("ME_TOKEN"))
    if not me_token:
        # 主进程未注入 ME_TOKEN 时，尝试从 Relay 内嵌浏览器 Cookie DB 中读取
        me_token = _read_relay_cookie_me_token()
        if me_token:
            os.environ["ME_TOKEN"] = me_token
    if not me_token:
        raise SoapMailError("ME_TOKEN not available for Color Gateway auth")

    try:
        from get_mailtoken import fetch_mail_token
    except ImportError:
        raise SoapMailError("get_mailtoken module not found; Color Gateway auth unavailable")

    token = fetch_mail_token()
    if not token:
        raise SoapMailError("Color Gateway returned empty mail token")

    # Color Gateway 不返回 expire，设置一个保守的 23 小时有效期
    expire_dt = local_now() + timedelta(hours=23)
    record = {
        "token": token,
        "expire": expire_dt.strftime("%Y-%m-%d %H:%M:%S"),
        "fetched_at": local_now().isoformat(timespec="seconds"),
        "source": "color_gateway",
    }
    _save_cached_token_record(record)
    return record


def _fetch_login_token_record() -> dict[str, Any]:
    """获取邮件 JWT token。

    优先走 clawJwtLogin（SSA SSO），失败时自动 fallback 到
    Color Gateway（京ME me_token）路径。
    """
    # ---- 路径 1：clawJwtLogin（需要 SSA 企业 SSO cookie） ----
    sso_token = get_sso_token()
    claw_error: Optional[Exception] = None
    if sso_token:
        url = _login_url()
        last_error: Optional[Exception] = None
        for _ in range(DEFAULT_LOGIN_RETRY_TIMES):
            try:
                response = requests.post(
                    url,
                    headers={
                        "cookie": f"sso.jd.com={sso_token}",
                        "accept": "application/json, text/plain, */*",
                    },
                    timeout=DEFAULT_TIMEOUT,
                )
                # clawJwtLogin 在 SSO 无效时返回 302 重定向而非 JSON，
                # 检测到重定向视为鉴权失败，跳到 fallback。
                if response.status_code in (301, 302):
                    claw_error = SoapMailError(
                        f"clawJwtLogin returned redirect ({response.status_code}), SSO token likely invalid"
                    )
                    break
                response.raise_for_status()
                try:
                    payload = response.json()
                except json.JSONDecodeError as exc:
                    raise SoapMailError(f"token login api did not return JSON: {exc}") from exc

                if str(payload.get("code")) != "0":
                    raise SoapMailError(
                        f"token login api failed: code={payload.get('code')} msg={payload.get('msg')}"
                    )
                data = payload.get("data") or {}
                token = _safe_text(data.get("token"))
                expire = _safe_text(data.get("expire"))
                if not token or not expire:
                    raise SoapMailError("token login api returned empty token or expire")
                record = {
                    "token": token,
                    "expire": expire,
                    "fetched_at": local_now().isoformat(timespec="seconds"),
                    "source": url,
                }
                _save_cached_token_record(record)
                return record
            except Exception as exc:
                last_error = exc
                continue
        if claw_error is None:
            claw_error = last_error

    # ---- 路径 2：Color Gateway fallback（需要京ME 的 me_token） ----
    # ME_TOKEN 可能由主进程注入，也可能在 _fetch_token_via_color_gateway 内部
    # 通过 _read_relay_cookie_me_token() 从 Relay Cookie DB 读取。
    me_token = _safe_text(os.environ.get("ME_TOKEN")) or _read_relay_cookie_me_token()
    if me_token:
        try:
            return _fetch_token_via_color_gateway()
        except Exception:
            pass  # 两条路都失败，下面抛最终错误

    # ---- 两条路都不可用 ----
    if claw_error:
        raise SoapMailError(f"邮件鉴权失败: {claw_error}")
    raise SoapMailError(
        "无法获取邮件鉴权 token：未找到 SSO_TOKEN 或 ME_TOKEN。\n"
        "请确保已登录京ME 桌面端，或设置 SSO_TOKEN 环境变量。"
    )


def get_valid_auth_token(force_refresh: bool = False) -> str:
    manual = _safe_text(os.environ.get("MAIL_AUTH_TOKEN")) or _safe_text(os.environ.get("JOYMAIL_SOAP_AUTH_TOKEN"))
    if manual and not force_refresh:
        return manual
    if not force_refresh:
        cached = _load_cached_token_record()
        if _is_cached_token_valid(cached):
            return _safe_text(cached.get("token"))
    refreshed = _fetch_login_token_record()
    return _safe_text(refreshed.get("token"))


def query_users_by_erp(
    *,
    condition: str,
    page_no: int = 1,
    page_size: int = 10,
    timeout: int = DEFAULT_TIMEOUT,
) -> dict[str, Any]:
    sso_token = get_sso_token()
    if not sso_token:
        raise SoapMailError("unable to resolve sso_token for hr user query")

    response = requests.post(
        _erp_query_url(),
        json={
            "condition": condition,
            "pageNo": page_no,
            "pageSize": page_size,
        },
        headers={
            "Content-Type": "application/json",
            "accept": "application/json, text/plain, */*",
            "cookie": f"sso.jd.com={sso_token}",
        },
        timeout=timeout,
    )
    response.raise_for_status()
    try:
        payload = response.json()
    except json.JSONDecodeError as exc:
        raise SoapMailError(f"erp query api did not return JSON: {exc}") from exc

    if str(payload.get("code")) != "0":
        raise SoapMailError(f"erp query api failed: code={payload.get('code')} msg={payload.get('msg')}")

    data = payload.get("data") or {}
    user_list = data.get("userList") or []
    users = [
        {
            "erp": _safe_text(user.get("erp")),
            "email": _safe_text(user.get("email")),
            "real_name": _safe_text(user.get("realName")),
            "department": _safe_text(user.get("department")),
        }
        for user in user_list
    ]

    result = {
        "success": True,
        "condition": condition,
        "page_no": int(data.get("pageNo") or page_no),
        "page_size": int(data.get("pageSize") or page_size),
        "total_count": int(data.get("totalCount") or len(users)),
        "matched_count": len(users),
        "users": users,
        "selection_required": len(users) != 1,
        "confirm_ready": len(users) == 1,
    }
    if len(users) == 1:
        result["selected_user"] = users[0]
    return result


def query_recent_mail_contacts(
    *,
    condition: str,
    endpoint: str = "",
    token: str = "",
    days: int = 30,
    page_size: int = 100,
    max_pages: int = 10,
) -> dict[str, Any]:
    after = (local_now() - timedelta(days=days)).strftime("%Y-%m-%d")
    inbox = search_mail(
        endpoint=endpoint,
        token=token,
        distinguished_folder="inbox",
        max_entries=page_size,
        max_pages=max_pages,
        filters=MailSearchFilters(after=after),
        folder_label="inbox",
    )
    sent = search_mail(
        endpoint=endpoint,
        token=token,
        distinguished_folder="sentitems",
        max_entries=page_size,
        max_pages=max_pages,
        filters=MailSearchFilters(after=after),
        folder_label="sentitems",
    )

    candidates: list[dict[str, Any]] = []
    seen: set[str] = set()

    def maybe_add_contact(name: str, email: str, folder: str) -> None:
        name = _safe_text(name)
        email = _safe_text(email)
        if not email and not name:
            return
        haystack = f"{name} {email}".lower()
        if _safe_text(condition).lower() not in haystack:
            return
        dedupe_key = (email or name).lower()
        if dedupe_key in seen:
            return
        seen.add(dedupe_key)
        candidates.append(
            {
                "erp": "",
                "email": email,
                "real_name": name,
                "department": "",
                "source": f"recent_{folder}",
            }
        )

    for item in inbox["items"] + sent["items"]:
        sender = item.get("from") or item.get("sender") or {}
        maybe_add_contact(sender.get("name", ""), sender.get("email", ""), item.get("folder", "mail"))
        for box in item.get("to_recipients", []) or []:
            maybe_add_contact(box.get("name", ""), box.get("email", ""), item.get("folder", "mail"))
        for box in item.get("cc_recipients", []) or []:
            maybe_add_contact(box.get("name", ""), box.get("email", ""), item.get("folder", "mail"))

    result = {
        "success": True,
        "condition": condition,
        "page_no": 1,
        "page_size": len(candidates),
        "total_count": len(candidates),
        "matched_count": len(candidates),
        "users": candidates,
        "selection_required": len(candidates) != 1,
        "confirm_ready": len(candidates) == 1,
        "source": "recent_mail_contacts",
    }
    if len(candidates) == 1:
        result["selected_user"] = candidates[0]
    return result


def resolve_recipient_candidates(
    *,
    condition: str,
    page_no: int = 1,
    page_size: int = 10,
    endpoint: str = "",
    token: str = "",
    prefer_recent_contacts: bool = False,
) -> dict[str, Any]:
    if prefer_recent_contacts:
        recent = query_recent_mail_contacts(
            condition=condition,
            endpoint=endpoint,
            token=token,
        )
        if recent.get("matched_count", 0) > 0:
            return recent
    hr = query_users_by_erp(condition=condition, page_no=page_no, page_size=page_size)
    hr["source"] = "hr_query"
    return hr


def _folder_ref_xml(folder_id: str = "", distinguished: str = "") -> str:
    if folder_id:
        return f'<t:FolderId Id="{escape(folder_id)}" />'
    key = DISTINGUISHED_FOLDERS.get(distinguished.lower(), distinguished or "inbox")
    return f'<t:DistinguishedFolderId Id="{escape(key)}" />'


def _item_ref_xml(item_id: str) -> str:
    return f'<t:ItemId Id="{escape(item_id)}" />'


def _wrap_soap(body: str, server_version: str = "") -> str:
    effective_server_version = server_version or os.environ.get("JOYMAIL_SOAP_SERVER_VERSION", DEFAULT_SERVER_VERSION)
    return (
        '<?xml version="1.0" encoding="utf-8"?>'
        '<soap:Envelope '
        'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" '
        'xmlns:m="http://schemas.microsoft.com/exchange/services/2006/messages" '
        'xmlns:t="http://schemas.microsoft.com/exchange/services/2006/types" '
        'xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'
        "<soap:Header>"
        f'<t:RequestServerVersion Version="{escape(effective_server_version)}" />'
        "</soap:Header>"
        f"<soap:Body>{body}</soap:Body>"
        "</soap:Envelope>"
    )


def _default_headers(token: str = "", endpoint: str = "") -> dict[str, str]:
    headers: dict[str, str] = {
        "Content-Type": os.environ.get("JOYMAIL_SOAP_CONTENT_TYPE", "application/json"),
        "Accept": "text/xml, application/xml, application/json",
    }
    effective_token = token
    if "mailpost" in (endpoint or DEFAULT_ENDPOINT):
        effective_token = effective_token or get_valid_auth_token()
    if effective_token:
        headers["auth"] = effective_token
        headers["Authorization"] = f"Bearer {effective_token}"
    extra = _safe_text(os.environ.get("JOYMAIL_SOAP_HEADERS_JSON"))
    if extra:
        try:
            parsed = json.loads(extra)
            if isinstance(parsed, dict):
                headers.update({str(k): str(v) for k, v in parsed.items()})
        except json.JSONDecodeError as exc:
            raise SoapMailError(f"JOYMAIL_SOAP_HEADERS_JSON is not valid JSON: {exc}") from exc
    return headers


def send_soap_request(xml_body: str, endpoint: str = "", token: str = "", timeout: int = DEFAULT_TIMEOUT) -> ET.Element:
    target = endpoint or os.environ.get("JOYMAIL_SOAP_ENDPOINT", DEFAULT_ENDPOINT)
    effective_token = token
    refresh_attempts = 0
    while True:
        try:
            response = requests.post(
                target,
                data=xml_body.encode("utf-8"),
                headers=_default_headers(effective_token, endpoint=target),
                timeout=timeout,
            )
            response.raise_for_status()
        except Exception as exc:
            if "mailpost" in target and refresh_attempts < DEFAULT_MAILPOST_401_RETRY_TIMES:
                refresh_attempts += 1
                effective_token = get_valid_auth_token(force_refresh=True)
                continue
            raise
        response_text = response.text
        content_type = response.headers.get("Content-Type", "")
        if "application/json" in content_type.lower():
            try:
                payload = response.json()
            except ValueError as exc:
                raise SoapMailError(f"SOAP gateway returned invalid JSON wrapper: {exc}") from exc
            code = str(payload.get("Code") or "")
            message = _safe_text(payload.get("Message"))
            lower_message = message.lower()
            auth_failed = code == "401" or "401" in lower_message or "unauthorized" in lower_message
            if auth_failed and refresh_attempts < DEFAULT_MAILPOST_401_RETRY_TIMES:
                refresh_attempts += 1
                effective_token = get_valid_auth_token(force_refresh=True)
                continue
            is_success = payload.get("IsSuccess")
            wrapped_xml = payload.get("Data")
            if is_success is False:
                if "mailpost" in target and refresh_attempts < DEFAULT_MAILPOST_401_RETRY_TIMES:
                    refresh_attempts += 1
                    effective_token = get_valid_auth_token(force_refresh=True)
                    continue
                if auth_failed:
                    raise SoapMailError("邮件服务鉴权失败，请重新登录后再重试")
                raise SoapMailError(
                    f"SOAP gateway returned error: code={payload.get('Code')} message={payload.get('Message')}"
                )
            if not isinstance(wrapped_xml, str) or not wrapped_xml.strip():
                raise SoapMailError("SOAP gateway JSON wrapper did not include XML string in Data")
            response_text = wrapped_xml
        break

    try:
        root = ET.fromstring(response_text)
    except ET.ParseError as exc:
        snippet = response_text[:200].replace("\n", " ")
        raise SoapMailError(f"SOAP response is not valid XML: {exc}; snippet={snippet!r}") from exc

    fault = root.find(".//soap:Fault", NS)
    if fault is not None:
        fault_string = fault.findtext("faultstring", default="", namespaces={})
        detail = "".join(fault.itertext()).strip()
        raise SoapMailError(f"SOAP fault: {fault_string or detail}")
    return root


def _folder_shape_xml() -> str:
    return (
        "<m:FolderShape>"
        "<t:BaseShape>Default</t:BaseShape>"
        "<t:AdditionalProperties>"
        '<t:FieldURI FieldURI="folder:DisplayName" />'
        '<t:FieldURI FieldURI="folder:ChildFolderCount" />'
        '<t:FieldURI FieldURI="folder:UnreadCount" />'
        '<t:FieldURI FieldURI="folder:TotalCount" />'
        '<t:FieldURI FieldURI="folder:FolderClass" />'
        "</t:AdditionalProperties>"
        "</m:FolderShape>"
    )


def _find_item_shape_xml() -> str:
    return (
        "<m:ItemShape>"
        "<t:BaseShape>Default</t:BaseShape>"
        "<t:AdditionalProperties>"
        '<t:FieldURI FieldURI="item:Subject" />'
        '<t:FieldURI FieldURI="item:DateTimeReceived" />'
        '<t:FieldURI FieldURI="item:DateTimeSent" />'
        '<t:FieldURI FieldURI="item:LastModifiedTime" />'
        '<t:FieldURI FieldURI="item:HasAttachments" />'
        '<t:FieldURI FieldURI="item:Importance" />'
        '<t:FieldURI FieldURI="item:Categories" />'
        '<t:FieldURI FieldURI="item:ConversationId" />'
        '<t:FieldURI FieldURI="message:IsRead" />'
        '<t:FieldURI FieldURI="message:From" />'
        '<t:FieldURI FieldURI="message:Sender" />'
        '<t:FieldURI FieldURI="message:ToRecipients" />'
        '<t:FieldURI FieldURI="message:CcRecipients" />'
        "</t:AdditionalProperties>"
        "</m:ItemShape>"
    )


def parse_folders(root: ET.Element) -> list[dict[str, Any]]:
    folders: list[dict[str, Any]] = []
    for folder in root.findall(".//t:Folders/*", NS):
        folder_id = folder.find("t:FolderId", NS)
        parent_id = folder.find("t:ParentFolderId", NS)
        folders.append(
            {
                "id": folder_id.get("Id", "") if folder_id is not None else "",
                "change_key": folder_id.get("ChangeKey", "") if folder_id is not None else "",
                "parent_id": parent_id.get("Id", "") if parent_id is not None else "",
                "display_name": _safe_text(folder.findtext("t:DisplayName", default="", namespaces=NS)),
                "folder_class": _safe_text(folder.findtext("t:FolderClass", default="", namespaces=NS)),
                "total_count": int(_safe_text(folder.findtext("t:TotalCount", default="0", namespaces=NS)) or "0"),
                "unread_count": int(_safe_text(folder.findtext("t:UnreadCount", default="0", namespaces=NS)) or "0"),
                "child_folder_count": int(_safe_text(folder.findtext("t:ChildFolderCount", default="0", namespaces=NS)) or "0"),
            }
        )
    return folders


def parse_items(root: ET.Element, folder_label: str = "") -> list[dict[str, Any]]:
    items: list[dict[str, Any]] = []
    item_nodes = root.findall(".//t:Items/*", NS) + root.findall(".//m:Items/*", NS)
    for item in item_nodes:
        item_id_node = item.find("t:ItemId", NS)
        conversation_id_node = item.find("t:ConversationId", NS)
        from_box = _mailbox(item.find("t:From/t:Mailbox", NS))
        sender_box = _mailbox(item.find("t:Sender/t:Mailbox", NS))
        to_boxes = _mailboxes(item.find("t:ToRecipients", NS))
        cc_boxes = _mailboxes(item.find("t:CcRecipients", NS))
        body_text = _safe_text(item.findtext("t:TextBody", default="", namespaces=NS)) or _safe_text(
            item.findtext("t:Body", default="", namespaces=NS)
        )
        items.append(
            {
                "item_id": item_id_node.get("Id", "") if item_id_node is not None else "",
                "change_key": item_id_node.get("ChangeKey", "") if item_id_node is not None else "",
                "conversation_id": conversation_id_node.get("Id", "") if conversation_id_node is not None else "",
                "subject": _safe_text(item.findtext("t:Subject", default="", namespaces=NS)),
                "date_time_received": _to_system_tz_string(item.findtext("t:DateTimeReceived", default="", namespaces=NS)),
                "date_time_sent": _to_system_tz_string(item.findtext("t:DateTimeSent", default="", namespaces=NS)),
                "last_modified_time": _safe_text(item.findtext("t:LastModifiedTime", default="", namespaces=NS)),
                "from": from_box,
                "sender": sender_box,
                "to_recipients": to_boxes,
                "cc_recipients": cc_boxes,
                "display_to": "; ".join(filter(None, [box["name"] or box["email"] for box in to_boxes])),
                "display_cc": "; ".join(filter(None, [box["name"] or box["email"] for box in cc_boxes])),
                "is_read": _bool_text(item.findtext("t:IsRead", default="", namespaces=NS)),
                "has_attachments": _bool_text(item.findtext("t:HasAttachments", default="", namespaces=NS)),
                "importance": _safe_text(item.findtext("t:Importance", default="", namespaces=NS)),
                "categories": [_safe_text(node.text) for node in item.findall("t:Categories/t:String", NS) if _safe_text(node.text)],
                "preview": _safe_text(item.findtext("t:Preview", default="", namespaces=NS)),
                "body_text": body_text,
                "folder": folder_label,
            }
        )
    return items


def parse_item_detail(root: ET.Element) -> dict[str, Any]:
    items = parse_items(root)
    detail = items[0] if items else {}
    attachments: list[dict[str, Any]] = []
    for node in root.findall(".//t:Attachments/*", NS):
        attachment_id = node.find("t:AttachmentId", NS)
        attachments.append(
            {
                "attachment_id": attachment_id.get("Id", "") if attachment_id is not None else "",
                "name": _safe_text(node.findtext("t:Name", default="", namespaces=NS)),
                "content_type": _safe_text(node.findtext("t:ContentType", default="", namespaces=NS)),
                "size": int(_safe_text(node.findtext("t:Size", default="0", namespaces=NS)) or "0"),
                "is_inline": _bool_text(node.findtext("t:IsInline", default="", namespaces=NS)),
            }
        )
    detail["attachments"] = attachments
    return detail


def parse_create_item_message_id(root: ET.Element) -> dict[str, str]:
    item_id_node = root.find(".//m:Items//t:ItemId", NS)
    return {
        "item_id": item_id_node.get("Id", "") if item_id_node is not None else "",
        "change_key": item_id_node.get("ChangeKey", "") if item_id_node is not None else "",
    }


def parse_attachment_detail(root: ET.Element) -> dict[str, Any]:
    attachment = root.find(".//m:Attachments/*", NS) or root.find(".//t:Attachments/*", NS)
    if attachment is None:
        return {}
    attachment_id = attachment.find("t:AttachmentId", NS)
    content = _safe_text(attachment.findtext("t:Content", default="", namespaces=NS))
    return {
        "attachment_id": attachment_id.get("Id", "") if attachment_id is not None else "",
        "name": _safe_text(attachment.findtext("t:Name", default="", namespaces=NS)),
        "content_type": _safe_text(attachment.findtext("t:ContentType", default="", namespaces=NS)),
        "content_id": _safe_text(attachment.findtext("t:ContentId", default="", namespaces=NS)),
        "size": int(_safe_text(attachment.findtext("t:Size", default="0", namespaces=NS)) or "0"),
        "is_inline": _bool_text(attachment.findtext("t:IsInline", default="", namespaces=NS)),
        "content_base64": content,
    }


def list_folders(
    *,
    endpoint: str = "",
    token: str = "",
    parent_id: str = "",
    distinguished_parent: str = "msgfolderroot",
    traversal: str = "Deep",
    max_entries: int = 200,
) -> dict[str, Any]:
    body = (
        f'<m:FindFolder Traversal="{escape(traversal)}">'
        f"{_folder_shape_xml()}"
        f'<m:IndexedPageFolderView MaxEntriesReturned="{int(max_entries)}" Offset="0" BasePoint="Beginning" />'
        f"<m:ParentFolderIds>{_folder_ref_xml(folder_id=parent_id, distinguished=distinguished_parent)}</m:ParentFolderIds>"
        "</m:FindFolder>"
    )
    root = send_soap_request(_wrap_soap(body), endpoint=endpoint, token=token)
    folders = parse_folders(root)
    return {
        "success": True,
        "count": len(folders),
        "traversal": traversal,
        "parent": parent_id or DISTINGUISHED_FOLDERS.get(distinguished_parent.lower(), distinguished_parent),
        "folders": folders,
    }


def create_folder(
    *,
    display_name: str,
    endpoint: str = "",
    token: str = "",
    parent_folder_id: str = "",
    distinguished_parent: str = "msgfolderroot",
    folder_class: str = "IPF.Note",
) -> dict[str, Any]:
    parent_xml = _folder_ref_xml(folder_id=parent_folder_id, distinguished=distinguished_parent)
    folder_xml = (
        "<t:Folder>"
        f"<t:DisplayName>{escape(display_name)}</t:DisplayName>"
        f"<t:FolderClass>{escape(folder_class)}</t:FolderClass>"
        "</t:Folder>"
    )
    body_xml = (
        "<m:CreateFolder>"
        "<m:ParentFolderId>"
        f"{parent_xml}"
        "</m:ParentFolderId>"
        "<m:Folders>"
        f"{folder_xml}"
        "</m:Folders>"
        "</m:CreateFolder>"
    )
    root = send_soap_request(_wrap_soap(body_xml), endpoint=endpoint, token=token)
    response_code = _extract_response_code(root)

    created_folder = None
    folders = parse_folders(root)
    if folders:
        created_folder = folders[0]

    return {
        "success": response_code in {"NoError", ""},
        "action": "create_folder",
        "display_name": display_name,
        "folder_class": folder_class,
        "parent_folder_id": parent_folder_id,
        "distinguished_parent": distinguished_parent,
        "folder": created_folder,
        "ews_request": _wrap_soap(body_xml),
        "data": {"response_code": response_code},
    }


def resolve_folder_by_name(
    *,
    display_name: str,
    endpoint: str = "",
    token: str = "",
    parent_id: str = "",
    distinguished_parent: str = "msgfolderroot",
    traversal: str = "Deep",
    max_entries: int = 200,
) -> dict[str, Any]:
    result = list_folders(
        endpoint=endpoint,
        token=token,
        parent_id=parent_id,
        distinguished_parent=distinguished_parent,
        traversal=traversal,
        max_entries=max_entries,
    )
    exact_matches = [folder for folder in result["folders"] if folder["display_name"] == display_name]
    if exact_matches:
        return exact_matches[0]
    fuzzy_matches = [folder for folder in result["folders"] if _contains(folder["display_name"], display_name)]
    if not fuzzy_matches:
        raise SoapMailError(f'folder "{display_name}" not found under {result["parent"]}')
    if len(fuzzy_matches) > 1:
        raise SoapMailError(
            f'multiple folders matched "{display_name}": {", ".join(folder["display_name"] for folder in fuzzy_matches[:10])}'
        )
    return fuzzy_matches[0]


def find_items(
    *,
    endpoint: str = "",
    token: str = "",
    folder_id: str = "",
    distinguished_folder: str = "inbox",
    max_entries: int = 50,
    offset: int = 0,
    folder_label: str = "",
    restriction_xml: str = "",
) -> dict[str, Any]:
    body = (
        '<m:FindItem Traversal="Shallow">'
        f"{_find_item_shape_xml()}"
        f'<m:IndexedPageItemView MaxEntriesReturned="{int(max_entries)}" Offset="{int(offset)}" BasePoint="Beginning" />'
        f"{restriction_xml}"
        f"<m:ParentFolderIds>{_folder_ref_xml(folder_id=folder_id, distinguished=distinguished_folder)}</m:ParentFolderIds>"
        "</m:FindItem>"
    )
    root = send_soap_request(_wrap_soap(body), endpoint=endpoint, token=token)
    items = parse_items(root, folder_label=folder_label or (folder_id or distinguished_folder))
    return {
        "success": True,
        "count": len(items),
        "folder": folder_label or folder_id or distinguished_folder,
        "items": items,
    }


def fetch_items_pages(
    *,
    endpoint: str = "",
    token: str = "",
    folder_id: str = "",
    distinguished_folder: str = "inbox",
    page_size: int = 50,
    max_pages: int = 10,
    folder_label: str = "",
    restriction_xml: str = "",
) -> dict[str, Any]:
    all_items: list[dict[str, Any]] = []
    for page_idx in range(max_pages):
        offset = page_idx * page_size
        result = find_items(
            endpoint=endpoint,
            token=token,
            folder_id=folder_id,
            distinguished_folder=distinguished_folder,
            max_entries=page_size,
            offset=offset,
            folder_label=folder_label,
            restriction_xml=restriction_xml,
        )
        items = result["items"]
        if not items:
            break
        all_items.extend(items)
        if len(items) < page_size:
            break

    deduped_items: list[dict[str, Any]] = []
    seen_item_ids: set[str] = set()
    for item in all_items:
        item_id = _safe_text(item.get("item_id"))
        if item_id and item_id in seen_item_ids:
            continue
        if item_id:
            seen_item_ids.add(item_id)
        deduped_items.append(item)

    return {
        "success": True,
        "count": len(deduped_items),
        "folder": folder_label or folder_id or distinguished_folder,
        "items": deduped_items,
        "page_size": page_size,
        "max_pages": max_pages,
        "fetched_count": len(all_items),
    }


def get_item_detail(*, item_id: str, endpoint: str = "", token: str = "") -> dict[str, Any]:
    body = (
        "<m:GetItem>"
        "<m:ItemShape>"
        "<t:BaseShape>Default</t:BaseShape>"
        "<t:BodyType>Text</t:BodyType>"
        "<t:AdditionalProperties>"
        '<t:FieldURI FieldURI="item:TextBody" />'
        '<t:FieldURI FieldURI="item:Body" />'
        '<t:FieldURI FieldURI="item:Categories" />'
        '<t:FieldURI FieldURI="item:Preview" />'
        '<t:FieldURI FieldURI="message:From" />'
        '<t:FieldURI FieldURI="message:ToRecipients" />'
        '<t:FieldURI FieldURI="message:CcRecipients" />'
        "</t:AdditionalProperties>"
        "</m:ItemShape>"
        f"<m:ItemIds>{_item_ref_xml(item_id)}</m:ItemIds>"
        "</m:GetItem>"
    )
    root = send_soap_request(_wrap_soap(body), endpoint=endpoint, token=token)
    detail = parse_item_detail(root)
    return {
        "success": True,
        "item": detail,
    }


def get_attachment_detail(*, attachment_id: str, endpoint: str = "", token: str = "") -> dict[str, Any]:
    body = (
        "<m:GetAttachment>"
        "<m:AttachmentShape />"
        "<m:AttachmentIds>"
        f'<t:AttachmentId Id="{escape(attachment_id)}" />'
        "</m:AttachmentIds>"
        "</m:GetAttachment>"
    )
    root = send_soap_request(_wrap_soap(body), endpoint=endpoint, token=token)
    attachment = parse_attachment_detail(root)
    return {
        "success": True,
        "attachment": attachment,
    }


def _attachments_xml_from_paths(attachment_paths: str) -> tuple[str, list[dict[str, Any]]]:
    paths = [p.strip() for p in attachment_paths.split(",") if p.strip()]
    xml_parts = []
    files = []
    for raw_path in paths:
        path = Path(raw_path).expanduser()
        if not path.exists() or not path.is_file():
            raise SoapMailError(f"attachment file not found: {raw_path}")
        content = base64.b64encode(path.read_bytes()).decode("ascii")
        files.append(
            {
                "path": str(path),
                "name": path.name,
                "size": path.stat().st_size,
            }
        )
        xml_parts.append(
            "<t:FileAttachment>"
            f"<t:Name>{escape(path.name)}</t:Name>"
            f"<t:Content>{content}</t:Content>"
            "</t:FileAttachment>"
        )
    return "".join(xml_parts), files


def _extract_attachment_root_item_meta(root: ET.Element) -> dict[str, str]:
    for node in root.findall(".//t:AttachmentId", NS):
        root_item_id = _safe_text(node.get("RootItemId"))
        root_item_change_key = _safe_text(node.get("RootItemChangeKey"))
        if root_item_id and root_item_change_key:
            return {"item_id": root_item_id, "change_key": root_item_change_key}
    return {"item_id": "", "change_key": ""}


def _create_attachment_to_item(
    *,
    parent_item_id: str,
    parent_change_key: str,
    attachments_xml: str,
    endpoint: str = "",
    token: str = "",
) -> dict[str, Any]:
    body = (
        "<m:CreateAttachment>"
        f'<m:ParentItemId Id="{escape(parent_item_id)}" ChangeKey="{escape(parent_change_key)}" />'
        "<m:Attachments>"
        f"{attachments_xml}"
        "</m:Attachments>"
        "</m:CreateAttachment>"
    )
    root = send_soap_request(_wrap_soap(body), endpoint=endpoint, token=token)
    response_code = _extract_response_code(root)

    item_meta = _extract_attachment_root_item_meta(root)
    if not item_meta.get("item_id") or not item_meta.get("change_key"):
        fallback_meta = parse_create_item_message_id(root)
        item_meta = {
            "item_id": fallback_meta.get("item_id") or parent_item_id,
            "change_key": fallback_meta.get("change_key") or parent_change_key,
        }

    return {
        "success": response_code in {"NoError", ""},
        "response_code": response_code,
        "item_id": item_meta.get("item_id") or parent_item_id,
        "change_key": item_meta.get("change_key") or parent_change_key,
    }


def _send_saved_item(
    *,
    item_id: str,
    change_key: str,
    endpoint: str = "",
    token: str = "",
) -> dict[str, Any]:
    def _build_send_body(current_change_key: str) -> str:
        return (
            '<m:SendItem SaveItemToFolder="true">'
            "<m:ItemIds>"
            f'<t:ItemId Id="{escape(item_id)}" ChangeKey="{escape(current_change_key)}" />'
            "</m:ItemIds>"
            "</m:SendItem>"
        )

    root = send_soap_request(_wrap_soap(_build_send_body(change_key)), endpoint=endpoint, token=token)
    response_code = _extract_response_code(root)
    if response_code in {"NoError", ""}:
        return {"success": True, "response_code": response_code}

    if response_code == "ErrorIrresolvableConflict":
        refreshed_change_key = ""
        try:
            detail = get_item_detail(item_id=item_id, endpoint=endpoint, token=token).get("item") or {}
            refreshed_change_key = _safe_text(detail.get("change_key"))
        except Exception:
            refreshed_change_key = ""

        if refreshed_change_key and refreshed_change_key != _safe_text(change_key):
            retry_root = send_soap_request(
                _wrap_soap(_build_send_body(refreshed_change_key)),
                endpoint=endpoint,
                token=token,
            )
            retry_code = _extract_response_code(retry_root)
            if retry_code in {"NoError", ""}:
                return {"success": True, "response_code": retry_code, "retried": True}
            response_code = retry_code

        return {
            "success": True,
            "response_code": response_code,
            "warning": "SendItem 返回 ErrorIrresolvableConflict，邮件可能已发送；如有需要请在发件箱确认。",
            "assumed_sent": True,
        }

    return {"success": False, "response_code": response_code}


def _normalize_reply_subject(subject: str) -> str:
    raw = _safe_text(subject)
    if not raw:
        return "Re:"
    if raw.lower().startswith("re:"):
        return raw
    return f"Re: {raw}"


def _quote_original(item: dict[str, Any]) -> str:
    sender = item.get("from") or item.get("sender") or {}
    sender_label = _safe_text(sender.get("name")) or _safe_text(sender.get("email")) or "原发件人"
    sent_at = _safe_text(item.get("date_time_sent") or item.get("date_time_received"))
    subject = _safe_text(item.get("subject"))
    body = _safe_text(item.get("body_text") or item.get("preview"))
    quoted_lines = [f"> {line}" if line else ">" for line in body.splitlines()] if body else [">"]
    header = [
        "",
        "",
        "----- 原邮件 -----",
        f"发件人: {sender_label}",
        f"时间: {sent_at}",
        f"主题: {subject}",
        "",
    ]
    return "\n".join(header + quoted_lines)


def _extract_response_code(root: ET.Element) -> str:
    return _safe_text(root.findtext(".//m:ResponseCode", default="", namespaces=NS))


def _create_item_response_meta(root: ET.Element) -> dict[str, Any]:
    return {
        "response_class": _safe_text(root.find(".//m:CreateItemResponseMessage", NS).get("ResponseClass", "")) if root.find(".//m:CreateItemResponseMessage", NS) is not None else "",
        "response_code": _extract_response_code(root),
    }


def _prepare_reply_recipients(
    original_item: dict[str, Any],
    *,
    reply_all: bool = False,
    current_user: str = "",
) -> tuple[list[dict[str, str]], list[dict[str, str]]]:
    sender = original_item.get("from") or original_item.get("sender") or {}
    primary = []
    if _safe_text(sender.get("email")):
        primary.append({"name": _safe_text(sender.get("name")), "email": _safe_text(sender.get("email"))})

    cc_targets: list[dict[str, str]] = []
    if reply_all:
        all_boxes = primary + list(original_item.get("to_recipients") or []) + list(original_item.get("cc_recipients") or [])
        current_lower = _safe_text(current_user).lower()
        unique_map: dict[str, dict[str, str]] = {}
        for box in all_boxes:
            email = _safe_text(box.get("email"))
            if not email:
                continue
            if current_lower and email.lower() == current_lower:
                continue
            unique_map[email.lower()] = {"name": _safe_text(box.get("name")), "email": email}
        ordered = list(unique_map.values())
        primary = ordered[:1]
        cc_targets = ordered[1:]

    return primary, cc_targets


def send_reply_mail(
    *,
    item_id: str,
    body: str,
    endpoint: str = "",
    token: str = "",
    body_type: str = "T",
    reply_all: bool = False,
    include_original: bool = False,
    user_id: str = "",
    attachment_paths: str = "",
) -> dict[str, Any]:
    detail = get_item_detail(item_id=item_id, endpoint=endpoint, token=token)["item"]
    sender = detail.get("from") or detail.get("sender") or {}
    sender_email = _safe_text(sender.get("email")).lower()
    current_user = _safe_text(user_id) or _parse_token_user_id(token)
    subject = _normalize_reply_subject(detail.get("subject", ""))
    final_body = body + (_quote_original(detail) if include_original else "")

    reference_change_key = _safe_text(detail.get("change_key"))
    if not reference_change_key:
        raise SoapMailError("reply requires original item ChangeKey, but detail response did not include it")

    body_type_value = "HTML" if body_type == "H" else "Text"
    reference_xml = (
        f'<t:ReferenceItemId Id="{escape(item_id)}" ChangeKey="{escape(reference_change_key)}" />'
    )
    reply_tag = "ReplyAllToItem" if reply_all else "ReplyToItem"
    message_disposition = "SaveOnly" if attachment_paths else "SendAndSaveCopy"
    body_xml = (
        f'<m:CreateItem MessageDisposition="{message_disposition}">'
        "<m:Items>"
        f"<t:{reply_tag}>"
        f"{reference_xml}"
        f"<t:NewBodyContent BodyType=\"{body_type_value}\">{escape(final_body)}</t:NewBodyContent>"
        f"</t:{reply_tag}>"
        "</m:Items>"
        "</m:CreateItem>"
    )

    root = send_soap_request(_wrap_soap(body_xml), endpoint=endpoint, token=token)
    response_meta = _create_item_response_meta(root)
    response_code = response_meta.get("response_code", "")
    success = response_code in {"NoError", ""}
    attachment_files: list[dict[str, Any]] = []
    if success and attachment_paths:
        draft_meta = parse_create_item_message_id(root)
        attachments_xml, attachment_files = _attachments_xml_from_paths(attachment_paths)
        attachment_result = _create_attachment_to_item(
            parent_item_id=draft_meta.get("item_id", ""),
            parent_change_key=draft_meta.get("change_key", ""),
            attachments_xml=attachments_xml,
            endpoint=endpoint,
            token=token,
        )
        send_result = _send_saved_item(
            item_id=attachment_result["item_id"],
            change_key=attachment_result["change_key"],
            endpoint=endpoint,
            token=token,
        )
        success = attachment_result["success"] and send_result["success"]
        response_meta = {
            "response_code": send_result["response_code"],
            "attachment_response_code": attachment_result["response_code"],
        }
    return {
        "success": success,
        "reply_to_item_id": item_id,
        "reply_all": reply_all,
        "include_original": include_original,
        "resolved_subject": subject,
        "resolved_to": [sender_email],
        "resolved_cc": [],
        "resolved_bcc": [],
        "current_user": current_user,
        "reply_body_preview": body.strip(),
        "attachments": attachment_files,
        "ews_request": _wrap_soap(body_xml),
        "data": response_meta,
    }


def apply_filters(items: list[dict[str, Any]], filters: MailSearchFilters) -> list[dict[str, Any]]:
    normalized_filters = MailSearchFilters(
        sender=filters.sender,
        recipient=filters.recipient,
        subject=filters.subject,
        body_keyword=filters.body_keyword,
        after=filters.after,
        before=filters.before,
        unread_only=filters.unread_only,
        read_only=filters.read_only,
        has_attachments=filters.has_attachments,
        category=filters.category,
        importance=filters.importance,
    )
    if not _safe_text(normalized_filters.after) and not _safe_text(normalized_filters.before):
        normalized_filters.after = (local_now() - timedelta(days=1)).strftime("%Y-%m-%d")

    after_dt = _parse_date_boundary(normalized_filters.after, end_of_day=False)
    before_dt = _parse_date_boundary(normalized_filters.before, end_of_day=True)
    matched: list[dict[str, Any]] = []

    for item in items:
        sender_text = " ".join(
            filter(
                None,
                [
                    item.get("from", {}).get("name", ""),
                    item.get("from", {}).get("email", ""),
                    item.get("sender", {}).get("name", ""),
                    item.get("sender", {}).get("email", ""),
                ],
            )
        )
        recipient_text = " ".join(
            filter(
                None,
                [
                    item.get("display_to", ""),
                    item.get("display_cc", ""),
                    " ".join(box.get("email", "") for box in item.get("to_recipients", [])),
                    " ".join(box.get("email", "") for box in item.get("cc_recipients", [])),
                ],
            )
        )
        body_text = "\n".join(filter(None, [item.get("preview", ""), item.get("body_text", "")]))
        received_dt = _parse_dt(item.get("date_time_received"))

        if normalized_filters.sender and not _contains(sender_text, normalized_filters.sender):
            continue
        if normalized_filters.recipient and not _contains(recipient_text, normalized_filters.recipient):
            continue
        if normalized_filters.subject and not _contains(item.get("subject", ""), normalized_filters.subject):
            continue
        if normalized_filters.body_keyword and not _contains(body_text, normalized_filters.body_keyword):
            continue
        if normalized_filters.unread_only and item.get("is_read"):
            continue
        if normalized_filters.read_only and not item.get("is_read"):
            continue
        if normalized_filters.has_attachments and not item.get("has_attachments"):
            continue
        if normalized_filters.category:
            categories_joined = " ".join(item.get("categories", []))
            if not _contains(categories_joined, normalized_filters.category):
                continue
        if normalized_filters.importance and item.get("importance", "").lower() != normalized_filters.importance.lower():
            continue
        if after_dt and received_dt and received_dt < after_dt:
            continue
        if before_dt and received_dt and received_dt > before_dt:
            continue

        matched.append(item)

    return matched


def search_mail(
    *,
    endpoint: str = "",
    token: str = "",
    folder_id: str = "",
    distinguished_folder: str = "inbox",
    max_entries: int = 50,
    max_pages: int = 10,
    filters: Optional[MailSearchFilters] = None,
    folder_label: str = "",
) -> dict[str, Any]:
    effective_filters = MailSearchFilters(
        sender=(filters.sender if filters else ""),
        recipient=(filters.recipient if filters else ""),
        subject=(filters.subject if filters else ""),
        body_keyword=(filters.body_keyword if filters else ""),
        after=(filters.after if filters else ""),
        before=(filters.before if filters else ""),
        unread_only=(filters.unread_only if filters else False),
        read_only=(filters.read_only if filters else False),
        has_attachments=(filters.has_attachments if filters else False),
        category=(filters.category if filters else ""),
        importance=(filters.importance if filters else ""),
    )

    default_time_filter_applied = False
    if not _safe_text(effective_filters.after) and not _safe_text(effective_filters.before):
        default_time_filter_applied = True
        effective_filters.after = (local_now() - timedelta(days=1)).strftime("%Y-%m-%d")

    restriction_xml = _build_received_time_restriction_xml(
        after=effective_filters.after,
        before=effective_filters.before,
    )
    request_time_restriction_applied = bool(restriction_xml)

    result = fetch_items_pages(
        endpoint=endpoint,
        token=token,
        folder_id=folder_id,
        distinguished_folder=distinguished_folder,
        page_size=max_entries,
        max_pages=max_pages,
        folder_label=folder_label,
        restriction_xml=restriction_xml,
    )
    items = result["items"]
    matched = apply_filters(items, effective_filters)
    return {
        "success": True,
        "folder": result["folder"],
        "scanned": len(items),
        "page_size": max_entries,
        "max_pages": max_pages,
        "matched": len(matched),
        "time_filter_field": "DateTimeReceived",
        "default_time_filter_applied": default_time_filter_applied,
        "request_time_restriction_applied": request_time_restriction_applied,
        "items": matched,
    }


def _weekday_cn(dt: datetime) -> str:
    return ["周一", "周二", "周三", "周四", "周五", "周六", "周日"][dt.weekday()]


def _date_label_cn(dt: datetime) -> str:
    return f"{dt.month} 月 {dt.day} 日"


def daily_mail_stats(
    *,
    endpoint: str = "",
    token: str = "",
    folder_id: str = "",
    distinguished_folder: str = "inbox",
    after: str = "",
    before: str = "",
    days: int = 7,
    max_entries: int = 100,
    max_pages: int = 20,
    folder_label: str = "inbox",
) -> dict[str, Any]:
    if not _safe_text(after) and not _safe_text(before):
        end_date = local_now().date()
        start_date = end_date - timedelta(days=max(days - 1, 0))
        after = start_date.strftime("%Y-%m-%d")
        before = end_date.strftime("%Y-%m-%d")

    result = search_mail(
        endpoint=endpoint,
        token=token,
        folder_id=folder_id,
        distinguished_folder=distinguished_folder,
        max_entries=max_entries,
        max_pages=max_pages,
        filters=MailSearchFilters(after=after, before=before),
        folder_label=folder_label,
    )

    start_dt = _parse_date_boundary(after, end_of_day=False)
    end_dt = _parse_date_boundary(before, end_of_day=False)
    if start_dt is None or end_dt is None:
        raise SoapMailError("daily-stats requires valid after/before date values")

    start_local = start_dt.astimezone(_effective_local_tz()).date()
    end_local = end_dt.astimezone(_effective_local_tz()).date()

    stats_by_day: dict[str, dict[str, Any]] = {}
    cursor = start_local
    while cursor <= end_local:
        dt_local = datetime.combine(cursor, datetime.min.time(), tzinfo=_effective_local_tz())
        key = cursor.isoformat()
        stats_by_day[key] = {
            "date": key,
            "date_label": _date_label_cn(dt_local),
            "weekday": _weekday_cn(dt_local),
            "total": 0,
            "unread": 0,
            "read": 0,
        }
        cursor += timedelta(days=1)

    for item in result["items"]:
        received_raw = item.get("date_time_received") or item.get("date_time_sent")
        received_dt = _parse_dt(received_raw)
        if received_dt is None:
            continue
        local_date = received_dt.astimezone(_effective_local_tz()).date().isoformat()
        day = stats_by_day.get(local_date)
        if not day:
            continue
        day["total"] += 1
        if item.get("is_read"):
            day["read"] += 1
        else:
            day["unread"] += 1

    daily_stats = [stats_by_day[key] for key in sorted(stats_by_day.keys())]
    return {
        "success": True,
        "folder": result["folder"],
        "after": after,
        "before": before,
        "days": len(daily_stats),
        "total_count": sum(item["total"] for item in daily_stats),
        "daily_stats": daily_stats,
        "items": result["items"],
    }


def _split_item_ids(raw: str) -> list[str]:
    return [item.strip() for item in raw.split(",") if item.strip()]


def _item_changes_xml(item_id: str, change_key: str, inner_xml: str) -> str:
    return (
        "<t:ItemChange>"
        f'<t:ItemId Id="{escape(item_id)}" ChangeKey="{escape(change_key)}" />'
        "<t:Updates>"
        f"{inner_xml}"
        "</t:Updates>"
        "</t:ItemChange>"
    )


def _load_details_for_item_ids(item_ids: list[str], endpoint: str = "", token: str = "") -> list[dict[str, Any]]:
    details: list[dict[str, Any]] = []
    for item_id in item_ids:
        detail = get_item_detail(item_id=item_id, endpoint=endpoint, token=token)["item"]
        details.append(detail)
    return details


def batch_mark_read_state(
    *,
    item_ids: str,
    is_read: bool,
    endpoint: str = "",
    token: str = "",
) -> dict[str, Any]:
    item_id_list = _split_item_ids(item_ids)
    details = _load_details_for_item_ids(item_id_list, endpoint=endpoint, token=token)
    item_changes = []
    for detail in details:
        change_key = _safe_text(detail.get("change_key"))
        item_id = _safe_text(detail.get("item_id"))
        if not item_id or not change_key:
            raise SoapMailError("mark read/unread requires item_id and change_key")
        update_xml = (
            "<t:SetItemField>"
            '<t:FieldURI FieldURI="message:IsRead" />'
            "<t:Message>"
            f"<t:IsRead>{'true' if is_read else 'false'}</t:IsRead>"
            "</t:Message>"
            "</t:SetItemField>"
        )
        item_changes.append(_item_changes_xml(item_id, change_key, update_xml))

    body_xml = (
        "<m:UpdateItem ConflictResolution=\"AutoResolve\" MessageDisposition=\"SaveOnly\">"
        "<m:ItemChanges>"
        f"{''.join(item_changes)}"
        "</m:ItemChanges>"
        "</m:UpdateItem>"
    )
    root = send_soap_request(_wrap_soap(body_xml), endpoint=endpoint, token=token)
    response_code = _extract_response_code(root)
    return {
        "success": response_code in {"NoError", ""},
        "action": "mark_read" if is_read else "mark_unread",
        "item_ids": item_id_list,
        "count": len(item_id_list),
        "ews_request": _wrap_soap(body_xml),
        "data": {"response_code": response_code},
    }


def batch_add_category(
    *,
    item_ids: str,
    category: str,
    endpoint: str = "",
    token: str = "",
) -> dict[str, Any]:
    item_id_list = _split_item_ids(item_ids)
    details = _load_details_for_item_ids(item_id_list, endpoint=endpoint, token=token)
    item_changes = []
    for detail in details:
        change_key = _safe_text(detail.get("change_key"))
        item_id = _safe_text(detail.get("item_id"))
        if not item_id or not change_key:
            raise SoapMailError("add category requires item_id and change_key")
        existing = list(detail.get("categories") or [])
        if category not in existing:
            existing.append(category)
        category_xml = "".join(f"<t:String>{escape(c)}</t:String>" for c in existing)
        update_xml = (
            "<t:SetItemField>"
            '<t:FieldURI FieldURI="item:Categories" />'
            "<t:Message>"
            "<t:Categories>"
            f"{category_xml}"
            "</t:Categories>"
            "</t:Message>"
            "</t:SetItemField>"
        )
        item_changes.append(_item_changes_xml(item_id, change_key, update_xml))

    body_xml = (
        "<m:UpdateItem ConflictResolution=\"AutoResolve\" MessageDisposition=\"SaveOnly\">"
        "<m:ItemChanges>"
        f"{''.join(item_changes)}"
        "</m:ItemChanges>"
        "</m:UpdateItem>"
    )
    root = send_soap_request(_wrap_soap(body_xml), endpoint=endpoint, token=token)
    response_code = _extract_response_code(root)
    return {
        "success": response_code in {"NoError", ""},
        "action": "add_category",
        "category": category,
        "item_ids": item_id_list,
        "count": len(item_id_list),
        "ews_request": _wrap_soap(body_xml),
        "data": {"response_code": response_code},
    }


def batch_move_items(
    *,
    item_ids: str,
    target_folder_id: str,
    endpoint: str = "",
    token: str = "",
) -> dict[str, Any]:
    item_id_list = _split_item_ids(item_ids)
    item_xml = "".join(f'<t:ItemId Id="{escape(item_id)}" />' for item_id in item_id_list)
    body_xml = (
        "<m:MoveItem>"
        "<m:ToFolderId>"
        f'<t:FolderId Id="{escape(target_folder_id)}" />'
        "</m:ToFolderId>"
        "<m:ItemIds>"
        f"{item_xml}"
        "</m:ItemIds>"
        "</m:MoveItem>"
    )
    root = send_soap_request(_wrap_soap(body_xml), endpoint=endpoint, token=token)
    response_code = _extract_response_code(root)
    return {
        "success": response_code in {"NoError", ""},
        "action": "move",
        "target_folder_id": target_folder_id,
        "item_ids": item_id_list,
        "count": len(item_id_list),
        "ews_request": _wrap_soap(body_xml),
        "data": {"response_code": response_code},
    }


def batch_delete_items(
    *,
    item_ids: str,
    endpoint: str = "",
    token: str = "",
    delete_type: str = "MoveToDeletedItems",
) -> dict[str, Any]:
    item_id_list = _split_item_ids(item_ids)
    item_xml = "".join(f'<t:ItemId Id="{escape(item_id)}" />' for item_id in item_id_list)
    body_xml = (
        f'<m:DeleteItem DeleteType="{escape(delete_type)}" SendMeetingCancellations="SendToNone" AffectedTaskOccurrences="AllOccurrences" SuppressReadReceipts="true">'
        "<m:ItemIds>"
        f"{item_xml}"
        "</m:ItemIds>"
        "</m:DeleteItem>"
    )
    root = send_soap_request(_wrap_soap(body_xml), endpoint=endpoint, token=token)
    response_code = _extract_response_code(root)
    return {
        "success": response_code in {"NoError", ""},
        "action": "delete",
        "delete_type": delete_type,
        "item_ids": item_id_list,
        "count": len(item_id_list),
        "ews_request": _wrap_soap(body_xml),
        "data": {"response_code": response_code},
    }


def batch_set_flag(
    *,
    item_ids: str,
    flagged: bool,
    endpoint: str = "",
    token: str = "",
    start_date: str = "",
    due_date: str = "",
) -> dict[str, Any]:
    item_id_list = _split_item_ids(item_ids)
    details = _load_details_for_item_ids(item_id_list, endpoint=endpoint, token=token)
    item_changes = []

    if flagged:
        start_value = _safe_text(start_date) or local_now().strftime("%Y-%m-%dT00:00:00%z")
        due_value = _safe_text(due_date) or (local_now() + timedelta(days=1)).strftime("%Y-%m-%dT00:00:00%z")
    else:
        start_value = ""
        due_value = ""

    for detail in details:
        change_key = _safe_text(detail.get("change_key"))
        item_id = _safe_text(detail.get("item_id"))
        if not item_id or not change_key:
            raise SoapMailError("flag/unflag requires item_id and change_key")

        if flagged:
            flag_xml = (
                "<t:Flag>"
                "<t:FlagStatus>Flagged</t:FlagStatus>"
                f"<t:StartDate>{escape(start_value)}</t:StartDate>"
                f"<t:DueDate>{escape(due_value)}</t:DueDate>"
                "</t:Flag>"
            )
        else:
            flag_xml = (
                "<t:Flag>"
                "<t:FlagStatus>NotFlagged</t:FlagStatus>"
                "</t:Flag>"
            )

        update_xml = (
            "<t:SetItemField>"
            '<t:FieldURI FieldURI="item:Flag" />'
            "<t:Message>"
            f"{flag_xml}"
            "</t:Message>"
            "</t:SetItemField>"
        )
        item_changes.append(_item_changes_xml(item_id, change_key, update_xml))

    body_xml = (
        "<m:UpdateItem ConflictResolution=\"AutoResolve\" MessageDisposition=\"SaveOnly\">"
        "<m:ItemChanges>"
        f"{''.join(item_changes)}"
        "</m:ItemChanges>"
        "</m:UpdateItem>"
    )
    root = send_soap_request(_wrap_soap(body_xml), endpoint=endpoint, token=token)
    response_code = _extract_response_code(root)
    return {
        "success": response_code in {"NoError", ""},
        "action": "flag" if flagged else "unflag",
        "item_ids": item_id_list,
        "count": len(item_id_list),
        "start_date": start_value,
        "due_date": due_value,
        "ews_request": _wrap_soap(body_xml),
        "data": {"response_code": response_code},
    }


def _has_reply_after(sent_items: list[dict[str, Any]], conversation_id: str, received_dt: Optional[datetime]) -> bool:
    if not conversation_id or received_dt is None:
        return False
    for item in sent_items:
        if item.get("conversation_id") != conversation_id:
            continue
        sent_dt = _parse_dt(item.get("date_time_sent")) or _parse_dt(item.get("date_time_received"))
        if sent_dt and sent_dt > received_dt:
            return True
    return False


def find_recent_unreplied_important(
    *,
    endpoint: str = "",
    token: str = "",
    days: int = 1,
    max_entries: int = 100,
    max_pages: int = 10,
) -> dict[str, Any]:
    after = (local_now() - timedelta(days=days)).strftime("%Y-%m-%d")
    inbox = search_mail(
        endpoint=endpoint,
        token=token,
        distinguished_folder="inbox",
        max_entries=max_entries,
        max_pages=max_pages,
        filters=MailSearchFilters(after=after),
        folder_label="inbox",
    )
    sent = fetch_items_pages(
        endpoint=endpoint,
        token=token,
        distinguished_folder="sentitems",
        page_size=max_entries,
        max_pages=max_pages,
        folder_label="sentitems",
    )

    important_items = []
    for item in inbox["items"]:
        categories_joined = " ".join(item.get("categories", []))
        is_important = item.get("importance", "").lower() == "high" or any(
            keyword in categories_joined.lower() for keyword in ("important", "重要", "urgent", "待办")
        )
        if not is_important:
            continue
        received_dt = _parse_dt(item.get("date_time_received"))
        if _has_reply_after(sent["items"], item.get("conversation_id", ""), received_dt):
            continue
        important_items.append(item)

    return {
        "success": True,
        "days": days,
        "matched": len(important_items),
        "heuristic": "importance=High or categories contain important/重要/urgent/待办; no later sent mail in same conversation",
        "items": important_items,
    }


def find_person_unhandled(
    *,
    endpoint: str = "",
    token: str = "",
    sender: str,
    days: int = 1,
    max_entries: int = 100,
    max_pages: int = 10,
) -> dict[str, Any]:
    after = (local_now() - timedelta(days=days)).strftime("%Y-%m-%d")
    inbox = search_mail(
        endpoint=endpoint,
        token=token,
        distinguished_folder="inbox",
        max_entries=max_entries,
        max_pages=max_pages,
        filters=MailSearchFilters(sender=sender, after=after, unread_only=True),
        folder_label="inbox",
    )
    sent = fetch_items_pages(
        endpoint=endpoint,
        token=token,
        distinguished_folder="sentitems",
        page_size=max_entries,
        max_pages=max_pages,
        folder_label="sentitems",
    )

    pending = []
    for item in inbox["items"]:
        received_dt = _parse_dt(item.get("date_time_received"))
        if _has_reply_after(sent["items"], item.get("conversation_id", ""), received_dt):
            continue
        pending.append(item)

    return {
        "success": True,
        "sender": sender,
        "days": days,
        "matched": len(pending),
        "heuristic": "from target sender, unread, and no later sent mail in same conversation",
        "items": pending,
    }


def send_new_mail(
    *,
    to_recipients: str,
    cc_recipients: str = "",
    bcc_recipients: str = "",
    subject: str,
    body: str,
    endpoint: str = "",
    token: str = "",
    body_type: str = "T",
    importance: str = "Normal",
    attachment_paths: str = "",
) -> dict[str, Any]:
    """发送新邮件"""
    body_type_value = "HTML" if body_type == "H" else "Text"

    to_recipients_list = [r.strip() for r in to_recipients.split(",") if r.strip()]
    cc_recipients_list = [r.strip() for r in cc_recipients.split(",") if r.strip()]
    bcc_recipients_list = [r.strip() for r in bcc_recipients.split(",") if r.strip()]

    def mailbox_block(emails: list[str]) -> str:
        xml = ""
        for email in emails:
            xml += (
                "<t:Mailbox>"
                f"<t:EmailAddress>{escape(email)}</t:EmailAddress>"
                "</t:Mailbox>"
            )
        return xml

    to_xml = mailbox_block(to_recipients_list)
    cc_xml = mailbox_block(cc_recipients_list)
    bcc_xml = mailbox_block(bcc_recipients_list)

    if not to_xml:
        raise SoapMailError("send requires at least one recipient in --to")

    message_disposition = "SaveOnly" if attachment_paths else "SendAndSaveCopy"
    body_xml = (
        f"<m:CreateItem MessageDisposition=\"{message_disposition}\">"
        "<m:Items>"
        "<t:Message>"
        f"<t:Subject>{escape(subject)}</t:Subject>"
        f"<t:Body BodyType=\"{body_type_value}\">{escape(body)}</t:Body>"
        f"<t:Importance>{escape(importance)}</t:Importance>"
        "<t:ToRecipients>"
        f"{to_xml}"
        "</t:ToRecipients>"
        f"<t:CcRecipients>{cc_xml}</t:CcRecipients>"
        f"<t:BccRecipients>{bcc_xml}</t:BccRecipients>"
        "</t:Message>"
        "</m:Items>"
        "</m:CreateItem>"
    )

    root = send_soap_request(_wrap_soap(body_xml), endpoint=endpoint, token=token)
    response_meta = _create_item_response_meta(root)
    response_code = response_meta.get("response_code", "")
    success = response_code in {"NoError", ""}

    attachment_files: list[dict[str, Any]] = []
    if success and attachment_paths:
        draft_meta = parse_create_item_message_id(root)
        draft_item_id = _safe_text(draft_meta.get("item_id"))
        draft_change_key = _safe_text(draft_meta.get("change_key"))
        if not draft_item_id or not draft_change_key:
            raise SoapMailError("send with attachments requires draft item_id and change_key from CreateItem response")

        attachments_xml, attachment_files = _attachments_xml_from_paths(attachment_paths)
        attachment_result = _create_attachment_to_item(
            parent_item_id=draft_item_id,
            parent_change_key=draft_change_key,
            attachments_xml=attachments_xml,
            endpoint=endpoint,
            token=token,
        )
        send_result = _send_saved_item(
            item_id=attachment_result["item_id"],
            change_key=attachment_result["change_key"],
            endpoint=endpoint,
            token=token,
        )
        success = attachment_result["success"] and send_result["success"]
        response_meta = {
            "response_code": send_result["response_code"],
            "attachment_response_code": attachment_result["response_code"],
        }

    return {
        "success": success,
        "to_recipients": to_recipients_list,
        "cc_recipients": cc_recipients_list,
        "bcc_recipients": bcc_recipients_list,
        "subject": subject,
        "body_preview": body.strip()[:100],
        "importance": importance,
        "attachments": attachment_files,
        "ews_request": _wrap_soap(body_xml),
        "data": response_meta,
    }


def forward_mail(
    *,
    item_id: str,
    to_recipients: str,
    cc_recipients: str = "",
    bcc_recipients: str = "",
    body: str = "",
    endpoint: str = "",
    token: str = "",
    body_type: str = "T",
    attachment_paths: str = "",
) -> dict[str, Any]:
    """转发邮件"""
    detail = get_item_detail(item_id=item_id, endpoint=endpoint, token=token)["item"]
    subject = detail.get("subject") or ""
    if subject and not subject.lower().startswith("fw:"):
        subject = f"Fw: {subject}"
    elif not subject:
        subject = "Fw:"

    reference_change_key = _safe_text(detail.get("change_key"))
    if not reference_change_key:
        raise SoapMailError("forward requires original item ChangeKey, but detail response did not include it")

    body_type_value = "HTML" if body_type == "H" else "Text"
    to_recipients_list = [r.strip() for r in to_recipients.split(",") if r.strip()]
    cc_recipients_list = [r.strip() for r in cc_recipients.split(",") if r.strip()]
    bcc_recipients_list = [r.strip() for r in bcc_recipients.split(",") if r.strip()]

    def mailbox_block(emails: list[str]) -> str:
        xml = ""
        for email in emails:
            xml += (
                "<t:Mailbox>"
                f"<t:EmailAddress>{escape(email)}</t:EmailAddress>"
                "</t:Mailbox>"
            )
        return xml

    to_xml = mailbox_block(to_recipients_list)
    cc_xml = mailbox_block(cc_recipients_list)
    bcc_xml = mailbox_block(bcc_recipients_list)

    message_disposition = "SaveOnly" if attachment_paths else "SendAndSaveCopy"
    body_xml = (
        f'<m:CreateItem MessageDisposition="{message_disposition}">'
        "<m:Items>"
        "<t:ForwardItem>"
        f'<t:ReferenceItemId Id="{escape(item_id)}" ChangeKey="{escape(reference_change_key)}" />'
        f"<t:NewBodyContent BodyType=\"{body_type_value}\">{escape(body)}</t:NewBodyContent>"
        "<t:ToRecipients>"
        f"{to_xml}"
        "</t:ToRecipients>"
        f"<t:CcRecipients>{cc_xml}</t:CcRecipients>"
        f"<t:BccRecipients>{bcc_xml}</t:BccRecipients>"
        "</t:ForwardItem>"
        "</m:Items>"
        "</m:CreateItem>"
    )

    root = send_soap_request(_wrap_soap(body_xml), endpoint=endpoint, token=token)
    response_meta = _create_item_response_meta(root)
    response_code = response_meta.get("response_code", "")
    success = response_code in {"NoError", ""}
    attachment_files: list[dict[str, Any]] = []
    if success and attachment_paths:
        draft_meta = parse_create_item_message_id(root)
        attachments_xml, attachment_files = _attachments_xml_from_paths(attachment_paths)
        attachment_result = _create_attachment_to_item(
            parent_item_id=draft_meta.get("item_id", ""),
            parent_change_key=draft_meta.get("change_key", ""),
            attachments_xml=attachments_xml,
            endpoint=endpoint,
            token=token,
        )
        send_result = _send_saved_item(
            item_id=attachment_result["item_id"],
            change_key=attachment_result["change_key"],
            endpoint=endpoint,
            token=token,
        )
        success = attachment_result["success"] and send_result["success"]
        response_meta = {
            "response_code": send_result["response_code"],
            "attachment_response_code": attachment_result["response_code"],
        }

    return {
        "success": success,
        "forward_item_id": item_id,
        "to_recipients": to_recipients_list,
        "cc_recipients": cc_recipients_list,
        "bcc_recipients": bcc_recipients_list,
        "subject": subject,
        "body_preview": body.strip()[:100],
        "attachments": attachment_files,
        "ews_request": _wrap_soap(body_xml),
        "data": response_meta,
    }
