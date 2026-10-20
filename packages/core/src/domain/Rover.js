export const WORLD_WIDTH=4200, BASE_ZONE=420, SPEED=180, DRIVE_COST=1.2, CHARGE_RATE=18;
export class Rover{
 x=240; dir=1; battery=100;
 drive(d,dt){ if(!d||this.battery<=0)return; this.dir=d;
  this.x=Math.max(0,Math.min(WORLD_WIDTH,this.x+d*SPEED*dt)); this.drain(DRIVE_COST*dt); }
 drain(a){ this.battery=Math.max(0,this.battery-a); }
 charge(dt){ this.battery=Math.min(100,this.battery+CHARGE_RATE*dt); }
}
