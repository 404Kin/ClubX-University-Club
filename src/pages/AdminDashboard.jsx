import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  FaUsers, FaUniversity, FaCalendarAlt, FaUserTie,
  FaSignOutAlt, FaPlus, FaBullhorn, FaCog, FaCrown,
  FaTimes, FaTrash, FaEdit, FaSave, FaExclamationTriangle,
} from "react-icons/fa";

function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [clubs, setClubs] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [stats, setStats] = useState({ users: 1280, events: 21, executives: 12 });

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingClub, setEditingClub] = useState(null);
  const [newClub, setNewClub] = useState({ name: "", short: "", category: "", description: "", executive: "", members: 0 });

  const [showAnnModal, setShowAnnModal] = useState(false);
  const [newAnn, setNewAnn] = useState({ title: "", body: "", priority: "normal", audience: "all" });

  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("clubx_user");
    if (!stored) { navigate("/login"); return; }
    const parsed = JSON.parse(stored);
    if (parsed.role !== "admin") { navigate("/login"); return; }
    setUser(parsed);

    const loadData = async () => {
      try {
        const clubsRes = await fetch("http://localhost:5000/api/clubs");
        const clubsData = await clubsRes.json();
        setClubs(clubsData);
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

  const flashSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleChange = (e) => setNewClub({ ...newClub, [e.target.name]: e.target.value });
  
  const handleCreateClub = async (e) => {
    e.preventDefault();
    setError("");
    if (!newClub.name.trim()) { setError("Club name is required."); return; }
    if (!newClub.short.trim()) { setError("Short name is required."); return; }
    if (!newClub.category.trim()) { setError("Category is required."); return; }

    try {
      const res = await fetch("http://localhost:5000/api/clubs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newClub, short: newClub.short.toUpperCase(), members: Number(newClub.members) || 0 })
      });
      const data = await res.json();
      
      setClubs([data, ...clubs]);
      setNewClub({ name: "", short: "", category: "", description: "", executive: "", members: 0 });
      setShowCreateModal(false);
      flashSuccess("Club created successfully in Database!");
    } catch (err) {
      setError("Failed to create club.");
    }
  };

  const handleDeleteClub = async (id) => {
    if (!window.confirm("Delete this club permanently from Database?")) return;
    try {
      await fetch(`http://localhost:5000/api/clubs/${id}`, { method: "DELETE" });
      setClubs(clubs.filter((c) => c._id !== id));
      flashSuccess("Club deleted!");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading || !user) {
    return (
      <>
        <Navbar />
        <div style={{ textAlign: "center", padding: "150px 20px", color: "var(--muted)" }}>
          <h2>Fetching Admin Dashboard Data...</h2>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="ldg-page admin">
        <div className="ldg-wrap">
          <aside className="ldg-rail">
            <div className="ldg-badge"><FaCrown /></div>
            <span className="ldg-eyebrow">Administrator</span>
            <h1>System control</h1>
            <p className="ldg-rail__sub">{user.name} · full system access</p>

            <div className="ldg-perf" aria-hidden="true" />

            <div className="ldg-hero">
              <span className="ldg-hero__num grad-text">{stats.users.toLocaleString()}</span>
              <span className="ldg-hero__label">Total users</span>
            </div>

            <ul className="ldg-stats">
              <li><FaUniversity /> <strong>{clubs.length}</strong> total clubs</li>
              <li><FaCalendarAlt /> <strong>{stats.events}</strong> total events</li>
              <li><FaUserTie /> <strong>{stats.executives}</strong> executives</li>
            </ul>

            <div className="ldg-quick">
              <button type="button" onClick={() => setShowCreateModal(true)}>
                <span><FaPlus /> Create club</span>
              </button>
              <button type="button" onClick={() => setShowAnnModal(true)}>
                <span><FaBullhorn /> System announcement</span>
              </button>
              <button type="button" onClick={() => setShowSettingsModal(true)}>
                <span><FaCog /> Settings</span>
              </button>
            </div>

            <button className="ldg-logout" onClick={handleLogout}>
              <FaSignOutAlt /> Log out
            </button>
          </aside>

          <div className="ldg-main">
            <section>
              <div className="ldg-section__head">
                <h2>All clubs (from Database)</h2>
                <button className="btn-mini create" onClick={() => setShowCreateModal(true)}>
                  <FaPlus /> New club
                </button>
              </div>
              <ul className="ldg-rows">
                {clubs.map((c) => (
                  <li key={c._id}>
                    <span className="ldg-mark">{(c.short || c.name.slice(0, 2)).toUpperCase()}</span>
                    <div className="ldg-row-body">
                      <strong>{c.name}</strong>
                      <small>{c.members} members{c.category && ` · ${c.category}`}</small>
                    </div>
                    <span className="ldg-row-meta">{c.executive || "Unassigned"}</span>
                    <div className="ldg-row-actions">
                      <button className="btn-icon danger" onClick={() => handleDeleteClub(c._id)}>
                        <FaTrash />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </main>

      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal__head">
              <div>
                <span className="modal__eyebrow">Admin</span>
                <h2>Create a new club</h2>
              </div>
              <button className="modal__close" onClick={() => setShowCreateModal(false)}><FaTimes /></button>
            </div>
            <form onSubmit={handleCreateClub} className="modal__body">
              <div className="modal__field">
                <label>Club name *</label>
                <input type="text" name="name" value={newClub.name} onChange={handleChange} placeholder="e.g., IIUC Robotics Club" autoFocus />
              </div>
              <div className="modal__row">
                <div className="modal__field">
                  <label>Short name *</label>
                  <input type="text" name="short" value={newClub.short} onChange={handleChange} placeholder="IRC" maxLength={3} />
                </div>
                <div className="modal__field">
                  <label>Category *</label>
                  <input type="text" name="category" value={newClub.category} onChange={handleChange} placeholder="Technology" />
                </div>
              </div>
              {error && <p className="modal__error">{error}</p>}
              <div className="modal__actions">
                <button type="button" className="btn-ghost" onClick={() => setShowCreateModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary"><FaPlus /> Create club</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {successMsg && <div className="admin-toast">✅ {successMsg}</div>}
      <Footer />
    </>
  );
}

export default AdminDashboard;