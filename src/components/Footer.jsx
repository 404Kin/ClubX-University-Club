import { Link, useLocation, useNavigate } from "react-router-dom";
import { Arrow } from "./Icons";

function Footer() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const goToSection = (e, id) => {
    e.preventDefault();

    const scroll = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    if (pathname === "/") {
      // Already home — just update the hash and scroll
      navigate({ pathname: "/", hash: `#${id}` }, { replace: true });
      scroll();
    } else {
      // Go home first; the Navbar/Home hash effect will scroll once mounted
      navigate({ pathname: "/", hash: `#${id}` });
    }
  };

  return (
    <footer className="footer">
      <div className="wrap footer__cta">
        <h2>Ready to find your people?</h2>
        <a
          href="#clubs"
          className="btn btn--primary"
          onClick={(e) => goToSection(e, "clubs")}
        >
          Explore Clubs <Arrow />
        </a>
      </div>

      <div className="wrap footer__bar">
        <Link to="/" className="nav__brand">Club<span>X</span></Link>

        <nav aria-label="Footer">
          <a href="#clubs" onClick={(e) => goToSection(e, "clubs")}>Clubs</a>
          <Link to="/events">Events</Link>
          <Link to="/announcements">Announcements</Link>
          <Link to="/login">Log in</Link>
        </nav>

        <p>© {new Date().getFullYear()} ClubX · University Club Management</p>
      </div>
    </footer>
  );
}

export default Footer;