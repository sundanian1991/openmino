#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Fetch JoyMail ACCESS_TOKEN from ME_TOKEN via Color Gateway."""

from __future__ import annotations

import base64
import json
import os
import sys
import time
import urllib.parse
import uuid
from typing import Callable, Optional

import requests

_GATEWAY_PROD = "https://api.m.jd.com/api"
_GATEWAY_BETA = "https://beta-api.m.jd.com/api"
_APP_ID = "joymail"
_T0 = time.monotonic()


def _ts() -> str:
    return f"{time.monotonic() - _T0:.1f}s"


def _log(message: str) -> None:
    print(f"[mailtoken {_ts()}] {message}", file=sys.stderr, flush=True)


def _gateway_url() -> str:
    token = os.environ.get("ME_TOKEN", "")
    return _GATEWAY_BETA if token.startswith("ee.") else _GATEWAY_PROD


def _gateway_request(
    function_id: str,
    payload: Optional[dict] = None,
    verbose_fn: Optional[Callable[[str], None]] = None,
) -> dict:
    me_token = os.environ.get("ME_TOKEN", "")
    if not me_token:
        raise RuntimeError("ME_TOKEN not found in environment")

    request_time = str(int(time.time() * 1000))
    request_uuid = uuid.uuid4().hex[:20]
    url = _gateway_url()

    headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "cookie": f"me_token={me_token};",
        "functionid": function_id,
        "logintype": "15",
        "referer": url.rsplit("/api", 1)[0],
    }
    body = {
        "appid": _APP_ID,
        "body": json.dumps(payload or {}, ensure_ascii=False),
        "functionId": function_id,
        "lang": "zh_CN",
        "loginType": "15",
        "cthr": "1",
        "t": request_time,
        "uuid": request_uuid,
    }

    _log(f"POST {url} functionId={function_id}")
    response = requests.post(url, headers=headers, data=body, timeout=15)
    _log(f"HTTP {response.status_code} functionId={function_id}")
    response.raise_for_status()
    result = response.json()

    if verbose_fn:
        verbose_fn(json.dumps(result, ensure_ascii=False))

    return result


def _rsa_encrypt(payload: str, public_key_pem: str) -> str:
    from cryptography.hazmat.primitives.asymmetric import padding
    from cryptography.hazmat.primitives.serialization import load_pem_public_key

    normalized = public_key_pem.strip()
    if not normalized.startswith("-----"):
        normalized = (
            "-----BEGIN PUBLIC KEY-----\n"
            f"{normalized}\n"
            "-----END PUBLIC KEY-----"
        )
    public_key = load_pem_public_key(normalized.encode())
    encrypted = public_key.encrypt(payload.encode("utf-8"), padding.PKCS1v15())
    return base64.b64encode(encrypted).decode("ascii")


def fetch_mail_token(verbose_fn: Optional[Callable[[str], None]] = None) -> str:
    _log("step1 publickey")
    publickey_resp = _gateway_request("joymail.authentication.publickey", verbose_fn=verbose_fn)
    publickey_data = ((publickey_resp.get("data") or {}).get("Data")) or (publickey_resp.get("Data")) or {}
    pin = publickey_data.get("pin")
    public_key_pem = publickey_data.get("publicKeyPem")
    if not pin or not public_key_pem:
        raise RuntimeError(f"failed to get public key: {json.dumps(publickey_resp, ensure_ascii=False)}")

    _log("step2 encrypt payload")
    plaintext = json.dumps(
        {
            "p": pin,
            "t": str(int(time.time() * 1000)),
            "c": uuid.uuid4().hex,
            "s": "JoyMail_Mac",
        }
    )
    encrypted_b64 = _rsa_encrypt(plaintext, public_key_pem)

    _log("step3 login")
    login_resp = _gateway_request(
        "joymail.authentication.login",
        {"data": urllib.parse.quote(encrypted_b64, safe="")},
        verbose_fn=verbose_fn,
    )
    token = (((login_resp.get("data") or {}).get("Data")) or {}).get("Token") or ((login_resp.get("Data") or {}).get("Token"))
    if not token:
        raise RuntimeError(f"failed to get token: {json.dumps(login_resp, ensure_ascii=False)}")

    return token
