import React from 'react';
import { BookOpen, Music, Palette, Dumbbell, Globe, Cpu } from 'lucide-react';
import './Academics.css';

const PROGRAMMES = [
  { level: 'Nursery 1 & 2', ages: '2–4 years', subjects: ['Language Development', 'Numbers & Shapes', 'Creative Arts', 'Social Skills', 'Physical Play'], color: 'var(--gold-light)', accent: 'var(--gold)' },
  { level: 'Kindergarten', ages: '4–6 years', subjects: ['Early Literacy', 'Pre-Mathematics', 'Environmental Studies', 'Music & Movement', 'ICT Introduction'], color: 'var(--blue-100)', accent: 'var(--blue-800)' },
  { level: 'Primary 1–3', ages: '6–9 years', subjects: ['English Language', 'Mathematics', 'Basic Science', 'Social Studies', 'Civic Education', 'Cultural & Creative Arts'], color: 'var(--green-light)', accent: 'var(--green)' },
  { level: 'Primary 4–6', ages: '9–12 years', subjects: ['English Language', 'Mathematics', 'Basic Science & Technology', 'Social Studies', 'Agricultural Science', 'French Language', 'Computer Studies'], color: '#F3E8FF', accent: '#6B21A8' },
];

const ACTIVITIES = [
  { icon: <Music size={22} />, name: 'Music & Choir' },
  { icon: <Palette size={22} />, name: 'Art & Craft' },
  { icon: <Dumbbell size={22} />, name: 'Sports & Athletics' },
  { icon: <Globe size={22} />, name: 'Debate Club' },
  { icon: <Cpu size={22} />, name: 'STEM Club' },
  { icon: <BookOpen size={22} />, name: 'Reading Club' },
];

export default function Academics() {
  return (
    <div className="academics-page page-with-hero-gap">
      <div className="page-header">
        <div className="container">
          <p className="eyebrow">What We Teach</p>
          <h1>Academics</h1>
          <p className="page-header__sub">A rigorous, engaging curriculum from nursery through to primary school</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '3rem' }}>
            <p className="eyebrow">Our Curriculum</p>
            <h2 className="section-title">Programmes We Offer</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>Each programme is carefully designed to match the developmental stage of the child.</p>
          </div>
          <div className="academics__prog-grid">
            {PROGRAMMES.map((p, i) => (
              <div key={i} className="academics__prog-card" style={{ background: p.color, borderTop: `4px solid ${p.accent}` }}>
                <div className="academics__prog-header">
                  <h3 className="academics__prog-level">{p.level}</h3>
                  <span className="badge" style={{ background: p.accent + '20', color: p.accent }}>{p.ages}</span>
                </div>
                <ul className="academics__subject-list">
                  {p.subjects.map(s => <li key={s}><span className="academics__dot" style={{ background: p.accent }} />{s}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section academics__approach" style={{ background: 'var(--blue-900)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '3rem' }}>
            <p className="eyebrow" style={{ color: 'rgba(244,161,0,.9)' }}>How We Teach</p>
            <h2 style={{ color: 'white' }}>Our Teaching Approach</h2>
          </div>
          <div className="academics__approach-grid">
            {[
              { title: 'Child-Centred Learning', desc: 'Every lesson is designed around the needs, interests, and pace of the child.' },
              { title: 'Project-Based Activities', desc: 'Students explore real-world problems through collaborative projects and research.' },
              { title: 'Technology Integration', desc: 'Smart classrooms and computer labs make learning interactive and future-ready.' },
              { title: 'Regular Assessment', desc: 'Continuous assessment and detailed report cards keep parents fully informed.' },
              { title: 'Character Education', desc: 'Values, responsibility, and leadership are woven into every aspect of school life.' },
              { title: 'Mother Tongue Literacy', desc: 'Hausa and English instruction ensures strong bilingual foundations.' },
            ].map((a, i) => (
              <div key={i} className="academics__approach-card">
                <span className="academics__approach-num">0{i + 1}</span>
                <h4>{a.title}</h4>
                <p>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '2.5rem' }}>
            <p className="eyebrow">Beyond the Classroom</p>
            <h2 className="section-title">Co-curricular Activities</h2>
          </div>
          <div className="academics__activities-grid">
            {ACTIVITIES.map((a, i) => (
              <div key={i} className="academics__activity-card">
                <div className="academics__activity-icon">{a.icon}</div>
                <span>{a.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
