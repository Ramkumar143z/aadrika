import React from 'react';
import { motion } from 'framer-motion';
import { Home, Bed, Sparkles, Calculator, Calendar } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: Home, targetId: 'home' },
  { id: 'accommodations', label: 'Lodging', icon: Bed, targetId: 'accommodations-section' },
  { id: 'amenities', label: 'Amenities', icon: Sparkles, targetId: 'amenities' },
  { id: 'pricing', label: 'Estimator', icon: Calculator, targetId: 'pricing' },
  { id: 'contact', label: 'Book', icon: Calendar, targetId: 'contact' }
];

export default function BottomNavBar({ activeSection, onNavigate }) {
  const handleTap = (targetId) => {
    if (onNavigate) {
      onNavigate(targetId);
    } else {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="mobile-bottom-nav">
      <div className="bottom-nav-glass">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <motion.button
              key={item.id}
              className={`bottom-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => handleTap(item.targetId)}
              whileTap={{ scale: 0.88 }}
              aria-label={item.label}
            >
              <div className="nav-icon-wrapper">
                <Icon size={18} className="nav-icon" />
                {isActive && (
                  <motion.span 
                    layoutId="activeIndicator"
                    className="active-dot"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </div>
              <span className="nav-label">{item.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
