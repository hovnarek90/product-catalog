import React from "react";
import "./SortOptions.css";

const SortOptions = ({ onSortChange }) => {
  return (
    <div className="sort-options">
      <label>Sort By:</label>
      <select
        defaultValue="default"
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="default" disabled>
          Select an option
        </option>
        <option value="price-asc">Price (Low to High)</option>
        <option value="price-desc">Price (High to Low)</option>
        <option value="rating-asc">Rating (Low to High)</option>
        <option value="rating-desc">Rating (High to Low)</option>
        <option value="popularity-asc">Popularity (Low to High)</option>
        <option value="popularity-desc">Popularity (High to Low)</option>
      </select>
    </div>
  );
};

export default SortOptions;
