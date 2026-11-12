import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import JoinClub from "../components/JoinClub";
import { Arrow } from "../components/Icons";
import { apiUrl } from "../lib/api";
import { getClubHue } from "../lib/clubPresentation";
import "../styles/club.css";

const TABS = [
  "Overview",
  "About",
  "Benefits",
  "Announcements",
  "Achievements",
  "Executives",
  "Members",
  "Requirements",
  "Membership",
];
const tabId = (tab) => tab.toLowerCase();
const asArray = (value) => Array.isArray(value) ? value : [];
const initials = (name = "") =>
  name.split(" ").filter(Boolean).map((word) => word[0]).slice(0, 2).join("").toUpperCase();

function List({ title, items }) {
  const entries = asArray(items).filter(Boolean);
  return (
    <section className="cd-block">
      <h3>{title}</h3>
      {entries.length ? (
        <ul className="cd-list">{entries.map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}</ul>
      ) : (
        <p>Information has not been published yet.</p>
      )}
    </section>
  );
}

function InfoList({ items }) {
  const entries = asArray(items).filter((item) => item?.label && item?.value);
  if (!entries.length) return <p className="cd-empty-note">Club information has not been published yet.</p>;
  return (
    <dl className="cd-info">
      {entries.map((item, index) => (
        <div key={`${item.label}-${index}`}>
          <dt>{item.label}</dt>
          <dd>
            {item.href
              ? <a href={item.href} target="_blank" rel="noreferrer">{item.value}</a>
              : item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function ClubAnnouncement({ item, lead = false }) {
  const [open, setOpen] = useState(false);
  const date = item.date || item.createdAt;
  const description = item.desc || item.body;
  const formattedDate = date && !Number.isNaN(new Date(date).valueOf())
    ? new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
    : null;

  const content = (
    <article className={`ann ${lead ? "ann--lead" : ""}`}>
      <div className="ann__top">
        {lead && <span className="ann__badge">Latest</span>}
        <span className="ann__club">{item.club || item.clubName || "Club announcement"}</span>
        {formattedDate && <time dateTime={new Date(date).toISOString()}>{formattedDate}</time>}
      </div>
      <h3>{item._id ? <Link to={`/announcements/${item._id}`}>{item.title}</Link> : item.title}</h3>
      {description && <p>{description}</p>}
      {open && item.more && <p className="ann__more">{item.more}</p>}
      {item.more && (
        <button type="button" className="link-btn" aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? "Show less" : "Read more"} <span aria-hidden="true">{open ? "−" : "→"}</span>
        </button>
      )}
    </article>
  );
  return content;
}

function EmptyState({ children = "Information has not been published yet." }) {
  return <p className="cd-empty-note">{children}</p>;
}

function Overview({ club, announcements, announcementError, goTo }) {
  const info = asArray(club.info);
  const defaultInfo = [
    { label: "Category", value: club.category },
    ...(club.executive ? [{ label: "Executive", value: club.executive }] : []),
  ];
  return (
    <>
      <p className="cd-lead">{club.description || "This club has not added an overview yet."}</p>
      <div className="cd-cols">
        <section>
          <h3 className="cd-h">Club information</h3>
          <InfoList items={info.length ? info : defaultInfo} />
        </section>
        <section>
          <h3 className="cd-h">Latest announcements</h3>
          {announcementError ? (
            <p role="alert">{announcementError}</p>
          ) : announcements.length ? (
            <div className="ann-list">
              {announcements.slice(0, 2).map((item, index) => (
                <ClubAnnouncement key={item._id || `${item.title}-${index}`} item={item} lead={index === 0} />
              ))}
            </div>
          ) : (
            <EmptyState>No announcements have been posted for this club yet.</EmptyState>
          )}
          {announcements.length > 2 && (
            <button type="button" className="link-btn" onClick={() => goTo("Announcements")}>
              View all <Arrow size={14} />
            </button>
          )}
        </section>
      </div>
    </>
  );
}

function Members({ members }) {
  const entries = asArray(members);
  if (!entries.length) return <EmptyState>Member profiles have not been published by this club.</EmptyState>;
  return (
    <ul className="cd-members">
      {entries.map((member, index) => (
        <li key={`${member.name || "member"}-${index}`}>
          <span className="cd-avatar" aria-hidden="true">{initials(member.name)}</span>
          <div>
            <strong>{member.name}</strong>
            <span>{[member.role, member.dept || member.department].filter(Boolean).join(" · ")}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

function Requirements({ requirements = {} }) {
  const joining = asArray(requirements.joining);
  return (
    <div className="cd-cols">
      <section>
        <h3 className="cd-h">How to join</h3>
        {joining.length ? (
          <ol className="cd-steps">
            {joining.map((step, index) => (
              <li key={`${step}-${index}`}><span>{String(index + 1).padStart(2, "0")}</span>{step}</li>
            ))}
          </ol>
        ) : (
          <EmptyState>Joining instructions have not been published yet.</EmptyState>
        )}
      </section>
      <div className="cd-stack">
        <List title="Who can join" items={requirements.who} />
        <List title="Eligibility" items={requirements.eligibility} />
        <List title="Conditions" items={requirements.conditions} />
      </div>
    </div>
  );
}

function Achievements({ items }) {
  const entries = asArray(items);
  if (!entries.length) return <EmptyState>Club achievements have not been published yet.</EmptyState>;
  return (
    <ol className="cd-timeline">
      {entries.map((item, index) => (
        <li key={`${item.title || "achievement"}-${index}`}>
          <span className="cd-year">{item.year}</span>
          <div><h3>{item.title}</h3><p>{item.desc || item.description}</p></div>
        </li>
      ))}
    </ol>
  );
}

function About({ about = {}, club }) {
  return (
    <>
      <p className="cd-lead">{about.history || club.description || "Club history has not been published yet."}</p>
      <div className="cd-cols">
        <section className="cd-block">
          <h3>Mission</h3>
          {about.mission ? <p>{about.mission}</p> : <EmptyState />}
        </section>
        <section className="cd-block">
          <h3>Vision</h3>
          {about.vision ? <p>{about.vision}</p> : <EmptyState />}
        </section>
      </div>
      <div className="cd-cols">
        <List title="Activities" items={about.activities} />
        <section className="cd-block">
          <h3>Contact</h3>
          <InfoList items={about.contact} />
        </section>
      </div>
    </>
  );
}

function Benefits({ items }) {
  const entries = asArray(items);
  if (!entries.length) return <EmptyState>Membership benefits have not been published yet.</EmptyState>;
  return (
    <ul className="cd-benefits">
      {entries.map((benefit, index) => (
        <li key={`${benefit.title || "benefit"}-${index}`} className="cd-block">
          <h3>{benefit.title}</h3>
          <p>{benefit.desc || benefit.description}</p>
        </li>
      ))}
    </ul>
  );
}

function Executives({ items }) {
  const entries = asArray(items);
  if (!entries.length) return <EmptyState>Executive profiles have not been published yet.</EmptyState>;
  return (
    <ul className="cd-members">
      {entries.map((member, index) => (
        <li key={`${member.name || "executive"}-${index}`}>
          <span className="cd-avatar" aria-hidden="true">{initials(member.name)}</span>
          <div>
            <strong>{member.position}</strong>
            <span>{[member.name, member.department, member.batch && `Batch ${member.batch}`].filter(Boolean).join(" · ")}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

function Membership({ club, slug }) {
  const fee = club.membership?.fee;
  return (
    <div className="cd-membership">
      <p className="cd-lead">
        {fee === undefined
          ? `Become a member of ${club.short || club.name}.`
          : `Become a member of ${club.short || club.name} for ৳${fee}${club.membership.period ? ` per ${club.membership.period}` : ""}.`}
      </p>
      <JoinClub club={club} slug={slug} />
      <p className="cd-membership__note">
        Confirm current membership requirements and fees with the official club executive.
        ClubX does not collect or verify payments.
      </p>
    </div>
  );
}

function ClubDetails() {
  const { slug } = useParams();
  const [club, setClub] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [approvedMembers, setApprovedMembers] = useState([]);
  const [announcementError, setAnnouncementError] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("Overview");
  const tabRefs = useRef({});

  useEffect(() => {
    let active = true;
    const controller = new AbortController();
    const fetchClub = async () => {
      setLoading(true);
      setError("");
      setAnnouncementError("");
      setClub(null);
      setAnnouncements([]);
      try {
        const query = new URLSearchParams({ clubId: slug });
        const announcementRequest = fetch(apiUrl(`announcements?${query}`), { signal: controller.signal })
          .then(async (announcementResponse) => {
            if (!announcementResponse.ok) {
              throw new Error(`Could not load club announcements (${announcementResponse.status}).`);
            }
            const records = await announcementResponse.json();
            if (!Array.isArray(records)) throw new Error("Announcement API returned an invalid response.");
            return { records };
          })
          .catch((announcementError) => ({ announcementError }));
        const response = await fetch(apiUrl(`clubs/${slug}`), { signal: controller.signal });
        if (!response.ok) {
          if (response.status === 404) throw new Error("Club not found.");
          throw new Error(`Could not load this club (${response.status}).`);
        }
        const clubData = await response.json();
        if (!active) return;
        setClub(clubData);
        setLoading(false);
        fetch(apiUrl(`memberships/club/${slug}/members`), { signal: controller.signal })
          .then(async (membersResponse) => {
            if (!membersResponse.ok) throw new Error("Could not load approved club members.");
            const memberData = await membersResponse.json();
            if (!Array.isArray(memberData)) throw new Error("Membership API returned an invalid response.");
            if (active) setApprovedMembers(memberData.map((member) => ({
              name: member.studentName,
              department: member.department,
              role: "Member",
            })));
          })
          .catch((membersError) => {
            if (membersError.name !== "AbortError") console.error(membersError);
          });

        announcementRequest.then(({ records, announcementError }) => {
          if (announcementError) throw announcementError;
          if (active) {
            const embedded = asArray(clubData.announcements);
            setAnnouncements(records.length ? records : embedded.map((item) => ({
              ...item,
              club: clubData.short || clubData.name,
            })));
          }
        }).catch((announcementFetchError) => {
          if (announcementFetchError.name === "AbortError") return;
          if (active) {
            console.error(announcementFetchError);
            const embedded = asArray(clubData.announcements);
            if (embedded.length) {
              setAnnouncements(embedded.map((item) => ({ ...item, club: clubData.short || clubData.name })));
            } else {
              setAnnouncementError(announcementFetchError.message || "Could not load club announcements.");
            }
          }
        });
      } catch (fetchError) {
        if (fetchError.name === "AbortError") return;
        if (active) setError(fetchError.message || "Could not load this club.");
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchClub();
    return () => { active = false; controller.abort(); };
  }, [slug]);

  const onKeyDown = (event) => {
    const currentIndex = TABS.indexOf(tab);
    const nextIndex = {
      ArrowRight: currentIndex + 1,
      ArrowLeft: currentIndex - 1,
      Home: 0,
      End: TABS.length - 1,
    }[event.key];
    if (nextIndex === undefined) return;
    event.preventDefault();
    const nextTab = TABS[(nextIndex + TABS.length) % TABS.length];
    setTab(nextTab);
    tabRefs.current[nextTab]?.focus();
  };

  if (loading) {
    return <><Navbar /><main className="wrap cd-loading" role="status">Loading club details...</main><Footer /></>;
  }

  if (!club || error) {
    return (
      <div className="club-page">
        <Navbar />
        <main className="wrap cd-missing" style={{ "--hue": 222 }}>
          <span className="eyebrow">{error === "Club not found." ? "404" : "Club"}</span>
          <h1>{error || "Club information is unavailable."}</h1>
          <Link to={{ pathname: "/", hash: "#clubs" }} className="btn btn--ghost">← Back to all clubs</Link>
        </main>
        <Footer />
      </div>
    );
  }

  const hue = getClubHue(club);
  const stats = asArray(club.stats).filter((stat) => stat?.label && stat?.value);
  const liveStats = stats.map((stat) =>
    stat.label.toLowerCase().includes("member") ? { ...stat, value: club.members ?? 0 } : stat
  );
  if (!liveStats.some((stat) => stat.label.toLowerCase().includes("member"))) {
    liveStats.unshift({ label: "Members", value: club.members ?? 0 });
  }
  const visibleStats = liveStats.length ? liveStats : [
    { label: "Members", value: club.members ?? 0 },
    { label: "Category", value: club.category || "Not specified" },
    ...(club.executive ? [{ label: "Executive", value: club.executive }] : []),
  ];

  return (
    <div className="club-page" style={{ "--hue": hue }}>
      <Navbar />
      <header className="cd-hero">
        <div className="cd-hero__glow" aria-hidden="true" />
        {club.image && <img className="cd-hero__image" src={club.image} alt="" />}
        <div className="wrap">
          <nav className="cd-crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to={{ pathname: "/", hash: "#clubs" }}>Clubs</Link>
            <span aria-hidden="true">/</span>
            <span>{club.category || "Club"}</span>
          </nav>
          <span className="cd-kicker">{club.category || "Club"} · Official Page</span>
          <h1 className="cd-title">{club.short || club.name}</h1>
          <p className="cd-name">{club.name}</p>
          {club.tagline && <p className="cd-tagline">“{club.tagline}”</p>}
          <div className="cd-actions">
            <JoinClub club={club} slug={slug} />
            <Link to="/events" className="btn btn--ghost btn--lg">Explore Events</Link>
          </div>
          <dl className="cd-stats">
            {visibleStats.map((stat, index) => (
              <div key={`${stat.label}-${index}`}><dt>{stat.label}</dt><dd>{stat.value}</dd></div>
            ))}
          </dl>
        </div>
      </header>

      <div className="cd-tabbar">
        <div className="wrap">
          <div className="cd-tabs" role="tablist" aria-label="Club sections" onKeyDown={onKeyDown}>
            {TABS.map((item) => (
              <button
                key={item}
                ref={(element) => { tabRefs.current[item] = element; }}
                id={`tab-${tabId(item)}`}
                role="tab"
                type="button"
                aria-selected={item === tab}
                aria-controls={`panel-${tabId(item)}`}
                tabIndex={item === tab ? 0 : -1}
                className={item === tab ? "is-active" : ""}
                onClick={() => setTab(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main
        className="wrap cd-body"
        role="tabpanel"
        id={`panel-${tabId(tab)}`}
        aria-labelledby={`tab-${tabId(tab)}`}
        key={tab}
      >
        {tab === "Overview" && (
          <Overview club={club} announcements={announcements} announcementError={announcementError} goTo={setTab} />
        )}
        {tab === "Announcements" && (
          announcementError && !announcements.length
            ? <p role="alert">{announcementError}</p>
            : announcements.length
              ? <div className="ann-list ann-list--wide">
                {announcements.map((item, index) => (
                  <ClubAnnouncement key={item._id || `${item.title}-${index}`} item={item} lead={index === 0} />
                ))}
              </div>
              : <EmptyState>No announcements have been posted for this club yet.</EmptyState>
        )}
        {tab === "Members" && <Members members={approvedMembers.length ? approvedMembers : club.memberProfiles} />}
        {tab === "Requirements" && <Requirements requirements={club.requirements} />}
        {tab === "Achievements" && <Achievements items={club.achievements} />}
        {tab === "About" && <About about={club.about} club={club} />}
        {tab === "Benefits" && <Benefits items={club.benefits} />}
        {tab === "Executives" && <Executives items={club.executives} />}
        {tab === "Membership" && <Membership club={club} slug={slug} />}
      </main>
      <Footer />
    </div>
  );
}

export default ClubDetails;
