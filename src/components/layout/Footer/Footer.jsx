import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icons } from '../../UI/Icons';
import { db } from '../../../utils/db';
import LogoImg from '../../../assets/images/logo/brovet.png';


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
                            <img src={LogoImg} alt="Brovet Logo" className="h-12 w-auto max-w-[160px] object-contain" />
                        </div>
                        <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                            Leading supplier, exporter, and distributor of scientifically formulated animal nutrition and veterinary healthcare supplements in India.
                        </p>
                        <div className="text-xs text-slate-400 space-y-1">
                            <div><strong className="text-slate-300">Established:</strong> {settings.established}</div>
                            <div><strong className="text-slate-300">Managing Director:</strong> {settings.managingDirector}</div>
                        </div>

                        {/* Social Icons */}
                        <div className="flex flex-wrap gap-2 mt-5">
                            <a href={settings.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-md bg-slate-800 hover:bg-primary hover:text-white flex items-center justify-center transition-colors duration-200 text-slate-400" aria-label="Facebook">
                                <Icons.Facebook className="w-5 h-5" />
                            </a>
                            <a href={settings.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-md bg-slate-800 hover:bg-primary hover:text-white flex items-center justify-center transition-colors duration-200 text-slate-400" aria-label="LinkedIn">
                                <Icons.Linkedin className="w-5 h-5" />
                            </a>
                            <a href={settings.socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-md bg-slate-800 hover:bg-primary hover:text-white flex items-center justify-center transition-colors duration-200 text-slate-400" aria-label="YouTube">
                                <Icons.Youtube className="w-5 h-5" />
                            </a>
                            <a href={settings.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-md bg-slate-800 hover:bg-primary hover:text-white flex items-center justify-center transition-colors duration-200 text-slate-400" aria-label="Twitter">
                                <Icons.Twitter className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Product Categories */}
                    <div>
                        <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-5">Product Lines</h3>
                        <ul className="space-y-1 text-sm">
                            {categories.map((cat) => (
                                <li key={cat.id}>
                                    <Link to={`/products?category=${encodeURIComponent(cat.name)}`} className="inline-flex items-center min-h-8 text-slate-400 hover:text-white transition-colors duration-150">
                                        {cat.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Quick Navigation */}
                    <div>
                        <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-5">Quick Links</h3>
                        <div className="grid grid-cols-2 gap-x-2 gap-y-0 text-sm">
                            <ul className="space-y-1">
                                <li><Link to="/" className="inline-flex items-center min-h-8 text-slate-400 hover:text-white transition-colors duration-150">Home</Link></li>
                                <li><Link to="/about" className="inline-flex items-center min-h-8 text-slate-400 hover:text-white transition-colors duration-150">About Us</Link></li>
                                <li><Link to="/why-choose-us" className="inline-flex items-center min-h-8 text-slate-400 hover:text-white transition-colors duration-150">Why Us</Link></li>
                                <li><Link to="/infrastructure" className="inline-flex items-center min-h-8 text-slate-400 hover:text-white transition-colors duration-150">Infrastructure</Link></li>
                                <li><Link to="/become-dealer" className="inline-flex items-center min-h-8 text-slate-400 hover:text-white transition-colors duration-150">Dealer Portal</Link></li>
                            </ul>
                            <ul className="space-y-1">
                                <li><Link to="/downloads" className="inline-flex items-center min-h-8 text-slate-400 hover:text-white transition-colors duration-150">Downloads</Link></li>
                                <li><Link to="/blogs" className="inline-flex items-center min-h-8 text-slate-400 hover:text-white transition-colors duration-150">Blogs</Link></li>
                                <li><Link to="/faqs" className="inline-flex items-center min-h-8 text-slate-400 hover:text-white transition-colors duration-150">FAQs</Link></li>
                                <li><Link to="/gallery" className="inline-flex items-center min-h-8 text-slate-400 hover:text-white transition-colors duration-150">Gallery</Link></li>
                                <li><Link to="/contact" className="inline-flex items-center min-h-8 text-slate-400 hover:text-white transition-colors duration-150">Contact</Link></li>
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
                                <a href={`mailto:${settings.email}`} className="text-slate-400 hover:text-white transition-colors duration-150">
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
                <div className="border-t border-slate-800 pt-8 mt-12 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400">
                    <div className="mb-4 md:mb-0">
                        &copy; {new Date().getFullYear()} Brovet Animal Healthcare. All rights reserved.
                    </div>
                    <div className="flex space-x-6">
                        <Link to="/privacy-policy" className="hover:text-white transition-colors duration-150">Privacy Policy</Link>
                        <Link to="/terms-conditions" className="hover:text-white transition-colors duration-150">Terms & Conditions</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
