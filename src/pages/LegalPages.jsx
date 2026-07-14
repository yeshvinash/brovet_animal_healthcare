import React from 'react';
import { useRouter } from '../context/RouterContext';
import { Breadcrumbs, Button } from '../components/UI/Shared';
import { Icons } from '../components/UI/Icons';
import LogoImg from '../assets/images/logo/brovet.png';

// ========================================================
// 1. PRIVACY POLICY
// ========================================================
export const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-8">
      <Breadcrumbs items={[{ label: "Privacy Policy" }]} />
      
      <div className="space-y-4">
        <h1 className="text-3xl font-extrabold text-neutral-dark">Privacy Policy</h1>
        <p className="text-xs text-neutral-muted">Effective Date: June 01, 2026</p>
      </div>

      <div className="max-w-none text-neutral-body text-sm space-y-6 leading-relaxed">
        <p>
          At Brovet Animal Healthcare, we respect your privacy. This policy outlines how we handle data collected on our corporate B2B website. We do not sell or trade user information with third-party marketing companies.
        </p>

        <h3 className="text-lg font-bold text-neutral-dark pt-2 border-b pb-1">1. Information We Collect</h3>
        <p>
          We collect business-related contact information that you submit voluntarily via our quotation forms, contact forms, or dealer application registrations:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Full name and corporate title</li>
          <li>Company name, GST registration credentials, and drug license details</li>
          <li>Email addresses, phone numbers, and physical warehouse delivery address</li>
        </ul>

        <h3 className="text-lg font-bold text-neutral-dark pt-2 border-b pb-1">2. How We Use Collected Data</h3>
        <p>
          The information collected is used solely to respond to B2B queries, compile wholesale quotation pricing sheets, and verify dealer franchise requests.
        </p>

        <h3 className="text-lg font-bold text-neutral-dark pt-2 border-b pb-1">3. Cookie Policy</h3>
        <p>
          Our website uses lightweight session cookies to maintain layout configurations. These cookies do not track personal identifying information.
        </p>
      </div>
    </div>
  );
};

// ========================================================
// 2. TERMS & CONDITIONS
// ========================================================
export const TermsConditions = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-8">
      <Breadcrumbs items={[{ label: "Terms & Conditions" }]} />
      
      <div className="space-y-4">
        <h1 className="text-3xl font-extrabold text-neutral-dark">Terms & Conditions</h1>
        <p className="text-xs text-neutral-muted">Last Updated: June 01, 2026</p>
      </div>

      <div className="max-w-none text-neutral-body text-sm space-y-6 leading-relaxed">
        <p>
          Welcome to Brovet Animal Healthcare. By browsing this B2B corporate portal, you agree to comply with our terms and conditions.
        </p>

        <h3 className="text-lg font-bold text-neutral-dark pt-2 border-b pb-1">1. Website Purpose</h3>
        <p>
          This is a corporate informational showcase and dealer portal. <strong>This is NOT an e-commerce website.</strong> Users cannot purchase veterinary feed products directly on this portal. All bulk transactions require formal trade invoices finalized by our corporate desk.
        </p>

        <h3 className="text-lg font-bold text-neutral-dark pt-2 border-b pb-1">2. Intellectual Property</h3>
        <p>
          All product names (Chelated Magical-DS, Brocal-Forte, Brovit-H, etc.), descriptions, specifications tables, laboratory charts, and brand logo graphics are the proprietary intellectual property of Brovet Animal Healthcare.
        </p>

        <h3 className="text-lg font-bold text-neutral-dark pt-2 border-b pb-1">3. Jurisdictions</h3>
        <p>
          All disputes or B2B trade arguments arising out of website usage are subject to the exclusive jurisdiction of the courts of Navsari, Gujarat, India.
        </p>
      </div>
    </div>
  );
};

// ========================================================
// 3. 404 NOT FOUND PAGE
// ========================================================
export const NotFound = () => {
  const { navigate } = useRouter();

  const shortcuts = [
    {
      label: 'Product Catalog',
      desc: 'Browse liquid calcium, tonics & minerals',
      path: '/products',
      icon: <Icons.Layers className="w-5 h-5 text-primary" />,
    },
    {
      label: 'Become a Dealer',
      desc: 'Join our B2B distribution network',
      path: '/become-dealer',
      icon: <Icons.Building className="w-5 h-5 text-primary" />,
    },
    {
      label: 'Contact Us',
      desc: 'Reach the Brovet Navsari office',
      path: '/contact',
      icon: <Icons.Mail className="w-5 h-5 text-primary" />,
    },
  ];

  return (
    <div className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% -10%, var(--color-primary-light) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 100% 100%, rgb(13 148 136 / 0.08) 0%, transparent 50%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden="true"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgb(15 81 50 / 0.07) 1px, transparent 0)',
          backgroundSize: '22px 22px',
        }}
      />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
        <img
          src={LogoImg}
          alt="Brovet Animal Healthcare"
          className="h-14 sm:h-16 w-auto mx-auto mb-8 object-contain"
        />

        <div className="inline-flex items-center gap-2 rounded-full bg-primary-light border border-primary/15 px-3 py-1.5 mb-6">
          <Icons.AlertCircle className="w-4 h-4 text-primary" />
          <span className="text-2xs font-bold uppercase tracking-[0.14em] text-primary">
            Error 404
          </span>
        </div>

        <p
          className="font-extrabold text-primary/15 select-none leading-none tracking-tighter"
          style={{ fontSize: 'clamp(5.5rem, 22vw, 9.5rem)' }}
          aria-hidden="true"
        >
          404
        </p>

        <div className="-mt-6 sm:-mt-10 space-y-3 mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-dark tracking-tight">
            This path wanders off the farm
          </h1>
          <p className="text-sm sm:text-base text-neutral-muted max-w-lg mx-auto leading-relaxed">
            The page you&apos;re looking for isn&apos;t in our veterinary catalog.
            It may have moved, or the link could be outdated.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 mb-12">
          <Button
            variant="primary"
            onClick={() => navigate('/')}
            className="px-6 py-3 font-bold"
            icon={<Icons.Building className="w-4 h-4" />}
          >
            Back to Home
          </Button>
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="px-6 py-3"
          >
            Go Back
          </Button>
        </div>

        <div className="text-left">
          <p className="text-2xs font-bold uppercase tracking-[0.14em] text-neutral-muted text-center mb-4">
            Helpful destinations
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {shortcuts.map((item) => (
              <button
                key={item.path}
                type="button"
                onClick={() => navigate(item.path)}
                className="group flex sm:flex-col items-start gap-3 sm:gap-4 rounded-2xl border border-neutral-border bg-white/90 p-4 sm:p-5 text-left shadow-2xs transition duration-200 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-premium focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-light ring-1 ring-primary/10 transition group-hover:bg-primary group-hover:text-white">
                  <span className="group-hover:[&_svg]:text-white transition-colors">
                    {item.icon}
                  </span>
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-bold text-neutral-dark group-hover:text-primary transition-colors">
                    {item.label}
                  </span>
                  <span className="block text-xs text-neutral-muted mt-0.5 leading-snug">
                    {item.desc}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
