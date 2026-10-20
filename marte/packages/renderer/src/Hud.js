import {rankFor,pointsForLevel} from '@marte/core';
/** Vista DOM. Se suscribe al bus (Observer) y se refresca con el estado; no contiene reglas de juego. */
export class Hud{
 constructor(doc,bus){ this.$=id=>doc.getElementById(id); this.$('close').onclick=()=>this.$('dialog').hidden=true;
  bus.on('assigned',m=>this.say('Dra. Okafor · Control de misión',`${m.title}. ${m.brief} Destino: ${m.x} m al este.`))
     .on('completed',m=>this.say('Dr. Reyes · Ciencia',`¡Datos recibidos! +${m.points} pts. Vuelve a la base para la siguiente tarea.`))
     .on('levelUp',l=>this.say('ARES-9 · IA de la base',`Rango ascendido: ${rankFor(l)}. Todos los sistemas nominales.`))
     .on('allDone',()=>this.say('Control de misión','Sin tareas pendientes. El próximo ascenso depende de nuevos niveles.'))
     .on('lowBattery',()=>this.say('ARES-9','Energía RTG insuficiente. Regresa a la base para recargar.')); }
 say(who,txt){ this.$('who').textContent=who; this.$('txt').textContent=txt; this.$('dialog').hidden=false; }
 update(s){ const l=s.level,a=pointsForLevel(l),b=pointsForLevel(l+1);
  this.$('rank').textContent=`Nivel ${l} · ${rankFor(l)}`; this.$('pts').textContent=`${s.points} pts · Sol ${s.sol}`;
  this.$('xp').style.width=Math.min(100,(s.points-a)/(b-a)*100)+'%'; this.$('bat').style.width=s.rover.battery+'%';
  this.$('task').textContent=s.mission?`${s.mission.title} — ${s.atSite?'mantén ESPACIO':'conduce hasta la baliza'} (${Math.round(s.progress*100)}%)`:(s.inBase?'Pulsa E para pedir tarea':'Regresa a la base (←)'); }
}
