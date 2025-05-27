import { Product } from "@/models/product";
import { CustomImage } from "./customImage";
import Icon from "./icon";

export function ProductItem({ product }: { product: Product }) {
  return (
    <div className="shadow-md rounded-md flex flex-col p-2">
      <CustomImage
        aspectRatio={256 / 190}
        src={product.img}
        alt={product.title}
      />
      <div className="h-[1px] bg-gradient-to-r from-transparent via-black to-transparent my-2"></div>
      <h3 className="line-clamp-2 text-sm flex-1">{product.title}</h3>
      <div className="flex justify-between my-2">
        <span>{`$${product.price.toFixed(2)}`}</span>
        <span>
          <Icon className="text-blue-900">x</Icon>
          {`${product.score.toFixed(1)}`}
        </span>
      </div>
    </div>
  );
}
