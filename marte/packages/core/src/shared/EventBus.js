export class EventBus{
 #h=new Map();
 on(e,fn){ (this.#h.get(e)??this.#h.set(e,[]).get(e)).push(fn); return this; }
 emit(e,p){ (this.#h.get(e)??[]).forEach(fn=>fn(p)); }
}
