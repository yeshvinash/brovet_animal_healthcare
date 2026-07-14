import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRouter } from '../context/RouterContext';
import { useAuth } from '../context/AuthContext';
import { Icons } from './UI/Icons';
import LogoImg from '../assets/images/logo/brovet.png';

const Navbar = () => {
  const { currentPath, navigate, route } = useRouter();
  const { user, logoutUser } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [currentPath]);

  useEffect(() => {
    const handleOutsideClick = () => {
      setActiveDropdown(null);
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);

  const toggleDropdown = (e, menu) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  const isActive = (path) => {
    if (path === '/') return route === '/';
    return route === path || currentPath.startsWith(`${path}?`) || currentPath.startsWith(`${path}/`);
  };

  const linkClass = (path) => {
    return `px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md ${isActive(path)
      ? 'text-primary font-semibold bg-primary-light'
      : 'text-neutral-body hover:text-primary hover:bg-neutral-light'
      }`;
  };

  const dropdownItemClass = (path) => {
    return `block px-4 py-2 text-sm transition-colors duration-150 ${isActive(path)
      ? 'text-primary bg-primary-light font-medium'
      : 'text-neutral-body hover:text-primary hover:bg-neutral-light'
      }`;
  };

  const handleLogout = (e) => {
    e.preventDefault();
    e.stopPropagation();
    logoutUser();
    setActiveDropdown(null);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-neutral-border shadow-premium backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          <Link to="/" className="flex items-center" aria-label="Brovet home">
            <img src={LogoImg} alt="Brovet Logo" className="max-w-max max-h-16" />
          </Link>

          <nav className="hidden lg:flex space-x-1 items-center" aria-label="Main navigation">
            <Link to="/" className={linkClass('/')}>Home</Link>

            <div className="relative">
              <button
                type="button"
                onClick={(e) => toggleDropdown(e, 'about')}
                className={`flex items-center gap-1 ${linkClass('/about')}`}
                aria-expanded={activeDropdown === 'about'}
                aria-haspopup="true"
              >
                About Us
                <Icons.ChevronDown className="w-4 h-4" />
              </button>
              {activeDropdown === 'about' && (
                <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 py-1 origin-top-right fade-in">
                  <Link to="/about" className={dropdownItemClass('/about')}>Company Overview</Link>
                  <Link to="/why-choose-us" className={dropdownItemClass('/why-choose-us')}>Why Choose Us</Link>
                  <Link to="/infrastructure" className={dropdownItemClass('/infrastructure')}>Our Infrastructure</Link>
                  <Link to="/distribution-network" className={dropdownItemClass('/distribution-network')}>Distribution Network</Link>
                  <Link to="/quality-assurance" className={dropdownItemClass('/quality-assurance')}>Quality Assurance</Link>
                </div>
              )}
            </div>

            <Link to="/products" className={linkClass('/products')}>Products</Link>
            <Link to="/become-dealer" className={linkClass('/become-dealer')}>Become Dealer</Link>

            <div className="relative">
              <button
                type="button"
                onClick={(e) => toggleDropdown(e, 'resources')}
                className={`flex items-center gap-1 ${linkClass('/downloads')}`}
                aria-expanded={activeDropdown === 'resources'}
                aria-haspopup="true"
              >
                Resources
                <Icons.ChevronDown className="w-4 h-4" />
              </button>
              {activeDropdown === 'resources' && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 py-1 origin-top-right fade-in">
                  <Link to="/downloads" className={dropdownItemClass('/downloads')}>Downloads</Link>
                  <Link to="/gallery" className={dropdownItemClass('/gallery')}>Gallery</Link>
                  <Link to="/testimonials" className={dropdownItemClass('/testimonials')}>Testimonials</Link>
                  <Link to="/blogs" className={dropdownItemClass('/blogs')}>Blogs & News</Link>
                  <Link to="/faqs" className={dropdownItemClass('/faqs')}>FAQs</Link>
                </div>
              )}
            </div>

            <Link to="/contact" className={linkClass('/contact')}>Contact Us</Link>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            {user ? (
              <div className="relative hidden sm:block">
                <button
                  type="button"
                  onClick={(e) => toggleDropdown(e, 'account')}
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-border bg-neutral-light/80 pl-1.5 pr-3 py-1.5 text-sm font-semibold text-neutral-dark hover:border-primary/30 hover:bg-primary-light transition"
                  aria-expanded={activeDropdown === 'account'}
                  aria-haspopup="true"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">
                    {(user.name || user.email || 'U').charAt(0).toUpperCase()}
                  </span>
                  <span className="max-w-[7rem] truncate">{user.name?.split(' ')[0] || 'Account'}</span>
                  <Icons.ChevronDown className="w-4 h-4 text-neutral-muted" />
                </button>
                {activeDropdown === 'account' && (
                  <div className="absolute right-0 mt-2 w-52 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 py-1 fade-in">
                    <div className="px-4 py-2 border-b border-neutral-light">
                      <p className="text-xs font-bold text-neutral-dark truncate">{user.name}</p>
                      <p className="text-2xs text-neutral-muted truncate">{user.email}</p>
                    </div>
                    <Link to="/request-quotation" className={dropdownItemClass('/request-quotation')}>Request RFQ</Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-semibold"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link to="/login"
                  className="inline-flex items-center px-3 py-2 text-sm font-semibold text-neutral-dark hover:text-primary transition"
                >
                  Login
                </Link>
                <Link to="/signup"
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-primary border border-primary/30 bg-primary-light hover:bg-primary hover:text-white rounded-md transition"
                >
                  Sign Up
                </Link>
              </div>
            )}

            <Link to="/request-quotation"
              className="hidden md:inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-primary hover:bg-primary-hover active:bg-primary-dark rounded-md transition duration-150 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Request RFQ
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex lg:hidden items-center justify-center p-2 rounded-md text-neutral-body hover:text-primary hover:bg-neutral-light focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <Icons.X className="w-6 h-6" /> : <Icons.Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {mobileMenuOpen && (
        <div id="mobile-nav" className="lg:hidden border-t border-neutral-border bg-white divide-y divide-neutral-light shadow-inner max-h-[85vh] overflow-y-auto">
          <div className="px-2 pt-3 pb-4 space-y-1">
            <Link to="/" className="block px-3 py-2.5 rounded-md text-base font-medium text-neutral-dark hover:bg-neutral-light hover:text-primary">Home</Link>

            <div className="space-y-1 py-1">
              <span className="block px-3 text-xs font-semibold text-neutral-muted uppercase tracking-wider">About Brovet</span>
              <Link to="/about" className="block pl-6 pr-3 py-2 rounded-md text-sm font-medium text-neutral-body hover:bg-neutral-light hover:text-primary">Company Overview</Link>
              <Link to="/why-choose-us" className="block pl-6 pr-3 py-2 rounded-md text-sm font-medium text-neutral-body hover:bg-neutral-light hover:text-primary">Why Choose Us</Link>
              <Link to="/infrastructure" className="block pl-6 pr-3 py-2 rounded-md text-sm font-medium text-neutral-body hover:bg-neutral-light hover:text-primary">Our Infrastructure</Link>
              <Link to="/distribution-network" className="block pl-6 pr-3 py-2 rounded-md text-sm font-medium text-neutral-body hover:bg-neutral-light hover:text-primary">Distribution Network</Link>
              <Link to="/quality-assurance" className="block pl-6 pr-3 py-2 rounded-md text-sm font-medium text-neutral-body hover:bg-neutral-light hover:text-primary">Quality Assurance</Link>
            </div>

            <Link to="/products" className="block px-3 py-2.5 rounded-md text-base font-medium text-neutral-dark hover:bg-neutral-light hover:text-primary">Products</Link>
            <Link to="/become-dealer" className="block px-3 py-2.5 rounded-md text-base font-medium text-neutral-dark hover:bg-neutral-light hover:text-primary">Become Dealer</Link>

            <div className="space-y-1 py-1">
              <span className="block px-3 text-xs font-semibold text-neutral-muted uppercase tracking-wider">Resources</span>
              <Link to="/downloads" className="block pl-6 pr-3 py-2 rounded-md text-sm font-medium text-neutral-body hover:bg-neutral-light hover:text-primary">Downloads Center</Link>
              <Link to="/gallery" className="block pl-6 pr-3 py-2 rounded-md text-sm font-medium text-neutral-body hover:bg-neutral-light hover:text-primary">Photo Gallery</Link>
              <Link to="/testimonials" className="block pl-6 pr-3 py-2 rounded-md text-sm font-medium text-neutral-body hover:bg-neutral-light hover:text-primary">Testimonials</Link>
              <Link to="/blogs" className="block pl-6 pr-3 py-2 rounded-md text-sm font-medium text-neutral-body hover:bg-neutral-light hover:text-primary">Blogs & Articles</Link>
              <Link to="/faqs" className="block pl-6 pr-3 py-2 rounded-md text-sm font-medium text-neutral-body hover:bg-neutral-light hover:text-primary">FAQs</Link>
            </div>

            <Link to="/contact" className="block px-3 py-2.5 rounded-md text-base font-medium text-neutral-dark hover:bg-neutral-light hover:text-primary">Contact Us</Link>

            <div className="px-3 pt-3 space-y-2">
              {user ? (
                <>
                  <div className="rounded-lg bg-neutral-light px-3 py-2 text-xs">
                    <p className="font-bold text-neutral-dark">{user.name}</p>
                    <p className="text-neutral-muted truncate">{user.email}</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center px-4 py-3 text-base font-semibold text-red-600 border border-red-200 bg-red-50 rounded-md"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link to="/login" className="flex items-center justify-center px-4 py-3 text-sm font-semibold text-primary border border-primary/25 rounded-md">
                    Login
                  </Link>
                  <Link to="/signup" className="flex items-center justify-center px-4 py-3 text-sm font-semibold text-white bg-primary rounded-md">
                    Sign Up
                  </Link>
                </div>
              )}
              <Link to="/request-quotation"
                className="w-full flex items-center justify-center px-4 py-3 text-base font-semibold text-white bg-primary hover:bg-primary-hover rounded-md shadow-md"
              >
                Request RFQ
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
