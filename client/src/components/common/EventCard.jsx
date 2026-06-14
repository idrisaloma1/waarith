import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import './EventCard.css';

const CATEGORY_COLORS = {
  General: 'badge-blue', Sports: 'badge-green', Cultural: 'badge-gold',
  PTA: 'badge-blue', Graduation: 'badge-gold',
};

export default function EventCard({ event }) {
  const date = new Date(event.date);
  const day = date.toLocaleDateString('en-GB', { day: '2-digit' });
  const month = date.toLocaleDateString('en-GB', { month: 'short' });
  const year = date.getFullYear();

  return (
    <div className="event-card card">
      <div className="event-card__date-block">
        <span className="event-card__day">{day}</span>
        <span className="event-card__month">{month}</span>
        <span className="event-card__year">{year}</span>
      </div>
      <div className="event-card__body">
        <span className={`badge ${CATEGORY_COLORS[event.category] || 'badge-blue'}`}>{event.category}</span>
        <h3 className="event-card__title">{event.title}</h3>
        <p className="event-card__desc">{event.description}</p>
        <div className="event-card__meta">
          <span><Clock size={13} /> {event.time}</span>
          <span><MapPin size={13} /> {event.location}</span>
        </div>
      </div>
    </div>
  );
}
