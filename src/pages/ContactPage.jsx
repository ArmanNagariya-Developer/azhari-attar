import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const ContactPage = () => {
  const { isDarkMode } = useTheme();
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsTablet(width > 768 && width <= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: FiMapPin,
      title: 'Our Location',
      details: 'RAJVI SOCIETY DHROL JAMNAGAR GUJARAT 361210',
      subtitle: 'Visit our flagship store'
    },
    {
      icon: FiPhone,
      title: 'Phone Number',
      details: '+91-9979219073',
      subtitle: 'Any Time'
    },
    {
      icon: FiMail,
      title: 'Email Address',
      details: 'armanbukhari802@gmail.com',
      subtitle: 'We reply within 24 hours'
    },

  ];

  return (
    <div style={{ background: 'var(--bg-color)', minHeight: '100vh', transition: 'background-color 0.3s ease' }}>
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          background: 'linear-gradient(135deg, var(--primary-color) 0%, #c2185b 100%)',
          color: 'white',
          padding: isMobile ? '3rem 1rem' : isTablet ? '4rem 2rem' : '6rem 2rem',
          textAlign: 'center'
        }}
      >
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            fontSize: isMobile ? '2.5rem' : isTablet ? '3rem' : '3.5rem',
            fontWeight: 'bold',
            marginBottom: '1rem'
          }}
        >
          Get In Touch
        </motion.h1>
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{
            fontSize: isMobile ? '1rem' : '1.2rem',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.6,
            padding: isMobile ? '0 1rem' : '0'
          }}
        >
          We'd love to hear from you. Reach out for bespoke fragrances, questions, or just to say hello.
        </motion.p>
      </motion.section>

      {/* Contact Information Grid */}
      <section style={{
        padding: isMobile ? '3rem 1rem' : isTablet ? '4rem 2rem' : '5rem 2rem',
        maxWidth: 1200,
        margin: '0 auto'
      }}>
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: isMobile ? '2rem' : '4rem' }}
        >
          <h2 style={{
            fontSize: isMobile ? '2rem' : isTablet ? '2.25rem' : '2.5rem',
            color: 'var(--text-color)',
            marginBottom: '1rem',
            transition: 'color 0.3s ease'
          }}>
            Contact Information
          </h2>
          <p style={{
            fontSize: isMobile ? '1rem' : '1.1rem',
            color: isDarkMode ? '#ccc' : '#666',
            maxWidth: '600px',
            margin: '0 auto',
            transition: 'color 0.3s ease',
            padding: isMobile ? '0 1rem' : '0'
          }}>
            Find us here or reach out through any of these channels.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile
            ? '1fr'
            : isTablet
              ? 'repeat(auto-fit, minmax(250px, 1fr))'
              : 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: isMobile ? '1.5rem' : '2rem',
          marginBottom: isMobile ? '2rem' : '4rem'
        }}>
          {contactInfo.map((info, index) => (
            <motion.div
              key={info.title}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              style={{
                background: 'var(--card-bg)',
                padding: isMobile ? '1.5rem' : '2rem',
                borderRadius: '12px',
                textAlign: 'center',
                border: '1px solid var(--border-color)',
                boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
                transition: 'background-color 0.3s ease, border-color 0.3s ease',
              }}
            >
              <motion.div
                style={{
                  background: 'var(--primary-color)',
                  width: isMobile ? '50px' : '60px',
                  height: isMobile ? '50px' : '60px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem auto',
                  color: 'white'
                }}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <info.icon size={isMobile ? 20 : 24} />
              </motion.div>
              <h3 style={{
                fontSize: isMobile ? '1.1rem' : '1.3rem',
                color: 'var(--text-color)',
                marginBottom: '0.5rem',
                transition: 'color 0.3s ease'
              }}>
                {info.title}
              </h3>
              <p style={{
                fontSize: isMobile ? '1rem' : '1.1rem',
                color: 'var(--primary-color)',
                fontWeight: '600',
                marginBottom: '0.5rem'
              }}>
                {info.details}
              </p>
              <p style={{
                fontSize: isMobile ? '0.8rem' : '0.9rem',
                color: isDarkMode ? '#ccc' : '#666',
                transition: 'color 0.3s ease'
              }}>
                {info.subtitle}
              </p>
            </motion.div>
          ))}
        </div>
      </section>



      {/* Map Section */}
      <section style={{
        padding: isMobile ? '3rem 1rem' : isTablet ? '4rem 2rem' : '',
        maxWidth: 1200,
        margin: '0 auto'
      }}>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center' }}
        >
          <h2 style={{
            fontSize: isMobile ? '2rem' : isTablet ? '2.25rem' : '2.5rem',
            color: 'var(--text-color)',
            marginBottom: isMobile ? '1.5rem' : '2rem',
            transition: 'color 0.3s ease'
          }}>
            Find Us
          </h2>
          <div style={{
            height: isMobile ? '300px' : isTablet ? '400px' : '500px',
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid var(--border-color)',
            transition: 'border-color 0.3s ease',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14737.772055746935!2d70.41246438497932!3d22.562528321978085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39575f9f289deeb3%3A0x3c4c4fdc5152c10b!2sDhrol%2C%20Gujarat%20361210!5e0!3m2!1sen!2sin!4v1750532461623!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default ContactPage; 