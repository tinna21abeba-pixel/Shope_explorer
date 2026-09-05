function SearchBar({
  search,
  setSearch,
  filterdProducts
}) {
  return (
    <section className="search-section">
      <div className="search-wrapper">
        <span className="search-icon-left">🔍</span>
        <input
          type="text"
          value={search}
          placeholder="Search for products, electronics, fashion..."
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button
            className="search-clear-btn"
            onClick={() => setSearch("")}
            title="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {filterdProducts && (
        <div className="search-meta-info">
          <span>Found <strong className="search-count-badge">{filterdProducts.length}</strong> {filterdProducts.length === 1 ? 'item' : 'items'}</span>
          {search && <span>for "{search}"</span>}
        </div>
      )}
    </section>
  );
}

export default SearchBar;