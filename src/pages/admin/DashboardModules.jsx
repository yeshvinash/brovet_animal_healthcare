import React, { useState } from 'react';
import { db } from '../../utils/db';
import { Icons } from '../../components/UI/Icons';
import { Input, Textarea, Select, Button, Alert, EmptyState, Modal } from '../../components/UI/Shared';

// ========================================================
// 1. DASHBOARD OVERVIEW MODULE
// ========================================================
export const DashboardOverview = ({ setActiveTab }) => {
  const products = db.getProducts();
  const blogs = db.getBlogs();
  const dealers = db.getDealers();
  const quotations = db.getQuotations();
  const messages = db.getMessages();

  const cards = [
    { label: "Active Products", value: products.length, icon: <Icons.Layers className="w-5 h-5 text-blue-600" />, tab: "products", bg: "bg-blue-50" },
    { label: "Blog Articles", value: blogs.length, icon: <Icons.FileText className="w-5 h-5 text-purple-600" />, tab: "blogs", bg: "bg-purple-50" },
    { label: "Dealer Applications", value: dealers.filter(d => d.status === "Pending").length, icon: <Icons.User className="w-5 h-5 text-amber-600" />, tab: "dealers", bg: "bg-amber-50" },
    { label: "Pending RFQs", value: quotations.filter(q => q.status === "Pending").length, icon: <Icons.Send className="w-5 h-5 text-emerald-600" />, tab: "quotations", bg: "bg-emerald-50" },
    { label: "Unread Messages", value: messages.filter(m => !m.read).length, icon: <Icons.Mail className="w-5 h-5 text-red-600" />, tab: "messages", bg: "bg-red-50" }
  ];

  const recentRfqs = quotations.slice(0, 3);
  const recentMessages = messages.slice(0, 3);

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {cards.map((card, idx) => (
          <div 
            key={idx} 
            onClick={() => setActiveTab(card.tab)}
            className={`p-6 rounded-xl border border-neutral-border shadow-premium hover:shadow-premium-hover transition-all duration-150 cursor-pointer flex flex-col justify-between ${card.bg}`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xs uppercase tracking-wider font-bold text-neutral-muted">{card.label}</span>
              <div className="p-2 rounded bg-white shadow-2xs">{card.icon}</div>
            </div>
            <span className="text-3xl font-extrabold text-neutral-dark">{card.value}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent RFQs */}
        <div className="bg-white border rounded-xl p-6 shadow-premium space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <h3 className="font-extrabold text-neutral-dark text-sm">Recent Quotation Requests (RFQs)</h3>
            <button onClick={() => setActiveTab("quotations")} className="text-xs text-primary font-bold hover:underline">View All</button>
          </div>
          {recentRfqs.length > 0 ? (
            <div className="divide-y divide-neutral-light">
              {recentRfqs.map((rfq) => (
                <div key={rfq.id} className="py-3 flex justify-between items-start text-xs">
                  <div>
                    <h4 className="font-bold text-neutral-dark">{rfq.productName} ({rfq.quantity} Qty)</h4>
                    <span className="text-neutral-muted block mt-0.5">{rfq.businessName} • {rfq.contactPerson}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded font-semibold text-3xs ${
                    rfq.status === "Pending" ? "bg-amber-50 text-amber-800" : "bg-emerald-50 text-emerald-800"
                  }`}>
                    {rfq.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-neutral-muted">No quotation requests submitted yet.</p>
          )}
        </div>

        {/* Recent Messages */}
        <div className="bg-white border rounded-xl p-6 shadow-premium space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <h3 className="font-extrabold text-neutral-dark text-sm">Recent Inbox Messages</h3>
            <button onClick={() => setActiveTab("messages")} className="text-xs text-primary font-bold hover:underline">View All</button>
          </div>
          {recentMessages.length > 0 ? (
            <div className="divide-y divide-neutral-light">
              {recentMessages.map((msg) => (
                <div key={msg.id} className="py-3 flex justify-between items-start text-xs">
                  <div>
                    <h4 className="font-bold text-neutral-dark">{msg.subject}</h4>
                    <span className="text-neutral-muted block mt-0.5">From: {msg.name} ({msg.email})</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded font-semibold text-3xs ${
                    msg.read ? "bg-slate-50 text-slate-500" : "bg-red-50 text-red-800 font-bold"
                  }`}>
                    {msg.read ? "Read" : "Unread"}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-neutral-muted">No messages received yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

// ========================================================
// 2. PRODUCTS MANAGER MODULE
// ========================================================
export const ProductsManager = () => {
  const [products, setProducts] = useState(db.getProducts());
  const categories = db.getCategories();
  const [editProduct, setEditProduct] = useState(null); // holds product when editing/adding
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (prod) => {
    setEditProduct({ ...prod });
    setIsEditing(true);
  };

  const handleCreate = () => {
    setEditProduct({
      name: '',
      category: categories[0]?.name || '',
      shortDescription: '',
      detailedDescription: '',
      image: '',
      benefits: [],
      ingredients: '',
      suitableAnimals: '',
      usage: '',
      dosage: '',
      packagingSizes: '',
      storageInstructions: 'Store in cool dry conditions.',
      specifications: [],
      faqs: []
    });
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      db.deleteProduct(id);
      setProducts(db.getProducts());
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    db.saveProduct(editProduct);
    setProducts(db.getProducts());
    setIsEditing(false);
    setEditProduct(null);
  };

  return (
    <div className="space-y-6">
      {isEditing ? (
        <form onSubmit={handleSave} className="bg-white border rounded-xl p-6 shadow-premium space-y-4">
          <h3 className="font-extrabold text-neutral-dark text-md">
            {editProduct.id ? `Edit Product: ${editProduct.name}` : "Add New Healthcare Product"}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Product Name" 
              id="p_name" 
              value={editProduct.name}
              onChange={(e) => setEditProduct(prev => ({ ...prev, name: e.target.value }))}
              required 
            />
            <Select 
              label="Category" 
              id="p_cat" 
              options={categories.map(c => c.name)}
              value={editProduct.category}
              onChange={(e) => setEditProduct(prev => ({ ...prev, category: e.target.value }))}
              required 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Image URL" 
              id="p_image" 
              value={editProduct.image}
              onChange={(e) => setEditProduct(prev => ({ ...prev, image: e.target.value }))}
              placeholder="https://images.unsplash.com/..."
            />
            <Input 
              label="Packaging Sizes" 
              id="p_pack" 
              value={editProduct.packagingSizes}
              onChange={(e) => setEditProduct(prev => ({ ...prev, packagingSizes: e.target.value }))}
              placeholder="e.g. 1 Liter, 5 Liter"
              required 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Suitable Animals (comma separated)" 
              id="p_animals" 
              value={editProduct.suitableAnimals}
              onChange={(e) => setEditProduct(prev => ({ ...prev, suitableAnimals: e.target.value }))}
              placeholder="e.g. Cow, Buffalo, Goat"
              required 
            />
            <Input 
              label="Storage Instructions" 
              id="p_store" 
              value={editProduct.storageInstructions}
              onChange={(e) => setEditProduct(prev => ({ ...prev, storageInstructions: e.target.value }))}
              required 
            />
          </div>

          <Textarea 
            label="Short Description" 
            id="p_short" 
            value={editProduct.shortDescription}
            onChange={(e) => setEditProduct(prev => ({ ...prev, shortDescription: e.target.value }))}
            required 
          />

          <Textarea 
            label="Detailed Description" 
            id="p_detailed" 
            value={editProduct.detailedDescription}
            onChange={(e) => setEditProduct(prev => ({ ...prev, detailedDescription: e.target.value }))}
            required 
          />

          <div className="grid grid-cols-2 gap-4">
            <Textarea 
              label="Usage Directions" 
              id="p_usage" 
              value={editProduct.usage}
              onChange={(e) => setEditProduct(prev => ({ ...prev, usage: e.target.value }))}
              required 
            />
            <Textarea 
              label="Dosage" 
              id="p_dosage" 
              value={editProduct.dosage}
              onChange={(e) => setEditProduct(prev => ({ ...prev, dosage: e.target.value }))}
              required 
            />
          </div>

          <Textarea 
            label="Ingredients (comma separated)" 
            id="p_ingredients" 
            value={editProduct.ingredients}
            onChange={(e) => setEditProduct(prev => ({ ...prev, ingredients: e.target.value }))}
            required 
          />

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
            <Button variant="primary" type="submit">Save Product</Button>
          </div>
        </form>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h3 className="font-extrabold text-neutral-dark text-md">Manage Product Catalog</h3>
            <Button variant="primary" onClick={handleCreate} icon={<Icons.Plus className="w-4 h-4" />}>
              Add Product
            </Button>
          </div>

          <div className="bg-white border rounded-xl shadow-premium overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-light text-neutral-dark font-bold border-b">
                <tr>
                  <th className="px-6 py-4">Image</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Packaging Sizes</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-light text-neutral-body">
                {products.map((prod) => (
                  <tr key={prod.id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4">
                      <img src={prod.image} alt={prod.name} className="w-10 h-10 object-cover rounded border" />
                    </td>
                    <td className="px-6 py-4 font-bold text-neutral-dark">{prod.name}</td>
                    <td className="px-6 py-4">{prod.category}</td>
                    <td className="px-6 py-4">{prod.packagingSizes}</td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button onClick={() => handleEdit(prod)} className="p-1 hover:text-primary transition-colors">
                        <Icons.Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(prod.id)} className="p-1 hover:text-red-600 transition-colors">
                        <Icons.Trash className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

// ========================================================
// 3. CATEGORIES MANAGER MODULE
// ========================================================
export const CategoriesManager = () => {
  const [categories, setCategories] = useState(db.getCategories());
  const [newCatName, setNewCatName] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    db.saveCategory({ name: newCatName });
    setCategories(db.getCategories());
    setNewCatName('');
  };

  const handleDelete = (id) => {
    if (window.confirm("Deleting this category will remove it from the filter lists. Continue?")) {
      db.deleteCategory(id);
      setCategories(db.getCategories());
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
      {/* List */}
      <div className="md:col-span-8 bg-white border rounded-xl shadow-premium overflow-hidden">
        <h3 className="font-extrabold text-neutral-dark text-sm px-6 py-4 border-b">Active Product Categories</h3>
        <table className="w-full text-left text-xs">
          <thead className="bg-neutral-light border-b text-neutral-dark">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Category Name</th>
              <th className="px-6 py-4 text-right">Delete</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-light text-neutral-body">
            {categories.map((c) => (
              <tr key={c.id}>
                <td className="px-6 py-4 font-semibold text-neutral-muted">{c.id}</td>
                <td className="px-6 py-4 font-bold text-neutral-dark">{c.name}</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => handleDelete(c.id)} className="p-1 text-neutral-muted hover:text-red-600 transition-colors">
                    <Icons.Trash className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Form */}
      <div className="md:col-span-4 bg-white border border-neutral-border rounded-2xl p-6 shadow-premium space-y-4">
        <h3 className="font-extrabold text-neutral-dark text-sm">Add New Category</h3>
        <form onSubmit={handleAdd} className="space-y-4">
          <Input 
            label="Category Name" 
            id="cat_name" 
            placeholder="e.g. Uterine Tonic" 
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
            required 
          />
          <Button variant="primary" type="submit" className="w-full">
            Save Category
          </Button>
        </form>
      </div>
    </div>
  );
};

// ========================================================
// 4. BLOGS MANAGER MODULE
// ========================================================
export const BlogsManager = () => {
  const [blogs, setBlogs] = useState(db.getBlogs());
  const [editBlog, setEditBlog] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (blog) => {
    setEditBlog({ ...blog });
    setIsEditing(true);
  };

  const handleCreate = () => {
    setEditBlog({
      title: '',
      category: 'Livestock Management',
      summary: '',
      content: '',
      image: 'https://images.unsplash.com/photo-1527156278757-09d70de370a4?auto=format&fit=crop&q=80&w=800',
      author: 'Dr. K. B. Patoliya (MD)',
      seoDescription: ''
    });
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this blog article?")) {
      db.deleteBlog(id);
      setBlogs(db.getBlogs());
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    db.saveBlog(editBlog);
    setBlogs(db.getBlogs());
    setIsEditing(false);
    setEditBlog(null);
  };

  return (
    <div className="space-y-6">
      {isEditing ? (
        <form onSubmit={handleSave} className="bg-white border rounded-xl p-6 shadow-premium space-y-4">
          <h3 className="font-extrabold text-neutral-dark text-md">
            {editBlog.id ? "Edit Blog Article" : "Create New Blog Article"}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Article Title" 
              id="b_title" 
              value={editBlog.title}
              onChange={(e) => setEditBlog(prev => ({ ...prev, title: e.target.value }))}
              required 
            />
            <Select 
              label="Category" 
              id="b_cat" 
              options={["Livestock Management", "Animal Nutrition", "Veterinary Care", "News & Milestones"]}
              value={editBlog.category}
              onChange={(e) => setEditBlog(prev => ({ ...prev, category: e.target.value }))}
              required 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Author Details" 
              id="b_auth" 
              value={editBlog.author}
              onChange={(e) => setEditBlog(prev => ({ ...prev, author: e.target.value }))}
              required 
            />
            <Input 
              label="Banner Image URL" 
              id="b_image" 
              value={editBlog.image}
              onChange={(e) => setEditBlog(prev => ({ ...prev, image: e.target.value }))}
              required 
            />
          </div>

          <Textarea 
            label="SEO Meta Description (under 155 chars)" 
            id="b_seo" 
            value={editBlog.seoDescription}
            onChange={(e) => setEditBlog(prev => ({ ...prev, seoDescription: e.target.value }))}
            required 
          />

          <Textarea 
            label="Summary Text" 
            id="b_summary" 
            value={editBlog.summary}
            onChange={(e) => setEditBlog(prev => ({ ...prev, summary: e.target.value }))}
            required 
          />

          <Textarea 
            label="Article Body Content (Support Markdown headers '###')" 
            id="b_content" 
            rows={10}
            value={editBlog.content}
            onChange={(e) => setEditBlog(prev => ({ ...prev, content: e.target.value }))}
            required 
          />

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
            <Button variant="primary" type="submit">Publish Post</Button>
          </div>
        </form>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h3 className="font-extrabold text-neutral-dark text-md">Manage Animal Health Blog</h3>
            <Button variant="primary" onClick={handleCreate} icon={<Icons.Plus className="w-4 h-4" />}>
              Create Article
            </Button>
          </div>

          <div className="bg-white border rounded-xl shadow-premium overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-light border-b font-bold text-neutral-dark">
                <tr>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Author</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-light text-neutral-body">
                {blogs.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4 font-bold text-neutral-dark max-w-xs truncate">{b.title}</td>
                    <td className="px-6 py-4">{b.category}</td>
                    <td className="px-6 py-4">{b.date}</td>
                    <td className="px-6 py-4">{b.author}</td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button onClick={() => handleEdit(b)} className="p-1 hover:text-primary transition-colors">
                        <Icons.Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(b.id)} className="p-1 hover:text-red-600 transition-colors">
                        <Icons.Trash className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

// ========================================================
// 5. TESTIMONIALS MANAGER MODULE
// ========================================================
export const TestimonialsManager = () => {
  const [testimonials, setTestimonials] = useState(db.getTestimonials());
  const [newTest, setNewTest] = useState({
    name: '',
    role: '',
    location: '',
    content: '',
    rating: 5,
    type: 'Farmer'
  });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newTest.name || !newTest.content) return;
    db.saveTestimonial(newTest);
    setTestimonials(db.getTestimonials());
    setNewTest({
      name: '',
      role: '',
      location: '',
      content: '',
      rating: 5,
      type: 'Farmer'
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this customer feedback card?")) {
      db.deleteTestimonial(id);
      setTestimonials(db.getTestimonials());
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-8 bg-white border rounded-xl shadow-premium overflow-hidden">
        <h3 className="font-extrabold text-neutral-dark text-sm px-6 py-4 border-b">Client Testimonials</h3>
        <table className="w-full text-left text-xs">
          <thead className="bg-neutral-light border-b text-neutral-dark font-bold">
            <tr>
              <th className="px-6 py-4">Client Name</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Feedback Quote</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-light text-neutral-body">
            {testimonials.map((t) => (
              <tr key={t.id}>
                <td className="px-6 py-4 font-bold text-neutral-dark">
                  {t.name}
                  <span className="block text-3xs font-semibold text-neutral-muted">{t.role} ({t.location})</span>
                </td>
                <td className="px-6 py-4">{t.type}</td>
                <td className="px-6 py-4 max-w-xs truncate italic">"{t.content}"</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => handleDelete(t.id)} className="p-1 hover:text-red-600 transition-colors">
                    <Icons.Trash className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="lg:col-span-4 bg-white border border-neutral-border rounded-2xl p-6 shadow-premium space-y-4">
        <h3 className="font-extrabold text-neutral-dark text-sm">Add Testimonial</h3>
        <form onSubmit={handleAdd} className="space-y-4">
          <Input 
            label="Client Name" 
            id="t_name" 
            placeholder="Ramesh Patel" 
            value={newTest.name}
            onChange={(e) => setNewTest(prev => ({ ...prev, name: e.target.value }))}
            required 
          />
          <div className="grid grid-cols-2 gap-3">
            <Input 
              label="Role" 
              id="t_role" 
              placeholder="Vet Doctor" 
              value={newTest.role}
              onChange={(e) => setNewTest(prev => ({ ...prev, role: e.target.value }))}
            />
            <Input 
              label="Location" 
              id="t_loc" 
              placeholder="Navsari" 
              value={newTest.location}
              onChange={(e) => setNewTest(prev => ({ ...prev, location: e.target.value }))}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Select 
              label="Client Type" 
              id="t_type" 
              options={["Farmer", "Veterinarian", "Dealer", "Distributor"]}
              value={newTest.type}
              onChange={(e) => setNewTest(prev => ({ ...prev, type: e.target.value }))}
            />
            <Select 
              label="Stars" 
              id="t_stars" 
              options={[5, 4, 3, 2, 1]}
              value={newTest.rating}
              onChange={(e) => setNewTest(prev => ({ ...prev, rating: parseInt(e.target.value) }))}
            />
          </div>
          <Textarea 
            label="Review Text" 
            id="t_cont" 
            value={newTest.content}
            onChange={(e) => setNewTest(prev => ({ ...prev, content: e.target.value }))}
            required 
          />
          <Button variant="primary" type="submit" className="w-full">
            Post Testimonial
          </Button>
        </form>
      </div>
    </div>
  );
};

// ========================================================
// 6. GALLERY & DOWNLOADS MANAGER MODULE
// ========================================================
export const MediaManager = () => {
  const [gallery, setGallery] = useState(db.getGallery());
  const [downloads, setDownloads] = useState(db.getDownloads());

  // Add Gallery Item
  const [newGal, setNewGal] = useState({ title: '', url: '', category: 'Products' });
  const handleAddGal = (e) => {
    e.preventDefault();
    if (!newGal.title || !newGal.url) return;
    db.saveGalleryItem(newGal);
    setGallery(db.getGallery());
    setNewGal({ title: '', url: '', category: 'Products' });
  };

  const handleDeleteGal = (id) => {
    db.deleteGalleryItem(id);
    setGallery(db.getGallery());
  };

  // Add Download Brochure
  const [newDoc, setNewDoc] = useState({ title: '', type: 'Catalogue', size: '1.5 MB' });
  const handleAddDoc = (e) => {
    e.preventDefault();
    if (!newDoc.title) return;
    db.saveDownload(newDoc);
    setDownloads(db.getDownloads());
    setNewDoc({ title: '', type: 'Catalogue', size: '1.5 MB' });
  };

  const handleDeleteDoc = (id) => {
    db.deleteDownload(id);
    setDownloads(db.getDownloads());
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      
      {/* Gallery Section */}
      <div className="space-y-6">
        <h3 className="font-extrabold text-neutral-dark text-md">Manage Photo Gallery</h3>
        
        <form onSubmit={handleAddGal} className="bg-white border p-6 rounded-xl space-y-4 shadow-2xs">
          <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-muted">Add New Photo</h4>
          <div className="grid grid-cols-2 gap-3">
            <Input 
              label="Photo Name" 
              id="g_title" 
              placeholder="Cattle Feeding trials" 
              value={newGal.title}
              onChange={(e) => setNewGal(prev => ({ ...prev, title: e.target.value }))}
              required 
            />
            <Select 
              label="Category" 
              id="g_cat" 
              options={["Products", "Packaging", "Office", "Warehouse", "Team", "Events", "Farm Visits"]}
              value={newGal.category}
              onChange={(e) => setNewGal(prev => ({ ...prev, category: e.target.value }))}
            />
          </div>
          <Input 
            label="Image URL" 
            id="g_url" 
            placeholder="https://images.unsplash.com/..." 
            value={newGal.url}
            onChange={(e) => setNewGal(prev => ({ ...prev, url: e.target.value }))}
            required 
          />
          <Button variant="primary" type="submit" className="w-full">Add Photo</Button>
        </form>

        <div className="bg-white border rounded-xl overflow-hidden shadow-2xs max-h-96 overflow-y-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-light border-b text-neutral-dark">
              <tr>
                <th className="px-4 py-3">Photo</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-light text-neutral-body">
              {gallery.map(item => (
                <tr key={item.id}>
                  <td className="px-4 py-3 font-semibold flex items-center gap-2 text-neutral-dark">
                    <img src={item.url} alt={item.title} className="w-8 h-8 object-cover rounded" />
                    <span className="truncate max-w-[150px]">{item.title}</span>
                  </td>
                  <td className="px-4 py-3">{item.category}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => handleDeleteGal(item.id)} className="p-1 hover:text-red-600">
                      <Icons.Trash className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Downloads Section */}
      <div className="space-y-6">
        <h3 className="font-extrabold text-neutral-dark text-md">Manage Downloads Brochure Link</h3>
        
        <form onSubmit={handleAddDoc} className="bg-white border p-6 rounded-xl space-y-4 shadow-2xs">
          <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-muted">Add New Document</h4>
          <div className="grid grid-cols-2 gap-3">
            <Input 
              label="Document Title" 
              id="d_title" 
              placeholder="Liquid Calcium Brochure" 
              value={newDoc.title}
              onChange={(e) => setNewDoc(prev => ({ ...prev, title: e.target.value }))}
              required 
            />
            <Select 
              label="Doc Type" 
              id="d_type" 
              options={["Catalogue", "Profile", "Certificate", "Brochure"]}
              value={newDoc.type}
              onChange={(e) => setNewDoc(prev => ({ ...prev, type: e.target.value }))}
            />
          </div>
          <Input 
            label="File Size Label" 
            id="d_size" 
            placeholder="e.g. 1.2 MB" 
            value={newDoc.size}
            onChange={(e) => setNewDoc(prev => ({ ...prev, size: e.target.value }))}
            required 
          />
          <Button variant="primary" type="submit" className="w-full">Add Brochure Link</Button>
        </form>

        <div className="bg-white border rounded-xl overflow-hidden shadow-2xs max-h-96 overflow-y-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-light border-b text-neutral-dark">
              <tr>
                <th className="px-4 py-3">Document Title</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-light text-neutral-body">
              {downloads.map(doc => (
                <tr key={doc.id}>
                  <td className="px-4 py-3 font-semibold text-neutral-dark truncate max-w-[180px]">{doc.title}</td>
                  <td className="px-4 py-3">{doc.type}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => handleDeleteDoc(doc.id)} className="p-1 hover:text-red-600">
                      <Icons.Trash className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

// ========================================================
// 7. DEALERS, QUOTATIONS & MESSAGES INBOX VIEWERS
// ========================================================
export const InquiriesViewer = ({ activeModule = 'dealers' }) => {
  const [dealers, setDealers] = useState(db.getDealers());
  const [quotations, setQuotations] = useState(db.getQuotations());
  const [messages, setMessages] = useState(db.getMessages());

  // Modal view states
  const [selectedItem, setSelectedItem] = useState(null);

  const handleUpdateDealer = (id, status) => {
    db.updateDealerStatus(id, status);
    setDealers(db.getDealers());
    setSelectedItem(prev => prev ? { ...prev, status } : null);
  };

  const handleUpdateQuotation = (id, status) => {
    db.updateQuotationStatus(id, status);
    setQuotations(db.getQuotations());
    setSelectedItem(prev => prev ? { ...prev, status } : null);
  };

  const handleReadMessage = (msg) => {
    db.markMessageRead(msg.id);
    setMessages(db.getMessages());
    setSelectedItem(msg);
  };

  return (
    <div className="space-y-6">
      
      {/* 1. DEALER APPLICATIONS TAB */}
      {activeModule === 'dealers' && (
        <div className="bg-white border rounded-xl shadow-premium overflow-hidden">
          <h3 className="font-extrabold text-neutral-dark text-sm px-6 py-4 border-b">B2B Dealer Applications</h3>
          {dealers.length > 0 ? (
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-light border-b text-neutral-dark font-bold">
                <tr>
                  <th className="px-6 py-4">Applicant / Firm</th>
                  <th className="px-6 py-4">Contact</th>
                  <th className="px-6 py-4">State/City</th>
                  <th className="px-6 py-4">GST Number</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-light text-neutral-body">
                {dealers.map(d => (
                  <tr key={d.id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4 font-bold text-neutral-dark">
                      {d.fullName}
                      <span className="block text-3xs font-semibold text-neutral-muted uppercase tracking-wider">{d.companyName} ({d.businessType})</span>
                    </td>
                    <td className="px-6 py-4">
                      {d.mobile}
                      <span className="block text-3xs text-neutral-muted">{d.email}</span>
                    </td>
                    <td className="px-6 py-4">{d.state}, {d.city}</td>
                    <td className="px-6 py-4 font-mono font-semibold">{d.gstNumber || "N/A"}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded font-semibold text-3xs ${
                        d.status === "Pending" ? "bg-amber-50 text-amber-800" : d.status === "Approved" ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-800"
                      }`}>
                        {d.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="outline" onClick={() => setSelectedItem(d)} className="px-3 py-1.5 text-2xs">View</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-10"><EmptyState title="No Dealer Registrations" description="No registrations submitted yet by prospects." /></div>
          )}
        </div>
      )}

      {/* 2. QUOTATIONS RFQ TAB */}
      {activeModule === 'quotations' && (
        <div className="bg-white border rounded-xl shadow-premium overflow-hidden">
          <h3 className="font-extrabold text-neutral-dark text-sm px-6 py-4 border-b">Quotation Requests (RFQs)</h3>
          {quotations.length > 0 ? (
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-light border-b text-neutral-dark font-bold">
                <tr>
                  <th className="px-6 py-4">Product Name</th>
                  <th className="px-6 py-4">Qty</th>
                  <th className="px-6 py-4">Business / Buyer</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-light text-neutral-body">
                {quotations.map(q => (
                  <tr key={q.id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4 font-bold text-neutral-dark">{q.productName}</td>
                    <td className="px-6 py-4 font-semibold text-primary">{q.quantity}</td>
                    <td className="px-6 py-4">
                      {q.businessName}
                      <span className="block text-3xs text-neutral-muted">{q.contactPerson} • {q.phone}</span>
                    </td>
                    <td className="px-6 py-4">{q.date}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded font-semibold text-3xs ${
                        q.status === "Pending" ? "bg-amber-50 text-amber-800" : "bg-emerald-50 text-emerald-800"
                      }`}>
                        {q.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="outline" onClick={() => setSelectedItem(q)} className="px-3 py-1.5 text-2xs">View</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-10"><EmptyState title="No Quotation Requests" description="No bulk quotation RFQs submitted yet." /></div>
          )}
        </div>
      )}

      {/* 3. CONTACT MESSAGES INBOX TAB */}
      {activeModule === 'messages' && (
        <div className="bg-white border rounded-xl shadow-premium overflow-hidden">
          <h3 className="font-extrabold text-neutral-dark text-sm px-6 py-4 border-b">Inbox Inquiries</h3>
          {messages.length > 0 ? (
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-light border-b text-neutral-dark font-bold">
                <tr>
                  <th className="px-6 py-4">Sender</th>
                  <th className="px-6 py-4">Contact</th>
                  <th className="px-6 py-4">Subject</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Read</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-light text-neutral-body">
                {messages.map(m => (
                  <tr key={m.id} className={`hover:bg-slate-50/50 ${!m.read ? "bg-red-50/10 font-medium" : ""}`}>
                    <td className="px-6 py-4 font-bold text-neutral-dark">
                      {m.name}
                      <span className="block text-3xs font-semibold text-neutral-muted uppercase tracking-wider">{m.type || "Contact Message"}</span>
                    </td>
                    <td className="px-6 py-4">
                      {m.phone}
                      <span className="block text-2xs text-neutral-muted">{m.email}</span>
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate font-semibold text-neutral-dark">{m.subject}</td>
                    <td className="px-6 py-4">{m.date}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded font-semibold text-3xs ${
                        m.read ? "bg-slate-50 text-slate-500" : "bg-red-50 text-red-800 font-bold"
                      }`}>
                        {m.read ? "Read" : "Unread"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="outline" onClick={() => handleReadMessage(m)} className="px-3 py-1.5 text-2xs">Read</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-10"><EmptyState title="Inbox Empty" description="No contact message inquiries received yet." /></div>
          )}
        </div>
      )}

      {/* DETAIL MODAL VIEWER */}
      {selectedItem && (
        <Modal 
          isOpen={true} 
          onClose={() => setSelectedItem(null)} 
          title={
            selectedItem.fullName 
              ? "Dealer Application Review" 
              : selectedItem.productName 
                ? "RFQ Details View" 
                : "Read Message Details"
          }
        >
          {/* Dealer application detail view */}
          {selectedItem.fullName && (
            <div className="space-y-4 text-sm text-neutral-body">
              <div>
                <strong className="text-neutral-dark block text-xs uppercase tracking-wider text-neutral-muted mb-1">Company / Firm</strong>
                <span className="font-bold text-neutral-dark text-md">{selectedItem.companyName}</span>
                <span className="block text-xs font-semibold text-primary">{selectedItem.businessType}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 border-y py-3 border-neutral-light">
                <div>
                  <strong className="text-neutral-dark block text-xs font-bold mb-1">GSTIN Number</strong>
                  <span className="font-mono font-bold text-neutral-dark text-xs">{selectedItem.gstNumber || "N/A"}</span>
                </div>
                <div>
                  <strong className="text-neutral-dark block text-xs font-bold mb-1">Applicant Name</strong>
                  <span>{selectedItem.fullName}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 border-b pb-3 border-neutral-light">
                <div>
                  <strong className="text-neutral-dark block text-xs font-bold mb-1">Mobile</strong>
                  <span>{selectedItem.mobile}</span>
                </div>
                <div>
                  <strong className="text-neutral-dark block text-xs font-bold mb-1">Email</strong>
                  <span>{selectedItem.email}</span>
                </div>
              </div>
              <div>
                <strong className="text-neutral-dark block text-xs font-bold mb-1">Territory Request Location</strong>
                <span>{selectedItem.city}, {selectedItem.state}</span>
              </div>
              <div>
                <strong className="text-neutral-dark block text-xs font-bold mb-1">Business Experience</strong>
                <span>{selectedItem.experience || "Not Provided"}</span>
              </div>
              {selectedItem.licenseFile && (
                <div className="p-3 bg-primary-light border border-primary/20 rounded-md flex items-center justify-between">
                  <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Icons.FileText className="w-5 h-5" /> {selectedItem.licenseFile}
                  </span>
                  <button onClick={() => alert(`Downloading mock file: ${selectedItem.licenseFile}`)} className="text-2xs font-bold text-primary hover:underline">Download file</button>
                </div>
              )}
              {selectedItem.message && (
                <div>
                  <strong className="text-neutral-dark block text-xs font-bold mb-1">Description / Sales Network</strong>
                  <p className="bg-slate-50 border p-3 rounded-lg leading-relaxed text-xs">{selectedItem.message}</p>
                </div>
              )}

              {/* Status Actions */}
              <div className="pt-4 border-t border-neutral-border flex justify-between items-center">
                <div>
                  <span className="text-2xs text-neutral-muted font-bold block uppercase mb-1">Current Status</span>
                  <span className={`px-2 py-0.5 rounded font-semibold text-3xs ${
                    selectedItem.status === "Pending" ? "bg-amber-50 text-amber-800" : selectedItem.status === "Approved" ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-800"
                  }`}>{selectedItem.status}</span>
                </div>
                <div className="space-x-2">
                  <Button variant="outline" onClick={() => handleUpdateDealer(selectedItem.id, "Rejected")} className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100">Reject</Button>
                  <Button variant="primary" onClick={() => handleUpdateDealer(selectedItem.id, "Approved")}>Approve Distributorship</Button>
                </div>
              </div>
            </div>
          )}

          {/* RFQ Details View */}
          {selectedItem.productName && (
            <div className="space-y-4 text-sm text-neutral-body">
              <div className="grid grid-cols-2 gap-4 border-b pb-3 border-neutral-light">
                <div>
                  <strong className="text-neutral-dark block text-xs font-bold mb-0.5">Healthcare Product</strong>
                  <span className="font-bold text-neutral-dark">{selectedItem.productName}</span>
                </div>
                <div>
                  <strong className="text-neutral-dark block text-xs font-bold mb-0.5">Target Purchase Qty</strong>
                  <span className="font-bold text-primary text-base">{selectedItem.quantity} units</span>
                </div>
              </div>
              <div>
                <strong className="text-neutral-dark block text-xs font-bold mb-0.5">Buyer Business Name</strong>
                <span className="font-bold text-neutral-dark">{selectedItem.businessName}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 border-y py-3 border-neutral-light">
                <div>
                  <strong className="text-neutral-dark block text-xs font-bold mb-0.5">Contact Person</strong>
                  <span>{selectedItem.contactPerson}</span>
                </div>
                <div>
                  <strong className="text-neutral-dark block text-xs font-bold mb-0.5">Phone Mobile</strong>
                  <span>{selectedItem.phone}</span>
                </div>
              </div>
              <div className="border-b pb-3 border-neutral-light">
                <strong className="text-neutral-dark block text-xs font-bold mb-0.5">Email</strong>
                <span>{selectedItem.email}</span>
              </div>
              <div>
                <strong className="text-neutral-dark block text-xs font-bold mb-0.5">Shipment Delivery Destination</strong>
                <span>{selectedItem.address}</span>
              </div>
              {selectedItem.message && (
                <div>
                  <strong className="text-neutral-dark block text-xs font-bold mb-0.5">Buyer Specifications Message</strong>
                  <p className="bg-slate-50 border p-3 rounded-lg leading-relaxed text-xs">{selectedItem.message}</p>
                </div>
              )}

              {/* Status Actions */}
              <div className="pt-4 border-t border-neutral-border flex justify-between items-center">
                <div>
                  <span className="text-2xs text-neutral-muted font-bold block uppercase mb-1">Status</span>
                  <span className={`px-2 py-0.5 rounded font-semibold text-3xs ${
                    selectedItem.status === "Pending" ? "bg-amber-50 text-amber-800" : "bg-emerald-50 text-emerald-800"
                  }`}>{selectedItem.status}</span>
                </div>
                <div className="space-x-2">
                  <Button variant="primary" onClick={() => handleUpdateQuotation(selectedItem.id, "Quote Sent")}>Mark Quote Sent</Button>
                </div>
              </div>
            </div>
          )}

          {/* Inbox message Details View */}
          {selectedItem.subject && (
            <div className="space-y-4 text-sm text-neutral-body">
              <div>
                <strong className="text-neutral-dark block text-xs font-bold mb-0.5">Inquiry Type</strong>
                <span className="font-bold text-primary">{selectedItem.type || "Contact Message"}</span>
              </div>
              <div className="border-y py-3 border-neutral-light space-y-1">
                <div><strong className="text-neutral-dark">Sender:</strong> {selectedItem.name}</div>
                <div><strong className="text-neutral-dark">Email:</strong> {selectedItem.email}</div>
                <div><strong className="text-neutral-dark">Phone:</strong> {selectedItem.phone}</div>
                <div><strong className="text-neutral-dark">Date:</strong> {selectedItem.date}</div>
              </div>
              <div>
                <strong className="text-neutral-dark block text-xs font-bold mb-1">Subject</strong>
                <span className="font-bold text-neutral-dark text-md">{selectedItem.subject}</span>
              </div>
              <div>
                <strong className="text-neutral-dark block text-xs font-bold mb-1">Message Details</strong>
                <p className="bg-slate-50 border p-4 rounded-xl leading-relaxed whitespace-pre-line text-xs">{selectedItem.message}</p>
              </div>
              <div className="pt-4 border-t border-neutral-border flex justify-end">
                <Button variant="primary" onClick={() => setSelectedItem(null)}>Close Inbox Message</Button>
              </div>
            </div>
          )}

        </Modal>
      )}

    </div>
  );
};

// ========================================================
// 8. SITE SETTINGS & SEO MANAGER MODULE
// ========================================================
export const SettingsManager = () => {
  const [settings, setSettings] = useState(db.getSettings());
  const [seo, setSeo] = useState(db.getSeo());
  const [alertMsg, setAlertMsg] = useState('');

  const handleSaveSettings = (e) => {
    e.preventDefault();
    db.saveSettings(settings);
    setAlertMsg('General Site Settings updated successfully!');
    setTimeout(() => setAlertMsg(''), 2500);
  };

  const handleSaveSeo = (e) => {
    e.preventDefault();
    db.saveSeo(seo);
    setAlertMsg('Meta SEO tags configured successfully!');
    setTimeout(() => setAlertMsg(''), 2500);
  };

  return (
    <div className="space-y-10">
      
      {alertMsg && (
        <Alert type="success" message={alertMsg} onClose={() => setAlertMsg('')} />
      )}

      {/* General Settings */}
      <form onSubmit={handleSaveSettings} className="bg-white border rounded-xl p-6 shadow-premium space-y-4">
        <h3 className="font-extrabold text-neutral-dark text-md border-b pb-2">General B2B Site Settings</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <Input 
            label="Corporate Name" 
            id="s_name" 
            value={settings.companyName}
            onChange={(e) => setSettings(prev => ({ ...prev, companyName: e.target.value }))}
            required 
          />
          <Input 
            label="Managing Director Name" 
            id="s_md" 
            value={settings.managingDirector}
            onChange={(e) => setSettings(prev => ({ ...prev, managingDirector: e.target.value }))}
            required 
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input 
            label="Official Contact Email" 
            id="s_email" 
            value={settings.email}
            onChange={(e) => setSettings(prev => ({ ...prev, email: e.target.value }))}
            required 
          />
          <Input 
            label="WhatsApp B2B Number (digits only)" 
            id="s_wa" 
            value={settings.whatsappNumber}
            onChange={(e) => setSettings(prev => ({ ...prev, whatsappNumber: e.target.value }))}
            required 
          />
        </div>

        <Input 
          label="Corporate Head Office Address" 
          id="s_addr" 
          value={settings.address}
          onChange={(e) => setSettings(prev => ({ ...prev, address: e.target.value }))}
          required 
        />

        <div className="grid grid-cols-2 gap-4">
          <Input 
            label="Business Hours" 
            id="s_hours" 
            value={settings.businessHours}
            onChange={(e) => setSettings(prev => ({ ...prev, businessHours: e.target.value }))}
            required 
          />
          <div className="grid grid-cols-2 gap-2">
            <Input 
              label="Phone 1" 
              id="s_ph1" 
              value={settings.phoneNumbers[0] || ''}
              onChange={(e) => setSettings(prev => {
                const arr = [...prev.phoneNumbers];
                arr[0] = e.target.value;
                return { ...prev, phoneNumbers: arr };
              })}
              required 
            />
            <Input 
              label="Phone 2" 
              id="s_ph2" 
              value={settings.phoneNumbers[1] || ''}
              onChange={(e) => setSettings(prev => {
                const arr = [...prev.phoneNumbers];
                arr[1] = e.target.value;
                return { ...prev, phoneNumbers: arr };
              })}
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button variant="primary" type="submit">Save General Settings</Button>
        </div>
      </form>

      {/* SEO Settings */}
      <form onSubmit={handleSaveSeo} className="bg-white border rounded-xl p-6 shadow-premium space-y-6">
        <h3 className="font-extrabold text-neutral-dark text-md border-b pb-2">Configure SEO Page Metadata</h3>
        
        {Object.keys(seo).map((page) => (
          <div key={page} className="space-y-3 p-4 bg-slate-50 border rounded-lg">
            <h4 className="font-bold text-xs uppercase tracking-wider text-primary border-l-2 border-primary pl-2">
              {page} Page SEO
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input 
                label="Meta Title (Max 60 chars)" 
                id={`${page}_title`} 
                value={seo[page].title}
                onChange={(e) => setSeo(prev => ({
                  ...prev,
                  [page]: { ...prev[page], title: e.target.value }
                }))}
                required 
              />
              <Textarea 
                label="Meta Description (Max 160 chars)" 
                id={`${page}_desc`} 
                rows={2}
                value={seo[page].description}
                onChange={(e) => setSeo(prev => ({
                  ...prev,
                  [page]: { ...prev[page], description: e.target.value }
                }))}
                required 
              />
            </div>
          </div>
        ))}

        <div className="flex justify-end">
          <Button variant="primary" type="submit">Save All SEO Configs</Button>
        </div>
      </form>
    </div>
  );
};
