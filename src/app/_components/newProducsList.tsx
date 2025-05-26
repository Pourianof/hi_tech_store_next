import { Product } from "@/models/product";
import { CustomImage } from "./customImage";
import Icon from "./icon";

const NEW_PRODUCTS: Product[] = [
  {
    id: 0,
    img: "/images/new_products/iphone.png",
    title: "Iphone 14 promax 256 gig",
    price: 930.9,
    discount: 0,
    score: 4.5,
  },
  {
    id: 1,
    img: "/images/new_products/macbook.png",
    title: "Blackmagic Design Pocket Cinema Camera 6K Pro (Canon EF)",
    price: 2535,
    discount: 0,
    score: 4.8,
  },
  {
    id: 2,
    img: "/images/new_products/s24.png",
    title: "SAMSUNG Galaxy S23 Ultra Cell Phone,256 GB",
    price: 1018,
    discount: 0,
    score: 4.7,
  },
  {
    id: 3,
    img: "/images/new_products/vr.png",
    title: "VR VisionTech X1",
    price: 1399,
    discount: 0,
    score: 3.9,
  },
];

export function NewProductsList() {
  return (
    <div className="flex *:flex-1 gap-4 my-4">
      {NEW_PRODUCTS.map((prod) => (
        <ProductItem product={prod} key={prod.id} />
      ))}
    </div>
  );
}

function ProductItem({ product }: { product: Product }) {
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
