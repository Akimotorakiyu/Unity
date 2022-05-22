export interface IEventProtcol {
  [props: string]: unknown[]
}

export type TListennerProtcol<Args extends unknown[]> = (...args: Args) => void

export interface EventLiteProtcol<
  GEvents extends { [props: string]: unknown[] },
> {
  listennerMap: Map<keyof GEvents, Set<TListennerProtcol<unknown[]>>>
  on<E extends keyof GEvents>(
    event: E,
    listenner: TListennerProtcol<GEvents[E]>,
  ): () => void

  emit<E extends keyof GEvents>(event: E, ...args: GEvents[E]): void

  remove<E extends keyof GEvents>(
    event: E,
    listenner: TListennerProtcol<GEvents[E]>,
  ): void
}
