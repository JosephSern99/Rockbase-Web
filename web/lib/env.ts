function readServerUrl(name: string, value: string | undefined): string | undefined {
  if (!value) return undefined;
  try {
    new URL(value);
  } catch {
    throw new Error(`Invalid ${name}: "${value}" is not a valid URL`);
  }
  return value;
}

export const SITE_URL =
  readServerUrl("NEXT_PUBLIC_SITE_URL", process.env.NEXT_PUBLIC_SITE_URL) ??
  "http://localhost:3000";

/**
 * FormSubmit.co is a temporary stand-in for lead intake until a real backend
 * exists — the contact form posts straight to it from the browser. The first
 * submission to a new destination address requires a one-time email
 * confirmation from FormSubmit before further submissions deliver.
 */
export const FORMSUBMIT_TO = process.env.NEXT_PUBLIC_FORMSUBMIT_TO ?? "ew7063325@gmail.com";
export const FORMSUBMIT_CC = process.env.NEXT_PUBLIC_FORMSUBMIT_CC ?? "kepler.bef@gmail.com";
