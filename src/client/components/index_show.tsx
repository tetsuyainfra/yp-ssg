import React from "react";
import useSWR from "swr";
import { Temporal } from "temporal-polyfill";
import { merge_url, OverrideParams } from "../utils/merge_url";
import PortConfig from "./port_config";
import { useCookies } from "react-cookie";

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
  url: string | OverrideParams;
}

interface CookieValues {
  port?: number
  test?: string
}

const COOKIE_NAME = "peercast-port"


function to_time(created_at: any) {
  let date = Temporal.Instant.from(created_at);
  const now = Temporal.Now.instant();
  const duration = date.until(now, {
    smallestUnit: "minutes",
  });

  const hh = String(duration.hours).padStart(2, "0");
  const mm = String(duration.minutes).padStart(2, "0");

  return `${hh}:${mm}`;
}

type CookieKey = "port"  // | "newKey" ;

export default function IndexShow({ url }: IndexShowProps) {
  const [cookies, setCookie, removeCookie] = useCookies<CookieKey, CookieValues>([]);
  console.log('cookies', cookies);
  let port = cookies.port || 7144;

  let get_url = "";
  if (typeof url === "string") {
    get_url = url;
  } else if (typeof url === "object") {
    // TODO: 本当は型ガード関数を実装すべき
    let u = merge_url(location.href, url);
    get_url = u.href;
  }
  {
    let u = new URL(get_url);
    u.searchParams.set('Host', `localhost:${port}`)
    get_url = u.href
  }
  console.log("indexshow: ", get_url);

  const { data: index_data, error, isLoading } = useSWR(get_url, fetcher);

  function setPortNumber(new_port: number) {
    setCookie('port', new_port)
  }

  return (
    <div>
      <h3 className="text-center font-bold">配信中 チャンネル一覧</h3>
      <div>
        <table className="table-auto md:table-fixed border-collapse border border-gray-400 mb-5">
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
              <th className="border border-gray-300">タイプ</th>
              <th className="border border-gray-300">ファイル拡張子</th>
              <th className="border border-gray-300">ファイルタイプ(MIME)</th>
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
                    {/* {Temporal.Instant.from(c.created_at).toString({
                      timeZone: "Asia/Tokyo",
                      smallestUnit: "second",
                    })} */}
                    {to_time(c.created_at)}
                  </td>
                  <td className="border border-gray-300">{c.bitrate}</td>
                  <td className="border border-gray-300">{c.type}</td>
                  <td className="border border-gray-300">{c.stream_ext}</td>
                  <td className="border border-gray-300">{c.stream_type}</td>
                  <td className="border border-gray-300">
                    <a href={c.contact_url} className="hover:text-blue-600">
                      {c.contact_url}
                    </a>
                  </td>
                  <td className="border border-gray-300">{!c.tracker_addr}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <PortConfig default_port={port} changePortNumber={setPortNumber} />
      </div>
    </div>
  );
}

/*
function relative(date: Temporal.ZonedDateTime): string {
  const d = date.until(Temporal.Now.zonedDateTimeISO());
  if (d.total("day") > 1) {
    return d.round({ smallestUnit: "day" }).days + "日前";
  }
  if (d.total("hour") > 1) {
    return d.round({ smallestUnit: "hour" }).hours + "時間前";
  }
  if (d.total("minute") > 1) {
    return d.round({ smallestUnit: "minute" }).minutes + "分前";
  }
  if (d.total("second") > 1) {
    return d.round({ smallestUnit: "second" }).seconds + "秒前";
  }
  return "今";
}
*/
