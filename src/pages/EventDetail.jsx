import { useState, useEffect, useRef } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaUsers,
  FaCheckCircle,
  FaQrcode,
  FaDownload,
} from "react-icons/fa";
import html2canvas from "html2canvas";
import { QRCodeSVG } from "qrcode.react";
import { getEventById } from "../data/events";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function EventDetail() {
  const { id } = useParams();
  const event = getEventById(id);

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
  }, []);

  if (!event) return <Navigate to="/events" replace />;

  const [taken, total] = event.seats;
  const pct = Math.round((taken / total) * 100);
  const isPaid = event.fee > 0;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    const ticketId = `TXN-${event.year}-${Math.floor(1000 + Math.random() * 9000)}`;

    const existing = JSON.parse(
      localStorage.getItem("clubx_registrations") || "[]"
    );
    const newRegistration = {
      ticketId,
      eventId: event.id,
      eventTitle: event.title,
      eventClub: event.club,
      eventDate: `${event.day} ${event.month} ${event.year}`,
      eventTime: event.time,
      eventPlace: event.place,
      registeredAt: new Date().toISOString(),
      ...form,
    };
    localStorage.setItem(
      "clubx_registrations",
      JSON.stringify([...existing, newRegistration])
    );

    setForm({ ...form, ticketId });
    setSubmitted(true);
  };


  // Ticket download handler
  const handleDownload = async () => {
    if (!ticketRef.current || downloading) return;

    setDownloading(true);

    try {
      const canvas = await html2canvas(ticketRef.current, {
        backgroundColor: "#121212",
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const link = document.createElement("a");
      link.download = `ClubX-Ticket-${form.ticketId}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Ticket download failed:", err);
      alert("Download failed. Please try again.");
    } finally {
      setDownloading(false);
    }
  };



  return (
    <>
      <Navbar />

      <div className="event-detail-page">

        {/* HERO */}
        <section className="event-detail-hero">
          <div
            className="event-detail-hero-bg"
            style={{ backgroundImage: `url(${event.src})` }}
          >
            <div className="event-detail-hero-overlay">
              <div className="event-detail-hero-inner">
                <span className="event-detail-tag">{event.category}</span>
                <h1>{event.title}</h1>

                <div className="event-detail-meta">
                  <span><FaCalendarAlt /> {event.day} {event.month} {event.year}</span>
                  <span><FaClock /> {event.time}</span>
                  <span><FaMapMarkerAlt /> {event.place}</span>
                </div>

                <p className="event-detail-club">Organized by {event.club}</p>
              </div>
            </div>
          </div>
        </section>

    
        <section className="event-detail-body">
          <div className="event-detail-grid">

           
            <div className="event-detail-main">

              <div className="event-block">
                <h2>About This Event</h2>
                <p className="event-lead">{event.desc}</p>
                <p>{event.longDesc}</p>
              </div>

              <div className="event-block">
                <h2>What You'll Learn</h2>
                <ul className="event-list">
                  {event.learn.map((item, i) => (
                    <li key={i}>
                      <FaCheckCircle className="li-icon" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="event-block">
                <h2>Schedule</h2>
                <div className="schedule">
                  {event.schedule.map((s, i) => (
                    <div className="schedule-row" key={i}>
                      <span className="schedule-time">{s.time}</span>
                      <span className="schedule-item">{s.item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="event-block">
                <h2>Speakers</h2>
                <div className="speakers">
                  {event.speakers.map((sp, i) => (
                    <div className="speaker-card" key={i}>
                      <div className="speaker-avatar">
                        {sp.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                      </div>
                      <div>
                        <h4>{sp.name}</h4>
                        <p>{sp.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="event-block">
                <h2>Venue</h2>
                <div className="venue-box">
                  <FaMapMarkerAlt className="venue-icon" />
                  <div>
                    <h4>{event.place}</h4>
                    <p>IIUC Campus, Kumira, Chittagong-4318</p>
                  </div>
                </div>
              </div>

            </div>

            <aside className="event-detail-side">

              {!submitted && (
                <div className="reg-card">
                  <div className="reg-card-top">
                    <div>
                      <span className="reg-label">Registration Fee</span>
                      <h3 className="reg-fee">
                        {isPaid ? `Tk ${event.fee}` : "Free"}
                      </h3>
                    </div>
                    <span className={`reg-status ${isPaid ? "paid" : "free"}`}>
                      {isPaid ? "Paid" : "Free"}
                    </span>
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
                      <span><FaCalendarAlt /> Deadline</span>
                      <strong>{event.deadline}</strong>
                    </div>

                    <div className="reg-row">
                      <span><FaClock /> Duration</span>
                      <strong>{event.time}</strong>
                    </div>
                  </div>

                  {!showForm && (
                    <button
                      className="reg-btn"
                      onClick={() => setShowForm(true)}
                    >
                      Register for this event
                    </button>
                  )}
                </div>
              )}

              {showForm && !submitted && (
                <form className="reg-form" onSubmit={handleSubmit}>
                  <h3>Registration Form</h3>
                  <p className="reg-form-sub">
                    Fill in your details to confirm your spot.
                  </p>

                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                    />
                  </div>

                  <div className="form-group">
                    <label>Student ID *</label>
                    <input
                      type="text"
                      name="studentId"
                      value={form.studentId}
                      onChange={handleChange}
                      required
                      placeholder="C241462"
                    />
                  </div>

                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="you@iiuc.ac.bd"
                    />
                  </div>

                  <div className="form-group">
                    <label>Department *</label>
                    <select
                      name="department"
                      value={form.department}
                      onChange={handleChange}
                    >
                      <option>CSE</option>
                      <option>EEE</option>
                      <option>BBA</option>
                      <option>English</option>
                      <option>Others</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      placeholder="01XXXXXXXXX"
                    />
                  </div>

                  {isPaid && (
                    <div className="payment-section">
                      <h4>Payment</h4>
                      <p className="payment-note">
                        Please send ৳{event.fee} to any of the numbers below and
                        enter the Transaction ID.
                      </p>

                      <div className="pay-methods">
                        <span>bKash: 01711-000000</span>
                        <span>Nagad: 01811-000000</span>
                      </div>

                      <div className="form-group">
                        <label>Payment Method *</label>
                        <div className="pay-options">
                          {["bkash", "nagad", "rocket"].map((m) => (
                            <label key={m} className="pay-option">
                              <input
                                type="radio"
                                name="paymentMethod"
                                value={m}
                                checked={form.paymentMethod === m}
                                onChange={handleChange}
                              />
                              <span>{m.charAt(0).toUpperCase() + m.slice(1)}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="form-group">
                        <label>Transaction ID *</label>
                        <input
                          type="text"
                          name="transactionId"
                          value={form.transactionId}
                          onChange={handleChange}
                          required
                          placeholder="TRX123456789"
                        />
                      </div>
                    </div>
                  )}

                  <div className="form-actions">
                    <button
                      type="button"
                      className="btn-cancel"
                      onClick={() => setShowForm(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn-submit">
                      Confirm Registration
                    </button>
                  </div>
                </form>
              )}

              {/* TICKET */}
              {submitted && (
                <div className="ticket" ref={ticketRef}>
                  <div className="ticket-success">
                    <FaCheckCircle />
                    <h3>Registration Confirmed!</h3>
                    <p>Your spot has been reserved.</p>
                  </div>

                  <div className="ticket-body">
                    <div className="ticket-row">
                      <span>Ticket ID</span>
                      <strong>{form.ticketId}</strong>
                    </div>
                    <div className="ticket-row">
                      <span>Event</span>
                      <strong>{event.title}</strong>
                    </div>
                    <div className="ticket-row">
                      <span>Date</span>
                      <strong>{event.day} {event.month} {event.year}</strong>
                    </div>
                    <div className="ticket-row">
                      <span>Time</span>
                      <strong>{event.time}</strong>
                    </div>
                    <div className="ticket-row">
                      <span>Venue</span>
                      <strong>{event.place}</strong>
                    </div>
                    <div className="ticket-row">
                      <span>Attendee</span>
                      <strong>{form.name}</strong>
                    </div>
                  </div>

                  <div className="ticket-qr">
                    <QRCodeSVG
                      value={JSON.stringify({
                      ticketId: form.ticketId,
                      eventId: event.id,
                      eventTitle: event.title,
                      studentId: form.studentId,
                      studentName: form.name,
                      date: `${event.day} ${event.month} ${event.year}`,
                    })}
                    size={160}
                    bgColor="#121212"
                    fgColor="#d4a373"
                    level="M"
                    />
                    <span>Show this at the venue</span>
                  </div>

                  <div className="ticket-actions">
                    <button className="btn-download" onClick={handleDownload}
                    disabled={downloading} 
                    >
                    <FaDownload /> 
                    {downloading ? "Downloading..." : "Download Ticket"}
                    </button>
                    <Link to="/events" className="btn-back">
                      Back to Events
                    </Link>
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