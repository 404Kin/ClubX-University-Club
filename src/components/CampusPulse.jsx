import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SectionHeader from "./SectionHeader";
import { apiUrl } from "../lib/api";

function CampusPulse() {
  const [pulse, setPulse] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPulse = async () => {
      try {
        const [eventResponse, announcementResponse] = await Promise.all([
          fetch(apiUrl("events?activity=true")),
          fetch(apiUrl("announcements")),
        ]);
        if (!eventResponse.ok || !announcementResponse.ok) {
          throw new Error("Could not load live campus activity.");
        }
        const [events, announcements] = await Promise.all([
          eventResponse.json(),
          announcementResponse.json(),
        ]);
        if (!Array.isArray(events) || !Array.isArray(announcements)) {
          throw new Error("Campus activity API returned an invalid response.");
        }
        setAnnouncements(announcements);

        const activity = [
          ...events.map((event) => ({
            id: `event-${event._id}`,
            href: `/events/${event._id}`,
            club: event.clubName || event.category || "Campus event",
            kind: "Event",
            text: `${event.title} is scheduled for ${event.date} at ${event.venue}.`,
            createdAt: event.createdAt,
          })),
        ];
        activity.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPulse(activity.slice(0, 8).map((item, index) => ({
          ...item,
          hue: [222, 322, 262, 8, 292][index],
        })));
      } catch (err) {
        console.error("Could not load campus activity:", err);
        setError("Live campus activity is temporarily unavailable.");
      } finally {
        setLoading(false);
      }
    };
    loadPulse();
  }, []);

  return (
    <section className="section wrap pulse" aria-labelledby="pulse-title">
      <SectionHeader eyebrow="Campus pulse" title={<span id="pulse-title">What's happening around campus.</span>} />
      {loading ? (
        <p>Loading campus activity...</p>
      ) : error ? (
        <p role="alert">{error}</p>
      ) : pulse.length === 0 ? (
        <p>No events or announcements have been posted yet.</p>
      ) : (
        <ul className="pulse__feed" data-reveal>
        {pulse.map((p) => (
          <li key={p.id} style={{ "--hue": p.hue }}>
            <span className="pulse__dot" aria-hidden="true" />
            <Link to={p.href} className="pulse__link">
              <strong>{p.club}</strong> {p.text}
            </Link>
            <span className="pulse__kind">{p.kind}</span>
          </li>
        ))}
      </ul>
      )}
      {!loading && !error && (
        <section className="announcements-feed" aria-labelledby="all-announcements-title">
          <SectionHeader
            eyebrow="Stay updated"
            title={<span id="all-announcements-title">All announcements.</span>}
            lead="Updates and notices from every club."
          />
          {announcements.length ? (
            <div className="ann-list">
              {announcements.map((announcement) => (
                <article className="ann" key={announcement._id}>
                  <div className="ann__top">
                    <span className="ann__club">{announcement.clubName || "Campus notice"}</span>
                    {announcement.priority === "high" && <span className="ann__badge urgent">Urgent</span>}
                    {announcement.createdAt && (
                      <time dateTime={announcement.createdAt}>
                        {new Date(announcement.createdAt).toLocaleDateString()}
                      </time>
                    )}
                  </div>
                  <h3>{announcement.title}</h3>
                  <p>{announcement.body}</p>
                  {announcement._id && (
                    <Link className="link-btn" to={`/announcements/${announcement._id}`}>
                      Read announcement →
                    </Link>
                  )}
                </article>
              ))}
            </div>
          ) : <p>No announcements have been posted yet.</p>}
        </section>
      )}
    </section>
  );
}

export default CampusPulse;
