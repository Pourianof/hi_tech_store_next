"use client";
import { SafeImage } from "@/app/_components/safeImage";
import { ProblemDetails } from "@/core/errors/AuthErrors/ProblemDetails";
import { Category } from "@/core/models/category";
import { CategoryTree as CategoryTreeType } from "@/lib/helpers/categoryTreeBuilder";
import { deleteCategoryAction } from "@/lib/server_actions/categoryActions";
import Icon, { IconNames } from "@/ui/icons/icon";
import { Modal } from "@/ui/modal/modal";
import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";
import { useState } from "react";
import toast from "react-hot-toast";

function CategoryList({ tree: t }: { tree: CategoryTreeType }) {
  const [tree, setTree] = useState<CategoryTreeType>(t);
  if (!tree.length) {
    return null;
  }

  async function deleteCategory(categoryId: number) {
    const result = await deleteCategoryAction(categoryId);
    if (result.status == "success") {
      const index = tree.findIndex((c) => c.category.categoryId == categoryId);
      if (index >= 0) {
        tree.splice(index, 1);
        setTree([...tree]);
      }
      toast.success("Category deleted succussfully.");
    } else {
      const err = result.data as ProblemDetails;
      toast.error(`${err.title}\n${err.detail ?? ""}`);
    }
  }

  return tree.map((c) => (
    <CategoryItem
      key={c.category.categoryId}
      categoryItem={c}
      onDelete={deleteCategory}
    />
  ));
}

export function CategoryTree({ tree }: { tree: CategoryTreeType }) {
  return (
    <SimpleTreeView>
      <CategoryList tree={tree} />
      <AddNewSubCategoryItem />
    </SimpleTreeView>
  );
}

export function CategoryItem({
  categoryItem,
  onDelete,
}: {
  categoryItem: CategoryTreeType[number];
  onDelete?: (categoryId: number) => void;
}) {
  const [deletingCategory, setDeletingCategory] = useState<Category>();
  const image = categoryItem.category.image;
  const categoryImageURL = image ? `http://localhost:5108/${image}` : undefined;
  return (
    <>
      {!!deletingCategory && (
        <CategoryDeletionModal
          categoryTitle={categoryItem.category.name}
          onClose={() => setDeletingCategory(undefined)}
          onDelete={() => onDelete?.(categoryItem.category.categoryId)}
        />
      )}
      <TreeItem
        key={categoryItem.category.categoryId}
        itemId={`${categoryItem.category.categoryId}`}
        label={
          <TreeItemLabel
            handleDeletion={setDeletingCategory}
            category={categoryItem.category}
            url={categoryImageURL}
          />
        }
      >
        <CategoryList tree={categoryItem.subCategories} />
        <TreeItem
          itemId={`add-btn-${categoryItem.category.categoryId}`}
          label={<AddNewSubCategoryItem />}
        />
      </TreeItem>
    </>
  );
}

function CategoryDeletionModal({
  onClose,
  onDelete,
  categoryTitle,
}: {
  onClose: VoidFunction;
  onDelete: VoidFunction;
  categoryTitle: string;
}) {
  return (
    <Modal onClose={onClose}>
      <div className="bg-white rounded-4xl p-8">
        <span className="text-gray-400  text-sm">
          Triying to remove{" "}
          <span className="bg-red-400 inline-block px-1 py-0.5 rounded text-white">
            {categoryTitle}
          </span>
        </span>
        <h3 className="font-semibold my-2 text-xl">
          Are you sure to delete this category item?
        </h3>
        <p className="bg-stone-200 p-1 rounded my-2">
          It cause removing all its sub-categories along with it.
        </p>
        <div className="flex flex-row gap-2 ">
          <button
            onClick={(e) => {
              e.preventDefault();
              onDelete();
            }}
            className="hover:bg-red-500 rounded cursor-pointer px-2 py-0.5"
          >
            Delete
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              onClose();
            }}
            className="hover:bg-gray-400 hover:text-white bg-gray-200 rounded cursor-pointer px-2 py-0.5"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}

function AddNewSubCategoryItem() {
  return (
    <div className="bg-gray-300 p-1 rounded w-fit cursor-pointer">
      + Add Sub-Category
    </div>
  );
}

function TreeItemLabel({
  category,
  url,
  handleDeletion,
}: {
  category: Category;
  url?: string;
  handleDeletion: (category: Category) => void;
}) {
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2">
        <SafeImage
          className="bg-gray-200 w-16 overflow-hidden rounded-full"
          square={true}
          alt={category.name}
          src={url}
        />
        {category.name}
      </div>
      <div className=" flex items-center gap-1">
        <TreeIconButton iconName="edit" onClick={() => {}} />
        <TreeIconButton
          iconClassNames="text-red-400"
          iconName="trash"
          onClick={async () => {
            handleDeletion(category);
          }}
        />
      </div>
    </div>
  );
}

function TreeIconButton({
  iconName,
  classNames,
  iconClassNames,
  onClick,
}: {
  classNames?: string;
  iconName: IconNames;
  iconClassNames?: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      data-action="delete"
      className={`cursor-pointer p-2 w-[40px] aspect-square rounded-full hover:bg-gray-300 ${
        classNames ?? ""
      }`}
    >
      <Icon name={iconName} className={iconClassNames} />
    </button>
  );
}
