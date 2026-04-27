"use client";

import { useHash } from "@/ui/hooks/useHash";
import { Row } from "@/ui/layouts/row";
import { Body } from "@/ui/theme/text/body";

const HASH_LINKS = [
  { hash: "details", label: "Technical Details" },
  { hash: "similar-products", label: "Similar Products" },
  { hash: "comments", label: "Comments" },
];

export function ProductPagePartsTabs() {
  const hash = useHash();

  return (
    <Row className="border-b">
      {HASH_LINKS.map((link) => (
        <a
          className={`relative p-12px inline-block pb-1 -bottom-0.5 ${
            hash.endsWith(link.hash)
              ? "text-blue-600 border-b-2 border-b-blue-500 relative"
              : ""
          }`}
          key={link.hash}
          href={`#${link.hash}`}
        >
          <Body size="lg">{link.label}</Body>
        </a>
      ))}
    </Row>
  );
}
