"use client";

import { ProductItem } from "@/app/_components/productItem";
import { ProductForm } from "./productForm";
import { ProductDto } from "@/core/Dtos/ProductDto";
import { useState } from "react";
import { flatMapBasedOn } from "@/lib/utils/arrayHelpers";
import { ProductModel } from "@/core/models/productModel";

export function AddProductFormPage() {
  const [succeedProductCreation, setSucceedProductCreation] =
    useState<ProductDto>();

  function handleProductSubmission(product: ProductDto) {
    flatMapBasedOn(product.variations, (v) => v.media).forEach((m) => {
      m.url = `${process.env.NEXT_PUBLIC_API_SERVER_ADDRESS}/${m.url}`;
    });
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
