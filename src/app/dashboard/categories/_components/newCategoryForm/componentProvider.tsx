"use client";

import { CategoryComponent } from "@/core/models/category";
import { getAllComponentsAction } from "@/lib/server_actions/componentActions";
import { NoContextDefinedError } from "@/ui/errors/NoContextDefinedError";
import { createContext, useContext, useState } from "react";

interface IComponentListContext {
  error?: string;
  loadComponents(): void;
  addComponent(component: CategoryComponent): void;
  hasLoaded: boolean;
  loadedComponents: CategoryComponent[];
}

const ComponentListContext = createContext<IComponentListContext>(
  {} as IComponentListContext,
);

export function useCategoryComponents() {
  const context = useContext(ComponentListContext);
  if (!context) {
    throw new NoContextDefinedError("CategoryListContext");
  }

  return context;
}

export function ComponentContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [components, setComponents] = useState<CategoryComponent[]>();
  const [error, setError] = useState<string>();
  const [hasLoaded, setHasLoaded] = useState(false);

  async function loadComponents() {
    setError(undefined);
    if (!hasLoaded) {
      const result = await getAllComponentsAction();
      if (result.status == "failed") {
        setError(result.data.title);
        return;
      }

      setHasLoaded(true);
      setComponents((c) => [...(c ?? []), ...result.data.items]);
    }
  }

  async function addComponent(component: CategoryComponent) {
    setComponents((old) => (old ? [...old, component] : [component]));
  }

  return (
    <ComponentListContext.Provider
      value={{
        hasLoaded,
        loadComponents,
        error,
        addComponent,
        loadedComponents: components ?? [],
      }}
    >
      {children}
    </ComponentListContext.Provider>
  );
}
