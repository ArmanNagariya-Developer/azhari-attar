                                                                                                          import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const slides = [
  {                                                                                                         
    image: '/assets/slider1.jpg',
    title: 'Luxury with Perfume',
    subtitle: '35% OFF',                                      
    buttonText: 'Shop Now',
  },
  {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
    image: '/assets/slider2.jpg',
    title: 'Bleu de Chanel',
    subtitle: 'EAU DE PARFUM',
    buttonText: 'Discover',
  },
  {
    image: '/assets/slider3.jpg',
    title: 'Miu Miu Twist',
    subtitle: 'FRESH & FLORAL',
    buttonText: 'Explore',
  },
];

const carouselVariants = {
  enter: (direction) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
};

const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

const Carousel = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const autoPlayRef = useRef(null);

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

  // Auto-scroll functionality
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setPage(prev => [(prev[0] + 1) % slides.length, 1]);
      }, 5000); // Change slide every 5 seconds
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, slides.length]);

  // Pause auto-scroll on user interaction
  const pauseAutoPlay = () => {
    setIsAutoPlaying(false);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  // Resume auto-scroll after 3 seconds of inactivity
  const resumeAutoPlay = () => {
    setTimeout(() => {
      setIsAutoPlaying(true);
    }, 3000);
  };

  const paginate = (newDirection) => {
    pauseAutoPlay();
    setPage([(page + newDirection + slides.length) % slides.length, newDirection]);
    resumeAutoPlay();
  };
  
  const goToSlide = (slideIndex) => {
    pauseAutoPlay();
    setPage([slideIndex, slideIndex > page ? 1 : -1]);
    resumeAutoPlay();
  };

  // Touch/Swipe functionality
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      paginate(1); // Next slide
    } else if (isRightSwipe) {
      paginate(-1); // Previous slide
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  const currentSlide = slides[page];

  const containerStyle = {
    position: 'relative',
    height: isMobile ? '300px' : isTablet ? '400px' : '450px',
    overflow: 'hidden',
    borderRadius: isMobile ? '12px' : '20px',
    background: '#222',
    boxShadow: '0 15px 30px rgba(0,0,0,0.2)',
    touchAction: 'pan-y pinch-zoom', // Enable touch gestures
  };

  const imageStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: isMobile 
      ? 'linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.3))'
      : 'linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.2))',
    zIndex: 1,
  };

  const contentContainerStyle = {
    position: 'relative',
    zIndex: 2,
    height: '100%',
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'column',
    justifyContent: 'center',
    alignItems: isMobile ? 'center' : 'flex-start',
    textAlign: isMobile ? 'center' : 'left',
    padding: isMobile ? '0 1rem' : isTablet ? '0 6%' : '0 8%',
    color: 'white',
  };

  const titleStyle = {
    fontSize: isMobile ? '2rem' : isTablet ? '3rem' : '4.5rem',
    fontWeight: 'bold',
    textShadow: '0 2px 5px rgba(0,0,0,0.5)',
    lineHeight: 1.1,
    maxWidth: isMobile ? '100%' : '600px',
    marginBottom: isMobile ? '0.5rem' : '1rem',
  };

  const subtitleStyle = {
    fontSize: isMobile ? '1rem' : isTablet ? '1.2rem' : '1.5rem',
    margin: isMobile ? '0.5rem 0' : '1.5rem 0',
    letterSpacing: '0.1em',
    background: 'var(--primary-color)',
    padding: isMobile ? '0.3rem 0.8rem' : '0.4rem 1rem',
    fontWeight: '600',
    display: 'inline-block',
  };

  const buttonStyle = {
    background: 'transparent',
    border: '2px solid white',
    color: 'white',
    padding: isMobile ? '0.6rem 1.5rem' : '0.8rem 2.5rem',
    fontSize: isMobile ? '0.9rem' : '1rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    marginTop: isMobile ? '1rem' : '1.5rem',
    minHeight: '44px',
    minWidth: '44px',
  };

  const navButtonStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(0, 0, 0, 0.4)',
    borderRadius: '50%',
    width: '44px',
    height: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 3,
    border: '1px solid rgba(255,255,255,0.2)',
    transition: 'background 0.3s ease',
    left: '20px',
  };

  const navButtonRightStyle = {
    ...navButtonStyle,
    left: 'auto',
    right: '20px',
  };

  const dotsContainerStyle = {
      position: 'absolute',
      bottom: isMobile ? '15px' : '30px',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: isMobile ? '8px' : '10px',
      zIndex: 3,
  };

  const dotStyle = (isActive) => ({
      width: isMobile ? '8px' : '10px',
      height: isMobile ? '8px' : '10px',
      borderRadius: '50%',
      background: isActive ? 'var(--primary-color)' : 'rgba(255,255,255,0.5)',
      cursor: 'pointer',
      transition: 'background 0.3s ease',
  });

  return (
    <div 
      className="carousel-container"
      style={containerStyle}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={pauseAutoPlay}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={page}
          src={currentSlide.image}
          custom={direction}
          variants={carouselVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 250, damping: 30 },
            opacity: { duration: 0.3 },
          }}
          style={imageStyle}
        />
      </AnimatePresence>

      <div style={overlayStyle} />

      <motion.div 
        key={page}
        variants={contentVariants}
        initial="hidden"
        animate="visible"
        style={contentContainerStyle}>
        <motion.h1 variants={contentVariants} style={titleStyle}>{currentSlide.title}</motion.h1>
        <motion.p variants={contentVariants} style={subtitleStyle}>{currentSlide.subtitle}</motion.p>
        <motion.button 
          variants={contentVariants}
          style={buttonStyle}
          whileHover={{ 
            background: 'white', 
            color: '#333',
            scale: 1.05 
          }}
          whileTap={{ scale: 0.95 }}
          onClick={pauseAutoPlay}
        >
          {currentSlide.buttonText}
        </motion.button>
      </motion.div>

      {/* Navigation Buttons - Only show on desktop */}
      {!isMobile && !isTablet && (
        <>
          <motion.button
            style={navButtonStyle}
            onClick={() => paginate(-1)}
            whileHover={{ background: 'rgba(0, 0, 0, 0.6)' }}
            whileTap={{ scale: 0.9 }}
            aria-label="Previous slide"
          >
            <FiChevronLeft size={24} />
          </motion.button>
          
          <motion.button
            style={navButtonRightStyle}
            onClick={() => paginate(1)}
            whileHover={{ background: 'rgba(0, 0, 0, 0.6)' }}
            whileTap={{ scale: 0.9 }}
            aria-label="Next slide"
          >
            <FiChevronRight size={24} />
          </motion.button>
        </>
      )}

      {/* Dots Navigation */}
      <div style={dotsContainerStyle}>
        {slides.map((_, index) => (
          <motion.button
            key={index}
            style={dotStyle(page === index)}
            onClick={() => goToSlide(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel; 