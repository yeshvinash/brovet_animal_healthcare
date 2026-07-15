import React, { useState } from 'react';
import { db } from '../utils/db';
import { Icons } from '../components/UI/Icons';
import { Input, Textarea, Alert } from '../components/UI/Shared';
import { SimpleBreadcrumbs as Breadcrumbs } from '../components/UI/Breadcrumb';
import { Button } from '../components/UI/Button';

const Contact = () => {
  const [settings] = useState(db.getSettings());
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const tempErrors = {};
    if (!form.name) tempErrors.name = "Name is required";
    if (!form.phone) tempErrors.phone = "Phone number is required";
    if (!form.email) tempErrors.email = "Email is required";
    if (!form.subject) tempErrors.subject = "Subject is required";
    if (!form.message) tempErrors.message = "Message details are required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    db.saveMessage({
      type: "Contact Message",
      ...form
    });
    
    setSuccess(true);
    window.scrollTo(0, 0);

    setTimeout(() => {
      setSuccess(false);
      setForm({
        name: '',
        phone: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  // WhatsApp click handler
  const handleWhatsAppClick = () => {
    const text = encodeURIComponent(`Hello Brovet, I am interested in your veterinary feed supplements. Please send the trade price list.`);
    window.open(`https://wa.me/${settings.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: "Contact Us" }]} />

      {/* Primary Header */}
      <div className="py-6 border-b border-neutral-border mb-10">
        <h1 className="text-3xl font-extrabold text-neutral-dark">Get in Touch with Brovet</h1>
        <p className="text-neutral-muted text-sm mt-1 leading-relaxed">
          Have questions about distributorship, pricing, exports, or formulations? Contact our corporate team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: Detail & Contact Info */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Contact Details */}
          <div className="bg-neutral-light border border-neutral-border rounded-2xl p-6 sm:p-8 space-y-6 shadow-premium">
            <h3 className="text-lg font-bold text-neutral-dark border-b pb-2">Navsari Head Office</h3>
            
            <ul className="space-y-5 text-sm">
              <li className="flex items-start">
                <Icons.MapPin className="w-5 h-5 text-primary flex-shrink-0 mr-3.5 mt-0.5" />
                <span className="text-neutral-body leading-relaxed">{settings.address}</span>
              </li>
              <li className="flex items-center">
                <Icons.Phone className="w-4 h-4 text-primary flex-shrink-0 mr-4" />
                <div className="text-neutral-body space-y-0.5 font-medium">
                  {settings.phoneNumbers.map((phone, idx) => (
                    <div key={idx}>{phone}</div>
                  ))}
                </div>
              </li>
              <li className="flex items-center">
                <Icons.Mail className="w-4 h-4 text-primary flex-shrink-0 mr-4" />
                <a href={`mailto:${settings.email}`} className="text-neutral-body hover:text-primary transition-colors font-medium">
                  {settings.email}
                </a>
              </li>
              <li className="flex items-start">
                <Icons.Clock className="w-4 h-4 text-primary flex-shrink-0 mr-4 mt-0.5" />
                <div className="text-neutral-body text-xs leading-relaxed">
                  <span className="font-bold text-neutral-dark block">Business Hours:</span>
                  {settings.businessHours}
                </div>
              </li>
            </ul>

            {/* WhatsApp CTA Button */}
            <div className="pt-4 border-t border-neutral-border">
              <button 
                onClick={handleWhatsAppClick}
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg transition duration-200"
              >
                {/* Inline WhatsApp logo */}
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.437.002 9.861-4.416 9.863-9.864.001-2.639-1.026-5.122-2.892-6.991C16.376 1.882 13.9 .856 11.263.856c-5.44 0-9.866 4.417-9.868 9.866-.001 1.502.393 2.971 1.142 4.279l-1.01 3.693 3.795-.995c1.282.699 2.684 1.066 4.735 1.065z" />
                </svg>
                Chat on WhatsApp
              </button>
            </div>
          </div>
          
          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="font-bold text-neutral-dark text-sm uppercase tracking-wider">Connect Online</h4>
            <div className="flex space-x-3">
              <a href={settings.socialLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-lg bg-white border border-neutral-border text-neutral-muted hover:text-primary hover:border-primary flex items-center justify-center shadow-2xs transition duration-150">
                <Icons.Facebook className="w-5 h-5" />
              </a>
              <a href={settings.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 rounded-lg bg-white border border-neutral-border text-neutral-muted hover:text-primary hover:border-primary flex items-center justify-center shadow-2xs transition duration-150">
                <Icons.Linkedin className="w-5 h-5" />
              </a>
              <a href={settings.socialLinks.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-10 h-10 rounded-lg bg-white border border-neutral-border text-neutral-muted hover:text-primary hover:border-primary flex items-center justify-center shadow-2xs transition duration-150">
                <Icons.Youtube className="w-5 h-5" />
              </a>
              <a href={settings.socialLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="w-10 h-10 rounded-lg bg-white border border-neutral-border text-neutral-muted hover:text-primary hover:border-primary flex items-center justify-center shadow-2xs transition duration-150">
                <Icons.Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: Message Form */}
        <div className="lg:col-span-7 bg-white border border-neutral-border rounded-2xl p-6 sm:p-8 shadow-premium">
          <h2 className="text-xl font-bold text-neutral-dark mb-1">Send a Message</h2>
          <p className="text-xs text-neutral-muted mb-6">
            If you have general questions or export queries, please submit the form below.
          </p>

          {success && (
            <Alert 
              type="success" 
              message="Your message has been submitted. Our team will email or call you." 
              className="mb-6" 
            />
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input 
                label="Your Name" 
                id="name" 
                placeholder="Full Name" 
                value={form.name}
                onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                error={errors.name}
                required 
              />
              <Input 
                label="Mobile Phone" 
                id="phone" 
                type="tel"
                placeholder="10-digit number" 
                value={form.phone}
                onChange={(e) => setForm(prev => ({ ...prev, phone: e.target.value }))}
                error={errors.phone}
                required 
              />
            </div>

            <Input 
              label="Email Address" 
              id="email" 
              type="email"
              placeholder="name@email.com" 
              value={form.email}
              onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
              error={errors.email}
              required 
            />

            <Input 
              label="Subject of Inquiry" 
              id="subject" 
              placeholder="e.g. Export bulk supply parameters / distributor availability" 
              value={form.subject}
              onChange={(e) => setForm(prev => ({ ...prev, subject: e.target.value }))}
              error={errors.subject}
              required 
            />

            <Textarea 
              label="Message details" 
              id="message" 
              placeholder="Write detailed requirements or queries here..." 
              value={form.message}
              onChange={(e) => setForm(prev => ({ ...prev, message: e.target.value }))}
              error={errors.message}
              required 
            />

            <Button variant="primary" type="submit" className="w-full py-2.5">
              Send Message
            </Button>
          </form>
        </div>

      </div>

      {/* Embedded Map Section */}
      <section className="mt-20 space-y-4">
        <h3 className="text-lg font-bold text-neutral-dark">Find Us On Google Maps</h3>
        <div className="w-full h-96 border rounded-2xl overflow-hidden shadow-premium">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3738.7408801968853!2d72.91572567584671!3d20.94276189073167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be0f653456789ab%3A0x890abcdef1234567!2sJalalpore%20Road%2C%20Navsari%2C%20Gujarat%20396445!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
            className="w-full h-full border-0" 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Brovet Head Office Location Navsari"
          ></iframe>
        </div>
      </section>

    </div>
  );
};

export default Contact;
