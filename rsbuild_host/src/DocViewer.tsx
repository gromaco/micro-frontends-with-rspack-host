import {useEffect, useState} from 'react';
import ReactMarkdown from 'react-markdown';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {vscDarkPlus} from 'react-syntax-highlighter/dist/esm/styles/prism';


interface RemoteDocViewerProps {
  docName: string; // Example: 'static-remote', 'esm-remote', etc.
  initiallyExpanded?: boolean;
}

const DocViewer = ({
                     docName,
                     initiallyExpanded = false
                   }: RemoteDocViewerProps) => {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded);
  const [error, setError] = useState<string | null>(null);

  const markdownMap: Record<string, () => Promise<{ default: string }>> = {
    'vite-remote-dynamic-mf': () => import('./docs/vite-remote-dynamic-mf.md?raw'),
    'vite-remote': () => import('./docs/vite-remote.md?raw'),
    'vite-esm': () => import('./docs/vite-esm.md?raw'),
    'vite-esm-externals': () => import('./docs/vite-esm-externals.md?raw')
  };

  useEffect(() => {
    setIsLoading(true);

    const importer = markdownMap[docName];
    if (!importer) {
      setError(`Documentation for "${docName}" not found.`);
      setIsLoading(false);
      return;
    }

    importer()
        .then(module => {
          setContent(module.default);
          setError(null);
        })
        .catch(err => {
          console.error(`Failed to load documentation for ${docName}:`, err);
          setError(`Documentation for ${docName} could not be loaded.`);
        })
        .finally(() => {
          setIsLoading(false);
        });
  }, [docName]);

  return (
      <div className={'remote-doc-viewer'}>
        <div className={'doc-header'}>
          <button
              className={'doc-toggle-btn'}
              onClick={() => setIsExpanded(!isExpanded)}
              disabled={isLoading || !!error}
          >
            {isExpanded ? '📖 Hide How it Works' : '📖 Show How it Works'}
          </button>
        </div>

        {isExpanded && (
            <div className="doc-content">
              {isLoading && <div className="loading">Loading documentation...</div>}


              {!isLoading && !error && (
                  <ReactMarkdown
                      children={content}
                      components={{
                        code(props) {
                          const {children, className, node, style, ...rest} = props
                          const match = /language-(\w+)/.exec(className || '')


                          return match ? (
                              // @ts-ignore
                              <SyntaxHighlighter
                                  {...rest}
                                  PreTag="div"
                                  children={String(children).replace(/\n$/, '')}
                                  language={match[1]}
                                  style={vscDarkPlus}
                              />
                          ) : (
                              <code {...rest} className={className}>
                                {children}
                              </code>
                          )
                        }
                      }}
                  />
              )}
            </div>
        )}
      </div>
  );
};

export {DocViewer}