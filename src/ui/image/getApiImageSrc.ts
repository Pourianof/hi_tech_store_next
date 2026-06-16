export function getApiSrc(src?: string) {
  let _src: string | undefined;
  if (src) {
    try {
      new URL(src);
      _src = src;
    } catch {
      const apiOrigin = process.env.NEXT_PUBLIC_API_SERVER_ADDRESS!;
      const [main, id] = src.split("?");
      const url = new URL(apiOrigin);
      url.pathname = main;
      if (id) {
        url.search = id;
      }
      _src = url.href;
    }
  }

  return _src;
}
