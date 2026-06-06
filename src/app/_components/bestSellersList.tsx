import { Column } from "@/ui/layouts/column";
import { productActions } from "@/ui/server_actions_wrapper/productActions";
import { Caption } from "@/ui/theme/text/caption";
import { H4 } from "@/ui/theme/text/headers";
import { ItemsListBox } from "./iemsListBox";
import { ProductList } from "./productList";

export async function BestSellersList() {
  const result = await productActions.getProducts({
    bestSeller: "month",
    sortBy: "best_sellers",
    sortDir: "des",
  });

  if (result.status == "failed") {
    return (
      <Column className="h-[200px]" center>
        <Column
          className="border gap-2 border-gray-neutral-ed rounded p-8"
          center
        >
          <H4>Failed to load</H4>
          <Caption size="lg">What happened? let us check it...</Caption>
          <Caption size="sm">{result.data.title}</Caption>
          {!!result.data.detail && (
            <Caption size="sm">{result.data.detail}</Caption>
          )}
        </Column>
      </Column>
    );
  }

  const products = result.data.items;

  return (
    <ItemsListBox label="Best Sellers" linkLabel="View all">
      <ProductList products={products} />
    </ItemsListBox>
  );
}
