import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaSignOutAlt, FaArrowRight, FaBookOpen, FaCalendarAlt } from "react-icons/fa";

function StudentDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("clubx_user");
    if (!stored) { navigate("/login"); return; }
    const parsed = JSON.parse(stored);
    if (parsed.role !== "student") { navigate("/login"); return; }
    setUser(parsed);

    const loadData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/events");
        const data = await res.json();
        setEvents(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    loadData();
  }, [navigate]);

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