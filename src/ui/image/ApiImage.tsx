import { CustomImage } from "./customImage";
import { getApiImageSrc } from "./getApiImageSrc";
import { SafeImage } from "./safeImage";
export function ApiImage({
  src,
  ...props
}: Parameters<typeof SafeImage>[0] & { serverMode?: boolean }) {
  const _src = getApiImageSrc(src);

  return props.serverMode ? (
    <CustomImage src={_src!} {...props} />
  ) : (
    <SafeImage src={_src} {...props} />
  );
}
