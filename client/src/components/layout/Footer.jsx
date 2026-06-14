import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube, ExternalLink } from 'lucide-react';
import './Footer.css';

export default function Footer({ school }) {
  const s = school || {};
  return (
    <footer className="footer">
      <div className="footer__wave">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none"><path d="M0,30 C360,60 1080,0 1440,30 L1440,0 L0,0 Z" fill="white"/></svg>
      </div>
      <div className="container footer__grid">
        <div className="footer__brand">
          <div className="footer__logo">
            <GraduationCap size={20} />
          </div>
          <h3 className="footer__school-name">{s.name || 'Alwaarith School'}</h3>
          <p className="footer__tagline">{s.tagline || 'Nurturing Minds, Shaping Futures'}</p>
          <div className="footer__socials">
            <a href="#" aria-label="Facebook"><Facebook size={16} /></a>
            <a href="#" aria-label="Twitter"><Twitter size={16} /></a>
            <a href="#" aria-label="Instagram"><Instagram size={16} /></a>
            <a href="#" aria-label="YouTube"><Youtube size={16} /></a>
          </div>
        </div>

        <div className="footer__col">
          <h4 className="footer__col-title">Quick Links</h4>
          <ul className="footer__links">
            {[['/', 'Home'], ['/about', 'About Us'], ['/academics', 'Academics'], ['/admissions', 'Admissions'], ['/events', 'Events'], ['/contact', 'Contact']].map(([to, label]) => (
              <li key={to}><Link to={to}>{label}</Link></li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="footer__col-title">Programmes</h4>
          <ul className="footer__links">
            {(s.programs || ['Nursery 1 & 2', 'Kindergarten', 'Primary 1–3', 'Primary 4–6']).map(p => <li key={p}><span>{p}</span></li>)}
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="footer__col-title">Contact</h4>
          <ul className="footer__contact">
            <li><MapPin size={14} /> <span>{s.address || 'Abuja, FCT, Nigeria'}</span></li>
            <li><Phone size={14} /> <a href={`tel:${s.phone}`}>{s.phone || '+234 800 000 0000'}</a></li>
            <li><Mail size={14} /> <a href={`mailto:${s.email}`}>{s.email || 'info@alwaarithschool.edu'}</a></li>
          </ul>
          <a href={s.portalUrl || '#'} target="_blank" rel="noreferrer" className="footer__portal-btn">
            <ExternalLink size={13} /> Access Student Portal
          </a>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container">
          <span>© {new Date().getFullYear()} {s.name || 'Alwaarith School'}. All rights reserved.</span>
          <span>Powered by <strong>EduTec</strong></span>
        </div>
      </div>
    </footer>
  );
}
