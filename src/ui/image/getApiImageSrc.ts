export function getApiSrc(src?: string) {
  let _src: string | undefined;
  if (src) {
    try {
      new URL(src);
      _src = src;
    } catch {
      const apiOrigin = "http://localhost:5108";
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
