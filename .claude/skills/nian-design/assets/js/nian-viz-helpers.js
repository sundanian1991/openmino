/* ============================================================
   haglofs-viz-helpers.js
   数据可视化辅助 — Gauge / Sparkline / Dot Matrix / Network
   无依赖, 自动渲染 data-* 属性
   ============================================================ */

(function(){

/* ─── XG: Gauge ─── */
function renderGauge(el){
  var type = el.getAttribute('data-type') || 'arc';  // arc|ring|thermo|target
  var val = parseFloat(el.getAttribute('data-val')) || 0;
  var w = parseInt(el.getAttribute('data-w')) || 140;
  var h = parseInt(el.getAttribute('data-h')) || 90;
  var color = el.getAttribute('data-color') || '#E87A3C';
  var cx = w/2, cy = type==='thermo'?h-20:h-10, r = Math.min(cx,cy)-10;
  var ns = 'http://www.w3.org/2000/svg';
  var svg = document.createElementNS(ns,'svg');
  svg.setAttribute('width',w); svg.setAttribute('height',h);
  svg.setAttribute('viewBox','0 0 '+w+' '+h); svg.style.display='block';

  if(type==='thermo'){
    // Thermometer
    var bw=16, bh=h-30, bx=cx-bw/2, by=12;
    var bg = document.createElementNS(ns,'rect');
    bg.setAttribute('x',bx); bg.setAttribute('y',by); bg.setAttribute('width',bw); bg.setAttribute('height',bh);
    bg.setAttribute('rx',bw/2); bg.setAttribute('fill','none'); bg.setAttribute('stroke','#E5E5E0'); bg.setAttribute('stroke-width','3');
    svg.appendChild(bg);
    var fillH = bh * val/100;
    var fg = document.createElementNS(ns,'rect');
    fg.setAttribute('x',bx+2); fg.setAttribute('y',by+bh-fillH); fg.setAttribute('width',bw-4);
    fg.setAttribute('height',fillH); fg.setAttribute('rx',(bw-4)/2); fg.setAttribute('fill',color);
    svg.appendChild(fg);
    var bulb = document.createElementNS(ns,'circle');
    bulb.setAttribute('cx',cx); bulb.setAttribute('cy',by+bh+8); bulb.setAttribute('r',10);
    bulb.setAttribute('fill',color);
    svg.appendChild(bulb);
  } else if(type==='target'){
    // Bullseye — hit position derived from val for reproducibility
    for(var i=4;i>0;i--){
      var circ = document.createElementNS(ns,'circle');
      circ.setAttribute('cx',cx); circ.setAttribute('cy',cy);
      circ.setAttribute('r',r*i/4); circ.setAttribute('fill','none');
      circ.setAttribute('stroke',i===1?color:'#E5E5E0');
      circ.setAttribute('stroke-width',i===1?3:1.5);
      svg.appendChild(circ);
    }
    var dot = document.createElementNS(ns,'circle');
    // Deterministic hit position based on val (0-100)
    var ang = (val/100)*2*Math.PI - Math.PI/2;
    var hitR = r*0.3*(1-val/100);
    dot.setAttribute('cx',cx+Math.cos(ang)*hitR); dot.setAttribute('cy',cy+Math.sin(ang)*hitR);
    dot.setAttribute('r',4); dot.setAttribute('fill',color);
    svg.appendChild(dot);
  } else {
    // Arc (default)
    var circ = Math.PI*r;
    var bg = document.createElementNS(ns,'path');
    bg.setAttribute('d','M '+(cx-r)+','+cy+' A '+r+','+r+' 0 0,1 '+(cx+r)+','+cy);
    bg.setAttribute('fill','none'); bg.setAttribute('stroke','#E5E5E0');
    bg.setAttribute('stroke-width','10'); bg.setAttribute('stroke-linecap','round');
    svg.appendChild(bg);
    var fg = document.createElementNS(ns,'path');
    fg.setAttribute('d','M '+(cx-r)+','+cy+' A '+r+','+r+' 0 0,1 '+(cx+r)+','+cy);
    fg.setAttribute('fill','none'); fg.setAttribute('stroke',color);
    fg.setAttribute('stroke-width','10'); fg.setAttribute('stroke-linecap','round');
    fg.setAttribute('stroke-dasharray',(circ*val/100)+','+circ);
    svg.appendChild(fg);
    if(type==='ring'){
      // Full ring instead of half arc
      bg.setAttribute('d','M '+cx+','+(cy-r)+' A '+r+','+r+' 0 1,1 '+(cx-0.01)+','+(cy-r));
      fg.setAttribute('d','M '+cx+','+(cy-r)+' A '+r+','+r+' 0 1,1 '+(cx-0.01)+','+(cy-r));
    }
    if(type==='needle'){
      var na = Math.PI*(0.5+val/200);
      var nl = document.createElementNS(ns,'line');
      nl.setAttribute('x1',cx); nl.setAttribute('y1',cy);
      nl.setAttribute('x2',cx+Math.cos(na)*(r-8)); nl.setAttribute('y2',cy+Math.sin(na)*(r-8));
      nl.setAttribute('stroke','#2C2C2C'); nl.setAttribute('stroke-width','2'); nl.setAttribute('stroke-linecap','round');
      svg.appendChild(nl);
      var nd = document.createElementNS(ns,'circle');
      nd.setAttribute('cx',cx); nd.setAttribute('cy',cy); nd.setAttribute('r',4);
      nd.setAttribute('fill','#2C2C2C');
      svg.appendChild(nd);
    }
  }
  el.innerHTML = '';
  el.appendChild(svg);
  // Value label
  var vl = document.createElement('div');
  vl.style.cssText = 'font-family:JetBrains Mono,monospace;font-size:18px;font-weight:600;text-align:center;margin-top:6px';
  vl.textContent = val+'%';
  el.appendChild(vl);
}

/* ─── XS: Sparkline ─── */
function renderSparkline(el){
  var data = (el.getAttribute('data-values')||'').split(',').map(Number);
  var type = el.getAttribute('data-type')||'line';  // line|area|bar|step
  var color = el.getAttribute('data-color')||'#E87A3C';
  if(data.length<2){ el.textContent='[data]'; return; }
  var w = parseInt(el.getAttribute('data-w'))||160, h = parseInt(el.getAttribute('data-h'))||32;
  var ns = 'http://www.w3.org/2000/svg';
  var svg = document.createElementNS(ns,'svg');
  svg.setAttribute('width',w); svg.setAttribute('height',h);
  svg.setAttribute('viewBox','0 0 '+w+' '+h); svg.style.display='block';
  var min=Math.min(...data), max=Math.max(...data), range=max-min||1;
  var xStep = w/(data.length-1);
  var points = data.map(function(v,i){ return [i*xStep, h-((v-min)/range)*(h-4)-2]; });
  if(type==='bar'){
    var bw = Math.max(2, w/data.length-1);
    data.forEach(function(v,i){
      var barH = ((v-min)/range)*(h-4);
      var rect = document.createElementNS(ns,'rect');
      rect.setAttribute('x',i*xStep-bw/2+1); rect.setAttribute('y',h-barH-2);
      rect.setAttribute('width',bw); rect.setAttribute('height',barH);
      rect.setAttribute('fill',color); rect.setAttribute('opacity','.7');
      svg.appendChild(rect);
    });
  } else if(type==='step'){
    // Staircase line: horizontal then vertical segments
    var stepD = '';
    points.forEach(function(p,i){
      if(i===0){ stepD += 'M'+p[0].toFixed(1)+' '+p[1].toFixed(1); }
      else {
        stepD += ' H'+p[0].toFixed(1)+' V'+p[1].toFixed(1);
      }
    });
    var stepPath = document.createElementNS(ns,'path');
    stepPath.setAttribute('d',stepD); stepPath.setAttribute('fill','none');
    stepPath.setAttribute('stroke',color); stepPath.setAttribute('stroke-width','1.5');
    stepPath.setAttribute('stroke-linecap','round'); stepPath.setAttribute('stroke-linejoin','round');
    svg.appendChild(stepPath);
  } else if(type==='area'){
    var d = 'M'+points.map(function(p){return p[0].toFixed(1)+' '+p[1].toFixed(1);}).join(' L');
    d += ' L'+points[points.length-1][0].toFixed(1)+' '+h+' L'+points[0][0].toFixed(1)+' '+h+' Z';
    var a = document.createElementNS(ns,'path');
    a.setAttribute('d',d); a.setAttribute('fill',color); a.setAttribute('opacity','.1');
    svg.appendChild(a);
    var l = document.createElementNS(ns,'path');
    l.setAttribute('d','M'+points.map(function(p){return p[0].toFixed(1)+' '+p[1].toFixed(1);}).join(' L'));
    l.setAttribute('fill','none'); l.setAttribute('stroke',color); l.setAttribute('stroke-width','1.5');
    l.setAttribute('stroke-linecap','round'); l.setAttribute('stroke-linejoin','round');
    svg.appendChild(l);
  } else {
    // line (default)
    var lineD = 'M'+points.map(function(p){return p[0].toFixed(1)+' '+p[1].toFixed(1);}).join(' L');
    var path = document.createElementNS(ns,'path');
    path.setAttribute('d',lineD); path.setAttribute('fill','none');
    path.setAttribute('stroke',color); path.setAttribute('stroke-width','1.5');
    path.setAttribute('stroke-linecap','round'); path.setAttribute('stroke-linejoin','round');
    svg.appendChild(path);
    if(type==='dot'){
      data.forEach(function(v,i){
        var dot = document.createElementNS(ns,'circle');
        dot.setAttribute('cx',points[i][0]); dot.setAttribute('cy',points[i][1]);
        dot.setAttribute('r',1.5); dot.setAttribute('fill',color);
        svg.appendChild(dot);
      });
    }
  }
  el.innerHTML = '';
  el.appendChild(svg);
  // Stat
  var last = data[data.length-1], first = data[0];
  var chg = first===0 ? 0 : ((last-first)/first*100).toFixed(1);
  var st = document.createElement('div');
  st.style.cssText = 'font-family:JetBrains Mono,monospace;font-size:11px;margin-top:4px;text-align:center';
  st.style.color = chg>0?'#4A6741':'#E87A3C';
  st.textContent = last + (chg>0?' ▲':' ▼')+Math.abs(chg)+'%';
  el.appendChild(st);
}

/* ─── XD: Dot Matrix ─── */
function renderDotMatrix(el){
  var str = el.getAttribute('data-pattern')||'H';   // letter or 35-char binary
  var dotSize = parseInt(el.getAttribute('data-dot'))||4;
  var gap = parseInt(el.getAttribute('data-gap'))||2;
  var color = el.getAttribute('data-color')||'#2C2C2C';
  var glyphs = {
    'H':[1,1,1,1,1,1,0,0,0,1,1,1,1,0,1,1,1,1,1,1,1,0,0,0,1,1,0,0,0,1,1,1,1,1,1],
    'A':[0,1,1,1,0,1,0,0,0,1,1,1,1,1,1,1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,0,1,1,1,0],
    'G':[0,1,1,1,1,1,0,0,0,0,1,0,1,1,1,1,0,0,0,1,1,0,0,0,1,0,1,1,1,0],
    'L':[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,1,1,1,1],
    '0':[1,1,1,1,1,1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,1,1,1,1],
    '1':[0,0,1,0,0,0,1,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,1,1,1,0],
    '2':[0,1,1,1,0,1,0,0,0,1,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,1,1,1,1],
    '3':[1,1,1,1,1,0,0,0,0,1,0,0,0,1,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,1,1,1,1,1]
  };
  var bits = glyphs[str.toUpperCase()] || [];
  if(bits.length===0){
    // Try parsing as 35-char binary
    bits = str.split('').filter(function(c){return c==='1'||c==='0';}).map(Number);
  }
  if(bits.length===0) return;
  var cols = Math.sqrt(bits.length)|0;
  var rows = Math.ceil(bits.length/cols);
  var grd = document.createElement('div');
  grd.style.cssText = 'display:inline-grid;grid-template-columns:repeat('+cols+','+dotSize+'px);gap:'+gap+'px';
  bits.forEach(function(b){
    var dot = document.createElement('div');
    dot.style.cssText = 'width:'+dotSize+'px;height:'+dotSize+'px;border-radius:50%;background:'+(b?color:'#E5E5E0')+';transition:all .2s';
    grd.appendChild(dot);
  });
  el.innerHTML = '';
  el.appendChild(grd);
}

/* ─── Auto-init: data-haglofs-viz ─── */
function init(){
  document.querySelectorAll('[data-haglofs-viz]').forEach(function(el){
    var type = el.getAttribute('data-haglofs-viz');
    if(type==='gauge') renderGauge(el);
    else if(type==='sparkline') renderSparkline(el);
    else if(type==='dotmatrix') renderDotMatrix(el);
  });
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init);
else init();

/* Expose for manual use */
window.haglofsViz = { gauge: renderGauge, sparkline: renderSparkline, dotmatrix: renderDotMatrix };
})();
