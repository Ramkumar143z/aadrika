import React from 'react';
import { motion } from 'framer-motion';
import { 
  Utensils, 
  Music, 
  Sparkles, 
  Zap, 
  Bed, 
  Accessibility, 
  Car, 
  Calendar 
} from 'lucide-react';

const amenityItems = [
  {
    icon: Utensils,
    title: 'Veg Multi-Cuisine Catering',
    desc: 'Customizable pure vegetarian menu featuring traditional South Indian, North Indian, and international delicacies prepared by expert chefs.',
  },
  {
    icon: Music,
    title: 'Professional DJ & Sound',
    desc: 'High-fidelity audio systems and DJ setup tailored to keep energy levels vibrant across all wedding and celebration events.',
  },
  {
    icon: Sparkles,
    title: 'Ambient & Stage Lighting',
    desc: 'Stunning professional stage lighting, spotlight systems, and elegant ambient illuminations to craft the perfect photo-ready mood.',
  },
  {
    icon: Zap,
    title: 'Full Power Backup',
    desc: 'Heavy-duty power generators ensuring uninterrupted electricity backup for stages, air conditioning, and event lighting.',
  },
  {
    icon: Bed,
    title: 'Bridal & Guest Lodging',
    desc: '2 luxury AC suites for the bridal couple along with multiple non-AC guest rooms conveniently located on-premises.',
  },
  {
    icon: Accessibility,
    title: 'Wheelchair Accessibility',
    desc: 'Fully wheelchair accessible entrances, pathways, and restrooms designed for the comfort of elderly and special-needs guests.',
  },
  {
    icon: Car,
    title: 'Secured Parking',
    desc: 'Private parking space on-site supporting up to 20 vehicles with managed security and drop-off ease.',
  },
  {
    icon: Calendar,
    title: 'Event Management Team',
    desc: 'Dedicated on-site coordinators assisting with decorator alignment, catering timelines, and day-of execution logistics.',
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 80, damping: 15 }
  }
};

export default function Amenities() {
  return (
    <section className="amenities-section" id="amenities">
      <div className="section-container">
        {/* Header Block */}
        <div className="section-header-center">
          <span className="section-tag">PREMIUM CONVENIENCES</span>
          <h2 className="section-title">
            VIBRANT EVENTS, <span className="highlight-serif">SEAMLESS COMFORT</span>
          </h2>
          <div className="header-divider-center">
            <span className="divider-dot"></span>
          </div>
          <p className="section-desc-center">
            Aadrika Hall is equipped with comprehensive modern amenities and professional services designed to minimize vendor coordination stress and make every celebration flawless.
          </p>
        </div>

        {/* Grid layout */}
        <motion.div 
          className="amenities-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {amenityItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div 
                key={idx} 
                className="amenity-card"
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
              >
                <div className="amenity-glow"></div>
                <div className="amenity-icon-wrapper">
                  <Icon className="amenity-icon" size={24} />
                </div>
                <h3 className="amenity-title">{item.title}</h3>
                <p className="amenity-desc">{item.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
