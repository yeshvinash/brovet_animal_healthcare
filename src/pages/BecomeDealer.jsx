import React, { useState } from 'react';
import { db } from '../utils/db';
import { Icons } from '../components/UI/Icons';
import { Input, Textarea, Alert } from '../components/UI/Shared';
import { SimpleBreadcrumbs as Breadcrumbs } from '../components/UI/Breadcrumb';
import { Select } from '../components/UI/Select';
import { Button } from '../components/UI/Button';

const BecomeDealer = () => {
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    companyName: '',
    gstNumber: '',
    mobile: '',
    email: '',
    state: '',
    city: '',
    experience: '',
    businessType: '',
    licenseFile: '',
    message: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const tempErrors = {};
    if (!form.fullName) tempErrors.fullName = "Full Name is required";
    if (!form.companyName) tempErrors.companyName = "Company Name is required";
    if (!form.mobile) tempErrors.mobile = "Mobile Number is required";
    if (!form.email) tempErrors.email = "Email Address is required";
    if (!form.state) tempErrors.state = "State is required";
    if (!form.city) tempErrors.city = "City is required";
    if (!form.businessType) tempErrors.businessType = "Business Type selection is required";
    
    // Check GST format if provided (Optional, but if filled should be 15 chars)
    if (form.gstNumber && form.gstNumber.length !== 15) {
      tempErrors.gstNumber = "GST Number must be exactly 15 characters";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    db.saveDealer(form);
    setSuccess(true);
    
    // Scroll to top
    window.scrollTo(0, 0);

    setTimeout(() => {
      setSuccess(false);
      setForm({
        fullName: '',
        companyName: '',
        gstNumber: '',
        mobile: '',
        email: '',
        state: '',
        city: '',
        experience: '',
        businessType: '',
        licenseFile: '',
        message: ''
      });
    }, 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: "Become a Dealer" }]} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-6">
        
        {/* Left Side: Text and info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="text-xs font-bold tracking-widest text-primary uppercase">Partnership Opportunities</div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-dark tracking-tight leading-tight">
            Become a Licensed Dealer / Distributor for Brovet
          </h1>
          <p className="text-neutral-body text-sm leading-relaxed">
            Expand your regional retail business by introducing Brovet Animal Healthcare's premium, high-demand supplements. We offer protected territorial rights, strong profit margins, technical product catalogs, and marketing support.
          </p>

          <div className="border-t border-neutral-light pt-6 space-y-4">
            <h3 className="font-bold text-neutral-dark text-sm">Distributor Benefits:</h3>
            <ul className="space-y-3 text-xs text-neutral-body">
              <li className="flex items-center gap-2">
                <Icons.Check className="w-5 h-5 text-primary flex-shrink-0" />
                Monopoly rights for agreed postal districts
              </li>
              <li className="flex items-center gap-2">
                <Icons.Check className="w-5 h-5 text-primary flex-shrink-0" />
                Regular sales leads referred from head office
              </li>
              <li className="flex items-center gap-2">
                <Icons.Check className="w-5 h-5 text-primary flex-shrink-0" />
                Prompt supply dispatch from Navsari central warehouse
              </li>
              <li className="flex items-center gap-2">
                <Icons.Check className="w-5 h-5 text-primary flex-shrink-0" />
                Complete dynamic laboratory certification backups
              </li>
            </ul>
          </div>
        </div>

        {/* Right Side: Registration Form */}
        <div className="lg:col-span-7 bg-white border border-neutral-border rounded-2xl p-6 sm:p-8 shadow-premium">
          <h2 className="text-xl font-bold text-neutral-dark mb-1">Partnership Application Form</h2>
          <p className="text-xs text-neutral-muted mb-6">
            Provide your business credentials. Our dealer development team will review the details and get in touch within 2 business days.
          </p>

          {success && (
            <Alert 
              type="success" 
              message="Application submitted! Our partnership board will review your GST credentials and contact you." 
              className="mb-6" 
            />
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input 
                label="Full Name" 
                id="fullName" 
                placeholder="Authorized Signatory Name" 
                value={form.fullName}
                onChange={(e) => setForm(prev => ({ ...prev, fullName: e.target.value }))}
                error={errors.fullName}
                required 
              />
              <Input 
                label="Company / Firm Name" 
                id="companyName" 
                placeholder="Business Registration Name" 
                value={form.companyName}
                onChange={(e) => setForm(prev => ({ ...prev, companyName: e.target.value }))}
                error={errors.companyName}
                required 
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input 
                label="GSTIN Number (Optional)" 
                id="gstNumber" 
                placeholder="15-digit GST Registration" 
                value={form.gstNumber}
                onChange={(e) => setForm(prev => ({ ...prev, gstNumber: e.target.value.toUpperCase() }))}
                error={errors.gstNumber}
              />
              <Select 
                label="Primary Business Type" 
                id="businessType" 
                options={["Distributor", "Wholesale Trader", "Retail Feed Store", "Veterinary Clinic Chain"]}
                value={form.businessType}
                onChange={(e) => setForm(prev => ({ ...prev, businessType: e.target.value }))}
                error={errors.businessType}
                required 
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input 
                label="Mobile Number" 
                id="mobile" 
                type="tel"
                placeholder="10-digit Phone" 
                value={form.mobile}
                onChange={(e) => setForm(prev => ({ ...prev, mobile: e.target.value }))}
                error={errors.mobile}
                required 
              />
              <Input 
                label="Email Address" 
                id="email" 
                type="email"
                placeholder="name@company.com" 
                value={form.email}
                onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
                error={errors.email}
                required 
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input 
                label="City" 
                id="city" 
                placeholder="e.g. Navsari" 
                value={form.city}
                onChange={(e) => setForm(prev => ({ ...prev, city: e.target.value }))}
                error={errors.city}
                required 
              />
              <Input 
                label="State" 
                id="state" 
                placeholder="e.g. Gujarat" 
                value={form.state}
                onChange={(e) => setForm(prev => ({ ...prev, state: e.target.value }))}
                error={errors.state}
                required 
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input 
                label="Years of Feed / Vet Experience" 
                id="experience" 
                placeholder="e.g. 5 Years" 
                value={form.experience}
                onChange={(e) => setForm(prev => ({ ...prev, experience: e.target.value }))}
              />
              <div>
                <label className="block text-sm font-semibold text-neutral-dark mb-1.5">
                  Upload Drug License / GST Certificate
                </label>
                <input 
                  type="file" 
                  id="license"
                  onChange={(e) => setForm(prev => ({ ...prev, licenseFile: e.target.files[0] ? e.target.files[0].name : '' }))}
                  className="w-full text-xs text-neutral-muted file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary-light file:text-primary hover:file:bg-primary/20"
                />
                {form.licenseFile && (
                  <p className="text-2xs text-emerald-600 font-semibold mt-1">✓ File Attached: {form.licenseFile}</p>
                )}
              </div>
            </div>

            <Textarea 
              label="Brief Description of Your Current Sales Network" 
              id="message" 
              placeholder="List major districts you cover, current brands you represent..." 
              value={form.message}
              onChange={(e) => setForm(prev => ({ ...prev, message: e.target.value }))}
            />

            <Button variant="primary" type="submit" className="w-full py-2.5">
              Submit Dealer Application
            </Button>
          </form>
        </div>

      </div>

    </div>
  );
};

export default BecomeDealer;
