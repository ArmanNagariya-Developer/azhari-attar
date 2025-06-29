import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FiTrash2, FiEye, FiHeart } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { products } from '../data/products';

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('name-asc');
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

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

  // Load wishlist from localStorage on component mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist));
    }
  }, []);

  // Sync wishlist on focus/storage
  useEffect(() => {
    function syncWishlist() {
      const savedWishlist = localStorage.getItem('wishlist');
      if (savedWishlist) {
        setWishlistItems(JSON.parse(savedWishlist));
      } else {
        setWishlistItems([]);
      }
    }
    window.addEventListener('focus', syncWishlist);
    window.addEventListener('storage', syncWishlist);
    return () => {
      window.removeEventListener('focus', syncWishlist);
      window.removeEventListener('storage', syncWishlist);
    };
  }, []);

  const removeFromWishlist = (productId) => {
    const updated = wishlistItems.filter(item => String(item.id) !== String(productId));
    setWishlistItems(updated);
    localStorage.setItem('wishlist', JSON.stringify(updated));
    setToast('Removed from wishlist');
  };

  const clearAllWishlist = () => {
    setWishlistItems([]);
    localStorage.setItem('wishlist', JSON.stringify([]));
    setToast('Wishlist cleared');
  };

  const viewProductDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

  const getProductById = (id) => {
    return products.find(product => product.id === id);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const wishlistProducts = useMemo(() => {
    let items = wishlistItems
      .filter(p => p && typeof p.name === 'string' && p.name)
      .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    switch (sortOption) {
      case 'name-asc':
        items = items.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        items = items.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price-asc':
        items = items.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        items = items.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    return items;
  }, [wishlistItems, searchTerm, sortOption]);

  // Toast auto-hide effect
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  useEffect(() => {
    function handleWishlistToast(e) {
      setToast(e.detail);
    }
    window.addEventListener('wishlist-toast', handleWishlistToast);
    return () => window.removeEventListener('wishlist-toast', handleWishlistToast);
  }, []);

  return (
    <div style={{ background: 'var(--bg-color)', minHeight: '100vh', transition: 'background-color 0.3s ease' }}>
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{
          padding: isMobile ? '1.5rem 1rem' : isTablet ? '2rem 1.5rem' : '2rem',
          textAlign: 'center',
          background: 'linear-gradient(135deg, var(--primary-color) 0%, #c2185b 100%)',
          color: 'white'
        }}
      >
        <h1 style={{ 
          fontSize: isMobile ? '2rem' : isTablet ? '2.5rem' : '3rem', 
          fontWeight: 'bold', 
          marginBottom: '1rem' 
        }}>
          My Wishlist
        </h1>
        <p style={{ 
          fontSize: isMobile ? '1rem' : '1.2rem', 
          opacity: 0.9,
          padding: isMobile ? '0 1rem' : '0'
        }}>
          {wishlistItems.length === 0 ? 'Your wishlist is empty' : `${wishlistItems.length} items in your wishlist`}
        </p>
      </motion.div>

      {/* Search and Sort Controls */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '0.75rem' : '1.5rem',
          alignItems: isMobile ? 'stretch' : 'center',
          justifyContent: 'center',
          margin: isMobile ? '1rem 0' : '0 0 2rem 0',
          maxWidth: 600,
          width: '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <input
          type="text"
          placeholder="Search wishlist..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{
            width: isMobile ? '100%' : '220px',
            padding: isMobile ? '0.6rem 1rem' : '0.75rem 1.25rem',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
            fontSize: isMobile ? '0.95rem' : '1rem',
            marginBottom: 0,
            outline: 'none',
            background: 'var(--card-bg)',
            color: 'var(--text-color)',
            transition: 'background-color 0.3s ease, color 0.3s ease',
          }}
        />
        <select
          value={sortOption}
          onChange={e => setSortOption(e.target.value)}
          style={{
            width: isMobile ? '100%' : '180px',
            padding: isMobile ? '0.6rem 1rem' : '0.75rem 1.25rem',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
            fontSize: isMobile ? '0.95rem' : '1rem',
            background: 'var(--card-bg)',
            color: 'var(--text-color)',
            outline: 'none',
            transition: 'background-color 0.3s ease, color 0.3s ease',
          }}
        >
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="price-asc">Price (Low-High)</option>
          <option value="price-desc">Price (High-Low)</option>
        </select>
      </motion.div>

      {/* Wishlist Content */}
      <div style={{ 
        maxWidth: 1200, 
        margin: '0 auto', 
        padding: isMobile ? '1rem' : '2rem' 
      }}>
        {wishlistItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              textAlign: 'center',
              padding: isMobile ? '2rem 1rem' : isTablet ? '3rem 2rem' : '4rem 2rem',
              background: 'var(--card-bg)',
              borderRadius: '16px',
              border: '1px solid var(--border-color)',
              transition: 'background-color 0.3s ease, border-color 0.3s ease'
            }}
          >
            <FiHeart size={isMobile ? 48 : isTablet ? 56 : 64} style={{ color: 'var(--primary-color)', marginBottom: '1rem', opacity: 0.5 }} />
            <h2 style={{ 
              fontSize: isMobile ? '1.5rem' : isTablet ? '1.75rem' : '2rem', 
              color: 'var(--text-color)', 
              marginBottom: '1rem',
              transition: 'color 0.3s ease'
            }}>
              Your Wishlist is Empty
            </h2>
            <p style={{ 
              fontSize: isMobile ? '0.9rem' : isTablet ? '1rem' : '1.1rem', 
              color: isDarkMode ? '#ccc' : '#666', 
              marginBottom: '2rem',
              transition: 'color 0.3s ease',
              padding: isMobile ? '0 1rem' : '0'
            }}>
              Start adding products to your wishlist to see them here
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/shop')}
              style={{
                background: 'var(--primary-color)',
                color: 'white',
                border: 'none',
                padding: isMobile ? '0.75rem 1.5rem' : '1rem 2rem',
                borderRadius: '8px',
                fontSize: isMobile ? '1rem' : '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                minHeight: '44px',
                minWidth: '44px',
              }}
            >
              Browse Products
            </motion.button>
          </motion.div>
        ) : (
          <>
            <div style={{ textAlign: 'right', marginBottom: isMobile ? '1rem' : '1.5rem' }}>
              <button
                onClick={clearAllWishlist}
                className="responsive-btn"
                style={{ background: '#ff4757', color: 'white', fontWeight: 600 }}
              >
                Clear All
              </button>
            </div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile 
                  ? '1fr' 
                  : isTablet 
                    ? 'repeat(auto-fill, minmax(250px, 1fr))'
                    : 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: isMobile ? '1rem' : '2rem'
              }}
            >
              {wishlistProducts.map((product) => {
                if (!product) return null;

                return (
                  <motion.div
                    key={product.id}
                    variants={itemVariants}
                    style={{
                      background: 'var(--card-bg)',
                      borderRadius: '16px',
                      padding: isMobile ? '1rem' : '1.5rem',
                      border: '1px solid var(--border-color)',
                      transition: 'background-color 0.3s ease, border-color 0.3s ease',
                      position: 'relative'
                    }}
                  >
                    {/* Remove Button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeFromWishlist(product.id)}
                      style={{
                        position: 'absolute',
                        top: isMobile ? '0.5rem' : '1rem',
                        right: isMobile ? '0.5rem' : '1rem',
                        background: '#ff4757',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: isMobile ? '35px' : '40px',
                        height: isMobile ? '35px' : '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        zIndex: 2,
                        minHeight: '44px',
                        minWidth: '44px',
                      }}
                    >
                      <FiTrash2 size={isMobile ? 16 : 18} />
                    </motion.button>

                    {/* Product Image */}
                    <div style={{
                      backgroundColor: isDarkMode ? '#333' : '#f7f7f7',
                      borderRadius: '12px',
                      padding: isMobile ? '0.75rem' : '1rem',
                      marginBottom: '1rem',
                      height: isMobile ? '150px' : isTablet ? '180px' : '200px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'background-color 0.3s ease'
                    }}>
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{
                          maxWidth: '100%',
                          maxHeight: '100%',
                          objectFit: 'contain'
                        }}
                      />
                    </div>

                    {/* Product Info */}
                    <div style={{ marginBottom: '1rem' }}>
                      <h3 style={{ 
                        fontSize: isMobile ? '1rem' : '1.2rem', 
                        color: 'var(--text-color)', 
                        marginBottom: '0.5rem',
                        fontWeight: '600',
                        transition: 'color 0.3s ease'
                      }}>
                        {product.name}
                      </h3>
                      <p style={{ 
                        fontSize: isMobile ? '0.9rem' : '1rem', 
                        color: 'var(--primary-color)', 
                        fontWeight: 'bold',
                        marginBottom: '0.5rem'
                      }}>
                        ${product.price}
                      </p>
                      <p style={{ 
                        fontSize: isMobile ? '0.8rem' : '0.9rem', 
                        color: isDarkMode ? '#ccc' : '#666',
                        lineHeight: 1.4,
                        transition: 'color 0.3s ease'
                      }}>
                        {product.description}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div style={{ 
                      display: 'flex', 
                      gap: isMobile ? '0.5rem' : '1rem',
                      justifyContent: 'center'
                    }}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => viewProductDetails(product.id)}
                        style={{
                          background: 'var(--primary-color)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          padding: isMobile ? '0.5rem 1rem' : '0.75rem 1.5rem',
                          fontSize: isMobile ? '0.9rem' : '1rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          flex: 1,
                          justifyContent: 'center',
                          minHeight: '44px',
                          minWidth: '44px',
                        }}
                      >
                        <FiEye size={isMobile ? 16 : 18} />
                        View Details
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </>
        )}
      </div>

      {/* Toast Notification */}
      {toast && (
        <div style={{
          position: 'fixed',
          top: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'var(--primary-color)',
          color: 'white',
          padding: '0.75rem 2rem',
          borderRadius: '8px',
          fontWeight: 600,
          zIndex: 2000,
          boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
          fontSize: '1.1rem',
          opacity: 0.95,
        }}>
          {toast}
        </div>
      )}
    </div>
  );
};

export default WishlistPage; 