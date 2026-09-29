
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { mockExecutive, mockRegisteredStudents } from "../data/demoUsers";
import {
  FaUsers,
  FaCalendarAlt,
  FaBullhorn,
  FaClock,
  FaSignOutAlt,
  FaPlus,
  FaQrcode,
  FaCheck,
  FaTimes,
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

function ExecutiveDashboard() {
  const [user, setUser] = useState(null);
  const [pending, setPending] = useState(mockExecutive.pendingMembers);
  const [events, setEvents] = useState(mockExecutive.events);
  const [announcements, setAnnouncements] = useState(mockExecutive.announcements);

  const [showScanModal, setShowScanModal] = useState(false);
  const [scanEventId, setScanEventId] = useState("");
  const [scanStudentId, setScanStudentId] = useState("");
  const [scanFeedback, setScanFeedback] = useState(null);
  const [attendance, setAttendance] = useState({}); 

  const [showEventModal, setShowEventModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: "", date: "", time: "", venue: "",
    category: "Workshop", description: "", total: 50, registered: 0,
  });

  const [showAnnModal, setShowAnnModal] = useState(false);
  const [editingAnn, setEditingAnn] = useState(null);
  const [newAnn, setNewAnn] = useState({
    title: "",
    body: "",
    priority: "normal",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();


useEffect(() => {
  const stored = localStorage.getItem("clubx_user");
  if (!stored) { navigate("/login"); return; }
  const parsed = JSON.parse(stored);
  if (parsed.role !== "executive") { navigate("/login"); return; }
  setUser(parsed);

  // Load custom events
  const customEvents = JSON.parse(
    localStorage.getItem(`clubx_events_${parsed.email}`) || "[]"
  );
  if (customEvents.length > 0) {
    setEvents([...customEvents, ...mockExecutive.events]);
  }

  // Load custom announcements
  const customAnns = JSON.parse(
    localStorage.getItem(`clubx_announcements_${parsed.email}`) || "[]"
  );
  if (customAnns.length > 0) {
    setAnnouncements([...customAnns, ...mockExecutive.announcements]);
  }

  //Load attendance
  const storedAtt = JSON.parse(
    localStorage.getItem(`clubx_attendance_${parsed.email}`) || "{}"
  );
  setAttendance(storedAtt);
}, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("clubx_user");
    navigate("/login");
  };

  const handleAction = (id) => {
    setPending(pending.filter((p) => p.id !== id));
  };

  
  // EVENT HANDLERS
 
  const handleEventChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleCreateEvent = (e) => {
    e.preventDefault();
    setError("");

    if (!newEvent.title.trim()) { setError("Event title is required."); return; }
    if (!newEvent.date.trim()) { setError("Event date is required."); return; }
    if (!newEvent.time.trim()) { setError("Event time is required."); return; }
    if (!newEvent.venue.trim()) { setError("Venue is required."); return; }

    const eventToAdd = {
      id: `ev-${Date.now()}`,
      title: newEvent.title.trim(),
      date: newEvent.date.trim(),
      time: newEvent.time.trim(),
      venue: newEvent.venue.trim(),
      category: newEvent.category,
      description: newEvent.description.trim(),
      registered: Number(newEvent.registered) || 0,
      total: Number(newEvent.total) || 50,
      createdAt: new Date().toISOString(),
    };

    const custom = JSON.parse(localStorage.getItem(`clubx_events_${user.email}`) || "[]");
    localStorage.setItem(
      `clubx_events_${user.email}`,
      JSON.stringify([eventToAdd, ...custom])
    );

    setEvents([eventToAdd, ...events]);
    setNewEvent({
      title: "", date: "", time: "", venue: "",
      category: "Workshop", description: "", total: 50, registered: 0,
    });
    setShowEventModal(false);
  };

  const handleUpdateEvent = (e) => {
    e.preventDefault();
    setError("");
    if (!editingEvent.title.trim()) { setError("Title required."); return; }

    const updated = { ...editingEvent };
    setEvents(events.map((ev) => (ev.id && ev.id === updated.id) ? updated : ev));

    if (updated.id && updated.id.startsWith("ev-")) {
      const custom = JSON.parse(localStorage.getItem(`clubx_events_${user.email}`) || "[]");
      const updatedCustom = custom.map((ev) =>
        ev.id === updated.id ? updated : ev
      );
      localStorage.setItem(
        `clubx_events_${user.email}`,
        JSON.stringify(updatedCustom)
      );
    }
    setEditingEvent(null);
  };

  const handleDeleteEvent = (ev) => {
    const isDefault = !ev.id || !ev.id.startsWith("ev-");
    const message = isDefault
      ? `"${ev.title}" is a sample event. Remove from this session?`
      : `Delete "${ev.title}" permanently?`;
    if (!window.confirm(message)) return;

    if (!isDefault) {
      const custom = JSON.parse(localStorage.getItem(`clubx_events_${user.email}`) || "[]");
      const updated = custom.filter((e) => e.id !== ev.id);
      localStorage.setItem(
        `clubx_events_${user.email}`,
        JSON.stringify(updated)
      );
    }
    setEvents(events.filter((e) =>
      isDefault ? e.title !== ev.title : e.id !== ev.id
    ));
  };

  // ANNOUNCEMENT HANDLERS
 
  const handleAnnChange = (e) => {
    setNewAnn({ ...newAnn, [e.target.name]: e.target.value });
  };

  const handleCreateAnn = (e) => {
    e.preventDefault();
    setError("");

    if (!newAnn.title.trim()) { setError("Announcement title is required."); return; }
    if (!newAnn.body.trim()) { setError("Announcement body is required."); return; }

    const annToAdd = {
      id: `ann-${Date.now()}`,
      title: newAnn.title.trim(),
      body: newAnn.body.trim(),
      priority: newAnn.priority,
      club: user.club || "Club",
      date: "Just now",
      createdAt: new Date().toISOString(),
    };

    const custom = JSON.parse(
      localStorage.getItem(`clubx_announcements_${user.email}`) || "[]"
    );
    localStorage.setItem(
      `clubx_announcements_${user.email}`,
      JSON.stringify([annToAdd, ...custom])
    );

    setAnnouncements([annToAdd, ...announcements]);
    setNewAnn({ title: "", body: "", priority: "normal" });
    setShowAnnModal(false);
  };

  const handleUpdateAnn = (e) => {
    e.preventDefault();
    setError("");
    if (!editingAnn.title.trim()) { setError("Title required."); return; }

    const updated = { ...editingAnn };
    setAnnouncements(announcements.map((an) =>
      (an.id && an.id === updated.id) ? updated : an
    ));

    if (updated.id && updated.id.startsWith("ann-")) {
      const custom = JSON.parse(
        localStorage.getItem(`clubx_announcements_${user.email}`) || "[]"
      );
      const updatedCustom = custom.map((an) =>
        an.id === updated.id ? updated : an
      );
      localStorage.setItem(
        `clubx_announcements_${user.email}`,
        JSON.stringify(updatedCustom)
      );
    }
    setEditingAnn(null);
  };

  const handleDeleteAnn = (ann) => {
    const isDefault = !ann.id || !ann.id.startsWith("ann-");
    const message = isDefault
      ? `Remove sample announcement "${ann.title}" from this session?`
      : `Delete announcement "${ann.title}" permanently?`;
    if (!window.confirm(message)) return;

    if (!isDefault) {
      const custom = JSON.parse(
        localStorage.getItem(`clubx_announcements_${user.email}`) || "[]"
      );
      const updated = custom.filter((a) => a.id !== ann.id);
      localStorage.setItem(
        `clubx_announcements_${user.email}`,
        JSON.stringify(updated)
      );
    }
    setAnnouncements(announcements.filter((a) =>
      isDefault ? a.title !== ann.title : a.id !== ann.id
    ));
  };

  if (!user) return null;

  const e = {
    ...mockExecutive,
    name: user.name || mockExecutive.name,
    club: user.club || mockExecutive.club,
    position: user.position || mockExecutive.position,
  };

  const initials = e.club
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  const [lead, ...restAnnouncements] = announcements;

 
// SCAN ATTENDANCE HANDLER

const handleScan = () => {
  setScanFeedback(null);

  if (!scanEventId) {
    setScanFeedback({ type: "error", message: "Please select an event." });
    return;
  }
  if (!scanStudentId) {
    setScanFeedback({ type: "error", message: "Please select a student." });
    return;
  }

  const student = mockRegisteredStudents.find((s) => s.id === scanStudentId);
  if (!student) {
    setScanFeedback({ type: "error", message: "Student not found." });
    return;
  }

  const eventScans = attendance[scanEventId] || [];

  // Duplicate check
  if (eventScans.find((s) => s.studentId === student.id)) {
    setScanFeedback({
      type: "warning",
      message: `${student.name} is already marked present for this event.`,
    });
    return;
  }

  // Add scan
  const newScan = {
    ticketId: student.ticketId,
    studentId: student.id,
    studentName: student.name,
    dept: student.dept,
    timestamp: new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  const updated = {
    ...attendance,
    [scanEventId]: [...eventScans, newScan],
  };

  setAttendance(updated);
  localStorage.setItem(
    `clubx_attendance_${user.email}`,
    JSON.stringify(updated)
  );

  setScanFeedback({
    type: "success",
    message: `${student.name} (${student.id}) marked present.`,
    scan: newScan,
  });
  setScanStudentId("");
};

const handleClearFeedback = () => setScanFeedback(null);

// Total attendance for current event
const currentEventScans = attendance[scanEventId] || [];


  return (
    <>
      <Navbar />
      <main className="ldg-page executive">
        <div className="ldg-wrap">

          {/* IDENTITY RAIL */}
          <aside className="ldg-rail">
            <div className="ldg-badge">{initials}</div>
            <span className="ldg-eyebrow">Executive</span>
            <h1>{e.club}</h1>
            <p className="ldg-rail__sub">{e.name} · {e.position}</p>

            <div className="ldg-perf" aria-hidden="true" />

            <div className="ldg-hero">
              <span className="ldg-hero__num grad-text">{pending.length}</span>
              <span className="ldg-hero__label">Pending applications</span>
              {pending.length > 0 && (
                <span className="ldg-hero__badge">Action needed</span>
              )}
            </div>

            <ul className="ldg-stats">
              <li><FaUsers /> <strong>{e.stats.members}</strong> total members</li>
              <li><FaCalendarAlt /> <strong>{events.length}</strong> active events</li>
              <li><FaBullhorn /> <strong>{announcements.length}</strong> announcements</li>
            </ul>

            <div className="ldg-quick">
              <button type="button" onClick={() => setShowEventModal(true)}>
                <span><FaPlus /> Create event</span>
              </button>
              <button type="button" onClick={() => setShowAnnModal(true)}>
                <span><FaBullhorn /> Post announcement</span>
              </button>
              <button type="button" onClick={() => setShowScanModal(true)}>
                <span><FaQrcode /> Scan attendance</span>
              </button>
            </div>

            <button className="ldg-logout" onClick={handleLogout}>
              <FaSignOutAlt /> Log out
            </button>
          </aside>

          {/* LEDGER */}
          <div className="ldg-main">

            {/* PENDING APPLICATIONS */}
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
                  {pending.map((p, i) => (
                    <li key={i}>
                      <span className="ldg-mark">
                        {p.name.slice(0, 2).toUpperCase()}
                      </span>
                      <div className="ldg-row-body">
                        <strong>{p.name}</strong>
                        <small>{p.id} · {p.dept}</small>
                      </div>
                      <div className="ldg-pending-actions">
                        <button className="btn-approve" onClick={() => handleAction(p.id)}>
                          <FaCheck /> Approve
                        </button>
                        <button className="btn-reject" onClick={() => handleAction(p.id)}>
                          <FaTimes />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {/* MY EVENTS */}
            <section>
              <div className="ldg-section__head">
                <h2>My events</h2>
                <button
                  className="btn-mini create"
                  onClick={() => setShowEventModal(true)}
                >
                  <FaPlus /> New event
                </button>
              </div>
              <ul className="ldg-events">
                {events.map((ev, i) => (
                  <li key={ev.id || i} className="ldg-event">
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
                      <button
                        className="btn-icon"
                        onClick={() => setEditingEvent({ ...ev })}
                        aria-label="Edit event"
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="btn-icon danger"
                        onClick={() => handleDeleteEvent(ev)}
                        aria-label="Delete event"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* ANNOUNCEMENTS SECTION */}
            <section>
              <div className="ldg-section__head">
                <h2>My announcements</h2>
                <button
                  className="btn-mini create"
                  onClick={() => setShowAnnModal(true)}
                >
                  <FaPlus /> New announcement
                </button>
              </div>

              {announcements.length === 0 ? (
                <p className="ldg-empty">No announcements yet.</p>
              ) : (
                <div className="ann-list">
                  {announcements.map((an, i) => {
                    const isDefault = !an.id || !an.id.startsWith("ann-");
                    return (
                      <article
                        className={`ann ${an.priority === "high" ? "ann--high" : ""}`}
                        key={an.id || i}
                      >
                        <div className="ann__top">
                          <span className="ann__club">Posted</span>
                          {an.priority === "high" && (
                            <span className="ann__badge urgent">Urgent</span>
                          )}
                          <span className="ann__date">{an.date || "Recently"}</span>

                          <div className="ann__actions">
                            <button
                              className="btn-icon"
                              onClick={() => setEditingAnn({ ...an })}
                              aria-label="Edit announcement"
                            >
                              <FaEdit />
                            </button>
                            <button
                              className="btn-icon danger"
                              onClick={() => handleDeleteAnn(an)}
                              aria-label="Delete announcement"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </div>
                        <h3>{an.title}</h3>
                        {an.body && <p>{an.body}</p>}
                      </article>
                    );
                  })}
                </div>
              )}
            </section>

          </div>
        </div>
      </main>

      {/*  CREATE EVENT MODAL  */}
      {showEventModal && (
        <div className="modal-overlay" onClick={() => setShowEventModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal__head">
              <div>
                <span className="modal__eyebrow">Executive</span>
                <h2>Create new event</h2>
              </div>
              <button
                className="modal__close"
                onClick={() => setShowEventModal(false)}
                aria-label="Close"
              >
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
                <button type="submit" className="btn-primary">
                  <FaPlus /> Create event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/*  EDIT EVENT MODAL  */}
      {editingEvent && (
        <div className="modal-overlay" onClick={() => setEditingEvent(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal__head">
              <div>
                <span className="modal__eyebrow">Executive</span>
                <h2>Edit event</h2>
              </div>
              <button className="modal__close" onClick={() => setEditingEvent(null)}>
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleUpdateEvent} className="modal__body">
              <div className="modal__field">
                <label>Event title</label>
                <input
                  type="text" value={editingEvent.title}
                  onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                  autoFocus
                />
              </div>

              <div className="modal__row">
                <div className="modal__field">
                  <label>Date</label>
                  <input
                    type="text" value={editingEvent.date || ""}
                    onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                  />
                </div>
                <div className="modal__field">
                  <label>Time</label>
                  <input
                    type="text" value={editingEvent.time || ""}
                    onChange={(e) => setEditingEvent({ ...editingEvent, time: e.target.value })}
                  />
                </div>
              </div>

              <div className="modal__field">
                <label>Venue</label>
                <input
                  type="text" value={editingEvent.venue || ""}
                  onChange={(e) => setEditingEvent({ ...editingEvent, venue: e.target.value })}
                />
              </div>

              <div className="modal__row">
                <div className="modal__field">
                  <label>Registered</label>
                  <input
                    type="number" value={editingEvent.registered || 0}
                    onChange={(e) => setEditingEvent({ ...editingEvent, registered: Number(e.target.value) })}
                    min="0"
                  />
                </div>
                <div className="modal__field">
                  <label>Total seats</label>
                  <input
                    type="number" value={editingEvent.total || 0}
                    onChange={(e) => setEditingEvent({ ...editingEvent, total: Number(e.target.value) })}
                    min="1"
                  />
                </div>
              </div>

              {error && <p className="modal__error">{error}</p>}

              <div className="modal__actions">
                <button type="button" className="btn-ghost" onClick={() => setEditingEvent(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============ POST ANNOUNCEMENT MODAL ============ */}
      {showAnnModal && (
        <div className="modal-overlay" onClick={() => setShowAnnModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal__head">
              <div>
                <span className="modal__eyebrow">Executive</span>
                <h2>Post announcement</h2>
              </div>
              <button
                className="modal__close"
                onClick={() => setShowAnnModal(false)}
                aria-label="Close"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleCreateAnn} className="modal__body">
              <div className="modal__field">
                <label htmlFor="ann-title">Title *</label>
                <input
                  id="ann-title" type="text" name="title"
                  value={newAnn.title} onChange={handleAnnChange}
                  placeholder="e.g., Workshop registration open"
                  autoFocus
                />
              </div>

              <div className="modal__field">
                <label htmlFor="ann-body">Message *</label>
                <textarea
                  id="ann-body" name="body"
                  value={newAnn.body} onChange={handleAnnChange}
                  placeholder="Write your announcement here..."
                  rows={5}
                />
              </div>

              <div className="modal__field">
                <label>Priority</label>
                <div className="priority-options">
                  {[
                    { value: "normal", label: "Normal" },
                    { value: "high", label: "Urgent" },
                  ].map((p) => (
                    <button
                      key={p.value}
                      type="button"
                      className={`priority-option ${
                        newAnn.priority === p.value ? "is-active" : ""
                      } ${p.value === "high" ? "high" : ""}`}
                      onClick={() =>
                        setNewAnn({ ...newAnn, priority: p.value })
                      }
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="modal__field">
                <label>Posting as</label>
                <input
                  type="text"
                  value={`${user.name} · ${user.club || "Club"}`}
                  disabled
                  readOnly
                />
              </div>

              {error && <p className="modal__error">{error}</p>}

              <div className="modal__actions">
                <button
                  type="button" className="btn-ghost"
                  onClick={() => { setShowAnnModal(false); setError(""); }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  <FaBullhorn /> Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/*  EDIT ANNOUNCEMENT MODAL  */}
      {editingAnn && (
        <div className="modal-overlay" onClick={() => setEditingAnn(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal__head">
              <div>
                <span className="modal__eyebrow">Executive</span>
                <h2>Edit announcement</h2>
              </div>
              <button className="modal__close" onClick={() => setEditingAnn(null)}>
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleUpdateAnn} className="modal__body">
              <div className="modal__field">
                <label>Title</label>
                <input
                  type="text" value={editingAnn.title}
                  onChange={(e) => setEditingAnn({ ...editingAnn, title: e.target.value })}
                  autoFocus
                />
              </div>

              <div className="modal__field">
                <label>Message</label>
                <textarea
                  value={editingAnn.body || ""}
                  onChange={(e) => setEditingAnn({ ...editingAnn, body: e.target.value })}
                  rows={5}
                />
              </div>

              <div className="modal__field">
                <label>Priority</label>
                <div className="priority-options">
                  {[
                    { value: "normal", label: "Normal" },
                    { value: "high", label: "Urgent" },
                  ].map((p) => (
                    <button
                      key={p.value}
                      type="button"
                      className={`priority-option ${
                        editingAnn.priority === p.value ? "is-active" : ""
                      } ${p.value === "high" ? "high" : ""}`}
                      onClick={() =>
                        setEditingAnn({ ...editingAnn, priority: p.value })
                      }
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {error && <p className="modal__error">{error}</p>}

              <div className="modal__actions">
                <button type="button" className="btn-ghost" onClick={() => setEditingAnn(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

{/* ============ SCAN ATTENDANCE MODAL ============ */}
{showScanModal && (
  <div className="modal-overlay" onClick={() => setShowScanModal(false)}>
    <div className="modal modal--wide" onClick={(e) => e.stopPropagation()}>
      <div className="modal__head">
        <div>
          <span className="modal__eyebrow">Executive</span>
          <h2>Scan attendance</h2>
        </div>
        <button
          className="modal__close"
          onClick={() => setShowScanModal(false)}
          aria-label="Close"
        >
          <FaTimes />
        </button>
      </div>

      <div className="modal__body">

        {/* Event Selector */}
        <div className="modal__field">
          <label htmlFor="scan-event">Event</label>
          <select
            id="scan-event"
            value={scanEventId}
            onChange={(e) => {
              setScanEventId(e.target.value);
              setScanFeedback(null);
            }}
          >
            <option value="">— Choose an event —</option>
            {events.map((ev, i) => (
              <option key={ev.id || i} value={ev.id || ev.title}>
                {ev.title}
              </option>
            ))}
          </select>
        </div>

        {scanEventId && (
          <>
            {/* Attendance Counter */}
            <div className="scan-counter">
              <div className="scan-counter__left">
                <strong>{currentEventScans.length}</strong>
                <span>students marked present</span>
              </div>
              <div className="scan-counter__right">
                <span className="scan-counter__pulse" />
                Live
              </div>
            </div>

            {/* QR SCANNER UI */}
            <div className="scan-scanner">
              <div className="scan-scanner__viewport">
                <div className="scan-scanner__corners" aria-hidden="true">
                  <span /><span /><span /><span />
                </div>
                <div className="scan-scanner__icon">
                  <FaQrcode />
                </div>
                <p className="scan-scanner__hint">
                  Point the camera at a student's QR code
                </p>
              </div>

              <button
                type="button"
                className="btn-scan-simulate"
                onClick={() => {
                  // Pick a random un-scanned student
                  const alreadyScanned = currentEventScans.map((s) => s.studentId);
                  const available = mockRegisteredStudents.filter(
                    (s) => !alreadyScanned.includes(s.id)
                  );

                  if (available.length === 0) {
                    setScanFeedback({
                      type: "warning",
                      message: "All registered students are already marked present.",
                    });
                    return;
                  }

                  const randomStudent =
                    available[Math.floor(Math.random() * available.length)];

                  // Auto-scan that student
                  const newScan = {
                    ticketId: randomStudent.ticketId,
                    studentId: randomStudent.id,
                    studentName: randomStudent.name,
                    dept: randomStudent.dept,
                    timestamp: new Date().toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    }),
                  };

                  const updated = {
                    ...attendance,
                    [scanEventId]: [...currentEventScans, newScan],
                  };

                  setAttendance(updated);
                  localStorage.setItem(
                    `clubx_attendance_${user.email}`,
                    JSON.stringify(updated)
                  );

                  setScanFeedback({
                    type: "success",
                    message: `${randomStudent.name} marked present.`,
                    scan: newScan,
                  });
                }}
              >
                <FaQrcode /> Simulate QR Scan
              </button>

              <p className="scan-hint">
                In production, this opens the device camera. Clicking here
                simulates scanning a random student's ticket.
              </p>
            </div>

            {/* Manual Ticket Entry (fallback) */}
            <details className="scan-manual">
              <summary>Or enter ticket ID manually</summary>
              <div className="scan-manual__body">
                <div className="modal__field">
                  <label htmlFor="scan-ticket">Ticket ID</label>
                  <input
                    id="scan-ticket"
                    type="text"
                    placeholder="e.g., TXN-2025-4782"
                    value={scanStudentId}
                    onChange={(e) => setScanStudentId(e.target.value.trim())}
                  />
                </div>
                <button
                  type="button"
                  className="btn-ghost"
                  onClick={() => {
                    const student = mockRegisteredStudents.find(
                      (s) => s.ticketId === scanStudentId
                    );

                    if (!student) {
                      setScanFeedback({
                        type: "error",
                        message: `No student found with ticket ID "${scanStudentId}".`,
                      });
                      return;
                    }

                    const eventScans = attendance[scanEventId] || [];

                    if (eventScans.find((s) => s.studentId === student.id)) {
                      setScanFeedback({
                        type: "warning",
                        message: `${student.name} is already marked present.`,
                      });
                      return;
                    }

                    const newScan = {
                      ticketId: student.ticketId,
                      studentId: student.id,
                      studentName: student.name,
                      dept: student.dept,
                      timestamp: new Date().toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      }),
                    };

                    const updated = {
                      ...attendance,
                      [scanEventId]: [...eventScans, newScan],
                    };

                    setAttendance(updated);
                    localStorage.setItem(
                      `clubx_attendance_${user.email}`,
                      JSON.stringify(updated)
                    );

                    setScanFeedback({
                      type: "success",
                      message: `${student.name} marked present.`,
                      scan: newScan,
                    });
                    setScanStudentId("");
                  }}
                >
                  Verify ticket
                </button>
              </div>
            </details>

            {/* Feedback */}
            {scanFeedback && (
              <div className={`scan-feedback ${scanFeedback.type}`}>
                {scanFeedback.type === "success" && <FaCheckCircle />}
                {scanFeedback.type === "warning" && <FaExclamationTriangle />}
                {scanFeedback.type === "error" && <FaTimes />}
                <div>
                  <p>{scanFeedback.message}</p>
                  {scanFeedback.scan && (
                    <small>
                      Ticket: {scanFeedback.scan.ticketId} ·{" "}
                      {scanFeedback.scan.timestamp}
                    </small>
                  )}
                </div>
                <button
                  type="button"
                  className="scan-feedback__close"
                  onClick={() => setScanFeedback(null)}
                  aria-label="Dismiss"
                >
                  <FaTimes />
                </button>
              </div>
            )}

            {/* Recent Scans */}
            {currentEventScans.length > 0 && (
              <div className="scan-recent">
                <h4>Recent scans ({currentEventScans.length})</h4>
                <ul>
                  {[...currentEventScans].reverse().map((s, i) => (
                    <li key={i}>
                      <span className="scan-recent__mark">
                        {s.studentName.slice(0, 2).toUpperCase()}
                      </span>
                      <div className="scan-recent__body">
                        <strong>{s.studentName}</strong>
                        <small>
                          {s.studentId} · {s.dept}
                        </small>
                      </div>
                      <span className="scan-recent__time">{s.timestamp}</span>
                      <span className="scan-recent__badge">
                        <FaCheckCircle /> Present
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>

      <div className="modal__actions">
        <button
          type="button"
          className="btn-ghost"
          onClick={() => {
            setShowScanModal(false);
            setScanFeedback(null);
          }}
        >
          Done
        </button>
      </div>
    </div>
  </div>
)}

      <Footer />
    </>
  );
}

export default ExecutiveDashboard;