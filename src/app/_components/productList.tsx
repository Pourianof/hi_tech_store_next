import { Product } from "@/core/models/product";
import { ProductItem } from "./productItem";
import { ProductModel } from "@/core/models/productModel";

export function ProductList({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 grid-rows-2 md:flex md:*:flex-1 gap-4 my-4 overflow-x-auto overflow-y-clip">
      {products.slice(0, 4).map((prod) => (
        <ProductItem
          product={ProductModel.CreateWith(prod)}
          key={prod.productId}
        />
      ))}
    </div>
  );
}
