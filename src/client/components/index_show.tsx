import React from "react";
import useSWR from "swr";
import { Temporal } from "temporal-polyfill";

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

interface IndexShowProps {
  url: string;
}

export default function IndexShow({ url }: IndexShowProps) {
  const { data: index_data, error, isLoading } = useSWR(url, fetcher);
  return (
    <div>
      <h3 className="text-center font-bold">チャンネル一覧</h3>
      <div>
        <table className="table-auto md:table-fixed border-collapse border border-gray-400 ">
          <thead className="bg-gray-50">
            <tr>
              <th className="border border-gray-300">チャンネル名</th>
              <th className="border border-gray-300">ジャンル</th>
              <th className="border border-gray-300">詳細</th>
              <th className="border border-gray-300">コメント</th>
              <th className="border border-gray-300">視聴者数</th>
              <th className="border border-gray-300">リレー数</th>
              <th className="border border-gray-300">配信時間</th>
              <th className="border border-gray-300">ビットレート(kbps)</th>
              <th className="border border-gray-300">ファイル拡張子</th>
              <th className="border border-gray-300">ファイルタイプ</th>
              <th className="border border-gray-300">コンタクトURL</th>
              <th className="border border-gray-300">接続先(非表示)</th>
            </tr>
          </thead>
          <tbody>
            {index_data &&
              index_data.map((c, idx) => (
                <tr key={idx} className="border">
                  <td className="border border-gray-300">{c.name}</td>
                  <td className="border border-gray-300">{c.genre}</td>
                  <td className="border border-gray-300">{c.desc}</td>
                  <td className="border border-gray-300">{c.comment}</td>
                  <td className="border border-gray-300">
                    {c.number_of_listener}
                  </td>
                  <td className="border border-gray-300">
                    {c.number_of_relay}
                  </td>
                  <td className="border border-gray-300">
                    {Temporal.Instant.from(c.created_at).toString({
                      timeZone: "Asia/Tokyo",
                      smallestUnit: "second",
                    })}
                  </td>
                  <td className="border border-gray-300">{c.bitrate}</td>
                  <td className="border border-gray-300">{c.stream_ext}</td>
                  <td className="border border-gray-300">{c.stream_type}</td>
                  <td className="border border-gray-300">{c.contact_url}</td>
                  <td className="border border-gray-300">{!c.tracker_addr}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
