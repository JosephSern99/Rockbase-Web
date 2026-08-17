import { API_BASE_URL } from "@/lib/env";
import { ApiError } from "@/lib/api/types";

const DEFAULT_TIMEOUT_MS = 8000;

interface ApiFetchOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  timeoutMs?: number;
}

/**
 * The one seam every call to the Spring Boot API goes through.
 * Throws ApiError when API_BASE_URL isn't configured yet — callers must
 * handle that explicitly (see app/api/leads/route.ts) instead of the
 * client silently pretending the backend exists.
 */
export async function apiFetch<T>(path: string, options: ApiFetchOptions = {}): Promise<T> {
  if (!API_BASE_URL) {
    throw new ApiError("API_BASE_URL is not configured", 503);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeoutMs ?? DEFAULT_TIMEOUT_MS);

  try {
    const response = await fetch(new URL(path, API_BASE_URL), {
      method: options.method ?? "GET",
      headers: { "Content-Type": "application/json" },
      body: options.body ? JSON.stringify(options.body) : undefined,
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new ApiError(`Request to ${path} failed`, response.status);
    }

    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if (error instanceof Error && error.name === "AbortError") {
      throw new ApiError(`Request to ${path} timed out`, 504);
    }
    throw new ApiError(`Request to ${path} failed: ${(error as Error).message}`, 502);
  } finally {
    clearTimeout(timeout);
  }
}
