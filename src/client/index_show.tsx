import React from "react";
import ReactDOM from "react-dom/client";
import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => {
      console.log(`url(${url})->res`, res);
      return res.json();
    })
    .then((data) => {
      console.log(`url(${url})->data`, data);
      return data;
    });

function IndexComponent() {
  const { data, error, isLoading } = useSWR(
    "http://localhost:7143/api/index.json",
    fetcher
  );
  return (
    <div>
      <h1>IndexComponent</h1>
      <ul>
        {data &&
          data.map((c, i) => {
            return <li key={i}>{c.name}</li>;
          })}
      </ul>
    </div>
  );
}

function renderIndexShow(id: string) {
  console.log("renderIndexShow()");
  const root = ReactDOM.createRoot(document.getElementById(id));
  const element = <h1>Hello, world</h1>;
  root.render(<IndexComponent />);
}

(window as any).renderIndexShow = renderIndexShow;

export { renderIndexShow };
