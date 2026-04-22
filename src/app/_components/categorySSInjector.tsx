import { getCategories } from "@/api/categoryApi";
import { CategoryProvider } from "@/ui/contexts/categoriesContext";
import { ReactNode } from "react";

export async function CategorySSInjector({
  children,
}: {
  children: ReactNode;
}) {
  const categoriesResult = await getCategories();

  return (
    <CategoryProvider
      categories={
        categoriesResult.status == "success"
          ? categoriesResult.data.items
          : undefined
      }
    >
      {children}
    </CategoryProvider>
  );
}
