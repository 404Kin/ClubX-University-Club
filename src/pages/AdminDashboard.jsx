import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { apiUrl } from "../lib/api";
import { optimizeImageUpload } from "../lib/imageUpload";
import SupportInbox from "../components/SupportInbox";
import {
  FaUniversity, FaCalendarAlt, FaUserTie,
  FaSignOutAlt, FaPlus, FaCrown, FaTimes, FaTrash, FaEdit,
} from "react-icons/fa";

function AdminDashboard() {
  const [user] = useState(() => {
    const stored = localStorage.getItem("clubx_user");
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(true);
  
  const [clubs, setClubs] = useState([]);
  const [stats, setStats] = useState({ users: 0, events: 0, clubs: 0, executives: 0, members: 0 });

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingClub, setEditingClub] = useState(null);
  const [newClub, setNewClub] = useState({
    name: "", short: "", category: "", description: "", tagline: "",
    image: "", executive: "", members: 0, featured: false,
  });
  const [executiveForm, setExecutiveForm] = useState({
    clubId: "", name: "", email: "", password: "", position: "",
  });
  const [showExecutiveModal, setShowExecutiveModal] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== "admin") { navigate("/login"); return; }

    const loadData = async () => {
      try {
        const headers = { Authorization: `Bearer ${localStorage.getItem("clubx_token") || ""}` };
        const [clubsRes, statsRes] = await Promise.all([
          fetch(apiUrl("clubs/admin/list"), { headers }),
          fetch(apiUrl("admin/stats"), { headers }),
        ]);
        if (!clubsRes.ok || !statsRes.ok) throw new Error("Could not load live admin dashboard data.");
        const [clubsData, statsData] = await Promise.all([clubsRes.json(), statsRes.json()]);
        if (!Array.isArray(clubsData)) throw new Error("Club API returned invalid data.");
        setClubs(clubsData);
        setStats(statsData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.message || "Could not load admin dashboard data.");
        setLoading(false);
      }
    };
    loadData();
  }, [navigate, user]);

  const handleLogout = () => {
    localStorage.removeItem("clubx_user");
    navigate("/login");
  };

  const flashSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewClub((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
  };

  const handleClubImage = (event) => {
    const file = event.target.files?.[0];
    setUploadError("");
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setUploadError("Choose a JPEG, PNG, or WebP image.");
      event.target.value = "";
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setUploadError("Image must be 10 MB or smaller.");
      event.target.value = "";
      return;
    }
    optimizeImageUpload(file)
      .then((image) => setNewClub((current) => ({ ...current, image })))
      .catch((imageError) => setUploadError(imageError.message));
  };
  
  const handleSaveClub = async (e) => {
    e.preventDefault();
    setError("");
    if (!newClub.name.trim()) { setError("Club name is required."); return; }
    if (!newClub.short.trim()) { setError("Short name is required."); return; }
    if (!newClub.category.trim()) { setError("Category is required."); return; }

    try {
      const res = await fetch(apiUrl(editingClub ? `clubs/${editingClub._id}` : "clubs"), {
        method: editingClub ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("clubx_token") || ""}`,
        },
        body: JSON.stringify({ ...newClub, short: newClub.short.trim(), members: Number(newClub.members) || 0 })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create club.");
      
      setClubs((current) => editingClub
        ? current.map((club) => club._id === data._id ? { ...club, ...data } : club)
        : [data, ...current]);
      if (!editingClub) setStats((current) => ({ ...current, clubs: current.clubs + 1 }));
      setNewClub({
        name: "", short: "", category: "", description: "", tagline: "",
        image: "", executive: "", members: 0, featured: false,
      });
      setShowCreateModal(false);
      setEditingClub(null);
      flashSuccess(editingClub ? "Club updated successfully." : "Club created successfully in Database!");
    } catch (err) {
      setError(err.message || "Failed to create club.");
    }
  };

  const openEditClub = (club) => {
    setEditingClub(club);
    setNewClub({
      name: club.name || "",
      short: club.short || "",
      category: club.category || "",
      description: club.description || "",
      tagline: club.tagline || "",
      image: club.image || "",
      executive: club.executive || "",
      members: club.members || 0,
      featured: Boolean(club.featured),
    });
    setError("");
    setUploadError("");
    setShowCreateModal(true);
  };

  const closeClubModal = () => {
    setShowCreateModal(false);
    setEditingClub(null);
    setError("");
  };

  const handleAddExecutive = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const response = await fetch(apiUrl(`clubs/${executiveForm.clubId}/executive`), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("clubx_token") || ""}`,
        },
        body: JSON.stringify(executiveForm),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Could not assign executive.");
      setClubs((current) => current.map((club) => club._id === result.club._id
        ? {
          ...club,
          ...result.club,
          executiveAccounts: [
            ...(club.executiveAccounts || []),
            { ...result.executive, id: result.executive.id },
          ],
        }
        : club));
      setStats((current) => ({ ...current, executives: current.executives + 1 }));
      setExecutiveForm({ clubId: "", name: "", email: "", password: "", position: "" });
      setShowExecutiveModal(false);
      flashSuccess(`${result.executive.name} assigned to ${result.club.name}.`);
    } catch (err) {
      setError(err.message || "Could not assign executive.");
    }
  };

  const handleDeleteClub = async (id) => {
    if (!window.confirm("Delete this club permanently from Database?")) return;
    try {
      const res = await fetch(apiUrl(`clubs/${id}`), {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("clubx_token") || ""}` },
      });
      if (!res.ok) throw new Error("Failed to delete club.");
      setClubs(clubs.filter((c) => c._id !== id));
      setStats((current) => ({ ...current, clubs: Math.max(0, current.clubs - 1) }));
      flashSuccess("Club deleted!");
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveExecutive = async (club, executive) => {
    if (!window.confirm(`Remove ${executive.name} from ${club.name}? Their account will be converted to a student account.`)) return;
    try {
      const response = await fetch(apiUrl(`clubs/${club._id}/executives/${executive.id}`), {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("clubx_token") || ""}` },
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Could not remove executive.");
      setClubs((current) => current.map((item) => item._id === club._id
        ? { ...item, ...result.club, executiveAccounts: item.executiveAccounts.filter((entry) => entry.id !== executive.id) }
        : item));
      setStats((current) => ({ ...current, executives: Math.max(0, current.executives - 1) }));
      flashSuccess(`${executive.name} removed from ${club.name}.`);
    } catch (removeError) {
      setError(removeError.message || "Could not remove executive.");
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
              <li><FaUniversity /> <strong>{stats.clubs}</strong> total clubs</li>
              <li><FaCalendarAlt /> <strong>{stats.events}</strong> total events</li>
              <li><FaUserTie /> <strong>{stats.executives}</strong> executives</li>
            </ul>

            <div className="ldg-quick">
              <button type="button" onClick={() => setShowCreateModal(true)}>
                <span><FaPlus /> Create club</span>
              </button>
              <button type="button" onClick={() => { setError(""); setShowExecutiveModal(true); }}>
                <span><FaUserTie /> Add club executive</span>
              </button>
            </div>

            <button className="ldg-logout" onClick={handleLogout}>
              <FaSignOutAlt /> Log out
            </button>
          </aside>

          <div className="ldg-main">
            {error && <p role="alert">{error}</p>}
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
                      <strong><Link to={`/clubs/${c._id}`}>{c.name}</Link></strong>
                      <small>{c.members} members{c.category && ` · ${c.category}`}</small>
                    </div>
                    <span className="ldg-row-meta">{c.executiveAccounts?.length ? `${c.executiveAccounts.length} executives` : "Unassigned"}</span>
                    <div className="ldg-row-actions">
                      <button className="btn-icon" aria-label={`Edit ${c.name}`} onClick={() => openEditClub(c)}>
                        <FaEdit />
                      </button>
                      <button className="btn-icon" aria-label={`Add executive for ${c.name}`} onClick={() => {
                          setExecutiveForm((current) => ({ ...current, clubId: c._id }));
                          setError("");
                          setShowExecutiveModal(true);
                        }}>
                        <FaUserTie />
                      </button>
                      <button className="btn-icon danger" onClick={() => handleDeleteClub(c._id)}>
                        <FaTrash />
                      </button>
                    </div>
                    {c.executiveAccounts?.length > 0 && (
                      <div className="admin-executives">
                        {c.executiveAccounts.map((executive) => (
                          <span key={executive.id}>
                            {executive.position}: {executive.name}
                            <button type="button" className="btn-icon danger" aria-label={`Remove ${executive.name}`} onClick={() => handleRemoveExecutive(c, executive)}>
                              <FaTimes />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </section>
            <SupportInbox />
          </div>
        </div>
      </main>

      {showCreateModal && (
        <div className="modal-overlay" onClick={closeClubModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal__head">
              <div>
                <span className="modal__eyebrow">Admin</span>
                <h2>{editingClub ? "Edit club" : "Create a new club"}</h2>
              </div>
              <button className="modal__close" onClick={closeClubModal}><FaTimes /></button>
            </div>
            <form onSubmit={handleSaveClub} className="modal__body">
              <div className="modal__field">
                <label>Club name *</label>
                <input type="text" name="name" value={newClub.name} onChange={handleChange} placeholder="e.g., IIUC Robotics Club" autoFocus />
              </div>
              <div className="modal__row">
                <div className="modal__field">
                  <label>Short name *</label>
                  <input type="text" name="short" value={newClub.short} onChange={handleChange} placeholder="e.g., IEEE" maxLength={40} />
                </div>
                <div className="modal__field">
                  <label>Category *</label>
                  <input type="text" name="category" value={newClub.category} onChange={handleChange} placeholder="Technology" />
                </div>
              </div>
              <div className="modal__field">
                <label>Tagline</label>
                <input type="text" name="tagline" value={newClub.tagline} onChange={handleChange} placeholder="A short, verified description of the club" />
              </div>
              <div className="modal__field">
                <label>Description</label>
                <textarea name="description" value={newClub.description} onChange={handleChange} rows={3} />
              </div>
              <div className="modal__field">
                <label>Cover image URL (optional)</label>
                <input type="url" name="image" value={newClub.image.startsWith("data:image/") ? "" : newClub.image} onChange={handleChange} placeholder="Paste a club photo URL" />
              </div>
              <div className="modal__field">
                <label htmlFor="club-image-upload">Or upload a club photo (JPEG, PNG, WebP; max 10 MB)</label>
                <input id="club-image-upload" type="file" accept="image/jpeg,image/png,image/webp" onChange={handleClubImage} />
                {newClub.image.startsWith("data:image/") && <img src={newClub.image} alt="Club cover preview" style={{ width: "100%", maxHeight: 180, objectFit: "cover", borderRadius: 10 }} />}
              </div>
              <label className="modal__field">
                <span>Feature this club on the home page</span>
                <input type="checkbox" name="featured" checked={newClub.featured} onChange={handleChange} />
              </label>
              {(error || uploadError) && <p className="modal__error">{error || uploadError}</p>}
              <div className="modal__actions">
                <button type="button" className="btn-ghost" onClick={closeClubModal}>Cancel</button>
                <button type="submit" className="btn-primary">{editingClub ? <FaEdit /> : <FaPlus />} {editingClub ? "Save changes" : "Create club"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showExecutiveModal && (
        <div className="modal-overlay" onClick={() => setShowExecutiveModal(false)}>
          <div className="modal" onClick={(event) => event.stopPropagation()}>
            <div className="modal__head">
              <div><span className="modal__eyebrow">Admin</span><h2>Assign club executive</h2></div>
              <button className="modal__close" onClick={() => setShowExecutiveModal(false)}><FaTimes /></button>
            </div>
            <form onSubmit={handleAddExecutive} className="modal__body">
              <div className="modal__field">
                <label htmlFor="executive-club">Club *</label>
                <select id="executive-club" required value={executiveForm.clubId} onChange={(event) => setExecutiveForm({ ...executiveForm, clubId: event.target.value })}>
                  <option value="">Select a club</option>
                  {clubs.map((club) => <option key={club._id} value={club._id}>{club.name}</option>)}
                </select>
              </div>
              <div className="modal__field"><label htmlFor="executive-name">Executive name *</label><input id="executive-name" required value={executiveForm.name} onChange={(event) => setExecutiveForm({ ...executiveForm, name: event.target.value })} /></div>
              <div className="modal__field"><label htmlFor="executive-position">Position *</label><input id="executive-position" required value={executiveForm.position} onChange={(event) => setExecutiveForm({ ...executiveForm, position: event.target.value })} placeholder="President, Secretary..." /></div>
              <div className="modal__field"><label htmlFor="executive-email">Login email *</label><input id="executive-email" type="email" required value={executiveForm.email} onChange={(event) => setExecutiveForm({ ...executiveForm, email: event.target.value })} /></div>
              <div className="modal__field"><label htmlFor="executive-password">Temporary password (min. 6 characters) *</label><input id="executive-password" type="password" minLength={6} required value={executiveForm.password} onChange={(event) => setExecutiveForm({ ...executiveForm, password: event.target.value })} /></div>
              {error && <p className="modal__error">{error}</p>}
              <div className="modal__actions">
                <button type="button" className="btn-ghost" onClick={() => setShowExecutiveModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary"><FaUserTie /> Assign executive</button>
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