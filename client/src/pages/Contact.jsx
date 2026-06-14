import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import './Contact.css';

export default function Contact({ school }) {
  const s = school || {};
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="contact-page page-with-hero-gap">
      <div className="page-header">
        <div className="container">
          <p className="eyebrow">Get in Touch</p>
          <h1>Contact Us</h1>
          <p className="page-header__sub">We're here to answer your questions and welcome your family.</p>
        </div>
      </div>

      <section className="section">
        <div className="container contact__grid">
          <div className="contact__info">
            <h2 className="section-title">Visit or Call Us</h2>
            <p style={{ color: 'var(--gray-600)', marginBottom: '2rem', lineHeight: 1.7 }}>
              Our administrative office is open Monday to Friday. Walk-ins are welcome, and we'd love to show you around the school.
            </p>

            <div className="contact__details">
              <div className="contact__detail-item">
                <div className="contact__detail-icon"><MapPin size={20} /></div>
                <div>
                  <h4>Address</h4>
                  <p>{s.address || 'No. 1 Knowledge Lane, Abuja, FCT, Nigeria'}</p>
                </div>
              </div>
              <div className="contact__detail-item">
                <div className="contact__detail-icon"><Phone size={20} /></div>
                <div>
                  <h4>Phone</h4>
                  <p><a href={`tel:${s.phone}`}>{s.phone || '+234 800 000 0000'}</a></p>
                </div>
              </div>
              <div className="contact__detail-item">
                <div className="contact__detail-icon"><Mail size={20} /></div>
                <div>
                  <h4>Email</h4>
                  <p><a href={`mailto:${s.email}`}>{s.email || 'info@alwaarithschool.edu'}</a></p>
                </div>
              </div>
              <div className="contact__detail-item">
                <div className="contact__detail-icon"><Clock size={20} /></div>
                <div>
                  <h4>Office Hours</h4>
                  <p>Monday – Friday: 8:00 AM – 4:00 PM</p>
                  <p>Saturday: 9:00 AM – 12:00 PM</p>
                </div>
              </div>
            </div>

            <div className="contact__map-placeholder">
              <MapPin size={32} />
              <p>Map integration available</p>
              <small>Add Google Maps embed here</small>
            </div>
          </div>

          <div className="contact__form-wrap">
            {sent ? (
              <div className="contact__sent">
                <div className="contact__sent-icon"><Send size={32} /></div>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. We will respond within 1-2 business days.</p>
                <button onClick={() => { setSent(false); setForm({ name:'',email:'',phone:'',subject:'',message:'' }); }} className="btn btn-blue">Send Another Message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact__form">
                <h3 className="contact__form-title">Send a Message</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Your Name *</label>
                    <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required className="form-input" placeholder="Full name" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required className="form-input" placeholder="your@email.com" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="form-input" placeholder="+234..." />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Subject *</label>
                    <select value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} required className="form-input">
                      <option value="">Select subject…</option>
                      <option>Admissions Enquiry</option>
                      <option>School Fees</option>
                      <option>Academic Information</option>
                      <option>Book a School Tour</option>
                      <option>General Enquiry</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Message *</label>
                  <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} required className="form-input" placeholder="How can we help you?" style={{ minHeight: '140px' }} />
                </div>
                <button type="submit" className="btn btn-primary contact__submit-btn">
                  Send Message <Send size={15} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
