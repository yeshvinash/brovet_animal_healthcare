import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { Icons } from '../components/UI/Icons';
import { db } from '../utils/db';
import ProductCard from '../components/ProductCard';
import { AccordionItem, Button } from '../components/UI/Shared';

const Home = () => {
  const { navigate } = useRouter();
  const categories = db.getCategories();
  const products = db.getProducts().slice(0, 4); // Show first 4 featured products
  const blogs = db.getBlogs().slice(0, 3); // Show first 3 blogs
  const testimonials = db.getTestimonials();
  const [openFaqIdx, setOpenFaqIdx] = useState(null);

  const stats = [
    { value: "2018", label: "Year Established", icon: <Icons.Calendar className="w-6 h-6 text-primary" /> },
    { value: "15+", label: "Product Formulations", icon: <Icons.Layers className="w-6 h-6 text-primary" /> },
    { value: "500+", label: "Dealers & Distributors", icon: <Icons.Building className="w-6 h-6 text-primary" /> },
    { value: "10,000+", label: "Farmers Served", icon: <Icons.User className="w-6 h-6 text-primary" /> },
  ];

  const strengths = [
    { title: "WHO-GMP Compliant", desc: "Our products are manufactured in compliance with international Good Manufacturing Practices.", icon: <Icons.ShieldCheck className="w-6 h-6 text-primary" /> },
    { title: "Chelated Minerals", desc: "Formulated with high-bioavailability glycinates for maximum digestion and absorption in ruminants.", icon: <Icons.Award className="w-6 h-6 text-primary" /> },
    { title: "Scientifically Backed", desc: "Every liquid, powder, and gel is formulated based on animal feed science and trials.", icon: <Icons.TrendingUp className="w-6 h-6 text-primary" /> },
    { title: "Secure B2B Supply Chain", desc: "Rigorous packaging quality (HDPE containers, moisture-free pouches) for export safety.", icon: <Icons.Building className="w-6 h-6 text-primary" /> }
  ];

  const homeFaqs = [
    { q: "Do you supply products directly to farmers?", a: "Brovet is a B2B manufacturer and exporter. We sell in bulk to veterinary distributors, wholesalers, feed store retailers, and large dairy cooperative farms. Individual farmers can purchase our items from their nearest Brovet licensed dealer." },
    { q: "Where is your head office located?", a: "Our head office is located in Navsari, Gujarat, India (Plot No.-3, Saurastra Patel Society, Gaurishanker Street, Jalalpore Road). You can visit or contact us via WhatsApp for regional agency inquiries." },
    { q: "What product lines do you specialize in?", a: "We specialize in Liquid Calcium (Chelated Magical-DS, Brocal-Forte), Liver Tonics (Bro-Liv), Mineral Mixtures (Chelated Super Advance), Multivitamins (Brovit-H), Energy Boosters (Enrolite), Uterine Tonics, and Mastitis care powder supplements." }
  ];

  return (
    <div className="space-y-20 pb-20">
      
      {/* 1. HERO BANNER */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary-dark via-primary to-primary-hover text-white py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
        {/* Soft grid decoration */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs text-xs font-semibold text-accent uppercase tracking-wider">
              <Icons.Award className="w-4 h-4" /> ISO 9001:2015 & GMP Certified
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Scientifically Formulated <span className="text-accent">Animal Healthcare</span> Products
            </h1>
            <p className="text-lg text-slate-200 max-w-2xl leading-relaxed">
              Accelerate livestock productivity, milk yield, and immunity. Brovet is a premier B2B manufacturer, trader, and exporter of veterinary feed supplements, calcium tonics, and mineral mixtures.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button variant="accent" onClick={() => navigate('/products')} className="px-6 py-3 text-base shadow-lg">
                Explore Products
              </Button>
              <Button variant="outline" onClick={() => navigate('/become-dealer')} className="border-white text-white hover:bg-white/10 px-6 py-3 text-base">
                Become a Dealer
              </Button>
            </div>
          </div>

          {/* Right Hero Image/Mockup */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-full max-w-md aspect-square bg-white/5 rounded-2xl border border-white/10 p-4 shadow-2xl backdrop-blur-xs">
              <img 
                src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=600" 
                alt="Healthy Dairy Cattle Livestock" 
                className="w-full h-full object-cover rounded-xl shadow-inner border border-white/5"
              />
              <div className="absolute -bottom-6 -left-6 bg-white text-neutral-dark p-4 rounded-xl shadow-lg border border-neutral-border flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-primary-light flex items-center justify-center">
                  <Icons.CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <span className="block font-bold text-sm leading-tight text-primary-dark">100% Safe & Tested</span>
                  <span className="block text-2xs text-neutral-muted">Approved feed ingredients</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. COMPANY STATISTICS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-2xl border border-neutral-border bg-neutral-light shadow-premium">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center space-y-2 border-r last:border-0 border-neutral-border/50">
              <div className="inline-flex justify-center p-2.5 rounded-lg bg-white shadow-2xs">
                {stat.icon}
              </div>
              <div className="text-3xl font-extrabold text-neutral-dark tracking-tight">{stat.value}</div>
              <div className="text-xs font-semibold text-neutral-muted uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. COMPANY INTRODUCTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="text-xs font-bold tracking-widest text-primary uppercase">About Brovet Animal Healthcare</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-dark leading-tight">
            Nurturing Livestock Health & Farm Prosperity Since 2018
          </h2>
          <p className="text-neutral-body text-md leading-relaxed">
            Headquartered in Navsari, Gujarat, Brovet Animal Healthcare is a leading B2B supplier, trader, and exporter. We specialize in distributing premium-quality liquid calcium supplements, veterinary tonics, and mineral powders that are highly recommended by veterinarians and dairy cooperatives.
          </p>
          <p className="text-neutral-body text-md leading-relaxed">
            Under the guidance of our Managing Director, <strong>Mr. Ketan Bavchandbhai Patoliya</strong>, we formulate safe, organic-equivalent feed additives that aid in animal digestion, improve fat/SNF percent in milk, bolster skeletal strength, and prevent diseases like mastitis and milk fever.
          </p>
          <div>
            <Button variant="primary" onClick={() => navigate('/about')}>Read Our Story</Button>
          </div>
        </div>

        <div className="bg-slate-50 border border-neutral-border rounded-2xl p-8 space-y-6 shadow-premium relative">
          <div className="absolute top-0 right-0 transform translate-x-3 -translate-y-3 w-16 h-16 text-primary/10 opacity-60">
            <svg fill="currentColor" viewBox="0 0 24 24" className="w-full h-full">
              <path d="M11.19 12.07c-.07-.37-.12-.76-.12-1.15 0-2.82 2.29-5.12 5.12-5.12 1.04 0 2.01.31 2.82.85l-1.39 2.08c-.41-.23-.89-.37-1.42-.37-.9 0-1.63.73-1.63 1.63 0 .19.03.38.1.56l-3.48 1.52zm-8 0c-.07-.37-.12-.76-.12-1.15 0-2.82 2.29-5.12 5.12-5.12 1.04 0 2.01.31 2.82.85l-1.39 2.08c-.41-.23-.89-.37-1.42-.37-.9 0-1.63.73-1.63 1.63 0 .19.03.38.1.56L3.19 12.07z" />
            </svg>
          </div>
          <p className="text-md italic text-neutral-dark font-medium leading-relaxed">
            "Our focus is not just creating animal healthcare products, but creating trust. We source high-grade trace minerals and herbs to ensure that dairy farmers secure better yields and healthier livestock."
          </p>
          <div className="flex items-center gap-3 pt-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
              KP
            </div>
            <div>
              <span className="block font-bold text-neutral-dark">Mr. Ketan Bavchandbhai Patoliya</span>
              <span className="block text-xs text-neutral-muted">Managing Director, Brovet</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRODUCT CATEGORIES */}
      <section className="bg-neutral-light border-y border-neutral-border py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="text-xs font-bold tracking-widest text-primary uppercase">Categories</div>
            <h2 className="text-3xl font-extrabold text-neutral-dark">Browse Our Specialty Formulations</h2>
            <p className="text-neutral-muted text-sm leading-relaxed">
              We manufacture a wide range of feed supplements targeted at specific livestock requirements, from milk boosting to udder health.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <div 
                key={cat.id} 
                className="bg-white rounded-xl border border-neutral-border p-6 shadow-premium hover:shadow-premium-hover transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
                onClick={() => navigate(`/products?category=${encodeURIComponent(cat.name)}`)}
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-primary-light flex items-center justify-center mb-4">
                    <Icons.Layers className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-dark mb-2">{cat.name}</h3>
                  <p className="text-xs text-neutral-muted leading-relaxed">
                    View our full range of {cat.name.toLowerCase()} products for livestock.
                  </p>
                </div>
                <div className="mt-4 text-xs font-bold text-primary inline-flex items-center gap-1">
                  View Catalog <Icons.ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FEATURED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
          <div className="space-y-3">
            <div className="text-xs font-bold tracking-widest text-primary uppercase">Product Portfolio</div>
            <h2 className="text-3xl font-extrabold text-neutral-dark">Featured Veterinary Products</h2>
          </div>
          <Button variant="outline" onClick={() => navigate('/products')}>View All Products</Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. WHY CHOOSE BROVET */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="text-xs font-bold tracking-widest text-primary uppercase">Why Choose Us</div>
          <h2 className="text-3xl font-extrabold text-neutral-dark">Setting Benchmarks in Animal Nutrition</h2>
          <p className="text-neutral-muted text-sm">
            We focus on maximum absorption and absolute chemical safety, helping B2B buyers supply products that keep dairy farmers profitable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {strengths.map((item, idx) => (
            <div key={idx} className="bg-white border border-neutral-border rounded-xl p-6 shadow-premium space-y-4">
              <div className="w-12 h-12 rounded-lg bg-primary-light flex items-center justify-center">
                {item.icon}
              </div>
              <h3 className="text-md font-bold text-neutral-dark">{item.title}</h3>
              <p className="text-sm text-neutral-body leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. INDUSTRIES SERVED */}
      <section className="bg-neutral-light border-y border-neutral-border py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          <h2 className="text-2xl font-extrabold text-neutral-dark text-center">Industries & Markets We Serve</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { title: "Dairy Farms & Cooperatives", desc: "Supplying bulk calcium drums and feed additives to increase herd fat and milk yield." },
              { title: "Veterinarians & Clinics", desc: "Providing clinical-grade calcium gels and multi-vitamin therapies for animal recovery." },
              { title: "B2B Dealers & Feed Stores", desc: "Supplying packaged retail sizes (1L, 5L, 1kg) with healthy commercial margins." },
              { title: "Global Export Buyers", desc: "Manufacturing customized formulation batches with complete chemical certificate documentation." }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-neutral-border shadow-2xs space-y-2">
                <h3 className="font-bold text-neutral-dark text-sm">{item.title}</h3>
                <p className="text-xs text-neutral-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. QUALITY ASSURANCE & INFRASTRUCTURE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600" 
            alt="Advanced Laboratory Quality Check" 
            className="w-full aspect-video object-cover rounded-xl shadow-premium border border-neutral-border"
          />
        </div>
        <div className="space-y-6">
          <div className="text-xs font-bold tracking-widest text-primary uppercase">Quality Assurance</div>
          <h2 className="text-3xl font-extrabold text-neutral-dark">Zero-Compromise Product Safety Checks</h2>
          <p className="text-neutral-body text-sm leading-relaxed">
            All our manufacturing batches undergo strict inspection inside our quality testing lab. We ensure heavy metals are well within safety boundaries and verify active mineral concentrations.
          </p>
          <ul className="space-y-3 text-sm font-semibold text-neutral-dark">
            <li className="flex items-center gap-2">
              <Icons.CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
              100% Food-grade HDPE container bottles to prevent leakages
            </li>
            <li className="flex items-center gap-2">
              <Icons.CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
              Double-sealed bags for powder mixture humidity protection
            </li>
            <li className="flex items-center gap-2">
              <Icons.CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
              Complete batch traceability records
            </li>
          </ul>
          <div>
            <Button variant="outline" onClick={() => navigate('/quality-assurance')}>Learn More About Quality</Button>
          </div>
        </div>
      </section>

      {/* 9. TESTIMONIALS */}
      <section className="bg-neutral-light border-y border-neutral-border py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="text-xs font-bold tracking-widest text-primary uppercase">Client Reviews</div>
            <h2 className="text-3xl font-extrabold text-neutral-dark">Feedback from the Dairy Ecosystem</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-white p-6 rounded-xl border border-neutral-border shadow-premium flex flex-col justify-between">
                <div>
                  <div className="flex gap-0.5 text-amber-500 mb-3.5">
                    {[...Array(t.rating)].map((_, i) => (
                      <Icons.Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-neutral-body italic leading-relaxed mb-6">
                    "{t.content}"
                  </p>
                </div>
                <div className="border-t border-neutral-light pt-4 flex justify-between items-end">
                  <div>
                    <h4 className="font-bold text-sm text-neutral-dark leading-tight">{t.name}</h4>
                    <span className="text-3xs text-neutral-muted font-bold tracking-wide uppercase">{t.role}</span>
                  </div>
                  <span className="px-2 py-0.5 text-3xs font-semibold text-primary bg-primary-light rounded uppercase">
                    {t.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. LATEST BLOGS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
          <div className="space-y-3">
            <div className="text-xs font-bold tracking-widest text-primary uppercase">Insights & Articles</div>
            <h2 className="text-3xl font-extrabold text-neutral-dark">Animal Husbandry Blog</h2>
          </div>
          <Button variant="outline" onClick={() => navigate('/blogs')}>View All Posts</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <article 
              key={blog.id} 
              className="bg-white rounded-xl border border-neutral-border overflow-hidden shadow-premium hover:shadow-premium-hover transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1 cursor-pointer"
              onClick={() => navigate(`/blog/${blog.id}`)}
            >
              <div className="aspect-video overflow-hidden border-b border-neutral-border bg-neutral-light">
                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <div className="text-3xs text-primary font-bold uppercase tracking-wider mb-2">{blog.category}</div>
                <h3 className="text-md font-bold text-neutral-dark mb-2.5 leading-snug line-clamp-2 hover:text-primary">
                  {blog.title}
                </h3>
                <p className="text-xs text-neutral-muted line-clamp-3 leading-relaxed mb-4">
                  {blog.summary}
                </p>
                <div className="text-3xs text-neutral-muted font-semibold mt-auto flex justify-between">
                  <span>By {blog.author.split('(')[0]}</span>
                  <span>{blog.date}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 11. FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <div className="text-xs font-bold tracking-widest text-primary uppercase">FAQs</div>
          <h2 className="text-3xl font-extrabold text-neutral-dark">Frequently Asked Questions</h2>
        </div>

        <div>
          {homeFaqs.map((faq, idx) => (
            <AccordionItem
              key={idx}
              title={faq.q}
              isOpen={openFaqIdx === idx}
              onToggle={() => setOpenFaqIdx(openFaqIdx === idx ? null : idx)}
            >
              {faq.a}
            </AccordionItem>
          ))}
        </div>
        <div className="text-center pt-2">
          <a href="/faqs" className="text-sm text-primary font-bold hover:underline">
            View All FAQs
          </a>
        </div>
      </section>

      {/* 12. CALL TO ACTION (RFQ) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden bg-primary rounded-2xl p-10 sm:p-16 text-center text-white shadow-2xl">
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:20px_20px]"></div>
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Expand Your Animal Care Product Portfolio</h2>
            <p className="text-md text-emerald-100 max-w-xl mx-auto leading-relaxed">
              Partner with Brovet Animal Healthcare. Apply for authorized dealerships, request custom pricing brochures, or request a bulk quotation today.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button variant="accent" onClick={() => navigate('/request-quotation')} className="px-6 py-3 font-bold text-base shadow-lg">
                Request Quotation
              </Button>
              <Button variant="outline" onClick={() => navigate('/become-dealer')} className="border-white text-white hover:bg-white/10 px-6 py-3 text-base font-bold">
                Become Distributor
              </Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
