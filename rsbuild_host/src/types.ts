export type RemoteAdapter = {
  render: (container: HTMLElement, props: unknown) => void,
  unmount: (container: HTMLElement) => void
}