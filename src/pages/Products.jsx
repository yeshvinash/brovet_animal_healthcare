import React, { useState, useEffect } from 'react';
import { useRouter } from '../context/RouterContext';
import { db } from '../utils/db';
import ProductCard from '../components/ProductCard';
import { Icons } from '../components/UI/Icons';
import { EmptyState } from '../components/UI/Shared';
import { SimpleBreadcrumbs as Breadcrumbs } from '../components/UI/Breadcrumb';
import { SimplePagination as Pagination } from '../components/UI/Pagination';
import { Select } from '../components/UI/Select';

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
  const [filtersOpen, setFiltersOpen] = useState(false);

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
    if (sortBy === 'name-desc') {
      return b.name.localeCompare(a.name);
    }
    return a.name.localeCompare(b.name);
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);
  const indexOfLastProduct = currentPage * PRODUCTS_PER_PAGE;
  const indexOfFirstProduct = indexOfLastProduct - PRODUCTS_PER_PAGE;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const activeFilterCount = [
    searchTerm,
    selectedCategory,
    selectedAnimal,
    sortBy !== 'name-asc' ? sortBy : '',
  ].filter(Boolean).length;

  const filterFields = (
    <>
      <div className="flex items-center justify-between border-b border-neutral-light pb-4">
        <h2 className="font-bold text-neutral-dark text-md flex items-center gap-1.5">
          <Icons.Filter className="w-5 h-5 text-primary" /> Filter Options
        </h2>
        <button 
          type="button"
          onClick={resetFilters} 
          className="inline-flex items-center min-h-11 px-2 text-xs text-primary font-bold hover:underline"
        >
          Reset All
        </button>
      </div>

      <div>
        <label className="block text-xs font-bold text-neutral-dark uppercase tracking-wider mb-2">Search Catalog</label>
        <div className="relative">
          <input
            type="text"
            placeholder="Product name, benefit..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full min-h-11 pl-9 pr-4 py-2.5 text-sm text-neutral-dark bg-white border border-neutral-border rounded-md shadow-2xs placeholder:text-neutral-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <Icons.Search className="w-4 h-4 text-neutral-muted absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      <Select
        id="product-category"
        label="Product Category"
        placeholder="All Categories"
        value={selectedCategory}
        onChange={handleCategoryChange}
        options={categories.map((cat) => ({ value: cat.name, label: cat.name }))}
        className="[&_label]:text-xs [&_label]:font-bold [&_label]:uppercase [&_label]:tracking-wider [&_label]:text-neutral-dark"
      />

      <Select
        id="product-animal"
        label="Animal Suitability"
        placeholder="All Animals"
        value={selectedAnimal}
        onChange={handleAnimalChange}
        options={animalTypes}
        className="[&_label]:text-xs [&_label]:font-bold [&_label]:uppercase [&_label]:tracking-wider [&_label]:text-neutral-dark"
      />

      <Select
        id="product-sort"
        label="Sort Results"
        showPlaceholder={false}
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        options={[
          { value: 'name-asc', label: 'Alphabetical (A - Z)' },
          { value: 'name-desc', label: 'Alphabetical (Z - A)' },
        ]}
        className="[&_label]:text-xs [&_label]:font-bold [&_label]:uppercase [&_label]:tracking-wider [&_label]:text-neutral-dark"
      />
    </>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-20">
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: "Products Catalog" }]} />

      {/* Hero Header Section */}
      <div className="py-5 sm:py-6 border-b border-neutral-border mb-6 sm:mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-dark">Veterinary Feed Supplements</h1>
          <p className="text-neutral-muted text-sm mt-1 leading-relaxed">
            Scientifically balanced formulations supporting milk fat, livestock growth, fertility, and udder recovery.
          </p>
        </div>
        <div className="text-xs text-neutral-body font-bold uppercase tracking-wider bg-neutral-light px-3 py-1.5 rounded border border-neutral-border self-start">
          Showing {filteredProducts.length} Products
        </div>
      </div>

      {/* Mobile filter toggle — products stay first */}
      <div className="lg:hidden mb-4">
        <button
          type="button"
          onClick={() => setFiltersOpen((open) => !open)}
          className="w-full inline-flex items-center justify-between min-h-11 px-4 py-3 rounded-xl border border-neutral-border bg-white shadow-premium text-sm font-bold text-neutral-dark"
          aria-expanded={filtersOpen}
        >
          <span className="inline-flex items-center gap-2">
            <Icons.Filter className="w-5 h-5 text-primary" />
            Filters & Sort
            {activeFilterCount > 0 && (
              <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-primary text-white text-2xs">
                {activeFilterCount}
              </span>
            )}
          </span>
          <Icons.ChevronDown className={`w-5 h-5 text-neutral-muted transition-transform ${filtersOpen ? 'rotate-180' : ''}`} />
        </button>
        {filtersOpen && (
          <div className="mt-3 bg-white border border-neutral-border rounded-xl p-4 sm:p-6 shadow-premium space-y-5">
            {filterFields}
          </div>
        )}
      </div>

      {/* Filters Sidebar + Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8 items-start">
        
        {/* Desktop filter panel */}
        <div className="hidden lg:block bg-white border border-neutral-border rounded-xl p-6 shadow-premium space-y-6 lg:sticky lg:top-24">
          {filterFields}
        </div>

        {/* Product Card Grid */}
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
