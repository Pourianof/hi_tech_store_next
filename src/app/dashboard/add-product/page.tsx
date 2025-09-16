"use client";

import { ProductDto } from "@/core/Dtos/ProductDto";
import { ProductForm } from "./_components/productForm";
import { useState } from "react";
import { ProductItem } from "@/app/_components/productItem";

export default function AddProductPage() {
  const [succeedProductCreation, setSucceedProductCreation] =
    useState<ProductDto>();

  function handleProductSubmission(product: ProductDto) {
    product.media.forEach((m) => {
      m.url = `http://localhost:5108${m.url}`;
    });
    setSucceedProductCreation(product);
  }

  return succeedProductCreation ? (
    <div className="p-4 space-y-6">
      <h3 className="text-white text-center font-semibold text-xl bg-green-600 p-2 rounded">
        Product created successfully
      </h3>
      <ProductItem product={succeedProductCreation} />
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
