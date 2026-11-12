import { Link } from "react-router-dom";
import { Arrow } from "./Icons";
import { getClubHue } from "../lib/clubPresentation";

function ClubPreview({ club }) {
  const name = club.short || club.name || "Club";
  const body = (
    <>
      <span className="preview__mark" aria-hidden="true">{name.slice(0, 2)}</span>
      <span className="preview__text">
        <span className="preview__name">{name}</span>
        <span className="preview__meta">{club.category}</span>
        {club.tagline && <span className="preview__more"><span>{club.tagline}</span></span>}
      </span>
      <Arrow />
    </>
  );
  const style = { "--hue": getClubHue(club) };
  return (
    <li>
      <Link to={`/clubs/${club._id}`} className="preview" style={style}>
        {body}
      </Link>
    </li>
  );
}

export default ClubPreview;
