import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { apiUrl } from "../lib/api";
import SupportInbox from "../components/SupportInbox";
import { optimizeImageUpload } from "../lib/imageUpload";
import {
  FaUsers, FaCalendarAlt, FaSignOutAlt, FaBullhorn,
  FaPlus, FaQrcode, FaCheck, FaTimes, FaTrash,
} from "react-icons/fa";

function ExecutiveDashboard() {
  const [user] = useState(() => {
    const stored = localStorage.getItem("clubx_user");
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(true);
  const [dashboardError, setDashboardError] = useState("");

  const [events, setEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [pending, setPending] = useState([]);
  const [scanEventId, setScanEventId] = useState("");
  const [ticketId, setTicketId] = useState("");
  const [scanMessage, setScanMessage] = useState("");
  const [scanError, setScanError] = useState("");

  const [showEventModal, setShowEventModal] = useState(false);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [processingEventImage, setProcessingEventImage] = useState(false);
  
  const [newEvent, setNewEvent] = useState({
    title: "", date: "", time: "", venue: "",
    category: "Workshop", description: "", total: 50, isPaid: false, price: 0,
    src: "", 
  });

  const [error, setError] = useState("");
  const [announcementForm, setAnnouncementForm] = useState({ title: "", body: "", priority: "normal" });
  const [announcementError, setAnnouncementError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== "executive") { navigate("/login"); return; }
    const parsed = user;

    const loadData = async () => {
      try {
        if (!parsed.clubId && !parsed.club) {
          throw new Error("This executive account is not assigned to a club. Ask an administrator to link it to a club.");
        }
        const params = new URLSearchParams();
        if (parsed.clubId) params.set("clubId", parsed.clubId);
        else params.set("club", parsed.club);
        const headers = { Authorization: `Bearer ${localStorage.getItem("clubx_token") || ""}` };
        const announcementQuery = new URLSearchParams(
          parsed.clubId ? { clubId: parsed.clubId } : { clubName: parsed.club }
        );
        const [memRes, evRes, announcementRes] = await Promise.all([
          fetch(apiUrl(`memberships?${params.toString()}`), { headers }),
          fetch(apiUrl(`events?clubId=${encodeURIComponent(parsed.clubId || "")}&createdBy=${encodeURIComponent(parsed.id || parsed.email)}`)),
          fetch(apiUrl(`announcements?${announcementQuery}`)),
        ]);
        if (!memRes.ok) throw new Error("Could not load membership applications.");
        const memData = await memRes.json();
        if (!Array.isArray(memData)) throw new Error("Membership API returned an invalid response.");
        setPending(memData.filter((m) => m.status === "Pending"));

        if (!evRes.ok) throw new Error("Could not load events.");
        const evData = await evRes.json();
        if (!Array.isArray(evData)) throw new Error("Events API returned an invalid response.");
        const ownEvents = evData.filter((event) =>
          (parsed.clubId && event.clubId === parsed.clubId) ||
          event.createdBy === parsed.email ||
          event.createdBy === parsed.id
        );
        setEvents(ownEvents);
        setScanEventId(ownEvents[0]?._id || "");

        if (!announcementRes.ok) throw new Error("Could not load club announcements.");
        const announcementData = await announcementRes.json();
        if (!Array.isArray(announcementData)) throw new Error("Announcement API returned an invalid response.");
        setAnnouncements(announcementData);
        setLoading(false);
      } catch (err) {
        setDashboardError(err.message || "Could not load dashboard data.");
        setLoading(false);
      }
    };
    loadData();
  }, [navigate, user]);

  const handleLogout = () => {
    localStorage.removeItem("clubx_user");
    navigate("/login");
  };

  const handleApproveReject = async (id, newStatus) => {
    try {
      const res = await fetch(apiUrl(`memberships/${id}`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("clubx_token") || ""}`,
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (!res.ok) throw new Error("Could not update membership status.");
      setPending(pending.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEventChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((current) => ({
      ...current,
      [name]: name === "isPaid" ? value === "paid" : value,
    }));
  };

  const handleEventImage = async (event) => {
    const file = event.target.files?.[0];
    setError("");
    if (!file) return;
    setProcessingEventImage(true);
    try {
      const src = await optimizeImageUpload(file);
      setNewEvent((current) => ({ ...current, src }));
    } catch (imageError) {
      setError(imageError.message || "Could not process this event image.");
      event.target.value = "";
    } finally {
      setProcessingEventImage(false);
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    setError("");

    if (!newEvent.title.trim()) { setError("Event title is required."); return; }
    if (!newEvent.date.trim()) { setError("Event date is required."); return; }
    if (!newEvent.time.trim()) { setError("Event time is required."); return; }
    if (!newEvent.venue.trim()) { setError("Venue is required."); return; }

    try {
      const res = await fetch(apiUrl("events"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("clubx_token") || ""}`,
        },
        body: JSON.stringify({ 
          ...newEvent, 
          total: Number(newEvent.total),
          isPaid: newEvent.isPaid,
          price: newEvent.isPaid ? Number(newEvent.price) : 0,
          registered: 0 
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.error || "Could not create event.");

      setEvents([data, ...events]);
      setScanEventId(data._id);
      setNewEvent({ 
        title: "", date: "", time: "", venue: "", 
        category: "Workshop", description: "", total: 50, isPaid: false, price: 0, src: ""
      });
      setShowEventModal(false);
    } catch (createError) {
      setError(createError.message || "Failed to create event. Server error.");
    }
  };

  const handleCreateAnnouncement = async (event) => {
    event.preventDefault();
    setAnnouncementError("");
    try {
      const response = await fetch(apiUrl("announcements"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("clubx_token") || ""}`,
        },
        body: JSON.stringify(announcementForm),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Could not publish announcement.");
      setAnnouncements((current) => [result, ...current]);
      setAnnouncementForm({ title: "", body: "", priority: "normal" });
      setShowAnnouncementModal(false);
    } catch (createError) {
      setAnnouncementError(createError.message || "Could not publish announcement.");
    }
  };

  const handleDeleteEvent = async (id) => {
    if (!window.confirm("Delete this event from Database?")) return;
    try {
      const res = await fetch(apiUrl(`events/${id}`), { method: "DELETE" });
      if (!res.ok) throw new Error("Could not delete event.");
      setEvents(events.filter((e) => e._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleAttendanceScan = async (e) => {
    e.preventDefault();
    setScanMessage("");
    setScanError("");
    try {
      const res = await fetch(apiUrl("attendance/scan"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId: scanEventId, ticketId: ticketId.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.error || "Ticket could not be verified.");
      setScanMessage(`Attendance recorded for ${data.studentName}.`);
      setTicketId("");
    } catch (err) {
      setScanError(err.message || "Could not verify ticket.");
    }
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
      <main className="ldg-page executive">
        <div className="ldg-wrap">
          <aside className="ldg-rail">
            <div className="ldg-badge">{user.name.slice(0, 2).toUpperCase()}</div>
            <span className="ldg-eyebrow">Executive</span>
            <h1>{user.club || "Club"}</h1>
            <p className="ldg-rail__sub">{user.name} · {user.position || "Executive"}</p>

            <div className="ldg-perf" aria-hidden="true" />

            <ul className="ldg-stats">
              <li><FaCalendarAlt /> <strong>{events.length}</strong> active events</li>
              <li><FaUsers /> <strong>{pending.length}</strong> pending requests</li>
            </ul>

            <div className="ldg-quick">
              <button type="button" onClick={() => setShowEventModal(true)}>
                <span><FaPlus /> Create event</span>
              </button>
              <button type="button" onClick={() => { setAnnouncementError(""); setShowAnnouncementModal(true); }}>
                <span><FaBullhorn /> Post announcement</span>
              </button>
            </div>

            <button className="ldg-logout" onClick={handleLogout}>
              <FaSignOutAlt /> Log out
            </button>
          </aside>

          <div className="ldg-main">
            {dashboardError && <p role="alert">{dashboardError}</p>}
            <SupportInbox />
            <section>
              <div className="ldg-section__head">
                <h2>Club announcements</h2>
                <button className="btn-mini create" onClick={() => { setAnnouncementError(""); setShowAnnouncementModal(true); }}>
                  <FaBullhorn /> New announcement
                </button>
              </div>
              {announcements.length ? (
                <ul className="ldg-rows">
                  {announcements.map((announcement) => (
                    <li key={announcement._id}>
                      <span className="ldg-mark"><FaBullhorn /></span>
                      <div className="ldg-row-body">
                        <strong>{announcement.title}</strong>
                        <small>{new Date(announcement.createdAt).toLocaleDateString()} · {announcement.priority === "high" ? "Urgent" : "Normal"}</small>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : <p className="ldg-empty">No announcements yet. Post an update for your club members.</p>}
            </section>

            <section>
              <div className="ldg-section__head">
                <h2>Verify event ticket</h2>
                <FaQrcode />
              </div>
              <form onSubmit={handleAttendanceScan} className="modal__row">
                <div className="modal__field">
                  <label htmlFor="attendance-event">Event</label>
                  <select
                    id="attendance-event"
                    value={scanEventId}
                    onChange={(e) => setScanEventId(e.target.value)}
                    required
                  >
                    {events.map((event) => (
                      <option key={event._id} value={event._id}>{event.title}</option>
                    ))}
                  </select>
                </div>
                <div className="modal__field">
                  <label htmlFor="attendance-ticket">QR ticket ID</label>
                  <input
                    id="attendance-ticket"
                    value={ticketId}
                    onChange={(e) => setTicketId(e.target.value)}
                    placeholder="Scan QR or enter ticket ID"
                    required
                  />
                </div>
                <button className="btn-primary" type="submit" disabled={!events.length}>
                  <FaQrcode /> Verify attendance
                </button>
              </form>
              {scanMessage && <p role="status">{scanMessage}</p>}
              {scanError && <p role="alert">{scanError}</p>}
            </section>

            <section>
              <div className="ldg-section__head">
                <h2>Pending applications</h2>
                {pending.length > 0 && (
                  <span className="ldg-badge-count">{pending.length}</span>
                )}
              </div>

              {pending.length === 0 ? (
                <p className="ldg-empty">
                  <FaCheck /> All caught up! No pending applications.
                </p>
              ) : (
                <ul className="ldg-rows">
                  {pending.map((p) => (
                    <li key={p._id}>
                      <span className="ldg-mark">
                        {p.studentName.slice(0, 2).toUpperCase()}
                      </span>
                      <div className="ldg-row-body">
                        <strong>{p.studentName}</strong>
                        <small>{p.studentId} · {p.email}</small>
                      </div>
                      <div className="ldg-pending-actions">
                        <button className="btn-approve" onClick={() => handleApproveReject(p._id, "Approved")}>
                          <FaCheck /> Approve
                        </button>
                        <button className="btn-reject" onClick={() => handleApproveReject(p._id, "Rejected")}>
                          <FaTimes />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section>
              <div className="ldg-section__head">
                <h2>My events (from Database)</h2>
                <button className="btn-mini create" onClick={() => setShowEventModal(true)}>
                  <FaPlus /> New event
                </button>
              </div>
              <ul className="ldg-events">
                {events.map((ev) => (
                  <li key={ev._id} className="ldg-event">
                    <span className="ldg-event__date">{ev.date}</span>
                    <div className="ldg-event__body">
                      <strong>{ev.title}</strong>
                      {ev.venue && <small>{ev.venue}</small>}
                    </div>
                    <div className="ldg-meter">
                      <div className="ldg-meter__top">
                        <span>Filled</span>
                        <span>{ev.registered}/{ev.total}</span>
                      </div>
                      <div className="ldg-meter__track">
                        <i style={{ width: `${(ev.registered / ev.total) * 100}%` }} />
                      </div>
                    </div>
                    <div className="ldg-event__actions">
                      <button className="btn-icon danger" onClick={() => handleDeleteEvent(ev._id)}>
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

      {showEventModal && (
        <div className="modal-overlay" onClick={() => setShowEventModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal__head">
              <div>
                <span className="modal__eyebrow">Executive</span>
                <h2>Create new event</h2>
              </div>
              <button className="modal__close" onClick={() => setShowEventModal(false)}>
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleCreateEvent} className="modal__body">
              <div className="modal__field">
                <label htmlFor="title">Event title *</label>
                <input
                  id="title" type="text" name="title"
                  value={newEvent.title} onChange={handleEventChange}
                  placeholder="e.g., IEEE Tech Workshop 2025" autoFocus
                />
              </div>

              <div className="modal__row">
                <div className="modal__field">
                  <label htmlFor="date">Date *</label>
                  <input
                    id="date" type="text" name="date"
                    value={newEvent.date} onChange={handleEventChange}
                    placeholder="e.g., 15 Oct 2025"
                  />
                </div>
                <div className="modal__field">
                  <label htmlFor="time">Time *</label>
                  <input
                    id="time" type="text" name="time"
                    value={newEvent.time} onChange={handleEventChange}
                    placeholder="e.g., 10:00 AM – 1:00 PM"
                  />
                </div>
              </div>

              <div className="modal__field">
                <label htmlFor="venue">Venue *</label>
                <input
                  id="venue" type="text" name="venue"
                  value={newEvent.venue} onChange={handleEventChange}
                  placeholder="e.g., CSE Seminar Hall"
                />
              </div>

              <div className="modal__field">
                <label htmlFor="src">Event image URL (optional)</label>
                <input
                  id="src" type="url" name="src"
                  value={newEvent.src.startsWith("data:image/") ? "" : newEvent.src}
                  onChange={handleEventChange}
                  placeholder="https://example.com/event-poster.jpg"
                />
              </div>
              <div className="modal__field">
                <label htmlFor="event-image-upload">Or upload an image (JPEG, PNG, WebP; up to 10 MB)</label>
                <input id="event-image-upload" type="file" accept="image/jpeg,image/png,image/webp" onChange={handleEventImage} />
                {newEvent.src.startsWith("data:image/") && (
                  <img src={newEvent.src} alt="Event poster preview" style={{ width: "100%", maxHeight: 200, objectFit: "contain", borderRadius: 10 }} />
                )}
              </div>

              <div className="modal__row">
                <div className="modal__field">
                  <label htmlFor="category">Category</label>
                  <select
                    id="category" name="category"
                    value={newEvent.category} onChange={handleEventChange}
                  >
                    <option>Workshop</option>
                    <option>Contest</option>
                    <option>Seminar</option>
                    <option>Bootcamp</option>
                    <option>Cultural</option>
                    <option>Sports</option>
                  </select>
                </div>
                <div className="modal__field">
                  <label htmlFor="total">Total seats</label>
                  <input
                    id="total" type="number" name="total"
                    value={newEvent.total} onChange={handleEventChange} min="1"
                  />
                </div>
              </div>

              <div className="modal__row">
                <div className="modal__field">
                  <label htmlFor="isPaid">Registration fee</label>
                  <select id="isPaid" name="isPaid" value={newEvent.isPaid ? "paid" : "free"} onChange={handleEventChange}>
                    <option value="free">Free</option>
                    <option value="paid">Paid</option>
                  </select>
                </div>
                {newEvent.isPaid && (
                  <div className="modal__field">
                    <label htmlFor="price">Fee amount (৳) *</label>
                    <input
                      id="price" type="number" name="price" min="0.01" step="0.01"
                      required value={newEvent.price} onChange={handleEventChange}
                      placeholder="e.g. 200"
                    />
                  </div>
                )}
              </div>

              <div className="modal__field">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description" name="description"
                  value={newEvent.description} onChange={handleEventChange}
                  placeholder="Short description" rows={3}
                />
              </div>

              {error && <p className="modal__error">{error}</p>}

              <div className="modal__actions">
                <button
                  type="button" className="btn-ghost"
                  onClick={() => { setShowEventModal(false); setError(""); }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={processingEventImage}>
                  <FaPlus /> {processingEventImage ? "Processing image..." : "Create event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showAnnouncementModal && (
        <div className="modal-overlay" onClick={() => setShowAnnouncementModal(false)}>
          <div className="modal" onClick={(event) => event.stopPropagation()}>
            <div className="modal__head">
              <div><span className="modal__eyebrow">{user.club}</span><h2>Post announcement</h2></div>
              <button className="modal__close" onClick={() => setShowAnnouncementModal(false)}><FaTimes /></button>
            </div>
            <form onSubmit={handleCreateAnnouncement} className="modal__body">
              <div className="modal__field">
                <label htmlFor="announcement-title">Title *</label>
                <input id="announcement-title" required value={announcementForm.title} onChange={(event) => setAnnouncementForm({ ...announcementForm, title: event.target.value })} />
              </div>
              <div className="modal__field">
                <label htmlFor="announcement-body">Message *</label>
                <textarea id="announcement-body" required rows={5} value={announcementForm.body} onChange={(event) => setAnnouncementForm({ ...announcementForm, body: event.target.value })} />
              </div>
              <div className="modal__field">
                <label htmlFor="announcement-priority">Priority</label>
                <select id="announcement-priority" value={announcementForm.priority} onChange={(event) => setAnnouncementForm({ ...announcementForm, priority: event.target.value })}>
                  <option value="normal">Normal</option>
                  <option value="high">Urgent</option>
                </select>
              </div>
              {announcementError && <p className="modal__error">{announcementError}</p>}
              <div className="modal__actions">
                <button type="button" className="btn-ghost" onClick={() => setShowAnnouncementModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary"><FaBullhorn /> Publish announcement</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default ExecutiveDashboard;