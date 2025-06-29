import React from 'react';
import { motion } from 'framer-motion';
import { FiFilter, FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const ProductFilters = ({
  filters,
  setFilters,
  isMobile,
  isTablet,
  showFilters,
  setShowFilters,
  totalProducts,
  filteredCount
}) => {
  const { isDarkMode } = useTheme();

  const fragranceTypes = [
    { value: 'citrus', label: 'Citrus Fragrance' },
    { value: 'strong', label: 'Strong Fragrance' },
    { value: 'cool', label: 'Cool Fragrance' },
    { value: 'sweet', label: 'Sweet Fragrance' }
  ];

  const mlOptions = [
    { value: 6, label: '6 ML' },
    { value: 10, label: '10 ML' }
  ];

  const priceRanges = [
    { min: 0, max: 200, label: 'Under ₹200' },
    { min: 200, max: 300, label: '₹200 - ₹300' },
    { min: 300, max: 400, label: '₹300 - ₹400' },
    { min: 400, max: 1000, label: 'Above ₹400' }
  ];

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(item => item !== value)
        : [...prev[filterType], value]
    }));
  };

  const handlePriceRangeChange = (range) => {
    setFilters(prev => ({
      ...prev,
      priceRange: prev.priceRange === range ? null : range
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      fragranceTypes: [],
      mlSizes: [],
      priceRange: null
    });
  };

  const hasActiveFilters = () => {
    return filters.fragranceTypes.length > 0 || 
           filters.mlSizes.length > 0 || 
           filters.priceRange !== null;
  };

  const filterSectionStyle = {
    background: 'var(--card-bg)',
    borderRadius: isMobile ? '8px' : '12px',
    padding: isMobile ? '1rem' : '1.5rem',
    border: '1px solid var(--border-color)',
    marginBottom: isMobile ? '0.75rem' : '1rem',
    transition: 'all 0.3s ease',
  };

  const filterTitleStyle = {
    fontSize: isMobile ? '0.9rem' : '1rem',
    fontWeight: '600',
    color: 'var(--text-color)',
    marginBottom: isMobile ? '0.75rem' : '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
  };

  const checkboxStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: isMobile ? '0.5rem' : '0.75rem',
    cursor: 'pointer',
    fontSize: isMobile ? '0.85rem' : '0.9rem',
    color: 'var(--text-color)',
    transition: 'color 0.3s ease',
  };

  const checkboxInputStyle = {
    marginRight: '0.5rem',
    width: '16px',
    height: '16px',
    accentColor: 'var(--primary-color)',
  };

  const priceRangeStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: isMobile ? '0.5rem' : '0.75rem',
    cursor: 'pointer',
    fontSize: isMobile ? '0.85rem' : '0.9rem',
    color: 'var(--text-color)',
    transition: 'color 0.3s ease',
  };

  const radioInputStyle = {
    marginRight: '0.5rem',
    width: '16px',
    height: '16px',
    accentColor: 'var(--primary-color)',
  };

  const clearButtonStyle = {
    background: 'var(--primary-color)',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: isMobile ? '0.5rem 1rem' : '0.75rem 1.5rem',
    cursor: 'pointer',
    fontSize: isMobile ? '0.85rem' : '0.9rem',
    fontWeight: '500',
    width: '100%',
    marginTop: '1rem',
    transition: 'all 0.3s ease',
  };

  const resultsStyle = {
    fontSize: isMobile ? '0.85rem' : isTablet ? '1rem' : '1.1rem',
    color: 'var(--muted-text)',
    textAlign: 'center',
    marginBottom: isMobile ? '1rem' : isTablet ? '1.25rem' : '1.5rem',
    fontWeight: isMobile ? '400' : '500',
    lineHeight: '1.4',
    maxWidth: '100%',
    width: '100%',
    overflow: 'hidden',
    boxSizing: 'border-box',
  };

  const mobileFilterButtonStyle = {
    background: 'var(--primary-color)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: isMobile ? '0.75rem 1rem' : '1rem 1.5rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: isMobile ? '0.9rem' : '1rem',
    fontWeight: '500',
    width: '100%',
    justifyContent: 'center',
    marginBottom: '1rem',
    transition: 'all 0.3s ease',
  };

  const mobileFilterOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: '1rem',
  };

  const mobileFilterContentStyle = {
    background: 'var(--card-bg)',
    borderRadius: '12px',
    padding: '1.5rem',
    width: '100%',
    maxWidth: '400px',
    maxHeight: '80vh',
    overflowY: 'auto',
    border: '1px solid var(--border-color)',
    transition: 'background-color 0.3s ease, border-color 0.3s ease',
  };

  const FilterSection = ({ title, children, defaultOpen = true }) => {
    const [isOpen, setIsOpen] = React.useState(defaultOpen);

    return (
      <div style={filterSectionStyle}>
        <div 
          style={filterTitleStyle}
          onClick={() => setIsOpen(!isOpen)}
        >
          {title}
          {isOpen ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
        </div>
        {isOpen && children}
      </div>
    );
  };

  const FilterContent = () => (
    <>
      {/* Results Count */}
      <div style={resultsStyle}>
        Showing {filteredCount} of {totalProducts} products
      </div>

      {/* Price Range Filter */}
      <FilterSection title="Price Range (INR)">
        {priceRanges.map((range) => (
          <div key={`${range.min}-${range.max}`} style={priceRangeStyle}>
            <input
              type="radio"
              id={`price-${range.min}-${range.max}`}
              name="priceRange"
              value={`${range.min}-${range.max}`}
              checked={filters.priceRange === `${range.min}-${range.max}`}
              onChange={() => handlePriceRangeChange(`${range.min}-${range.max}`)}
              style={radioInputStyle}
            />
            <label htmlFor={`price-${range.min}-${range.max}`}>
              {range.label}
            </label>
          </div>
        ))}
      </FilterSection>

      {/* Fragrance Type Filter */}
      <FilterSection title="Fragrance Type">
        {fragranceTypes.map((type) => (
          <div key={type.value} style={checkboxStyle}>
            <input
              type="checkbox"
              id={`fragrance-${type.value}`}
              checked={filters.fragranceTypes.includes(type.value)}
              onChange={() => handleFilterChange('fragranceTypes', type.value)}
              style={checkboxInputStyle}
            />
            <label htmlFor={`fragrance-${type.value}`}>
              {type.label}
            </label>
          </div>
        ))}
      </FilterSection>

      {/* ML Size Filter */}
      <FilterSection title="Size (ML)">
        {mlOptions.map((option) => (
          <div key={option.value} style={checkboxStyle}>
            <input
              type="checkbox"
              id={`ml-${option.value}`}
              checked={filters.mlSizes.includes(option.value)}
              onChange={() => handleFilterChange('mlSizes', option.value)}
              style={checkboxInputStyle}
            />
            <label htmlFor={`ml-${option.value}`}>
              {option.label}
            </label>
          </div>
        ))}
      </FilterSection>

      {/* Clear Filters Button */}
      {hasActiveFilters() && (
        <button
          onClick={clearAllFilters}
          style={clearButtonStyle}
        >
          Clear All Filters
        </button>
      )}
    </>
  );

  // Mobile Filter Overlay
  if (isMobile && showFilters) {
    return (
      <div style={mobileFilterOverlayStyle} onClick={() => setShowFilters(false)}>
        <div style={mobileFilterContentStyle} onClick={(e) => e.stopPropagation()}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid var(--border-color)',
          }}>
            <h3 style={{
              fontSize: '1.1rem',
              fontWeight: '600',
              color: 'var(--text-color)',
              margin: 0,
            }}>
              Filters
            </h3>
            <button
              onClick={() => setShowFilters(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-color)',
                cursor: 'pointer',
                padding: '0.5rem',
              }}
            >
              <FiX size={20} />
            </button>
          </div>
          <FilterContent />
        </div>
      </div>
    );
  }

  // Desktop/Tablet Sidebar
  return (
    <div style={{
      width: isTablet ? '260px' : '280px',
      flexShrink: 0,
    }}>
      <FilterContent />
    </div>
  );
};

export default ProductFilters; 