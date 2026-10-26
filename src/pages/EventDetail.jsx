import { useState, useEffect, useRef } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaUsers,
  FaCheckCircle,
  FaDownload,
} from "react-icons/fa";
import html2canvas from "html2canvas";
import { QRCodeSVG } from "qrcode.react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function EventDetail() {
  const { id } = useParams();
  
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    studentId: "",
    email: "",
    department: "CSE",
    phone: "",
    paymentMethod: "bkash",
    transactionId: "",
  });

  const ticketRef = useRef(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/events/${id}`);
        if (response.ok) {
          const data = await response.json();
          setEvent(data);
        } else {
          setEvent(null);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div style={{ textAlign: "center", padding: "150px 20px", color: "var(--muted)" }}>
          <h2>Loading event details...</h2>
        </div>
        <Footer />
      </>
    );
  }

  if (!event) return <Navigate to="/events" replace />;

  const taken = event.registered || 0;
  const total = event.total || 50;
  const pct = Math.round((taken / total) * 100);
  const isPaid = false; 

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const ticketId = `TXN-2025-${Math.floor(1000 + Math.random() * 9000)}`;

    const existing = JSON.parse(localStorage.getItem("clubx_registrations") || "[]");
    const newRegistration = {
      ticketId,
      eventId: event._id,
      eventTitle: event.title,
      eventClub: "Club", 
      eventDate: event.date,
      eventTime: event.time,
      eventPlace: event.venue,
      registeredAt: new Date().toISOString(),
      ...form,
    };
    localStorage.setItem("clubx_registrations", JSON.stringify([...existing, newRegistration]));

    setForm({ ...form, ticketId });
    setSubmitted(true);
  };

  const handleDownload = async () => {
    if (!ticketRef.current || downloading) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(ticketRef.current, {
        backgroundColor: "#121212", scale: 2, useCORS: true, logging: false,
      });
      const link = document.createElement("a");
      link.download = `ClubX-Ticket-${form.ticketId}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Ticket download failed:", err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="event-detail-page">

        <section className="event-detail-hero">
          <div className="event-detail-hero-bg" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600)` }}>
            <div className="event-detail-hero-overlay">
              <div className="event-detail-hero-inner">
                <span className="event-detail-tag">{event.category}</span>
                <h1>{event.title}</h1>

                <div className="event-detail-meta">
                  <span><FaCalendarAlt /> {event.date}</span>
                  <span><FaClock /> {event.time}</span>
                  <span><FaMapMarkerAlt /> {event.venue}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="event-detail-body">
          <div className="event-detail-grid">
            <div className="event-detail-main">
              <div className="event-block">
                <h2>About This Event</h2>
                <p className="event-lead">{event.description}</p>
              </div>
            </div>

            <aside className="event-detail-side">
              {!submitted && (
                <div className="reg-card">
                  <div className="reg-card-top">
                    <div>
                      <span className="reg-label">Registration Fee</span>
                      <h3 className="reg-fee">Free</h3>
                    </div>
                    <span className="reg-status free">Free</span>
                  </div>

                  <div className="reg-info">
                    <div className="reg-row">
                      <span><FaUsers /> Seats</span>
                      <strong>{taken} / {total}</strong>
                    </div>
                    <div className="reg-bar">
                      <i style={{ width: `${pct}%` }}></i>
                    </div>
                    <div className="reg-row">
                      <span><FaClock /> Duration</span>
                      <strong>{event.time}</strong>
                    </div>
                  </div>

                  {!showForm && (
                    <button className="reg-btn" onClick={() => setShowForm(true)}>
                      Register for this event
                    </button>
                  )}
                </div>
              )}

              {showForm && !submitted && (
                <form className="reg-form" onSubmit={handleSubmit}>
                  <h3>Registration Form</h3>
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Your full name" />
                  </div>
                  <div className="form-group">
                    <label>Student ID *</label>
                    <input type="text" name="studentId" value={form.studentId} onChange={handleChange} required placeholder="C241462" />
                  </div>
                  <div className="form-actions">
                    <button type="button" className="btn-cancel" onClick={() => setShowForm(false)}>Cancel</button>
                    <button type="submit" className="btn-submit">Confirm Registration</button>
                  </div>
                </form>
              )}

              {submitted && (
                <div className="ticket" ref={ticketRef}>
                  <div className="ticket-success">
                    <FaCheckCircle />
                    <h3>Registration Confirmed!</h3>
                  </div>
                  <div className="ticket-body">
                    <div className="ticket-row"><span>Ticket ID</span><strong>{form.ticketId}</strong></div>
                    <div className="ticket-row"><span>Event</span><strong>{event.title}</strong></div>
                  </div>
                  <div className="ticket-qr">
                    <QRCodeSVG value={form.ticketId} size={160} bgColor="#121212" fgColor="#d4a373" />
                    <span>Show this at the venue</span>
                  </div>
                  <div className="ticket-actions">
                    <button className="btn-download" onClick={handleDownload} disabled={downloading}>
                      <FaDownload /> {downloading ? "Downloading..." : "Download Ticket"}
                    </button>
                    <Link to="/events" className="btn-back">Back to Events</Link>
                  </div>
                </div>
              )}
            </aside>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default EventDetail;