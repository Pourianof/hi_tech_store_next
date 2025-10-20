import { useInjectedData } from "@/ui/contexts/CCInjector";
import { BRANDS_QUERY_KEY } from "./brandProvider";
import { Brand } from "@/core/models/brand";
import { createNewBrandModelAction } from "@/lib/server_actions/brandActions";
import { isTwoStringEqual } from "@/lib/helpers/stringHelpers";

export function useBrands() {
  const context = useInjectedData(BRANDS_QUERY_KEY);

  if (!context) {
    return;
  }

  const result = context.data as Brand[];

  return {
    brands: result,
    add: async (newBrand: FormData) => {
      const result = await createNewBrandModelAction(newBrand);
      if (result.status == "success") {
        const brandModel = result.data;
        const brand = (context.data as Brand[]).find((brand) =>
          isTwoStringEqual(brand.name, brandModel.brandName)
        );

        if (brand) {
          brand.brandModels ??= [];
          brand.brandModels.push(brandModel);
        } else {
          // brands
        }
        context.mutator((old: Brand[] | undefined) => [...(old ?? [])]);
      }

      return result;
    },
  };
}
