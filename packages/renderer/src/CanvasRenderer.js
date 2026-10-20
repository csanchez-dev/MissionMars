const INK='#1a1208', LW=4;
/** Estrategia por instrumento: cada efecto dibuja su propia animación (abierto a extensión, cerrado a modificación). */
const FX={
 supercam:(c,x,y,t)=>{ c.strokeStyle='#ff3b30'; c.lineWidth=5; line(c,x+30,y-70,x+110,y+4); ring(c,x+110,y+4,10+4*Math.sin(t*30),'#ffe14d'); },
 abrasion:(c,x,y,t)=>sparks(c,x+60,y,t,'#ffd28a'),
 coring:(c,x,y,t)=>sparks(c,x+60,y,t,'#ff9a52'),
 default:(c,x,y,t)=>{ ring(c,x,y-40,40+(t*60)%50,'#5de0ff'); ring(c,x,y-40,20+(t*60)%30,'#fff'); }
};
const line=(c,a,b,d,e)=>{c.beginPath();c.moveTo(a,b);c.lineTo(d,e);c.stroke();};
const ring=(c,x,y,r,col)=>{c.strokeStyle=col;c.lineWidth=4;c.beginPath();c.arc(x,y,r,0,7);c.stroke();};
const sparks=(c,x,y,t,col)=>{c.fillStyle=col;for(let i=0;i<6;i++)c.fillRect(x+Math.sin(t*25+i*2)*18,y-Math.abs(Math.cos(t*20+i))*28,5,5);};

export class CanvasRenderer{
 constructor(canvas,worldWidth,baseZone){ this.cv=canvas; this.c=canvas.getContext('2d'); this.W=worldWidth; this.base=baseZone; this.rocks=Array.from({length:60},(_,i)=>({x:(i*173+(i*i*37)%90)%worldWidth,s:8+(i*13)%20})); }
 #shape(draw,fill){ const c=this.c; c.beginPath(); draw(c); c.fillStyle=fill; c.fill(); c.lineWidth=LW; c.strokeStyle=INK; c.lineJoin='round'; c.stroke(); }
 render(s,t){
  const {c,cv}=this, w=cv.width=innerWidth, h=cv.height=innerHeight, gy=h*0.74, cam=Math.max(0,Math.min(this.W-w,s.rover.x-w/2));
  [['#d98a5a',0],['#e49d68',.35],['#eeb27a',.7]].forEach(([col,a])=>{ c.fillStyle=col; c.fillRect(0,gy*a*.8,w,gy); });
  this.#shape(k=>k.arc(w*.78,gy*.3,46,0,7),'#cfe9ff'); // el sol marciano se ve azulado al atardecer
  [0,1,2].forEach(i=>this.#cloud((i*520-cam*.1+t*8)%(w+300)-150,70+i*45));
  this.#range(cam*.25,gy,'#b4553a',150,260); this.#range(cam*.5,gy,'#9c4430',90,190);
  this.#shape(k=>{k.rect(-10,gy,w+20,h-gy+10);},'#c1633a');
  this.rocks.forEach(r=>{ const x=r.x-cam; if(x>-40&&x<w+40)this.#shape(k=>{k.ellipse(x,gy+10,r.s*1.6,r.s,0,Math.PI,0);k.closePath();},'#8c3d26'); });
  this.#base(-cam,gy,t); if(s.mission)this.#beacon(s.mission,s.mission.x-cam,gy,t);
  this.#rover(s,s.rover.x-cam,gy+14,t);
 }
 #cloud(x,y){ this.#shape(k=>{k.ellipse(x,y,70,20,0,0,7);k.ellipse(x+30,y-18,34,22,0,0,7);},'#fff4e6'); }
 #range(off,gy,col,hMin,hMax){ this.#shape(k=>{ k.moveTo(-10,gy); for(let i=0;i<14;i++){ const x=i*190-off%190; k.lineTo(x,gy-hMin-((i*47)%(hMax-hMin))); k.lineTo(x+80,gy-hMin-((i*47)%(hMax-hMin))); k.lineTo(x+140,gy);} k.lineTo(9999,gy); },col); }
 #base(ox,gy,t){
  [[110,110],[290,80]].forEach(([x,r])=>{ this.#shape(k=>{k.arc(ox+x,gy,r,Math.PI,0);k.closePath();},'#f3ede0'); this.#shape(k=>k.arc(ox+x,gy-r*.5,r*.22,0,7),'#5de0ff'); });
  this.#shape(k=>k.rect(ox+380,gy-130,10,130),'#f3ede0'); this.#shape(k=>k.arc(ox+385,gy-135,10+3*Math.sin(t*4),0,7),'#ff3b30');
  this.#scientist(ox+345,gy,'#ffd90f','#fff'); this.#scientist(ox+325,gy,'#ffd90f','#5de0ff');
 }
 #scientist(x,y,skin,coat){ this.#shape(k=>k.rect(x-9,y-34,18,34),coat); this.#shape(k=>k.arc(x,y-46,14,0,7),skin); const c=this.c; c.fillStyle='#fff'; [-5,5].forEach(d=>{c.beginPath();c.arc(x+d,y-48,5,0,7);c.fill();c.stroke();c.fillStyle=INK;c.fillRect(x+d-1,y-49,3,3);c.fillStyle='#fff';}); }
 #beacon(m,x,gy,t){ const y=gy-130+6*Math.sin(t*3); this.#shape(k=>{k.moveTo(x,y);k.lineTo(x+16,y+20);k.lineTo(x,y+40);k.lineTo(x-16,y+20);k.closePath();},m.id==='monolith'?'#222':'#ffd90f'); this.c.fillStyle=INK; this.c.fillRect(x-2,y+40,4,90); }
 #rover(s,x,y,t){ const c=this.c,r=s.rover; c.save(); c.translate(x,y); c.scale(r.dir,1);
  this.#shape(k=>k.roundRect(-50,-62,100,34,8),'#f3ede0'); this.#shape(k=>k.rect(-62,-58,16,22),'#8a8f98'); // RTG
  this.#shape(k=>k.rect(24,-110,8,50),'#8a8f98'); this.#shape(k=>k.roundRect(16,-130,34,22,6),'#f3ede0'); this.#shape(k=>k.arc(44,-119,6,0,7),'#5de0ff');
  [-40,0,40].forEach(wx=>this.#shape(k=>k.arc(wx,-14,17,0,7),'#2a2a2e')); c.lineWidth=3; [-40,0,40].forEach(wx=>{const a=s.rover.x/12;line(c,wx,-14,wx+14*Math.cos(a),-14+14*Math.sin(a));});
  c.restore(); if(s.input.work&&s.atSite&&r.battery>0)(FX[s.mission.instrument]??FX.default)(c,x,y,t); }
}
