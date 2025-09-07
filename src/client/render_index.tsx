import React from "react";
import { createRoot } from "react-dom/client";
import IndexShow from "./components/index_show";
import { CookiesProvider } from "react-cookie";

export function renderIndexShow(id: string, url: string, host: string) {
  console.log(`renderIndexShow(${id}, ${url})`);
  const domNode = document.getElementById(id);
  if (domNode) {
    const root = createRoot(domNode);
    root.render(<CookiesProvider defaultSetOptions={{ path: '/' }}>
              <IndexShow url={url} />
            </CookiesProvider>
    );
  } else {
    console.error(`DOM(id=${id}が見つかりません`);
  }
}

(window as any).renderIndexShow = renderIndexShow;
