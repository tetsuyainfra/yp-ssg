export interface OverrideParams {
  host: string;
  port: string;
  pathname?: string;
}

export function merge_url(
  base_url: string,
  override_param: OverrideParams
): URL {
  let u = new URL(base_url);

  const p: OverrideParams = override_param;
  u.host = p.host || u.host;
  u.port = p.port ?? u.port; // ""を受け入れる必要があるため
  u.pathname = p.pathname || u.pathname;

  console.log("merge_url", base_url, override_param, u);
  return u;
}
