import React, { useState } from 'react';
import { db } from '../utils/db';
import { Icons } from '../components/UI/Icons';
import { Input, Textarea, Alert } from '../components/UI/Shared';
import { SimpleBreadcrumbs as Breadcrumbs } from '../components/UI/Breadcrumb';
import { Select } from '../components/UI/Select';
import { Button } from '../components/UI/Button';
import { Tabs, TabsList, TabsTrigger } from '../components/UI/Tabs';
import { Badge } from '../components/UI/Badge';

const Testimonials = () => {
  const [success, setSuccess] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const testimonials = db.getTestimonials();

  const [form, setForm] = useState({
    name: '',
    role: '',
    location: '',
    content: '',
    rating: 5,
    type: 'Farmer'
  });

  const filteredList = activeFilter === 'All' 
    ? testimonials 
    : testimonials.filter(t => t.type === activeFilter);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.content) return;

    db.saveTestimonial(form);
    setSuccess(true);
    
    // Scroll to list top
    window.scrollTo(0, 0);

    setTimeout(() => {
      setSuccess(false);
      setForm({
        name: '',
        role: '',
        location: '',
        content: '',
        rating: 5,
        type: 'Farmer'
      });
    }, 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: "Client Testimonials" }]} />

      {/* Header */}
      <div className="py-6 border-b border-neutral-border mb-10">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-dark">Customer Testimonials</h1>
        <p className="text-neutral-muted text-sm mt-1 leading-relaxed">
          Read what farmers, veterinary doctors, feed retailers, and regional distributors say about Brovet's product quality.
        </p>
      </div>

      {/* Filter Tabs + Testimonials Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: Listing Grid */}
        <div className="lg:col-span-8 space-y-8">
          {/* Toggles */}
          <Tabs value={activeFilter} onValueChange={setActiveFilter}>
            <TabsList variant="pills" className="pb-1">
              {['All', 'Farmer', 'Veterinarian', 'Dealer', 'Distributor'].map((type) => (
                <TabsTrigger key={type} value={type} className="text-xs">
                  {type}s
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {success && (
            <Alert type="success" message="Thank you! Your testimonial has been posted and is now live." />
          )}

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredList.map(t => (
              <div 
                key={t.id} 
                className="bg-white border border-neutral-border p-6 rounded-xl shadow-premium flex flex-col justify-between hover:shadow-premium-hover transition-shadow duration-200"
              >
                <div>
                  {/* Rating Stars */}
                  <div className="flex gap-0.5 text-amber-500 mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <Icons.Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-neutral-body italic leading-relaxed mb-6">
                    "{t.content}"
                  </p>
                </div>
                <div className="border-t border-neutral-light pt-4 flex justify-between items-end">
                  <div>
                    <h4 className="font-bold text-neutral-dark text-sm leading-tight">{t.name}</h4>
                    <span className="text-3xs text-neutral-muted block font-semibold uppercase">{t.role} ({t.location})</span>
                  </div>
                  <Badge variant="soft">{t.type}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Leave a Testimonial Form */}
        <div className="lg:col-span-4 bg-white border border-neutral-border rounded-2xl p-6 shadow-premium lg:sticky lg:top-24">
          <h3 className="font-extrabold text-neutral-dark text-lg mb-1">Submit Your Feedback</h3>
          <p className="text-xs text-neutral-muted mb-6">
            Are you a veterinarian or feed merchant trading Brovet supplements? Share your experience with us.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input 
              label="Your Name" 
              id="name" 
              placeholder="e.g. Ramesh Bhai" 
              value={form.name}
              onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
              required 
            />
            <div className="grid grid-cols-2 gap-3">
              <Input 
                label="Designation/Role" 
                id="role" 
                placeholder="e.g. Farm Owner" 
                value={form.role}
                onChange={(e) => setForm(prev => ({ ...prev, role: e.target.value }))}
              />
              <Input 
                label="Location" 
                id="location" 
                placeholder="e.g. Anand, Gujarat" 
                value={form.location}
                onChange={(e) => setForm(prev => ({ ...prev, location: e.target.value }))}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <Select 
                label="User Type" 
                id="type" 
                options={["Farmer", "Veterinarian", "Dealer", "Distributor"]}
                value={form.type}
                onChange={(e) => setForm(prev => ({ ...prev, type: e.target.value }))}
              />
              <Select 
                label="Rating (1-5)" 
                id="rating" 
                options={[5, 4, 3, 2, 1]}
                value={form.rating}
                onChange={(e) => setForm(prev => ({ ...prev, rating: parseInt(e.target.value) }))}
              />
            </div>

            <Textarea 
              label="Feedback Description" 
              id="content" 
              placeholder="Write how the product helped animal health, yield, fat ratio, or service quality..." 
              value={form.content}
              onChange={(e) => setForm(prev => ({ ...prev, content: e.target.value }))}
              required 
            />

            <Button variant="primary" type="submit" className="w-full py-2.5">
              Submit Testimonial
            </Button>
          </form>
        </div>

      </div>

    </div>
  );
};

export default Testimonials;
