import React, { useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import TopBorder from '../components/TopBorder';
import FlowerSVG  from '../components/FlowerSVG';
import { recommendArtists } from '../data/artistsData';
import './SearchResults.css';

/* ── Event label map ─────────────────────────────────────── */
const EVENT_LABELS = {
  marriage:        '💍 Marriage / Wedding',
  temple_festival: '🪔 Temple Festival',
  corporate:       '🏢 Corporate Event',
  school_college:  '🎓 School / College Function',
  birthday:        '🎂 Birthday Celebration',
  cultural_night:  '🎭 Cultural Night',
  tourism:         '🗺️ Tourism / Heritage Tour',
  other:           '✨ Other',
};

/* ── Star rating display ─────────────────────────────────── */
function Stars({ rating }) {
  return (
    <span className="stars" title={`${rating} / 5`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={s <= Math.round(rating) ? 'star star--on' : 'star star--off'}>★</span>
      ))}
      <span className="star-num">{rating}</span>
    </span>
  );
}



/* ── Artist card ─────────────────────────────────────────── */
function ArtistCard({ artist, onBook }) {
  const fmt  = (n) => `₹${Number(n).toLocaleString('en-IN')}`;
  const dist = artist.distanceKm !== null ? `${artist.distanceKm} km away` : '';

  return (
    <div className="artist-card">
      <div className="artist-card-top">
        {/* Avatar */}
        <div className="artist-avatar">{artist.avatar}</div>

        {/* Info */}
        <div className="artist-info">
          <h3 className="artist-name">{artist.name}</h3>
          <div className="artist-arts">
            {artist.artForms.map((af) => (
              <span key={af} className="art-chip">{af}</span>
            ))}
          </div>
          <div className="artist-meta-row">
            <Stars rating={artist.rating} />
            <span className="meta-sep">·</span>
            <span className="artist-reviews">{artist.reviews} reviews</span>
            <span className="meta-sep">·</span>
            <span className="artist-exp">{artist.experience} yrs exp</span>
          </div>
          <div className="artist-location-row">
            <span className="loc-pin">📍</span>
            <span className="artist-loc">{artist.location}</span>
            {dist && <span className="artist-dist">&nbsp;· {dist}</span>}
            {artist.deviceType === 'button' && (
              <span className="ivr-badge" title="IVR call will be triggered">📞 IVR</span>
            )}
          </div>
        </div>
      </div>

      {/* Bio */}
      <p className="artist-bio">{artist.bio}</p>

      {/* Languages */}
      <div className="artist-langs">
        🗣️ {artist.languages.join(', ')}
      </div>

      {/* Footer */}
      <div className="artist-card-footer">
        <div className="artist-price">
          <span className="price-label">Price Range</span>
          <span className="price-val">{fmt(artist.priceMin)} – {fmt(artist.priceMax)}</span>
        </div>
        <button className="book-btn" onClick={() => onBook(artist)}>
          Book Now →
        </button>
      </div>
    </div>
  );
}

/* ── Search Results Page ─────────────────────────────────── */
export default function SearchResults() {
  const navigate = useNavigate();
  const [params]  = useSearchParams();

  const eventType = params.get('eventType') || '';
  const eventDate = params.get('eventDate') || '';
  const location  = params.get('location')  || '';
  const budgetMin = params.get('budgetMin') || 2000;
  const budgetMax = params.get('budgetMax') || 20000;

  const fmt = (n) => `₹${Number(n).toLocaleString('en-IN')}`;

  const results = useMemo(
    () => recommendArtists({ eventType, location, budgetMin, budgetMax }),
    [eventType, location, budgetMin, budgetMax]
  );

  const handleBook = (artist) => {
    alert(`✅ Booking request sent to ${artist.name}!\n\n${
      artist.deviceType === 'button'
        ? '📞 This artist uses a basic phone. An automated IVR call will be triggered to confirm availability.'
        : '📱 The artist will be notified via the app.'
    }`);
  };

  return (
    <div className="sr-root">
      <TopBorder />

      <div className="corner corner--tl"><FlowerSVG size={50} color="#e74c3c" opacity={0.45} /></div>
      <div className="corner corner--tr"><FlowerSVG size={50} color="#e74c3c" opacity={0.45} /></div>

      {/* Header */}
      <header className="sr-header">
        <button className="back-btn" onClick={() => navigate('/customer')}>← Edit Search</button>
        <h1 className="sr-title">🎨 AI-Matched Artists</h1>
        <p className="sr-subtitle">
          Showing results for&nbsp;
          <strong>{EVENT_LABELS[eventType] || eventType}</strong>
          &nbsp;on&nbsp;<strong>{eventDate || '—'}</strong>
          &nbsp;near&nbsp;<strong>{location || '—'}</strong>
          &nbsp;·&nbsp;Budget: <strong>{fmt(budgetMin)} – {fmt(budgetMax)}</strong>
        </p>
      </header>

      {/* Results count strip */}
      <div className="results-strip">
        <span className="results-count">{results.length} artist{results.length !== 1 ? 's' : ''} found</span>
        <span className="results-algo">
          🤖 Ranked by AI: rating · experience · geo-proximity · budget fit
        </span>
      </div>

      {/* Artist cards */}
      <main className="sr-cards">
        {results.length === 0 ? (
          <div className="no-results">
            <span className="no-results-icon">🔍</span>
            <h3>No artists found</h3>
            <p>Try adjusting your budget range or expanding your location.</p>
            <button className="back-btn-lg" onClick={() => navigate('/customer')}>← Modify Search</button>
          </div>
        ) : (
          results.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} onBook={handleBook} />
          ))
        )}
      </main>

      <TopBorder />
    </div>
  );
}
