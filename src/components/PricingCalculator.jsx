import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Check, ArrowRight } from 'lucide-react';

const PACKAGES = [
  {
    id: 'standard',
    name: 'Veg Standard',
    pricePerPlate: 300,
    desc: 'Traditional South Indian leaf service, 2 starters, 2 mains, 1 dessert, mineral water.',
  },
  {
    id: 'premium',
    name: 'Veg Premium',
    pricePerPlate: 450,
    desc: 'Buffet/Service setup, 3 starters, 3 mains, 2 desserts, welcome drinks, standard decorations.',
  },
  {
    id: 'royal',
    name: 'Veg Royal',
    pricePerPlate: 600,
    desc: 'Premium buffet service, 4 starters, 4 mains (Indian & Chinese), 3 desserts, mocktail bar, premium presentation.',
  }
];

const ADDONS = [
  { id: 'dj', name: 'Professional DJ & Sound Setup', price: 5000 },
  { id: 'lighting', name: 'Premium Stage & Ambient Lighting', price: 8000 },
  { id: 'decor', name: 'Luxury Stage Floral Decor', price: 15000 },
  { id: 'rooms', name: 'Premises Lodging (2 AC + Non-AC)', price: 6000 }
];

export default function PricingCalculator({ onSelectEstimate }) {
  const [eventType, setEventType] = useState('wedding');
  const [guestCount, setGuestCount] = useState(150);
  const [selectedPackage, setSelectedPackage] = useState('premium');
  const [selectedAddons, setSelectedAddons] = useState(['dj', 'lighting']);

  const baseRental = 10000;
  
  const currentPkg = PACKAGES.find(p => p.id === selectedPackage) || PACKAGES[0];
  const foodCost = guestCount * currentPkg.pricePerPlate;
  
  const addonsCost = selectedAddons.reduce((sum, addonId) => {
    const addon = ADDONS.find(a => a.id === addonId);
    return sum + (addon ? addon.price : 0);
  }, 0);

  const totalEstimate = baseRental + foodCost + addonsCost;

  const handleAddonToggle = (addonId) => {
    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(selectedAddons.filter(id => id !== addonId));
    } else {
      setSelectedAddons([...selectedAddons, addonId]);
    }
  };

  const handleInquire = () => {
    if (onSelectEstimate) {
      onSelectEstimate({
        eventType,
        guestCount,
        packageName: currentPkg.name,
        addons: selectedAddons.map(id => ADDONS.find(a => a.id === id)?.name).filter(Boolean),
        totalEstimate
      });
      // Scroll to contact form
      const contactSec = document.getElementById('contact');
      if (contactSec) {
        contactSec.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="pricing-section" id="pricing">
      <div className="section-container">
        
        {/* Header Block */}
        <div className="section-header-center">
          <span className="section-tag">TRANSPARENT PRICING</span>
          <h2 className="section-title">
            ESTIMATE YOUR <span className="highlight-serif">CUSTOM CELEBRATION</span>
          </h2>
          <div className="header-divider-center">
            <span className="divider-dot"></span>
          </div>
          <p className="section-desc-center">
            Plan your budget interactively. Choose your event type, guest size, catering package, and premium add-ons to preview an instant estimated quote.
          </p>
        </div>

        {/* Calculator Widget grid */}
        <div className="calculator-wrapper">
          {/* Left panel: Controls */}
          <div className="calculator-controls">
            
            {/* Event Type Select */}
            <div className="control-group">
              <label className="control-label">Event Type</label>
              <div className="event-type-grid">
                {['wedding', 'engagement', 'reception', 'party', 'corporate'].map((type) => (
                  <motion.button
                    key={type}
                    type="button"
                    className={`btn-toggle-option ${eventType === type ? 'active' : ''}`}
                    onClick={() => setEventType(type)}
                    whileTap={{ scale: 0.95 }}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Guest Count Slider */}
            <div className="control-group">
              <div className="slider-label-row">
                <label className="control-label">Guest Capacity</label>
                <span className="slider-value">{guestCount} Guests</span>
              </div>
              <input
                type="range"
                min="50"
                max="300"
                step="10"
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="custom-range-slider"
              />
              <div className="slider-limits">
                <span>Min: 50 guests</span>
                <span>Max: 300 guests</span>
              </div>
            </div>

            {/* Package Tier Selection */}
            <div className="control-group">
              <label className="control-label">Catering Package (Pure Veg)</label>
              <div className="package-options-grid">
                {PACKAGES.map((pkg) => (
                  <motion.div
                    key={pkg.id}
                    className={`package-card ${selectedPackage === pkg.id ? 'active' : ''}`}
                    onClick={() => setSelectedPackage(pkg.id)}
                    whileTap={{ scale: 0.98 }}
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="package-card-header">
                      <span className="package-name">{pkg.name}</span>
                      <span className="package-price">₹{pkg.pricePerPlate}/plate</span>
                    </div>
                    <p className="package-desc">{pkg.desc}</p>
                    <div className="package-select-indicator">
                      {selectedPackage === pkg.id && <Check size={12} />}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Addons Selection */}
            <div className="control-group">
              <label className="control-label">Optional Add-ons & Amenities</label>
              <div className="addons-list">
                {ADDONS.map((addon) => {
                  const isSelected = selectedAddons.includes(addon.id);
                  return (
                    <motion.div
                      key={addon.id}
                      className={`addon-list-item ${isSelected ? 'active' : ''}`}
                      onClick={() => handleAddonToggle(addon.id)}
                      whileTap={{ scale: 0.98 }}
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="addon-checkbox">
                        {isSelected && <Check size={12} />}
                      </div>
                      <span className="addon-name">{addon.name}</span>
                      <span className="addon-price">+₹{addon.price.toLocaleString('en-IN')}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right panel: Live Estimate & Invoice Preview */}
          <div className="calculator-summary">
            <div className="summary-card">
              <div className="summary-header">
                <Calculator size={20} className="summary-icon" />
                <h3 className="summary-title">Estimate Summary</h3>
              </div>

              {/* Items list breakdown */}
              <div className="breakdown-list">
                <div className="breakdown-item">
                  <span className="item-label">Venue Hall Rental (1 Day)</span>
                  <span className="item-value">₹{baseRental.toLocaleString('en-IN')}</span>
                </div>
                <div className="breakdown-item">
                  <span className="item-label">
                    Catering ({guestCount} guests × ₹{currentPkg.pricePerPlate})
                  </span>
                  <span className="item-value">₹{foodCost.toLocaleString('en-IN')}</span>
                </div>
                
                {selectedAddons.length > 0 && (
                  <div className="breakdown-addons-group">
                    <div className="breakdown-addons-title">Selected Add-ons</div>
                    {selectedAddons.map(addonId => {
                      const addon = ADDONS.find(a => a.id === addonId);
                      if (!addon) return null;
                      return (
                        <div className="breakdown-addon-row" key={addonId}>
                          <span>• {addon.name}</span>
                          <span>₹{addon.price.toLocaleString('en-IN')}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Total Row */}
              <div className="summary-total-row">
                <span className="total-label">Total Estimated Cost</span>
                <span className="total-value">₹{totalEstimate.toLocaleString('en-IN')}</span>
              </div>

              <div className="summary-disclaimer">
                *This is an approximate pricing estimate. Final rates may vary based on decoration design complexity, festival dates, and custom menu adjustments.
              </div>

              {/* Action Button */}
              <motion.button 
                type="button" 
                className="btn-summary-action"
                onClick={handleInquire}
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.02 }}
              >
                Inquire For This Package <ArrowRight size={14} className="btn-arrow" />
              </motion.button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
