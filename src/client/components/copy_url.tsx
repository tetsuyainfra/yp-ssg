import React, { useCallback, useRef, useState } from "react";
import { merge_url, OverrideParams } from "../utils/merge_url";

interface CopyUrlProps {
  // copy target url
  http_mode?: boolean;
  urlParam: string | OverrideParams;
  desc: string;
  open_button?: boolean;
}

const CopyStat = {
  WAIT: 0,
  COPIED: 1,
  ERROR: 2,
} as const;
type CopyStatType = (typeof CopyStat)[keyof typeof CopyStat];

function getCopyString(s: CopyStatType): string {
  switch (s) {
    case CopyStat.COPIED:
      return "コピー成功";
    case CopyStat.ERROR:
      return "コピー失敗";
    case CopyStat.WAIT:
    default:
      return "コピー";
  }
}

export default function CopyUrl({
  http_mode,
  urlParam,
  desc,
  open_button,
}: CopyUrlProps) {
  const [is_https, setHttps] = useState(true);
  const [copy_stat, setCopied] = useState<CopyStatType>(CopyStat.WAIT);

  let set_url = "";
  if (typeof urlParam == "string") {
    // direct url
    set_url = urlParam;
  } else {
    // override mode
    let u = merge_url(location.href, urlParam);

    if (http_mode) {
      u.protocol = is_https ? "https" : "http";
    }
    set_url = u.href;
  }

  const handleCopy = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      event.preventDefault();
      if (navigator?.clipboard?.writeText !== undefined) {
        navigator.clipboard.writeText(set_url).then(
          (success) => {
            setCopied(CopyStat.COPIED);
            setTimeout(() => setCopied(CopyStat.WAIT), 1500); // 一瞬だけ「Copied!」表示
          },
          (reason) => {
            setCopied(CopyStat.ERROR);
            setTimeout(() => setCopied(CopyStat.WAIT), 1500); // 一瞬だけ「Copied!」表示
            console.log("コピーに失敗しました");
          }
        );
      } else {
        setCopied(CopyStat.ERROR);
        setTimeout(() => setCopied(CopyStat.WAIT), 3000);
      }
    },
    [set_url, setCopied]
  );

  const handleOpen = () => {
    open(set_url);
  };

  return (
    <div className="">
      {desc && (
        // <label className="block text-sm font-medium text-gray-700">
        <label
          htmlFor="copy_url"
          // className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          {desc}🔗
        </label>
      )}
      <div className="flex">
        {http_mode && (
          <Button
            className="rounded-s border border-e-0 border-gray-300"
            selected={!is_https}
            onClick={() => {
              setHttps(false);
            }}
          >
            http
          </Button>
        )}
        {http_mode && (
          <Button
            className="rounded-none border border-e-0 border-gray-300"
            selected={is_https}
            onClick={() => {
              setHttps(true);
            }}
          >
            https
          </Button>
        )}
        <input
          id="copy_url"
          type="text"
          value={set_url}
          readOnly
          className="rounded-none  bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <Button
          className="rounded-none border border-e-0 border-gray-300"
          selected={true}
          onClick={handleCopy}
        >
          {getCopyString(copy_stat)}
        </Button>
        {open_button && (
          <Button
            className="rounded-e border border-e-s border-gray-300"
            selected={false}
            onClick={handleOpen}
          >
            開く
          </Button>
        )}
      </div>
      {copy_stat === CopyStat.ERROR && (
        <div
          className="flex items-center bg-red-500 text-white text-sm font-bold px-4 py-3"
          role="alert"
        >
          <svg
            className="fill-current w-4 h-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
          </svg>
          <p>
            クリップボードへのコピーに失敗しました。右クリックやCtrl＋Cでコピーしてください
          </p>
        </div>
      )}
    </div>
  );
}

interface ButtonProps {
  selected?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  children: React.ReactNode;
}
function Button({ children, selected, onClick, className }: ButtonProps) {
  let class_name = selected
    ? `py-2 px-4 bg-blue-500 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75`
    : `py-2 px-4 bg-blue-100 text-gray-500 font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75`;
  class_name = `${class_name} ${className || ""}`;

  return (
    <button className={class_name} onClick={onClick}>
      {children}
    </button>
  );
}
