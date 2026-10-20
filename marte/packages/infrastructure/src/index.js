/** Adaptador del puerto "repository" sobre Web Storage. Sustituible por API/IndexedDB sin tocar el core. */
const EMPTY=()=>({points:0,done:[],sol:1});
export class LocalProgressRepository{
 constructor(storage=globalThis.localStorage,key='marte.progress'){ this.storage=storage; this.key=key; }
 load(){ try{ return JSON.parse(this.storage.getItem(this.key))??EMPTY(); }catch{ return EMPTY(); } }
 save(s){ this.storage.setItem(this.key,JSON.stringify(s)); }
}
