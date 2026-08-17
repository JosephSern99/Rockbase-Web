/**
 * DTOs mirroring the `lead` table in website-architecture-v1.md §4 —
 * the contract the Spring Boot API will implement at POST /api/leads.
 */
export interface LeadCreateInput {
  fullName: string;
  email: string;
  phone?: string;
  companyName?: string;
  serviceInterest: string;
  message: string;
  sourcePage: string;
  utm?: Record<string, string | undefined>;
  referralCode?: string;
  consentMarketing: boolean;
}

export type LeadStatus = "new" | "contacted" | "qualified" | "won" | "lost" | "spam";

export interface Lead extends LeadCreateInput {
  id: string;
  status: LeadStatus;
  createdAt: string;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}
