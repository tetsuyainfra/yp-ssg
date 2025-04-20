import React from "react";
import { createRoot } from "react-dom/client";
import IndexShow from "./components/index_show";

export function renderIndexShow(id: string, url: string) {
  console.log(`renderIndexShow(${id}, ${url})`);
  const domNode = document.getElementById(id);
  if (domNode) {
    const root = createRoot(domNode);
    root.render(<IndexShow url={url} />);
  } else {
    console.error(`DOM(id=${id}が見つかりません`);
  }
}

(window as any).renderIndexShow = renderIndexShow;
