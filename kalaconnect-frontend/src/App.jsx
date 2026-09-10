import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage       from './pages/LandingPage';
import CustomerDashboard from './pages/CustomerDashboard';
import ArtistDashboard   from './pages/ArtistDashboard';
import SearchResults     from './pages/SearchResults';

export default function App() {
  return (
    <BrowserRouter basename="/sih">
      <Routes>
        <Route path="/"               element={<LandingPage />} />
        <Route path="/customer"       element={<CustomerDashboard />} />
        <Route path="/artist"         element={<ArtistDashboard />} />
        <Route path="/search-results" element={<SearchResults />} />
      </Routes>
    </BrowserRouter>
  );
}