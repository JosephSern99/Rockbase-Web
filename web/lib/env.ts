function readServerUrl(name: string, value: string | undefined): string | undefined {
  if (!value) return undefined;
  try {
    new URL(value);
  } catch {
    throw new Error(`Invalid ${name}: "${value}" is not a valid URL`);
  }
  return value;
}

/**
 * Base URL of the Spring Boot API (e.g. https://api.rockbase.example).
 * Unset in local/dev until the backend exists — callers must handle that
 * explicitly rather than silently falling back to fake data.
 */
export const API_BASE_URL = readServerUrl("API_BASE_URL", process.env.API_BASE_URL);

export const SITE_URL =
  readServerUrl("NEXT_PUBLIC_SITE_URL", process.env.NEXT_PUBLIC_SITE_URL) ??
  "http://localhost:3000";
