import { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import Navbar from "../components/Navbar";  
import Footer from "../components/Footer";   
import "../styles/events.css";

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/events");
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  return (
    <>
      <Navbar />                              
      <main className="page-events">          
        <div className="wrap">
          <div className="page-header">
            <p className="page-eyebrow">What's happening</p>
            <h1 className="page-title">All Events</h1>
            <p className="page-lead">
              Workshops, contests, seminars — every campus moment, all in one place.
            </p>
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "var(--muted)" }}>
              <h3>Loading events from Database...</h3>
            </div>
          ) : (
            <div className="ev-list">
              {events.map((e) => (
                <EventCard key={e._id} event={e} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />                             
    </>
  );
}

export default EventsPage;