import { NextRequest, NextResponse } from "next/server";
import { validateContactForm, type ContactFormInput } from "@/lib/validation";
import { apiFetch } from "@/lib/api/client";
import { ApiError, type Lead, type LeadCreateInput } from "@/lib/api/types";

export async function POST(request: NextRequest) {
  let input: ContactFormInput;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ errors: [{ field: "_", message: "Invalid request body." }] }, { status: 400 });
  }

  const errors = validateContactForm(input);
  if (errors.length > 0) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  const payload: LeadCreateInput = {
    fullName: input.fullName.trim(),
    email: input.email.trim(),
    companyName: input.company.trim() || undefined,
    serviceInterest: input.serviceInterest,
    message: input.message.trim(),
    sourcePage: request.headers.get("referer") ?? "/contact",
    consentMarketing: input.consentMarketing,
  };

  try {
    const lead = await apiFetch<Lead>("/api/leads", { method: "POST", body: payload });
    return NextResponse.json({ lead }, { status: 201 });
  } catch (error) {
    if (error instanceof ApiError && error.status === 503) {
      // API_BASE_URL isn't set yet — the Spring Boot service doesn't exist
      // in this environment. Surface that honestly rather than faking a
      // success response (no mock data, per project convention).
      return NextResponse.json(
        { errors: [{ field: "_", message: "Lead intake isn't connected to a backend yet." }] },
        { status: 503 },
      );
    }
    const status = error instanceof ApiError ? error.status : 502;
    return NextResponse.json(
      { errors: [{ field: "_", message: "Something went wrong submitting your message. Please try again." }] },
      { status },
    );
  }
}
