import React from "react";
import ReactDOM from "react-dom/client";

function IndexComponent() {
  return <div>IndexComponetnt</div>;
}

function renderIndexShow(id: string) {
  console.log("renderIndexShow()");
  const root = ReactDOM.createRoot(document.getElementById(id));
  const element = <h1>Hello, world</h1>;
  root.render(<IndexComponent />);
}

(window as any).renderIndexShow = renderIndexShow;

export { renderIndexShow };
