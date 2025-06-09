export default function () {
  // const footer_links_add =
  //   process.env.FOOTER_LINK_ADD && JSON.parse(process.env.FOOTER_LINK_ADD);
  const siteHttps =
    process.env.SITE_HTTPS && JSON.parse(process.env.SITE_HTTPS);

  const index_json_params =
    process.env.INDEX_JSON_URL_PARAM &&
    JSON.parse(process.env.INDEX_JSON_URL_PARAM);

  const index_txt_params =
    process.env.INDEX_TXT_URL_PARAM &&
    JSON.parse(process.env.INDEX_TXT_URL_PARAM);

  return {
    siteUrl: process.env.SITE_URL || "/",
    siteHttps: siteHttps ?? true,
    title: process.env.SITE_NAME || "DevYP(仮)",
    description: process.env.SITE_DESC || "開発向けYP",
    indexTxtUrlParam: index_txt_params || { pathname: "/index.txt" },
    indexJsonUrlParam: index_json_params || "/api/index.json",
    pcpUrl: process.env.PCP_URL || "pcp://localhost:7144/",
  };
}
