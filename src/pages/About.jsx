import React, { useState } from 'react';
import { db } from '../utils/db';
import { Icons } from '../components/UI/Icons';
import { SimpleBreadcrumbs as Breadcrumbs } from '../components/UI/Breadcrumb';
import KetanProfile from '../assets/images/cover/ketan_profile.png';

const About = () => {
  const [settings] = useState(db.getSettings());

  const values = [
    { title: 'Scientific Integrity', desc: 'Every supplement is scientifically researched to ensure active trace element absorption.', icon: <Icons.Award className="w-5 h-5 text-primary" /> },
    { title: 'Zero Contamination', desc: 'Strict hygiene protocols in our warehouse and formulation packaging lines.', icon: <Icons.ShieldCheck className="w-5 h-5 text-primary" /> },
    { title: 'B2B Transparency', desc: 'Honoring distributor margins, dispatch timelines, and providing batch analysis reports.', icon: <Icons.Building className="w-5 h-5 text-primary" /> },
    { title: 'Farmers Prosperity', desc: "Products are engineered to raise dairy farmers' milk yields, increasing their income.", icon: <Icons.TrendingUp className="w-5 h-5 text-primary" /> }
  ];

  const timeline = [
    { year: '2018', title: 'Foundation', desc: 'Brovet Animal Healthcare established in Navsari, Gujarat, starting with liquid calcium supplements.' },
    { year: '2020', title: 'Product Expansion', desc: 'Launched Chelated Super Advance mineral mixtures and Brovit-H multivitamins, capturing 100+ dealers.' },
    { year: '2022', title: 'Infrastructure Upgrade', desc: 'Set up advanced automated batching mixers and specialized lab testing facilities.' },
    { year: '2024', title: 'Export Initiative', desc: 'Began trading and exporting veterinary products to global trade hubs in South Asia and Africa.' },
    { year: '2026', title: 'Digital Integration', desc: 'Serving over 500+ active distributors with real-time digital catalog and RFQ tracking.' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 space-y-14 sm:space-y-20">

      <Breadcrumbs items={[{ label: 'About Us' }]} />

      {/* Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-7 space-y-5 sm:space-y-6 order-2 lg:order-1">
          <div className="text-xs font-bold tracking-widest text-primary uppercase">Who We Are</div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-dark tracking-tight leading-tight">
            Leading B2B Supplier & Exporter of Veterinary Nutrition in India
          </h1>
          <p className="text-neutral-body text-sm sm:text-base leading-relaxed">
            Established in {settings.established || '2018'}, <strong>Brovet Animal Healthcare</strong> is a professional animal supplement brand based in Navsari, Gujarat. We manufacture and distribute high-absorption liquid calcium, liver stimulants, veterinary multi-vitamins, and specialized supplements supporting cattle health and milk productivity.
          </p>
          <p className="text-neutral-body text-sm sm:text-base leading-relaxed">
            Our company sources pure minerals and raw materials to formulate supplements that boost digestion, skeletal strength, conception rates, and keep farm livestock highly productive — serving dealers across India and export markets in Asia and Africa.
          </p>
        </div>
        <div className="lg:col-span-5 order-1 lg:order-2">
          <div className="relative rounded-2xl overflow-hidden border border-neutral-border shadow-premium bg-gradient-to-br from-primary-light via-white to-neutral-light aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] max-w-md mx-auto lg:max-w-none">
            <img
              src={KetanProfile}
              alt={`${settings.managingDirector} — Managing Director, Brovet Animal Healthcare`}
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-neutral-dark/80 via-neutral-dark/40 to-transparent p-5 sm:p-6">
              <p className=" font-bold text-sm sm:text-base">{settings.managingDirector}</p>
              <p className=" text-xs font-semibold uppercase tracking-wider mt-0.5">Managing Director</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
        <div className="bg-primary-light border border-primary/20 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white">
            <Icons.Award className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-primary-dark">Our Mission</h3>
          <p className="text-neutral-body text-sm leading-relaxed">
            To provide safe, scientifically formulated, and highly bioavailable animal healthcare products that elevate livestock productivity, protect animal welfare, and boost farming income.
          </p>
        </div>

        <div className="bg-slate-50 border border-neutral-border rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="w-10 h-10 rounded-lg bg-neutral-dark flex items-center justify-center text-white">
            <Icons.TrendingUp className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-neutral-dark">Our Vision</h3>
          <p className="text-neutral-body text-sm leading-relaxed">
            To become a trusted global benchmark in B2B veterinary healthcare, expanding our export footprint while remaining deeply committed to regional dairy farm wellness.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="space-y-6 sm:space-y-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-dark text-center">Our Core Corporate Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {values.map((v, i) => (
            <div key={i} className="border border-neutral-border p-5 sm:p-6 rounded-xl bg-white shadow-2xs space-y-3 h-full">
              <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center">
                {v.icon}
              </div>
              <h4 className="font-bold text-neutral-dark text-sm">{v.title}</h4>
              <p className="text-xs text-neutral-muted leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MD Message */}
      <section className="bg-neutral-light border border-neutral-border rounded-2xl p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center shadow-premium">
        <div className="lg:col-span-4 flex flex-col items-center text-center space-y-4">
          <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-white shadow-premium ring-2 ring-primary/20">
            <img
              src={KetanProfile}
              alt={settings.managingDirector}
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div>
            <h3 className="font-extrabold text-neutral-dark text-lg">{settings.managingDirector}</h3>
            <span className="block text-xs text-primary font-semibold uppercase tracking-wider mt-1">Managing Director</span>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-4 lg:border-l border-neutral-border lg:pl-8 pt-2 lg:pt-0">
          <h3 className="text-xl font-bold text-neutral-dark">Message from the Managing Director</h3>
          <p className="text-neutral-body text-sm leading-relaxed italic">
            &ldquo;Since launching Brovet in 2018, our journey has been defined by a deep-rooted commitment to veterinary science. We saw that standard animal feeds in India lacked critical trace elements, leading to lameness, low conception rates, and high mastitis occurrences in cattle.&rdquo;
          </p>
          <p className="text-neutral-body text-sm leading-relaxed">
            &ldquo;By focusing on organic chelates and botanical formulations, we designed product lines that work. Today, as we scale our B2B distributor network and exports across Asia and Africa, we continue to hold the highest benchmarks of quality and transparency. We look forward to welcoming new dealers to our growing family.&rdquo;
          </p>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
        <div className="space-y-5 sm:space-y-6">
          <div className="text-xs font-bold tracking-widest text-primary uppercase">Manufacturing Excellence</div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-dark leading-tight">State-Of-The-Art Navsari Infrastructure</h2>
          <p className="text-neutral-body text-sm leading-relaxed">
            Our infrastructure features automated batch processing, chemical testing labs, and high-capacity warehousing. Our facility maintains strict sanitation guidelines to prevent cross-contamination of mineral mixtures and tonics.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold text-neutral-dark">
            <div className="p-3 bg-neutral-light border rounded-lg flex items-center gap-2">
              <Icons.Building className="w-5 h-5 text-primary flex-shrink-0" />
              Automated Batch Mixers
            </div>
            <div className="p-3 bg-neutral-light border rounded-lg flex items-center gap-2">
              <Icons.ShieldCheck className="w-5 h-5 text-primary flex-shrink-0" />
              Analytical Testing Lab
            </div>
            <div className="p-3 bg-neutral-light border rounded-lg flex items-center gap-2">
              <Icons.Layers className="w-5 h-5 text-primary flex-shrink-0" />
              Heavy HDPE Packaging
            </div>
            <div className="p-3 bg-neutral-light border rounded-lg flex items-center gap-2">
              <Icons.Clock className="w-5 h-5 text-primary flex-shrink-0" />
              5000+ Sq.Ft. Warehouse
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-neutral-border overflow-hidden shadow-premium bg-white p-4 sm:p-6">
          <img
            src={KetanProfile}
            alt="Brovet leadership — commitment to quality manufacturing"
            className="w-full aspect-[4/3] object-cover object-top rounded-xl"
          />
          <p className="mt-4 text-xs text-neutral-muted text-center leading-relaxed">
            Led from Navsari, Gujarat — building trusted veterinary nutrition for Indian and export markets.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="space-y-8 sm:space-y-12">
        <div className="text-center space-y-3">
          <div className="text-xs font-bold tracking-widest text-primary uppercase">Our Journey</div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-dark">Business Growth Timeline</h2>
        </div>

        <div className="relative border-l-2 border-primary-light max-w-4xl mx-auto pl-6 sm:pl-8 space-y-8 sm:space-y-10 py-2">
          {timeline.map((item, idx) => (
            <div key={idx} className="relative">
              <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 w-6 h-6 rounded-full bg-primary border-4 border-white flex items-center justify-center shadow-md">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>

              <div className="bg-white border border-neutral-border p-5 sm:p-6 rounded-xl shadow-2xs hover:shadow-premium transition-shadow duration-200">
                <span className="inline-block px-2.5 py-0.5 text-xs font-bold text-primary bg-primary-light rounded mb-2">
                  {item.year}
                </span>
                <h4 className="font-bold text-neutral-dark text-base mb-1">{item.title}</h4>
                <p className="text-sm text-neutral-body leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default About;
