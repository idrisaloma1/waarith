import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Calendar, Settings, LogOut, Plus, Trash2, Edit2, Save, X, Users, BookOpen, Award, ExternalLink, GraduationCap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { eventsApi, schoolApi, admissionsApi } from '../api';
import './Admin.css';

const TABS = [
  { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={16} /> },
  { id: 'events', label: 'Events', icon: <Calendar size={16} /> },
  { id: 'admissions', label: 'Admissions', icon: <Users size={16} /> },
  { id: 'settings', label: 'School Settings', icon: <Settings size={16} /> },
];

const EMPTY_EVENT = { title: '', date: '', time: '', location: '', description: '', category: 'General', published: true };

export default function Admin() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('overview');
  const [events, setEvents] = useState([]);
  const [admissions, setAdmissions] = useState([]);
  const [school, setSchool] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [showEventForm, setShowEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState(EMPTY_EVENT);
  const [saving, setSaving] = useState(false);
  const [schoolEdit, setSchoolEdit] = useState({});
  const [msg, setMsg] = useState('');

  useEffect(() => {
    eventsApi.getAll().then(setEvents).catch(() => {});
    admissionsApi.getAll().then(setAdmissions).catch(() => {});
    schoolApi.get().then(s => { setSchool(s); setSchoolEdit(s); }).catch(() => {});
  }, []);

  const showMsg = text => { setMsg(text); setTimeout(() => setMsg(''), 3000); };

  const handleCreateEvent = async e => {
    e.preventDefault(); setSaving(true);
    try {
      const created = await eventsApi.create(newEvent);
      setEvents(ev => [...ev, created]);
      setNewEvent(EMPTY_EVENT); setShowEventForm(false);
      showMsg('Event created!');
    } catch { showMsg('Failed to create event'); }
    finally { setSaving(false); }
  };

  const handleUpdateEvent = async e => {
    e.preventDefault(); setSaving(true);
    try {
      const updated = await eventsApi.update(editingEvent.id, editingEvent);
      setEvents(ev => ev.map(x => x.id === updated.id ? updated : x));
      setEditingEvent(null); showMsg('Event updated!');
    } catch { showMsg('Failed to update'); }
    finally { setSaving(false); }
  };

  const handleDeleteEvent = async id => {
    if (!window.confirm('Delete this event?')) return;
    try {
      await eventsApi.delete(id);
      setEvents(ev => ev.filter(x => x.id !== id));
      showMsg('Event deleted');
    } catch { showMsg('Failed to delete'); }
  };

  const handleSaveSchool = async e => {
    e.preventDefault(); setSaving(true);
    try {
      const updated = await schoolApi.update(schoolEdit);
      setSchool(updated); showMsg('School settings saved!');
    } catch { showMsg('Failed to save settings'); }
    finally { setSaving(false); }
  };

  const handleAdmissionStatus = async (id, status) => {
    try {
      const updated = await admissionsApi.getAll();
      setAdmissions(updated);
      showMsg(`Application ${status}`);
    } catch {}
  };

  return (
    <div className="admin-page">
      {/* Sidebar */}
      <aside className="admin__sidebar">
        <div className="admin__sidebar-brand">
          <div className="admin__brand-logo"><GraduationCap size={20} /></div>
          <div>
            <p className="admin__brand-name">Alwaarith</p>
            <p className="admin__brand-sub">School Admin</p>
          </div>
        </div>

        <nav className="admin__nav">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`admin__nav-item${tab === t.id ? ' admin__nav-item--active' : ''}`}>
              {t.icon} {t.label}
            </button>
          ))}
        </nav>

        <div className="admin__sidebar-footer">
          <div className="admin__user-info">
            <div className="admin__user-avatar">{user?.name?.[0] || 'A'}</div>
            <div>
              <p className="admin__user-name">{user?.name}</p>
              <p className="admin__user-role">{user?.role}</p>
            </div>
          </div>
          <div className="admin__sidebar-actions">
            <a href="/" target="_blank" rel="noreferrer" className="admin__action-btn">
              <ExternalLink size={14} /> View Site
            </a>
            <button onClick={() => { logout(); navigate('/'); }} className="admin__action-btn admin__action-btn--logout">
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="admin__main">
        {msg && <div className="admin__toast">{msg}</div>}

        {/* Overview */}
        {tab === 'overview' && (
          <div className="admin__section fade-in">
            <h2 className="admin__page-title">Dashboard Overview</h2>
            <div className="admin__stats-grid">
              <div className="admin__stat-card"><div className="admin__stat-icon admin__stat-icon--blue"><Users size={20} /></div><span className="admin__stat-val">{school?.students || 450}</span><span className="admin__stat-label">Students</span></div>
              <div className="admin__stat-card"><div className="admin__stat-icon admin__stat-icon--gold"><BookOpen size={20} /></div><span className="admin__stat-val">{school?.teachers || 32}</span><span className="admin__stat-label">Teachers</span></div>
              <div className="admin__stat-card"><div className="admin__stat-icon admin__stat-icon--green"><Calendar size={20} /></div><span className="admin__stat-val">{events.length}</span><span className="admin__stat-label">Events</span></div>
              <div className="admin__stat-card"><div className="admin__stat-icon admin__stat-icon--purple"><Award size={20} /></div><span className="admin__stat-val">{admissions.length}</span><span className="admin__stat-label">Applications</span></div>
            </div>

            <div className="admin__recent">
              <h3>Recent Applications</h3>
              {admissions.length === 0 ? <p className="admin__empty">No applications yet.</p> : (
                <div className="admin__table">
                  <table>
                    <thead><tr><th>Child</th><th>Parent</th><th>Programme</th><th>Status</th><th>Date</th></tr></thead>
                    <tbody>
                      {admissions.slice(0, 5).map(a => (
                        <tr key={a.id}>
                          <td>{a.childName}</td>
                          <td>{a.parentName}</td>
                          <td>{a.programme}</td>
                          <td><span className={`badge ${a.status === 'pending' ? 'badge-gold' : 'badge-green'}`}>{a.status}</span></td>
                          <td>{new Date(a.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Events */}
        {tab === 'events' && (
          <div className="admin__section fade-in">
            <div className="admin__section-head">
              <h2 className="admin__page-title">Manage Events</h2>
              <button onClick={() => setShowEventForm(true)} className="btn btn-primary"><Plus size={15} /> Add Event</button>
            </div>

            {showEventForm && (
              <div className="admin__modal-overlay">
                <div className="admin__modal">
                  <div className="admin__modal-head">
                    <h3>Create New Event</h3>
                    <button onClick={() => setShowEventForm(false)}><X size={20} /></button>
                  </div>
                  <form onSubmit={handleCreateEvent} className="admin__event-form">
                    <div className="form-group"><label className="form-label">Title *</label><input value={newEvent.title} onChange={e => setNewEvent(f => ({ ...f, title: e.target.value }))} required className="form-input" /></div>
                    <div className="form-row">
                      <div className="form-group"><label className="form-label">Date *</label><input type="date" value={newEvent.date} onChange={e => setNewEvent(f => ({ ...f, date: e.target.value }))} required className="form-input" /></div>
                      <div className="form-group"><label className="form-label">Time *</label><input value={newEvent.time} onChange={e => setNewEvent(f => ({ ...f, time: e.target.value }))} required className="form-input" placeholder="e.g. 9:00 AM" /></div>
                    </div>
                    <div className="form-row">
                      <div className="form-group"><label className="form-label">Location *</label><input value={newEvent.location} onChange={e => setNewEvent(f => ({ ...f, location: e.target.value }))} required className="form-input" /></div>
                      <div className="form-group"><label className="form-label">Category</label>
                        <select value={newEvent.category} onChange={e => setNewEvent(f => ({ ...f, category: e.target.value }))} className="form-input">
                          {['General', 'Sports', 'Cultural', 'PTA', 'Graduation'].map(c => <option key={c}>{c}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="form-group"><label className="form-label">Description *</label><textarea value={newEvent.description} onChange={e => setNewEvent(f => ({ ...f, description: e.target.value }))} required className="form-input" /></div>
                    <div className="admin__modal-actions">
                      <button type="button" onClick={() => setShowEventForm(false)} className="btn btn-ghost">Cancel</button>
                      <button type="submit" disabled={saving} className="btn btn-primary"><Save size={14} /> {saving ? 'Saving…' : 'Create Event'}</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {editingEvent && (
              <div className="admin__modal-overlay">
                <div className="admin__modal">
                  <div className="admin__modal-head">
                    <h3>Edit Event</h3>
                    <button onClick={() => setEditingEvent(null)}><X size={20} /></button>
                  </div>
                  <form onSubmit={handleUpdateEvent} className="admin__event-form">
                    <div className="form-group"><label className="form-label">Title *</label><input value={editingEvent.title} onChange={e => setEditingEvent(f => ({ ...f, title: e.target.value }))} required className="form-input" /></div>
                    <div className="form-row">
                      <div className="form-group"><label className="form-label">Date *</label><input type="date" value={editingEvent.date} onChange={e => setEditingEvent(f => ({ ...f, date: e.target.value }))} required className="form-input" /></div>
                      <div className="form-group"><label className="form-label">Time</label><input value={editingEvent.time} onChange={e => setEditingEvent(f => ({ ...f, time: e.target.value }))} className="form-input" /></div>
                    </div>
                    <div className="form-row">
                      <div className="form-group"><label className="form-label">Location</label><input value={editingEvent.location} onChange={e => setEditingEvent(f => ({ ...f, location: e.target.value }))} className="form-input" /></div>
                      <div className="form-group"><label className="form-label">Category</label>
                        <select value={editingEvent.category} onChange={e => setEditingEvent(f => ({ ...f, category: e.target.value }))} className="form-input">
                          {['General', 'Sports', 'Cultural', 'PTA', 'Graduation'].map(c => <option key={c}>{c}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="form-group"><label className="form-label">Description</label><textarea value={editingEvent.description} onChange={e => setEditingEvent(f => ({ ...f, description: e.target.value }))} className="form-input" /></div>
                    <div className="admin__modal-actions">
                      <button type="button" onClick={() => setEditingEvent(null)} className="btn btn-ghost">Cancel</button>
                      <button type="submit" disabled={saving} className="btn btn-primary"><Save size={14} /> {saving ? 'Saving…' : 'Save Changes'}</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <div className="admin__events-list">
              {events.map(e => (
                <div key={e.id} className="admin__event-row">
                  <div className="admin__event-date-block">
                    <span>{new Date(e.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</span>
                    <small>{e.time}</small>
                  </div>
                  <div className="admin__event-info">
                    <h4>{e.title}</h4>
                    <p>{e.location} · <span className={`badge ${e.category === 'Sports' ? 'badge-green' : 'badge-blue'}`}>{e.category}</span></p>
                  </div>
                  <div className="admin__event-actions">
                    <button onClick={() => setEditingEvent(e)} className="admin__icon-btn admin__icon-btn--edit"><Edit2 size={15} /></button>
                    <button onClick={() => handleDeleteEvent(e.id)} className="admin__icon-btn admin__icon-btn--delete"><Trash2 size={15} /></button>
                  </div>
                </div>
              ))}
              {events.length === 0 && <p className="admin__empty">No events yet. Add your first event.</p>}
            </div>
          </div>
        )}

        {/* Admissions */}
        {tab === 'admissions' && (
          <div className="admin__section fade-in">
            <h2 className="admin__page-title">Admission Applications</h2>
            {admissions.length === 0 ? (
              <div className="admin__empty-state">
                <Users size={48} />
                <h3>No applications yet</h3>
                <p>Applications submitted via the website will appear here.</p>
              </div>
            ) : (
              <div className="admin__table">
                <table>
                  <thead>
                    <tr><th>Child</th><th>Parent</th><th>Email</th><th>Phone</th><th>Programme</th><th>Status</th><th>Date</th></tr>
                  </thead>
                  <tbody>
                    {admissions.map(a => (
                      <tr key={a.id}>
                        <td><strong>{a.childName}</strong></td>
                        <td>{a.parentName}</td>
                        <td>{a.email}</td>
                        <td>{a.phone}</td>
                        <td>{a.programme}</td>
                        <td><span className={`badge ${a.status === 'pending' ? 'badge-gold' : a.status === 'approved' ? 'badge-green' : 'badge-blue'}`}>{a.status}</span></td>
                        <td>{new Date(a.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Settings */}
        {tab === 'settings' && school && (
          <div className="admin__section fade-in">
            <h2 className="admin__page-title">School Settings</h2>
            <form onSubmit={handleSaveSchool} className="admin__settings-form">
              <div className="admin__settings-card">
                <h3>Basic Information</h3>
                <div className="form-row">
                  <div className="form-group"><label className="form-label">School Name</label><input value={schoolEdit.name || ''} onChange={e => setSchoolEdit(f => ({ ...f, name: e.target.value }))} className="form-input" /></div>
                  <div className="form-group"><label className="form-label">Tagline</label><input value={schoolEdit.tagline || ''} onChange={e => setSchoolEdit(f => ({ ...f, tagline: e.target.value }))} className="form-input" /></div>
                </div>
                <div className="form-row">
                  <div className="form-group"><label className="form-label">Email</label><input type="email" value={schoolEdit.email || ''} onChange={e => setSchoolEdit(f => ({ ...f, email: e.target.value }))} className="form-input" /></div>
                  <div className="form-group"><label className="form-label">Phone</label><input value={schoolEdit.phone || ''} onChange={e => setSchoolEdit(f => ({ ...f, phone: e.target.value }))} className="form-input" /></div>
                </div>
                <div className="form-group"><label className="form-label">Address</label><input value={schoolEdit.address || ''} onChange={e => setSchoolEdit(f => ({ ...f, address: e.target.value }))} className="form-input" /></div>
                <div className="form-group"><label className="form-label">Portal URL (EduTec)</label><input value={schoolEdit.portalUrl || ''} onChange={e => setSchoolEdit(f => ({ ...f, portalUrl: e.target.value }))} className="form-input" placeholder="https://app.yourschool.edu" /></div>
                <div className="form-group"><label className="form-label">About the School</label><textarea value={schoolEdit.about || ''} onChange={e => setSchoolEdit(f => ({ ...f, about: e.target.value }))} className="form-input" style={{ minHeight: '100px' }} /></div>
              </div>

              <div className="admin__settings-card">
                <h3>Vision & Mission</h3>
                <div className="form-group"><label className="form-label">Vision</label><textarea value={schoolEdit.vision || ''} onChange={e => setSchoolEdit(f => ({ ...f, vision: e.target.value }))} className="form-input" /></div>
                <div className="form-group"><label className="form-label">Mission</label><textarea value={schoolEdit.mission || ''} onChange={e => setSchoolEdit(f => ({ ...f, mission: e.target.value }))} className="form-input" /></div>
              </div>

              <div className="admin__settings-card">
                <h3>Statistics</h3>
                <div className="form-row">
                  <div className="form-group"><label className="form-label">Number of Students</label><input type="number" value={schoolEdit.students || ''} onChange={e => setSchoolEdit(f => ({ ...f, students: parseInt(e.target.value) }))} className="form-input" /></div>
                  <div className="form-group"><label className="form-label">Number of Teachers</label><input type="number" value={schoolEdit.teachers || ''} onChange={e => setSchoolEdit(f => ({ ...f, teachers: parseInt(e.target.value) }))} className="form-input" /></div>
                  <div className="form-group"><label className="form-label">Year Founded</label><input type="number" value={schoolEdit.founded || ''} onChange={e => setSchoolEdit(f => ({ ...f, founded: parseInt(e.target.value) }))} className="form-input" /></div>
                </div>
              </div>

              <button type="submit" disabled={saving} className="btn btn-primary admin__save-btn">
                <Save size={15} /> {saving ? 'Saving…' : 'Save All Settings'}
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
