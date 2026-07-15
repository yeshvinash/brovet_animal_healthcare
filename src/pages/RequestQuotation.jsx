import React, { useState } from 'react';
import { db } from '../utils/db';
import { Icons } from '../components/UI/Icons';
import { Input, Textarea, Alert } from '../components/UI/Shared';
import { SimpleBreadcrumbs as Breadcrumbs } from '../components/UI/Breadcrumb';
import { Select } from '../components/UI/Select';
import { Button } from '../components/UI/Button';
import { DatePicker } from '../components/UI/Calendar';

const RequestQuotation = () => {
  const products = db.getProducts();
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    productName: '',
    quantity: '100',
    businessName: '',
    contactPerson: '',
    phone: '',
    email: '',
    address: '',
    requiredBy: '',
    message: ''
  });

  const validate = () => {
    const tempErrors = {};
    if (!form.productName) tempErrors.productName = "Please select a product";
    if (!form.quantity || parseInt(form.quantity) <= 0) tempErrors.quantity = "Please enter a valid quantity";
    if (!form.businessName) tempErrors.businessName = "Business Name is required";
    if (!form.contactPerson) tempErrors.contactPerson = "Contact Person name is required";
    if (!form.phone) tempErrors.phone = "Phone number is required";
    if (!form.email) tempErrors.email = "Email Address is required";
    if (!form.address) tempErrors.address = "Delivery Address is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    db.saveQuotation(form);
    setSuccess(true);
    window.scrollTo(0, 0);

    setTimeout(() => {
      setSuccess(false);
      setForm({
        productName: '',
        quantity: '100',
        businessName: '',
        contactPerson: '',
        phone: '',
        email: '',
        address: '',
        requiredBy: '',
        message: ''
      });
    }, 3000);
  };

  const productOptions = products.map(p => ({
    value: p.name,
    label: `${p.name} (${p.category})`
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: "Request a Quotation" }]} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-6">
        
        {/* Left Side Info Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="text-xs font-bold tracking-widest text-primary uppercase">B2B Quotations Desk</div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-dark tracking-tight leading-tight">
            Request a Commercial Bulk Quotation (RFQ)
          </h1>
          <p className="text-neutral-body text-sm leading-relaxed">
            Submit your trade quantities to receive custom pricing brochures, shipping terms, and payment structures directly from our Navsari headquarters.
          </p>

          <div className="border-t border-neutral-light pt-6 space-y-4">
            <h3 className="font-bold text-neutral-dark text-sm">Corporate Purchase Terms:</h3>
            <ul className="space-y-3.5 text-xs text-neutral-body">
              <li className="flex items-start gap-3">
                <Icons.CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span><strong>Flexible MOQ:</strong> Accommodating wholesale shipments as well as full container loads (FCL) for international trade.</span>
              </li>
              <li className="flex items-start gap-3">
                <Icons.CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span><strong>Chemical Analysis:</strong> All dispatches contain batch certifications of analysis.</span>
              </li>
              <li className="flex items-start gap-3">
                <Icons.CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span><strong>Logistics Channels:</strong> Road transport arrangements throughout India and port shipping coordination for global buyers.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Side Form Panel */}
        <div className="lg:col-span-7 bg-white border border-neutral-border rounded-2xl p-6 sm:p-8 shadow-premium">
          <h2 className="text-xl font-bold text-neutral-dark mb-1">Commercial Quote Form</h2>
          <p className="text-xs text-neutral-muted mb-6">
            Fill out the required information to help our sales team generate an accurate wholesale quotation.
          </p>

          {success && (
            <Alert 
              type="success" 
              message="RFQ submitted! Our sales desk is compiling your pricing sheets and will email you shortly." 
              className="mb-6" 
            />
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select 
                label="Select Healthcare Product" 
                id="productName" 
                options={productOptions}
                value={form.productName}
                onChange={(e) => setForm(prev => ({ ...prev, productName: e.target.value }))}
                error={errors.productName}
                required 
              />
              <Input 
                label="Target Quantity (Bottles/Pouches/Bags)" 
                id="quantity" 
                type="number"
                placeholder="100" 
                value={form.quantity}
                onChange={(e) => setForm(prev => ({ ...prev, quantity: e.target.value }))}
                error={errors.quantity}
                required 
              />
            </div>

            <Input 
              label="Business / Cooperative / Institution Name" 
              id="businessName" 
              placeholder="e.g. Navsari Veterinary Hospital Co." 
              value={form.businessName}
              onChange={(e) => setForm(prev => ({ ...prev, businessName: e.target.value }))}
              error={errors.businessName}
              required 
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input 
                label="Contact Person Name" 
                id="contactPerson" 
                placeholder="Name" 
                value={form.contactPerson}
                onChange={(e) => setForm(prev => ({ ...prev, contactPerson: e.target.value }))}
                error={errors.contactPerson}
                required 
              />
              <Input 
                label="Corporate Mobile Phone" 
                id="phone" 
                type="tel"
                placeholder="Mobile number" 
                value={form.phone}
                onChange={(e) => setForm(prev => ({ ...prev, phone: e.target.value }))}
                error={errors.phone}
                required 
              />
            </div>

            <Input 
              label="Official Email Address" 
              id="email" 
              type="email"
              placeholder="sales@company.com" 
              value={form.email}
              onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
              error={errors.email}
              required 
            />

            <Input 
              label="Full Delivery Address" 
              id="address" 
              placeholder="Company warehouse location or dispatch port" 
              value={form.address}
              onChange={(e) => setForm(prev => ({ ...prev, address: e.target.value }))}
              error={errors.address}
              required 
            />

            <DatePicker
              label="Required by date (optional)"
              id="requiredBy"
              placeholder="When do you need delivery?"
              value={form.requiredBy}
              onChange={(iso) => setForm((prev) => ({ ...prev, requiredBy: iso }))}
            />

            <Textarea 
              label="Custom Requests or Specifications" 
              id="message" 
              placeholder="e.g., custom batch formulations, export documentation requirements, private label queries..." 
              value={form.message}
              onChange={(e) => setForm(prev => ({ ...prev, message: e.target.value }))}
            />

            <Button variant="primary" type="submit" className="w-full py-2.5">
              Submit Quotation Request
            </Button>
          </form>
        </div>

      </div>

    </div>
  );
};

export default RequestQuotation;
