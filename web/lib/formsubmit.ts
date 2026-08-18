import { FORMSUBMIT_CC, FORMSUBMIT_TO } from "@/lib/env";
import type { ContactFormInput } from "@/lib/validation";

/**
 * Posts the contact form straight to FormSubmit.co from the browser — a
 * temporary plugin standing in for a real backend. Throws on any non-success
 * response so the caller can surface a real error instead of a fake success.
 */
export async function submitToFormSubmit(input: ContactFormInput): Promise<void> {
  const response = await fetch(`https://formsubmit.co/ajax/${FORMSUBMIT_TO}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      name: input.fullName.trim(),
      email: input.email.trim(),
      phone: input.phone.trim(),
      company: input.company.trim() || "(not provided)",
      service_interest: input.serviceInterest,
      message: input.message.trim(),
      _subject: `New enquiry from ${input.fullName.trim()}`,
      _cc: FORMSUBMIT_CC,
      _template: "table",
    }),
  });

  if (!response.ok) {
    throw new Error(`FormSubmit request failed with status ${response.status}`);
  }

  const body = (await response.json().catch(() => null)) as { success?: string } | null;
  if (body?.success !== "true") {
    throw new Error("FormSubmit did not confirm delivery.");
  }
}
