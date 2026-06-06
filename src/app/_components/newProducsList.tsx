import { productActions } from "@/ui/server_actions_wrapper/productActions";
import { ItemsListBox } from "./iemsListBox";
import { ProductList } from "./productList";

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
    <ItemsListBox
      label="New Products"
      linkLabel="View all"
      linkHref="/products"
    >
      <ProductList products={products} />
    </ItemsListBox>
  );
}
