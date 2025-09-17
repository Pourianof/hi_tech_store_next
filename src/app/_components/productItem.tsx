import { Product } from "@/core/models/product";
import Icon from "../../ui/icons/icon";
import { SafeImage } from "../../ui/image/safeImage";

export function ProductItem({ product }: { product: Product }) {
  const coverImage = product.media?.find((m) => m.isMain)?.url;

  return (
    <div className="shadow-md rounded-md flex flex-col p-2">
      <SafeImage aspectRatio={256 / 190} src={coverImage} alt={product.title} />

      <div className="h-px bg-linear-to-r from-transparent via-black opacity-40 to-transparent my-2"></div>
      <h3 className="line-clamp-2 text-sm flex-1">{product.title}</h3>
      <div className="flex justify-between my-2">
        <span>{`$${product.price.toFixed(2)}`}</span>
        <span>
          <Icon className="text-blue-900" name="filled_star" />
          {`${product.averageScore.toFixed(1)}`}
        </span>
      </div>
    </div>
  );
}
