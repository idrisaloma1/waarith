import React, { useState } from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { admissionsApi } from '../api';
import './Admissions.css';

const STEPS = ['Requirements', 'Application Form', 'Review & Approval', 'Enrollment'];

export default function Admissions() {
  const [form, setForm] = useState({ parentName: '', email: '', phone: '', childName: '', dob: '', gender: '', programme: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      await admissionsApi.submit(form);
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admissions-page page-with-hero-gap">
      <div className="page-header">
        <div className="container">
          <p className="eyebrow">Join Alwaarith</p>
          <h1>Admissions</h1>
          <p className="page-header__sub">Begin your child's journey with us. Applications are open.</p>
        </div>
      </div>

      {/* Process */}
      <section className="section-sm" style={{ background: 'var(--gray-50)' }}>
        <div className="container">
          <div className="admissions__steps">
            {STEPS.map((s, i) => (
              <div key={i} className="admissions__step">
                <div className="admissions__step-num">{i + 1}</div>
                <span className="admissions__step-label">{s}</span>
                {i < STEPS.length - 1 && <div className="admissions__step-line" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container admissions__grid">
          {/* Info */}
          <div className="admissions__info">
            <h2 className="section-title">Requirements</h2>
            <div className="admissions__req-list">
              {['Birth certificate of the child', 'Immunisation card / health record', 'Recent passport photograph (x2)', 'Previous school report (if applicable)', 'Completed application form', 'Application fee payment receipt'].map((r, i) => (
                <div key={i} className="admissions__req-item">
                  <CheckCircle size={16} className="admissions__req-icon" />
                  <span>{r}</span>
                </div>
              ))}
            </div>

            <div className="admissions__programmes">
              <h3>Available Programmes</h3>
              {[
                { name: 'Nursery 1 & 2', age: 'Ages 2–4' },
                { name: 'Kindergarten', age: 'Ages 4–6' },
                { name: 'Primary 1–3', age: 'Ages 6–9' },
                { name: 'Primary 4–6', age: 'Ages 9–12' },
              ].map(p => (
                <div key={p.name} className="admissions__prog-row">
                  <span>{p.name}</span>
                  <span className="badge badge-blue">{p.age}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="admissions__form-wrap">
            {submitted ? (
              <div className="admissions__success">
                <div className="admissions__success-icon"><CheckCircle size={40} /></div>
                <h3>Application Submitted!</h3>
                <p>Thank you! We have received your application and will contact you within 3 working days.</p>
                <button onClick={() => { setSubmitted(false); setForm({ parentName:'',email:'',phone:'',childName:'',dob:'',gender:'',programme:'',message:'' }); }} className="btn btn-blue">Submit Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="admissions__form">
                <h3 className="admissions__form-title">Application Form</h3>
                {error && <div className="admissions__error">{error}</div>}

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Parent / Guardian Name *</label>
                    <input name="parentName" value={form.parentName} onChange={handleChange} required className="form-input" placeholder="Full name" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Child's Full Name *</label>
                    <input name="childName" value={form.childName} onChange={handleChange} required className="form-input" placeholder="Child's name" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} required className="form-input" placeholder="your@email.com" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number *</label>
                    <input name="phone" value={form.phone} onChange={handleChange} required className="form-input" placeholder="+234..." />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Date of Birth *</label>
                    <input type="date" name="dob" value={form.dob} onChange={handleChange} required className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Gender</label>
                    <select name="gender" value={form.gender} onChange={handleChange} className="form-input">
                      <option value="">Select…</option>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Programme Applying For *</label>
                  <select name="programme" value={form.programme} onChange={handleChange} required className="form-input">
                    <option value="">Select a programme…</option>
                    <option>Nursery 1</option>
                    <option>Nursery 2</option>
                    <option>Kindergarten</option>
                    <option>Primary 1</option>
                    <option>Primary 2</option>
                    <option>Primary 3</option>
                    <option>Primary 4</option>
                    <option>Primary 5</option>
                    <option>Primary 6</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Additional Information</label>
                  <textarea name="message" value={form.message} onChange={handleChange} className="form-input" placeholder="Any additional information about your child…" />
                </div>

                <button type="submit" disabled={loading} className="btn btn-primary admissions__submit-btn">
                  {loading ? 'Submitting…' : 'Submit Application'} {!loading && <ArrowRight size={15} />}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
