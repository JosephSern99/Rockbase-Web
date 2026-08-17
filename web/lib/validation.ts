export interface FieldError {
  field: string;
  message: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface ContactFormInput {
  fullName: string;
  email: string;
  company: string;
  serviceInterest: string;
  message: string;
  consentMarketing: boolean;
}

/**
 * Hand-written validation (no schema library, per project direction).
 * Shared by the client-side Redux slice and the server-side route handler
 * so the two never drift.
 */
export function validateContactForm(input: ContactFormInput): FieldError[] {
  const errors: FieldError[] = [];

  if (!input.fullName.trim()) {
    errors.push({ field: "fullName", message: "Full name is required." });
  } else if (input.fullName.trim().length > 120) {
    errors.push({ field: "fullName", message: "Full name is too long." });
  }

  if (!input.email.trim()) {
    errors.push({ field: "email", message: "Email is required." });
  } else if (!EMAIL_RE.test(input.email.trim())) {
    errors.push({ field: "email", message: "Enter a valid email address." });
  }

  if (input.company.trim().length > 200) {
    errors.push({ field: "company", message: "Company name is too long." });
  }

  if (!input.serviceInterest.trim()) {
    errors.push({ field: "serviceInterest", message: "Select what you're interested in." });
  }

  if (!input.message.trim()) {
    errors.push({ field: "message", message: "Tell us a bit about what you need." });
  } else if (input.message.trim().length > 4000) {
    errors.push({ field: "message", message: "Message is too long." });
  }

  if (!input.consentMarketing) {
    errors.push({
      field: "consentMarketing",
      message: "Please confirm you agree to be contacted.",
    });
  }

  return errors;
}
