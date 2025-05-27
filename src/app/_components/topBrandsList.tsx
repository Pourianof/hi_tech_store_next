import { CustomImage } from "./customImage";
import { ItemsListBox } from "./iemsListBox";

const BRANDS: { name: string; logo: string }[] = [
  { name: "apple", logo: "/images/top_brands/apple.svg" },
  { name: "sony", logo: "/images/top_brands/sony.svg" },
  { name: "samsung", logo: "/images/top_brands/samsung.svg" },
  { name: "canon", logo: "/images/top_brands/canon.svg" },
  { name: "huawei", logo: "/images/top_brands/huawei.svg" },
  { name: "lenovo", logo: "/images/top_brands/lenovo.svg" },
];

export function TopBrandsList() {
  return (
    <ItemsListBox label="Top Brands">
      <div className="flex h-[100px] py-8 gap-6 ">
        {BRANDS.map((brand) => (
          <CustomImage src={brand.logo} alt={brand.name} key={brand.name} />
        ))}
      </div>
    </ItemsListBox>
  );
}
