import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGrid, FiList, FiFilter } from 'react-icons/fi';
import { products } from '../data/products';
import ProductCard from './ProductCard';
import Pagination from './Pagination';
import ProductFilters from './ProductFilters';
import { useTheme } from '../context/ThemeContext';

const TABS = [
  { key: 'new', label: 'NEW' },
  { key: 'popular', label: 'POPULAR' },
  { key: 'trending', label: 'TRENDING' }
];

const AllProducts = () => {
    const [activeTab, setActiveTab] = useState('new');
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const { isDarkMode } = useTheme();
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [viewMode, setViewMode] = useState('grid');
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
      fragranceTypes: [],
      mlSizes: [],
      priceRange: null
    });
    const itemsPerPage = 12;

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

    // Reset to first page when filters change
    useEffect(() => {
      setCurrentPage(1);
    }, [activeTab, searchTerm, filters]);

    const sectionStyles = {
      textAlign: 'center',
      padding: isMobile ? '1.5rem 0' : isTablet ? '2.5rem 0' : '4rem 0',
      maxWidth: '100%',
      width: '100%',
      overflow: 'hidden',
      boxSizing: 'border-box',
    };

    const tabContainerStyles = {
      display: 'flex',
      justifyContent: 'center',
      gap: isMobile ? '0.3rem' : isTablet ? '0.5rem' : '1rem',
      marginBottom: isMobile ? '1.5rem' : isTablet ? '2rem' : '3rem',
      flexWrap: isMobile ? 'wrap' : 'nowrap',
      padding: isMobile ? '0 0.5rem' : isTablet ? '0 1rem' : '0',
    };

    const getTabStyle = (tabKey) => ({
      padding: isMobile ? '0.4rem 0.8rem' : isTablet ? '0.5rem 1.5rem' : '0.75rem 2rem',
      cursor: 'pointer',
      border: '2px solid var(--border-color)',
      background: activeTab === tabKey ? 'var(--primary-color)' : 'transparent',
      color: activeTab === tabKey ? 'white' : 'var(--text-color)',
      fontWeight: 'bold',
      fontSize: isMobile ? '0.7rem' : isTablet ? '0.8rem' : '0.9rem',
      letterSpacing: '0.05em',
      borderRadius: '6px',
      transition: 'all 0.3s ease',
      textTransform: 'uppercase',
      minHeight: isMobile ? '36px' : isTablet ? '40px' : '44px',
      minWidth: isMobile ? '36px' : isTablet ? '40px' : '44px',
      flex: isMobile ? '1 1 calc(50% - 0.15rem)' : 'auto',
    });

    const controlsStyle = {
      display: 'flex',
      alignItems: 'center',
      gap: isMobile ? '0.5rem' : '1rem',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginBottom: '1.5rem',
    };

    const viewModeButtonStyle = (isActive) => ({
      background: isActive ? 'var(--primary-color)' : 'var(--card-bg)',
      color: isActive ? 'white' : 'var(--text-color)',
      border: '1px solid var(--border-color)',
      borderRadius: '6px',
      padding: isMobile ? '0.5rem' : '0.75rem',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease',
      fontSize: isMobile ? '0.9rem' : '1rem',
    });

    const filterButtonStyle = {
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
      transition: 'all 0.3s ease',
    };

    const mainContentStyle = {
      display: 'flex',
      gap: isMobile ? '0' : '2rem',
      alignItems: 'flex-start',
      maxWidth: '100%',
      width: '100%',
      margin: '0 auto',
      padding: isMobile ? '0 1rem' : isTablet ? '0 1.5rem' : '0 2rem',
      boxSizing: 'border-box',
      overflow: 'hidden',
    };

    const gridStyles = {
      flex: 1,
      display: 'grid',
      gridTemplateColumns: viewMode === 'grid' 
        ? isMobile 
          ? '1fr'
          : isTablet 
            ? 'repeat(auto-fill, minmax(180px, 1fr))'
            : 'repeat(auto-fill, minmax(220px, 1fr))'
        : '1fr',
      gap: isMobile ? '0.75rem' : isTablet ? '1rem' : '1.5rem',
      transition: 'all 0.3s ease',
    };

    const gridVariants = {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.1,
        },
      },
    };

    const resultsInfoStyle = {
      fontSize: isMobile ? '0.85rem' : isTablet ? '1rem' : '1.1rem',
      color: 'var(--muted-text)',
      marginBottom: isMobile ? '1rem' : isTablet ? '1.25rem' : '1.5rem',
      textAlign: 'center',
      fontWeight: isMobile ? '400' : '500',
      padding: isMobile ? '0 1rem' : '0',
      lineHeight: '1.4',
      wordWrap: "break-word",
      overflowWrap: "break-word",
      maxWidth: "100%",
      width: "100%",
      overflow: "hidden",
      boxSizing: "border-box",
    };

    const noProductsStyle = {
      textAlign: 'center',
      padding: '3rem 1rem',
      color: 'var(--muted-text)',
      fontSize: isMobile ? '1rem' : '1.1rem',
    };
    
    // Filter products based on tab, search, and filters
    const filteredProducts = useMemo(() => {
      return products.filter(product => {
        // Tab filter
        if (product.category !== activeTab) {
          return false;
        }

        // Search filter
        if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          return false;
        }

        // Fragrance type filter
        if (filters.fragranceTypes.length > 0 && !filters.fragranceTypes.includes(product.fragranceType)) {
          return false;
        }

        // ML size filter
        if (filters.mlSizes.length > 0 && !filters.mlSizes.includes(product.ml)) {
          return false;
        }

        // Price range filter
        if (filters.priceRange) {
          const [min, max] = filters.priceRange.split('-').map(Number);
          if (product.priceINR < min || product.priceINR >= max) {
            return false;
          }
        }

        return true;
      });
    }, [activeTab, searchTerm, filters]);

    const currentProducts = useMemo(() => {
      const startIndex = (currentPage - 1) * itemsPerPage;
      return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredProducts, currentPage, itemsPerPage]);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
    };

    return (
      <div className="container" style={{ maxWidth: '100%', width: '100%', overflow: 'hidden', boxSizing: 'border-box' }}>
        <section style={sectionStyles}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ 
              fontSize: isMobile ? '2rem' : isTablet ? '2.25rem' : '2.5rem', 
              marginBottom: '1rem',
              color: 'var(--text-color)',
              transition: 'color 0.3s ease'
            }}
          >
            All Products
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ 
              maxWidth: isMobile ? '100%' : '600px', 
              margin: '0 auto 2rem auto', 
              color: isDarkMode ? '#ccc' : '#666', 
              lineHeight: 1.6,
              transition: 'color 0.3s ease',
              padding: isMobile ? '0 1rem' : '0',
              fontSize: isMobile ? '0.9rem' : '1rem',
            }}
          >
            Contrary to popular belief, Lorem Ipsum is not simply random
            text. It has roots in a piece of classical
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{ margin: isMobile ? '0 1rem 1.5rem 1rem' : '0 0 2rem 0', maxWidth: 400, width: '100%', marginLeft: 'auto', marginRight: 'auto' }}
          >
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
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
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={tabContainerStyles}
          >
            {TABS.map(tab => (
              <motion.button
                key={tab.key}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: activeTab !== tab.key ? '0 4px 12px rgba(0,0,0,0.15)' : 'none'
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab.key)} 
                style={getTabStyle(tab.key)}
              >
                {tab.label}
              </motion.button>
            ))}
          </motion.div>

          {/* Controls */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={controlsStyle}
          >
            {/* Filter Button for Mobile */}
            {isMobile && (
              <button
                onClick={() => setShowFilters(!showFilters)}
                style={filterButtonStyle}
              >
                <FiFilter size={16} />
                Filters
              </button>
            )}

            {/* View Mode Toggle */}
            <div style={{
              display: 'flex',
              border: '1px solid var(--border-color)',
              borderRadius: '6px',
              overflow: 'hidden',
            }}>
              <button
                onClick={() => setViewMode('grid')}
                style={viewModeButtonStyle(viewMode === 'grid')}
              >
                <FiGrid size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                style={viewModeButtonStyle(viewMode === 'list')}
              >
                <FiList size={16} />
              </button>
            </div>
          </motion.div>

          {/* Results Info */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            style={resultsInfoStyle}
          >
            Showing {filteredProducts.length} of {products.filter(p => p.category === activeTab).length} products
            {(filters.fragranceTypes.length > 0 || filters.mlSizes.length > 0 || filters.priceRange) && (
              <span style={{ color: 'var(--primary-color)', fontWeight: '500' }}>
                {' '}(filtered)
              </span>
            )}
          </motion.div>

          {/* Main Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={mainContentStyle}
          >
            {/* Filters Sidebar */}
            {!isMobile && (
              <ProductFilters
                filters={filters}
                setFilters={setFilters}
                isMobile={isMobile}
                isTablet={isTablet}
                showFilters={showFilters}
                setShowFilters={setShowFilters}
                totalProducts={products.filter(p => p.category === activeTab).length}
                filteredCount={filteredProducts.length}
              />
            )}

            {/* Products Grid */}
            <div style={{ flex: 1 }}>
              {currentProducts.length > 0 ? (
                <>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${activeTab}-${viewMode}`}
                      variants={gridVariants}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3 }}
                      style={gridStyles}
                    >
                      {currentProducts.map(product => (
                        <ProductCard 
                          key={product.id} 
                          product={product}
                          viewMode={viewMode}
                          isMobile={isMobile}
                          isTablet={isTablet}
                        />
                      ))}
                    </motion.div>
                  </AnimatePresence>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div style={{ marginTop: '2rem' }}>
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        isMobile={isMobile}
                        isTablet={isTablet}
                      />
                    </div>
                  )}
                </>
              ) : (
                <div style={noProductsStyle}>
                  <h3>No products found</h3>
                  <p>Try adjusting your filters to see more results.</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Mobile Filter Overlay */}
          {isMobile && showFilters && (
            <ProductFilters
              filters={filters}
              setFilters={setFilters}
              isMobile={isMobile}
              isTablet={isTablet}
              showFilters={showFilters}
              setShowFilters={setShowFilters}
              totalProducts={products.filter(p => p.category === activeTab).length}
              filteredCount={filteredProducts.length}
            />
          )}
        </section>
      </div>
    );
}

export default AllProducts; 