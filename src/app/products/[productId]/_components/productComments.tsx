import { ErrorLabeledInput } from "@/ui/form/errorLabeledInput";
import { ControlledStarRating } from "@/ui/form/starRating";
import { Column } from "@/ui/layouts/column";
import { ProductCommentForm } from "./productCommentForm";
import { ProductCommentList } from "./productCommentList";
import { auth } from "../../../../../auth";
import Link from "next/link";
import { H5 } from "@/ui/theme/text/headers";
import { Body } from "@/ui/theme/text/body";
import { OutlinedButton } from "@/ui/form/AppButtons";
import { Row } from "@/ui/layouts/row";

export async function ProductComments() {
  const session = await auth();

  return (
    <div id="comments">
      <H5>Comments</H5>
      <Row className="gap-16px">
        {!!session ? (
          <div className="w-1/4">
            <ProductCommentForm>
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
        )}

        <ProductCommentList />
      </Row>
    </div>
  );
}
