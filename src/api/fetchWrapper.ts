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

  const response = await fetch(finalUrl, {
    method: "GET",
    headers: await getHeaders(),
  });

  return handleResponse<T>(response);
}

enum BodyType {
  Json,
  FormData,
}

function getType(data: object) {
  return data instanceof FormData ? BodyType.FormData : BodyType.Json;
}

function isJson(data: object) {
  return getType(data) == BodyType.Json;
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

async function getHeaders(isJson: boolean = false) {
  const session = await auth();
  const headers = new Headers();

  if (isJson) {
    headers.set("Content-Type", "application/json");
  }

  if (session) {
    headers.set("Authorization", `Bearer ${session.apiToken}`);
  }

  return headers;
}

async function sendData<T>(
  url: string,
  method: "POST" | "PUT" | "PATCH",
  body: object,
) {
  const isJsonData = isJson(body);

  return handleResponse<T>(
    await fetch(url, {
      method,
      headers: await getHeaders(isJsonData),
      body: isJsonData ? JSON.stringify(body) : (body as FormData),
    }),
  );
}

async function post<T>(url: string, data: object) {
  return sendData<T>(url, "POST", data);
}

async function put<T>(url: string, data: object) {
  return sendData<T>(url, "PUT", data);
}

async function patch<T>(url: string, data: object) {
  return sendData<T>(url, "PATCH", data);
}

async function _delete<T>(url: string) {
  return handleResponse<T>(
    await fetch(url, {
      method: "DELETE",
      headers: await getHeaders(),
    }),
  );
}

export const fetchWrapper = { get, post, put, delete: _delete, patch };
