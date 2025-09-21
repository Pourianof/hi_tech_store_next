"use client";

import { useHash } from "@/ui/hooks/useHash";

const HASH_LINKS = [
  { hash: "details", label: "Technical Details" },
  { hash: "similar-products", label: "Similar Products" },
  { hash: "comments", label: "Comments" },
];

export function ProductPagePartsTabs() {
  const hash = useHash();

  return (
    <div className="border-b flex">
      {HASH_LINKS.map((link) => (
        <a
          className={`relative px-4 inline-block pb-1 -bottom-[2px] ${
            hash.endsWith(link.hash)
              ? "text-blue-600 border-b-2 border-b-blue-500 relative"
              : ""
          }`}
          key={link.hash}
          href={`#${link.hash}`}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}
