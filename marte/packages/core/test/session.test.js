import test from 'node:test'; import assert from 'node:assert';
import {GameSession,EventBus,MISSIONS} from '../src/index.js';
const repo={load:()=>({points:0,done:[],sol:1}),save(){}};
test('completar una misión suma puntos y sube de nivel',()=>{
 const s=new GameSession({catalog:MISSIONS,repository:repo,bus:new EventBus()});
 s.requestMission(); s.rover.x=s.mission.x; s.input.work=true;
 for(let i=0;i<200;i++)s.tick(0.05);
 assert.equal(s.points,100); assert.equal(s.level,2);
});
