import { ResultModel } from "@/core/models/resultModel";

const API_URL = `${process.env.API_SERVER_ADDRESS}/products`;

export async function createNewProduct(product: FormData, accessToken: string) {
  const respond = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: product,
  });

  return {
    status: respond.ok ? "success" : "failed",
    statusCode: respond.status,
    data: await respond.json(),
  } as ResultModel;
}
