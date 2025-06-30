import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiHeart } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { products } from '../data/products';
import '../App.css'; // Ensure global styles are loaded

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [showWhatsAppConfirm, setShowWhatsAppConfirm] = useState(false);
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

  // Find the product by ID
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div style={{
        background: 'var(--bg-color)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background-color 0.3s ease'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ color: 'var(--text-color)', marginBottom: '1rem' }}>Product not found</h2>
          <button
            onClick={() => navigate('/shop')}
            style={{
              background: 'var(--primary-color)',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const handleWhatsAppShare = () => {
    const message = `*${product.name}*\n\n` +
      `*Price:* ₹${product.price}\n` +
      `*Category:* ${product.category}\n` +
      `*Description:* ${product.description}\n\n` +
      `*Product Image:* ${product.image}\n\n` +
      `*Shop Link:* ${window.location.origin}/product/${product.id}\n\n` +
      `I'm interested in this product! Please provide more details.`;

    const whatsappUrl = `https://wa.me/+919979219073?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setShowWhatsAppConfirm(false);
  };

  const addToWishlist = () => {
    const savedWishlist = localStorage.getItem('wishlist') || '[]';
    const wishlist = JSON.parse(savedWishlist);

    if (!wishlist.includes(product.id)) {
      wishlist.push(product.id);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      // You could add a toast notification here
    }
  };

  return (
    <div style={{ background: 'var(--bg-color)', minHeight: '100vh', transition: 'background-color 0.3s ease' }}>
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{
          padding: isMobile ? '0.75rem 1rem' : isTablet ? '1rem 1.5rem' : '1rem 2rem',
          borderBottom: '1px solid var(--border-color)',
          background: 'var(--card-bg)',
          transition: 'background-color 0.3s ease, border-color 0.3s ease'
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: 1200,
          margin: '0 auto'
        }}>
          <h1 style={{
            color: 'var(--text-color)',
            fontSize: isMobile ? '1.2rem' : isTablet ? '1.3rem' : '1.5rem',
            fontWeight: '600',
            transition: 'color 0.3s ease'
          }}>
            Product Details
          </h1>
          <div style={{ width: '100px' }}></div>
        </div>
      </motion.div>

      {/* Product Content */}
      <div style={{ 
        maxWidth: 1200, 
        margin: '0 auto', 
        padding: isMobile ? '1rem 0.5rem' : isTablet ? '1.5rem 1rem' : '2rem 1rem' 
      }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr' : '1fr 1fr',
            gap: isMobile ? '1rem' : isTablet ? '1.5rem' : '2rem',
            alignItems: 'start',
          }}
          className="product-details-grid"
        >
          {/* Product Image */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div
              style={{
                background: 'var(--card-bg)',
                borderRadius: isMobile ? '12px' : '16px',
                padding: isMobile ? '1rem' : isTablet ? '1.5rem' : '2rem',
                border: '1px solid var(--border-color)',
                transition: 'background-color 0.3s ease, border-color 0.3s ease',
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: '100%',
                  maxWidth: isMobile ? '300px' : isTablet ? '350px' : '400px',
                  height: 'auto',
                  objectFit: 'cover',
                  borderRadius: isMobile ? '8px' : '12px',
                  margin: '0 auto 1rem',
                  display: 'block',
                }}
              />
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={addToWishlist}
                  className="responsive-btn"
                  style={{
                    background: 'none',
                    color: 'var(--text-color)',
                    border: '1px solid var(--border-color)',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <FiHeart />
                  Add to Wishlist
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div style={{
              background: 'var(--card-bg)',
              borderRadius: isMobile ? '12px' : '16px',
              padding: isMobile ? '1rem' : isTablet ? '1.5rem' : '2rem',
              border: '1px solid var(--border-color)',
              transition: 'background-color 0.3s ease, border-color 0.3s ease'
            }}>
              <div style={{ marginBottom: '2rem' }}>
                <h1 style={{
                  fontSize: isMobile ? '1.8rem' : isTablet ? '2.2rem' : '2.5rem',
                  color: 'var(--text-color)',
                  marginBottom: isMobile ? '0.75rem' : '1rem',
                  fontWeight: 'bold',
                  transition: 'color 0.3s ease'
                }}>
                  {product.name}
                </h1>
                <div style={{ marginBottom: '1.25rem' }}>
                  <button
                    onClick={() => navigate('/shop')}
                    className="responsive-btn back-to-shop-btn"
                    style={{ minWidth: 0 }}
                  >
                    <FiArrowLeft />
                    Back to Shop
                  </button>
                </div>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  marginBottom: '1.25rem',
                }}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={addToWishlist}
                    className="responsive-btn"
                    style={{ minWidth: 0 }}
                  >
                    <FiHeart />
                    Add to Wishlist
                  </motion.button>
                  <motion.button
                    onClick={() => setShowWhatsAppConfirm(true)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="responsive-btn whatsapp-btn"
                    style={{ minWidth: 0 }}
                  >
                    <FaWhatsapp size={20} />
                    Share on WhatsApp
                  </motion.button>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: isMobile ? '0.5rem' : '1rem',
                  marginBottom: isMobile ? '0.75rem' : '1rem',
                  flexWrap: 'wrap'
                }}>
                  <span style={{
                    fontSize: isMobile ? '1.5rem' : isTablet ? '1.8rem' : '2rem',
                    color: 'var(--primary-color)',
                    fontWeight: 'bold'
                  }}>
                    ₹{product.price}
                  </span>
                  <span style={{
                    background: 'var(--primary-color)',
                    color: 'white',
                    padding: isMobile ? '0.2rem 0.5rem' : '0.25rem 0.75rem',
                    borderRadius: '20px',
                    fontSize: isMobile ? '0.8rem' : '0.9rem',
                    fontWeight: '500'
                  }}>
                    {product.category}
                  </span>
                </div>
                <p style={{
                  fontSize: '1.1rem',
                  color: isDarkMode ? '#ccc' : '#666',
                  lineHeight: 1.6,
                  transition: 'color 0.3s ease'
                }}>
                  {product.description}
                </p>
              </div>

              {/* Product Features */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{
                  fontSize: '1.3rem',
                  color: 'var(--text-color)',
                  marginBottom: '1rem',
                  fontWeight: '600',
                  transition: 'color 0.3s ease'
                }}>
                  Product Features
                </h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  color: isDarkMode ? '#ccc' : '#666',
                  transition: 'color 0.3s ease'
                }}>
                  <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                    <span style={{
                      background: 'var(--primary-color)',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      marginRight: '0.75rem'
                    }}></span>
                    Premium quality ingredients
                  </li>
                  <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                    <span style={{
                      background: 'var(--primary-color)',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      marginRight: '0.75rem'
                    }}></span>
                    Long-lasting fragrance
                  </li>
                  <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                    <span style={{
                      background: 'var(--primary-color)',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      marginRight: '0.75rem'
                    }}></span>
                    Elegant packaging
                  </li>
                  <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                    <span style={{
                      background: 'var(--primary-color)',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      marginRight: '0.75rem'
                    }}></span>
                    Suitable for all occasions
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* WhatsApp Confirmation Modal */}
      <AnimatePresence>
        {showWhatsAppConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              style={{
                background: 'var(--card-bg)',
                borderRadius: '16px',
                padding: '2rem',
                maxWidth: '400px',
                width: '90%',
                textAlign: 'center',
                border: '1px solid var(--border-color)',
                transition: 'background-color 0.3s ease, border-color 0.3s ease'
              }}
            >
              <FaWhatsapp size={48} style={{ color: '#25D366', marginBottom: '1rem' }} />
              <h3 style={{
                fontSize: '1.5rem',
                color: 'var(--text-color)',
                marginBottom: '1rem',
                transition: 'color 0.3s ease'
              }}>
                Share on WhatsApp?
              </h3>
              <p style={{
                fontSize: '1rem',
                color: isDarkMode ? '#ccc' : '#666',
                marginBottom: '2rem',
                lineHeight: 1.5,
                transition: 'color 0.3s ease'
              }}>
                This will open WhatsApp and send product details including name, price, description, and image link.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowWhatsAppConfirm(false)}
                  style={{
                    background: 'none',
                    color: 'var(--text-color)',
                    border: '1px solid var(--border-color)',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleWhatsAppShare}
                  style={{
                    background: '#25D366',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: '600'
                  }}
                >
                  Yes, Share
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
      @media (min-width: 700px) {
        .product-details-grid {
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 3rem;
        }
      }
      @media (max-width: 699px) {
        .product-details-grid {
          grid-template-columns: 1fr;
          gap: 2rem;
        }
      }
      .responsive-btn {
        font-size: 1rem;
        padding: 0.75rem 1.5rem;
      }
      @media (max-width: 700px) {
        .responsive-btn {
          font-size: 0.95rem !important;
          padding: 0.6rem 1rem !important;
          width: 100%;
          min-width: 0;
        }
        .back-to-shop-btn {
          font-size: 1rem !important;
          padding: 0.5rem 0.8rem !important;
        }
        .whatsapp-btn {
          font-size: 1rem !important;
          padding: 0.8rem 1rem !important;
        }
      }
      @media (min-width: 701px) and (max-width: 1024px) {
        .responsive-btn {
          font-size: 1.05rem !important;
          padding: 0.7rem 1.2rem !important;
        }
      }
      `}</style>
    </div>
  );
};

export default ProductDetailsPage; 