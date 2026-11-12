import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Arrow } from "./Icons";
import SectionHeader from "./SectionHeader";
import { apiUrl } from "../lib/api";

function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        // API থেকে নোটিশ আনা হচ্ছে
        const res = await fetch(apiUrl("announcements?limit=3"));
        if (res.ok) {
          const data = await res.json();
          setAnnouncements(data);
        }
      } catch (err) {
        console.error("Failed to fetch announcements:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  if (loading) return <div style={{ padding: "50px", textAlign: "center" }}>Loading announcements...</div>;

  if (announcements.length === 0) return null;

  return (
    <section id="latest-announcements" className="section wrap">
      <SectionHeader
        eyebrow="Stay Updated"
        title="Latest Announcements"
        lead="Important updates and news from all clubs."
      />

      <div className="ann-list">
        {announcements.slice(0, 3).map((ann, i) => (
          <article className="ann" key={ann._id || i}>
            <div className="ann__top">
              <span className="ann__club">{ann.clubName || "Campus notice"}</span>
              {ann.priority === "high" && (
                <span className="ann__badge urgent">Urgent</span>
              )}
            </div>
            <h3>{ann._id ? <Link to={`/announcements/${ann._id}`}>{ann.title}</Link> : ann.title}</h3>
            <p>{ann.body}</p>
            {ann._id && <Link className="link-btn" to={`/announcements/${ann._id}`}>Read announcement →</Link>}
          </article>
        ))}
      </div>
      <Link className="link-btn" to="/announcements">View all announcements <Arrow size={14} /></Link>
    </section>
  );
}

export default Announcements;