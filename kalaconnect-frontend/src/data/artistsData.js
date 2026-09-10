/**
 * Mock artist database.
 * In production this will be fetched from /api/artists
 * with collaborative + content-based filtering on the backend.
 */

export const ARTISTS = [
  {
    id: 1,
    name: 'Muthu Nadaswaram Troupe',
    artForms: ['Nadaswaram', 'Thavil'],
    tags: ['marriage', 'temple_festival'],
    location: 'Madurai',
    lat: 9.9252, lng: 78.1198,
    rating: 4.9,
    reviews: 132,
    experience: 22,
    priceMin: 8000,
    priceMax: 25000,
    avatar: '🎺',
    bio: 'Award-winning Nadaswaram troupe with 22 years of experience in weddings and temple festivals across Tamil Nadu.',
    deviceType: 'smartphone',
    available: true,
    languages: ['Tamil', 'Telugu'],
  },
  {
    id: 2,
    name: 'Selvi Karagattam Group',
    artForms: ['Karagattam'],
    tags: ['marriage', 'cultural_night', 'tourism'],
    location: 'Thanjavur',
    lat: 10.7870, lng: 79.1378,
    rating: 4.7,
    reviews: 89,
    experience: 15,
    priceMin: 5000,
    priceMax: 18000,
    avatar: '🏺',
    bio: 'Traditional Karagattam performers skilled in both devotional and folk styles. Perfect for weddings and cultural events.',
    deviceType: 'button',
    available: true,
    languages: ['Tamil'],
  },
  {
    id: 3,
    name: 'Raja Bharatanatyam Academy',
    artForms: ['Bharatanatyam'],
    tags: ['marriage', 'corporate', 'school_college', 'cultural_night'],
    location: 'Chennai',
    lat: 13.0827, lng: 80.2707,
    rating: 4.8,
    reviews: 204,
    experience: 18,
    priceMin: 12000,
    priceMax: 50000,
    avatar: '💃',
    bio: 'Classical Bharatanatyam performances by trained dancers. Ideal for corporate galas, college fests, and weddings.',
    deviceType: 'smartphone',
    available: true,
    languages: ['Tamil', 'English', 'Hindi'],
  },
  {
    id: 4,
    name: 'Arumugam Therukoothu Party',
    artForms: ['Therukoothu', 'Villupattu'],
    tags: ['temple_festival', 'cultural_night', 'tourism'],
    location: 'Kumbakonam',
    lat: 10.9617, lng: 79.3881,
    rating: 4.6,
    reviews: 67,
    experience: 30,
    priceMin: 4000,
    priceMax: 15000,
    avatar: '🎭',
    bio: 'Veteran Therukoothu artists keeping alive the ancient street theatre tradition of Tamil Nadu.',
    deviceType: 'button',
    available: true,
    languages: ['Tamil'],
  },
  {
    id: 5,
    name: 'Kavitha Villupattu Ensemble',
    artForms: ['Villupattu'],
    tags: ['temple_festival', 'school_college', 'cultural_night'],
    location: 'Trichy',
    lat: 10.7905, lng: 78.7047,
    rating: 4.5,
    reviews: 54,
    experience: 12,
    priceMin: 3000,
    priceMax: 10000,
    avatar: '🏹',
    bio: 'Narrative bow-song performers blending storytelling with folk music — a crowd favourite at temple fests.',
    deviceType: 'smartphone',
    available: true,
    languages: ['Tamil'],
  },
  {
    id: 6,
    name: 'Sudha Kolattam Troupe',
    artForms: ['Kolattam', 'Oyilattam'],
    tags: ['school_college', 'corporate', 'cultural_night', 'birthday'],
    location: 'Coimbatore',
    lat: 11.0168, lng: 76.9558,
    rating: 4.6,
    reviews: 78,
    experience: 10,
    priceMin: 4500,
    priceMax: 14000,
    avatar: '🪘',
    bio: 'Energetic Kolattam and Oyilattam dance group perfect for school annual days and corporate team events.',
    deviceType: 'smartphone',
    available: true,
    languages: ['Tamil', 'Kannada'],
  },
  {
    id: 7,
    name: 'Pandian Carnatic Orchestra',
    artForms: ['Carnatic Music', 'Flute'],
    tags: ['corporate', 'marriage', 'birthday', 'cultural_night'],
    location: 'Madurai',
    lat: 9.9252, lng: 78.1198,
    rating: 4.9,
    reviews: 156,
    experience: 25,
    priceMin: 15000,
    priceMax: 60000,
    avatar: '🎵',
    bio: 'Professional Carnatic music ensemble available for concerts, weddings, and corporate events.',
    deviceType: 'smartphone',
    available: true,
    languages: ['Tamil', 'English'],
  },
  {
    id: 8,
    name: 'Annamalai Poikkal Kuthirai',
    artForms: ['Poikkal Kuthirai', 'Dummy Horse Dance'],
    tags: ['temple_festival', 'marriage', 'tourism', 'cultural_night'],
    location: 'Salem',
    lat: 11.6643, lng: 78.1460,
    rating: 4.4,
    reviews: 43,
    experience: 20,
    priceMin: 6000,
    priceMax: 20000,
    avatar: '🐴',
    bio: 'Spectacular dummy horse dance performers — the showstopper of any procession or temple festival.',
    deviceType: 'button',
    available: true,
    languages: ['Tamil'],
  },
  {
    id: 9,
    name: 'Meenakshi Silambattam Group',
    artForms: ['Silambattam', 'Martial Arts'],
    tags: ['school_college', 'tourism', 'cultural_night', 'corporate'],
    location: 'Chennai',
    lat: 13.0827, lng: 80.2707,
    rating: 4.7,
    reviews: 91,
    experience: 14,
    priceMin: 7000,
    priceMax: 22000,
    avatar: '🥢',
    bio: 'Traditional Tamil martial art Silambattam demonstrations — high-energy and culturally rich.',
    deviceType: 'smartphone',
    available: true,
    languages: ['Tamil', 'English'],
  },
  {
    id: 10,
    name: 'Durairaj Folk Percussion Band',
    artForms: ['Parai', 'Urumi Melam'],
    tags: ['temple_festival', 'tourism', 'cultural_night'],
    location: 'Coimbatore',
    lat: 11.0168, lng: 76.9558,
    rating: 4.5,
    reviews: 62,
    experience: 17,
    priceMin: 3500,
    priceMax: 12000,
    avatar: '🥁',
    bio: 'Powerful Parai and Urumi percussion ensembles for processions and cultural heritage showcases.',
    deviceType: 'button',
    available: true,
    languages: ['Tamil'],
  },
];

/* ── Haversine distance (km) ─────────────────────────────── */
function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/* ── City coordinates lookup (subset) ──────────────────── */
const CITY_COORDS = {
  madurai:     [9.9252,  78.1198],
  chennai:     [13.0827, 80.2707],
  coimbatore:  [11.0168, 76.9558],
  trichy:      [10.7905, 78.7047],
  thanjavur:   [10.7870, 79.1378],
  kumbakonam:  [10.9617, 79.3881],
  salem:       [11.6643, 78.1460],
  tirunelveli: [8.7139,  77.7567],
  vellore:     [12.9165, 79.1325],
  erode:       [11.3410, 77.7172],
};

function getCityCoords(locationStr) {
  const key = locationStr.toLowerCase().trim().split(/[\s,]+/)[0];
  return CITY_COORDS[key] || null;
}

/**
 * AI Recommendation Engine (frontend mock):
 *  1. Content-based: filter by event type tag
 *  2. Geo-based: within radius (expand if too few results)
 *  3. Budget filter: artist price range overlaps customer budget
 *  4. Rank by: rating + experience score + budget fit score
 */
export function recommendArtists({ eventType, location, budgetMin, budgetMax }) {
  const budget_min = Number(budgetMin);
  const budget_max = Number(budgetMax);
  const coords     = getCityCoords(location);

  let results = ARTISTS.filter((a) => {
    // 1. Content-based: event type match
    if (eventType && !a.tags.includes(eventType)) return false;
    // 2. Budget overlap
    if (a.priceMax < budget_min || a.priceMin > budget_max) return false;
    return true;
  });

  // 3. Geo-based ranking with expanding radius
  if (coords) {
    const [lat, lng] = coords;
    const withDist = results.map((a) => ({
      ...a,
      distanceKm: Math.round(haversine(lat, lng, a.lat, a.lng)),
    }));

    // Try 200 km first, expand to 600 km if < 3 results
    let nearby = withDist.filter((a) => a.distanceKm <= 200);
    if (nearby.length < 3) nearby = withDist.filter((a) => a.distanceKm <= 600);
    if (nearby.length < 2) nearby = withDist; // fallback: all

    results = nearby;
  } else {
    results = results.map((a) => ({ ...a, distanceKm: null }));
  }

  // 4. Score & rank: rating (40%) + experience (30%) + budget centrality (30%)
  results = results
    .map((a) => {
      const midCustomer = (budget_min + budget_max) / 2;
      const midArtist   = (a.priceMin + a.priceMax) / 2;
      const budgetScore = 1 - Math.abs(midCustomer - midArtist) / (budget_max - budget_min + 1);
      const score =
        (a.rating / 5) * 0.4 +
        (Math.min(a.experience, 30) / 30) * 0.3 +
        Math.max(0, budgetScore) * 0.3;
      return { ...a, aiScore: Math.round(score * 100) };
    })
    .sort((a, b) => b.aiScore - a.aiScore);

  return results;
}
