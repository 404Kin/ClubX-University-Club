import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  FaUsers, FaCalendarAlt, FaBullhorn, FaSignOutAlt,
  FaPlus, FaQrcode, FaCheck, FaTimes, FaEdit, FaTrash,
  FaCheckCircle, FaExclamationTriangle,
} from "react-icons/fa";

function ExecutiveDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);

  const [showEventModal, setShowEventModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  
  const [newEvent, setNewEvent] = useState({
    title: "", date: "", time: "", venue: "",
    category: "Workshop", description: "", total: 50, 
    src: "", 
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("clubx_user");
    if (!stored) { navigate("/login"); return; }
    const parsed = JSON.parse(stored);
    if (parsed.role !== "executive") { navigate("/login"); return; }
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

  const handleEventChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    setError("");

    if (!newEvent.title.trim()) { setError("Event title is required."); return; }
    if (!newEvent.date.trim()) { setError("Event date is required."); return; }
    if (!newEvent.time.trim()) { setError("Event time is required."); return; }
    if (!newEvent.venue.trim()) { setError("Venue is required."); return; }

    try {
      const res = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          ...newEvent, 
          createdBy: user.email, 
          total: Number(newEvent.total),
          registered: 0 
        })
      });
      const data = await res.json();

      setEvents([data, ...events]);
      setNewEvent({ 
        title: "", date: "", time: "", venue: "", 
        category: "Workshop", description: "", total: 50, src: "" 
      });
      setShowEventModal(false);
    } catch (err) {
      setError("Failed to create event. Server error.");
    }
  };

  const handleDeleteEvent = async (id) => {
    if (!window.confirm("Delete this event from Database?")) return;
    try {
      await fetch(`http://localhost:5000/api/events/${id}`, { method: "DELETE" });
      setEvents(events.filter((e) => e._id !== id));
    } catch (err) {
      console.error(err);
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
            </ul>

            <div className="ldg-quick">
              <button type="button" onClick={() => setShowEventModal(true)}>
                <span><FaPlus /> Create event</span>
              </button>
            </div>

            <button className="ldg-logout" onClick={handleLogout}>
              <FaSignOutAlt /> Log out
            </button>
          </aside>

          <div className="ldg-main">
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
                <label htmlFor="src">Event Image URL (Optional)</label>
                <input
                  id="src" type="text" name="src"
                  value={newEvent.src} onChange={handleEventChange}
                  placeholder="https://images.unsplash.com/photo-..."
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

      <Footer />
    </>
  );
}

export default ExecutiveDashboard;