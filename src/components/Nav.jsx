import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
          import { FiSearch, FiHeart, FiSun, FiMoon, FiMenu, FiX, FiHome, FiShoppingBag, FiUser, FiMail } from 'react-icons/fi';
import Logo from './Logo';
import { useTheme } from '../context/ThemeContext';

const Nav = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [wishlistCount, setWishlistCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsTablet(width > 768 && width <= 1024);
      
      // Close mobile menu when screen size changes to desktop
      if (width > 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Update wishlist count when localStorage changes
  useEffect(() => {
    const updateWishlistCount = () => {
      const savedWishlist = localStorage.getItem('wishlist') || '[]';
      const wishlist = JSON.parse(savedWishlist);
      setWishlistCount(wishlist.length);
    };

    updateWishlistCount();
    window.addEventListener('storage', updateWishlistCount);
    
    return () => window.removeEventListener('storage', updateWishlistCount);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Hide body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: isMobile ? '0.75rem 0' : '1rem 0',
    borderBottom: '1px solid var(--border-color)',
    background: 'var(--bg-color)',
    transition: 'background-color 0.3s ease, border-color 0.3s ease',
    position: 'relative',
    zIndex: 100,
  };

  const linkStyles = {
    display: 'flex',
    gap: isTablet ? '1.5rem' : '2rem',
    fontSize: isTablet ? '0.9rem' : '1rem',
    alignItems: 'center',
  };

  const iconStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: isMobile ? '0.75rem' : isTablet ? '1rem' : '1.5rem',
    fontSize: isMobile ? '1rem' : '1.2rem',
  };

  const wishlistStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: 'var(--text-color)',
    transition: 'color 0.3s ease',
  };

  const wishlistBadge = {
    position: 'absolute',
    top: -8,
    right: -12,
    background: 'var(--primary-color)',
    color: 'white',
    width: isMobile ? 16 : 18,
    height: isMobile ? 16 : 18,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: isMobile ? '0.6rem' : '0.7rem',
    fontWeight: 'bold',
  };

  const iconButtonStyle = {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: isMobile ? '0.4rem' : '0.5rem',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    minWidth: '44px',
    minHeight: '44px',
    color: 'var(--text-color)',
    position: 'relative',
  };

  const mobileMenuButtonStyle = {
    ...iconButtonStyle,
    background: isMobileMenuOpen ? 'var(--primary-color)' : 'transparent',
    color: isMobileMenuOpen ? 'white' : 'var(--text-color)',
  };

  const mobileNavOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
    opacity: isMobileMenuOpen ? 1 : 0,
    visibility: isMobileMenuOpen ? 'visible' : 'hidden',
    transition: 'opacity 0.3s ease, visibility 0.3s ease',
  };

  const mobileNavStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: isMobile ? '100%' : '320px',
    height: '100vh',
    background: 'var(--bg-color)',
    zIndex: 1000,
    transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: isMobileMenuOpen ? '2px 0 20px rgba(0,0,0,0.1)' : 'none',
  };

  const mobileNavHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.5rem',
    borderBottom: '1px solid var(--border-color)',
    background: 'var(--bg-color)',
  };

  const mobileNavLinksStyle = {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    padding: '1rem 0',
    overflowY: 'auto',
  };

  const mobileNavLinkStyle = {
    fontSize: '1.1rem',
    padding: '1rem 1.5rem',
    color: 'var(--text-color)',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    textDecoration: 'none',
    borderBottom: '1px solid var(--border-color)',
  };

  const mobileNavActionsStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '1.5rem',
    borderTop: '1px solid var(--border-color)',
    background: 'var(--bg-color)',
  };

  const mobileActionButtonStyle = {
    ...iconButtonStyle,
    flex: 1,
    padding: '1rem',
    borderRadius: '12px',
    background: 'var(--card-bg)',
    border: '1px solid var(--border-color)',
    flexDirection: 'column',
    gap: '0.5rem',
    fontSize: '0.9rem',
    margin: '0 0.5rem',
  };

  return (
    <>
      <div className="container">
        <nav style={navStyles}>
          <Logo />
          
          {/* Desktop Navigation - Hidden on mobile and tablet */}
          <ul style={linkStyles} className="hidden-mobile">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/wishlist">Wishlist</Link></li>
            <li><Link to="/about">About us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
          
          <div style={iconStyles} className="hidden-mobile">
            <button 
              style={iconButtonStyle}
              title="Search"
              aria-label="Search"
            >
              <FiSearch size={isMobile ? 18 : 20} />
            </button>
            <Link to="/wishlist" style={wishlistStyle}>
              <FiHeart size={isMobile ? 18 : 20} />
              {wishlistCount > 0 && <span style={wishlistBadge}>{wishlistCount}</span>}
            </Link>
            <button 
              onClick={toggleTheme}
              style={iconButtonStyle}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <FiSun size={isMobile ? 18 : 20} /> : <FiMoon size={isMobile ? 18 : 20} />}
            </button>
          </div>

          {/* Mobile/Tablet Menu Button - Visible only on mobile and tablet */}
          <button 
            onClick={toggleMobileMenu}
            style={mobileMenuButtonStyle}
            className="mobile-menu-toggle"
            title="Open Menu"
            aria-label="Open Menu"
          >
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile Navigation Overlay */}
      <div 
        style={mobileNavOverlayStyle}
        onClick={closeMobileMenu}
        className="mobile-nav-overlay"
      />

      {/* Mobile Navigation Sidebar */}
      <div style={mobileNavStyles} className="mobile-nav">
        <div style={mobileNavHeaderStyle}>
          <Logo />
          <button 
            onClick={closeMobileMenu}
            style={mobileMenuButtonStyle}
            title="Close Menu"
            aria-label="Close Menu"
          >
            <FiX size={24} />
          </button>
        </div>
        
        <div style={mobileNavLinksStyle}>
          <Link to="/" style={mobileNavLinkStyle} onClick={closeMobileMenu}>
            <FiHome size={20} />
            Home
          </Link>
          <Link to="/shop" style={mobileNavLinkStyle} onClick={closeMobileMenu}>
            <FiShoppingBag size={20} />
            Shop
          </Link>
          <Link to="/wishlist" style={mobileNavLinkStyle} onClick={closeMobileMenu}>
            <FiHeart size={20} />
            Wishlist 
            {wishlistCount > 0 && <span style={wishlistBadge}>{wishlistCount}</span>}
          </Link>
          <Link to="/about" style={mobileNavLinkStyle} onClick={closeMobileMenu}>
            <FiUser size={20} />
            About us
          </Link>
          <Link to="/contact" style={mobileNavLinkStyle} onClick={closeMobileMenu}>
            <FiMail size={20} />
            Contact
          </Link>
        </div>
        
        <div style={mobileNavActionsStyle}>
          <button 
            onClick={toggleTheme}
            style={mobileActionButtonStyle}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
            {isDarkMode ? 'Light' : 'Dark'}
          </button>
          <button 
            style={mobileActionButtonStyle}
            title="Search"
            aria-label="Search"
          >
            <FiSearch size={24} />
            Search
          </button>
        </div>
      </div>
    </>
  );
};

export default Nav; 