import {Rover,BASE_ZONE} from '../domain/Rover.js';
import {levelFor} from '../domain/progression.js';
const SITE_RANGE=70, TASK_COST=1.5;
/** Fachada de la aplicación. Depende de abstracciones (repository: load/save, bus: emit), no de detalles. */
export class GameSession{
 constructor({catalog,repository,bus}){
  Object.assign(this,{catalog,repository,bus,rover:new Rover(),mission:null,progress:0,input:{dir:0,work:false}});
  const s=repository.load(); this.points=s.points; this.done=new Set(s.done); this.sol=s.sol;
 }
 get level(){ return levelFor(this.points); }
 get inBase(){ return this.rover.x<BASE_ZONE; }
 get atSite(){ return !!this.mission&&Math.abs(this.rover.x-this.mission.x)<SITE_RANGE; }
 requestMission(){
  if(this.mission||!this.inBase)return;
  const m=this.catalog.find(m=>!this.done.has(m.id)&&m.minLevel<=this.level);
  if(!m)return this.bus.emit('allDone');
  this.mission=m; this.progress=0; this.bus.emit('assigned',m);
 }
 tick(dt){
  const {rover,input}=this, working=input.work&&this.atSite&&rover.battery>0;
  rover.drive(working?0:input.dir,dt);
  if(this.inBase)rover.charge(dt);
  if(working)this.#work(dt);
  else if(input.work&&this.atSite)this.bus.emit('lowBattery');
 }
 #work(dt){
  this.rover.drain(TASK_COST*dt); this.progress=Math.min(1,this.progress+dt/this.mission.duration);
  if(this.progress>=1)this.#complete();
 }
 #complete(){
  const m=this.mission, before=this.level;
  this.points+=m.points; this.done.add(m.id); this.sol+=1; this.mission=null; this.progress=0;
  this.repository.save({points:this.points,done:[...this.done],sol:this.sol});
  this.bus.emit('completed',m); if(this.level>before)this.bus.emit('levelUp',this.level);
 }
}
