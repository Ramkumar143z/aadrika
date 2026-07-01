import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, User, Phone, Mail, Calendar, Users, Briefcase, FileText } from 'lucide-react';

export default function ContactForm({ selectedEstimate }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    eventType: 'wedding',
    guestCount: 150,
    packageTier: 'premium',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Sync with calculator estimates
  useEffect(() => {
    if (selectedEstimate) {
      const addonsStr = selectedEstimate.addons.length > 0 
        ? `Selected Add-ons: ${selectedEstimate.addons.join(', ')}.` 
        : 'No add-ons selected.';
      
      setFormData(prev => ({
        ...prev,
        eventType: selectedEstimate.eventType,
        guestCount: selectedEstimate.guestCount,
        packageTier: selectedEstimate.packageName.toLowerCase().includes('standard') ? 'standard' : 
                     selectedEstimate.packageName.toLowerCase().includes('royal') ? 'royal' : 'premium',
        message: `Estimated package details from calculator:\n• Package: ${selectedEstimate.packageName}\n• Guest Count: ${selectedEstimate.guestCount}\n• ${addonsStr}\n• Total Cost: ₹${selectedEstimate.totalEstimate.toLocaleString('en-IN')}\n\nHi Aadrika Hall, I would like to check availability and finalize booking details.`
      }));
    }
  }, [selectedEstimate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear errors as user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    
    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone.replace(/[\s-]/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }

    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    if (!formData.date) {
      newErrors.date = 'Event date is required';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = 'Event date cannot be in the past';
      }
    }

    if (formData.guestCount < 50 || formData.guestCount > 300) {
      newErrors.guestCount = 'Guest count must be between 50 and 300';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 1500);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      date: '',
      eventType: 'wedding',
      guestCount: 150,
      packageTier: 'premium',
      message: ''
    });
    setSubmitSuccess(false);
  };

  return (
    <section className="contact-section" id="contact">
      <div className="section-container">
        
        {/* Header Block */}
        <div className="section-header-center">
          <span className="section-tag">RESERVATIONS & INQUIRIES</span>
          <h2 className="section-title">
            PLAN YOUR CELEBRATION <span className="highlight-serif">WITH US</span>
          </h2>
          <div className="header-divider-center">
            <span className="divider-dot"></span>
          </div>
          <p className="section-desc-center">
            Check availability, ask pricing queries, or schedule a physical tour of the hall. Fill out the booking inquiry below and our managers will contact you shortly.
          </p>
        </div>

        <div className="contact-grid-layout">
          {/* Details Column */}
          <div className="contact-info-column">
            <h3 className="contact-subtitle">Get in Touch Directly</h3>
            <p className="contact-para">
              Want to skip the form and speak to a manager? Reach us at our sales office in Coimbatore.
            </p>

            <div className="contact-detail-items">
              <div className="detail-item">
                <span className="detail-label">Call / WhatsApp</span>
                <a href="tel:+919876543210" className="detail-link">+91 98765 43210</a>
                <a href="tel:+919876543211" className="detail-link">+91 98765 43211</a>
              </div>

              <div className="detail-item">
                <span className="detail-label">Sales & Booking Hours</span>
                <span className="detail-text">Monday – Sunday: 8:00 AM – 9:00 PM</span>
              </div>

              <div className="detail-item">
                <span className="detail-label">Venue Location</span>
                <address className="detail-address">
                  VCS Nagar, Thudiyalur,<br />
                  Vellakinar Pirivu, Coimbatore - 641029,<br />
                  Tamil Nadu, India
                </address>
              </div>
            </div>

            <div className="map-preview-box">
              {/* Premium abstract card pointing to actual Google Map */}
              <a 
                href="https://maps.google.com/?q=Aadrika+Hall+Thudiyalur+Coimbatore" 
                target="_blank" 
                rel="noopener noreferrer"
                className="map-glass-card"
              >
                <span className="map-view-label">Open in Google Maps</span>
                <div className="map-static-bg">
                  <div className="map-pin"></div>
                </div>
              </a>
            </div>
          </div>

          {/* Form Column */}
          <div className="contact-form-column">
            <div className="form-glass-container">
              <AnimatePresence mode="wait">
                {!submitSuccess ? (
                  <motion.form 
                    key="form"
                    onSubmit={handleSubmit}
                    className="booking-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="form-row-two">
                      {/* Name */}
                      <div className="form-input-group">
                        <label htmlFor="name"><User size={13} className="input-icon" /> Full Name*</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your name"
                          className={errors.name ? 'error' : ''}
                        />
                        {errors.name && <span className="error-text">{errors.name}</span>}
                      </div>

                      {/* Phone */}
                      <div className="form-input-group">
                        <label htmlFor="phone"><Phone size={13} className="input-icon" /> Mobile Number*</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="10-digit mobile number"
                          className={errors.phone ? 'error' : ''}
                        />
                        {errors.phone && <span className="error-text">{errors.phone}</span>}
                      </div>
                    </div>

                    <div className="form-row-two">
                      {/* Email */}
                      <div className="form-input-group">
                        <label htmlFor="email"><Mail size={13} className="input-icon" /> Email Address</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="name@example.com"
                          className={errors.email ? 'error' : ''}
                        />
                        {errors.email && <span className="error-text">{errors.email}</span>}
                      </div>

                      {/* Date */}
                      <div className="form-input-group">
                        <label htmlFor="date"><Calendar size={13} className="input-icon" /> Event Date*</label>
                        <input
                          type="date"
                          id="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          className={errors.date ? 'error' : ''}
                        />
                        {errors.date && <span className="error-text">{errors.date}</span>}
                      </div>
                    </div>

                    <div className="form-row-three">
                      {/* Event Type */}
                      <div className="form-input-group">
                        <label htmlFor="eventType"><Briefcase size={13} className="input-icon" /> Event Type</label>
                        <select
                          id="eventType"
                          name="eventType"
                          value={formData.eventType}
                          onChange={handleChange}
                        >
                          <option value="wedding">Wedding</option>
                          <option value="reception">Reception</option>
                          <option value="engagement">Engagement</option>
                          <option value="party">Birthday / Party</option>
                          <option value="corporate">Corporate Event</option>
                        </select>
                      </div>

                      {/* Guest Count */}
                      <div className="form-input-group">
                        <label htmlFor="guestCount"><Users size={13} className="input-icon" /> Guests (50 - 300)</label>
                        <input
                          type="number"
                          id="guestCount"
                          name="guestCount"
                          min="50"
                          max="300"
                          value={formData.guestCount}
                          onChange={handleChange}
                          className={errors.guestCount ? 'error' : ''}
                        />
                        {errors.guestCount && <span className="error-text">{errors.guestCount}</span>}
                      </div>

                      {/* Package Tier */}
                      <div className="form-input-group">
                        <label htmlFor="packageTier"><FileText size={13} className="input-icon" /> Menu Package</label>
                        <select
                          id="packageTier"
                          name="packageTier"
                          value={formData.packageTier}
                          onChange={handleChange}
                        >
                          <option value="standard">Veg Standard</option>
                          <option value="premium">Veg Premium</option>
                          <option value="royal">Veg Royal</option>
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="form-input-group">
                      <label htmlFor="message"><FileText size={13} className="input-icon" /> Custom Inquiry Message</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="5"
                        placeholder="Detail any custom arrangements, menu additions, or timing preferences..."
                      ></textarea>
                    </div>

                    <motion.button 
                      type="submit" 
                      className="btn-form-submit" 
                      disabled={isSubmitting}
                      whileTap={{ scale: 0.97 }}
                      whileHover={{ scale: 1.01 }}
                    >
                      {isSubmitting ? (
                        <span className="submit-spinner">Sending...</span>
                      ) : (
                        <>
                          Send Reservation Inquiry <Send size={13} className="submit-btn-icon" />
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success"
                    className="form-success-state"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <CheckCircle2 className="success-icon" size={60} />
                    <h3 className="success-title">Inquiry Sent Successfully!</h3>
                    <p className="success-message">
                      Thank you, <strong>{formData.name}</strong>. We have received your booking request for the date <strong>{formData.date}</strong>.
                    </p>
                    <p className="success-details">
                      Our event manager will contact you on <strong>{formData.phone}</strong> or send details to <strong>{formData.email || 'your email'}</strong> within 24 hours.
                    </p>
                    <motion.button 
                      type="button" 
                      className="btn-success-reset"
                      onClick={resetForm}
                      whileTap={{ scale: 0.95 }}
                      whileHover={{ scale: 1.03 }}
                    >
                      Submit Another Inquiry
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
