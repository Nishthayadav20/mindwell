// src/components/EmergencyModal.js
import React, { useState } from 'react';
import indiaEmergencyServices from '../indiaEmergencyData';
import './EmergencyModal.css';

const EmergencyModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Emergency SOS Pill Button */}
      <button 
        className="floating-sos-btn" 
        onClick={() => setIsOpen(true)}
        aria-label="India Emergency Helplines"
        title="Immediate Crisis & Emergency Helplines (India)"
      >
        <span className="sos-pulse"></span>
        <span className="sos-icon">🚨</span>
        <span className="sos-text">Emergency Help (India)</span>
      </button>

      {/* Emergency Modal Overlay */}
      {isOpen && (
        <div className="sos-modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="sos-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="sos-modal-header">
              <div className="sos-modal-title-wrap">
                <span className="sos-header-icon">🇮🇳</span>
                <div>
                  <h3 className="sos-modal-title">India 24/7 Crisis & Emergency Helplines</h3>
                  <p className="sos-modal-sub">Free, verified government & apex mental health support.</p>
                </div>
              </div>
              <button className="sos-close-btn" onClick={() => setIsOpen(false)}>✕</button>
            </div>

            <div className="sos-quick-strip">
              <a href="tel:112" className="sos-urgent-call">
                🚨 Dial 112 (National All-in-One Emergency)
              </a>
              <a href="tel:14416" className="sos-mental-call">
                🧠 Dial 14416 (Tele-MANAS Mental Health)
              </a>
            </div>

            <div className="sos-helpline-list">
              {indiaEmergencyServices.map(service => (
                <div key={service.id} className="sos-card">
                  <div className="sos-card-header">
                    <div>
                      <h4 className="sos-name">{service.name}</h4>
                      <span className="sos-category">{service.category} • {service.fee}</span>
                    </div>
                    <span className="sos-timing-badge">{service.timing}</span>
                  </div>

                  <p className="sos-desc">{service.description}</p>
                  <p className="sos-langs">🗣️ {service.languages}</p>

                  <a href={`tel:${service.dialNumber}`} className="sos-dial-btn">
                    📞 Call {service.number}
                  </a>
                </div>
              ))}
            </div>

            <div className="sos-modal-footer">
              <p>Disclaimer: In acute physical danger or medical emergency, immediately call 112 or visit the nearest hospital.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmergencyModal;
