import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowUpRight, 
  ArrowDown, 
  Instagram, 
  Youtube, 
  Bed, 
  Waves, 
  Flower2, 
  Utensils, 
  Compass, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight 
} from 'lucide-react';
import './App.css';

import Amenities from './components/Amenities';
import PricingCalculator from './components/PricingCalculator';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import BottomNavBar from './components/BottomNavBar';
import MobileMenu from './components/MobileMenu';

// Framer Motion Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1], // out-expo
    },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: 'easeOut',
    },
  },
};

const sidebarVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.5,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

function App() {
  const [videoEnded, setVideoEnded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [selectedEstimate, setSelectedEstimate] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 3000);

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px',
      threshold: 0
    };

    const handleIntersection = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id === 'experiences-section') {
            setActiveSection('accommodations'); // Fallback map since Experiences is first key item
          } else if (id === 'accommodations-section') {
            setActiveSection('accommodations');
          } else if (id === 'amenities') {
            setActiveSection('amenities');
          } else if (id === 'pricing') {
            setActiveSection('pricing');
          } else if (id === 'contact') {
            setActiveSection('contact');
          } else if (id === 'home') {
            setActiveSection('home');
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    const sections = [
      document.getElementById('home'),
      document.getElementById('experiences-section'),
      document.getElementById('accommodations-section'),
      document.getElementById('amenities'),
      document.getElementById('pricing'),
      document.getElementById('contact')
    ].filter(Boolean);

    sections.forEach(s => observer.observe(s));

    return () => {
      clearTimeout(timer);
      sections.forEach(s => observer.unobserve(s));
    };
  }, []);

  return (
    <div className="app-wrapper">
      {/* 1. HERO SECTION */}
      <div className="hero-container" id="home">
        {/* Background Static Image (appears when video ends) */}
        <img 
          src="/day.png" 
          alt="Aadrika Hall" 
          className={`hero-background-image ${videoEnded ? 'visible' : ''}`}
        />

        {/* Background Hover Image (appears when hero buttons are hovered) */}
        <img 
          src="/night.png" 
          alt="Aadrika Hall Night" 
          className={`hero-background-night ${isButtonHovered ? 'visible' : ''}`}
        />

        {/* Background Autoplay Video */}
        <video 
          className={`hero-video ${videoEnded ? 'fade-out' : ''}`}
          src="/hero.mp4" 
          autoPlay 
          muted 
          playsInline
          onEnded={() => setVideoEnded(true)}
        />
        
        {/* Dark overlay for contrast */}
        <div className="video-overlay"></div>

        {/* Left fading glass panel (visible only when video ends) */}
        <div className={`left-glass-panel ${videoEnded ? 'visible' : ''}`}></div>

        {/* Background ambient glow overlays */}
        <div className="hero-ambient-glow"></div>

        {/* NAVIGATION BAR */}
        <motion.header 
          className="navbar"
          initial={{ opacity: 0, y: -20 }}
          animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ pointerEvents: showContent ? 'auto' : 'none' }}
        >
          <div className="logo-container">
            <span>AADRIKA</span>
          </div>

          <nav className="nav-links">
            <a 
              href="#home" 
              className="nav-link"
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
            >Home</a>
            <a 
              href="#experiences-section" 
              className="nav-link"
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
            >Experiences</a>
            <a 
              href="#accommodations-section" 
              className="nav-link"
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
            >Lodging</a>
            <a 
              href="#amenities" 
              className="nav-link"
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
            >Amenities</a>
            <a 
              href="#pricing" 
              className="nav-link"
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
            >Estimator</a>
            <a 
              href="#contact" 
              className="nav-link"
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
            >Contact</a>
          </nav>

          <div className="nav-actions">
            <button 
              className="btn-nav-reserve"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
            >
              Reserve Now
              <span className="arrow-circle">
                <ArrowUpRight size={12} />
              </span>
            </button>
            
            <div 
              className="bento-menu-btn" 
              title="Menu"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <div className="bento-dot"></div>
              <div className="bento-dot"></div>
              <div className="bento-dot"></div>
              <div className="bento-dot"></div>
              <div className="bento-dot"></div>
              <div className="bento-dot"></div>
              <div className="bento-dot"></div>
              <div className="bento-dot"></div>
              <div className="bento-dot"></div>
            </div>
          </div>
        </motion.header>

        {/* MAIN HERO CONTENT */}
        <motion.main 
          className="hero-main-content"
          variants={containerVariants}
          initial="hidden"
          animate={showContent ? "visible" : "hidden"}
        >
          {/* Left text and action block */}
          <div className="hero-text-block">
            <motion.h1 className="hero-heading" variants={fadeInUp}>
              Crafting<br />
              <span className="highlight">the art</span><br />
              of celebration
            </motion.h1>

            <motion.p className="hero-description" variants={fadeInUp}>
              Luxury, serenity, and unforgettable moments for your premium weddings and event celebrations in Coimbatore.
            </motion.p>

            <motion.div className="hero-actions" variants={fadeInUp}>
              <button 
                className="btn-primary"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                onMouseEnter={() => setIsButtonHovered(true)}
                onMouseLeave={() => setIsButtonHovered(false)}
              >
                Book Celebration
                <span className="btn-primary-arrow">
                  <ArrowUpRight size={14} />
                </span>
              </button>
              <button 
                className="btn-secondary"
                onClick={() => document.getElementById('accommodations-section')?.scrollIntoView({ behavior: 'smooth' })}
                onMouseEnter={() => setIsButtonHovered(true)}
                onMouseLeave={() => setIsButtonHovered(false)}
              >
                Explore Lodging
              </button>
            </motion.div>
          </div>

          {/* Right Glassmorphic Preview Card */}
          <motion.div className="experience-card-wrapper" variants={fadeInUp}>
            <div className="experience-card">
              <div className="card-text">
                <h3 className="card-label">Experience<br />Unparalleled</h3>
                <p className="card-description">
                  An extraordinary retreat crafted for the world's most discerning travelers.
                </p>
              </div>
              <div className="card-preview-img-container">
                <img 
                  src="/pool_preview.png" 
                  alt="Pool Preview" 
                  className="card-preview-img" 
                />
              </div>
            </div>
          </motion.div>
        </motion.main>

        {/* HERO FOOTER */}
        <motion.footer 
          className="hero-footer"
          initial={{ opacity: 0 }}
          animate={showContent ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          {/* Bottom Left rotating scroll badge */}
          <div 
            className="scroll-badge-container" 
            onClick={() => document.getElementById('experiences-section')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <div className="orbit-ring ring-1"></div>
            <div className="orbit-ring ring-2"></div>
            <div className="orbit-ring ring-3">
              <div className="orbit-satellite"></div>
            </div>
            <svg viewBox="0 0 100 100" className="rotating-text-svg">
              <defs>
                <path
                  id="scrollCircle"
                  d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                  fill="none"
                />
              </defs>
              <text>
                <textPath href="#scrollCircle" className="rotating-text-path" startOffset="0%">
                  SCROLL DOWN • ART OF ESCAPE • SCROLL DOWN • ART OF ESCAPE •
                </textPath>
              </text>
            </svg>
            <ArrowDown className="scroll-arrow-icon" size={16} />
          </div>

          {/* Bottom Right Carousel slider counter */}
          <div className="carousel-counter">
            <span className="counter-current">01</span>
            <div className="counter-line"></div>
            <span className="counter-total">04</span>
          </div>
        </motion.footer>

        {/* FLOATING SOCIAL SIDEBAR (RIGHT) */}
        <motion.div 
          className="social-sidebar"
          variants={sidebarVariants}
          initial="hidden"
          animate={showContent ? "visible" : "hidden"}
          style={{ pointerEvents: showContent ? 'auto' : 'none' }}
        >
          <motion.a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link" variants={fadeIn}>
            <Instagram className="social-icon" />
          </motion.a>
          <motion.a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-link" variants={fadeIn}>
            <Youtube className="social-icon" />
          </motion.a>
          <motion.a href="https://x.com" target="_blank" rel="noopener noreferrer" className="social-link" variants={fadeIn}>
            {/* Custom official X icon path */}
            <svg viewBox="0 0 24 24" className="social-icon" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </motion.a>
        </motion.div>
      </div>

      {/* 2. CURATED EXPERIENCES SECTION */}
      <section className="experiences-section" id="experiences-section">
        {/* Header Block */}
        <div className="experiences-header">
          <div className="header-left">
            <span className="section-tag">CURATED EXPERIENCES</span>
            <h2 className="section-title">
              DISCOVER A WORLD OF<br />
              <span className="highlight-serif">EXTRAORDINARY MOMENTS</span>
            </h2>
            <div className="header-divider">
              <Compass className="divider-icon" size={14} />
            </div>
          </div>
          
          <div className="header-right">
            <p className="section-desc">
              From serene escapes to unforgettable adventures, explore experiences crafted for your every desire.
            </p>
            <div className="header-actions-row">
              <a href="#all-experiences" className="view-all-link">
                VIEW ALL EXPERIENCES <ArrowRight size={14} className="arrow-inline" />
              </a>
              <div className="slider-nav-btns">
                <button className="slider-nav-btn" aria-label="Previous">
                  <ChevronLeft size={16} />
                </button>
                <button className="slider-nav-btn" aria-label="Next">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Slider/Cards Container */}
        <div className="experiences-cards-container">
          {/* Card 1: Luxury Suites */}
          <div className="experience-card-item">
            <div className="card-bg-img" style={{ backgroundImage: "url('/suites_card.png')" }}></div>
            <div className="card-overlay"></div>
            <div className="card-badge">
              <Bed size={18} />
            </div>
            <div className="card-info">
              <h3 className="card-item-title">LUXURY SUITES</h3>
              <p className="card-item-desc">Redefined comfort with breathtaking views.</p>
              <a href="#explore-suites" className="card-explore-link">
                EXPLORE <ArrowRight size={12} className="explore-arrow" />
              </a>
            </div>
          </div>

          {/* Card 2: Infinity Pool */}
          <div className="experience-card-item">
            <div className="card-bg-img" style={{ backgroundImage: "url('/pool_card.png')" }}></div>
            <div className="card-overlay"></div>
            <div className="card-badge">
              <Waves size={18} />
            </div>
            <div className="card-info">
              <h3 className="card-item-title">INFINITY POOL</h3>
              <p className="card-item-desc">Unwind in serenity with endless ocean horizons.</p>
              <a href="#explore-pool" className="card-explore-link">
                EXPLORE <ArrowRight size={12} className="explore-arrow" />
              </a>
            </div>
          </div>

          {/* Card 3: Wellness & Spa */}
          <div className="experience-card-item">
            <div className="card-bg-img" style={{ backgroundImage: "url('/spa_card.png')" }}></div>
            <div className="card-overlay"></div>
            <div className="card-badge">
              <Flower2 size={18} />
            </div>
            <div className="card-info">
              <h3 className="card-item-title">WELLNESS & SPA</h3>
              <p className="card-item-desc">Rejuvenate your mind, body, and soul in pure tranquility.</p>
              <a href="#explore-spa" className="card-explore-link">
                EXPLORE <ArrowRight size={12} className="explore-arrow" />
              </a>
            </div>
          </div>

          {/* Card 4: Fine Dining */}
          <div className="experience-card-item">
            <div className="card-bg-img" style={{ backgroundImage: "url('/dining_card.png')" }}></div>
            <div className="card-overlay"></div>
            <div className="card-badge">
              <Utensils size={18} />
            </div>
            <div className="card-info">
              <h3 className="card-item-title">FINE DINING</h3>
              <p className="card-item-desc">Savor culinary masterpieces crafted by world-class chefs.</p>
              <a href="#explore-dining" className="card-explore-link">
                EXPLORE <ArrowRight size={12} className="explore-arrow" />
              </a>
            </div>
          </div>

          {/* Card 5: Ocean View */}
          <div className="experience-card-item">
            <div className="card-bg-img" style={{ backgroundImage: "url('/ocean_card.png')" }}></div>
            <div className="card-overlay"></div>
            <div className="card-badge">
              <Compass size={18} />
            </div>
            <div className="card-info">
              <h3 className="card-item-title">OCEAN VIEW</h3>
              <p className="card-item-desc">Wake up to mesmerizing sunrises and endless blues.</p>
              <a href="#explore-ocean" className="card-explore-link">
                EXPLORE <ArrowRight size={12} className="explore-arrow" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ACCOMMODATIONS & GUEST ROOMS SECTION */}
      <section className="accommodations-section" id="accommodations-section">
        {/* Section Header */}
        <div className="accommodations-header">
          <span className="section-tag">PREMISES LODGING</span>
          <h2 className="section-title">
            ELEGANT SANCTUARIES<br />
            <span className="highlight-serif">SUITES & GUEST ROOMS</span>
          </h2>
          <div className="header-divider-center">
            <Compass className="divider-icon-center" size={14} />
          </div>
          <p className="accommodations-desc">
            Discover unmatched convenience with on-premises lodging designed for the styling, preparation, and overnight comfort of the wedding couple and close family members.
          </p>
        </div>

        {/* Accommodations Grid */}
        <div className="accommodations-grid">
          {/* Room 1: Premium AC Bridal Suite */}
          <div className="villa-card" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            <div className="villa-bg-img" style={{ backgroundImage: "url('/villa_arched.png')" }}></div>
            <div className="villa-card-overlay"></div>
            
            {/* Villa Info */}
            <div className="villa-content">
              <div className="villa-specs">
                <span className="spec-tag">800 SQ FT</span>
                <span className="spec-tag">AC COMFORT</span>
                <span className="spec-tag">PREPARATION SUITE</span>
              </div>
              <h3 className="villa-title">Premium AC Bridal Suite</h3>
              <p className="villa-desc">
                A beautifully curated preparation suite featuring high arched ceilings, elegant full-length vanity mirrors, cozy dressing lounges, and a dedicated photo staging area.
              </p>
              <div className="villa-footer">
                <div className="villa-price-box">
                  <span className="price-val">₹4,000</span>
                  <span className="price-period">/ DAY</span>
                </div>
                <button className="btn-villa-action">
                  BOOK ROOM <ArrowUpRight size={14} className="villa-action-arrow" />
                </button>
              </div>
            </div>
          </div>

          {/* Room 2: Comfort Non-AC Guest Room */}
          <div className="villa-card" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            <div className="villa-bg-img" style={{ backgroundImage: "url('/villa_sunset.png')" }}></div>
            <div className="villa-card-overlay"></div>
            
            {/* Villa Info */}
            <div className="villa-content">
              <div className="villa-specs">
                <span className="spec-tag">400 SQ FT</span>
                <span className="spec-tag">NATURAL VENTILATION</span>
                <span className="spec-tag">FAMILY CONVENIENCE</span>
              </div>
              <h3 className="villa-title">Comfort Non-AC Guest Room</h3>
              <p className="villa-desc">
                Cozy family room designed with comfortable bedding, essential grooming facilities, and on-premises convenience for close event attendees and relatives.
              </p>
              <div className="villa-footer">
                <div className="villa-price-box">
                  <span className="price-val">₹2,500</span>
                  <span className="price-period">/ DAY</span>
                </div>
                <button className="btn-villa-action">
                  BOOK ROOM <ArrowUpRight size={14} className="villa-action-arrow" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. VENUE AMENITIES */}
      <Amenities />

      {/* 5. PRICING ESTIMATOR */}
      <PricingCalculator onSelectEstimate={setSelectedEstimate} />

      {/* 6. TESTIMONIALS */}
      <Testimonials />

      {/* 7. FAQ Accordion */}
      <FAQ />

      {/* 8. BOOKING INQUIRY FORM */}
      <ContactForm selectedEstimate={selectedEstimate} />

      {/* 9. FOOTER */}
      <Footer />

      {/* Mobile Navigation Elements */}
      <BottomNavBar activeSection={activeSection} onNavigate={(targetId) => {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }} />
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </div>
  );
}

export default App;
