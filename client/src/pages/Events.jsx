import React, { useEffect, useState } from 'react';
import { Calendar } from 'lucide-react';
import EventCard from '../components/common/EventCard';
import { eventsApi } from '../api';
import './Events.css';

const CATEGORIES = ['All', 'General', 'Sports', 'Cultural', 'PTA', 'Graduation'];

export default function Events() {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    eventsApi.getPublic().then(data => { setEvents(data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const filtered = filter === 'All' ? events : events.filter(e => e.category === filter);

  return (
    <div className="events-page page-with-hero-gap">
      <div className="page-header">
        <div className="container">
          <p className="eyebrow">School Calendar</p>
          <h1>Events & Activities</h1>
          <p className="page-header__sub">Stay up to date with what's happening at Alwaarith</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="events__filters">
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setFilter(c)} className={`events__filter-btn${filter === c ? ' events__filter-btn--active' : ''}`}>
                {c}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="events__loading"><div className="spinner" /> Loading events…</div>
          ) : filtered.length > 0 ? (
            <div className="events__grid">
              {filtered.map(e => <EventCard key={e.id} event={e} />)}
            </div>
          ) : (
            <div className="events__empty">
              <Calendar size={48} />
              <h3>No events found</h3>
              <p>Check back soon for upcoming school events.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
