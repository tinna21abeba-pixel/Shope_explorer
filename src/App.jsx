import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import CategoryFilter from './components/CategoryFilter';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  async function LoadProducts() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://dummyjson.com/products?limit=100");
      if (!response.ok) {
        throw new Error("Failed to fetch products from the store");
      }
      const data = await response.json();
      setProducts(data.products);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    LoadProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.trim().toLowerCase());
    const matchesCategory =
      category === "all" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="app-container">
      <Header />
      <Cart />

      <main>
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-pill">
            <span>✨</span> Discover Premium Collections
          </div>
          <h1 className="hero-title">
            Find What You Love, <br />
            <span>Delivered in Style.</span>
          </h1>
          <p className="hero-subtitle">
            Explore our handpicked curation of high-quality electronics, fine jewelery, and modern clothing.
          </p>

          <div className="perks-strip">
            <div className="perk-item">
              <span className="perk-icon">⚡</span> Fast Free Delivery
            </div>
            <div className="perk-item">
              <span className="perk-icon">⭐</span> Top Rated 4.9/5
            </div>
            <div className="perk-item">
              <span className="perk-icon">🔄</span> 30-Day Free Returns
            </div>
            <div className="perk-item">
              <span className="perk-icon">🔒</span> 100% Secure Checkout
            </div>
          </div>
        </section>

        {/* Search & Category Filter Controls */}
        <SearchBar
          search={search}
          setSearch={setSearch}
          filterdProducts={filteredProducts}
        />

        <CategoryFilter
          products={products}
          selectedCategory={category}
          setCategory={setCategory}
        />

        {/* Loading State Skeleton */}
        {loading && (
          <div className="skeleton-grid">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="skeleton-card">
                <div className="skeleton-box skeleton-img" />
                <div className="skeleton-box skeleton-title" />
                <div className="skeleton-box skeleton-subtitle" />
                <div className="skeleton-box skeleton-btn" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="error-state-box">
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
            <h3>Unable to Load Store Products</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
              Error: {error}
            </p>
            <button className="retry-btn" onClick={LoadProducts}>
              🔄 Try Again
            </button>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && (
          <ProductList product={filteredProducts} />
        )}
      </main>
    </div>
  );
}

export default App;
 