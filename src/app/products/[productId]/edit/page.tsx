import { BrandInjector } from "@/app/dashboard/add-product/_components/brandProvider";
import { UpdateProductForm } from "./_components/updateProductForm";
import { AvailableProductColorInjector } from "@/app/dashboard/add-product/_components/availableProductColorInjector";
import { getSingleProduct } from "@/api/productApi";
import { FailedBox } from "@/app/_components/failedBox";
import { Redirector } from "@/ui/redirector";
import { SearchParams } from "next/dist/server/request/search-params";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const productResult = await getSingleProduct(
    parseInt((await searchParams).productId as string),
  );

  if (productResult.status == "failed") {
    return (
      <>
        <Redirector timeout={2000} />
        <FailedBox
          title="Could not fetch specified product"
          message={productResult.data.title}
        />
      </>
    );
  }

  const product = productResult.data;

  return (
    <div>
      <BrandInjector>
        <AvailableProductColorInjector>
          <UpdateProductForm product={product} />
        </AvailableProductColorInjector>
      </BrandInjector>
    </div>
  );
}
