import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const FAQS = [
  {
    q: "What is the guest seating and floating capacity of Aadrika Hall?",
    a: "Aadrika Hall is optimized to comfortably accommodate up to 300 guests for seating arrangements. For floating crowd events, we can accommodate up to 450 guests throughout the event timeline."
  },
  {
    q: "Does Aadrika Hall allow outside catering services?",
    a: "We offer professional in-house multi-cuisine vegetarian catering (including South Indian leaf service, North Indian buffets, and Chinese options) prepared by our expert culinary team. To ensure food safety and quality, outside catering services are not permitted."
  },
  {
    q: "Is parking available at the venue?",
    a: "Yes, we have dedicated private parking spaces on the venue premises supporting up to 20 vehicles. There is also a safe passenger drop-off zone directly at the main entrance."
  },
  {
    q: "What accommodation is provided with the venue rental?",
    a: "We provide 2 premium air-conditioned (AC) bridal suites for pre-ceremony preparations and overnight comfort. Additionally, multiple comfortable non-AC guest rooms are available on-site for immediate family members."
  },
  {
    q: "What are the standard venue rental durations and prices?",
    a: "The standard venue rental base rate is ₹10,000 per day. Rental blocks run for 24 hours. Early check-in or extended clean-up durations can be negotiated based on hall availability."
  },
  {
    q: "Are decorators and DJ services included in the base rate?",
    a: "The base rate covers the hall rental and facilities setup. Decorators, AV sound systems, and DJ services can be integrated into your package through our preferred vendor network, or you can select them as add-ons in our interactive estimator."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <section className="faq-section" id="faq">
      <div className="section-container">
        
        {/* Header Block */}
        <div className="section-header-center">
          <span className="section-tag">COMMON QUESTIONS</span>
          <h2 className="section-title">
            FREQUENTLY ASKED <span className="highlight-serif">QUESTIONS</span>
          </h2>
          <div className="header-divider-center">
            <span className="divider-dot"></span>
          </div>
          <p className="section-desc-center">
            Got questions about your upcoming event? Here are the most common inquiries regarding capacity, catering, and operational guidelines at Aadrika Hall.
          </p>
        </div>

        {/* Accordion list */}
        <div className="faq-accordion-container">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
                className={`faq-item-card ${isOpen ? 'active' : ''}`}
              >
                <button 
                  className="faq-question-btn" 
                  onClick={() => toggleFAQ(idx)}
                  aria-expanded={isOpen}
                >
                  <div className="faq-question-content">
                    <HelpCircle size={16} className="faq-icon-q" />
                    <span>{faq.q}</span>
                  </div>
                  <span className="faq-toggle-icon">
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="faq-answer-wrapper"
                    >
                      <div className="faq-answer-text">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
