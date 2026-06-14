const BASE = process.env.REACT_APP_API_URL || '';

const getToken = () => localStorage.getItem('aw_token');

async function api(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${BASE}/api${path}`, { ...options, headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || 'Request failed');
  }
  return res.json();
}

export const schoolApi = {
  get: () => api('/school'),
  update: (data) => api('/school', { method: 'PUT', body: JSON.stringify(data) }),
};

export const eventsApi = {
  getPublic: () => api('/events'),
  getAll: () => api('/events/all'),
  create: (data) => api('/events', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => api(`/events/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => api(`/events/${id}`, { method: 'DELETE' }),
};

export const authApi = {
  login: (email, password) => api('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  me: () => api('/auth/me'),
};

export const admissionsApi = {
  submit: (data) => api('/admissions', { method: 'POST', body: JSON.stringify(data) }),
  getAll: () => api('/admissions'),
};
