import React from 'react';
import LogoImg from '../../assets/images/logo/brovet.png';
import { Icons } from '../UI/Icons';

const AuthShell = ({
  variant = 'user',
  title,
  subtitle,
  badge,
  children,
  footer,
  highlights = [],
}) => {
  const isAdmin = variant === 'admin';

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-neutral-light">
      {/* Brand panel */}
      <aside
        className={`relative hidden lg:flex flex-col justify-between overflow-hidden p-10 xl:p-14 text-white ${
          isAdmin
            ? 'bg-gradient-to-br from-neutral-dark via-primary-dark to-primary'
            : 'bg-gradient-to-br from-primary via-primary-dark to-secondary'
        }`}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-25"
          aria-hidden="true"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.22) 1px, transparent 0)',
            backgroundSize: '22px 22px',
          }}
        />
        <div
          className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-white/15 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute bottom-10 left-10 h-48 w-48 rounded-full bg-accent/25 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative z-10">
          <a
            href="/"
            className="inline-flex items-center gap-3 rounded-xl bg-white/15 px-3 py-2 backdrop-blur-sm ring-1 ring-white/25 transition hover:bg-white/20"
          >
            <img src={LogoImg} alt="Brovet" className="h-12 w-auto object-contain" />
          </a>
        </div>

        <div className="relative z-10 space-y-6 max-w-md fade-in">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-2xs font-bold uppercase tracking-[0.16em] text-white ring-1 ring-white/30">
            {isAdmin ? (
              <Icons.Lock className="w-3.5 h-3.5 text-amber-200" />
            ) : (
              <Icons.ShieldCheck className="w-3.5 h-3.5 text-emerald-200" />
            )}
            {badge || (isAdmin ? 'Admin Portal' : 'Customer Portal')}
          </span>
          <h1 className="text-3xl xl:text-4xl font-extrabold leading-tight tracking-tight text-white">
            {isAdmin
              ? 'Secure operations for Brovet Animal Healthcare'
              : 'Welcome to Brovet Animal Healthcare'}
          </h1>
          <p className="text-sm text-white/90 leading-relaxed">
            {isAdmin
              ? 'Manage products, inquiries, and catalog settings from a dedicated workspace built for Brovet staff.'
              : 'Sign in to track quotations, dealer applications, and stay connected with our B2B veterinary catalog.'}
          </p>

          <ul className="space-y-3 pt-2">
            {(highlights.length
              ? highlights
              : isAdmin
                ? [
                    'Product & catalog management',
                    'Dealer / RFQ inbox access',
                    'Site & SEO controls',
                  ]
                : [
                    'Faster RFQ follow-ups',
                    'Dealer application tracking',
                    'Trusted veterinary formulations',
                  ]
            ).map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm font-medium text-white">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20 ring-1 ring-white/25">
                  <Icons.Check className="w-3.5 h-3.5 text-emerald-200" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative z-10 text-xs text-white/80 leading-relaxed">
          Demo authentication is client-side only — replace with a secure backend for production.
        </p>
      </aside>

      {/* Form panel */}
      <section className="relative flex min-h-screen items-center justify-center px-4 py-10 sm:px-8 pb-[max(2.5rem,env(safe-area-inset-bottom))]">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse 70% 45% at 50% 0%, var(--color-primary-light) 0%, transparent 60%)',
          }}
        />

        <div className="relative w-full max-w-md fade-in">
          <div className="mb-6 lg:hidden text-center">
            <a href="/" className="inline-block">
              <img src={LogoImg} alt="Brovet" className="h-14 w-auto mx-auto object-contain" />
            </a>
          </div>

          <div className="space-y-6 rounded-2xl border border-neutral-border bg-white p-6 shadow-premium sm:p-8">
            <div className="space-y-2 text-center sm:text-left">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-2xs font-bold uppercase tracking-wider ${
                  isAdmin
                    ? 'bg-neutral-dark text-white'
                    : 'border border-primary/20 bg-primary-light text-primary'
                }`}
              >
                {isAdmin ? <Icons.Lock className="w-3 h-3" /> : <Icons.User className="w-3 h-3" />}
                {badge || (isAdmin ? 'Staff access' : 'Account access')}
              </span>
              <h2 className="text-2xl font-extrabold tracking-tight text-neutral-dark">{title}</h2>
              {subtitle && (
                <p className="text-sm leading-relaxed text-neutral-body">{subtitle}</p>
              )}
            </div>

            {children}
          </div>

          {footer && (
            <div className="mt-5 text-center text-sm font-medium text-neutral-body">
              {footer}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AuthShell;
