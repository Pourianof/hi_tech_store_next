import { getProductsAction } from "@/lib/server_actions/productActions";
import { ItemsListBox } from "./iemsListBox";
import { ProductItem } from "./productItem";

export async function NewProductsList() {
  const productResult = await getProductsAction();
  if (productResult.status == "failed") {
    return (
      <div>
        <h2>Something went wrong at fetching products.</h2>
        <div>Try again later...</div>
      </div>
    );
  }

  const products = productResult.data.items;
  return (
    <ItemsListBox label="New Products" linkLabel="view all">
      <div className="flex *:flex-1 gap-4 my-4">
        {products.slice(0, 4).map((prod) => (
          <ProductItem product={prod} key={prod.productId} />
        ))}
      </div>
    </ItemsListBox>
  );
}
