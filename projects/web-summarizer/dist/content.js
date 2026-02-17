import"./assets/modulepreload-polyfill-B5Qt9EMX.js";function p(){const e=document.querySelectorAll("script, style, nav, footer, header"),t=[];e.forEach(o=>{var r;const a=o.cloneNode(!1);t.push(a),(r=o.parentNode)==null||r.replaceChild(a,o)});const s=["article","main",'[role="main"]',".content",".article",".post",".entry-content","#content","article"];let n=null;for(const o of s)if(n=document.querySelector(o),n&&n.textContent&&n.textContent.length>200)break;n||(n=document.body);const i=document.title,c=window.location.href,l=n.textContent||"";return e.forEach((o,a)=>{var r;(r=o.parentNode)==null||r.replaceChild(t[a],o)}),{title:i,url:c,content:l.substring(0,15e3)}}function u(){const e=document.documentElement.lang;if(e.includes("zh"))return"zh";if(e.includes("en"))return"en";const t=document.body.textContent||"",s=t.match(/[\u4e00-\u9fa5]/g);return(s?s.length/t.length:0)>.3?"zh":"en"}function b(){const e=document.createElement("div");return e.id="web-summarizer-sidebar",e.innerHTML=`
    <div class="ws-sidebar-header">
      <span class="ws-title">网页总结翻译器</span>
      <button class="ws-close" title="关闭">×</button>
    </div>
    <div class="ws-sidebar-content">
      <div class="ws-loading">
        <div class="ws-spinner"></div>
        <span>正在分析...</span>
      </div>
      <div class="ws-result" style="display: none;">
        <div class="ws-tabs">
          <button class="ws-tab active" data-type="summary">总结</button>
          <button class="ws-tab" data-type="translation">翻译</button>
        </div>
        <div class="ws-text" id="ws-summary-text"></div>
        <div class="ws-text" id="ws-translation-text" style="display: none;"></div>
      </div>
      <div class="ws-error" style="display: none;"></div>
    </div>
    <div class="ws-sidebar-footer">
      <button class="ws-toggle">收起</button>
    </div>
  `,e}function f(){const e=document.createElement("style");e.textContent=`
    #web-summarizer-sidebar {
      position: fixed;
      top: 0;
      right: 0;
      width: 360px;
      height: 100vh;
      background: #ffffff;
      box-shadow: -2px 0 12px rgba(0, 0, 0, 0.1);
      z-index: 2147483647;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      display: flex;
      flex-direction: column;
      transition: transform 0.3s ease;
    }

    #web-summarizer-sidebar.ws-collapsed {
      transform: translateX(320px);
    }

    .ws-sidebar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 20px;
      border-bottom: 1px solid #e5e7eb;
      background: #f9fafb;
    }

    .ws-title {
      font-size: 14px;
      font-weight: 600;
      color: #1f2937;
    }

    .ws-close {
      width: 28px;
      height: 28px;
      border: none;
      background: none;
      cursor: pointer;
      font-size: 20px;
      color: #6b7280;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .ws-close:hover {
      background: #e5e7eb;
    }

    .ws-sidebar-content {
      flex: 1;
      overflow-y: auto;
      padding: 20px;
    }

    .ws-loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      color: #6b7280;
    }

    .ws-spinner {
      width: 32px;
      height: 32px;
      border: 3px solid #e5e7eb;
      border-top-color: #3b82f6;
      border-radius: 50%;
      animation: ws-spin 0.8s linear infinite;
    }

    @keyframes ws-spin {
      to { transform: rotate(360deg); }
    }

    .ws-result {
      display: block;
    }

    .ws-tabs {
      display: flex;
      gap: 8px;
      margin-bottom: 16px;
    }

    .ws-tab {
      flex: 1;
      padding: 8px 12px;
      border: none;
      background: #f3f4f6;
      color: #6b7280;
      border-radius: 6px;
      cursor: pointer;
      font-size: 13px;
      font-weight: 500;
      transition: all 0.2s;
    }

    .ws-tab.active {
      background: #3b82f6;
      color: white;
    }

    .ws-tab:hover:not(.active) {
      background: #e5e7eb;
    }

    .ws-text {
      font-size: 14px;
      line-height: 1.7;
      color: #374151;
      white-space: pre-wrap;
    }

    .ws-error {
      padding: 16px;
      background: #fef2f2;
      border: 1px solid #fecaca;
      border-radius: 8px;
      color: #991b1b;
      font-size: 13px;
    }

    .ws-sidebar-footer {
      padding: 12px 20px;
      border-top: 1px solid #e5e7eb;
      background: #f9fafb;
    }

    .ws-toggle {
      width: 100%;
      padding: 8px;
      border: none;
      background: #3b82f6;
      color: white;
      border-radius: 6px;
      cursor: pointer;
      font-size: 13px;
      font-weight: 500;
      transition: background 0.2s;
    }

    .ws-toggle:hover {
      background: #2563eb;
    }

    #web-summarizer-sidebar.ws-collapsed .ws-toggle::before {
      content: "展开";
    }
  `,document.head.appendChild(e)}function y(){let e=document.getElementById("web-summarizer-sidebar");e||(f(),e=b(),document.body.appendChild(e),m(e)),e.classList.remove("ws-collapsed");const t=p(),s=u();chrome.runtime.sendMessage({type:"ANALYZE_CONTENT",data:{...t,language:s}})}function m(e){const t=e.querySelector(".ws-close");t==null||t.addEventListener("click",()=>{e.remove()});const s=e.querySelector(".ws-toggle");s==null||s.addEventListener("click",()=>{e.classList.toggle("ws-collapsed")});const n=e.querySelectorAll(".ws-tab");n.forEach(i=>{i.addEventListener("click",c=>{const l=c.target,o=l.dataset.type;n.forEach(d=>d.classList.remove("active")),l.classList.add("active");const a=e.querySelector("#ws-summary-text"),r=e.querySelector("#ws-translation-text");o==="summary"?(a.style.display="block",r.style.display="none"):(a.style.display="none",r.style.display="block")})})}function w(e){const t=document.getElementById("web-summarizer-sidebar");if(!t)return;const s=t.querySelector(".ws-loading"),n=t.querySelector(".ws-result"),i=t.querySelector(".ws-error"),c=t.querySelector("#ws-summary-text"),l=t.querySelector("#ws-translation-text");e.error?(s.style.display="none",n.style.display="none",i.style.display="block",i.textContent=e.error):(s.style.display="none",n.style.display="block",i.style.display="none",e.summary&&(c.textContent=e.summary),e.translation&&(l.textContent=e.translation))}chrome.runtime.onMessage.addListener((e,t,s)=>{e.type==="SHOW_SIDEBAR"?y():e.type==="ANALYSIS_RESULT"&&w(e.data)});console.log("网页总结翻译器已加载");
