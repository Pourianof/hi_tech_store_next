"use client";
import { Category } from "@/core/models/category";
import { createContext, ReactNode, useContext } from "react";

interface ICategoryContext {
  categories?: Category[];
}

const CategoryContext = createContext<ICategoryContext>({} as ICategoryContext);

export function useCategories() {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("No category context defined in upper components");
  }

  return context;
}

export function CategoryProvider({
  children,
  categories,
}: {
  children: ReactNode;
  categories?: Category[];
}) {
  return (
    <CategoryContext.Provider value={{ categories }}>
      {children}
    </CategoryContext.Provider>
  );
}
