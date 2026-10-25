// Membership application store.
// NOTE: this is a localStorage stand-in for a real backend/database. Swap
// these functions for real API calls once one exists — the shape of an
// application record is designed to map directly onto that future API.
const STORAGE_KEY = "clubx_membership_applications";

export const STATUS = {
  PENDING: "Pending Verification",
  VERIFIED: "Payment Verified",
  APPROVED: "Approved",
  REJECTED: "Rejected",
  FAILED: "Verification Failed",
};

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeAll(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // storage unavailable (e.g. private browsing) — application is lost on refresh
  }
}

export function getApplications(clubSlug) {
  const all = readAll();
  return clubSlug ? all.filter((a) => a.clubSlug === clubSlug) : all;
}

export function getApplication(id) {
  return readAll().find((a) => a.id === id) ?? null;
}

export function addApplication(app) {
  const record = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    submittedAt: new Date().toISOString(),
    status: STATUS.PENDING,
    ...app,
  };
  writeAll([record, ...readAll()]);
  return record;
}

export function updateApplicationStatus(id, status) {
  const next = readAll().map((a) => (a.id === id ? { ...a, status } : a));
  writeAll(next);
  return next.find((a) => a.id === id) ?? null;
}
