"use client";
import { ProblemDetails } from "@/core/errors/AuthErrors/ProblemDetails";
import { Category } from "@/core/models/category";
import { CategoryTree as CategoryTreeType } from "@/lib/helpers/categoryTreeBuilder";
import {
  deleteCategoryAction,
  registerCategoryAction,
  updateCategoryAction,
} from "@/lib/server_actions/categoryActions";
import Icon, { IconNames } from "@/ui/icons/icon";
import { Modal } from "@/ui/modal/modal";
import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { NewCategoryForm } from "./newCategoryForm";
import { ApiImage } from "@/ui/image/ApiImage";

function CategoryList({
  categoryItem,
}: {
  categoryItem: Partial<CategoryTreeType[number]>;
  parent?: Category;
}) {
  const [tree, setTree] = useState<CategoryTreeType>(
    categoryItem.subCategories ?? []
  );
  const [newSubCategoryForm, setNewSubCategoryForm] = useState(false);

  useEffect(() => {
    categoryItem.subCategories = tree;
  }, [tree, categoryItem]);

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

  return (
    <>
      {newSubCategoryForm && (
        <Modal onClose={() => setNewSubCategoryForm(false)}>
          <NewCategoryForm
            oncancel={() => setNewSubCategoryForm(false)}
            submit={async (formData) => {
              if (categoryItem.category) {
                formData.append(
                  "parentCategoryId",
                  `${categoryItem.category.categoryId}`
                );
              }

              return registerCategoryAction(formData);
            }}
            handleSubmitSuccussfully={(c) => {
              setTree((t) => [...t, { category: c, subCategories: [] }]);
              setNewSubCategoryForm(false);
            }}
          />
        </Modal>
      )}
      {tree.map((c) => (
        <CategoryItem
          key={c.category.categoryId}
          categoryItem={c}
          onDelete={deleteCategory}
        />
      ))}
      <AddNewSubCategoryItem
        onClick={() => {
          setNewSubCategoryForm(true);
        }}
      />
    </>
  );
}

export function CategoryTree({ tree }: { tree: CategoryTreeType }) {
  return (
    <SimpleTreeView>
      <CategoryList categoryItem={{ subCategories: tree }} />
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
  const [editingCategory, setEditingCategory] = useState<Category>();

  return (
    <>
      {!!deletingCategory && (
        <CategoryDeletionModal
          categoryTitle={categoryItem.category.name}
          onClose={() => setDeletingCategory(undefined)}
          onDelete={() => onDelete?.(categoryItem.category.categoryId)}
        />
      )}
      {!!editingCategory && (
        <Modal onClose={() => setEditingCategory(undefined)}>
          <NewCategoryForm
            handleSubmitSuccussfully={(category) => {
              editingCategory.name = category.name;
              editingCategory.description = category.description;
              editingCategory.image = category.image;
              editingCategory.parentCategoryId = category.parentCategoryId;

              setEditingCategory(undefined);
            }}
            submit={(category, base) => {
              return updateCategoryAction(base!.categoryId, category);
            }}
            oncancel={() => setEditingCategory(undefined)}
            editingCategory={categoryItem.category}
          />
        </Modal>
      )}
      <TreeItem
        key={categoryItem.category.categoryId}
        itemId={`${categoryItem.category.categoryId}`}
        label={
          <TreeItemLabel
            handleEdition={setEditingCategory}
            handleDeletion={setDeletingCategory}
            category={categoryItem.category}
          />
        }
      >
        <CategoryList categoryItem={categoryItem} />
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
      <div className="bg-white rounded-4xl p-2">
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

function AddNewSubCategoryItem({ onClick }: { onClick: VoidFunction }) {
  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      className="ms-4 my-1 bg-gray-300 p-1 rounded w-fit cursor-pointer"
    >
      + Add Sub-Category
    </div>
  );
}

function TreeItemLabel({
  category,
  handleDeletion,
  handleEdition,
}: {
  category: Category;
  handleDeletion: (category: Category) => void;
  handleEdition: (category: Category) => void;
}) {
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2">
        <ApiImage
          src={category.image}
          className="bg-gray-200 w-16 overflow-hidden rounded-full"
          square={true}
          alt={category.name}
        />
        {category.name}
      </div>
      <div className=" flex items-center gap-1">
        <TreeIconButton
          iconName="edit"
          onClick={() => {
            handleEdition(category);
          }}
        />
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
      className={`cursor-pointer p-2 w-[40px] aspect-square rounded-full hover:bg-gray-300 ${
        classNames ?? ""
      }`}
    >
      <Icon name={iconName} className={iconClassNames} />
    </button>
  );
}
