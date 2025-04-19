export default function () {
  return {
    title: process.env.SITE_NAME || "DevYP",
    description: process.env.SITE_DESC || "開発向けYP",
    indexTxtUrl: process.env.INDEX_TXT_URL || "http://localhost/index.txt",
    indexJsonUrl:
      process.env.INDEX_JSON_URL || "http://localhost:7143/api/index.json",
  };
}
