import { Link } from "react-router-dom";
import { Arrow } from "./Icons";

function EventCard({ event }) {
  const taken = event.registered || 0;
  const total = event.total || 50;
  const pct = Math.round((taken / total) * 100);

  
  const dateParts = event.date ? event.date.split(" ") : ["01", "Jan", "2026"];
  const day = dateParts[0] || "01";
  const month = dateParts[1] || "Jan";

  return (
    <article className="ev" data-reveal>

      <time className="ev__date">
        <span className="ev__day">{day}</span>
        <span className="ev__month">{month}</span>
      </time>

      <div className="ev__main">
        <span className="ev__club">{event.category || "Club Event"}</span>
        <h3>{event.title}</h3>
        <p>{event.description}</p>
        
        <dl className="ev__meta">
          <div><dt>Time</dt><dd>{event.time}</dd></div>
          <div><dt>Location</dt><dd>{event.venue}</dd></div>
          <div>
            <dt>Seats</dt>
            <dd>
              {taken} / {total}
              <span className="ev__bar" role="presentation">
                <i style={{ width: `${pct}%` }} />
              </span>
            </dd>
          </div>
        </dl>

        <Link
          to={`/events/${event._id}`}
          className="btn btn--sm btn--ghost"
        >
          View Details <Arrow />
        </Link>
      </div>

      <Link to={`/events/${event._id}`} className="ev__thumb">
        <img 
          src={event.src || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600"} 
          alt={`${event.title} poster`} 
          loading="lazy" 
        />
      </Link>

    </article>
  );
}

export default EventCard;