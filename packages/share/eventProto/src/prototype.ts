import { EventLiteProtcol, IEventProtcol, TListennerProtcol } from './protcol'

export class EventPrototype<GEvents extends IEventProtcol>
  implements EventLiteProtcol<GEvents>
{
  listennerMap = new Map<keyof GEvents, Set<TListennerProtcol<unknown[]>>>()

  on<E extends keyof GEvents>(
    event: E,
    listenner: TListennerProtcol<GEvents[E]>,
  ) {
    let set = this.listennerMap.get(event)
    if (!set) {
      this.listennerMap.set(event, (set = new Set()))
    }
    set.add(listenner as TListennerProtcol<unknown[]>)

    return () => {
      this.remove(event, listenner)
    }
  }

  emit<E extends keyof GEvents>(event: E, ...args: GEvents[E]) {
    this.listennerMap.get(event)?.forEach((listenner) => listenner(...args))
  }

  remove<E extends keyof GEvents>(
    event: E,
    listenner: TListennerProtcol<GEvents[E]>,
  ) {
    this.listennerMap
      .get(event)
      ?.delete(listenner as TListennerProtcol<unknown[]>)
  }
}
