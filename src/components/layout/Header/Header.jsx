import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRouter } from '../../../context/RouterContext';
import { useAuth } from '../../../context/AuthContext';
import { Icons } from '../../UI/Icons';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '../../UI/Dropdown';
import LogoImg from '../../../assets/images/logo/brovet.png';

const ABOUT_LINKS = [
  { to: '/about', label: 'Company Overview' },
  { to: '/why-choose-us', label: 'Why Choose Us' },
  { to: '/infrastructure', label: 'Our Infrastructure' },
  { to: '/distribution-network', label: 'Distribution Network' },
  { to: '/quality-assurance', label: 'Quality Assurance' },
];

const RESOURCE_LINKS = [
  { to: '/downloads', label: 'Downloads' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/blogs', label: 'Blogs & News' },
  { to: '/faqs', label: 'FAQs' },
];

const Navbar = () => {
  const { currentPath, navigate, route } = useRouter();
  const { user, logoutUser } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [currentPath]);

  const isActive = (path) => {
    if (path === '/') return route === '/';
    return route === path || currentPath.startsWith(`${path}?`) || currentPath.startsWith(`${path}/`);
  };

  const linkClass = (path) =>
    `px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md ${
      isActive(path)
        ? 'text-primary font-semibold bg-primary-light'
        : 'text-neutral-body hover:text-primary hover:bg-neutral-light'
    }`;

  const menuItemClass = (path) =>
    isActive(path) ? 'bg-primary-light font-medium text-primary' : undefined;

  const handleLogout = (e) => {
    e.preventDefault();
    e.stopPropagation();
    logoutUser();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-neutral-border shadow-premium backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between md:h-20 h-16">
          <Link to="/" className="flex items-center" aria-label="Brovet home">
            <img src={LogoImg} alt="Brovet Logo" className="max-w-max md:max-h-16 max-h-12" />
          </Link>

          <nav className="hidden lg:flex space-x-1 items-center" aria-label="Main navigation">
            <Link to="/" className={linkClass('/')}>
              Home
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger className={`flex items-center gap-1 ${linkClass('/about')}`}>
                About Us
                <Icons.ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {ABOUT_LINKS.map((item) => (
                  <DropdownMenuItem key={item.to} asChild className={menuItemClass(item.to)}>
                    <Link to={item.to}>{item.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/products" className={linkClass('/products')}>
              Products
            </Link>
            <Link to="/become-dealer" className={linkClass('/become-dealer')}>
              Become Dealer
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger className={`flex items-center gap-1 ${linkClass('/downloads')}`}>
                Resources
                <Icons.ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {RESOURCE_LINKS.map((item) => (
                  <DropdownMenuItem key={item.to} asChild className={menuItemClass(item.to)}>
                    <Link to={item.to}>{item.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/contact" className={linkClass('/contact')}>
              Contact Us
            </Link>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            {user ? (
              <div className="hidden sm:block">
                <DropdownMenu>
                  <DropdownMenuTrigger className="inline-flex items-center gap-2 rounded-full border border-neutral-border bg-neutral-light/80 pl-1.5 pr-3 py-1.5 text-sm font-semibold text-neutral-dark hover:border-primary/30 hover:bg-primary-light transition">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">
                      {(user.name || user.email || 'U').charAt(0).toUpperCase()}
                    </span>
                    <span className="max-w-[7rem] truncate">
                      {user.name?.split(' ')[0] || 'Account'}
                    </span>
                    <Icons.ChevronDown className="w-4 h-4 text-neutral-muted" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-52">
                    <DropdownMenuLabel className="normal-case tracking-normal">
                      <p className="truncate text-xs font-bold text-neutral-dark">{user.name}</p>
                      <p className="truncate text-2xs font-normal text-neutral-muted">{user.email}</p>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild className={menuItemClass('/request-quotation')}>
                      <Link to="/request-quotation">Request RFQ</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem variant="destructive" onSelect={handleLogout}>
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              // Temporary: Login / Sign Up hidden
              null
            )}

            <Link
              to="/request-quotation"
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
        <div
          id="mobile-nav"
          className="lg:hidden border-t border-neutral-border bg-white divide-y divide-neutral-light shadow-inner max-h-[85vh] overflow-y-auto"
        >
          <div className="px-2 pt-3 pb-4 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2.5 rounded-md text-base font-medium text-neutral-dark hover:bg-neutral-light hover:text-primary"
            >
              Home
            </Link>

            <div className="space-y-1 py-1">
              <span className="block px-3 text-xs font-semibold text-neutral-muted uppercase tracking-wider">
                About Brovet
              </span>
              {ABOUT_LINKS.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="block pl-6 pr-3 py-2 rounded-md text-sm font-medium text-neutral-body hover:bg-neutral-light hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <Link
              to="/products"
              className="block px-3 py-2.5 rounded-md text-base font-medium text-neutral-dark hover:bg-neutral-light hover:text-primary"
            >
              Products
            </Link>
            <Link
              to="/become-dealer"
              className="block px-3 py-2.5 rounded-md text-base font-medium text-neutral-dark hover:bg-neutral-light hover:text-primary"
            >
              Become Dealer
            </Link>

            <div className="space-y-1 py-1">
              <span className="block px-3 text-xs font-semibold text-neutral-muted uppercase tracking-wider">
                Resources
              </span>
              {RESOURCE_LINKS.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="block pl-6 pr-3 py-2 rounded-md text-sm font-medium text-neutral-body hover:bg-neutral-light hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <Link
              to="/contact"
              className="block px-3 py-2.5 rounded-md text-base font-medium text-neutral-dark hover:bg-neutral-light hover:text-primary"
            >
              Contact Us
            </Link>

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
              ) : null}
              <Link
                to="/request-quotation"
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
