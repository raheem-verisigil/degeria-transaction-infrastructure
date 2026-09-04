export type EvidenceStatus = "OBSERVED" | "CALCULATED" | "ASSUMED" | "PREDICTED" | "RECOMMENDED" | "DECIDED" | "ACTUAL" | "RECONCILED";
export type TransactionStatus = "DRAFT" | "ASSESSING" | "EVIDENCE_REVIEW" | "READY_FOR_REVIEW" | "INSTITUTION_REVIEW" | "ACTIVE" | "COMPLETED" | "OUTCOME_RECORDED" | "EXCEPTION";

export interface TransactionEvidence {
  id: string;
  type: string;
  status: EvidenceStatus;
  source: string;
  timestamp: string;
  value?: number;
  currency?: string;
}

export interface TransactionPassport {
  id: string;
  organizationId: string;
  status: TransactionStatus;
  value: number;
  currency: string;
  paymentTermDays: number;
  predictedMargin: number;
  actualMargin?: number;
  evidenceIndex: number;
  evidence: TransactionEvidence[];
  mode: "demo" | "api";
}

export interface EvaluationRequest {
  company: string;
  country: string;
  industry: string;
  transactionType: string;
  transactionSize: string;
  paymentTerm: string;
  objectives: string[];
}

export type EvaluationResult = { ok: true; mode: "api" | "demo" } | { ok: false; mode: "demo"; reason: string };

export const DEMO_TRANSACTION: TransactionPassport = {
  id: "DGR-TRX-DEMO-001",
  organizationId: "DEMO-ORGANIZATION",
  status: "EVIDENCE_REVIEW",
  value: 2500000,
  currency: "EUR",
  paymentTermDays: 120,
  predictedMargin: 14.1,
  actualMargin: 8.7,
  evidenceIndex: 87,
  mode: "demo",
  evidence: [
    { id: "e-001", type: "Sales contract", status: "OBSERVED", source: "Contract clause 8.2", timestamp: "2026-09-03T14:32:00Z", value: 2500000, currency: "EUR" },
    { id: "e-002", type: "Bill of materials", status: "OBSERVED", source: "BOM revision 06", timestamp: "2026-09-03T14:32:00Z", value: 1180000, currency: "EUR" },
    { id: "e-003", type: "Supplier quote set", status: "RECONCILED", source: "4 supplier sources", timestamp: "2026-09-03T14:32:00Z", value: 640000, currency: "EUR" },
    { id: "e-004", type: "Freight quote", status: "OBSERVED", source: "MSC-04", timestamp: "2026-09-03T14:32:00Z", value: 85000, currency: "EUR" },
    { id: "e-005", type: "FX assumption", status: "ASSUMED", source: "Treasury assumption", timestamp: "2026-09-03T14:32:00Z" },
  ],
};

const API_BASE_URL = ((import.meta.env.VITE_DEGERIA_API_BASE_URL as string | undefined) || (import.meta.env.VITE_API_BASE_URL as string | undefined) || "https://degeria-api-production.up.railway.app").replace(/\/$/, "");

export async function submitEvaluation(request: EvaluationRequest): Promise<EvaluationResult> {
  if (!API_BASE_URL) return { ok: false, mode: "demo", reason: "No DEĞERIA API base URL configured" };
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/evaluation-requests`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ company: request.company, country: request.country || null, industry: request.industry || null, transaction_type: request.transactionType || "EXPORT", transaction_size: request.transactionSize || null, payment_term: request.paymentTerm || null, focus_areas: request.objectives }),
    });
    if (!response.ok) return { ok: false, mode: "demo", reason: `API responded with ${response.status}` };
    return { ok: true, mode: "api" };
  } catch {
    return { ok: false, mode: "demo", reason: "DEĞERIA API unavailable" };
  }
}

export function getCoreMode(): "demo" | "api-configured" {
  return API_BASE_URL ? "api-configured" : "demo";
}
