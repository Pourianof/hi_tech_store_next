import { Product } from "@/core/models/product";
import { ItemsListBox } from "./iemsListBox";
import { ProductItem } from "./productItem";

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
    <ItemsListBox label="New Products" linkLabel="view all">
      <div className="flex *:flex-1 gap-4 my-4">
        {NEW_PRODUCTS.map((prod) => (
          <ProductItem product={prod} key={prod.id} />
        ))}
      </div>
    </ItemsListBox>
  );
}
