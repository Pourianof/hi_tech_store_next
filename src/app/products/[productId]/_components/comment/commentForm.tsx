import { OutlinedButton } from "@/ui/form/AppButtons";
import { ErrorLabeledInput } from "@/ui/form/errorLabeledInput";
import { ControlledStarRating } from "@/ui/form/starRating";
import { Column } from "@/ui/layouts/column";
import { Body } from "@/ui/theme/text/body";
import Link from "next/link";
import { ProductCommentForm } from "../productCommentForm";
import { useAuth } from "@/ui/contexts/authContext";
import { CircularProgress } from "@mui/material";
import { Product } from "@/core/models/product";

export function CommentForm({
  productId,
}: {
  productId: Product["productId"];
}) {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return <CircularProgress />;
  }

  return !!isLoggedIn ? (
    <div className="desktop:w-1/4">
      <ProductCommentForm productId={productId}>
        <Column className="gap-2.5">
          <Body size="lg" as="p">
            leave your comments here for other customers
          </Body>
          <ControlledStarRating fieldName="rate" />
          <ErrorLabeledInput
            filedName="text"
            placeholder="Comment about product..."
            type="text"
          />
          <OutlinedButton>Comment</OutlinedButton>
        </Column>
      </ProductCommentForm>
    </div>
  ) : (
    <Column
      centerH
      className="p-4 rounded-lg gap-2 border border-gray-neutral-ed bg-gray-neutral-f9"
    >
      <div className="text-gray-neutral-44 text-lg">
        You must login for submit review or rate
      </div>
      <Link
        href={{ pathname: "/login" }}
        className="border rounded bg-gray-100 px-2 py-1 text-gray-700 hover:bg-gray-200 hover:text-black"
      >
        Login
      </Link>
    </Column>
  );
}
