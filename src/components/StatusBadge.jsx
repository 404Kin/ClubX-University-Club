import { STATUS } from "../data/memberships";

const VARIANT = {
  [STATUS.PENDING]: "pending",
  [STATUS.VERIFIED]: "verified",
  [STATUS.APPROVED]: "approved",
  [STATUS.REJECTED]: "rejected",
  [STATUS.FAILED]: "failed",
};

function StatusBadge({ status }) {
  const variant = VARIANT[status] ?? "pending";
  return <span className={`status-badge status-badge--${variant}`}>{status}</span>;
}

export default StatusBadge;
