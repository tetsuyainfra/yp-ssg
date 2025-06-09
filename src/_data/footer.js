import metadata from "./metadata";
export default function () {
  const footer_links_add =
    process.env.FOOTER_LINK_ADD && JSON.parse(process.env.FOOTER_LINK_ADD);

  return {
    items: footer_links_add || [{ title: "Dummy", url: "/" }],
  };
}
