import React, { useState, useEffect } from 'react';
import { products } from '../data/products';
import { categories } from '../data/shop';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import ProductFilters from '../components/ProductFilters';
import { FiSearch, FiGrid, FiList, FiFilter, FiX } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const TABS = ['new', 'popular', 'trending'];

const ShopPage = () => {
  const { isDarkMode } = useTheme();
  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sort, setSort] = useState('az');
  const [view, setView] = useState('grid');
  const [showWhatsAppConfirm, setShowWhatsAppConfirm] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
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

      // Hide sidebar on screens smaller than 1024px
      if (width < 1024) {
        setShowSidebar(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Reset to first page when search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategories, sort, filters]);

  // Filter logic with comprehensive filtering
  const filteredProducts = products.filter(product => {
    // Search filter
    if (search && !product.name.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }

    // Category filter
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
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

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sort) {
      case 'az':
        return a.name.localeCompare(b.name);
      case 'za':
        return b.name.localeCompare(a.name);
      case 'price-low':
        return a.priceINR - b.priceINR;
      case 'price-high':
        return b.priceINR - a.priceINR;
      default:
        return 0;
    }
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top of products section
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const handleWhatsAppShare = () => {
    const message = `*Luxury Perfume Collection*\n\n` +
      `*Total Products:* ${filteredProducts.length}\n` +
      `*Categories:* ${categories.map(cat => cat.name).join(', ')}\n\n` +
      `*Featured Products:*\n` +
      `${filteredProducts.slice(0, 5).map(product =>
        `• ${product.name} - ₹${product.priceINR}\n`
      ).join('')}\n\n` +
      `*Shop Link:* ${window.location.origin}/shop\n\n` +
      `Discover our exclusive collection of luxury fragrances!`;

    const whatsappUrl = `https://wa.me/+919979219073?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setShowWhatsAppConfirm(false);
  };

  const sidebarStyle = {
    width: isMobile ? '100%' : isTablet ? '260px' : '280px',
    background: 'var(--sidebar-bg)',
    borderRadius: isMobile ? '0' : '12px',
    padding: isMobile ? '1rem' : isTablet ? '1.5rem 1rem' : '2rem 1.5rem',
    boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
    minHeight: isMobile ? '100vh' : '500px',
    border: '1px solid var(--border-color)',
    position: isMobile ? 'fixed' : 'static',
    top: isMobile ? '0' : 'auto',
    left: isMobile ? '0' : 'auto',
    zIndex: isMobile ? 1000 : 'auto',
    transform: isMobile ? (showSidebar ? 'translateX(0)' : 'translateX(-100%)') : 'none',
    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s ease, border-color 0.3s ease',
    overflowY: 'auto',
  };

  const mainContentStyle = {
    flex: 1,
    marginLeft: isMobile ? '0' : isTablet ? '1.5rem' : '2rem',
    minWidth: 0, // Prevent flex item from overflowing
  };

  const pageContainerStyle = {
    background: 'var(--bg-color)',
    minHeight: '100vh',
    paddingTop: isMobile ? '16px' : isTablet ? '20px' : '24px',
    transition: 'background-color 0.3s ease',
  };

  const contentWrapperStyle = {
    display: 'flex',
    maxWidth: '1300px',
    margin: isMobile ? '0' : isTablet ? '1.5rem auto' : '2rem auto',
    gap: isMobile ? '0' : isTablet ? '1.5rem' : '2rem',
    flexDirection: isMobile ? 'column' : 'row',
    padding: isMobile ? '0' : isTablet ? '0 0.75rem' : '0 1rem',
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
    overflow: "hidden",
    width: "100%",
    boxSizing: "border-box",
  };

  const noProductsStyle = {
    textAlign: 'center',
    padding: '3rem 1rem',
    color: 'var(--muted-text)',
    fontSize: isMobile ? '1rem' : '1.1rem',
  };

  return (
    <div style={pageContainerStyle}>
      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{
          background: isDarkMode ? '#2a2a2a' : '#f5f5f5',
          padding: isMobile ? '1rem 0' : '1.5rem 0',
          textAlign: 'center',
          fontWeight: 500,
          letterSpacing: 2,
          fontSize: isMobile ? 12 : 14,
          color: 'var(--text-color)',
          transition: 'background-color 0.3s ease, color 0.3s ease'
        }}>
        HOME / PRODUCTS
      </motion.div>

      {/* Mobile Filter Button - Only show on mobile and tablet */}
      {(isMobile || isTablet) && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            padding: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid var(--border-color)',
          }}>
          <button
            onClick={() => setShowSidebar(true)}
            style={{
              background: 'var(--primary-color)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '0.75rem 1.25rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.9rem',
              fontWeight: '500',
              minHeight: '44px',
              minWidth: '44px',
              transition: 'all 0.3s ease',
            }}
          >
            <FiFilter size={18} />
            Filters
          </button>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setView('grid')}
              style={{
                background: view === 'grid' ? (isDarkMode ? '#444' : '#eee') : 'transparent',
                border: '1px solid var(--border-color)',
                borderRadius: '6px',
                padding: '0.5rem',
                cursor: 'pointer',
                color: 'var(--text-color)',
                transition: 'all 0.3s ease',
                minHeight: '44px',
                minWidth: '44px',
              }}
            >
              <FiGrid size={18} />
            </button>
            <button
              onClick={() => setView('list')}
              style={{
                background: view === 'list' ? (isDarkMode ? '#444' : '#eee') : 'transparent',
                border: '1px solid var(--border-color)',
                borderRadius: '6px',
                padding: '0.5rem',
                cursor: 'pointer',
                color: 'var(--text-color)',
                transition: 'all 0.3s ease',
                minHeight: '44px',
                minWidth: '44px',
              }}
            >
              <FiList size={18} />
            </button>
          </div>
        </motion.div>
      )}

      <div style={contentWrapperStyle}>
        {/* Sidebar - Hidden on screens smaller than 1024px */}
        <AnimatePresence>
          {(!isMobile && !isTablet) && (
            <motion.aside
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              style={sidebarStyle}
            >
              <ProductFilters
                filters={filters}
                setFilters={setFilters}
                isMobile={isMobile}
                isTablet={isTablet}
                showFilters={showSidebar}
                setShowFilters={setShowSidebar}
                totalProducts={products.length}
                filteredCount={filteredProducts.length}
              />
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {showSidebar && (isMobile || isTablet) && (
            <>
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
                  zIndex: 999,
                }}
                onClick={() => setShowSidebar(false)}
              />
              <motion.aside
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'tween', duration: 0.3 }}
                style={sidebarStyle}
              >
                <ProductFilters
                  filters={filters}
                  setFilters={setFilters}
                  isMobile={isMobile}
                  isTablet={isTablet}
                  showFilters={showSidebar}
                  setShowFilters={setShowSidebar}
                  totalProducts={products.length}
                  filteredCount={filteredProducts.length}
                />
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div style={mainContentStyle}>
          {/* Search and Sort Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              marginBottom: '2rem',
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: '1rem',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* Search Bar */}
            <div style={{
              flex: 1,
              maxWidth: isMobile ? '100%' : '400px',
              position: 'relative',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '0.75rem 1rem',
                background: 'var(--card-bg)',
                transition: 'background-color 0.3s ease, border-color 0.3s ease'
              }}>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  style={{
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    flex: 1,
                    color: 'var(--text-color)',
                    fontSize: '1rem',
                  }}
                />
                <FiSearch style={{ color: 'var(--muted-text)', marginLeft: '0.5rem' }} />
              </div>
            </div>

            {/* Sort Dropdown */}
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              style={{
                padding: '0.75rem 1rem',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                background: 'var(--card-bg)',
                color: 'var(--text-color)',
                fontSize: '1rem',
                cursor: 'pointer',
                minWidth: '150px',
                transition: 'background-color 0.3s ease, border-color 0.3s ease'
              }}
            >
              <option value="az">Name A-Z</option>
              <option value="za">Name Z-A</option>
              <option value="price-low">Price Low to High</option>
              <option value="price-high">Price High to Low</option>
            </select>

            {/* View Toggle - Desktop Only */}
            {!isMobile && !isTablet && (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => setView('grid')}
                  style={{
                    background: view === 'grid' ? 'var(--primary-color)' : 'var(--card-bg)',
                    color: view === 'grid' ? 'white' : 'var(--text-color)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '6px',
                    padding: '0.75rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    minHeight: '44px',
                    minWidth: '44px',
                  }}
                >
                  <FiGrid size={18} />
                </button>
                <button
                  onClick={() => setView('list')}
                  style={{
                    background: view === 'list' ? 'var(--primary-color)' : 'var(--card-bg)',
                    color: view === 'list' ? 'white' : 'var(--text-color)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '6px',
                    padding: '0.75rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    minHeight: '44px',
                    minWidth: '44px',
                  }}
                >
                  <FiList size={18} />
                </button>
              </div>
            )}
          </motion.div>

          {/* Results Info */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={resultsInfoStyle}
          >
            Showing {filteredProducts.length} of {products.length} products
            {(filters.fragranceTypes.length > 0 || filters.mlSizes.length > 0 || filters.priceRange || selectedCategories.length > 0) && (
              <span style={{ color: 'var(--primary-color)', fontWeight: '500' }}>
                {' '}(filtered)
              </span>
            )}
          </motion.div>

          {/* Products Grid */}
          {currentProducts.length > 0 ? (
            <>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{
                  display: 'grid',
                  gridTemplateColumns: view === 'grid'
                    ? isMobile
                      ? '1fr'
                      : isTablet
                        ? 'repeat(auto-fill, minmax(180px, 1fr))'
                        : 'repeat(auto-fill, minmax(220px, 1fr))'
                    : '1fr',
                  gap: isMobile ? '0.75rem' : isTablet ? '1rem' : '1.5rem',
                  marginBottom: '2rem',
                }}
              >
                {currentProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    viewMode={view}
                    isMobile={isMobile}
                    isTablet={isTablet}
                  />
                ))}
              </motion.div>

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  isMobile={isMobile}
                  isTablet={isTablet}
                />
              )}
            </>
          ) : (
            <div style={noProductsStyle}>
              <h3>No products found</h3>
              <p>Try adjusting your filters to see more results.</p>
            </div>
          )}
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
                Share our collection with your friends on WhatsApp
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
    </div>
  );
};

export default ShopPage; 