import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StatusBadge from "../components/StatusBadge";
import { apiUrl } from "../lib/api";
import { FaSignOutAlt, FaArrowRight, FaCalendarAlt } from "react-icons/fa";

function StudentDashboard() {
  const [user] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("clubx_user") || "null");
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [memberships, setMemberships] = useState([]);
  const [dashboardError, setDashboardError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== "student") { navigate("/login"); return; }

    const loadData = async () => {
      try {
        const headers = { Authorization: `Bearer ${localStorage.getItem("clubx_token") || ""}` };
        const [eventsResponse, membershipsResponse] = await Promise.all([
          fetch(apiUrl("events")),
          fetch(apiUrl("memberships/mine"), { headers }),
        ]);
        if (!eventsResponse.ok || !membershipsResponse.ok) {
          throw new Error("Could not load your dashboard data.");
        }
        const [eventData, membershipData] = await Promise.all([
          eventsResponse.json(),
          membershipsResponse.json(),
        ]);
        if (!Array.isArray(eventData) || !Array.isArray(membershipData)) {
          throw new Error("Dashboard API returned invalid data.");
        }
        setEvents(eventData);
        setMemberships(membershipData);
        setDashboardError("");
      } catch (err) {
        console.error(err);
        setDashboardError(err.message || "Could not load your dashboard data.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [navigate, user]);

  const handleLogout = () => {
    localStorage.removeItem("clubx_user");
    navigate("/login");
  };

  if (loading || !user) {
    return (
      <>
        <Navbar />
        <div style={{ textAlign: "center", padding: "150px 20px", color: "var(--muted)" }}>
          <h2>Fetching Dashboard Data...</h2>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="ldg-page student">
        <div className="ldg-wrap">
          <aside className="ldg-rail">
            <div className="ldg-badge">{user.name.slice(0, 2).toUpperCase()}</div>
            <span className="ldg-eyebrow">Student</span>
            <h1>{user.name}</h1>
            <p className="ldg-rail__sub">{user.department || "CSE"}</p>

            <ul className="ldg-info">
              <li><span>Email</span><strong>{user.email}</strong></li>
            </ul>

            <div className="ldg-perf" aria-hidden="true" />

            <ul className="ldg-stats">
              <li><FaCalendarAlt /> <strong>{events.length}</strong> total events live</li>
              <li><FaCalendarAlt /> <strong>{memberships.filter((item) => item.status === "Approved").length}</strong> clubs joined</li>
            </ul>

            <div className="ldg-quick">
              <Link to="/events">
                <span><FaCalendarAlt /> Browse events</span>
                <FaArrowRight className="icon-arrow" />
              </Link>
            </div>

            <button className="ldg-logout" onClick={handleLogout}>
              <FaSignOutAlt /> Log out
            </button>
          </aside>

          <div className="ldg-main">
            {dashboardError && <p role="alert">{dashboardError}</p>}
            <section>
              <div className="ldg-section__head">
                <h2>My clubs</h2>
                <Link to="/" className="link-btn">Discover clubs <FaArrowRight className="icon-arrow" /></Link>
              </div>
              {memberships.length ? (
                <ul className="ldg-rows">
                  {memberships.map((membership) => (
                    <li key={membership._id}>
                      <span className="ldg-mark">{membership.clubName.slice(0, 2).toUpperCase()}</span>
                      <div className="ldg-row-body">
                        <strong><Link to={`/clubs/${membership.clubId}`}>{membership.clubName}</Link></strong>
                        <small>{membership.createdAt ? `Applied ${new Date(membership.createdAt).toLocaleDateString()}` : "Membership application"}</small>
                      </div>
                      <StatusBadge status={membership.status} />
                    </li>
                  ))}
                </ul>
              ) : <p className="ldg-empty">You have not applied to join a club yet.</p>}
            </section>
            <section>
              <div className="ldg-section__head">
                <h2>Upcoming events (from Database)</h2>
                <Link to="/events" className="link-btn">View all <FaArrowRight className="icon-arrow" /></Link>
              </div>
              <ul className="ldg-events">
                {events.map((ev) => (
                  <li key={ev._id} className="ldg-event">
                    <span className="ldg-event__date">{ev.date}</span>
                    <div className="ldg-event__body">
                      <strong>{ev.title}</strong>
                      {ev.venue && <small>{ev.venue}</small>}
                    </div>
                    <span className="status registered">Live</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default StudentDashboard;