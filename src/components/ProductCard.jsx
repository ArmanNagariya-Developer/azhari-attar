import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEye, FiHeart, FiRefreshCw } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const imageVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.1 },
}

const iconsVariants = {
    rest: { opacity: 0, y: 10 },
    hover: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
}

function showWishlistToast(message) {
  window.dispatchEvent(new CustomEvent('wishlist-toast', { detail: message }));
}

const ProductCard = ({ product, viewMode = 'grid', isMobile: propIsMobile, isTablet: propIsTablet }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [showWhatsAppConfirm, setShowWhatsAppConfirm] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  // Use props if provided, otherwise detect screen size
  useEffect(() => {
    if (propIsMobile !== undefined && propIsTablet !== undefined) {
      setIsMobile(propIsMobile);
      setIsTablet(propIsTablet);
    } else {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsTablet(width > 768 && width <= 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
    }
  }, [propIsMobile, propIsTablet]);

  // Check if product is in wishlist on component mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist') || '[]';
    const wishlist = JSON.parse(savedWishlist);
    setIsInWishlist(wishlist.some(item => String(item.id) === String(product.id)));
  }, [product.id]);

  const handleViewDetails = () => {
    navigate(`/product/${product.id}`);
  };

  const handleWishlistToggle = () => {
    const savedWishlist = localStorage.getItem('wishlist') || '[]';
    let wishlist = JSON.parse(savedWishlist);

    if (isInWishlist) {
      wishlist = wishlist.filter(item => String(item.id) !== String(product.id));
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      setIsInWishlist(false);
      showWishlistToast('Removed from wishlist');
    } else {
      if (!wishlist.some(item => String(item.id) === String(product.id))) {
        wishlist.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          description: product.description,
          category: product.category,
          // add any other fields you want to store
        });
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        setIsInWishlist(true);
        showWishlistToast('Added to wishlist');
      } else {
        showWishlistToast('Already in wishlist');
      }
    }
  };

  const handleWhatsAppShare = () => {
    const message = `*${product.name}*\n\n` +
                   `*Price:* ₹${product.priceINR}\n` +
                   `*Category:* ${product.category}\n` +
                   `*Fragrance Type:* ${product.fragranceType}\n` +
                   `*Size:* ${product.ml} ML\n` +
                   `*Description:* ${product.description}\n\n` +
                   `*Product Image:* ${product.image}\n\n` +
                   `*Shop Link:* ${window.location.origin}/product/${product.id}\n\n` +
                   `I'm interested in this product! Please provide more details.`;
    
    const whatsappUrl = `https://wa.me/+919979219073?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setShowWhatsAppConfirm(false);
  };

  // Grid View Styles
  const gridCardStyle = {
    border: '1px solid var(--border-color)',
    textAlign: 'center',
    padding: isMobile ? '0.75rem' : '1rem',
    position: 'relative',
    background: 'var(--card-bg)',
    transition: 'background-color 0.3s ease, border-color 0.3s ease',
    borderRadius: '8px',
  };

  // List View Styles
  const listCardStyle = {
    border: '1px solid var(--border-color)',
    display: 'flex',
    alignItems: 'center',
    padding: isMobile ? '1rem' : '1.5rem',
    position: 'relative',
    background: 'var(--card-bg)',
    transition: 'background-color 0.3s ease, border-color 0.3s ease',
    borderRadius: '8px',
    gap: isMobile ? '1rem' : '1.5rem',
  };

  const cardStyle = viewMode === 'list' ? listCardStyle : gridCardStyle;

  const imageContainerStyle = {
    backgroundColor: isDarkMode ? '#333' : '#f7f7f7',
    marginBottom: viewMode === 'grid' ? (isMobile ? '0.75rem' : '1rem') : '0',
    minHeight: viewMode === 'grid' 
      ? (isMobile ? '180px' : isTablet ? '200px' : '220px')
      : (isMobile ? '80px' : '100px'),
    width: viewMode === 'list' ? (isMobile ? '80px' : '100px') : '100%',
    flexShrink: 0,
    position: 'relative',
    overflow: 'hidden',
    transition: 'background-color 0.3s ease',
    borderRadius: '6px',
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    position: 'absolute',
    top: 0,
    left: 0,
    transition: 'opacity 0.3s ease',
  };

  const saleBadgeStyle = {
    position: 'absolute',
    top: isMobile ? '0.5rem' : '1rem',
    left: isMobile ? '0.5rem' : '1rem',
    background: 'var(--primary-color)',
    color: 'white',
    padding: isMobile ? '0.15rem 0.4rem' : '0.2rem 0.5rem',
    fontSize: isMobile ? '0.7rem' : '0.8rem',
    fontWeight: 'bold',
    zIndex: 2,
    borderRadius: '4px',
  };

  const priceStyle = {
    color: 'var(--primary-color)',
    fontWeight: 'bold',
    fontSize: isMobile ? '1rem' : '1.1rem',
    marginBottom: viewMode === 'grid' ? (isMobile ? '0.5rem' : '0.75rem') : '0.5rem',
  };

  const oldPriceStyle = {
    textDecoration: 'line-through',
    color: isDarkMode ? '#888' : '#999',
    marginLeft: '0.5rem',
    fontSize: isMobile ? '0.8rem' : '0.9rem',
    transition: 'color 0.3s ease',
  };

  const productNameStyle = {
    fontSize: isMobile ? '0.9rem' : '1rem',
    fontWeight: '600',
    marginBottom: viewMode === 'grid' ? (isMobile ? '0.5rem' : '0.75rem') : '0.5rem',
    color: 'var(--text-color)',
    transition: 'color 0.3s ease',
    lineHeight: 1.3,
    textAlign: viewMode === 'list' ? 'left' : 'center',
  };

  const productDetailsStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: viewMode === 'list' ? 'flex-start' : 'center',
  };

  const productInfoStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
    marginBottom: '0.5rem',
  };

  const categoryStyle = {
    fontSize: isMobile ? '0.75rem' : '0.8rem',
    color: 'var(--muted-text)',
    textTransform: 'capitalize',
  };

  const fragranceStyle = {
    fontSize: isMobile ? '0.75rem' : '0.8rem',
    color: 'var(--muted-text)',
    textTransform: 'capitalize',
  };

  const mlStyle = {
    fontSize: isMobile ? '0.75rem' : '0.8rem',
    color: 'var(--muted-text)',
  };

  const iconsContainerStyle = {
      position: 'absolute',
      bottom: isMobile ? '0.5rem' : '1rem',
      left: 0,
      right: 0,
      display: 'flex',
      justifyContent: 'center',
      gap: isMobile ? '0.3rem' : '0.5rem',
      zIndex: 2,
      opacity: 1,
      visibility: 'visible',
      transition: 'opacity 0.3s ease',
  };

  const iconStyle = {
      background: isDarkMode ? '#2a2a2a' : 'white',
      borderRadius: '50%',
      width: isMobile ? '40px' : isTablet ? '42px' : '40px',
      height: isMobile ? '40px' : isTablet ? '42px' : '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      cursor: 'pointer',
      color: 'var(--text-color)',
      transition: 'background-color 0.3s ease, color 0.3s ease',
      minWidth: '44px',
      minHeight: '44px',
  };

  const wishlistIconStyle = {
    ...iconStyle,
    color: isInWishlist ? '#ff4757' : 'var(--text-color)',
    background: isDarkMode ? '#2a2a2a' : 'white',
  };

  const whatsappIconStyle = {
    ...iconStyle,
    color: '#25D366',
    background: isDarkMode ? '#2a2a2a' : 'white',
  };

  const listIconsStyle = {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center',
  };

  const listIconStyle = {
    ...iconStyle,
    width: '36px',
    height: '36px',
    minWidth: '36px',
    minHeight: '36px',
  };

  const renderGridContent = () => (
    <>
        {product.isSale && <div style={saleBadgeStyle}>SALE</div>}
        <div style={imageContainerStyle}>
          <motion.img 
            src={product.image} 
            alt={product.name} 
            style={{ ...imageStyle, opacity: isHovered ? 0 : 1 }} 
            variants={imageVariants}
          />
          <motion.img 
            src={product.secondaryImage} 
            alt={product.name} 
            style={{ ...imageStyle, opacity: isHovered ? 1 : 0 }} 
            variants={imageVariants}
          />
          {/* Icons - Always visible on mobile/tablet, hover on desktop */}
          {(!isMobile && !isTablet) && (
            <AnimatePresence>
              {isHovered && (
                <motion.div 
                  style={iconsContainerStyle} 
                  variants={iconsVariants}
                  className="product-card-icons"
                  initial="rest"
                  animate="hover"
                >
                  <motion.div 
                    variants={iconsVariants} 
                    style={iconStyle}
                    onClick={handleViewDetails}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FiEye size={18} />
                  </motion.div>
                  <motion.div 
                    variants={iconsVariants} 
                    style={wishlistIconStyle}
                    onClick={handleWishlistToggle}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FiHeart size={18} />
                  </motion.div>
                  <motion.div 
                    variants={iconsVariants} 
                    style={whatsappIconStyle}
                    onClick={() => setShowWhatsAppConfirm(true)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaWhatsapp size={18} />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
        
        <h3 style={productNameStyle}>{product.name}</h3>
        
        {/* Price and Icons Container - Mobile/Tablet */}
        {(isMobile || isTablet) ? (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '0.75rem',
            gap: '0.5rem',
          }}>
            <div style={priceStyle}>
            ₹{product.priceINR}
            {product.oldPrice && <span style={oldPriceStyle}>₹{product.oldPrice}</span>}
            </div>
            
            {/* Icons next to price on mobile/tablet */}
            <div 
              className="price-side-icons"
              style={{
                display: 'flex',
                gap: '0.3rem',
                alignItems: 'center',
              }}
            >
              <div 
                style={{
                  ...iconStyle,
                  width: '32px',
                  height: '32px',
                  minWidth: '32px',
                  minHeight: '32px',
                }}
                onClick={handleViewDetails}
              >
                <FiEye size={14} />
              </div>
              <div 
                style={{
                  ...wishlistIconStyle,
                  width: '32px',
                  height: '32px',
                  minWidth: '32px',
                  minHeight: '32px',
                }}
                onClick={handleWishlistToggle}
              >
                <FiHeart size={14} />
              </div>
              <div 
                style={{
                  ...whatsappIconStyle,
                  width: '32px',
                  height: '32px',
                  minWidth: '32px',
                  minHeight: '32px',
                }}
                onClick={() => setShowWhatsAppConfirm(true)}
              >
                <FaWhatsapp size={14} />
              </div>
            </div>
          </div>
        ) : (
          <div style={priceStyle}>
          ₹{product.priceINR}
          {product.oldPrice && <span style={oldPriceStyle}>₹{product.oldPrice}</span>}
          </div>
        )}
    </>
  );

  const renderListContent = () => (
    <>
      {product.isSale && <div style={saleBadgeStyle}>SALE</div>}
      <div style={imageContainerStyle}>
        <motion.img 
          src={product.image} 
          alt={product.name} 
          style={imageStyle}
        />
      </div>
      
      <div style={productDetailsStyle}>
        <h3 style={productNameStyle}>{product.name}</h3>
        
        <div style={productInfoStyle}>
          <div style={categoryStyle}>Category: {product.category}</div>
          <div style={fragranceStyle}>Fragrance: {product.fragranceType}</div>
          <div style={mlStyle}>Size: {product.ml} ML</div>
        </div>
        
        <div style={priceStyle}>
          ₹{product.priceINR}
          {product.oldPrice && <span style={oldPriceStyle}>₹{product.oldPrice}</span>}
        </div>
      </div>
      
      <div style={listIconsStyle}>
        <div 
          style={listIconStyle}
          onClick={handleViewDetails}
        >
          <FiEye size={16} />
        </div>
        <div 
          style={{
            ...wishlistIconStyle,
            ...listIconStyle,
          }}
          onClick={handleWishlistToggle}
        >
          <FiHeart size={16} />
        </div>
        <div 
          style={{
            ...whatsappIconStyle,
            ...listIconStyle,
          }}
          onClick={() => setShowWhatsAppConfirm(true)}
        >
          <FaWhatsapp size={16} />
        </div>
      </div>
    </>
  );

  return (
    <>
      <motion.div
        variants={cardVariants}
        style={cardStyle}
        onHoverStart={() => !isMobile && setIsHovered(true)}
        onHoverEnd={() => !isMobile && setIsHovered(false)}
        initial="rest"
        animate={isHovered ? 'hover' : 'rest'}
      >
        {viewMode === 'list' ? renderListContent() : renderGridContent()}
      </motion.div>

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
              zIndex: 1000,
              padding: '1rem',
            }}
            onClick={() => setShowWhatsAppConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              style={{
                background: 'var(--card-bg)',
                padding: isMobile ? '1.5rem' : '2rem',
                borderRadius: '12px',
                maxWidth: isMobile ? '90%' : '400px',
                textAlign: 'center',
                border: '1px solid var(--border-color)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>
                Share via WhatsApp?
              </h3>
              <p style={{ marginBottom: '1.5rem', color: 'var(--text-color)' }}>
                Share "{product.name}" with your friends on WhatsApp
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button
                  onClick={() => setShowWhatsAppConfirm(false)}
                  style={{
                    padding: '0.5rem 1rem',
                    border: '1px solid var(--border-color)',
                    background: 'transparent',
                    color: 'var(--text-color)',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    minHeight: '44px',
                    minWidth: '44px',
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleWhatsAppShare}
                  style={{
                    padding: '0.5rem 1rem',
                    border: 'none',
                    background: '#25D366',
                    color: 'white',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    minHeight: '44px',
                    minWidth: '44px',
                  }}
                >
                  Share
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductCard; 