import { DiscountConditionScriptCheckDto } from "@/core/Dtos/discountDto";
import { ProductModel } from "@/core/models/productModel";
import { ResultModel } from "@/core/models/resultModel";
import { checkDiscountScriptAction } from "@/lib/server_actions/discountActions";

const checkDiscountScript = async (
  scriptDto: DiscountConditionScriptCheckDto,
) => {
  const result = await checkDiscountScriptAction(scriptDto);

  if (result.status == "success") {
    result.data = result.data.map((p) => ProductModel.CreateWith(p));
  }

  return result as ResultModel<ProductModel[]>;
};

export const discountActions = { checkDiscountScript };
