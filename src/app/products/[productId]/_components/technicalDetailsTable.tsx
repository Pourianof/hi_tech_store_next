import {
  Product,
  ProductComponent,
  ProductProperty,
} from "@/core/models/product";
import React from "react";

export function TechnicalDetailsTable({ product }: { product: Product }) {
  return (
    <table className="w-full" id="details">
      <caption className=" font-semibold text-2xl text-left">
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
          <th className="text-start">{component.name}</th>
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
      <td className="p-2">{property.name}</td>
      <td className="p-2">{property.value}</td>
    </tr>
  );
}
