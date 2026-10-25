import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StatusBadge from "../components/StatusBadge";
import { STATUS, getApplications, updateApplicationStatus } from "../data/memberships";
import "../styles/admin.css";

// Minimal, frontend-only membership review screen.
// NOTE: not gated by any auth/role check — there is no auth system yet.
// Wire this behind a real admin login before shipping to production.
function AdminApplications() {
  const [apps, setApps] = useState(() => getApplications());

  const setStatus = (id, status) => {
    updateApplicationStatus(id, status);
    setApps(getApplications());
  };

  return (
    <div className="club-page">
      <Navbar />
      <main className="wrap admin-body">
        <h1>Membership Applications</h1>
        <p className="admin-note">
          Manually verify each Transaction ID with your bKash/Nagad/Rocket statement before approving.
        </p>
        {apps.length === 0 && <p className="admin-empty">No applications submitted yet.</p>}
        <ul className="admin-list">
          {apps.map((a) => (
            <li key={a.id} className="admin-card">
              <div className="admin-card__head">
                <strong>{a.fullName}</strong>
                <StatusBadge status={a.status} />
              </div>
              <dl className="cd-info">
                <div><dt>Club</dt><dd>{a.clubName}</dd></div>
                <div><dt>Student ID</dt><dd>{a.studentId}</dd></div>
                <div><dt>Email</dt><dd>{a.email}</dd></div>
                <div><dt>Phone</dt><dd>{a.phone}</dd></div>
                <div><dt>Department</dt><dd>{a.department}</dd></div>
                <div><dt>Semester</dt><dd>{a.semester}</dd></div>
                <div><dt>Batch</dt><dd>{a.batch}</dd></div>
                <div><dt>Payment method</dt><dd>{a.paymentMethod}</dd></div>
                <div><dt>Transaction ID</dt><dd>{a.txnId}</dd></div>
              </dl>
              <div className="admin-card__actions">
                <button type="button" className="btn btn--ghost btn--sm" onClick={() => setStatus(a.id, STATUS.VERIFIED)}>Mark Verified</button>
                <button type="button" className="btn btn--primary btn--sm" onClick={() => setStatus(a.id, STATUS.APPROVED)}>Approve</button>
                <button type="button" className="btn btn--ghost btn--sm" onClick={() => setStatus(a.id, STATUS.REJECTED)}>Reject</button>
                <button type="button" className="btn btn--ghost btn--sm" onClick={() => setStatus(a.id, STATUS.FAILED)}>Verification Failed</button>
              </div>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
}

export default AdminApplications;
