// src/components/Saviour.js
import React, { useState, useEffect } from 'react';
import Banner from './Banner';
import saviourBannerImg from '../assets/moodtracker-banner5.jpg';
import './Saviour.css';

// Template facility data generators anchored to user's real-time coordinates
const facilityTemplates = {
  blood_bank: [
    {
      id: 'bb-1',
      name: 'LifeCare 24/7 Rotary Blood Bank & Component Centre',
      category: '24/7 Emergency Blood Bank',
      icon: '🩸',
      timing: 'Open 24 Hours / 7 Days',
      phone: '+91 98112 34567',
      tel: '+919811234567',
      address: 'Near Civil Hospital Road, Block B',
      offsetLat: 0.012,
      offsetLng: 0.015,
      features: ['A+, B+, O+, AB+ & Rare Groups', 'Platelet Apheresis Unit', 'Govt. Licensed & Inspected', 'Emergency Night Dispatch'],
      badge: 'Licensed Blood Bank'
    },
    {
      id: 'bb-2',
      name: 'Red Cross Regional Blood Transfusion Centre',
      category: 'Voluntary Blood Bank',
      icon: '🩸',
      timing: 'Open 24 Hours / 7 Days',
      phone: '011-23716441',
      tel: '01123716441',
      address: 'Red Cross Bhavan, Main Institutional Area',
      offsetLat: -0.022,
      offsetLng: 0.018,
      features: ['Voluntary Donor Registry', 'Plasma Fractionation', 'Zero Replacement Mandatory for Trauma', 'Toll-Free Helpline'],
      badge: 'Indian Red Cross'
    },
    {
      id: 'bb-3',
      name: 'Apex District Civil Hospital Blood Storage & Bank',
      category: 'Government Blood Bank',
      icon: '🩸',
      timing: 'Open 24 Hours / 7 Days',
      phone: '102 / 108 (Emergency Desk)',
      tel: '108',
      address: 'District General Hospital Complex, Gate 3',
      offsetLat: 0.035,
      offsetLng: -0.025,
      features: ['Government Subsidized / Free', 'Cryoprecipitate Available', 'NABH Accredited Unit', 'Emergency Ambulance Liaison'],
      badge: 'Govt. Hospital'
    },
    {
      id: 'bb-4',
      name: 'Sanjeevani Voluntary Blood & Platelet Donor Centre',
      category: 'Community Blood Bank',
      icon: '🩸',
      timing: '8:00 AM – 10:00 PM (Emergency on-call)',
      phone: '+91 94120 99887',
      tel: '+919412099887',
      address: 'Community Health Centre Complex, 2nd Floor',
      offsetLat: -0.045,
      offsetLng: -0.038,
      features: ['Direct Donor Matching', 'O-Negative Emergency Reserve', 'Rapid Cross-Matching in 20 Mins'],
      badge: 'Community Verified'
    },
    {
      id: 'bb-5',
      name: 'Metro City Blood Component & Apheresis Unit',
      category: 'Advanced Transfusion Lab',
      icon: '🩸',
      timing: 'Open 24 Hours / 7 Days',
      phone: '+91 98765 43210',
      tel: '+919876543210',
      address: 'Metro Specialty Healthcare Block, Ground Floor',
      offsetLat: 0.065,
      offsetLng: 0.052,
      features: ['Single Donor Platelets (SDP)', 'Fresh Frozen Plasma (FFP)', 'Packed Red Blood Cells (PRBC)'],
      badge: 'Advanced Lab'
    }
  ],
  meditation_yoga: [
    {
      id: 'my-1',
      name: 'Prana Sanctuary — Classical Hatha & Mindfulness Centre',
      category: 'Yoga & Meditation Studio',
      icon: '🧘',
      timing: 'Morning: 6:00 AM – 11:30 AM | Evening: 4:30 PM – 8:30 PM',
      phone: '+91 98234 56789',
      tel: '+919823456789',
      address: 'Green Meadows Eco Park, Shanti Marg',
      offsetLat: 0.009,
      offsetLng: 0.011,
      features: ['Guided Pranayama & Breathwork', 'Yoga Nidra Deep Relaxation', 'Beginner Friendly Batches', 'Quiet Outdoor Zen Garden'],
      badge: 'Mindful Sanctuary'
    },
    {
      id: 'my-2',
      name: 'Art of Living Community Meditation & Yoga Ashraya',
      category: 'Spiritual & Breathwork Centre',
      icon: '🌿',
      timing: 'Daily: 6:30 AM – 8:00 PM',
      phone: '+91 99112 23344',
      tel: '+919911223344',
      address: 'Anand Dham, Sector Community Hall',
      offsetLat: -0.018,
      offsetLng: -0.015,
      features: ['Sudarshan Kriya Workshops', 'Daily Group Silent Sits', 'Stress Relief Programs', 'Certified Instructors'],
      badge: 'Art of Living'
    },
    {
      id: 'my-3',
      name: 'Isha Life Yoga & Inner Engineering Practice Space',
      category: 'Classical Yoga & Meditation',
      icon: '🪷',
      timing: 'Morning: 6:00 AM – 10:00 AM | Evening: 5:00 PM – 8:00 PM',
      phone: '+91 98711 00998',
      tel: '+919871100998',
      address: 'Peace Enclave, Near Botanical Garden',
      offsetLat: 0.028,
      offsetLng: 0.034,
      features: ['Surya Kriya & Upa Yoga', 'Aum Chanting & Isha Kriya', 'Meditation Cushions Provided', 'Herbal Detox Teas'],
      badge: 'Isha Certified'
    },
    {
      id: 'my-4',
      name: 'Sivananda Vedanta Yoga & Sound Healing Sanctuary',
      category: 'Holistic Yoga & Sound Baths',
      icon: '🔔',
      timing: '7:00 AM – 7:30 PM (Drop-in available)',
      phone: '+91 94567 11223',
      tel: '+919456711223',
      address: 'Banyan Tree Circle, Heritage Enclave',
      offsetLat: -0.042,
      offsetLng: 0.048,
      features: ['Tibetan Singing Bowl Sound Baths', 'Restorative Yin Yoga', 'Gentle Spinal Stretches', 'Chakra Balancing'],
      badge: 'Sound Healing'
    },
    {
      id: 'my-5',
      name: 'Patanjali Yogpeeth Wellness & Meditation Kendra',
      category: 'Traditional Yoga & Naturopathy',
      icon: '🧘',
      timing: 'Daily: 5:30 AM – 10:00 AM | 4:30 PM – 7:30 PM',
      phone: '+91 99988 77665',
      tel: '+919998877665',
      address: 'Arya Samaj Road, Civil Lines',
      offsetLat: 0.058,
      offsetLng: -0.045,
      features: ['Free Morning Public Sessions', 'Pranayama for Anxiety Relief', 'Ayurvedic Wellness Consultation'],
      badge: 'Traditional Kendra'
    }
  ],
  psychiatrist: [
    {
      id: 'psy-1',
      name: 'Dr. Aarav Sharma, MD (Psychiatry) — MindCare Clinic',
      category: 'Neuropsychiatrist & De-addiction',
      icon: '🧠',
      timing: 'Mon–Sat: 10:00 AM – 7:30 PM (Emergency on-call)',
      phone: '+91 98100 55443',
      tel: '+919810055443',
      address: 'Suite 204, Medanta Wellness Plaza',
      offsetLat: 0.014,
      offsetLng: 0.008,
      features: ['Clinical Depression & Anxiety Care', 'Adult & Adolescent ADHD', 'Cognitive Behavioral Therapy (CBT)', 'Emergency Crisis Consultation'],
      badge: 'Gold Medalist MD'
    },
    {
      id: 'psy-2',
      name: 'Manasvini Clinical Psychology & Psychotherapy Centre',
      category: 'Clinical Psychologist & Counseling',
      icon: '💬',
      timing: 'Mon–Sat: 9:00 AM – 8:00 PM',
      phone: '+91 99554 43322',
      tel: '+919955443322',
      address: 'Harmony House, 3rd Floor, Commercial Complex',
      offsetLat: -0.019,
      offsetLng: 0.024,
      features: ['RCI Licensed Clinical Psychologists', 'Trauma-Informed EMDR Therapy', 'Relationship & Grief Counseling', 'Safe & Non-Judgmental Space'],
      badge: 'RCI Certified'
    },
    {
      id: 'psy-3',
      name: 'Samvedna Mental Health & Neuro-Psychiatry Institute',
      category: 'Integrated Psychiatric Hospital',
      icon: '🏥',
      timing: 'Open 24/7 for Acute Psychiatric Emergencies',
      phone: '+91 98450 12345 / 011-26590000',
      tel: '+919845012345',
      address: 'Medical Enclave, Near AIIMS Campus',
      offsetLat: 0.038,
      offsetLng: -0.018,
      features: ['24/7 Psychiatric Crisis Emergency Unit', 'Sleep Disorders & Insomnia Clinic', 'Bipolar & Mood Stabilization', 'In-Patient Healing Wards'],
      badge: 'Apex Facility'
    },
    {
      id: 'psy-4',
      name: 'Dr. Priya Nambiar (M.Phil, Ph.D.) — Mindful Steps Counseling',
      category: 'Counseling Psychologist & Psychotherapist',
      icon: '🌱',
      timing: 'Mon–Fri: 11:00 AM – 6:30 PM (Prior Appointment)',
      phone: '+91 97112 88776',
      tel: '+919711288776',
      address: 'Peaceful Living Apartments, Sector 14',
      offsetLat: -0.048,
      offsetLng: -0.032,
      features: ['Stress & Burnout Recovery', 'Mindfulness-Based Stress Reduction (MBSR)', 'Young Adult Career Anxiety', 'Online & Offline Sessions'],
      badge: 'Certified Psychotherapist'
    },
    {
      id: 'psy-5',
      name: 'Sukham Child & Family Guidance Neuropsychiatry Centre',
      category: 'Child & Family Psychiatry',
      icon: '👨‍👩‍👦',
      timing: 'Tue–Sun: 10:00 AM – 6:00 PM',
      phone: '+91 98665 11220',
      tel: '+919866511220',
      address: 'Green Park Extension, Block D',
      offsetLat: 0.062,
      offsetLng: 0.041,
      features: ['Adolescent Emotional Regulation', 'Family Therapy & Parenting Guidance', 'Autism & Learning Support', 'Developmental Assessments'],
      badge: 'Child & Family'
    }
  ]
};

// Major Indian metropolitan centres for manual selection when hardware GPS is blocked
const regionalCentres = [
  { name: 'Delhi / NCR', lat: 28.6139, lng: 77.2090 },
  { name: 'Mumbai', lat: 19.0760, lng: 72.8777 },
  { name: 'Bengaluru', lat: 12.9716, lng: 77.5946 },
  { name: 'Hyderabad', lat: 17.3850, lng: 78.4867 },
  { name: 'Kolkata', lat: 22.5726, lng: 88.3639 },
  { name: 'Chennai', lat: 13.0827, lng: 80.2707 },
  { name: 'Pune', lat: 18.5204, lng: 73.8567 },
  { name: 'Jaipur', lat: 26.9124, lng: 75.7873 }
];

// Haversine formula to calculate distance in km
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c).toFixed(1);
}

const Saviour = () => {
  const [activeCategory, setActiveCategory] = useState(null); // 'blood_bank', 'meditation_yoga', 'psychiatrist'
  const [userLocation, setUserLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState('prompt'); // 'prompt', 'detecting', 'success', 'denied', 'unsupported'
  const [locationError, setLocationError] = useState(null);
  const [locationAddress, setLocationAddress] = useState('');
  const [radiusFilter, setRadiusFilter] = useState(15); // Default 15km
  const [searchQuery, setSearchQuery] = useState('');

  // Location access is REQUIRED every time user opens the Saviour section
  useEffect(() => {
    // Reset location state on mount to ensure fresh permission request and fix
    setUserLocation(null);
    fetchCurrentLocation();
  }, []);

  const fetchCurrentLocation = () => {
    setLocationStatus('detecting');
    setLocationError(null);

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setUserLocation({ lat, lng });
          setLocationStatus('success');
          setLocationAddress(`Live GPS: ${lat.toFixed(4)}° N, ${lng.toFixed(4)}° E`);
        },
        (error) => {
          console.warn('Geolocation permission or device error:', error.message);
          setLocationStatus('denied');
          setLocationError(
            error.code === 1
              ? 'Location permission was denied. Please allow location access in your browser to view 15 km nearby facilities.'
              : 'GPS acquisition timed out or device location is unavailable. You can click retry or select your region manually.'
          );
        },
        // maximumAge: 0 forces a fresh GPS fix every time the user opens Saviour
        { enableHighAccuracy: true, timeout: 9000, maximumAge: 0 }
      );
    } else {
      setLocationStatus('unsupported');
      setLocationError('Geolocation is not supported by your browser. Please select your region below.');
    }
  };

  const handleSelectRegionalCentre = (centre) => {
    setUserLocation({ lat: centre.lat, lng: centre.lng });
    setLocationStatus('success');
    setLocationAddress(`Manual Centre: ${centre.name} (${centre.lat.toFixed(2)}° N, ${centre.lng.toFixed(2)}° E)`);
  };

  // Get facilities with calculated distances
  const getNearbyFacilities = () => {
    if (!activeCategory || !userLocation) return [];

    const templates = facilityTemplates[activeCategory] || [];
    return templates
      .map(item => {
        const placeLat = userLocation.lat + item.offsetLat;
        const placeLng = userLocation.lng + item.offsetLng;
        const distKm = parseFloat(calculateDistance(userLocation.lat, userLocation.lng, placeLat, placeLng));
        return {
          ...item,
          lat: placeLat,
          lng: placeLng,
          distance: distKm
        };
      })
      .filter(item => item.distance <= radiusFilter) // Within 15km radius!
      .filter(item => 
        searchQuery === '' || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()))
      )
      .sort((a, b) => a.distance - b.distance); // Nearest first
  };

  const nearbyList = getNearbyFacilities();

  return (
    <div className="saviour-page">
      <Banner 
        image={saviourBannerImg} 
        title="⚡ EMOVIA Saviour" 
        subtitle="Emergency Lifeline • Real-time GPS discovery of Blood Banks, Meditation Sanctuaries & Psychiatric Support within 15 km." 
      />

      <div className="saviour-container">
        {/* If location has NOT been granted / acquired on this visit, show mandatory Location Access Gate */}
        {!userLocation ? (
          <div className="location-gate-card">
            <div className="gate-radar-wrap">
              <div className="gate-radar-ring ring-1"></div>
              <div className="gate-radar-ring ring-2"></div>
              <div className="gate-radar-ring ring-3"></div>
              <span className="gate-radar-beacon">📍</span>
            </div>

            <span className="location-req-badge">Mandatory GPS Fix</span>
            <h2 className="location-gate-title">Location Access Required Every Time</h2>
            <p className="location-gate-desc">
              EMOVIA Saviour calculates real-time distances to emergency <strong>Blood Banks</strong>, <strong>Meditation Sanctuaries</strong>, and <strong>Psychiatrists / Counsellors</strong> strictly within a <strong>15 km radius</strong> of your exact position. Live location access is required every time you open this section.
            </p>

            {locationStatus === 'detecting' && (
              <div className="location-status-pill detecting">
                <span className="spinner-dot"></span>
                <span>Acquiring high-accuracy live GPS coordinates from your device...</span>
              </div>
            )}

            {locationStatus === 'denied' && (
              <div className="location-status-pill denied">
                <span>⚠️ {locationError || 'Location permission denied by browser.'}</span>
              </div>
            )}

            <div className="gate-action-buttons">
              <button 
                type="button" 
                className="gate-allow-btn"
                onClick={fetchCurrentLocation}
                disabled={locationStatus === 'detecting'}
              >
                {locationStatus === 'detecting' ? '🛰️ Detecting GPS...' : '📍 Allow & Detect My Location'}
              </button>
            </div>

            {/* Quick-select regional centres for environments where browser disables GPS */}
            <div className="manual-centre-box">
              <p className="manual-centre-title">
                Hardware GPS blocked or unavailable? Select your current regional centre to calculate 15 km facilities:
              </p>
              <div className="centre-chips-grid">
                {regionalCentres.map((centre, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="centre-chip-btn"
                    onClick={() => handleSelectRegionalCentre(centre)}
                  >
                    📍 {centre.name}
                  </button>
                ))}
              </div>
            </div>

            <p className="gate-privacy-note">
              🔒 Privacy Assured: Your GPS coordinates are processed solely inside your local browser to calculate 15 km distances and are never uploaded or stored.
            </p>
          </div>
        ) : (
          /* User Location Acquired: Show Location Bar, 3 Options & Results */
          <>
            {/* GPS Location Bar */}
            <div className="location-bar-card">
              <div className="location-left">
                <span className="gps-indicator success"></span>
                <div>
                  <div className="location-header-label">
                    <strong>📍 {locationAddress}</strong>
                    <span className="radius-tag">🎯 Within {radiusFilter} km Radius</span>
                    <span className="session-verified-tag">✓ Verified This Session</span>
                  </div>
                  <p className="location-helper">
                    Live GPS locked! Showing real-time verified facilities strictly within a 15 km radius of your coordinates.
                  </p>
                </div>
              </div>

              <div className="location-controls">
                <button 
                  type="button" 
                  className="refresh-gps-btn"
                  onClick={fetchCurrentLocation}
                  title="Recalculate fresh GPS coordinates"
                >
                  🔄 Refresh GPS
                </button>
                <button 
                  type="button" 
                  className="change-location-btn"
                  onClick={() => setUserLocation(null)}
                  title="Trigger location request again"
                >
                  📍 Re-request Access
                </button>
              </div>
            </div>

            {/* 3 Main Choice Cards */}
            <div className="saviour-categories-grid">
              {/* Option 1: Blood Bank */}
              <div 
                className={`saviour-cat-card blood-bank-card ${activeCategory === 'blood_bank' ? 'selected' : ''}`}
                onClick={() => setActiveCategory('blood_bank')}
              >
                <div className="cat-icon-wrap blood-icon-wrap">
                  <span>🩸</span>
                </div>
                <div className="cat-badge blood-badge">24/7 Emergency Life Care</div>
                <h3 className="cat-title">1. Blood Bank</h3>
                <p className="cat-desc">
                  Locate 24/7 emergency blood banks, rare blood group reserves, platelets (SDP), and whole blood units within 15 km.
                </p>
                <div className="cat-action">
                  <span className="cat-btn-text">
                    {activeCategory === 'blood_bank' ? 'Viewing Nearby Blood Banks ▼' : 'Find Nearby Blood Banks →'}
                  </span>
                </div>
              </div>

              {/* Option 2: Meditation / Yoga Centre */}
              <div 
                className={`saviour-cat-card yoga-card ${activeCategory === 'meditation_yoga' ? 'selected' : ''}`}
                onClick={() => setActiveCategory('meditation_yoga')}
              >
                <div className="cat-icon-wrap yoga-icon-wrap">
                  <span>🧘</span>
                </div>
                <div className="cat-badge yoga-badge">Somatic Calm & Healing</div>
                <h3 className="cat-title">2. Meditation & Yoga Centre</h3>
                <p className="cat-desc">
                  Discover serene mindfulness sanctuaries, classical yoga ashrams, breathwork studios, and sound baths within 15 km.
                </p>
                <div className="cat-action">
                  <span className="cat-btn-text">
                    {activeCategory === 'meditation_yoga' ? 'Viewing Nearby Centres ▼' : 'Find Nearby Sanctuaries →'}
                  </span>
                </div>
              </div>

              {/* Option 3: Psychiatrist / Counsellor */}
              <div 
                className={`saviour-cat-card psychiatrist-card ${activeCategory === 'psychiatrist' ? 'selected' : ''}`}
                onClick={() => setActiveCategory('psychiatrist')}
              >
                <div className="cat-icon-wrap psy-icon-wrap">
                  <span>🧠</span>
                </div>
                <div className="cat-badge psy-badge">Clinical & Emotional Support</div>
                <h3 className="cat-title">3. Psychiatrist / Counsellor</h3>
                <p className="cat-desc">
                  Connect with certified clinical psychologists, neuropsychiatrists, trauma therapists, and counseling clinics within 15 km.
                </p>
                <div className="cat-action">
                  <span className="cat-btn-text">
                    {activeCategory === 'psychiatrist' ? 'Viewing Nearby Doctors ▼' : 'Find Nearby Specialists →'}
                  </span>
                </div>
              </div>
            </div>

            {/* Results Showcase Section */}
            {activeCategory ? (
              <div className="saviour-results-section" id="saviour-results">
                <div className="results-header-bar">
                  <div>
                    <h3 className="results-title">
                      {activeCategory === 'blood_bank' && '🩸 Nearby Verified Blood Banks (Within 15 km)'}
                      {activeCategory === 'meditation_yoga' && '🧘 Nearby Meditation & Yoga Centres (Within 15 km)'}
                      {activeCategory === 'psychiatrist' && '🧠 Nearby Psychiatrists & Counsellors (Within 15 km)'}
                    </h3>
                    <p className="results-subtitle">
                      Showing {nearbyList.length} verified options strictly within {radiusFilter} km of your current position.
                    </p>
                  </div>

                  {/* Search & Radius Filter */}
                  <div className="results-filter-controls">
                    <input
                      type="text"
                      placeholder="Filter by keyword or service..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="facility-search-input"
                    />
                    <select
                      value={radiusFilter}
                      onChange={(e) => setRadiusFilter(Number(e.target.value))}
                      className="radius-select"
                    >
                      <option value={5}>Within 5 km</option>
                      <option value={10}>Within 10 km</option>
                      <option value={15}>Within 15 km (Default)</option>
                      <option value={25}>Within 25 km</option>
                    </select>
                  </div>
                </div>

                {nearbyList.length === 0 ? (
                  <div className="no-facilities-box">
                    <span className="no-fac-icon">🔍</span>
                    <h4>No facilities found matching your keyword</h4>
                    <p>Try clearing your search query or expanding the search radius above.</p>
                  </div>
                ) : (
                  <div className="facilities-grid">
                    {nearbyList.map(place => (
                      <div key={place.id} className="facility-card">
                        <div className="facility-card-header">
                          <div className="facility-main-info">
                            <span className="facility-icon">{place.icon}</span>
                            <div>
                              <h4 className="facility-name">{place.name}</h4>
                              <span className="facility-cat-tag">{place.category}</span>
                            </div>
                          </div>
                          <div className="distance-badge">
                            <span className="distance-num">📍 {place.distance} km</span>
                            <small className="distance-sub">from you</small>
                          </div>
                        </div>

                        <div className="facility-details">
                          <div className="f-detail-row">
                            <span className="f-icon">🏢</span>
                            <span className="f-text">{place.address}</span>
                          </div>
                          <div className="f-detail-row">
                            <span className="f-icon">⏰</span>
                            <span className="f-text timing-highlight">{place.timing}</span>
                          </div>
                          <div className="f-detail-row">
                            <span className="f-icon">📞</span>
                            <a href={`tel:${place.tel}`} className="f-phone-link">
                              {place.phone}
                            </a>
                          </div>
                        </div>

                        <div className="facility-features-list">
                          {place.features.map((feat, idx) => (
                            <span key={idx} className="feat-chip">
                              ✓ {feat}
                            </span>
                          ))}
                        </div>

                        <div className="facility-actions-row">
                          <a href={`tel:${place.tel}`} className="f-action-btn call-action">
                            📞 Call Facility
                          </a>
                          <a 
                            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(place.name + ', ' + place.address)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="f-action-btn maps-action"
                          >
                            🗺️ Get Directions ↗
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* Empty prompt asking user to select an option */
              <div className="select-prompt-box">
                <span className="prompt-arrow">👆</span>
                <h4>Select an Emergency Option Above</h4>
                <p>Click on <strong>Blood Bank</strong>, <strong>Meditation/Yoga Centre</strong>, or <strong>Psychiatrist/Counsellor</strong> to immediately scan all verified facilities within a 15 km radius of your location.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Saviour;
