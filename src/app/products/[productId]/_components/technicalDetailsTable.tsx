import { Product } from "@/core/models/product";

export function TechnicalDetailsTable({ product }: { product: Product }) {
  return (
    <table className="w-full" id="details">
      <caption className=" font-semibold text-2xl text-left">
        Technical Details
      </caption>
      <tbody>
        {product.properties.slice(0, 6).map((prop) => {
          return (
            <tr className="odd:bg-gray-200 " key={prop.propertyId}>
              <td className="p-2">{prop.name}</td>
              <td className="p-2">{prop.value}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
