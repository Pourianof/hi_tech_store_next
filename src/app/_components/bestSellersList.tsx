import { Product } from "@/models/product";
import { ItemsListBox } from "./iemsListBox";
import { ProductItem } from "./productItem";

const BEST_SELLERS_PRODUCT: Product[] = [
  {
    id: 0,
    img: "/images/best_seller/headphone.png",
    price: 32.3,
    score: 4.1,
    title: "EchoX Pro H900",
    discount: 0,
  },
  {
    id: 1,
    img: "/images/best_seller/ps4.png",
    price: 1000,
    score: 4.4,
    title: "Play Station 4 Pro 1Tb",
    discount: 2,
  },
  {
    id: 2,
    img: "/images/best_seller/macbook.png",
    price: 1883.05,
    score: 4.5,
    title: `Apple MacBook Air 15" w/ Touch ID (2023) - Space Grey (Apple M2 Chip / 256GB SSD / 8GB RAM) - French`,
    discount: 0,
  },
  {
    id: 3,
    img: "/images/best_seller/airpod.png",
    price: 285.08,
    score: 4.2,
    title: "Airpods pro2",
    discount: 1,
  },
];

export function BestSellersList() {
  return (
    <ItemsListBox label="Best Sellers" linkLabel="View all >">
      <div className="flex *:flex-1 gap-4 my-4">
        {BEST_SELLERS_PRODUCT.map((prod) => (
          <ProductItem product={prod} key={prod.id} />
        ))}
      </div>
    </ItemsListBox>
  );
}
