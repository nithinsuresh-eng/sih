import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopBorder from '../components/TopBorder';
import FlowerSVG from '../components/FlowerSVG';
import './LandingPage.css';

function LeafSVG({ color = '#e67e22', size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 2C8 6 4 10 4 15a8 8 0 0016 0C20 10 16 6 12 2z" />
    </svg>
  );
}

function RoleCard({ role, icon, features, buttonLabel, onClick, variant }) {
  return (
    <div className={`role-card role-card--${variant}`}>
      <div className="card-bg-flower">
        <FlowerSVG size={90} color={variant === 'customer' ? '#8b1a1a' : '#0d4d3a'} opacity={0.5} />
      </div>
      <div className="card-header">
        <div className={`card-icon card-icon--${variant}`}>
          <span className="card-icon-emoji">{icon}</span>
        </div>
        <h2 className="card-title">{role}</h2>
      </div>
      <ul className="card-features">
        {features.map((f, i) => (
          <li key={i} className="card-feature-item">
            <LeafSVG color={variant === 'customer' ? '#e67e22' : '#2ecc71'} size={18} />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <button className={`card-btn card-btn--${variant}`} onClick={onClick}>
        {buttonLabel} →
      </button>
    </div>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();

  const customerFeatures = [
    'Book folk artists for your events',
    'AI-powered artist recommendations',
    'Geo-based nearby artist matching',
    'Direct booking, zero middlemen',
  ];
  const artistFeatures = [
    'Receive direct booking requests',
    'Manage your artist profile & portfolio',
    'Accept, reject or negotiate bookings',
    'IVR support for non-smartphone users',
  ];

  return (
    <div className="landing-root">
      <TopBorder />
      <div className="corner corner--tl"><FlowerSVG size={55} color="#e74c3c" opacity={0.6} /></div>
      <div className="corner corner--tr"><FlowerSVG size={55} color="#e74c3c" opacity={0.6} /></div>
      <div className="corner corner--bl"><FlowerSVG size={45} color="#c0392b" opacity={0.4} /></div>
      <div className="corner corner--br"><FlowerSVG size={45} color="#c0392b" opacity={0.4} /></div>

      <header className="hero">
        <h1 className="hero-title">KalaConnect</h1>
        <p className="hero-subtitle">
          Bridging traditional folk artists directly with the world — no middlemen, just music &amp; culture.
        </p>
      </header>

      <div className="divider">
        <div className="divider-line" />
        <div className="divider-leaves">
          <LeafSVG color="#e74c3c" size={20} />
          <LeafSVG color="#e67e22" size={24} />
          <LeafSVG color="#e74c3c" size={20} />
        </div>
        <div className="divider-line" />
      </div>

      <main className="cards-grid">
        <RoleCard
          role="Customer"
          icon="🎭"
          features={customerFeatures}
          buttonLabel="Enter as Customer"
          onClick={() => navigate('/customer')}
          variant="customer"
        />
        <RoleCard
          role="Artist"
          icon="🎺"
          features={artistFeatures}
          buttonLabel="Enter as Artist"
          onClick={() => navigate('/artist')}
          variant="artist"
        />
      </main>

      <div className="bottom-leaves">
        <LeafSVG color="#e74c3c" size={22} />
        <LeafSVG color="#e67e22" size={18} />
        <LeafSVG color="#f1c40f" size={22} />
      </div>

      <TopBorder />
    </div>
  );
}
