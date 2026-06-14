import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, GraduationCap, ExternalLink } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/academics', label: 'Academics' },
  { to: '/admissions', label: 'Admissions' },
  { to: '/events', label: 'Events' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar({ school }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => { setOpen(false); }, [location]);

  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <Link to="/" className="navbar__brand">
          <div className="navbar__logo-icon">
            <GraduationCap size={22} />
          </div>
          <div className="navbar__brand-text">
            <span className="navbar__name">{school?.name || 'Alwaarith School'}</span>
            <span className="navbar__tagline hide-mobile">Nursery & Primary</span>
          </div>
        </Link>

        <ul className="navbar__links hide-mobile">
          {NAV_LINKS.map(l => (
            <li key={l.to}>
              <Link to={l.to} className={`navbar__link${location.pathname === l.to ? ' navbar__link--active' : ''}`}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="navbar__actions hide-mobile">
          <a href={school?.portalUrl || '#'} target="_blank" rel="noreferrer" className="btn btn-outline navbar__portal-btn">
            <ExternalLink size={14} /> Student Portal
          </a>
          {user && <Link to="/admin" className="btn btn-primary">Dashboard</Link>}
        </div>

        <button className="navbar__hamburger" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="navbar__mobile">
          {NAV_LINKS.map(l => (
            <Link key={l.to} to={l.to} className={`navbar__mobile-link${location.pathname === l.to ? ' navbar__mobile-link--active' : ''}`}>
              {l.label}
            </Link>
          ))}
          <div className="navbar__mobile-actions">
            <a href={school?.portalUrl || '#'} target="_blank" rel="noreferrer" className="btn btn-blue" style={{ width: '100%', justifyContent: 'center' }}>
              <ExternalLink size={14} /> Student Portal
            </a>
            {user && <Link to="/admin" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Dashboard</Link>}
          </div>
        </div>
      )}
    </nav>
  );
}
