import { Product } from "@/core/models/product";
import { ItemsListBox } from "./iemsListBox";
import { ProductItem } from "./productItem";

const BEST_SELLERS_PRODUCT: Product[] = [
  {
    productId: 0,
    media: [
      {
        url: "/images/best_seller/headphone.png",
        isMain: true,
        productMediaId: 0,
        type: "Image",
      },
    ],
    price: 32.3,
    averageScore: 4.1,
    scoreCounts: 0,
    title: "EchoX Pro H900",
    discount: 0,
  },
  {
    productId: 1,
    media: [
      {
        url: "/images/best_seller/ps4.png",
        isMain: true,
        productMediaId: 0,
        type: "Image",
      },
    ],
    price: 1000,
    averageScore: 4.4,
    scoreCounts: 0,
    title: "Play Station 4 Pro 1Tb",
    discount: 2,
  },
  {
    productId: 2,
    media: [
      {
        url: "/images/best_seller/macbook.png",
        isMain: true,
        productMediaId: 0,
        type: "Image",
      },
    ],
    price: 1883.05,
    averageScore: 4.5,
    scoreCounts: 0,
    title: `Apple MacBook Air 15" w/ Touch ID (2023) - Space Grey (Apple M2 Chip / 256GB SSD / 8GB RAM) - French`,
    discount: 0,
  },
  {
    productId: 3,
    media: [
      {
        url: "/images/best_seller/airpod.png",
        isMain: true,
        productMediaId: 0,
        type: "Image",
      },
    ],
    price: 285.08,
    averageScore: 4.2,
    scoreCounts: 0,
    title: "Airpods pro2",
    discount: 1,
  },
];

export function BestSellersList() {
  return (
    <ItemsListBox label="Best Sellers" linkLabel="View all >">
      <div className="flex *:flex-1 gap-4 my-4">
        {BEST_SELLERS_PRODUCT.map((prod) => (
          <ProductItem product={prod} key={prod.productId} />
        ))}
      </div>
    </ItemsListBox>
  );
}
