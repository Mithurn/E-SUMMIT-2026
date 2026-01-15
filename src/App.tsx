import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import EntryAnimation from './components/EntryAnimation';
import ScrollToTop from './components/ScrollToTop';
import Spotlight from './components/Spotlight';

// Pages
import Home from './pages/Home';
import Events from './pages/Events';
import Schedule from './pages/Schedule';
import Team from './pages/Team';
import Sponsors from './pages/Sponsors';
import Venue from './pages/Venue';
import Contact from './pages/Contact';

function AppContent() {
  const [showEntry, setShowEntry] = useState(true);

  // If user refreshes on a subpage, we might want to skip animation or keep it.
  // For now, let's show it once per session if possible, but state resets on refresh.
  // To keep it simple: Show entry animation on first load, then reveal site.

  const handleEnter = () => {
    setShowEntry(false);
  };

  return (
    <>
      {showEntry && <EntryAnimation onEnter={handleEnter} />}

      <div className={`app-content ${showEntry ? 'hidden' : 'visible'}`}>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/team" element={<Team />} />
            <Route path="/sponsors" element={<Sponsors />} />
            <Route path="/venue" element={<Venue />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <Spotlight />
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;
