import { ErrorLabeledInput } from "@/ui/form/errorLabeledInput";
import { ControlledStarRating } from "@/ui/form/starRating";
import { Column } from "@/ui/layouts/column";
import { ProductCommentForm } from "./productCommentForm";
import { ProductCommentList } from "./productCommentList";
import { auth } from "../../../../../auth";
import Link from "next/link";

export async function ProductComments() {
  const session = await auth();

  return (
    <div id="comments">
      <h3 className="text-2xl font-semibold">Comments</h3>
      <div className="flex gap-4">
        {!!session ? (
          <ProductCommentForm>
            <Column className="gap-2.5 min-w-[30%]">
              <p>leave your comments here for other customers</p>
              <ControlledStarRating fieldName="rate" />
              <ErrorLabeledInput
                filedName="text"
                placeholder="Comment about product..."
                type="text"
              />
              <button className="border border-blue-600 text-blue-500 py-2 w-full text-center">
                Comment
              </button>
            </Column>
          </ProductCommentForm>
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
      </div>
    </div>
  );
}
