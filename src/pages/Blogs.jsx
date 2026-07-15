import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { db } from '../utils/db';
import { Icons } from '../components/UI/Icons';
import { Input, EmptyState } from '../components/UI/Shared';
import { SimpleBreadcrumbs as Breadcrumbs } from '../components/UI/Breadcrumb';

const Blogs = () => {
  const { navigate } = useRouter();
  const blogs = db.getBlogs();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Extract unique categories
  const categories = [];
  blogs.forEach(b => {
    if (b.category && !categories.includes(b.category)) {
      categories.push(b.category);
    }
  });

  const filteredBlogs = blogs.filter(b => {
    const matchesSearch = b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || b.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: "Blogs & News" }]} />

      {/* Header */}
      <div className="py-6 border-b border-neutral-border mb-10">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-dark">Animal Health & Husbandry Blogs</h1>
        <p className="text-neutral-muted text-sm mt-1 leading-relaxed">
          Stay informed with scientific guides, tips, and insights on cattle feed, milk fat enhancement, and veterinary medicine.
        </p>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 bg-slate-50 border p-4 rounded-xl">
        {/* Search */}
        <div className="relative w-full md:max-w-sm">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm text-neutral-dark bg-white border border-neutral-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <Icons.Search className="w-4 h-4 text-neutral-muted absolute left-3 top-3.5" />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto justify-start md:justify-end">
          <button
            onClick={() => setSelectedCategory('')}
            className={`px-4 py-2 text-xs font-semibold rounded-md border transition-all ${
              selectedCategory === ''
                ? 'bg-primary text-white border-primary shadow-xs'
                : 'bg-white text-neutral-body border-neutral-border hover:bg-neutral-light'
            }`}
          >
            All Categories
          </button>
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-md border transition-all ${
                selectedCategory === cat
                  ? 'bg-primary text-white border-primary shadow-xs'
                  : 'bg-white text-neutral-body border-neutral-border hover:bg-neutral-light'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Blogs Grid */}
      {filteredBlogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredBlogs.map(blog => (
            <article 
              key={blog.id} 
              className="bg-white rounded-xl border border-neutral-border overflow-hidden shadow-premium hover:shadow-premium-hover transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1 cursor-pointer"
              onClick={() => navigate(`/blog/${blog.id}`)}
            >
              <div className="aspect-video overflow-hidden border-b border-neutral-border bg-neutral-light">
                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <div className="text-3xs text-primary font-bold uppercase tracking-wider mb-2">{blog.category}</div>
                <h3 className="text-md font-bold text-neutral-dark mb-2.5 leading-snug line-clamp-2 hover:text-primary">
                  {blog.title}
                </h3>
                <p className="text-xs text-neutral-muted line-clamp-3 leading-relaxed mb-4">
                  {blog.summary}
                </p>
                <div className="text-3xs text-neutral-muted font-semibold mt-auto flex justify-between pt-4 border-t border-neutral-light">
                  <span>By {blog.author.split('(')[0]}</span>
                  <span>{blog.date}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No Articles Found"
          description="There are no blog posts matching your search criteria. Please adjust your keywords."
          actionText="Clear Filters"
          onAction={() => { setSearchTerm(''); setSelectedCategory(''); }}
        />
      )}

    </div>
  );
};

export default Blogs;
