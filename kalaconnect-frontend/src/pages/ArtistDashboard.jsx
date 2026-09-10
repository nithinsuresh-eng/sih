import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBorder from '../components/TopBorder';
import FlowerSVG from '../components/FlowerSVG';
import './ArtistDashboard.css';

/* ══════════════════════════════════════════════════════════
   MOCK DATA
══════════════════════════════════════════════════════════ */

const ARTIST_PROFILE = {
  name: 'Muthu Nadaswaram Troupe',
  avatar: '🎺',
  artForms: ['Nadaswaram', 'Thavil'],
  location: 'Madurai, Tamil Nadu',
  rating: 4.9,
  reviews: 132,
  experience: 22,
  deviceType: 'smartphone', // or 'button'
  ivrPhone: '+91 98765 43210',
  languages: ['Tamil', 'Telugu'],
};

const MOCK_BOOKINGS = [
  {
    id: 'BK001',
    customer: 'Priya Sharma',
    event: '💍 Marriage',
    date: '2026-10-09',
    location: 'Madurai',
    budget: '₹15,000',
    status: 'pending',
    message: 'We need Nadaswaram for a 4-hour wedding ceremony.',
    time: '2 hours ago',
  },
  {
    id: 'BK002',
    customer: 'Rajan Murugan',
    event: '🪔 Temple Festival',
    date: '2026-10-15',
    location: 'Kumbakonam',
    budget: '₹10,000',
    status: 'negotiating',
    message: 'Can you perform for 3 hours? Budget is ₹10,000.',
    time: '1 day ago',
  },
  {
    id: 'BK003',
    customer: 'Anitha Krishnan',
    event: '🏢 Corporate Event',
    date: '2026-11-01',
    location: 'Chennai',
    budget: '₹25,000',
    status: 'accepted',
    message: 'Grand performance for our annual day event.',
    time: '3 days ago',
  },
  {
    id: 'BK004',
    customer: 'Suresh Babu',
    event: '🎭 Cultural Night',
    date: '2026-09-25',
    location: 'Trichy',
    budget: '₹8,000',
    status: 'rejected',
    message: 'Evening cultural program at our college.',
    time: '5 days ago',
  },
  {
    id: 'BK005',
    customer: 'Kavitha Devi',
    event: '🎂 Birthday',
    date: '2026-10-20',
    location: 'Coimbatore',
    budget: '₹12,000',
    status: 'pending',
    message: 'Traditional music for our family celebration.',
    time: '30 min ago',
  },
];

const MOCK_PORTFOLIO = [
  {
    id: 1, type: 'photo',
    title: 'Wedding Performance – Madurai 2025',
    thumbnail: '🎺', event: 'Marriage', likes: 48,
    desc: 'Traditional Nadaswaram for a grand Tamil wedding.',
  },
  {
    id: 2, type: 'video',
    title: 'Temple Festival – Kumbakonam',
    thumbnail: '🎬', event: 'Temple Festival', likes: 72,
    desc: 'Full 6-hour Nadaswaram recital at the Brihadeeswarar festival.',
  },
  {
    id: 3, type: 'photo',
    title: 'Corporate Gala – Chennai 2024',
    thumbnail: '🖼️', event: 'Corporate', likes: 34,
    desc: 'Classical ensemble for IT company annual day.',
  },
  {
    id: 4, type: 'video',
    title: 'Cultural Night Performance',
    thumbnail: '🎬', event: 'Cultural Night', likes: 91,
    desc: 'Energetic 2-hour performance at Government Arts College.',
  },
  {
    id: 5, type: 'photo',
    title: 'Procession – Madurai Meenakshi Temple',
    thumbnail: '🖼️', event: 'Temple Festival', likes: 115,
    desc: 'Grand temple car festival procession with our full troupe.',
  },
];

const IVR_CALL_LOG = [
  { id: 1, from: 'KalaConnect System', about: 'BK001 – Priya Sharma', time: '2 hrs ago', result: 'Responded: Accepted' },
  { id: 2, from: 'KalaConnect System', about: 'BK002 – Rajan Murugan', time: '1 day ago', result: 'Responded: Negotiate' },
  { id: 3, from: 'KalaConnect System', about: 'BK004 – Suresh Babu', time: '5 days ago', result: 'Responded: Rejected' },
  { id: 4, from: 'KalaConnect System', about: 'BK003 – Anitha Krishnan', time: '3 days ago', result: 'No response – Retrying' },
];

/* ══════════════════════════════════════════════════════════
   HELPER COMPONENTS
══════════════════════════════════════════════════════════ */

function StatusBadge({ status }) {
  const map = {
    pending:     { label: 'Pending',     color: '#f39c12', bg: 'rgba(243,156,18,0.12)'  },
    accepted:    { label: 'Accepted',    color: '#2ecc71', bg: 'rgba(46,204,113,0.12)'  },
    rejected:    { label: 'Rejected',    color: '#e74c3c', bg: 'rgba(231,76,60,0.12)'   },
    negotiating: { label: 'Negotiating', color: '#3498db', bg: 'rgba(52,152,219,0.12)'  },
  };
  const s = map[status] || map.pending;
  return (
    <span className="status-badge" style={{ color: s.color, background: s.bg, border: `1px solid ${s.color}44` }}>
      {s.label}
    </span>
  );
}

/* ══════════════════════════════════════════════════════════
   TAB: MANAGE BOOKINGS
══════════════════════════════════════════════════════════ */

function ManageBookings() {
  const [bookings, setBookings] = useState(MOCK_BOOKINGS);
  const [nego, setNego] = useState({ id: null, msg: '' });

  const updateStatus = (id, status) =>
    setBookings((b) => b.map((bk) => bk.id === id ? { ...bk, status } : bk));

  const openNego = (id) => setNego({ id, msg: '' });
  const sendNego = () => {
    if (!nego.msg.trim()) return;
    updateStatus(nego.id, 'negotiating');
    setNego({ id: null, msg: '' });
  };

  const counts = {
    pending:     bookings.filter((b) => b.status === 'pending').length,
    accepted:    bookings.filter((b) => b.status === 'accepted').length,
    negotiating: bookings.filter((b) => b.status === 'negotiating').length,
  };

  return (
    <div className="tab-content">
      {/* Summary pills */}
      <div className="booking-summary">
        <div className="summary-pill" style={{ borderColor: '#f39c12' }}>
          <span className="sp-num" style={{ color: '#f39c12' }}>{counts.pending}</span>
          <span className="sp-lbl">Pending</span>
        </div>
        <div className="summary-pill" style={{ borderColor: '#2ecc71' }}>
          <span className="sp-num" style={{ color: '#2ecc71' }}>{counts.accepted}</span>
          <span className="sp-lbl">Accepted</span>
        </div>
        <div className="summary-pill" style={{ borderColor: '#3498db' }}>
          <span className="sp-num" style={{ color: '#3498db' }}>{counts.negotiating}</span>
          <span className="sp-lbl">Negotiating</span>
        </div>
      </div>

      {/* Booking cards */}
      {bookings.map((bk) => (
        <div className="booking-card" key={bk.id}>
          <div className="bc-top">
            <div className="bc-left">
              <div className="bc-id">#{bk.id}</div>
              <h3 className="bc-customer">{bk.customer}</h3>
              <div className="bc-event-row">
                <span className="bc-event">{bk.event}</span>
                <span className="bc-dot">·</span>
                <span className="bc-date">📅 {bk.date}</span>
                <span className="bc-dot">·</span>
                <span className="bc-loc">📍 {bk.location}</span>
              </div>
              <div className="bc-budget">💰 Budget: <strong>{bk.budget}</strong></div>
              <p className="bc-msg">"{bk.message}"</p>
              <span className="bc-time">{bk.time}</span>
            </div>
            <div className="bc-right">
              <StatusBadge status={bk.status} />
            </div>
          </div>

          {/* Action buttons — only for pending / negotiating */}
          {(bk.status === 'pending' || bk.status === 'negotiating') && (
            <div className="bc-actions">
              <button className="action-btn action-accept" onClick={() => updateStatus(bk.id, 'accepted')}>
                ✅ Accept
              </button>
              <button className="action-btn action-reject" onClick={() => updateStatus(bk.id, 'rejected')}>
                ❌ Reject
              </button>
              <button className="action-btn action-nego" onClick={() => openNego(bk.id)}>
                💬 Negotiate
              </button>
            </div>
          )}

          {/* Negotiate input inline */}
          {nego.id === bk.id && (
            <div className="nego-box">
              <input
                className="nego-input"
                placeholder="Type your counter-offer or message…"
                value={nego.msg}
                onChange={(e) => setNego((n) => ({ ...n, msg: e.target.value }))}
              />
              <button className="nego-send" onClick={sendNego}>Send</button>
              <button className="nego-cancel" onClick={() => setNego({ id: null, msg: '' })}>Cancel</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   TAB: PORTFOLIO
══════════════════════════════════════════════════════════ */

function Portfolio() {
  const [items, setItems] = useState(MOCK_PORTFOLIO);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({ title: '', type: 'photo', event: '', desc: '' });

  const handleUpload = () => {
    if (!form.title.trim()) return;
    const newItem = {
      id: Date.now(),
      type: form.type,
      title: form.title,
      thumbnail: form.type === 'video' ? '🎬' : '🖼️',
      event: form.event || 'General',
      likes: 0,
      desc: form.desc,
    };
    setItems((prev) => [newItem, ...prev]);
    setForm({ title: '', type: 'photo', event: '', desc: '' });
    setUploading(false);
  };

  return (
    <div className="tab-content">
      {/* Upload button */}
      {!uploading ? (
        <button className="upload-trigger" onClick={() => setUploading(true)}>
          ＋ Upload Photo / Video
        </button>
      ) : (
        <div className="upload-form">
          <h3 className="uf-title">📤 Add New Portfolio Item</h3>
          <div className="uf-row">
            <label className="uf-label">Title</label>
            <input className="uf-input" placeholder="e.g. Wedding Performance – Madurai"
              value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
          </div>
          <div className="uf-row">
            <label className="uf-label">Type</label>
            <select className="uf-select" value={form.type}
              onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}>
              <option value="photo">📷 Photo</option>
              <option value="video">🎬 Video</option>
            </select>
          </div>
          <div className="uf-row">
            <label className="uf-label">Event Type</label>
            <input className="uf-input" placeholder="e.g. Marriage, Temple Festival"
              value={form.event} onChange={(e) => setForm((f) => ({ ...f, event: e.target.value }))} />
          </div>
          <div className="uf-row">
            <label className="uf-label">Description</label>
            <textarea className="uf-input uf-textarea" rows={3} placeholder="Brief description…"
              value={form.desc} onChange={(e) => setForm((f) => ({ ...f, desc: e.target.value }))} />
          </div>
          {/* Simulated file picker */}
          <div className="uf-row">
            <label className="uf-label">File</label>
            <div className="fake-file-picker">
              <span>📁 Click to choose file</span>
              <span className="fake-file-hint">(JPG, PNG, MP4 – max 50 MB)</span>
            </div>
          </div>
          <div className="uf-btns">
            <button className="uf-submit" onClick={handleUpload}>Upload</button>
            <button className="uf-cancel" onClick={() => setUploading(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="portfolio-grid">
        {items.map((item) => (
          <div className="portfolio-card" key={item.id}>
            <div className="pc-thumbnail">
              <span className="pc-thumb-icon">{item.thumbnail}</span>
              <span className="pc-type-badge">{item.type === 'video' ? '🎬 Video' : '📷 Photo'}</span>
            </div>
            <div className="pc-body">
              <h4 className="pc-title">{item.title}</h4>
              <span className="pc-event-chip">{item.event}</span>
              {item.desc && <p className="pc-desc">{item.desc}</p>}
              <div className="pc-footer">
                <span className="pc-likes">❤️ {item.likes}</span>
                <button className="pc-delete" onClick={() => setItems((prev) => prev.filter((i) => i.id !== item.id))}>
                  🗑️ Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   TAB: IVR SUPPORT
══════════════════════════════════════════════════════════ */

function IVRSupport() {
  const [deviceType, setDeviceType] = useState(ARTIST_PROFILE.deviceType);
  const [phone, setPhone] = useState(ARTIST_PROFILE.ivrPhone);
  const [saved, setSaved] = useState(false);
  const [lang, setLang] = useState('Tamil');

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

  return (
    <div className="tab-content">

      {/* How IVR works */}
      <div className="ivr-explain-card">
        <h3 className="iec-title">📞 How IVR Works for You</h3>
        <div className="ivr-steps">
          {[
            { icon: '📱', step: 'Customer books you via KalaConnect app.' },
            { icon: '🔍', step: 'App detects your device type: Smartphone or Button Phone.' },
            { icon: '📞', step: 'If button phone — system auto-calls your registered number.' },
            { icon: '🎙️', step: 'IVR voice (Tamil/Telugu/English) announces the booking details.' },
            { icon: '✅', step: 'Press 1 to Accept, 2 to Reject, 3 to Negotiate via voice.' },
            { icon: '💾', step: 'Your response is saved, and the customer is notified instantly.' },
          ].map((s, i) => (
            <div className="ivr-step" key={i}>
              <span className="ivr-step-icon">{s.icon}</span>
              <span className="ivr-step-text">{s.step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Device settings */}
      <div className="ivr-settings-card">
        <h3 className="isc-title">⚙️ Your IVR Settings</h3>

        {/* Device type toggle */}
        <div className="ivr-field">
          <label className="ivr-label">Device Type</label>
          <div className="device-toggle">
            <button
              className={`dt-btn ${deviceType === 'smartphone' ? 'dt-btn--active-green' : ''}`}
              onClick={() => setDeviceType('smartphone')}
            >
              📱 Smartphone
            </button>
            <button
              className={`dt-btn ${deviceType === 'button' ? 'dt-btn--active-orange' : ''}`}
              onClick={() => setDeviceType('button')}
            >
              📟 Button Phone
            </button>
          </div>
          {deviceType === 'button' && (
            <p className="device-note">
              🟠 IVR calls will be automatically triggered when you receive a booking.
            </p>
          )}
          {deviceType === 'smartphone' && (
            <p className="device-note" style={{ color: '#2ecc71' }}>
              🟢 You will receive push notifications via the KalaConnect app.
            </p>
          )}
        </div>

        {/* Phone number */}
        <div className="ivr-field">
          <label className="ivr-label">Registered Phone Number</label>
          <input
            className="ivr-input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 XXXXX XXXXX"
          />
        </div>

        {/* IVR Language */}
        <div className="ivr-field">
          <label className="ivr-label">IVR Voice Language</label>
          <select className="ivr-select" value={lang} onChange={(e) => setLang(e.target.value)}>
            <option>Tamil</option>
            <option>Telugu</option>
            <option>Hindi</option>
            <option>English</option>
            <option>Kannada</option>
            <option>Malayalam</option>
          </select>
        </div>

        <button className="ivr-save-btn" onClick={handleSave}>
          {saved ? '✅ Saved!' : '💾 Save Settings'}
        </button>
      </div>

      {/* Call log */}
      <div className="ivr-log-card">
        <h3 className="ilc-title">📋 Recent IVR Call Log</h3>
        <div className="ivr-log-list">
          {IVR_CALL_LOG.map((log) => (
            <div className="ivr-log-item" key={log.id}>
              <div className="ili-left">
                <span className="ili-icon">📞</span>
                <div>
                  <div className="ili-about">{log.about}</div>
                  <div className="ili-from">{log.from}</div>
                </div>
              </div>
              <div className="ili-right">
                <span className="ili-result">{log.result}</span>
                <span className="ili-time">{log.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* IVR key guide */}
      <div className="ivr-key-card">
        <h3 className="ikc-title">🎙️ IVR Key Guide</h3>
        <div className="ivr-keys">
          <div className="ivr-key ivr-key--accept"><span className="ik-num">1</span><span className="ik-lbl">Accept Booking</span></div>
          <div className="ivr-key ivr-key--reject"><span className="ik-num">2</span><span className="ik-lbl">Reject Booking</span></div>
          <div className="ivr-key ivr-key--nego">  <span className="ik-num">3</span><span className="ik-lbl">Negotiate / Callback</span></div>
          <div className="ivr-key ivr-key--repeat"><span className="ik-num">9</span><span className="ik-lbl">Repeat Message</span></div>
        </div>
      </div>

    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN: ARTIST DASHBOARD
══════════════════════════════════════════════════════════ */

const TABS = [
  { key: 'bookings',  label: '📋 Bookings',  icon: '📋' },
  { key: 'portfolio', label: '🖼️ Portfolio', icon: '🖼️' },
  { key: 'ivr',       label: '📞 IVR',       icon: '📞' },
];

export default function ArtistDashboard() {
  const navigate  = useNavigate();
  const [tab, setTab] = useState('bookings');

  return (
    <div className="ad-root">
      <TopBorder />

      <div className="corner corner--tl"><FlowerSVG size={50} color="#1e8449" opacity={0.5} /></div>
      <div className="corner corner--tr"><FlowerSVG size={50} color="#1e8449" opacity={0.5} /></div>

      {/* Back */}
      <button className="ad-back-btn" onClick={() => navigate('/')}>← Home</button>

      {/* Artist profile strip */}
      <header className="ad-header">
        <div className="ad-avatar">{ARTIST_PROFILE.avatar}</div>
        <div className="ad-info">
          <h1 className="ad-name">{ARTIST_PROFILE.name}</h1>
          <div className="ad-chips">
            {ARTIST_PROFILE.artForms.map((af) => (
              <span key={af} className="ad-chip">{af}</span>
            ))}
          </div>
          <p className="ad-meta">
            📍 {ARTIST_PROFILE.location} &nbsp;·&nbsp;
            ⭐ {ARTIST_PROFILE.rating} ({ARTIST_PROFILE.reviews} reviews) &nbsp;·&nbsp;
            {ARTIST_PROFILE.experience} yrs experience
          </p>
        </div>
      </header>

      {/* Tab nav */}
      <nav className="ad-tab-nav">
        {TABS.map((t) => (
          <button
            key={t.key}
            className={`ad-tab ${tab === t.key ? 'ad-tab--active' : ''}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      {/* Tab content */}
      <div className="ad-body">
        {tab === 'bookings'  && <ManageBookings />}
        {tab === 'portfolio' && <Portfolio />}
        {tab === 'ivr'       && <IVRSupport />}
      </div>

      <TopBorder />
    </div>
  );
}
