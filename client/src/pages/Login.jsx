import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('admin@alwaarithschool.edu');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setError('Invalid email or password. Try admin123');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login__card">
        <div className="login__logo">
          <GraduationCap size={28} />
        </div>
        <h1 className="login__title">Admin Portal</h1>
        <p className="login__sub">Sign in to manage your school website</p>

        {error && <div className="login__error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="form-input" />
          </div>
          <div className="form-group" style={{ position: 'relative' }}>
            <label className="form-label">Password</label>
            <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required className="form-input" placeholder="Enter password" style={{ paddingRight: '3rem' }} />
            <button type="button" onClick={() => setShowPw(!showPw)} className="login__pw-toggle">
              {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <button type="submit" disabled={loading} className="btn btn-primary login__submit">
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
        <p className="login__hint">Demo: admin@alwaarithschool.edu / admin123</p>
      </div>
    </div>
  );
}
