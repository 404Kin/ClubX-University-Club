

import { useState } from "react";
import { Link } from "react-router-dom";
import { Arrow, Check } from "./Icons";

function EventCard({ event }) {
  const [going, setGoing] = useState(false);
  const [taken, total] = event.seats;
  const pct = Math.round((taken / total) * 100);

  return (
    <article className="ev" data-reveal>

      <time className="ev__date" dateTime={`${event.year}-${event.month}-${event.day}`}>
        <span className="ev__day">{event.day}</span>
        <span className="ev__month">{event.month}</span>
      </time>

      <div className="ev__main">
        <span className="ev__club">{event.club}</span>
        <h3>{event.title}</h3>
        <p>{event.desc}</p>
        <dl className="ev__meta">
          <div><dt>Time</dt><dd>{event.time}</dd></div>
          <div><dt>Location</dt><dd>{event.place}</dd></div>
          <div>
            <dt>Seats</dt>
            <dd>
              {taken} / {total}
              <span className="ev__bar" role="presentation"><i style={{ width: `${pct}%` }} /></span>
            </dd>
          </div>
        </dl>

        {/* View Details → Link to detail page */}
        <Link
          to={`/events/${event.id}`}
          className="btn btn--sm btn--ghost"
        >
          View Details <Arrow />
        </Link>
      </div>

      <Link to={`/events/${event.id}`} className="ev__thumb">
        <img src={event.src} alt={`${event.title} poster`} loading="lazy" />
      </Link>

    </article>
  );
}

export default EventCard;