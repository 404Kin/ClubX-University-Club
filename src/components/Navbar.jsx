import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SearchIcon, MenuIcon } from "./Icons";
import {
  FaUser,
  FaSignOutAlt,
  FaTachometerAlt,
  FaChevronDown,
} from "react-icons/fa";

const LINKS = [
  { id: "clubs", label: "Clubs", type: "section" },
  { id: "events", label: "Events", type: "page", path: "/events" },
  { id: "announcements", label: "Announcements", type: "section" },
];

function Navbar() {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState("");
  const [user, setUser] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Load logged-in user
  useEffect(() => {
    const stored = localStorage.getItem("clubx_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        setUser(null);
      }
    }
  }, [pathname]); // re-check on every route change

  // Smooth scroll to section on home
  useEffect(() => {
    if (!isHome || !hash) return;
    const id = hash.replace("#", "");
    const t = setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
    return () => clearTimeout(t);
  }, [isHome, hash]);

  // Scroll listener
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      if (window.scrollY < 200) setSection("");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Section observer
  useEffect(() => {
    if (!isHome || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setSection(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    LINKS.filter((l) => l.type === "section").forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [isHome]);

  // Close user dropdown on outside click
  useEffect(() => {
    const onClick = (e) => {
      if (!e.target.closest(".nav-user")) setUserMenuOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const active = isHome
    ? section
    : pathname.startsWith("/clubs")
    ? "clubs"
    : pathname === "/events"
    ? "events"
    : "";

  const close = () => setOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("clubx_user");
    setUser(null);
    setUserMenuOpen(false);
    close();
    navigate("/login");
  };

  const getDashboardPath = () => {
    if (!user) return "/login";
    if (user.role === "admin") return "/dashboard/admin";
    if (user.role === "executive") return "/dashboard/executive";
    return "/dashboard/student";
  };

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "";

  return (
    <header
      className={`nav ${scrolled ? "is-scrolled" : ""} ${
        open ? "is-open" : ""
      }`}
    >
      <div className="nav__inner">
        <Link
          to="/"
          className="nav__brand"
          aria-label="ClubX home"
          onClick={close}
        >
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

          {/* Dashboard link (mobile — in mobile menu) */}
          {user && (
            <Link
              to={getDashboardPath()}
              className="nav__mobile-dash"
              onClick={close}
            >
              <FaTachometerAlt /> Dashboard
            </Link>
          )}
        </nav>

        <div className="nav__actions">
          <Link
            to={{ pathname: "/", hash: "#search" }}
            className="nav__icon"
            aria-label="Search clubs"
            onClick={close}
          >
            <SearchIcon />
          </Link>

          {/* ============ LOGGED OUT ============ */}
          {!user && (
            <Link to="/login" className="nav__login" onClick={close}>
              Log in
            </Link>
          )}

          {/* ============ LOGGED IN ============ */}
          {user && (
            <div className="nav-user">
              <button
                type="button"
                className="nav-user__btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setUserMenuOpen(!userMenuOpen);
                }}
                aria-expanded={userMenuOpen}
              >
                <span className="nav-user__avatar">{initials}</span>
                <span className="nav-user__name">
                  {user.name?.split(" ")[0]}
                </span>
                <FaChevronDown className="nav-user__chev" />
              </button>

              {userMenuOpen && (
                <div className="nav-user__menu">
                  <div className="nav-user__head">
                    <span className="nav-user__avatar lg">{initials}</span>
                    <div>
                      <strong>{user.name}</strong>
                      <small>{user.email}</small>
                      <span className={`nav-user__role ${user.role}`}>
                        {user.role}
                      </span>
                    </div>
                  </div>

                  <Link
                    to={getDashboardPath()}
                    className="nav-user__item"
                    onClick={() => {
                      setUserMenuOpen(false);
                      close();
                    }}
                  >
                    <FaTachometerAlt /> Dashboard
                  </Link>

                  <button
                    type="button"
                    className="nav-user__item danger"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt /> Log out
                  </button>
                </div>
              )}
            </div>
          )}

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