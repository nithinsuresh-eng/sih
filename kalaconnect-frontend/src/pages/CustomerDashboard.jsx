import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBorder from '../components/TopBorder';
import FlowerSVG  from '../components/FlowerSVG';
import './CustomerDashboard.css';

const EVENT_TYPES = [
  { value: '',                label: '— Select Event Type —' },
  { value: 'marriage',        label: '💍 Marriage / Wedding' },
  { value: 'temple_festival', label: '🪔 Temple Festival' },
  { value: 'corporate',       label: '🏢 Corporate Event' },
  { value: 'school_college',  label: '🎓 School / College Function' },
  { value: 'birthday',        label: '🎂 Birthday Celebration' },
  { value: 'cultural_night',  label: '🎭 Cultural Night' },
  { value: 'tourism',         label: '🗺️ Tourism / Heritage Tour' },
  { value: 'other',           label: '✨ Other' },
];

export default function CustomerDashboard() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    eventType: '',
    eventDate: '',
    location:  '',
    budgetMin: 2000,
    budgetMax: 20000,
  });
  const [errors, setErrors] = useState({});

  /* ── handlers ─────────────────────────────────────────── */
  const set = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.eventType) e.eventType = 'Please select an event type';
    if (!form.eventDate) e.eventDate = 'Please pick an event date';
    if (!form.location.trim()) e.location = 'Please enter a location';
    if (Number(form.budgetMin) > Number(form.budgetMax))
      e.budget = 'Minimum budget cannot exceed maximum';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSearch = () => {
    if (!validate()) return;
    const params = new URLSearchParams({
      eventType: form.eventType,
      eventDate: form.eventDate,
      location:  form.location,
      budgetMin: form.budgetMin,
      budgetMax: form.budgetMax,
    });
    navigate(`/search-results?${params.toString()}`);
  };

  /* ── today's date string for min date ────────────────── */
  const today = new Date().toISOString().split('T')[0];

  /* ── budget display ──────────────────────────────────── */
  const fmt = (n) => `₹${Number(n).toLocaleString('en-IN')}`;

  return (
    <div className="cd-root">
      <TopBorder />

      {/* Corner flowers */}
      <div className="corner corner--tl"><FlowerSVG size={55} color="#e74c3c" opacity={0.5} /></div>
      <div className="corner corner--tr"><FlowerSVG size={55} color="#e74c3c" opacity={0.5} /></div>

      {/* Back link */}
      <button className="back-btn" onClick={() => navigate('/')}>
        ← Home
      </button>

      {/* Header */}
      <header className="cd-header">
        <div className="cd-icon">🎭</div>
        <h1 className="cd-title">Book a Folk Artist</h1>
        <p className="cd-subtitle">
          Tell us about your event and our AI will find the perfect traditional artist for you.
        </p>
      </header>

      {/* Form card */}
      <div className="cd-card">

        {/* Decorative bg flower */}
        <div className="cd-card-flower">
          <FlowerSVG size={140} color="#8b1a0a" opacity={0.18} />
        </div>

        {/* Event Type */}
        <div className="form-group">
          <label className="form-label">🎪 Type of Event</label>
          <select
            className={`form-select ${errors.eventType ? 'input-error' : ''}`}
            value={form.eventType}
            onChange={set('eventType')}
          >
            {EVENT_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
          {errors.eventType && <span className="err-msg">{errors.eventType}</span>}
        </div>

        {/* Event Date */}
        <div className="form-group">
          <label className="form-label">📅 Event Date</label>
          <input
            type="date"
            className={`form-input ${errors.eventDate ? 'input-error' : ''}`}
            value={form.eventDate}
            min={today}
            onChange={set('eventDate')}
          />
          {errors.eventDate && <span className="err-msg">{errors.eventDate}</span>}
        </div>

        {/* Location */}
        <div className="form-group">
          <label className="form-label">📍 Event Location</label>
          <input
            type="text"
            className={`form-input ${errors.location ? 'input-error' : ''}`}
            placeholder="e.g. Madurai, Coimbatore, Chennai…"
            value={form.location}
            onChange={set('location')}
          />
          {errors.location && <span className="err-msg">{errors.location}</span>}
        </div>

        {/* Budget Range */}
        <div className="form-group">
          <label className="form-label">
            💰 Budget Range &nbsp;
            <span className="budget-display">
              {fmt(form.budgetMin)} — {fmt(form.budgetMax)}
            </span>
          </label>

          <div className="budget-row">
            <div className="budget-half">
              <span className="budget-sub">Min</span>
              <input
                type="range"
                className="range-slider range-slider--min"
                min={500}
                max={100000}
                step={500}
                value={form.budgetMin}
                onChange={(e) => {
                  const v = Math.min(Number(e.target.value), Number(form.budgetMax) - 500);
                  setForm((f) => ({ ...f, budgetMin: v }));
                }}
              />
              <input
                type="number"
                className="budget-number-input"
                value={form.budgetMin}
                min={500}
                max={form.budgetMax - 500}
                step={500}
                onChange={(e) =>
                  setForm((f) => ({ ...f, budgetMin: Number(e.target.value) }))
                }
              />
            </div>

            <span className="budget-sep">—</span>

            <div className="budget-half">
              <span className="budget-sub">Max</span>
              <input
                type="range"
                className="range-slider range-slider--max"
                min={500}
                max={200000}
                step={500}
                value={form.budgetMax}
                onChange={(e) => {
                  const v = Math.max(Number(e.target.value), Number(form.budgetMin) + 500);
                  setForm((f) => ({ ...f, budgetMax: v }));
                }}
              />
              <input
                type="number"
                className="budget-number-input"
                value={form.budgetMax}
                min={Number(form.budgetMin) + 500}
                max={200000}
                step={500}
                onChange={(e) =>
                  setForm((f) => ({ ...f, budgetMax: Number(e.target.value) }))
                }
              />
            </div>
          </div>
          {errors.budget && <span className="err-msg">{errors.budget}</span>}
        </div>

        {/* Search button */}
        <button className="search-btn" onClick={handleSearch}>
          🔍 Search Artists
        </button>
      </div>

      {/* AI info strip */}
      <div className="ai-strip">
        <span className="ai-badge">🤖 AI Powered</span>
        <p>
          Our recommendation engine uses <strong>collaborative filtering</strong> &amp;{' '}
          <strong>geo-based matching</strong> to suggest the most suitable folk artists
          within your area and budget.
        </p>
      </div>

      <TopBorder />
    </div>
  );
}
