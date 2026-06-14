import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, ChevronDown } from 'lucide-react';
import './Hero.css';

export default function Hero({ school }) {
  const s = school || {};
  return (
    <section className="hero">
      <div className="hero__bg">
        <div className="hero__pattern" />
        <div className="hero__overlay" />
      </div>

      <div className="container hero__content">
        <div className="hero__text fade-up">
          <span className="eyebrow" style={{ color: 'rgba(244,161,0,0.9)' }}>Est. {s.founded || 2005} · Abuja, Nigeria</span>
          <h1 className="hero__title">
            {s.name || 'Alwaarith Nursery & Primary School'}
          </h1>
          <p className="hero__subtitle">{s.tagline || 'Nurturing Minds, Shaping Futures'}</p>
          <p className="hero__desc">
            A premier learning environment where every child is inspired to discover, grow, and lead. Quality education rooted in strong values.
          </p>
          <div className="hero__actions">
            <Link to="/admissions" className="btn btn-primary hero__cta">
              Apply for Admission <ArrowRight size={16} />
            </Link>
            <a href={s.portalUrl || '#'} target="_blank" rel="noreferrer" className="btn btn-outline">
              <ExternalLink size={15} /> Student Portal
            </a>
          </div>
        </div>

        <div className="hero__stats fade-up" style={{ animationDelay: '0.2s' }}>
          <div className="hero__stat-card">
            <span className="hero__stat-num">{s.students || 450}+</span>
            <span className="hero__stat-label">Students Enrolled</span>
          </div>
          <div className="hero__stat-card">
            <span className="hero__stat-num">{s.teachers || 32}+</span>
            <span className="hero__stat-label">Qualified Teachers</span>
          </div>
          <div className="hero__stat-card">
            <span className="hero__stat-num">{new Date().getFullYear() - (s.founded || 2005)}+</span>
            <span className="hero__stat-label">Years of Excellence</span>
          </div>
          <div className="hero__stat-card">
            <span className="hero__stat-num">{(s.programs || []).length || 3}</span>
            <span className="hero__stat-label">Academic Programmes</span>
          </div>
        </div>
      </div>

      <div className="hero__scroll-hint">
        <span>Scroll to explore</span>
        <ChevronDown size={16} />
      </div>
    </section>
  );
}
