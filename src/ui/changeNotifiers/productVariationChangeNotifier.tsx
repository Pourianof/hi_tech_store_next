import { ProblemDetails } from "@/core/errors/AuthErrors/ProblemDetails";
import { ProductVariation } from "@/core/models/product";
import { ProductVariationDetailsUpdateDto } from "@/core/schemas/productVariationDetailsUpdateSchema";
import { ChangeNotifierIml } from "@/lib/changeNotifier/changeNofier";
import {
  addMediaToVariationAction,
  updateProductVariationDetailsAction,
} from "@/lib/server_actions/productActions";
import { ReactNode } from "react";
import { Consumer } from "./consumer";

export class ProductVariationChangeNotifier extends ChangeNotifierIml {
  private readonly _productVariation: ProductVariation;
  private _isMediaUpdating = false;
  private _isVariationUpdating = false;
  private _variationUpdateError?: ProblemDetails;

  constructor(productVariation: ProductVariation) {
    super();

    this._productVariation = productVariation;
  }

  get productVariation() {
    return { ...this._productVariation };
  }

  get isMediaUpdating() {
    return this._isMediaUpdating;
  }

  get isVariationUpdating() {
    return this._isVariationUpdating;
  }

  get variationUpdateError() {
    return this._variationUpdateError;
  }

  async updateDetails(updateDetails: ProductVariationDetailsUpdateDto) {
    const result = await updateProductVariationDetailsAction(
      this._productVariation.productVariationId,
      updateDetails,
    );

    if (result.status == "failed") {
      this._variationUpdateError = result.data;
    } else {
      const newPv = result.data;

      this._productVariation.color = newPv.color;
      this._productVariation.inventory = newPv.inventory;
      this._productVariation.price = newPv.price;
    }

    this.notifyListeners();
    return result;
  }

  async addNewMedia(media: FormData) {
    this._isMediaUpdating = true;
    this.notifyListeners();

    const result = await addMediaToVariationAction(
      this.productVariation.productVariationId,
      media,
    );

    if (result.status == "failed") {
      this._variationUpdateError = result.data;
    } else {
      this._productVariation.media.push(result.data);
    }

    this._isMediaUpdating = false;
    this.notifyListeners();
  }
}

export function ProductVariationConsumer({
  builder,
}: {
  builder(productVariation?: ProductVariationChangeNotifier): ReactNode;
}) {
  return (
    <Consumer notifierType={ProductVariationChangeNotifier} builder={builder} />
  );
}
