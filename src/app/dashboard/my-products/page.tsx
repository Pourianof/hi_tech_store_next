import { FailedBox } from "@/app/_components/failedBox";
import { ProductItem } from "@/app/_components/productItem";
import { FilledButton } from "@/ui/form/AppButtons";
import Icon from "@/ui/icons/icon";
import { Column } from "@/ui/layouts/column";
import { Row } from "@/ui/layouts/row";
import { productActions } from "@/ui/server_actions_wrapper/productActions";
import Link from "next/link";

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const sp = await searchParams;
  const result = await productActions.getMyProductsAction(sp);

  if (result.status == "failed") {
    return (
      <FailedBox
        title="Fetching your products get failed"
        message={`${result.data.title ?? ""}\n${result.data.detail ?? ""}`}
      />
    );
  }

  const pagedResult = result.data;
  const products = pagedResult.items;

  const page = +(sp.page ?? 1);

  return (
    <Column>
      <div className="grid lg:grid-cols-3 grid-cols-2 gap-4">
        {products.map((product) => (
          <div key={product.productId} className="relative">
            <Link href={{ pathname: `/products/${product.productId}/edit` }}>
              <div className="absolute right-20px top-20px p-4px aspect-square bg-white hover:bg-primary-blue-50 hover:text-primary-blue-04 rounded-lg z-10">
                <Icon name="edit" />
              </div>
            </Link>
            <ProductItem product={product} />
          </div>
        ))}
      </div>
      <Row>
        {page > 1 && (
          <Link
            href={{
              query: {
                page: page - 1,
              },
            }}
          >
            <FilledButton>Previous page</FilledButton>
          </Link>
        )}
        {pagedResult.hasNext && (
          <Link
            href={{
              query: {
                page: page + 1,
              },
            }}
          >
            <FilledButton>Next page</FilledButton>
          </Link>
        )}
      </Row>
    </Column>
  );
}
