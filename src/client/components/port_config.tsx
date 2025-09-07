import React, { useState } from "react";

type PortNumber = number;
function isValidPortNumber(n: number) : n is PortNumber {
    return Number.isInteger(n) && n >= 0 && n <= 0xffff;
}

interface PortConfigProps {
  default_port: number;
  changePortNumber: (PortNumber) => void;
}


export default function PortConfig({ default_port, changePortNumber }: PortConfigProps) {
    const [text, setText] = useState(default_port.toString());

    function changeInput (e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        setText(e.target.value)
    }

    function applyPort(e: React.FormEvent) {
        e.preventDefault();
        let num = parseInt(text);
        if (!isNaN(num)) {
          let pnum = Math.min(Math.max(num, 0), 65535)
          setText(pnum.toString());
          changePortNumber(pnum);
        } else {
            alert("error 処理")
        }
    }

    function resetPort(e: React.FormEvent) {
        e.preventDefault();
        setText(default_port.toString())
        changePortNumber(default_port);
    }

    return (
        <div className="flex items-end mb-3">
            <label className="hidden">PeerCastのPort番号</label>
            <div className="flex-none">
                <input type="number" value={text} onChange={changeInput} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            <button className="flex-none px-5 py-3 text-center text-sm bg-blue-100 rounded-lg" onClick={applyPort}>設定</button>
            <button className="flex-none px-5 py-3 text-center text-sm bg-blue-100 rounded-lg" onClick={resetPort}>リセット</button>
        </div>
    )
}

