import React, { useState, useEffect } from "react";
import "./App.css";
import FilterPanel from "./components/FilterPanel/FilterPanel";
import ProductList from "./components/ProductList/ProductList";
import SortOptions from "./components/SortOptions/SortOptions";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import data from "./data/mockData.json";

const App = () => {
  const savedFilters = JSON.parse(localStorage.getItem("filters")) || {
    category: "",
    brand: "",
    price: 500,
    rating: "",
  };
  const savedSortOption = localStorage.getItem("sortOption") || "price-asc";

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState(savedFilters);
  const [sortOption, setSortOption] = useState(savedSortOption);

  useEffect(() => {
    setTimeout(() => {
      setProducts(data);
      setLoading(false);
      setFilteredProducts(data);
    }, 1000);
  }, []);

  useEffect(() => {
    if (!loading) {
      applyFiltersAndSort(filters, sortOption);
    }
  }, [filters, sortOption, loading]);

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
    localStorage.setItem("filters", JSON.stringify(newFilters));
  };

  const handleSort = (sort) => {
    setSortOption(sort);
    localStorage.setItem("sortOption", sort);
  };

  const applyFiltersAndSort = (activeFilters, activeSortOption) => {
    const { category, brand, price, rating } = activeFilters;

    const filtered = products.filter((product) => {
      const categoryMatch = category ? product.category === category : true;
      const brandMatch = brand ? product.brand === brand : true;
      const priceMatch = price ? product.price <= price : true;
      const ratingMatch = rating ? product.rating >= rating : true;
      return categoryMatch && brandMatch && priceMatch && ratingMatch;
    });

    const [field, order] = activeSortOption.split("-");
    const sorted = [...filtered].sort((a, b) => {
      if (order === "asc") {
        return a[field] > b[field] ? 1 : -1;
      } else {
        return a[field] < b[field] ? 1 : -1;
      }
    });

    setFilteredProducts(sorted);
    console.log("Filtered and sorted products updated", sorted);
  };

  return (
    <div className="app">
      <FilterPanel filters={filters} onFilterChange={handleFilter} />
      <div className="main-content">
        <SortOptions sortOption={sortOption} onSortChange={handleSort} />
        {loading ? (
          <div className="loading-spinner-container">
            <LoadingSpinner />
          </div>
        ) : (
          <ProductList products={filteredProducts} />
        )}
      </div>
    </div>
  );
};

export default App;
