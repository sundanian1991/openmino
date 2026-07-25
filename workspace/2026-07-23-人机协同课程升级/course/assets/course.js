/* ============================================================
   人机协同课程 · 公共交互逻辑
   导航汉堡 / 进度追踪 / 侧边目录高亮 / 章节锚定
   ============================================================ */
(function(){
  'use strict';

  var STORAGE_KEY='course_progress_v3';

  // —— 进度读写 ——
  function getProgress(){
    try{var s=localStorage.getItem(STORAGE_KEY);return s?JSON.parse(s):{}}
    catch(e){return{}}
  }
  function saveProgress(p){
    try{localStorage.setItem(STORAGE_KEY,JSON.stringify(p))}catch(e){}
  }
  function markDone(id){
    var p=getProgress();p[id]=true;saveProgress(p);refreshProgressUI();
  }
  function isDone(id){return !!getProgress()[id]}

  // 课程节点顺序（用于步进解锁判断）
  var SEQ=['c1','c2','p1','c3','c4','p2','c5','c6','done'];

  function isUnlocked(id){
    if(id==='c1')return true; // 第一节永远开
    var idx=SEQ.indexOf(id);
    if(idx<=0)return true;
    var prev=SEQ[idx-1];
    return isDone(prev);
  }

  // —— 刷新顶部进度条 ——
  function refreshProgressUI(){
    var p=getProgress();
    var done=0;SEQ.forEach(function(id){if(p[id])done++});
    var pct=Math.round(done/SEQ.length*100);
    var bar=document.querySelector('.topnav-progress-fill');
    var txt=document.querySelector('.topnav-progress-text');
    if(bar)bar.style.width=pct+'%';
    if(txt)txt.textContent=pct+'%';
  }

  // —— 汉堡菜单 ——
  function initBurger(){
    var btn=document.querySelector('.topnav-burger');
    var links=document.querySelector('.topnav-links');
    if(!btn||!links)return;
    btn.addEventListener('click',function(){
      links.classList.toggle('open');
    });
  }

  // —— 完成按钮 ——
  function initCompleteBtn(){
    var btn=document.querySelector('.complete-btn');
    if(!btn)return;
    var id=btn.getAttribute('data-module');
    if(!id)return;
    if(isDone(id)){btn.classList.add('done');btn.textContent='已完成 ✓'}
    btn.addEventListener('click',function(){
      if(isDone(id)){
        // 取消（允许反悔）
        var p=getProgress();delete p[id];saveProgress(p);
        btn.classList.remove('done');btn.textContent='标记本节完成';
      }else{
        markDone(id);
        btn.classList.add('done');btn.textContent='已完成 ✓';
      }
      refreshProgressUI();
    });
  }

  // —— 侧边目录高亮（IntersectionObserver）——
  function initTOC(){
    var tocLinks=document.querySelectorAll('.toc-link');
    if(!tocLinks.length)return;
    var chapters=document.querySelectorAll('.chapter[id]');
    if(!chapters.length)return;

    var map={};
    tocLinks.forEach(function(l){
      var href=l.getAttribute('href');
      if(href&&href.charAt(0)==='#')map[href.slice(1)]=l;
    });

    if('IntersectionObserver' in window){
      var obs=new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          if(e.isIntersecting){
            var id=e.target.id;
            tocLinks.forEach(function(l){l.classList.remove('active')});
            if(map[id])map[id].classList.add('active');
          }
        });
      },{rootMargin:'-80px 0px -60% 0px'});
      chapters.forEach(function(c){obs.observe(c)});
    }
  }

  // —— 启动 ——
  document.addEventListener('DOMContentLoaded',function(){
    initBurger();
    refreshProgressUI();
    initCompleteBtn();
    initTOC();
  });

  // 暴露给页面内联脚本用
  window.CourseAPI={
    getProgress:getProgress,saveProgress:saveProgress,
    markDone:markDone,isDone:isDone,isUnlocked:isUnlocked,
    refreshProgressUI:refreshProgressUI,SEQ:SEQ
  };
})();
