import { Category } from "@/core/models/category";

interface CategoryTreeNode {
  category: Category;
  subCategories: CategoryTreeNode[];
}

export type CategoryTree = CategoryTreeNode[];

interface CategoryTreePath {
  [key: string]: number[];
}

function treeIterator(
  categories: Category[],
  tree: CategoryTreeNode[],
  availablePaths: CategoryTreePath
) {
  const pendingCategories: Category[] = [];
  for (const category of categories) {
    if (category.parentCategoryId) {
      if (!availablePaths[category.parentCategoryId]) {
        // deffered to later
        pendingCategories.push(category);
      } else {
        const path = availablePaths[category.parentCategoryId];
        let currentParent = tree;

        for (const node of path) {
          currentParent = tree[node].subCategories;
        }

        availablePaths[category.categoryId] = [...path, category.categoryId];
        currentParent.push({ category, subCategories: [] });
      }
    } else {
      tree.push({ category, subCategories: [] });
    }
  }

  return pendingCategories;
}

export function categoryTreeBuilder(categories: Category[]) {
  const tree: CategoryTreeNode[] = [];
  const paths: CategoryTreePath = {};

  let pendingCategories: Category[] = [];
  let pendingsCount: number;

  do {
    pendingsCount = pendingCategories.length;
    pendingCategories = treeIterator(categories, tree, paths);
  } while (
    pendingCategories.length &&
    pendingsCount != pendingCategories.length
  );

  return tree;
}
