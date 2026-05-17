import { ProductColor, ProductVariation } from "@/core/models/product";
import Icon from "@/ui/icons/icon";
import { Row } from "@/ui/layouts/row";
import { Body } from "@/ui/theme/text/body";
import { ReactNode, useState } from "react";
import {
  FiChevronRight,
  FiCircle,
  FiDollarSign,
  FiHash,
  FiInfo,
  FiLayers,
  FiPercent,
} from "react-icons/fi";
import { IoMdColorPalette } from "react-icons/io";
import { MdOutlineInventory } from "react-icons/md";
import { VariationDetailsEditingForm } from "./variationDetailsEditingForm";

const DetailRow = ({
  icon: Icon,
  label,
  value,
  className = "",
}: {
  icon: React.FC<{ className: string }>;
  label: string;
  value?: ReactNode;
  className?: string;
}) => (
  <div
    className={`flex items-start gap-3 py-2 border-b border-gray-100 last:border-0 ${className}`}
  >
    <div className="flex-shrink-0 w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
      <Icon className="w-4 h-4 text-gray-500" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs text-gray-400 uppercase tracking-wide">{label}</p>
      <p className="text-sm text-gray-700 font-medium mt-0.5 break-all">
        {value}
      </p>
    </div>
  </div>
);

export function VariationDetails({
  variation,
}: {
  variation: ProductVariation;
}) {
  const [showAllDetails, setShowAllDetails] = useState(false);
  const discountedPrice = variation.discount
    ? variation.price * (1 - variation.discount / 100)
    : variation.price;

  const [displayEditingModal, setDisplayEditingModal] = useState(false);

  const basicDetails = [
    {
      icon: FiHash,
      label: "Variation ID",
      value: `#${variation.productVariationId}`,
    },
    {
      icon: IoMdColorPalette,
      label: "Color",
      value: (
        <div className="flex items-center gap-2">
          <div
            className="w-4 h-4 rounded-full shadow-inner"
            style={{ backgroundColor: `#${variation.color.code}` }}
          />
          <span>{variation.color.name}</span>
          <span className="text-xs text-gray-400 font-mono">
            #{variation.color.code}
          </span>
        </div>
      ),
    },
    {
      icon: MdOutlineInventory,
      label: "Inventory",
      value: (
        <span
          className={
            variation.inventory > 0 ? "text-green-600" : "text-red-500"
          }
        >
          {variation.inventory > 0
            ? `${variation.inventory} units available`
            : "Out of stock"}
        </span>
      ),
    },
    {
      icon: FiDollarSign,
      label: "Price",
      value: (
        <div>
          <span className="font-semibold">${discountedPrice.toFixed(2)}</span>
          {variation.discount && (
            <>
              <span className="text-gray-400 line-through ml-2 text-xs">
                ${variation.price.toFixed(2)}
              </span>
              <span className="ml-2 text-xs text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                -{variation.discount}%
              </span>
            </>
          )}
        </div>
      ),
    },
  ];

  const additionalDetails = variation.discount
    ? [
        {
          icon: FiPercent,
          label: "Discount Amount",
          value: `$${(variation.price - discountedPrice).toFixed(2)} saved`,
        },
        {
          icon: FiInfo,
          label: "Final Price",
          value: `$${discountedPrice.toFixed(2)}`,
        },
      ]
    : [];

  return (
    <div className="p-6">
      {displayEditingModal && (
        <VariationDetailsEditingForm
          onClose={() => setDisplayEditingModal(false)}
          variation={variation}
        />
      )}

      <Row centerV className="gap-2 mb-4 justify-between">
        <Row>
          <FiLayers className="w-4 h-4 text-gray-400" />
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Specifications
          </span>
        </Row>
        <button
          className="gap-2 hover text-primary-blue-42 fill-primary-blue-42 hover:text-primary-blue-0c hover:fill-primary-blue-0c hover:cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            setDisplayEditingModal(true);
          }}
        >
          <Row centerV>
            <Icon name="edit" />
            <Body size="md">Edit</Body>
          </Row>
        </button>
      </Row>

      <div className="grid grid-cols-2 gap-2">
        {basicDetails.map((detail, idx) => (
          <DetailRow key={idx} {...detail} />
        ))}

        {additionalDetails.length > 0 && showAllDetails && (
          <>
            <div className="my-2 border-t border-gray-100" />
            {additionalDetails.map((detail, idx) => (
              <DetailRow key={`additional-${idx}`} {...detail} />
            ))}
          </>
        )}
      </div>

      {/* Toggle Additional Details */}
      {additionalDetails.length > 0 && (
        <button
          onClick={(e) => {
            e.preventDefault();
            setShowAllDetails(!showAllDetails);
          }}
          className="mt-4 text-xs text-blue-500 hover:text-blue-600 font-medium flex items-center gap-1"
        >
          {showAllDetails ? "Show less" : "Show discount details"}
          <FiChevronRight
            className={`w-3 h-3 transition-transform ${showAllDetails ? "rotate-90" : ""}`}
          />
        </button>
      )}

      <ColorInfoCard color={variation.color} />
    </div>
  );
}

function ColorInfoCard({ color }: { color: ProductColor }) {
  return (
    <div className="mt-5 pt-4 border-t border-gray-100">
      <div className="bg-gray-50 rounded-xl p-3">
        <div className="flex items-center gap-2 mb-2">
          <FiCircle className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-xs font-medium text-gray-500">
            Color Reference
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl shadow-inner"
            style={{ backgroundColor: `#${color.code}` }}
          />
          <div>
            <p className="text-sm font-medium text-gray-700">{color.name}</p>
            <p className="text-xs text-gray-400 font-mono">{color.code}</p>
            <p className="text-xs text-gray-400">ID: {color.colorId}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
