import React, { useState } from 'react';
import { Icons } from './UI/Icons';
import { db } from '../utils/db';
import LogoImg from '../assets/images/logo/brovet.png';


const Footer = () => {
  const [settings] = useState(db.getSettings());
  const categories = db.getCategories();

  return (
    <footer className="bg-neutral-dark text-slate-300 border-t-4 border-primary pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Upper Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Column 1: Brand & Overview */}
          <div>
            <div className="flex items-center mb-5">
              <img src={LogoImg} alt="Brovet Logo" className="max-w-max max-h-16" />
            </div>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              Leading supplier, exporter, and distributor of scientifically formulated animal nutrition and veterinary healthcare supplements in India.
            </p>
            <div className="text-xs text-slate-500 space-y-1">
              <div><strong className="text-slate-400">Established:</strong> {settings.established}</div>
              <div><strong className="text-slate-400">Managing Director:</strong> {settings.managingDirector}</div>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-3 mt-5">
              <a href={settings.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded bg-slate-800 hover:bg-primary hover:text-white flex items-center justify-center transition-colors duration-200 text-slate-400" aria-label="Facebook">
                <Icons.Facebook className="w-4 h-4" />
              </a>
              <a href={settings.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded bg-slate-800 hover:bg-primary hover:text-white flex items-center justify-center transition-colors duration-200 text-slate-400" aria-label="LinkedIn">
                <Icons.Linkedin className="w-4 h-4" />
              </a>
              <a href={settings.socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded bg-slate-800 hover:bg-primary hover:text-white flex items-center justify-center transition-colors duration-200 text-slate-400" aria-label="YouTube">
                <Icons.Youtube className="w-4 h-4" />
              </a>
              <a href={settings.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded bg-slate-800 hover:bg-primary hover:text-white flex items-center justify-center transition-colors duration-200 text-slate-400" aria-label="Twitter">
                <Icons.Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Product Categories */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-5">Product Lines</h3>
            <ul className="space-y-2.5 text-sm">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <a href={`/products?category=${encodeURIComponent(cat.name)}`} className="text-slate-400 hover:text-primary transition-colors duration-150">
                    {cat.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Navigation */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-5">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <ul className="space-y-2.5">
                <li><a href="/" className="text-slate-400 hover:text-primary transition-colors duration-150">Home</a></li>
                <li><a href="/about" className="text-slate-400 hover:text-primary transition-colors duration-150">About Us</a></li>
                <li><a href="/why-choose-us" className="text-slate-400 hover:text-primary transition-colors duration-150">Why Us</a></li>
                <li><a href="/infrastructure" className="text-slate-400 hover:text-primary transition-colors duration-150">Infrastructure</a></li>
                <li><a href="/become-dealer" className="text-slate-400 hover:text-primary transition-colors duration-150">Dealer Portal</a></li>
              </ul>
              <ul className="space-y-2.5">
                <li><a href="/downloads" className="text-slate-400 hover:text-primary transition-colors duration-150">Downloads</a></li>
                <li><a href="/blogs" className="text-slate-400 hover:text-primary transition-colors duration-150">Blogs</a></li>
                <li><a href="/faqs" className="text-slate-400 hover:text-primary transition-colors duration-150">FAQs</a></li>
                <li><a href="/gallery" className="text-slate-400 hover:text-primary transition-colors duration-150">Gallery</a></li>
                <li><a href="/contact" className="text-slate-400 hover:text-primary transition-colors duration-150">Contact</a></li>
              </ul>
            </div>
          </div>

          {/* Column 4: Contact Information */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-5">Corporate Office</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start">
                <Icons.MapPin className="w-5 h-5 text-primary flex-shrink-0 mr-3 mt-0.5" />
                <span className="text-slate-400 leading-snug">{settings.address}</span>
              </li>
              <li className="flex items-center">
                <Icons.Phone className="w-4 h-4 text-primary flex-shrink-0 mr-3.5" />
                <div className="text-slate-400 space-y-0.5">
                  {settings.phoneNumbers.map((phone, idx) => (
                    <a
                      key={idx}
                      href={`tel:${phone.replace(/[^\d+]/g, '')}`}
                      className="block hover:text-primary transition-colors duration-150"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </li>
              <li className="flex items-center">
                <Icons.Mail className="w-4 h-4 text-primary flex-shrink-0 mr-3.5" />
                <a href={`mailto:${settings.email}`} className="text-slate-400 hover:text-primary transition-colors duration-150">
                  {settings.email}
                </a>
              </li>
              <li className="flex items-start">
                <Icons.Clock className="w-4 h-4 text-primary flex-shrink-0 mr-3.5 mt-0.5" />
                <span className="text-slate-400 leading-snug text-xs">{settings.businessHours}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Lower copyright bar */}
        <div className="border-t border-slate-800 pt-8 mt-12 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
          <div className="mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Brovet Animal Healthcare. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="/privacy-policy" className="hover:text-primary transition-colors duration-150">Privacy Policy</a>
            <a href="/terms-conditions" className="hover:text-primary transition-colors duration-150">Terms & Conditions</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
