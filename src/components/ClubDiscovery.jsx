import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import SectionHeader from "./SectionHeader";
import { Arrow, SearchIcon } from "./Icons";
import ClubPreview from "./ClubPreview";
import { apiUrl } from "../lib/api";
import { getClubHue } from "../lib/clubPresentation";

function FeaturedClub({ club }) {
  const name = club.short || club.name || "Club";
  return (
    <Link
      to={`/clubs/${club._id}`}
      className="featured"
      style={{ "--hue": getClubHue(club) }}
    >
      {club.image && <img src={club.image} alt="" loading="lazy" />}
      <span className="featured__mono" aria-hidden="true">{name}</span>
      <span className="featured__body">
        <span className="featured__tag">Featured · {club.category}</span>
        <span className="featured__name">{name}</span>
        {club.tagline && <span className="featured__tagline">{club.tagline}</span>}
        <span className="featured__cta">Explore Club <Arrow /></span>
      </span>
    </Link>
  );
}

function ClubDiscovery() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [loadVersion, setLoadVersion] = useState(0);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const controller = new AbortController();
    const fetchClubs = async () => {
      try {
        const res = await fetch(apiUrl("clubs"), { signal: controller.signal });
        if (!res.ok) throw new Error(`Club request failed (${res.status})`);
        const data = await res.json();
        const list = Array.isArray(data) ? data : data.clubs;
        if (!Array.isArray(list)) {
          throw new Error("The clubs API response must contain a list.");
        }
        setClubs(list);
      } catch (err) {
        if (err.name === "AbortError") return;
        console.error("Failed to fetch clubs:", err);
        setError("Club information is temporarily unavailable. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchClubs();
    return () => controller.abort();
  }, [loadVersion]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return clubs.filter((club) =>
      (category === "All" || club.category === category) &&
      (!q || [club.name, club.short, club.category, club.tagline]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(q))
    );
  }, [query, category, clubs]);

  const categories = [...new Set(clubs.map((club) => club.category).filter(Boolean))].sort();
  const [featured, ...rest] = [...results].sort(
    (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured))
  );
  const reset = () => {
    setQuery("");
    setCategory("All");
  };

  if (loading) return <div style={{ textAlign: "center", padding: "50px" }}>Loading clubs...</div>;

  return (
    <section id="clubs" className="section wrap">
      <SectionHeader
        eyebrow="Discover"
        title="Find the community that fits you."
        lead="Every club is a living community. Browse by interest or search by name."
      />

      <div className="finder" data-reveal>
        <label className="finder__search">
          <SearchIcon />
          <span className="sr-only">Search clubs</span>
          <input
            id="search"
            type="search"
            placeholder="Search clubs…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
          />
        </label>
        {categories.length > 0 && (
          <div className="chips" role="group" aria-label="Filter by category">
            {["All", ...categories].map((item) => (
              <button
                key={item}
                type="button"
                className="chip"
                aria-pressed={category === item}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>

      <p className="sr-only" role="status" aria-live="polite">{results.length} clubs shown</p>

      {error ? (
        <div className="empty" role="alert">
          <p>{error}</p>
          <button type="button" className="btn btn--ghost" onClick={() => {
            setError("");
            setLoading(true);
            setLoadVersion((version) => version + 1);
          }}>Try again</button>
        </div>
      ) : featured ? (
        <div className="discover">
          <FeaturedClub club={featured} />
          {rest.length > 0 && (
            <ul className="previews">
              {rest.map((club) => <ClubPreview key={club._id} club={club} />)}
            </ul>
          )}
        </div>
      ) : (
        <div className="empty">
          <h3>{clubs.length ? "No clubs match that search." : "No clubs in the directory yet."}</h3>
          <p>{clubs.length ? "Try a different name or clear the filters." : "Please ask an administrator to add the verified club details."}</p>
          {clubs.length > 0 && (
            <button type="button" className="btn btn--ghost" onClick={reset}>Clear filters</button>
          )}
        </div>
      )}
    </section>
  );
}

export default ClubDiscovery;