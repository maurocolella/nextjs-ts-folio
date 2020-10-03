import React from 'react';

// We don't want to send 'react-dom/server' to the client
let ReactDOMServer: { renderToStaticMarkup: (arg0: any) => any };
if (typeof window === 'undefined') {
  ReactDOMServer = require('react-dom/server');
}

export function Noscript ({ children }: { children: any }) {
  if (!ReactDOMServer) {
    return null;
  }
  const staticMarkup = ReactDOMServer.renderToStaticMarkup(children);
  return <noscript dangerouslySetInnerHTML={{ '__html': staticMarkup }} />;
}
