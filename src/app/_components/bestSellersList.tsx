import { Product } from "@/core/models/product";
import { ItemsListBox } from "./iemsListBox";
import { ProductItem } from "./productItem";
import { ProductModel } from "@/core/models/productModel";

const BEST_SELLERS_PRODUCT: Product[] = [
  {
    productId: 0,
    averageScore: 4.1,
    scoreCounts: 0,
    title: "EchoX Pro H900",
    discount: 0,
    variations: [
      {
        price: 32.3,
        inventory: 15,
        color: { code: "00000", colorId: 1, name: "black" },
        media: [
          {
            url: "/images/best_seller/headphone.png",
            isMain: true,
            productMediaId: 0,
            type: "Image",
          },
        ],
      },
    ],
    properties: [],
    components: [],
    categoryId: 0,
  },
  {
    productId: 1,
    averageScore: 4.4,
    scoreCounts: 0,
    title: "Play Station 4 Pro 1Tb",
    discount: 2,
    variations: [
      {
        price: 1000,
        inventory: 15,
        color: { code: "00000", colorId: 1, name: "black" },
        media: [
          {
            url: "/images/best_seller/ps4.png",
            isMain: true,
            productMediaId: 0,
            type: "Image",
          },
        ],
      },
    ],
    properties: [],
    components: [],
    categoryId: 0,
  },
  {
    productId: 2,
    averageScore: 4.5,
    scoreCounts: 0,
    title: `Apple MacBook Air 15" w/ Touch ID (2023) - Space Grey (Apple M2 Chip / 256GB SSD / 8GB RAM) - French`,
    discount: 0,
    variations: [
      {
        price: 1883.05,
        inventory: 15,
        color: { code: "00000", colorId: 1, name: "black" },
        media: [
          {
            url: "/images/best_seller/macbook.png",
            isMain: true,
            productMediaId: 0,
            type: "Image",
          },
        ],
      },
    ],
    properties: [],
    components: [],
    categoryId: 0,
  },
  {
    productId: 3,
    averageScore: 4.2,
    scoreCounts: 0,
    title: "Airpods pro2",
    discount: 1,
    variations: [
      {
        price: 285.08,
        inventory: 15,
        color: { code: "00000", colorId: 1, name: "black" },
        media: [
          {
            url: "/images/best_seller/airpod.png",
            isMain: true,
            productMediaId: 0,
            type: "Image",
          },
        ],
      },
    ],
    properties: [],
    components: [],
    categoryId: 0,
  },
];

export function BestSellersList() {
  return (
    <ItemsListBox label="Best Sellers" linkLabel="View all >">
      <div className="flex *:flex-1 gap-4 my-4">
        {BEST_SELLERS_PRODUCT.map((prod) => (
          <ProductItem
            product={ProductModel.CreateWith(prod)}
            key={prod.productId}
          />
        ))}
      </div>
    </ItemsListBox>
  );
}
