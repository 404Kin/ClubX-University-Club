import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StatusBadge from "../components/StatusBadge";
import { apiUrl } from "../lib/api";
import "../styles/admin.css";

function AdminApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch(apiUrl("memberships"), {
          headers: { Authorization: `Bearer ${localStorage.getItem("clubx_token") || ""}` },
        });
        const data = await res.json();
        setApplications(data);
      } catch (err) {
        console.error("Failed to fetch applications:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const res = await fetch(apiUrl(`memberships/${id}`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("clubx_token") || ""}`,
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (!res.ok) throw new Error("Failed to update application status.");
      
      setApplications(
        applications.map((app) => (app._id === id ? { ...app, status: newStatus } : app))
      );
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div style={{ textAlign: "center", padding: "150px 20px" }}>
          <h2>Loading Applications...</h2>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="admin-app-page" style={{ padding: "120px 20px", minHeight: "80vh" }}>
        <div className="wrap" style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div className="page-header" style={{ marginBottom: "40px" }}>
            <h1 className="page-title">Club Applications</h1>
            <p className="page-lead">Review and approve membership applications from students.</p>
          </div>

          {applications.length === 0 ? (
            <p>No applications found.</p>
          ) : (
            <ul style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              {applications.map((app) => (
                <li
                  key={app._id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "20px",
                    border: "1px solid var(--line)",
                    borderRadius: "10px",
                    background: "var(--surface)"
                  }}
                >
                  <div>
                    <h3 style={{ margin: "0 0 5px", fontSize: "1.2rem" }}>{app.studentName}</h3>
                    <p style={{ margin: 0, color: "var(--muted)", fontSize: "0.9rem" }}>
                      {app.studentId} · {app.email}
                    </p>
                    <p style={{ margin: "5px 0 0", color: "var(--blue)", fontWeight: "bold" }}>
                      Club: {app.clubName}
                    </p>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                    <StatusBadge status={app.status} />
                    
                    {app.status === "Pending" && (
                      <div style={{ display: "flex", gap: "10px" }}>
                        <button
                          onClick={() => handleStatusUpdate(app._id, "Approved")}
                          style={{ background: "#10b981", color: "white", border: "none", padding: "8px 16px", borderRadius: "5px", cursor: "pointer" }}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(app._id, "Rejected")}
                          style={{ background: "#ef4444", color: "white", border: "none", padding: "8px 16px", borderRadius: "5px", cursor: "pointer" }}
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div style={{ marginTop: "40px" }}>
            <Link to="/dashboard/admin" className="btn btn--ghost">← Back to Dashboard</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default AdminApplications;