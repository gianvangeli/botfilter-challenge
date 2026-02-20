import { BASE_URL } from "./endpoints";

type ApiErrorDetails = {
    status: number;
    message: string;
};

export class ApiError extends Error {
    status: number;

    constructor(details: ApiErrorDetails) {
        super(details.message);
        this.name = "ApiError";
        this.status = details.status;
    }
}

async function parseJsonSafe(res: Response) : Promise<unknown> {
    const text = await res.text();
    if (!text) return null;
    try {
        return JSON.parse(text);
    } catch {
        return text;
    }
}

export async function apiFetch<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  const data = await parseJsonSafe(res);
  
  if (!res.ok) {
    const message = 
      typeof data === "string"
        ? data
        : (data as any)?.message || `Request failed (${res.status})`;
    throw new ApiError({ status: res.status, message });
  }

  return data as T;
}