import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Award, Heart, ArrowRight, CheckCircle, ExternalLink } from 'lucide-react';
import Hero from '../components/sections/Hero';
import EventCard from '../components/common/EventCard';
import { eventsApi } from '../api';
import './Home.css';

const VALUES = [
  { icon: <BookOpen size={22} />, title: 'Academic Excellence', desc: 'A rigorous, engaging curriculum that nurtures critical thinkers and lifelong learners.' },
  { icon: <Heart size={22} />, title: 'Values & Character', desc: 'We build integrity, empathy, and responsibility in every child.' },
  { icon: <Users size={22} />, title: 'Inclusive Community', desc: 'A welcoming environment where every child belongs and every family is heard.' },
  { icon: <Award size={22} />, title: 'Holistic Development', desc: 'Sports, arts, and enrichment activities that shape well-rounded individuals.' },
];

const PROGRAMMES = [
  { level: 'Nursery 1 & 2', ages: 'Ages 2–4', desc: 'Play-based discovery, early language, numeracy, and social skills in a warm nurturing space.', color: '#FDF3DC', accent: '#F4A100' },
  { level: 'Kindergarten', ages: 'Ages 4–6', desc: 'Structured learning through creative exploration, preparing children for formal schooling.', color: '#E8F0FB', accent: '#1B4F8A' },
  { level: 'Primary 1–3', ages: 'Ages 6–9', desc: 'Core literacy, numeracy, science and social studies building strong academic foundations.', color: '#E8F5EE', accent: '#2E7D52' },
  { level: 'Primary 4–6', ages: 'Ages 9–12', desc: 'Advanced subjects, critical thinking and leadership skills preparing for secondary school.', color: '#F3E8FF', accent: '#6B21A8' },
];

export default function Home({ school }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    eventsApi.getPublic().then(data => setEvents(data.slice(0, 3))).catch(() => {});
  }, []);

  return (
    <div className="home">
      <Hero school={school} />

      {/* Why Choose Us */}
      <section className="section home__why">
        <div className="container">
          <div className="home__section-head text-center">
            <p className="eyebrow">Why Choose Us</p>
            <h2 className="section-title">Education That Transforms</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              At Alwaarith, we believe every child carries a spark of brilliance. Our role is to fan that flame.
            </p>
          </div>
          <div className="home__values-grid">
            {VALUES.map((v, i) => (
              <div key={i} className="home__value-card fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="home__value-icon">{v.icon}</div>
                <h3 className="home__value-title">{v.title}</h3>
                <p className="home__value-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programmes */}
      <section className="section home__programmes" style={{ background: 'var(--gray-50)' }}>
        <div className="container">
          <div className="home__section-head text-center">
            <p className="eyebrow">Academic Programmes</p>
            <h2 className="section-title">A Place to Grow at Every Stage</h2>
          </div>
          <div className="home__prog-grid">
            {PROGRAMMES.map((p, i) => (
              <div key={i} className="home__prog-card card" style={{ '--prog-color': p.color, '--prog-accent': p.accent }}>
                <div className="home__prog-header">
                  <span className="home__prog-level">{p.level}</span>
                  <span className="home__prog-ages">{p.ages}</span>
                </div>
                <p className="home__prog-desc">{p.desc}</p>
                <Link to="/academics" className="btn btn-ghost home__prog-link">
                  Learn more <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portal CTA */}
      <section className="home__portal-cta">
        <div className="container home__portal-inner">
          <div>
            <p className="eyebrow">Powered by EduTec</p>
            <h2 className="home__portal-title">Everything You Need, All in One Place</h2>
            <p className="home__portal-desc">
              Our integrated school management portal gives parents, students, and teachers instant access to results, timetables, fee payments, and communications — anytime, anywhere.
            </p>
            <ul className="home__portal-features">
              {['Student results & report cards', 'Fee payment & receipts', 'Attendance tracking', 'Teacher-parent messaging', 'Timetable & class schedules', 'Library & e-learning resources'].map(f => (
                <li key={f}><CheckCircle size={15} /> {f}</li>
              ))}
            </ul>
            <a href={school?.portalUrl || '#'} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ marginTop: '1.75rem' }}>
              <ExternalLink size={15} /> Access the Portal
            </a>
          </div>
          <div className="home__portal-visual">
            <div className="home__portal-mock">
              <div className="home__mock-bar">
                <span/><span/><span/>
              </div>
              <div className="home__mock-content">
                <div className="home__mock-stat">
                  <span className="home__mock-stat-val">94%</span>
                  <span className="home__mock-stat-label">Attendance This Term</span>
                </div>
                <div className="home__mock-stat">
                  <span className="home__mock-stat-val">A</span>
                  <span className="home__mock-stat-label">Latest Report Grade</span>
                </div>
                <div className="home__mock-row">
                  <div className="home__mock-pill">Mathematics · 88%</div>
                  <div className="home__mock-pill">English · 91%</div>
                  <div className="home__mock-pill">Science · 85%</div>
                </div>
                <div className="home__mock-label">EduTec School Portal</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="section home__events">
        <div className="container">
          <div className="home__events-head">
            <div>
              <p className="eyebrow">What's On</p>
              <h2 className="section-title">Upcoming Events</h2>
            </div>
            <Link to="/events" className="btn btn-blue home__events-all">
              View all events <ArrowRight size={15} />
            </Link>
          </div>
          {events.length > 0 ? (
            <div className="home__events-grid">
              {events.map(e => <EventCard key={e.id} event={e} />)}
            </div>
          ) : (
            <p style={{ color: 'var(--gray-400)', textAlign: 'center', padding: '3rem 0' }}>No upcoming events. Check back soon.</p>
          )}
        </div>
      </section>

      {/* Admissions CTA */}
      <section className="home__admissions-cta">
        <div className="container text-center">
          <p className="eyebrow" style={{ color: 'rgba(244,161,0,.9)' }}>Join the Alwaarith Family</p>
          <h2 style={{ color: 'white', marginBottom: '1rem' }}>Begin Your Child's Journey Today</h2>
          <p style={{ color: 'rgba(255,255,255,.7)', maxWidth: '500px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
            Applications are open for the new academic session. Give your child the gift of a world-class education.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/admissions" className="btn btn-primary">
              Apply Now <ArrowRight size={15} />
            </Link>
            <Link to="/contact" className="btn btn-outline">
              Book a School Tour
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
