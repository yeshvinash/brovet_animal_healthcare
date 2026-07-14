import React, { useEffect } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { db } from './utils/db';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import BecomeDealer from './pages/BecomeDealer';
import RequestQuotation from './pages/RequestQuotation';
import Blogs from './pages/Blogs';
import BlogDetails from './pages/BlogDetails';
import Downloads from './pages/Downloads';
import Gallery from './pages/Gallery';
import Testimonials from './pages/Testimonials';
import FAQs from './pages/Faqs';
import Contact from './pages/Contact';

import {
  WhyChooseUs,
  Infrastructure,
  DistributionNetwork,
  QualityAssurance,
} from './pages/InfoPages';

import {
  PrivacyPolicy,
  TermsConditions,
  NotFound,
} from './pages/LegalPages';

import AdminLogin from './pages/admin/AdminLogin';
import AdminSignup from './pages/admin/AdminSignup';
import AdminLayout from './pages/admin/AdminLayout';
import UserLogin from './pages/auth/UserLogin';
import UserSignup from './pages/auth/UserSignup';

const SEO_KEY_BY_ROUTE = {
  '/': 'home',
  '/about': 'about',
  '/products': 'products',
  '/become-dealer': 'dealer',
  '/contact': 'contact',
};

const FALLBACK_SEO = {
  '/': {
    title: 'Brovet Animal Healthcare | Premium Veterinary Products India',
    description:
      "Established in 2018, Brovet is India's leading B2B exporter of liquid calcium, liver tonics, mineral mixtures, and animal nutritional supplements.",
  },
  '/product': {
    title: 'Product Details | Brovet Animal Healthcare',
    description:
      'View product specifications, dosage, and benefits for Brovet veterinary feed supplements.',
  },
  '/request-quotation': {
    title: 'Request a Quotation | Brovet Animal Healthcare',
    description:
      'Submit a B2B RFQ for Brovet liquid calcium, tonics, and livestock nutrition products.',
  },
  '/blogs': {
    title: 'Blogs & News | Brovet Animal Healthcare',
    description:
      'Industry insights, dairy nutrition tips, and company news from Brovet Animal Healthcare.',
  },
  '/blog': {
    title: 'Article | Brovet Animal Healthcare',
    description: 'Read veterinary and livestock nutrition articles from Brovet Animal Healthcare.',
  },
  '/downloads': {
    title: 'Downloads & Catalogues | Brovet Animal Healthcare',
    description: 'Download Brovet product catalogues, brochures, and technical documentation.',
  },
  '/gallery': {
    title: 'Gallery | Brovet Animal Healthcare',
    description: 'Photos from Brovet facilities, products, and distribution network.',
  },
  '/testimonials': {
    title: 'Testimonials | Brovet Animal Healthcare',
    description: 'Hear from dealers and dairy farmers who trust Brovet Animal Healthcare.',
  },
  '/faqs': {
    title: 'FAQs | Brovet Animal Healthcare',
    description: 'Frequently asked questions about Brovet products, dealers, and ordering.',
  },
  '/why-choose-us': {
    title: 'Why Choose Brovet | Animal Healthcare',
    description: 'Reasons farms and distributors choose Brovet for veterinary nutrition.',
  },
  '/infrastructure': {
    title: 'Infrastructure | Brovet Animal Healthcare',
    description: 'Explore Brovet manufacturing and quality infrastructure in Navsari, Gujarat.',
  },
  '/distribution-network': {
    title: 'Distribution Network | Brovet Animal Healthcare',
    description: 'Brovet pan-India and export distribution presence for veterinary products.',
  },
  '/quality-assurance': {
    title: 'Quality Assurance | Brovet Animal Healthcare',
    description: 'Quality standards and assurance practices at Brovet Animal Healthcare.',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | Brovet Animal Healthcare',
    description: 'How Brovet Animal Healthcare collects and protects your information.',
  },
  '/terms-conditions': {
    title: 'Terms & Conditions | Brovet Animal Healthcare',
    description: 'Terms and conditions for using the Brovet Animal Healthcare website.',
  },
  '/admin': {
    title: 'Admin Login | Brovet',
    description: 'Secure admin access for Brovet portal.',
  },
  '/admin/login': {
    title: 'Admin Login | Brovet',
    description: 'Secure admin access for Brovet portal.',
  },
  '/admin/signup': {
    title: 'Admin Signup | Brovet',
    description: 'Create a Brovet staff admin account (demo).',
  },
  '/admin/dashboard': {
    title: 'Admin Dashboard | Brovet',
    description: 'Brovet admin workspace.',
  },
  '/login': {
    title: 'Login | Brovet Animal Healthcare',
    description: 'Sign in to your Brovet customer account.',
  },
  '/signup': {
    title: 'Sign Up | Brovet Animal Healthcare',
    description: 'Create a Brovet customer account for RFQs and dealer updates.',
  },
};

const setMetaDescription = (content) => {
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.name = 'description';
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', content);
};

const normalizeSeoPath = (pathname) => {
  if (pathname.startsWith('/product/')) return '/product';
  if (pathname.startsWith('/blog/')) return '/blog';
  return pathname || '/';
};

const SeoManager = () => {
  const location = useLocation();

  useEffect(() => {
    const route = normalizeSeoPath(location.pathname);
    const seoConfig = db.getSeo();
    const pageKey = SEO_KEY_BY_ROUTE[route];
    const currentSeo =
      (pageKey && seoConfig[pageKey]) ||
      FALLBACK_SEO[route] ||
      seoConfig.home ||
      FALLBACK_SEO['/'];

    document.title = currentSeo.title;
    setMetaDescription(currentSeo.description);
    window.scrollTo(0, 0);
  }, [location.pathname, location.search]);

  return null;
};

const PublicLayout = () => (
  <div className="flex flex-col min-h-screen bg-white">
    <SeoManager />
    <Navbar />
    <main className="flex-grow w-full">
      <Outlet />
    </main>
    <Footer />
  </div>
);

const AuthLayout = () => (
  <div className="min-h-screen bg-neutral-light">
    <SeoManager />
    <Outlet />
  </div>
);

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'products', element: <Products /> },
      { path: 'product/:id', element: <ProductDetails /> },
      { path: 'become-dealer', element: <BecomeDealer /> },
      { path: 'request-quotation', element: <RequestQuotation /> },
      { path: 'blogs', element: <Blogs /> },
      { path: 'blog/:id', element: <BlogDetails /> },
      { path: 'downloads', element: <Downloads /> },
      { path: 'gallery', element: <Gallery /> },
      { path: 'testimonials', element: <Testimonials /> },
      { path: 'faqs', element: <FAQs /> },
      { path: 'contact', element: <Contact /> },
      { path: 'why-choose-us', element: <WhyChooseUs /> },
      { path: 'infrastructure', element: <Infrastructure /> },
      { path: 'distribution-network', element: <DistributionNetwork /> },
      { path: 'quality-assurance', element: <QualityAssurance /> },
      { path: 'privacy-policy', element: <PrivacyPolicy /> },
      { path: 'terms-conditions', element: <TermsConditions /> },
      { path: '*', element: <NotFound /> },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <UserLogin /> },
      { path: 'signup', element: <UserSignup /> },
      { path: 'admin', element: <Navigate to="/admin/login" replace /> },
      { path: 'admin/login', element: <AdminLogin /> },
      { path: 'admin/signup', element: <AdminSignup /> },
      { path: 'admin/dashboard', element: <AdminLayout /> },
    ],
  },
]);

const App = () => (
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);

export default App;
