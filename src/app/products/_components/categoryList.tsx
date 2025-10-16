"use client";

import { useCategories } from "@/ui/contexts/categoriesContext";
import { ApiImage } from "@/ui/image/ApiImage";
import Link from "next/link";

export function CategoryList() {
  const { categories } = useCategories();
  if (!categories?.length) {
    return (
      <div>
        <center>No categories</center>
      </div>
    );
  }

  return (
    <ul className="flex gap-8 w-full justify-center text-gray-neutral-44">
      {categories.map((category) => (
        <li
          key={category.categoryId}
          className="cursor-pointer hover:bg-gray-neutral-ed p-2 rounded-xl"
        >
          <Link
            href={{
              query: {
                category: category.categoryId,
              },
            }}
          >
            <ApiImage alt={category.name} src={category.icon} />
            <span>{category.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
