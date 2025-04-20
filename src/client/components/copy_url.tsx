import React, { useRef, useState } from "react";

interface CopyUrlProps {
  // copy target url
  url: string;
  desc: string;
}

export default function CopyUrl({ url, desc }: CopyUrlProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500); // 一瞬だけ「Copied!」表示
    });
  };

  return (
    <div className="flex max-w-md items-center space-x-2 rounded-xl bg-gray-100 p-4">
      <div className="max-w-md">
        {desc && (
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {desc}🔗
          </label>
        )}
        <input
          type="text"
          value={url}
          readOnly
          className="flex-grow rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700"
        />
        <button
          onClick={handleCopy}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white transition hover:bg-indigo-700"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}
