import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote: "The catering service at Aadrika was outstanding. Our wedding guests could not stop talking about the delicious traditional vegetarian food! The staff showed incredibly warm hospitality throughout the event.",
    author: "Rajesh Kumar",
    location: "Coimbatore",
    eventType: "Wedding Celebrations"
  },
  {
    quote: "A spacious and beautiful hall in Thudiyalur. It was very easy for all our guests to commute since it is right off the main road. The bridal rooms were clean and comfortable.",
    author: "Meenakshi Sundaram",
    location: "Coimbatore",
    eventType: "Traditional Engagement"
  },
  {
    quote: "Highly professional event planning support. We hosted our daughter's reception here. The stage setup was amazing, and their power backup system handled the lighting rigs seamlessly.",
    author: "Suresh Vignesh",
    location: "Vellakinar",
    eventType: "Grand Reception"
  },
  {
    quote: "Excellent budget-friendly premium hall. With their daily base rental and flexible catering packages, it is the best mid-tier venue options around Coimbatore. Strongly recommended!",
    author: "Ramesh A.",
    location: "Thudiyalur",
    eventType: "Family Reunion"
  },
  {
    quote: "Very accommodating staff and beautiful acoustics. The sound system and DJ setup were professional, and they managed the food service timing perfectly from start to finish.",
    author: "Anjali Devi",
    location: "Coimbatore",
    eventType: "Corporate Meet"
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [activeIndex]);

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  // Variants for review sliding animation
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeInOut' }
    },
    exit: (dir) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
      transition: { duration: 0.5, ease: 'easeInOut' }
    })
  };

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="section-container">
        
        {/* Rating summary banner */}
        <div className="rating-summary-banner">
          <div className="justdial-logo-row">
            <span className="platform-tag">Justdial</span>
            <div className="stars-row">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} fill="#f5a623" color="#f5a623" />
              ))}
            </div>
          </div>
          <div className="rating-value-row">
            <span className="rating-num">4.3</span>
            <span className="rating-max">/ 5</span>
            <span className="reviews-count">based on 61 verified reviews</span>
          </div>
        </div>

        <div className="testimonials-grid-layout">
          {/* Left panel: Info */}
          <div className="testimonials-info-panel">
            <span className="section-tag">GUEST EXPERIENCES</span>
            <h2 className="section-title">
              HEARD FROM OUR <span className="highlight-serif">CELEBRATIONS</span>
            </h2>
            <div className="header-divider">
              <Quote className="divider-icon" size={14} />
            </div>
            <p className="section-desc">
              Nothing makes us happier than hearing the success stories of couples, families, and organizations who chose Aadrika Hall to host their special moments.
            </p>

            <div className="slider-controls-row">
              <button className="slider-nav-btn" onClick={handlePrev} aria-label="Previous review">
                <ChevronLeft size={18} />
              </button>
              <button className="slider-nav-btn" onClick={handleNext} aria-label="Next review">
                <ChevronRight size={18} />
              </button>
              <span className="slider-fraction">
                {String(activeIndex + 1).padStart(2, '0')} / {String(TESTIMONIALS.length).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Right panel: Sliding Card */}
          <div className="testimonials-slide-panel">
            <div className="testimonial-card-container">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={activeIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="testimonial-card"
                >
                  <Quote className="card-quote-icon" size={40} />
                  <p className="card-quote-text">"{TESTIMONIALS[activeIndex].quote}"</p>
                  
                  <div className="card-author-footer">
                    <div className="author-details">
                      <h4 className="author-name">{TESTIMONIALS[activeIndex].author}</h4>
                      <span className="author-meta">
                        {TESTIMONIALS[activeIndex].eventType} • {TESTIMONIALS[activeIndex].location}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
