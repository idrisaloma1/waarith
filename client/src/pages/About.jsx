import React from 'react';
import { Eye, Target, Award, Users, BookOpen, Heart } from 'lucide-react';
import './About.css';

const TEAM = [
  { name: 'Mrs. Fatima Al-Hassan', role: 'School Principal', initials: 'FA' },
  { name: 'Mr. Ibrahim Sule', role: 'Head of Academics', initials: 'IS' },
  { name: 'Mrs. Aisha Bello', role: 'Head of Nursery', initials: 'AB' },
  { name: 'Mr. Chukwuemeka Obi', role: 'Sports Coordinator', initials: 'CO' },
];

export default function About({ school }) {
  const s = school || {};
  return (
    <div className="about page-with-hero-gap">
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <p className="eyebrow">Get to Know Us</p>
          <h1>About Our School</h1>
          <p className="page-header__sub">A legacy of excellence in education since {s.founded || 2005}</p>
        </div>
      </div>

      {/* About Content */}
      <section className="section">
        <div className="container about__grid">
          <div className="about__text">
            <p className="eyebrow">Our Story</p>
            <h2 className="section-title">Who We Are</h2>
            <p className="about__body">{s.about || 'Alwaarith Nursery & Primary School was founded with a singular vision — to provide world-class education that is accessible, nurturing, and rooted in the values that build great human beings. Over the years, we have grown into one of the leading schools in FCT Abuja, trusted by hundreds of families.'}</p>
            <p className="about__body">Our team of passionate educators works tirelessly to ensure every student not only meets academic benchmarks but develops the character, creativity, and confidence to thrive in a rapidly changing world.</p>
            <div className="about__stats">
              <div className="about__stat"><span>{new Date().getFullYear() - (s.founded || 2005)}</span> Years of Excellence</div>
              <div className="about__stat"><span>{s.students || 450}+</span> Students</div>
              <div className="about__stat"><span>{s.teachers || 32}+</span> Teachers</div>
            </div>
          </div>
          <div className="about__visual">
            <div className="about__img-placeholder">
              <div className="about__img-inner">
                <BookOpen size={48} />
                <p>School Gallery</p>
                <small>Add your school photos here</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section about__vm" style={{ background: 'var(--gray-50)' }}>
        <div className="container">
          <div className="about__vm-grid">
            <div className="about__vm-card about__vm-card--vision">
              <div className="about__vm-icon"><Eye size={24} /></div>
              <h3>Our Vision</h3>
              <p>{s.vision || "To be the foremost institution for holistic child development in Nigeria \u2014 where every child's potential is discovered, nurtured, and celebrated."}</p>
            </div>
            <div className="about__vm-card about__vm-card--mission">
              <div className="about__vm-icon"><Target size={24} /></div>
              <h3>Our Mission</h3>
              <p>{s.mission || 'Providing an engaging, inclusive, and values-based education that prepares every child for lifelong success — academically, morally, and socially.'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '3rem' }}>
            <p className="eyebrow">What We Stand For</p>
            <h2 className="section-title">Our Core Values</h2>
          </div>
          <div className="about__values-grid">
            {[
              { icon: <BookOpen size={20} />, title: 'Excellence', desc: 'We hold high standards in academics, character, and all endeavours.' },
              { icon: <Heart size={20} />, title: 'Compassion', desc: 'We treat every child and family with warmth, respect, and genuine care.' },
              { icon: <Users size={20} />, title: 'Community', desc: 'We are a family — students, teachers, and parents, working together.' },
              { icon: <Award size={20} />, title: 'Integrity', desc: 'We model honesty, fairness, and ethical conduct in all we do.' },
            ].map((v, i) => (
              <div key={i} className="about__value-item">
                <div className="about__value-icon">{v.icon}</div>
                <div>
                  <h4>{v.title}</h4>
                  <p>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section about__team" style={{ background: 'var(--blue-900)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '3rem' }}>
            <p className="eyebrow" style={{ color: 'rgba(244,161,0,.9)' }}>The People Behind the School</p>
            <h2 style={{ color: 'white' }}>Meet Our Leadership</h2>
          </div>
          <div className="about__team-grid">
            {TEAM.map((m, i) => (
              <div key={i} className="about__team-card">
                <div className="about__team-avatar">{m.initials}</div>
                <h4 className="about__team-name">{m.name}</h4>
                <p className="about__team-role">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
