import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { apiUrl } from "../lib/api";
import "../styles/club.css";

function AnnouncementDetail() {
  const { id } = useParams();
  const [announcement, setAnnouncement] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    fetch(apiUrl(`announcements/${id}`))
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Announcement could not be loaded.");
        if (active) setAnnouncement(data);
      })
      .catch((fetchError) => {
        if (active) setError(fetchError.message || "Announcement could not be loaded.");
      });
    return () => { active = false; };
  }, [id]);

  return (
    <div className="club-page">
      <Navbar />
      <main className="wrap cd-body" style={{ maxWidth: 900, paddingTop: "calc(var(--nav-h) + 3rem)" }}>
        <Link to="/" className="cd-crumbs">← All announcements</Link>
        {error ? <p role="alert">{error}</p> : announcement ? (
          <article className="ann ann--lead">
            <div className="ann__top">
              <span className="ann__club">{announcement.clubName || "Campus notice"}</span>
              <time dateTime={announcement.createdAt}>
                {new Date(announcement.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
              </time>
              {announcement.priority === "high" && <span className="ann__badge urgent">Urgent</span>}
            </div>
            <h1>{announcement.title}</h1>
            <p style={{ whiteSpace: "pre-wrap" }}>{announcement.body}</p>
            {announcement.clubId && <Link className="btn btn--ghost" to={`/clubs/${announcement.clubId}`}>Visit {announcement.clubName}</Link>}
          </article>
        ) : <p role="status">Loading announcement...</p>}
      </main>
      <Footer />
    </div>
  );
}

export default AnnouncementDetail;
