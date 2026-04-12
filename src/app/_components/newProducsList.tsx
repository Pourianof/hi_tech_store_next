import { ItemsListBox } from "./iemsListBox";
import { ProductItem } from "./productItem";
import { productActions } from "@/ui/server_actions_wrapper/productActions";

export async function NewProductsList() {
  const productResult = await productActions.getProducts();
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
