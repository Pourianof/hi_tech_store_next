import { NoContextDefinedError } from "@/ui/errors/NoContextDefinedError";
import { createContext, useContext } from "react";

interface ICategoryFormContext {
  changeToComponentFormMode(): void;
  backToCategoryFormMode(): void;
}

const CategoryFormContext = createContext({} as ICategoryFormContext);

export function useCategoryFormContext() {
  const context = useContext(CategoryFormContext);

  if (!context) {
    throw new NoContextDefinedError("CategoryFormContext");
  }

  return context;
}

export function CategoryFormProvider({
  children,
  context,
}: {
  children: React.ReactNode;
  context: ICategoryFormContext;
}) {
  return (
    <CategoryFormContext.Provider value={context}>
      {children}
    </CategoryFormContext.Provider>
  );
}
