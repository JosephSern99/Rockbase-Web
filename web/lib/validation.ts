export interface FieldError {
  field: string;
  message: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PHONE_RE = /^[0-9+()\-\s]{7,20}$/;

export interface ContactFormInput {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  serviceInterest: string;
  message: string;
  consentMarketing: boolean;
}

/**
 * Hand-written validation (no schema library, per project direction).
 * Shared by the client-side Redux slice submit thunk so form errors never
 * drift from what actually gets submitted.
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

  if (!input.phone.trim()) {
    errors.push({ field: "phone", message: "Contact number is required." });
  } else if (!PHONE_RE.test(input.phone.trim())) {
    errors.push({ field: "phone", message: "Enter a valid contact number." });
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
