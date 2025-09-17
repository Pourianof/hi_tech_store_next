import { CustomImage } from "./customImage";
import { SafeImage } from "./safeImage";
export function ApiImage({
  src,
  ...props
}: Parameters<typeof SafeImage>[0] & { serverMode?: boolean }) {
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
      url.search = id;
      _src = url.href;
    }
  }

  const isServerMode = "serverMode" in props && props.serverMode != false;
  return isServerMode ? (
    <CustomImage src={_src!} {...props} />
  ) : (
    <SafeImage src={_src} {...props} />
  );
}
