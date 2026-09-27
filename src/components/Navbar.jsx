
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { SearchIcon, MenuIcon } from "./Icons";

const LINKS = [
  { id: "clubs", label: "Clubs", type: "section" },
  { id: "events", label: "Events", type: "page", path: "/events" },
  { id: "announcements", label: "Announcements", type: "section" },
];

function Navbar() {
  const { pathname, hash } = useLocation();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState("");

  // 1) scroll to hash whenever hash changes (works on same-page and cross-page)
  useEffect(() => {
    if (!isHome || !hash) return;
    const id = hash.replace("#", "");
    // wait for the section to be in the DOM
    const t = setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
    return () => clearTimeout(t);
  }, [isHome, hash]);

  // 2) header scroll state
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      if (window.scrollY < 200) setSection("");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 3) active section via IntersectionObserver
  useEffect(() => {
    if (!isHome || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setSection(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    LINKS.filter((l) => l.type === "section").forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [isHome]);

  const active = isHome
    ? section
    : pathname.startsWith("/clubs")
    ? "clubs"
    : pathname === "/events"
    ? "events"
    : "";

  const close = () => setOpen(false);

  return (
    <header className={`nav ${scrolled ? "is-scrolled" : ""} ${open ? "is-open" : ""}`}>
      <div className="nav__inner">
        <Link to="/" className="nav__brand" aria-label="ClubX home" onClick={close}>
          Club<span>X</span>
        </Link>

        <nav id="primary-nav" className="nav__links" aria-label="Primary">
          {LINKS.map((l) => {
            const isPageLink = l.type === "page";
            const isActive = isPageLink ? pathname === l.path : active === l.id;

            return (
              <Link
                key={l.id}
                to={isPageLink ? l.path : { pathname: "/", hash: `#${l.id}` }}
                className={isActive ? "is-active" : ""}
                aria-current={isActive ? "true" : undefined}
                onClick={close}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="nav__actions">
          <Link to={{ pathname: "/", hash: "#search" }} className="nav__icon" aria-label="Search clubs" onClick={close}>
            <SearchIcon />
          </Link>
          <Link to="/login" className="nav__login" onClick={close}>Log in</Link>
          <button
            type="button"
            className="nav__toggle"
            aria-expanded={open}
            aria-controls="primary-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;