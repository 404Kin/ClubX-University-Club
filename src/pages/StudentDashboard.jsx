import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { mockStudent } from "../data/demoUsers";
import {
  FaSignOutAlt, FaArrowRight, FaCheckCircle, FaClock,
  FaBookOpen, FaCalendarAlt, FaBullhorn,
} from "react-icons/fa";

function StudentDashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("clubx_user");
    if (!stored) { navigate("/login"); return; }
    const parsed = JSON.parse(stored);
    if (parsed.role !== "student") { navigate("/login"); return; }
    setUser(parsed);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("clubx_user");
    navigate("/login");
  };

  if (!user) return null;

  // Merge login data with mock content
  const s = {
    ...mockStudent,
    name: user.name || mockStudent.name,
    email: user.email || mockStudent.email,
    studentId: user.studentId || mockStudent.studentId,
    department: user.department || mockStudent.department,
  };

  const initials = s.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  const attendanceRate = s.attendance.length
    ? Math.round(
        (s.attendance.filter((a) => a.status === "Present").length /
          s.attendance.length) *
          100
      )
    : 0;

  const [lead, ...restAnnouncements] = s.announcements;

  return (
    <>
      <Navbar />
      <main className="ldg-page student">
        <div className="ldg-wrap">

          {/* ============ IDENTITY RAIL ============ */}
          <aside className="ldg-rail">
            <div className="ldg-badge">{initials}</div>
            <span className="ldg-eyebrow">Student</span>
            <h1>{s.name}</h1>
            <p className="ldg-rail__sub">{s.department}</p>

            <ul className="ldg-info">
              <li><span>Student ID</span><strong>{s.studentId}</strong></li>
              <li><span>Email</span><strong>{s.email}</strong></li>
            </ul>

            <div className="ldg-perf" aria-hidden="true" />

            <div className="ldg-hero">
              <span className="ldg-hero__num grad-text">{attendanceRate}%</span>
              <span className="ldg-hero__label">Attendance rate</span>
            </div>

            <ul className="ldg-stats">
              <li><FaBookOpen /> <strong>{s.memberships.length}</strong> memberships</li>
              <li><FaCalendarAlt /> <strong>{s.events.length}</strong> events registered</li>
              <li><FaBullhorn /> <strong>{s.announcements.length}</strong> announcements</li>
            </ul>

            <div className="ldg-quick">
              <Link to="/">
                <span><FaBookOpen /> Browse clubs</span>
                <FaArrowRight className="icon-arrow" />
              </Link>
              <Link to="/events">
                <span><FaCalendarAlt /> Browse events</span>
                <FaArrowRight className="icon-arrow" />
              </Link>
            </div>

            <button className="ldg-logout" onClick={handleLogout}>
              <FaSignOutAlt /> Log out
            </button>
          </aside>

          {/* ============ LEDGER ============ */}
          <div className="ldg-main">

            {lead && (
              <section className="ann ann--lead">
                <div className="ann__top">
                  <span className="ann__club">{lead.club}</span>
                  <span className="ann__badge">New</span>
                </div>
                <h3>{lead.title}</h3>
              </section>
            )}

            {restAnnouncements.length > 0 && (
              <section>
                <div className="ldg-section__head">
                  <h2>More announcements</h2>
                </div>
                <div className="ann-list">
                  {restAnnouncements.map((a, i) => (
                    <div className="ann" key={i}>
                      <div className="ann__top">
                        <span className="ann__club">{a.club}</span>
                      </div>
                      <h3>{a.title}</h3>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section>
              <div className="ldg-section__head">
                <h2>My memberships</h2>
                <Link to="/" className="link-btn">
                  Browse clubs <FaArrowRight className="icon-arrow" />
                </Link>
              </div>
              <ul className="ldg-rows">
                {s.memberships.map((m, i) => (
                  <li key={i}>
                    <span className="ldg-mark">{m.club.slice(0, 2).toUpperCase()}</span>
                    <div className="ldg-row-body">
                      <strong>{m.club}</strong>
                    </div>
                    <span className={`status ${m.status.toLowerCase()}`}>{m.status}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <div className="ldg-section__head">
                <h2>Upcoming events</h2>
                <Link to="/events" className="link-btn">
                  View all <FaArrowRight className="icon-arrow" />
                </Link>
              </div>
              <ul className="ldg-events">
                {s.events.map((e, i) => (
                  <li key={i} className="ldg-event">
                    <span className="ldg-event__date">{e.date}</span>
                    <div className="ldg-event__body">
                      <strong>{e.title}</strong>
                    </div>
                    <span className="status registered">{e.status}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <div className="ldg-section__head">
                <h2>Attendance history</h2>
              </div>
              <ul className="ldg-attendance">
                {s.attendance.map((a, i) => (
                  <li key={i}>
                    {a.status === "Present" ? (
                      <FaCheckCircle className="ok" />
                    ) : (
                      <FaClock className="miss" />
                    )}
                    <strong>{a.event}</strong>
                    <span
                      className={`status ${
                        a.status === "Present" ? "approved" : "rejected"
                      }`}
                    >
                      {a.status}
                    </span>
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