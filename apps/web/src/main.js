// Composition root: único lugar que conoce las implementaciones concretas (inversión de dependencias).
import {GameSession,EventBus,MISSIONS,WORLD_WIDTH,BASE_ZONE} from '@marte/core';
import {LocalProgressRepository} from '@marte/infrastructure';
import {CanvasRenderer,Hud} from '@marte/renderer';
const bus=new EventBus(), session=new GameSession({catalog:MISSIONS,repository:new LocalProgressRepository(),bus});
const view=new CanvasRenderer(document.getElementById('game'),WORLD_WIDTH,BASE_ZONE), hud=new Hud(document,bus);
const keys=new Set();
addEventListener('keydown',e=>{ keys.add(e.code); if(e.code==='KeyE')session.requestMission(); if(e.code==='Space')e.preventDefault(); });
addEventListener('keyup',e=>keys.delete(e.code));
let last=performance.now();
(function loop(now){ const dt=Math.min(.05,(now-last)/1000); last=now;
 session.input.dir=(keys.has('ArrowRight')||keys.has('KeyD')?1:0)-(keys.has('ArrowLeft')||keys.has('KeyA')?1:0);
 session.input.work=keys.has('Space'); session.tick(dt); view.render(session,now/1000); hud.update(session); requestAnimationFrame(loop); })(last);
