import React from "react";
import { createRoot } from "react-dom/client";
import CopyUrl from "./components/copy_url";
import { OverrideParams } from "./utils/merge_url";

export function renderHttpUrl(
  id: string,
  url: string | OverrideParams,
  enable_https: boolean,
  desc: string
) {
  console.log(`renderHttpUrl(${id}, ${url}, ${enable_https}, ${desc})`);
  const domNode = document.getElementById(id);
  if (domNode) {
    const root = createRoot(domNode);
    root.render(
      <CopyUrl
        urlParam={url}
        desc={desc}
        http_mode={enable_https}
        open_button={true}
      />
    );
  } else {
    console.error(`DOM(id=${id}が見つかりません`);
  }
}

export function renderPcpUrl(
  id: string,
  url: string | OverrideParams,
  desc: string
) {
  console.log(`renderPcpUrl(${id}, ${url}, ${desc})`);
  const domNode = document.getElementById(id);
  if (domNode) {
    const root = createRoot(domNode);
    root.render(<CopyUrl urlParam={url} desc={desc} />);
  } else {
    console.error(`DOM(id=${id}が見つかりません`);
  }
}

(window as any).renderHttpUrl = renderHttpUrl;
(window as any).renderPcpUrl = renderPcpUrl;
