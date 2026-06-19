"use client";

import { ProductItem } from "@/app/_components/productItem";
import { ProductDto } from "@/core/Dtos/ProductDto";
import { ProductModel } from "@/core/models/productModel";
import { useState } from "react";
import { ProductForm } from "./productForm";

export function AddProductFormPage() {
  const [succeedProductCreation, setSucceedProductCreation] =
    useState<ProductDto>();

  function handleProductSubmission(product: ProductDto) {
    setSucceedProductCreation(product);
  }

  return succeedProductCreation ? (
    <div className="p-4 space-y-6">
      <h3 className="text-white text-center font-semibold text-xl bg-green-600 p-2 rounded">
        Product created successfully
      </h3>
      <ProductItem
        product={ProductModel.CreateWithDto(succeedProductCreation)}
      />
      <div>
        <button
          onClick={(e) => {
            e.preventDefault();
            setSucceedProductCreation(undefined);
          }}
          className="rounded border py-2 px-4 bg-stone-400 cursor-pointer hover:bg-stone-700 hover:text-white"
        >
          Add new one
        </button>
      </div>
    </div>
  ) : (
    <ProductForm onFormSubmitted={handleProductSubmission} />
  );
}
