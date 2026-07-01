import React from 'react';
import { 
  Instagram, 
  Youtube, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Heart 
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="site-footer">
      <div className="footer-top-glow"></div>
      <div className="section-container">
        
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-brand-column">
            <h3 className="footer-brand-logo">AADRIKA</h3>
            <p className="footer-brand-tagline">Crafting the Art of Celebration</p>
            <p className="footer-about-text">
              Coimbatore's premier mid-tier event hall specializing in intimate luxury weddings, engagements, and corporate celebrations. Providing seamless, warm hospitality and exceptional vegetarian culinary experiences.
            </p>
            
            {/* Social Icons */}
            <div className="footer-social-row">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Instagram">
                <Instagram size={16} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="YouTube">
                <Youtube size={16} />
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="X">
                {/* Official X logo SVG */}
                <svg viewBox="0 0 24 24" className="social-x-svg" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="https://justdial.com" target="_blank" rel="noopener noreferrer" className="footer-social-link jd-badge" aria-label="JustDial">
                JD
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links-column">
            <h4 className="footer-heading">Navigation</h4>
            <ul className="footer-links-list">
              <li><a href="#home" onClick={(e) => handleScrollTo(e, 'home')}>Home</a></li>
              <li><a href="#experiences-section" onClick={(e) => handleScrollTo(e, 'experiences-section')}>Experiences</a></li>
              <li><a href="#accommodations-section" onClick={(e) => handleScrollTo(e, 'accommodations-section')}>Guest Suites</a></li>
              <li><a href="#amenities" onClick={(e) => handleScrollTo(e, 'amenities')}>Venue Amenities</a></li>
              <li><a href="#pricing" onClick={(e) => handleScrollTo(e, 'pricing')}>Cost Calculator</a></li>
              <li><a href="#testimonials" onClick={(e) => handleScrollTo(e, 'testimonials')}>Guest Reviews</a></li>
              <li><a href="#faq" onClick={(e) => handleScrollTo(e, 'faq')}>FAQs</a></li>
              <li><a href="#contact" onClick={(e) => handleScrollTo(e, 'contact')}>Book Now</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="footer-contact-column">
            <h4 className="footer-heading">Contact Details</h4>
            <ul className="footer-contact-list">
              <li>
                <MapPin className="contact-icon" size={16} />
                <address className="footer-address">
                  VCS Nagar, Thudiyalur,<br />
                  Vellakinar Pirivu, Coimbatore - 641029,<br />
                  Tamil Nadu, India
                </address>
              </li>
              <li>
                <Phone className="contact-icon" size={16} />
                <div className="footer-phones">
                  <a href="tel:+919876543210">+91 98765 43210</a>
                  <a href="tel:+919876543211">+91 98765 43211</a>
                </div>
              </li>
              <li>
                <Mail className="contact-icon" size={16} />
                <a href="mailto:bookings@aadrikahall.com" className="footer-email">bookings@aadrikahall.com</a>
              </li>
              <li>
                <Clock className="contact-icon" size={16} />
                <span className="footer-hours">Daily Inquiry: 8:00 AM – 9:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-copyright">
            © {currentYear} Aadrika Hall. All Rights Reserved. Coimbatore, India.
          </div>
          <div className="footer-credit">
            Crafted with <Heart size={10} className="heart-icon" /> for Premium Events
          </div>
        </div>

      </div>
    </footer>
  );
}
