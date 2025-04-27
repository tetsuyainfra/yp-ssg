import React from "react";
import { createRoot } from "react-dom/client";
import CopyUrl from "./components/copy_url";

export function renderUrl(id: string, url: string, desc: string) {
  console.log(`renderUrl(${id}, ${url})`);
  const domNode = document.getElementById(id);
  if (domNode) {
    const root = createRoot(domNode);
    root.render(<CopyUrl url={url} desc={desc} />);
  } else {
    console.error(`DOM(id=${id}が見つかりません`);
  }
}

(window as any).renderUrl = renderUrl;
