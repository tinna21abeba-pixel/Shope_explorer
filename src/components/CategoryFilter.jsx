
import React from 'react';

const CATEGORY_ICONS = {
  all: '✨',
  electronics: '⚡',
  jewelery: '💎',
  "men's clothing": '👔',
  "women's clothing": '👗',
};

function CategoryFilter({ products = [], category, selectedCategory, setCategory }) {
  const currentCategory = selectedCategory || category || 'all';

  const categories = [
    "all",
    ...new Set(products.map((product) => product.category).filter(Boolean)),
  ];

  return (
    <div className="categorySection">
      <h2>Explore Categories</h2>
      <div className="categorybuttons">
        {categories.map((cat) => {
          const isActive = currentCategory.toLowerCase() === cat.toLowerCase();
          const icon = CATEGORY_ICONS[cat.toLowerCase()] || '🏷️';
          return (
            <button
              key={cat}
              className={`category-btn ${isActive ? 'active' : ''}`}
              onClick={() => setCategory(cat)}
            >
              <span>{icon}</span>
              <span>{cat}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryFilter;