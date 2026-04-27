import {
  Product,
  ProductComponent,
  ProductProperty,
} from "@/core/models/product";
import { Body } from "@/ui/theme/text/body";
import React from "react";

export function TechnicalDetailsTable({ product }: { product: Product }) {
  return (
    <table className="w-full" id="details">
      <caption className=" font-semibold text-2xl text-left mb-12px">
        Technical Details
      </caption>

      <ProductPropertiesList properties={product.properties} />
      <ProductComponentsList components={product.components} />
    </table>
  );
}

function ProductComponentsList({
  components,
}: {
  components: ProductComponent[];
}) {
  return components.map((component) => {
    return (
      <tbody key={component.componentTypeId} className="text-gray-neutral-71">
        <tr>
          <th className="text-start text-h6 font-semibold text-gray-neutral-50">
            {component.name}
          </th>
        </tr>
        {component.models.map((model) => (
          <ProductPropertiesList
            key={model.componentModelId}
            properties={
              [
                model.brandModel
                  ? {
                      name: "Brand",
                      value: `${model.brandModel.brandName} - ${model.brandModel.modelName}`,
                    }
                  : {},
                ...model.properties,
              ] as ProductProperty[]
            }
          />
        ))}
      </tbody>
    );
  });
}

function ProductPropertiesList({
  properties,
}: {
  properties: ProductProperty[];
}) {
  return (
    <>
      {properties.map((prop) => (
        <ProductProeprtyRow key={prop.propertyId} property={prop} />
      ))}
    </>
  );
}

function ProductProeprtyRow({ property }: { property: ProductProperty }) {
  return (
    <tr className="odd:bg-gray-neutral-f9 " key={property.propertyId}>
      <td className="p-2 text-h6">{property.name}</td>
      <td className="p-2">
        <Body size="md">{property.value}</Body>
      </td>
    </tr>
  );
}
