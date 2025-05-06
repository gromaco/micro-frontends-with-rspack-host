import ReactDOM from 'react-dom/client';
import App from './App';

const roots = new Map();

export function render(container: HTMLElement, props: object = {}) {
  if (!container) throw new Error('No container provided for remote render');

  const root = ReactDOM.createRoot(container);
  roots.set(container, root);
  console.log('Calling render for:', container);
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

