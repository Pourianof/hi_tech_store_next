import { ResultModel } from "@/core/models/resultModel";
import { auth } from "../../auth";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function get<T>(url: string, queryParams?: Record<string, any>) {
  const finalUrl = new URL(url);
  if (queryParams) {
    Object.keys(queryParams).forEach((key) => {
      if (!!queryParams[key]) {
        finalUrl.searchParams.append(key, queryParams[key].toString());
      }
    });
  }

  console.log(queryParams, finalUrl.href);

  const response = await fetch(finalUrl, {
    method: "GET",
    headers: await getHeaders(),
  });

  return handleResponse<T>(response);
}

async function handleResponse<T>(response: Response) {
  let json: unknown;
  try {
    json = await response.json();
  } catch {}

  return {
    status: response.ok ? "success" : "failed",
    statusCode: response.status,
    data: json
      ? (json as T)
      : !response.ok
        ? { title: response.statusText }
        : undefined,
  } as ResultModel<T>;
}

async function post<T>(url: string, data: object) {
  const isFormData = data instanceof FormData;
  return handleResponse<T>(
    await fetch(url, {
      method: "POST",
      headers: await getHeaders(),
      body: isFormData ? data : JSON.stringify(data),
    }),
  );
}

async function put<T>(url: string, data: object) {
  const isFormData = data instanceof FormData;
  return handleResponse<T>(
    await fetch(url, {
      method: "PUT",
      headers: await getHeaders(),
      body: isFormData ? data : JSON.stringify(data),
    }),
  );
}

async function patch<T>(url: string, data: object) {
  const isFormData = data instanceof FormData;
  return handleResponse<T>(
    await fetch(url, {
      method: "PATCH",
      headers: await getHeaders(),
      body: isFormData ? data : JSON.stringify(data),
    }),
  );
}

async function _delete<T>(url: string) {
  return handleResponse<T>(
    await fetch(url, {
      method: "DELETE",
      headers: await getHeaders(),
    }),
  );
}

async function getHeaders(isFormData: boolean = false) {
  const session = await auth();
  const headers = new Headers();

  if (!isFormData) {
    headers.set("Content-Type", "application/json");
  }

  if (session) {
    headers.set("Authorization", `Bearer ${session.apiToken}`);
  }

  return headers;
}

export const fetchWrapper = { get, post, put, delete: _delete, patch };
