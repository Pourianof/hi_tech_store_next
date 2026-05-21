"use client";
import { ProductDto } from "@/core/Dtos/ProductDto";
import { ChangeNotifierIml } from "@/lib/changeNotifier/changeNofier";
import { ReactNode } from "react";
import { NotifierProvider, useNotifier } from "./notifierProvider";
import { ProductVariationChangeNotifier } from "./productVariationChangeNotifier";
import { ProductUpdateFormDto } from "@/core/schemas/productUpdateSchema";
import {
  updateProductAction,
  updateProductCategoryAction,
} from "@/lib/server_actions/productActions";
import { ProblemDetails } from "@/core/errors/AuthErrors/ProblemDetails";
import { ProductCategoryValues } from "@/core/schemas/productCreationSchema";

export class ProductChangeNotifier extends ChangeNotifierIml {
  private readonly _product: Omit<ProductDto, "variations"> & {
    variations: ProductVariationChangeNotifier[];
  };

  private _isProductUpdating = false;
  private _isCategoryUpdating = false;

  private _updatingError?: ProblemDetails;
  private _categoryUpdatingError?: ProblemDetails;

  constructor(product: ProductDto) {
    super();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this._product = { ...product };
    this._product.variations = product.variations.map(
      (p) => new ProductVariationChangeNotifier(p),
    );
  }

  get product() {
    return { ...this._product };
  }

  get isProductUpdating() {
    return this._isProductUpdating;
  }

  get updatingError() {
    return this._updatingError;
  }

  async updateBasicInfos(data: ProductUpdateFormDto) {
    this._isProductUpdating = true;
    this.notifyListeners();

    // update
    const result = await updateProductAction(this.product.productId, data);

    if (result.status == "failed") {
      this._updatingError = result.data;
    } else {
      this._product.title = result.data.title;
      this._product.description = result.data.description;
      this._product.brandModel = result.data.brandModel;
    }

    this._isProductUpdating = false;
    this._updatingError = undefined;

    this.notifyListeners();

    return result;
  }

  get isCategoryUpdating() {
    return this._isCategoryUpdating;
  }

  get categoryUpdatingError() {
    return this._categoryUpdatingError;
  }

  async updateCategory(data: ProductCategoryValues) {
    this._isCategoryUpdating = true;
    this.notifyListeners();

    const result = await updateProductCategoryAction(
      this.product.productId,
      data,
    );

    if (result.status == "failed") {
      this._categoryUpdatingError = result.data;
    } else {
      this._product.categoryId = result.data.categoryId;
      this._product.properties = result.data.properties;
      this._product.components = result.data.components;
    }

    this._isCategoryUpdating = false;
    this._categoryUpdatingError = undefined;

    this.notifyListeners();

    return result;
  }
}

export function ProductConsumer({
  builder,
}: {
  builder(product?: ProductChangeNotifier): ReactNode;
}) {
  const pvNotifier = useNotifier(ProductChangeNotifier);

  return builder(pvNotifier);
}

export function ProductChangeNotifierProvider({
  children,
  product,
}: {
  children: ReactNode;
  product: ProductDto;
}) {
  return (
    <NotifierProvider changeNotifier={new ProductChangeNotifier(product)}>
      {children}
    </NotifierProvider>
  );
}
