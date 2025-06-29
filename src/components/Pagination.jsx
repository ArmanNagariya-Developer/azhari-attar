import React from 'react';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  itemsPerPage = 12,
  totalItems,
  isMobile = false,
  isTablet = false 
}) => {
  const { isDarkMode } = useTheme();

  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    // Adjust delta based on screen size
    let delta;
    if (isMobile) {
      delta = 0; // Show fewer pages on mobile
    } else if (isTablet) {
      delta = 1; // Show some pages on tablet
    } else {
      delta = 2; // Show more pages on desktop
    }

    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const buttonStyle = (isActive = false, isDisabled = false) => ({
    padding: isMobile ? '0.4rem 0.6rem' : isTablet ? '0.5rem 0.8rem' : '0.75rem 1rem',
    margin: isMobile ? '0 0.15rem' : '0 0.25rem',
    border: '1px solid var(--border-color)',
    background: isActive ? 'var(--primary-color)' : 'var(--card-bg)',
    color: isActive ? 'white' : isDisabled ? 'var(--muted-text)' : 'var(--text-color)',
    borderRadius: '6px',
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    fontSize: isMobile ? '0.75rem' : isTablet ? '0.8rem' : '0.9rem',
    fontWeight: isActive ? '600' : '500',
    transition: 'all 0.3s ease',
    minWidth: isMobile ? '32px' : isTablet ? '36px' : '44px',
    minHeight: isMobile ? '32px' : isTablet ? '36px' : '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: isDisabled ? 0.5 : 1,
    whiteSpace: 'nowrap',
  });

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: isMobile ? '0.2rem' : isTablet ? '0.3rem' : '0.5rem',
    marginTop: isMobile ? '1.5rem' : isTablet ? '2rem' : '3rem',
    padding: isMobile ? '0 0.5rem' : '0 1rem',
    maxWidth: '100%',
    overflow: 'hidden',
  };

  const infoStyle = {
    textAlign: 'center',
    fontSize: isMobile ? '0.75rem' : isTablet ? '0.9rem' : '1rem',
    color: 'var(--muted-text)',
    marginBottom: isMobile ? '0.75rem' : isTablet ? '1rem' : '1.5rem',
    fontWeight: isMobile ? '400' : '500',
    padding: isMobile ? '0 0.5rem' : '0',
    lineHeight: '1.4',
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // For very small screens, show simplified pagination
  if (isMobile && totalPages > 5) {
    return (
      <div>
        {/* Simplified info for mobile */}
        <div style={infoStyle}>
          Page {currentPage} of {totalPages}
        </div>

        {/* Simplified pagination controls */}
        <div style={containerStyle}>
          <motion.button
            whileHover={currentPage > 1 ? { scale: 1.05 } : {}}
            whileTap={currentPage > 1 ? { scale: 0.95 } : {}}
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            style={buttonStyle(false, currentPage === 1)}
            disabled={currentPage === 1}
          >
            <FiChevronLeft size={isMobile ? 14 : 16} />
          </motion.button>

          {/* Show current page and total */}
          <span style={{
            padding: isMobile ? '0.4rem 0.8rem' : '0.5rem 1rem',
            color: 'var(--text-color)',
            fontSize: isMobile ? '0.75rem' : '0.8rem',
            fontWeight: '500',
            background: 'var(--card-bg)',
            border: '1px solid var(--border-color)',
            borderRadius: '6px',
            minWidth: isMobile ? '60px' : '80px',
            textAlign: 'center',
          }}>
            {currentPage} / {totalPages}
          </span>

          <motion.button
            whileHover={currentPage < totalPages ? { scale: 1.05 } : {}}
            whileTap={currentPage < totalPages ? { scale: 0.95 } : {}}
            onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
            style={buttonStyle(false, currentPage === totalPages)}
            disabled={currentPage === totalPages}
          >
            <FiChevronRight size={isMobile ? 14 : 16} />
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Items info */}
      <div style={infoStyle}>
        Showing {startItem} - {endItem} of {totalItems} products
      </div>

      {/* Pagination controls */}
      <div style={containerStyle}>
        {/* Previous button */}
        <motion.button
          whileHover={currentPage > 1 ? { scale: 1.05 } : {}}
          whileTap={currentPage > 1 ? { scale: 0.95 } : {}}
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          style={buttonStyle(false, currentPage === 1)}
          disabled={currentPage === 1}
        >
          <FiChevronLeft size={isMobile ? 14 : isTablet ? 16 : 18} />
        </motion.button>

        {/* Page numbers */}
        {getVisiblePages().map((page, index) => (
          <React.Fragment key={index}>
            {page === '...' ? (
              <span style={{
                padding: isMobile ? '0.4rem 0.6rem' : isTablet ? '0.5rem 0.8rem' : '0.75rem 1rem',
                color: 'var(--muted-text)',
                fontSize: isMobile ? '0.75rem' : isTablet ? '0.8rem' : '0.9rem',
                minWidth: isMobile ? '32px' : isTablet ? '36px' : '44px',
                textAlign: 'center',
              }}>
                ...
              </span>
            ) : (
              <motion.button
                whileHover={page !== currentPage ? { scale: 1.05 } : {}}
                whileTap={page !== currentPage ? { scale: 0.95 } : {}}
                onClick={() => onPageChange(page)}
                style={buttonStyle(page === currentPage)}
              >
                {page}
              </motion.button>
            )}
          </React.Fragment>
        ))}

        {/* Next button */}
        <motion.button
          whileHover={currentPage < totalPages ? { scale: 1.05 } : {}}
          whileTap={currentPage < totalPages ? { scale: 0.95 } : {}}
          onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
          style={buttonStyle(false, currentPage === totalPages)}
          disabled={currentPage === totalPages}
        >
          <FiChevronRight size={isMobile ? 14 : isTablet ? 16 : 18} />
        </motion.button>
      </div>
    </div>
  );
};

export default Pagination; 