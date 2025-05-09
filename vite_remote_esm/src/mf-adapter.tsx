import ReactDOM from 'react-dom/client';

const roots = new Map();

export async function render(container: HTMLElement, props: object = {}) {
  if (!container) throw new Error('No container provided for remote render 111111');

  const root = ReactDOM.createRoot(container);
  roots.set(container, root);
  console.log('Calling render for1:', container);

  // This dynamic import enables styles injection and modulepreload optimization for the entrypoint
  const {default: App} = await import('./App');
  root.render(<App {...props} />);
}

export function unmount(container: HTMLElement) {
  const root = roots.get(container);
  console.log('Unmount requested for:', container);
  if (root) {
    console.log('Unmounting...', container);
    root.unmount();
    roots.delete(container);
  }
}
