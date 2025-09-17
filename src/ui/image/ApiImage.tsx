import { SafeImage } from "./safeImage";
export function ApiImage({ src, ...props }: Parameters<typeof SafeImage>[0]) {
  let _src: string | undefined;
  if (src) {
    try {
      new URL(src);
      _src = src;
    } catch {
      const apiOrigin = "http://localhost:5108";
      const url = new URL(apiOrigin);
      url.pathname = src;
      _src = url.href;
    }
  }
  return <SafeImage src={_src} {...props} />;
}
