import { Link } from "react-router-dom";
import { Arrow } from "./Icons";

function JoinClub({ club, slug }) {
  return (
    <Link to={`/clubs/${slug}/join`} className="btn btn--primary btn--lg join__btn" aria-label={`Become a member of ${club.short}`}>
      Become a Member <Arrow />
    </Link>
  );
}

export default JoinClub;
