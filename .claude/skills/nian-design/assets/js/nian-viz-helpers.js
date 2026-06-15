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

/* ─── Scatter Plot ─── */
function renderScatter(el){
  var data=JSON.parse(el.getAttribute('data-points')||'[]');
  var w=parseInt(el.getAttribute('data-w'))||400,h=parseInt(el.getAttribute('data-h'))||280;
  var ns='http://www.w3.org/2000/svg';
  var svg=document.createElementNS(ns,'svg');
  svg.setAttribute('viewBox','0 0 '+w+' '+h);svg.style.width='100%';svg.style.height='auto';
  if(!data.length){el.textContent='[no data]';return;}
  var xs=data.map(function(d){return d[0]}),ys=data.map(function(d){return d[1]});
  var xMin=Math.min.apply(null,xs),xMax=Math.max.apply(null,xs);
  var yMin=Math.min.apply(null,ys),yMax=Math.max.apply(null,ys);
  var xR=xMax-xMin||1,yR=yMax-yMin||1,pad=40;
  // Grid
  for(var i=0;i<=4;i++){
    var gy=pad+(h-2*pad)*(1-i/4);
    var line=document.createElementNS(ns,'line');
    line.setAttribute('x1',pad);line.setAttribute('y1',gy);line.setAttribute('x2',w-pad);line.setAttribute('y2',gy);
    line.setAttribute('stroke','#E5E5E0');line.setAttribute('stroke-width','0.5');line.setAttribute('stroke-dasharray','4 4');
    svg.appendChild(line);
    var lbl=document.createElementNS(ns,'text');
    lbl.setAttribute('x',pad-4);lbl.setAttribute('y',gy+3);lbl.setAttribute('text-anchor','end');
    lbl.setAttribute('font-family','JetBrains Mono');lbl.setAttribute('font-size','9');lbl.setAttribute('fill','#A0A0A0');
    lbl.textContent=(yMin+yR*i/4).toFixed(1);svg.appendChild(lbl);
  }
  // Points
  var colors=['#4A5D3A','#8B7355','#2A4A5A','#E55B2B'];
  data.forEach(function(d,i){
    var cx=pad+(d[0]-xMin)/xR*(w-2*pad);
    var cy=pad+(1-(d[1]-yMin)/yR)*(h-2*pad);
    var c=document.createElementNS(ns,'circle');
    c.setAttribute('cx',cx);c.setAttribute('cy',cy);c.setAttribute('r','4');
    c.setAttribute('fill',colors[i%colors.length]);c.setAttribute('opacity','0.8');
    svg.appendChild(c);
  });
  el.innerHTML='';el.appendChild(svg);
}

/* ─── Heatmap ─── */
function renderHeatmap(el){
  var data=JSON.parse(el.getAttribute('data-matrix')||'[]');
  var labels=JSON.parse(el.getAttribute('data-labels')||'{}');
  var w=parseInt(el.getAttribute('data-w'))||400,h=parseInt(el.getAttribute('data-h'))||200;
  var ns='http://www.w3.org/2000/svg';
  var svg=document.createElementNS(ns,'svg');
  svg.setAttribute('viewBox','0 0 '+w+' '+h);svg.style.width='100%';svg.style.height='auto';
  if(!data.length){el.textContent='[no data]';return;}
  var rows=data.length,cols=data[0].length;
  var allVals=[];data.forEach(function(r){r.forEach(function(v){allVals.push(v)})});
  var vMin=Math.min.apply(null,allVals),vMax=Math.max.apply(null,allVals);
  var padL=60,padT=30,padB=20,padR=10;
  var cw=(w-padL-padR)/cols,ch=(h-padT-padB)/rows;
  var xLabels=labels.x||[],yLabels=labels.y||[];
  // Y labels
  yLabels.forEach(function(l,i){
    var t=document.createElementNS(ns,'text');
    t.setAttribute('x',padL-4);t.setAttribute('y',padT+i*ch+ch/2+3);
    t.setAttribute('text-anchor','end');t.setAttribute('font-family','JetBrains Mono');
    t.setAttribute('font-size','9');t.setAttribute('fill','#6B6B6B');t.textContent=l;
    svg.appendChild(t);
  });
  // X labels
  xLabels.forEach(function(l,i){
    var t=document.createElementNS(ns,'text');
    t.setAttribute('x',padL+i*cw+cw/2);t.setAttribute('y',padT-6);
    t.setAttribute('text-anchor','middle');t.setAttribute('font-family','JetBrains Mono');
    t.setAttribute('font-size','9');t.setAttribute('fill','#6B6B6B');t.textContent=l;
    svg.appendChild(t);
  });
  // Cells
  data.forEach(function(row,r){
    row.forEach(function(v,c){
      var norm=vMax>vMin?(v-vMin)/(vMax-vMin):0.5;
      var rect=document.createElementNS(ns,'rect');
      rect.setAttribute('x',padL+c*cw+1);rect.setAttribute('y',padT+r*ch+1);
      rect.setAttribute('width',cw-2);rect.setAttribute('height',ch-2);
      rect.setAttribute('rx','2');rect.setAttribute('fill','#4A5D3A');
      rect.setAttribute('opacity',String(0.15+norm*0.75));
      svg.appendChild(rect);
    });
  });
  el.innerHTML='';el.appendChild(svg);
}

/* ─── Radar Chart ─── */
function renderRadar(el){
  var data=JSON.parse(el.getAttribute('data-values')||'[]');
  var indicators=JSON.parse(el.getAttribute('data-indicators')||'[]');
  var w=parseInt(el.getAttribute('data-w'))||300,h=parseInt(el.getAttribute('data-h'))||300;
  var ns='http://www.w3.org/2000/svg';
  var svg=document.createElementNS(ns,'svg');
  svg.setAttribute('viewBox','0 0 '+w+' '+h);svg.style.width='100%';svg.style.height='auto';
  if(!data.length){el.textContent='[no data]';return;}
  var cx=w/2,cy=h/2,r=Math.min(cx,cy)-40,n=data.length;
  // Grid rings
  for(var ring=1;ring<=4;ring++){
    var rr=r*ring/4;var pts=[];
    for(var i=0;i<n;i++){
      var a=Math.PI*2*i/n-Math.PI/2;
      pts.push((cx+rr*Math.cos(a)).toFixed(1)+','+(cy+rr*Math.sin(a)).toFixed(1));
    }
    var poly=document.createElementNS(ns,'polygon');
    poly.setAttribute('points',pts.join(' '));poly.setAttribute('fill','none');
    poly.setAttribute('stroke','#E5E5E0');poly.setAttribute('stroke-width','0.5');
    svg.appendChild(poly);
  }
  // Axes + labels
  for(var i=0;i<n;i++){
    var a=Math.PI*2*i/n-Math.PI/2;
    var line=document.createElementNS(ns,'line');
    line.setAttribute('x1',cx);line.setAttribute('y1',cy);
    line.setAttribute('x2',cx+r*Math.cos(a));line.setAttribute('y2',cy+r*Math.sin(a));
    line.setAttribute('stroke','#E5E5E0');line.setAttribute('stroke-width','0.5');
    svg.appendChild(line);
    var lx=cx+(r+18)*Math.cos(a),ly=cy+(r+18)*Math.sin(a);
    var t=document.createElementNS(ns,'text');
    t.setAttribute('x',lx);t.setAttribute('y',ly+3);t.setAttribute('text-anchor','middle');
    t.setAttribute('font-family','JetBrains Mono');t.setAttribute('font-size','9');
    t.setAttribute('fill','#6B6B6B');
    t.textContent=indicators[i]||'';svg.appendChild(t);
  }
  // Data polygon
  var pts=[];
  for(var i=0;i<n;i++){
    var a=Math.PI*2*i/n-Math.PI/2;
    var dr=r*data[i]/100;
    pts.push((cx+dr*Math.cos(a)).toFixed(1)+','+(cy+dr*Math.sin(a)).toFixed(1));
  }
  var poly=document.createElementNS(ns,'polygon');
  poly.setAttribute('points',pts.join(' '));poly.setAttribute('fill','rgba(74,93,58,0.12)');
  poly.setAttribute('stroke','#4A5D3A');poly.setAttribute('stroke-width','2');
  svg.appendChild(poly);
  // Dots
  for(var i=0;i<n;i++){
    var a=Math.PI*2*i/n-Math.PI/2;
    var dr=r*data[i]/100;
    var dot=document.createElementNS(ns,'circle');
    dot.setAttribute('cx',cx+dr*Math.cos(a));dot.setAttribute('cy',cy+dr*Math.sin(a));
    dot.setAttribute('r','3');dot.setAttribute('fill','#4A5D3A');svg.appendChild(dot);
  }
  el.innerHTML='';el.appendChild(svg);
}

/* ─── Funnel Chart ─── */
function renderFunnel(el){
  var data=JSON.parse(el.getAttribute('data-values')||'[]');
  var w=parseInt(el.getAttribute('data-w'))||400,h=parseInt(el.getAttribute('data-h'))||280;
  var ns='http://www.w3.org/2000/svg';
  var svg=document.createElementNS(ns,'svg');
  svg.setAttribute('viewBox','0 0 '+w+' '+h);svg.style.width='100%';svg.style.height='auto';
  if(!data.length){el.textContent='[no data]';return;}
  var maxVal=data[0].value||1;
  var colors=['#4A5D3A','#5A7A4A','#6B8A5B','#8B7355','#2A4A5A'];
  var stepH=(h-20)/data.length,pad=20;
  data.forEach(function(d,i){
    var ratio=d.value/maxVal;
    var topW=(w-2*pad)*ratio;
    var nextRatio=i<data.length-1?(data[i+1].value/maxVal):ratio*0.6;
    var botW=(w-2*pad)*nextRatio;
    var y=10+i*stepH;
    var pts=[(w/2-topW/2)+','+y,(w/2+topW/2)+','+y,(w/2+botW/2)+','+(y+stepH-2),(w/2-botW/2)+','+(y+stepH-2)];
    var poly=document.createElementNS(ns,'polygon');
    poly.setAttribute('points',pts.join(' '));poly.setAttribute('fill',colors[i%colors.length]);
    poly.setAttribute('opacity','0.85');svg.appendChild(poly);
    var t=document.createElementNS(ns,'text');
    t.setAttribute('x',w/2);t.setAttribute('y',y+stepH/2+3);t.setAttribute('text-anchor','middle');
    t.setAttribute('font-family','Inter');t.setAttribute('font-size','11');t.setAttribute('fill','#fff');t.setAttribute('font-weight','500');
    t.textContent=d.name+' '+d.value;svg.appendChild(t);
  });
  el.innerHTML='';el.appendChild(svg);
}

/* ─── Box Plot ─── */
function renderBoxPlot(el){
  var data=JSON.parse(el.getAttribute('data-series')||'[]');
  var w=parseInt(el.getAttribute('data-w'))||400,h=parseInt(el.getAttribute('data-h'))||240;
  var ns='http://www.w3.org/2000/svg';
  var svg=document.createElementNS(ns,'svg');
  svg.setAttribute('viewBox','0 0 '+w+' '+h);svg.style.width='100%';svg.style.height='auto';
  if(!data.length){el.textContent='[no data]';return;}
  var allVals=[];data.forEach(function(d){allVals=allVals.concat(d.values)});
  var vMin=Math.min.apply(null,allVals),vMax=Math.max.apply(null,allVals);
  var vR=vMax-vMin||1,pad=50,boxW=Math.min(40,(w-2*pad)/data.length-10);
  // Y axis
  for(var i=0;i<=4;i++){
    var gy=h-pad+10-(h-2*pad+10)*i/4;
    var line=document.createElementNS(ns,'line');
    line.setAttribute('x1',pad-5);line.setAttribute('y1',gy);line.setAttribute('x2',w-10);line.setAttribute('y2',gy);
    line.setAttribute('stroke','#E5E5E0');line.setAttribute('stroke-width','0.5');line.setAttribute('stroke-dasharray','3 3');
    svg.appendChild(line);
    var t=document.createElementNS(ns,'text');
    t.setAttribute('x',pad-8);t.setAttribute('y',gy+3);t.setAttribute('text-anchor','end');
    t.setAttribute('font-family','JetBrains Mono');t.setAttribute('font-size','9');t.setAttribute('fill','#A0A0A0');
    t.textContent=(vMin+vR*i/4).toFixed(0);svg.appendChild(t);
  }
  data.forEach(function(d,i){
    var vals=d.values.slice().sort(function(a,b){return a-b});
    var q1=vals[Math.floor(vals.length*0.25)];
    var med=vals[Math.floor(vals.length*0.5)];
    var q3=vals[Math.floor(vals.length*0.75)];
    var lo=vals[0],hi=vals[vals.length-1];
    var x=pad+i*((w-2*pad)/data.length)+((w-2*pad)/data.length-boxW)/2;
    var yScale=function(v){return h-pad+10-(v-vMin)/vR*(h-2*pad+10);};
    // Whiskers
    var wl=document.createElementNS(ns,'line');
    wl.setAttribute('x1',x+boxW/2);wl.setAttribute('y1',yScale(hi));
    wl.setAttribute('x2',x+boxW/2);wl.setAttribute('y2',yScale(q3));
    wl.setAttribute('stroke','#2C2C2C');wl.setAttribute('stroke-width','1');svg.appendChild(wl);
    var bl=document.createElementNS(ns,'line');
    bl.setAttribute('x1',x+boxW/2);bl.setAttribute('y1',yScale(q1));
    bl.setAttribute('x2',x+boxW/2);bl.setAttribute('y2',yScale(lo));
    bl.setAttribute('stroke','#2C2C2C');bl.setAttribute('stroke-width','1');svg.appendChild(bl);
    // Caps
    [hi,lo].forEach(function(v){
      var cap=document.createElementNS(ns,'line');
      cap.setAttribute('x1',x+boxW/2-8);cap.setAttribute('y1',yScale(v));
      cap.setAttribute('x2',x+boxW/2+8);cap.setAttribute('y2',yScale(v));
      cap.setAttribute('stroke','#2C2C2C');cap.setAttribute('stroke-width','1');svg.appendChild(cap);
    });
    // Box
    var rect=document.createElementNS(ns,'rect');
    rect.setAttribute('x',x);rect.setAttribute('y',yScale(q3));
    rect.setAttribute('width',boxW);rect.setAttribute('height',yScale(q1)-yScale(q3));
    rect.setAttribute('fill','rgba(74,93,58,0.15)');rect.setAttribute('stroke','#4A5D3A');
    rect.setAttribute('stroke-width','1.5');rect.setAttribute('rx','2');svg.appendChild(rect);
    // Median
    var ml=document.createElementNS(ns,'line');
    ml.setAttribute('x1',x);ml.setAttribute('y1',yScale(med));
    ml.setAttribute('x2',x+boxW);ml.setAttribute('y2',yScale(med));
    ml.setAttribute('stroke','#E55B2B');ml.setAttribute('stroke-width','2');svg.appendChild(ml);
    // Label
    var t=document.createElementNS(ns,'text');
    t.setAttribute('x',x+boxW/2);t.setAttribute('y',h-8);t.setAttribute('text-anchor','middle');
    t.setAttribute('font-family','JetBrains Mono');t.setAttribute('font-size','9');t.setAttribute('fill','#6B6B6B');
    t.textContent=d.name||(''+(i+1));svg.appendChild(t);
  });
  el.innerHTML='';el.appendChild(svg);
}

/* ─── Small Multiples ─── */
function renderSmallMultiples(el){
  var data=JSON.parse(el.getAttribute('data-series')||'[]');
  var w=parseInt(el.getAttribute('data-w'))||160,h=parseInt(el.getAttribute('data-h'))||60;
  var ns='http://www.w3.org/2000/svg';
  el.innerHTML='';
  var grid=document.createElement('div');
  grid.style.cssText='display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:16px';
  var colors=['#4A5D3A','#8B7355','#2A4A5A','#E55B2B'];
  data.forEach(function(s,i){
    var card=document.createElement('div');
    card.style.cssText='border-top:1px solid #E5E5E0;padding-top:8px';
    var title=document.createElement('div');
    title.style.cssText='font-family:JetBrains Mono;font-size:10px;font-weight:600;color:#2C2C2C;letter-spacing:0.04em;margin-bottom:4px';
    title.textContent=s.name;card.appendChild(title);
    // Mini sparkline
    var svg=document.createElementNS(ns,'svg');
    svg.setAttribute('viewBox','0 0 '+w+' '+h);svg.style.width='100%';svg.style.height='auto';
    var vals=s.values;if(vals.length<2)return;
    var mn=Math.min.apply(null,vals),mx=Math.max.apply(null,vals),rng=mx-mn||1;
    var pts=vals.map(function(v,j){return [j*w/(vals.length-1),h-((v-mn)/rng)*(h-4)-2];});
    var d='M'+pts.map(function(p){return p[0].toFixed(1)+' '+p[1].toFixed(1);}).join(' L');
    var path=document.createElementNS(ns,'path');
    path.setAttribute('d',d);path.setAttribute('fill','none');
    path.setAttribute('stroke',colors[i%colors.length]);path.setAttribute('stroke-width','1.5');
    path.setAttribute('stroke-linecap','round');svg.appendChild(path);
    card.appendChild(svg);
    // Value
    var last=vals[vals.length-1],first=vals[0];
    var chg=first===0?0:((last-first)/first*100).toFixed(1);
    var val=document.createElement('div');
    val.style.cssText='font-family:JetBrains Mono;font-size:11px;margin-top:4px;color:#6B6B6B';
    val.textContent=last+(chg>0?' ▲':' ▼')+Math.abs(chg)+'%';
    card.appendChild(val);
    grid.appendChild(card);
  });
  el.appendChild(grid);
}

/* ─── Gantt Chart ─── */
function renderGantt(el){
  var data=JSON.parse(el.getAttribute('data-tasks')||'[]');
  var w=parseInt(el.getAttribute('data-w'))||500,h=parseInt(el.getAttribute('data-h'))||240;
  var ns='http://www.w3.org/2000/svg';
  var svg=document.createElementNS(ns,'svg');
  svg.setAttribute('viewBox','0 0 '+w+' '+h);svg.style.width='100%';svg.style.height='auto';
  if(!data.length){el.textContent='[no data]';return;}
  var tMin=Infinity,tMax=0;
  data.forEach(function(d){if(d.start<tMin)tMin=d.start;if(d.end>tMax)tMax=d.end;});
  var tR=tMax-tMin||1;
  var padL=100,padR=20,padT=10,padB=20;
  var barH=Math.min(24,(h-padT-padB)/data.length-4);
  var colors={'done':'#4A5D3A','active':'#E55B2B','pending':'#E5E5E0'};
  data.forEach(function(d,i){
    var y=padT+i*(barH+4);
    var x1=padL+(d.start-tMin)/tR*(w-padL-padR);
    var x2=padL+(d.end-tMin)/tR*(w-padL-padR);
    // Label
    var t=document.createElementNS(ns,'text');
    t.setAttribute('x',padL-6);t.setAttribute('y',y+barH/2+3);t.setAttribute('text-anchor','end');
    t.setAttribute('font-family','JetBrains Mono');t.setAttribute('font-size','10');t.setAttribute('fill','#6B6B6B');
    t.textContent=d.name;svg.appendChild(t);
    // Bar
    var rect=document.createElementNS(ns,'rect');
    rect.setAttribute('x',x1);rect.setAttribute('y',y);
    rect.setAttribute('width',Math.max(x2-x1,4));rect.setAttribute('height',barH);
    rect.setAttribute('rx','2');rect.setAttribute('fill',colors[d.status]||'#4A5D3A');
    rect.setAttribute('opacity',d.status==='pending'?'0.3':'0.8');svg.appendChild(rect);
  });
  el.innerHTML='';el.appendChild(svg);
}

/* ─── Treemap ─── */
function renderTreemap(el){
  var data=JSON.parse(el.getAttribute('data-values')||'[]');
  var w=parseInt(el.getAttribute('data-w'))||400,h=parseInt(el.getAttribute('data-h'))||280;
  var ns='http://www.w3.org/2000/svg';
  var svg=document.createElementNS(ns,'svg');
  svg.setAttribute('viewBox','0 0 '+w+' '+h);svg.style.width='100%';svg.style.height='auto';
  if(!data.length){el.textContent='[no data]';return;}
  var total=data.reduce(function(s,d){return s+d.value},0);
  var colors=['#4A5D3A','#5A7A4A','#8B7355','#2A4A5A','#E55B2B'];
  // Simple slice-and-dice
  var x=0;data.forEach(function(d,i){
    var ratio=d.value/total;
    var rw=w*ratio;
    var rect=document.createElementNS(ns,'rect');
    rect.setAttribute('x',x);rect.setAttribute('y',0);
    rect.setAttribute('width',Math.max(rw-1,1));rect.setAttribute('height',h);
    rect.setAttribute('fill',colors[i%colors.length]);rect.setAttribute('opacity','0.75');
    svg.appendChild(rect);
    if(rw>40){
      var t=document.createElementNS(ns,'text');
      t.setAttribute('x',x+rw/2);t.setAttribute('y',h/2-6);t.setAttribute('text-anchor','middle');
      t.setAttribute('font-family','JetBrains Mono');t.setAttribute('font-size','12');t.setAttribute('fill','#fff');t.setAttribute('font-weight','600');
      t.textContent=d.value;svg.appendChild(t);
      var l=document.createElementNS(ns,'text');
      l.setAttribute('x',x+rw/2);l.setAttribute('y',h/2+10);l.setAttribute('text-anchor','middle');
      l.setAttribute('font-family','Inter');l.setAttribute('font-size','9');l.setAttribute('fill','rgba(255,255,255,0.7)');
      l.textContent=d.name;svg.appendChild(l);
    }
    x+=rw;
  });
  el.innerHTML='';el.appendChild(svg);
}

/* ─── Candlestick ─── */
function renderCandlestick(el){
  var data=JSON.parse(el.getAttribute('data-values')||'[]');
  var w=parseInt(el.getAttribute('data-w'))||400,h=parseInt(el.getAttribute('data-h'))||240;
  var ns='http://www.w3.org/2000/svg';
  var svg=document.createElementNS(ns,'svg');
  svg.setAttribute('viewBox','0 0 '+w+' '+h);svg.style.width='100%';svg.style.height='auto';
  if(!data.length){el.textContent='[no data]';return;}
  var allV=[];data.forEach(function(d){allV.push(d.high,d.low)});
  var vMin=Math.min.apply(null,allV),vMax=Math.max.apply(null,allV),vR=vMax-vMin||1;
  var pad=40,barW=Math.min(12,(w-2*pad)/data.length-4);
  var yScale=function(v){return h-pad-(v-vMin)/vR*(h-2*pad);};
  // Grid
  for(var i=0;i<=4;i++){
    var gy=pad+(h-2*pad)*(1-i/4);
    var line=document.createElementNS(ns,'line');
    line.setAttribute('x1',pad);line.setAttribute('y1',gy);line.setAttribute('x2',w-pad);line.setAttribute('y2',gy);
    line.setAttribute('stroke','#E5E5E0');line.setAttribute('stroke-width','0.5');line.setAttribute('stroke-dasharray','3 3');
    svg.appendChild(line);
  }
  data.forEach(function(d,i){
    var x=pad+i*((w-2*pad)/data.length)+((w-2*pad)/data.length-barW)/2;
    var bullish=d.close>=d.open;
    var color=bullying?'#4A5D3A':'#C62828';
    // Wick
    var wick=document.createElementNS(ns,'line');
    wick.setAttribute('x1',x+barW/2);wick.setAttribute('y1',yScale(d.high));
    wick.setAttribute('x2',x+barW/2);wick.setAttribute('y2',yScale(d.low));
    wick.setAttribute('stroke',color);wick.setAttribute('stroke-width','1');svg.appendChild(wick);
    // Body
    var bodyTop=yScale(Math.max(d.open,d.close));
    var bodyBot=yScale(Math.min(d.open,d.close));
    var rect=document.createElementNS(ns,'rect');
    rect.setAttribute('x',x);rect.setAttribute('y',bodyTop);
    rect.setAttribute('width',barW);rect.setAttribute('height',Math.max(bodyBot-bodyTop,1));
    rect.setAttribute('fill',color);rect.setAttribute('rx','1');svg.appendChild(rect);
  });
  el.innerHTML='';el.appendChild(svg);
}

/* ─── Swimlane ─── */
function renderSwimlane(el){
  var data=JSON.parse(el.getAttribute('data-lanes')||'[]');
  var w=parseInt(el.getAttribute('data-w'))||500,h=parseInt(el.getAttribute('data-h'))||240;
  var ns='http://www.w3.org/2000/svg';
  var svg=document.createElementNS(ns,'svg');
  svg.setAttribute('viewBox','0 0 '+w+' '+h);svg.style.width='100%';svg.style.height='auto';
  if(!data.length){el.textContent='[no data]';return;}
  var laneH=h/data.length;
  var colors=['#4A5D3A','#2A4A5A','#E55B2B','#8B7355'];
  data.forEach(function(lane,i){
    var y=i*laneH;
    // Lane bg
    var bg=document.createElementNS(ns,'rect');
    bg.setAttribute('x',0);bg.setAttribute('y',y);bg.setAttribute('width',w);bg.setAttribute('height',laneH);
    bg.setAttribute('fill',i%2===0?'#FAFAF8':'#F5F5F0');svg.appendChild(bg);
    // Lane label
    var t=document.createElementNS(ns,'text');
    t.setAttribute('x',8);t.setAttribute('y',y+laneH/2+3);t.setAttribute('font-family','JetBrains Mono');
    t.setAttribute('font-size','9');t.setAttribute('fill','#6B6B6B');t.setAttribute('letter-spacing','0.06em');
    t.textContent=lane.name.toUpperCase();svg.appendChild(t);
    // Tasks
    if(lane.tasks){
      lane.tasks.forEach(function(task){
        var tx=80+task.start/100*(w-100);
        var tw=task.duration/100*(w-100);
        var rect=document.createElementNS(ns,'rect');
        rect.setAttribute('x',tx);rect.setAttribute('y',y+6);
        rect.setAttribute('width',Math.max(tw,20));rect.setAttribute('height',laneH-12);
        rect.setAttribute('rx','3');rect.setAttribute('fill',colors[i%colors.length]);
        rect.setAttribute('opacity','0.7');svg.appendChild(rect);
        if(tw>30){
          var tt=document.createElementNS(ns,'text');
          tt.setAttribute('x',tx+6);tt.setAttribute('y',y+laneH/2+3);
          tt.setAttribute('font-family','Inter');tt.setAttribute('font-size','9');tt.setAttribute('fill','#fff');
          tt.textContent=task.label;svg.appendChild(tt);
        }
      });
    }
  });
  el.innerHTML='';el.appendChild(svg);
}

/* ─── Venn Diagram ─── */
function renderVenn(el){
  var data=JSON.parse(el.getAttribute('data-sets')||'[]');
  var w=parseInt(el.getAttribute('data-w'))||360,h=parseInt(el.getAttribute('data-h'))||280;
  var ns='http://www.w3.org/2000/svg';
  var svg=document.createElementNS(ns,'svg');
  svg.setAttribute('viewBox','0 0 '+w+' '+h);svg.style.width='100%';svg.style.height='auto';
  if(!data.length){el.textContent='[no data]';return;}
  var cx=w/2,cy=h/2,r=Math.min(cx,cy)-30;
  var colors=['rgba(74,93,58,0.35)','rgba(139,115,85,0.35)','rgba(42,74,90,0.35)'];
  var strokeColors=['#4A5D3A','#8B7355','#2A4A5A'];
  var n=Math.min(data.length,3);
  var positions=[[cx-r*0.35,cy-r*0.2],[cx+r*0.35,cy-r*0.2],[cx,cy+r*0.35]];
  for(var i=0;i<n;i++){
    var c=document.createElementNS(ns,'circle');
    c.setAttribute('cx',positions[i][0]);c.setAttribute('cy',positions[i][1]);
    c.setAttribute('r',r*0.6);c.setAttribute('fill',colors[i]);
    c.setAttribute('stroke',strokeColors[i]);c.setAttribute('stroke-width','1.5');
    svg.appendChild(c);
    var t=document.createElementNS(ns,'text');
    t.setAttribute('x',positions[i][0]);t.setAttribute('y',positions[i][1]-r*0.3);
    t.setAttribute('text-anchor','middle');t.setAttribute('font-family','JetBrains Mono');
    t.setAttribute('font-size','10');t.setAttribute('fill',strokeColors[i]);t.setAttribute('font-weight','600');
    t.textContent=data[i].name;svg.appendChild(t);
    var v=document.createElementNS(ns,'text');
    v.setAttribute('x',positions[i][0]);v.setAttribute('y',positions[i][1]+4);
    v.setAttribute('text-anchor','middle');v.setAttribute('font-family','JetBrains Mono');
    v.setAttribute('font-size','14');v.setAttribute('fill','#2C2C2C');v.setAttribute('font-weight','600');
    v.textContent=data[i].value;svg.appendChild(v);
  }
  el.innerHTML='';el.appendChild(svg);
}

/* ─── Pyramid ─── */
function renderPyramid(el){
  var data=JSON.parse(el.getAttribute('data-levels')||'[]');
  var w=parseInt(el.getAttribute('data-w'))||400,h=parseInt(el.getAttribute('data-h'))||280;
  var ns='http://www.w3.org/2000/svg';
  var svg=document.createElementNS(ns,'svg');
  svg.setAttribute('viewBox','0 0 '+w+' '+h);svg.style.width='100%';svg.style.height='auto';
  if(!data.length){el.textContent='[no data]';return;}
  var colors=['#4A5D3A','#5A7A4A','#8B7355','#2A4A5A','#E55B2B'];
  var stepH=h/data.length;
  data.forEach(function(d,i){
    var topW=w*0.9*(1-i/data.length*0.7);
    var botW=w*0.9*(1-(i+1)/data.length*0.7);
    var y=i*stepH;
    var pts=[(w/2-topW/2)+','+y,(w/2+topW/2)+','+y,(w/2+botW/2)+','+(y+stepH),(w/2-botW/2)+','+(y+stepH)];
    var poly=document.createElementNS(ns,'polygon');
    poly.setAttribute('points',pts.join(' '));poly.setAttribute('fill',colors[i%colors.length]);
    poly.setAttribute('opacity','0.8');svg.appendChild(poly);
    var t=document.createElementNS(ns,'text');
    t.setAttribute('x',w/2);t.setAttribute('y',y+stepH/2+4);t.setAttribute('text-anchor','middle');
    t.setAttribute('font-family','Inter');t.setAttribute('font-size','12');t.setAttribute('fill','#fff');t.setAttribute('font-weight','500');
    t.textContent=d.name;svg.appendChild(t);
  });
  el.innerHTML='';el.appendChild(svg);
}

/* ─── State Machine ─── */
function renderStateMachine(el){
  var data=JSON.parse(el.getAttribute('data-states')||'[]');
  var w=parseInt(el.getAttribute('data-w'))||500,h=parseInt(el.getAttribute('data-h'))||200;
  var ns='http://www.w3.org/2000/svg';
  var svg=document.createElementNS(ns,'svg');
  svg.setAttribute('viewBox','0 0 '+w+' '+h);svg.style.width='100%';svg.style.height='auto';
  if(!data.length){el.textContent='[no data]';return;}
  var r=24,pad=60;
  var gap=(w-2*pad)/(data.length-1||1);
  var positions=data.map(function(d,i){return [pad+i*gap,h/2];});
  // Transitions
  data.forEach(function(d,i){
    if(i>=data.length-1)return;
    var from=positions[i],to=positions[i+1];
    var line=document.createElementNS(ns,'line');
    line.setAttribute('x1',from[0]+r);line.setAttribute('y1',from[1]);
    line.setAttribute('x2',to[0]-r);line.setAttribute('y2',to[1]);
    line.setAttribute('stroke','#C0C0B8');line.setAttribute('stroke-width','1.5');
    line.setAttribute('marker-end','url(#sm-arrow)');svg.appendChild(line);
    if(d.transition){
      var t=document.createElementNS(ns,'text');
      t.setAttribute('x',(from[0]+to[0])/2);t.setAttribute('y',from[1]-10);
      t.setAttribute('text-anchor','middle');t.setAttribute('font-family','JetBrains Mono');
      t.setAttribute('font-size','8');t.setAttribute('fill','#A0A0A0');
      t.textContent=d.transition;svg.appendChild(t);
    }
  });
  // Arrow marker
  var defs=document.createElementNS(ns,'defs');
  var marker=document.createElementNS(ns,'marker');
  marker.setAttribute('id','sm-arrow');marker.setAttribute('viewBox','0 0 10 10');
  marker.setAttribute('refX','8');marker.setAttribute('refY','5');marker.setAttribute('markerWidth','5');marker.setAttribute('markerHeight','5');
  marker.setAttribute('orient','auto');
  var mp=document.createElementNS(ns,'path');mp.setAttribute('d','M 0 0 L 10 5 L 0 10 Z');mp.setAttribute('fill','#C0C0B8');
  marker.appendChild(mp);defs.appendChild(marker);svg.appendChild(defs);
  // State nodes
  var stateColors={'start':'#4A5D3A','active':'#E55B2B','end':'#8B7355','default':'#2C2C2C'};
  data.forEach(function(d,i){
    var p=positions[i];
    var c=document.createElementNS(ns,'circle');
    c.setAttribute('cx',p[0]);c.setAttribute('cy',p[1]);c.setAttribute('r',r);
    c.setAttribute('fill',d.type==='start'?'#4A5D3A':d.type==='active'?'#E55B2B':'#fff');
    c.setAttribute('stroke',stateColors[d.type]||'#2C2C2C');c.setAttribute('stroke-width','2');
    svg.appendChild(c);
    var t=document.createElementNS(ns,'text');
    t.setAttribute('x',p[0]);t.setAttribute('y',p[1]+3);t.setAttribute('text-anchor','middle');
    t.setAttribute('font-family','JetBrains Mono');t.setAttribute('font-size','9');
    t.setAttribute('fill',d.type==='start'||d.type==='active'?'#fff':'#2C2C2C');
    t.textContent=d.label;svg.appendChild(t);
    var name=document.createElementNS(ns,'text');
    name.setAttribute('x',p[0]);name.setAttribute('y',p[1]+r+14);name.setAttribute('text-anchor','middle');
    name.setAttribute('font-family','Inter');name.setAttribute('font-size','10');name.setAttribute('fill','#6B6B6B');
    name.textContent=d.name;svg.appendChild(name);
  });
  el.innerHTML='';el.appendChild(svg);
}

/* ─── Tree ─── */
function renderTree(el){
  var data=JSON.parse(el.getAttribute('data-tree')||'{}');
  var w=parseInt(el.getAttribute('data-w'))||500,h=parseInt(el.getAttribute('data-h'))||300;
  var ns='http://www.w3.org/2000/svg';
  var svg=document.createElementNS(ns,'svg');
  svg.setAttribute('viewBox','0 0 '+w+' '+h);svg.style.width='100%';svg.style.height='auto';
  if(!data.name){el.textContent='[no data]';return;}
  var nodeR=16,levelH=h/3;
  function render(node,x,y,spread){
    // Node
    var c=document.createElementNS(ns,'circle');
    c.setAttribute('cx',x);c.setAttribute('cy',y);c.setAttribute('r',nodeR);
    c.setAttribute('fill','#fff');c.setAttribute('stroke','#4A5D3A');c.setAttribute('stroke-width','1.5');
    svg.appendChild(c);
    var t=document.createElementNS(ns,'text');
    t.setAttribute('x',x);t.setAttribute('y',y+3);t.setAttribute('text-anchor','middle');
    t.setAttribute('font-family','JetBrains Mono');t.setAttribute('font-size','8');t.setAttribute('fill','#2C2C2C');
    t.textContent=node.name;svg.appendChild(t);
    // Children
    if(node.children&&node.children.length){
      var childSpread=spread*0.5;
      var totalW=childSpread*(node.children.length-1);
      var startX=x-totalW/2;
      node.children.forEach(function(child,i){
        var cx=startX+i*childSpread;
        var cy=y+levelH;
        // Connection line
        var line=document.createElementNS(ns,'line');
        line.setAttribute('x1',x);line.setAttribute('y1',y+nodeR);
        line.setAttribute('x2',cx);line.setAttribute('y2',cy-nodeR);
        line.setAttribute('stroke','#C0C0B8');line.setAttribute('stroke-width','1');svg.appendChild(line);
        render(child,cx,cy,childSpread);
      });
    }
  }
  render(data,w/2,nodeR+10,w*0.8);
  el.innerHTML='';el.appendChild(svg);
}

/* ─── Architecture ─── */
function renderArchitecture(el){
  var data=JSON.parse(el.getAttribute('data-layers')||'[]');
  var w=parseInt(el.getAttribute('data-w'))||500,h=parseInt(el.getAttribute('data-h'))||300;
  var ns='http://www.w3.org/2000/svg';
  var svg=document.createElementNS(ns,'svg');
  svg.setAttribute('viewBox','0 0 '+w+' '+h);svg.style.width='100%';svg.style.height='auto';
  if(!data.length){el.textContent='[no data]';return;}
  var layerH=(h-20)/data.length;
  var colors=['#4A5D3A','#5A7A4A','#8B7355','#2A4A5A','#E55B2B'];
  data.forEach(function(layer,i){
    var y=10+i*layerH;
    // Layer bg
    var rect=document.createElementNS(ns,'rect');
    rect.setAttribute('x',10);rect.setAttribute('y',y);
    rect.setAttribute('width',w-20);rect.setAttribute('height',layerH-4);
    rect.setAttribute('rx','3');rect.setAttribute('fill',colors[i%colors.length]);
    rect.setAttribute('opacity','0.08');rect.setAttribute('stroke',colors[i%colors.length]);
    rect.setAttribute('stroke-width','1');svg.appendChild(rect);
    // Layer label
    var t=document.createElementNS(ns,'text');
    t.setAttribute('x',20);t.setAttribute('y',y+14);t.setAttribute('font-family','JetBrains Mono');
    t.setAttribute('font-size','9');t.setAttribute('fill',colors[i%colors.length]);
    t.setAttribute('letter-spacing','0.08em');t.textContent=layer.name.toUpperCase();svg.appendChild(t);
    // Components
    if(layer.components){
      var compW=Math.min(80,(w-60)/layer.components.length-8);
      layer.components.forEach(function(comp,j){
        var cx=30+j*(compW+8);
        var cy=y+22;
        var cr=document.createElementNS(ns,'rect');
        cr.setAttribute('x',cx);cr.setAttribute('y',cy);
        cr.setAttribute('width',compW);cr.setAttribute('height',layerH-32);
        cr.setAttribute('rx','2');cr.setAttribute('fill',colors[i%colors.length]);
        cr.setAttribute('opacity','0.15');svg.appendChild(cr);
        if(compW>40){
          var ct=document.createElementNS(ns,'text');
          ct.setAttribute('x',cx+compW/2);ct.setAttribute('y',cy+(layerH-32)/2+3);
          ct.setAttribute('text-anchor','middle');ct.setAttribute('font-family','Inter');
          ct.setAttribute('font-size','8');ct.setAttribute('fill','#2C2C2C');
          ct.textContent=comp;svg.appendChild(ct);
        }
      });
    }
    // Connection lines to next layer
    if(i<data.length-1){
      var line=document.createElementNS(ns,'line');
      line.setAttribute('x1',w/2);line.setAttribute('y1',y+layerH-4);
      line.setAttribute('x2',w/2);line.setAttribute('y2',y+layerH);
      line.setAttribute('stroke','#C0C0B8');line.setAttribute('stroke-width','1');
      line.setAttribute('stroke-dasharray','3 2');svg.appendChild(line);
    }
  });
  el.innerHTML='';el.appendChild(svg);
}

/* ─── Auto-init: data-haglofs-viz ─── */
function init(){
  document.querySelectorAll('[data-haglofs-viz]').forEach(function(el){
    var type = el.getAttribute('data-haglofs-viz');
    var map = {
      gauge: renderGauge, sparkline: renderSparkline, dotmatrix: renderDotMatrix,
      scatter: renderScatter, heatmap: renderHeatmap, radar: renderRadar,
      funnel: renderFunnel, boxplot: renderBoxPlot, smallmultiples: renderSmallMultiples,
      gantt: renderGantt, treemap: renderTreemap, candlestick: renderCandlestick,
      swimlane: renderSwimlane, venn: renderVenn, pyramid: renderPyramid,
      statemachine: renderStateMachine, tree: renderTree, architecture: renderArchitecture
    };
    if(map[type]) map[type](el);
  });
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init);
else init();

/* Expose for manual use */
window.haglofsViz = {
  gauge: renderGauge, sparkline: renderSparkline, dotmatrix: renderDotMatrix,
  scatter: renderScatter, heatmap: renderHeatmap, radar: renderRadar,
  funnel: renderFunnel, boxplot: renderBoxPlot, smallmultiples: renderSmallMultiples,
  gantt: renderGantt, treemap: renderTreemap, candlestick: renderCandlestick,
  swimlane: renderSwimlane, venn: renderVenn, pyramid: renderPyramid,
  statemachine: renderStateMachine, tree: renderTree, architecture: renderArchitecture
};
})();
