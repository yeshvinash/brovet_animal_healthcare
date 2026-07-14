import React, { useState, useEffect } from 'react';
import { useRouter } from '../context/RouterContext';
import { db } from '../utils/db';
import ProductCard from '../components/ProductCard';
import { Icons } from '../components/UI/Icons';
import { Breadcrumbs, Pagination, EmptyState } from '../components/UI/Shared';

const PRODUCTS_PER_PAGE = 6;

const Products = () => {
  const { queryParams, navigate } = useRouter();
  
  // Database States
  const allProducts = db.getProducts();
  const categories = db.getCategories();

  // Filters & Search States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedAnimal, setSelectedAnimal] = useState('');
  const [sortBy, setSortBy] = useState('name-asc');
  const [currentPage, setCurrentPage] = useState(1);

  // Sync category filter with URL query parameter e.g. /products?category=Liquid%20Calcium
  useEffect(() => {
    if (queryParams.category) {
      setSelectedCategory(queryParams.category);
      setCurrentPage(1);
    }
  }, [queryParams.category]);

  // Reset page when filters change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
    setCurrentPage(1);
    
    // Clear URL param if selecting something else manually
    if (queryParams.category && queryParams.category !== value) {
      navigate('/products');
    }
  };

  const handleAnimalChange = (e) => {
    setSelectedAnimal(e.target.value);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedAnimal('');
    setSortBy('name-asc');
    setCurrentPage(1);
    navigate('/products');
  };

  // Get unique animal types from all products for the filter list
  const animalTypes = [];
  allProducts.forEach(p => {
    if (p.suitableAnimals) {
      p.suitableAnimals.split(',').forEach(animal => {
        const trimmed = animal.trim();
        if (trimmed && !animalTypes.includes(trimmed)) {
          animalTypes.push(trimmed);
        }
      });
    }
  });

  // Filter products logic
  const filteredProducts = allProducts.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.ingredients.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === '' || p.category === selectedCategory;
    
    const matchesAnimal = selectedAnimal === '' || 
                          (p.suitableAnimals && p.suitableAnimals.toLowerCase().includes(selectedAnimal.toLowerCase()));

    return matchesSearch && matchesCategory && matchesAnimal;
  });

  // Sort products logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'name-asc') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'name-desc') {
      return b.name.localeCompare(a.name);
    } else if (sortBy === 'price-asc') {
      return (a.price || 0) - (b.price || 0);
    } else if (sortBy === 'price-desc') {
      return (b.price || 0) - (a.price || 0);
    }
    return 0;
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);
  const indexOfLastProduct = currentPage * PRODUCTS_PER_PAGE;
  const indexOfFirstProduct = indexOfLastProduct - PRODUCTS_PER_PAGE;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: "Products Catalog" }]} />

      {/* Hero Header Section */}
      <div className="py-6 border-b border-neutral-border mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-neutral-dark">Veterinary Feed Supplements</h1>
          <p className="text-neutral-muted text-sm mt-1 leading-relaxed">
            Scientifically balanced formulations supporting milk fat, livestock growth, fertility, and udder recovery.
          </p>
        </div>
        <div className="text-xs text-neutral-muted font-bold uppercase tracking-wider bg-neutral-light px-3 py-1.5 rounded border">
          Showing {filteredProducts.length} Products
        </div>
      </div>

      {/* Filters Sidebar + Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Left Side: Filter Form Panel */}
        <div className="bg-white border border-neutral-border rounded-xl p-6 shadow-premium space-y-6 lg:sticky lg:top-24">
          <div className="flex items-center justify-between border-b border-neutral-light pb-4">
            <h2 className="font-bold text-neutral-dark text-md flex items-center gap-1.5">
              <Icons.Filter className="w-5 h-5 text-primary" /> Filter Options
            </h2>
            <button 
              onClick={resetFilters} 
              className="text-xs text-primary font-bold hover:underline"
            >
              Reset All
            </button>
          </div>

          {/* Search Term */}
          <div>
            <label className="block text-xs font-bold text-neutral-muted uppercase tracking-wider mb-2">Search Catalog</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Product name, benefit..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-9 pr-4 py-2.5 text-sm text-neutral-dark bg-white border border-neutral-border rounded-md shadow-2xs focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Icons.Search className="w-4 h-4 text-neutral-muted absolute left-3 top-3.5" />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-xs font-bold text-neutral-muted uppercase tracking-wider mb-2">Product Category</label>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-full px-3 py-2.5 text-sm border border-neutral-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Animal Type Filter */}
          <div>
            <label className="block text-xs font-bold text-neutral-muted uppercase tracking-wider mb-2">Animal Suitability</label>
            <select
              value={selectedAnimal}
              onChange={handleAnimalChange}
              className="w-full px-3 py-2.5 text-sm border border-neutral-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">All Animals</option>
              {animalTypes.map((animal, idx) => (
                <option key={idx} value={animal}>{animal}</option>
              ))}
            </select>
          </div>

          {/* Sorting */}
          <div>
            <label className="block text-xs font-bold text-neutral-muted uppercase tracking-wider mb-2">Sort Results</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2.5 text-sm border border-neutral-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="name-asc">Alphabetical (A - Z)</option>
              <option value="name-desc">Alphabetical (Z - A)</option>
              <option value="price-asc">Price (Low - High)</option>
              <option value="price-desc">Price (High - Low)</option>
            </select>
          </div>
        </div>

        {/* Right Side: Product Card Grid */}
        <div className="lg:col-span-3 space-y-8">
          {currentProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {currentProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={(page) => setCurrentPage(page)} 
              />
            </>
          ) : (
            <EmptyState 
              title="No Products Found" 
              description="There are no products matching your search keywords or filter settings. Please try adjusting your selections." 
              actionText="Reset All Filters" 
              onAction={resetFilters} 
            />
          )}
        </div>

      </div>

    </div>
  );
};

export default Products;
