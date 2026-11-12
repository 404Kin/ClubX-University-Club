import { useEffect, useState } from "react";
import SectionHeader from "./SectionHeader";
import { apiUrl } from "../lib/api";

function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await fetch(apiUrl("announcements"));
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

  if (loading) return <div style={{ padding: "50px", textAlign: "center" }}>Loading...</div>;
  if (announcements.length === 0) return null; 

  return (
    <section className="section wrap">
      <SectionHeader
        eyebrow="Stay Updated"
        title="Latest Announcements"
        lead="Important updates and news from all clubs."
      />
      
      <div className="ann-list">
        {announcements.slice(0, 3).map((ann, i) => (
          <article className="ann" key={ann._id || i}>
            <div className="ann__top">
              <span className="ann__club">System Update</span>
              {ann.priority === "high" && (
                <span className="ann__badge urgent">Urgent</span>
              )}
            </div>
            <h3>{ann.title}</h3>
            <p>{ann.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Announcements;