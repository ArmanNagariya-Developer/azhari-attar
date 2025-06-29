import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiAward, FiGlobe, FiHeart } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const AboutPage = () => {
  const { isDarkMode } = useTheme();
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

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
  
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      image: '/assets/avatar-1.png',
      bio: 'Passionate about creating luxury fragrances that tell stories.'
    },
    {
      name: 'Michael Chen',
      role: 'Master Perfumer',
      image: '/assets/avatar-2.png',
      bio: 'Crafts unique scent compositions with over 15 years of experience.'
    },
    {
      name: 'Emma Rodriguez',
      role: 'Creative Director',
      image: '/assets/avatar-3.png',
      bio: 'Brings artistic vision to every fragrance collection.'
    }
  ];

  const stats = [
    { number: '15+', label: 'Years Experience', icon: FiAward },
    { number: '50+', label: 'Unique Fragrances', icon: FiHeart },
    { number: '1000+', label: 'Happy Customers', icon: FiUsers },
    { number: '25+', label: 'Countries Served', icon: FiGlobe }
  ];

  const values = [
    {
      title: 'Craftsmanship',
      description: 'Every fragrance is carefully crafted using the finest ingredients and traditional techniques.',
      icon: '🎨'
    },
    {
      title: 'Sustainability',
      description: 'We are committed to eco-friendly practices and responsible sourcing.',
      icon: '🌱'
    },
    {
      title: 'Innovation',
      description: 'Pushing boundaries to create unique and memorable scent experiences.',
      icon: '✨'
    }
  ];

  return (
    <div style={{ background: 'var(--bg-color)', minHeight: '100vh', transition: 'background-color 0.3s ease' }}>
      
      {/* About Us Content Section */}
      <section style={{ 
        padding: isMobile ? '3rem 1rem' : isTablet ? '4rem 2rem' : '5rem 2rem', 
        maxWidth: 1200, 
        margin: '0 auto' 
      }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 style={{ 
            fontSize: isMobile ? '2rem' : isTablet ? '2.25rem' : '2.5rem', 
            fontWeight: 'bold',
            color: 'var(--text-color)',
            textAlign: 'center',
            marginBottom: '2rem',
            transition: 'color 0.3s ease' 
          }}>
            About Us
          </h1>
          <p style={{
            fontSize: isMobile ? '1rem' : '1.1rem',
            lineHeight: 1.8,
            color: isDarkMode ? '#ccc' : '#666',
            marginBottom: '1.5rem',
            whiteSpace: 'pre-line',
            transition: 'color 0.3s ease'
          }}>
            Welcome to Azhari Attar and Perfumes your trusted destination for authentic and luxurious Attars. We are dedicated to reviving the timeless tradition of natural perfumery through our handcrafted range of alcohol-free attars made with the purest ingredients. Our journey began with a simple vision — to offer fragrances that not only smell divine but also carry a deeper cultural and emotional significance. At Azhari Attar and Perfumes each drop of attar is a symbol of tradition, crafted using age-old distillation methods, sourced from the finest natural ingredients including exotic woods, flowers, herbs, and resins.

            {'\n\n'}We believe in creating scents that tell stories — stories of nature, of purity, and of elegance. Whether you seek a soft floral note, a deep woody aroma, or a royal blend of musk and oud, our collection has something for every personality and occasion. Our attars are 100% alcohol-free, long-lasting, and skin-friendly, making them ideal for daily wear and special moments.

            {'\n\n'}Over the years, our loyal customers have trusted us not just for the fragrance, but for the care, quality, and consistency we deliver. We ensure that every product is packaged with love and checked for quality before it reaches you.

            {'\n\n'}We are proud to be a part of your fragrance journey, and we look forward to helping you discover your signature scent.
          </p>

          <h2 style={{ 
            fontSize: isMobile ? '1.5rem' : '1.75rem',
            fontWeight: 'bold',
            color: 'var(--text-color)',
            marginTop: '2rem',
            marginBottom: '1rem',
            transition: 'color 0.3s ease'
          }}>
            Contact Us
          </h2>
          <p style={{
            fontSize: isMobile ? '1rem' : '1.1rem',
            lineHeight: 1.8,
            color: isDarkMode ? '#ccc' : '#666',
            whiteSpace: 'pre-line',
            transition: 'color 0.3s ease'
          }}>
            📍 Address: RAJVI SOCIETY,DHROL. DIST: JAMNAGAR STATE : GUJARAT PINCODE :361210{'\n'}
            📞 Phone/WhatsApp: +91-9979219073{'\n'}
            📧 Email: armanbukhari802@gmail.com{'\n'}
            🌐 Website: www.[yourbrand].com{'\n'}
            📱 Follow us on Instagram/Facebook: shamabrothers.mumbai{'\n\n'}
            For wholesale enquiries, bulk orders, or any custom fragrance requests, feel free to reach out. We’d love to hear from you!
          </p>
        </motion.div>
      </section>

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
          About Azhari Attar & Perfumes
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
          We are passionate about creating luxury fragrances that capture the essence of life's most beautiful moments.
        </motion.p>
      </motion.section>

      {/* The rest of your page remains unchanged */}
      {/* Company Story, Values, Team, Stats sections here */}
    </div>
  );
};

export default AboutPage;
