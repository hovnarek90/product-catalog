import React, { useState, useEffect } from "react";
import "./FilterPanel.css";

const FilterPanel = ({ onFilterChange }) => {
  const savedFilters = JSON.parse(localStorage.getItem("filters")) || {
    category: "",
    brand: "",
    price: 500,
    rating: "",
  };

  const [filters, setFilters] = useState(savedFilters);

  useEffect(() => {
    localStorage.setItem("filters", JSON.stringify(filters));
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleFilterChange = (filterName, value) => {
    const updatedFilters = { ...filters, [filterName]: value };
    setFilters(updatedFilters);
  };

  return (
    <div className="filter-panel">
      <h3>Filter Products</h3>

      <label>Category</label>
      <select
        onChange={(e) => handleFilterChange("category", e.target.value)}
        value={filters.category}
      >
        <option value="">All</option>
        <option value="Electronics">Electronics</option>
        <option value="Footwear">Footwear</option>
        <option value="Clothing">Clothing</option>
      </select>

      <label>Brand</label>
      <select
        onChange={(e) => handleFilterChange("brand", e.target.value)}
        value={filters.brand}
      >
        <option value="">All</option>
        <option value="Brand A">Brand A</option>
        <option value="Brand B">Brand B</option>
        <option value="Brand C">Brand C</option>
      </select>

      <label>Price Range: ${filters.price}</label>
      <input
        type="range"
        min="0"
        max="500"
        value={filters.price}
        onChange={(e) =>
          handleFilterChange("price", parseInt(e.target.value, 10))
        }
      />

      <label>Rating</label>
      <select
        onChange={(e) => handleFilterChange("rating", parseInt(e.target.value))}
        value={filters.rating}
      >
        <option value="">All</option>
        <option value="4">4 stars & up</option>
        <option value="3">3 stars & up</option>
        <option value="2">2 stars & up</option>
      </select>
    </div>
  );
};

export default FilterPanel;
