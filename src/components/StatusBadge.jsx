function StatusBadge({ status }) {
  if (!status) return null;

  const normalized = status.toLowerCase();

  let badgeClass = "status-badge ";
  if (normalized.includes("pending")) badgeClass += "pending";
  else if (normalized.includes("approved")) badgeClass += "approved";
  else if (normalized.includes("rejected")) badgeClass += "rejected";
  else badgeClass += "default";

  return <span className={badgeClass}>{status}</span>;
}

export default StatusBadge;