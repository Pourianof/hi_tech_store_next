import { CustomImage } from "./customImage";

const CATEGORIES: { title: string; img: string }[] = [
  { title: "Accessories", img: "/images/accessories.png" },
  { title: "Camera", img: "/images/camera.png" },
  { title: "Smart Phone", img: "/images/iphone.png" },
  { title: "Gaming", img: "/images/controller.png" },
  { title: "Smart watch", img: "/images/smart_watch.png" },
];

function CategoryMiniCard(props: { category: { title: string; img: string } }) {
  return (
    <div className="flex-col items-center text-center w-1/5 relative shadow-md p-4 rounded">
      <CustomImage
        className="w-full aspect-square"
        src={props.category.img}
        alt={props.category.img}
      />
      {props.category.title}
    </div>
  );
}

export function CategoriesMiniCardList() {
  return (
    <div className="flex gap-4 my-4 wrapper">
      {CATEGORIES.map((cat) => (
        <CategoryMiniCard category={cat} key={cat.title} />
      ))}
    </div>
  );
}
