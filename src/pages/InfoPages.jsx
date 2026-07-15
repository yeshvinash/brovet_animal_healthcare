import React from 'react';
import { SimpleBreadcrumbs as Breadcrumbs } from '../components/UI/Breadcrumb';
import { Icons } from '../components/UI/Icons';

// ========================================================
// 1. WHY CHOOSE US PAGE
// ========================================================
export const WhyChooseUs = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-16">
      <Breadcrumbs items={[{ label: "Why Choose Us" }]} />

      <section className="text-center max-w-3xl mx-auto space-y-4">
        <div className="text-xs font-bold tracking-widest text-primary uppercase">Core Competencies</div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-dark">Why B2B Buyers Trust Brovet</h1>
        <p className="text-neutral-muted text-sm leading-relaxed">
          From scientific feed formulations to strict batch logistics, here is what makes us a premier animal healthcare partner.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: "Advanced Glycinate Chelates",
            desc: "Unlike standard sulfate-mineral mixtures that decay in the rumen, our products use trace minerals bound to amino acids. This increases absorption by up to 300%, showing rapid animal recovery.",
            icon: <Icons.Award className="w-8 h-8 text-primary" />
          },
          {
            title: "Galactagogue Herbal Enrichment",
            desc: "Our liquid calcium supplements are fortified with organic extracts of Shatavari and Jivanti. These native herbs stimulate natural mammary glands, increasing milk yield and fat SNF safely.",
            icon: <Icons.ShieldCheck className="w-8 h-8 text-primary" />
          },
          {
            title: "Premium B2B Supply Protection",
            desc: "We supply products in heavy-grade HDPE container drums and multi-layer moisture pouches. This preserves nutritional integrity during shipping, ensuring longer shelf life for distributors.",
            icon: <Icons.Building className="w-8 h-8 text-primary" />
          }
        ].map((item, idx) => (
          <div key={idx} className="bg-white border p-8 rounded-xl shadow-premium space-y-4">
            <div className="w-14 h-14 rounded-lg bg-primary-light flex items-center justify-center">
              {item.icon}
            </div>
            <h3 className="text-lg font-bold text-neutral-dark">{item.title}</h3>
            <p className="text-sm text-neutral-body leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </section>

      <section className="bg-neutral-light border rounded-2xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-4">
          <h3 className="text-2xl font-extrabold text-neutral-dark">Veterinarian & Farmer Approved</h3>
          <p className="text-neutral-body text-sm leading-relaxed">
            Our products undergo testing on partnered dairy farms in Navsari and Anand before commercial launch. This direct feedback loop ensures that formulations like Enrolite or Udder Treat are highly effective and palatable to cattle, sheep, and goats.
          </p>
        </div>
        <div className="aspect-video bg-neutral-border rounded-xl overflow-hidden shadow-premium">
          <img 
            src="https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&q=80&w=600" 
            alt="Cows feeding on pasture" 
            className="w-full h-full object-cover"
          />
        </div>
      </section>
    </div>
  );
};

// ========================================================
// 2. OUR INFRASTRUCTURE PAGE
// ========================================================
export const Infrastructure = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-16">
      <Breadcrumbs items={[{ label: "Our Infrastructure" }]} />

      <section className="text-center max-w-3xl mx-auto space-y-4">
        <div className="text-xs font-bold tracking-widest text-primary uppercase">Manufacturing Facilities</div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-dark">Advanced Production Infrastructure</h1>
        <p className="text-neutral-muted text-sm leading-relaxed">
          Our unit in Navsari, Gujarat, combines automated formulation machinery with warehouse safety modules.
        </p>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-6">
          <h2 className="text-2xl font-extrabold text-neutral-dark">Navsari Formulation Plant</h2>
          <p className="text-neutral-body text-sm leading-relaxed">
            Our facility utilizes heavy-duty automated mixers, precise powder batching equipment, and liquid filling machines. Every step—from raw mineral loading to bottle sealing—is carried out under dust-free, sanitary guidelines to ensure zero contamination.
          </p>
          <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-neutral-dark">
            <div className="p-4 bg-neutral-light border rounded-lg flex items-center gap-2">
              <Icons.Layers className="w-5 h-5 text-primary" /> Automated Liquid Filling
            </div>
            <div className="p-4 bg-neutral-light border rounded-lg flex items-center gap-2">
              <Icons.ShieldCheck className="w-5 h-5 text-primary" /> Heavy Powder Blenders
            </div>
          </div>
        </div>
        <div className="lg:col-span-6">
          <img 
            src="https://images.unsplash.com/photo-1596733430284-f7437764b1a9?auto=format&fit=crop&q=80&w=600" 
            alt="Advanced Manufacturing Machine" 
            className="w-full aspect-video object-cover rounded-xl border shadow-premium"
          />
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8 border-t border-neutral-light">
        <div className="lg:col-span-6 order-last lg:order-first">
          <img 
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600" 
            alt="Storage Warehouse shelves" 
            className="w-full aspect-video object-cover rounded-xl border shadow-premium"
          />
        </div>
        <div className="lg:col-span-6 space-y-6">
          <h2 className="text-2xl font-extrabold text-neutral-dark">Spacious Raw Material Warehouse</h2>
          <p className="text-neutral-body text-sm leading-relaxed">
            We maintain a climate-controlled 5,000+ sq.ft. warehouse. This allows us to stockpile critical minerals and botanical ingredients safely away from moisture, maintaining ready inventory to support bulk export agreements.
          </p>
        </div>
      </section>
    </div>
  );
};

// ========================================================
// 3. DISTRIBUTION NETWORK PAGE
// ========================================================
export const DistributionNetwork = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-16">
      <Breadcrumbs items={[{ label: "Distribution Network" }]} />

      <section className="text-center max-w-3xl mx-auto space-y-4">
        <div className="text-xs font-bold tracking-widest text-primary uppercase">Logistics & Coverage</div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-dark">B2B Distribution Network</h1>
        <p className="text-neutral-muted text-sm leading-relaxed">
          Serving over 500+ licensed dealers and major animal hubs throughout India and export channels.
        </p>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-2xl font-extrabold text-neutral-dark">Pan-India Trade Channels</h2>
          <p className="text-neutral-body text-sm leading-relaxed">
            From our headquarters in Navsari, Gujarat, our logistical channels extend throughout Gujarat, Maharashtra, Madhya Pradesh, Rajasthan, Uttar Pradesh, and Haryana. We coordinate dispatches via national road transport fleets to ensure prompt delivery.
          </p>
          <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-neutral-dark">
            <div className="p-4 bg-slate-50 border rounded-lg">
              <span className="block text-lg font-bold text-primary mb-0.5">Gujarat</span>
              <span className="text-neutral-muted text-2xs uppercase">Primary Hub</span>
            </div>
            <div className="p-4 bg-slate-50 border rounded-lg">
              <span className="block text-lg font-bold text-primary mb-0.5">National</span>
              <span className="text-neutral-muted text-2xs uppercase">Road transport connectivity</span>
            </div>
          </div>
        </div>

        <div className="bg-primary p-8 rounded-2xl text-white shadow-premium relative">
          <h3 className="text-xl font-bold mb-4 text-white">Global Export Capabilities</h3>
          <p className="text-sm text-emerald-100 leading-relaxed mb-6">
            We actively export veterinary supplements and minerals to trade buyers in South Asia, East Africa, and neighboring GCC regions. All shipping consignments are packaged securely in cargo drums with full certificate paperwork.
          </p>
          <div className="border-t border-emerald-500 pt-4 flex justify-between items-center text-xs">
            <span><strong>Departure Port:</strong> Nhava Sheva (JNPT) / Mundra</span>
            <Icons.Globe className="w-5 h-5 text-accent" />
          </div>
        </div>
      </section>
    </div>
  );
};

// ========================================================
// 4. QUALITY ASSURANCE PAGE
// ========================================================
export const QualityAssurance = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-16">
      <Breadcrumbs items={[{ label: "Quality Assurance" }]} />

      <section className="text-center max-w-3xl mx-auto space-y-4">
        <div className="text-xs font-bold tracking-widest text-primary uppercase">Lab Testing Standards</div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-dark">Quality Assurance Policy</h1>
        <p className="text-neutral-muted text-sm leading-relaxed">
          Strict monitoring from raw material sorting to final container seals, ensuring maximum chemical safety.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          {
            title: "Analytical Testing",
            desc: "Our quality lab verifies the concentration of trace elements (Zinc, Copper, Manganese) and active vitamins (D3, B12, H) in every production batch.",
            icon: <Icons.ShieldCheck className="w-6 h-6 text-primary" />
          },
          {
            title: "Contaminant Scans",
            desc: "We screen mineral mixtures for heavy metal concentrations (like lead and arsenic) and test herbs for biological residues to guarantee safe products.",
            icon: <Icons.AlertCircle className="w-6 h-6 text-primary" />
          },
          {
            title: "WHO-GMP Certification",
            desc: "Our manufacturing facility operates under the guidelines of WHO Good Manufacturing Practices, maintaining batch isolation logs.",
            icon: <Icons.Award className="w-6 h-6 text-primary" />
          },
          {
            title: "Biotin Hoof Integrity",
            desc: "For formulations containing biotin and Vitamin H (like Brocal-Forte), we test the raw biotin stability to guarantee optimal structural hoof repair.",
            icon: <Icons.Layers className="w-6 h-6 text-primary" />
          }
        ].map((item, idx) => (
          <div key={idx} className="bg-white border p-6 rounded-xl shadow-premium flex gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary-light flex items-center justify-center flex-shrink-0">
              {item.icon}
            </div>
            <div className="space-y-1.5">
              <h3 className="font-bold text-neutral-dark text-md">{item.title}</h3>
              <p className="text-xs text-neutral-body leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
