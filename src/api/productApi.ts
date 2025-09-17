import { generateResultModelFromResponse } from "./apiHelper";

const API_URL = `${process.env.API_SERVER_ADDRESS}/products`;

export async function createNewProduct(product: FormData, accessToken: string) {
  debugger;
  const respond = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: product,
  });

  return generateResultModelFromResponse(respond);
}
