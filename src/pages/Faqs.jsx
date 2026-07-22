import React, { useState } from 'react';
import { SimpleBreadcrumbs as Breadcrumbs } from '../components/UI/Breadcrumb';
import { AccordionItem } from '../components/UI/Accordion';
import { Icons } from '../components/UI/Icons';

const FAQs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openIdx, setOpenIdx] = useState(null);

  const faqItems = [
    {
      category: "Distributorship & Dealership",
      q: "What is the process to become a licensed dealer for Brovet?",
      a: "To register, submit the Dealer Registration Form with your GST registration details, drug license (if applicable), and current distribution area boundaries. Our sales development board reviews files within 2 business days. If approved, we execute a trade agreement outlining territorial boundaries and wholesale price files."
    },
    {
      category: "Distributorship & Dealership",
      q: "Do you offer district monopoly rights?",
      a: "Yes. For wholesale distributors committing to specific monthly purchase bounds, Brovet offers exclusive marketing and supply monopoly rights for their designated districts. No other dealers will be authorized in that territory."
    },
    {
      category: "Order & Shipping",
      q: "What is the Minimum Order Quantity (MOQ) for B2B orders?",
      a: "For domestic dealer dispatches in India, our standard minimum order value is ₹50,000, which can span custom mixes of liquid calcium bottles, mineral mixtures, and liver tonics. For international exports, MOQ starts at a 20-foot shipping container load."
    },
    {
      category: "Order & Shipping",
      q: "How long does shipping and batch delivery take?",
      a: "Domestic shipments from our Navsari, Gujarat warehouse typically reach western and northern states within 3-5 business days. International container dispatches depend on custom clearance parameters and port logistics, averaging 15-30 days."
    },
    {
      category: "Quality & Testing",
      q: "Do you provide Certificate of Analysis (COA) for product batches?",
      a: "Absolutely. Every dispatch invoice is accompanied by a Certificate of Analysis (COA) compiled by our Quality Assurance lab. We guarantee active mineral levels, vitamin shelf stability, and verify zero heavy metal contamination."
    },
    {
      category: "Quality & Testing",
      q: "Are Brovet products ISO and WHO-GMP certified?",
      a: "Yes, our manufacturing guidelines comply with WHO Good Manufacturing Practices (WHO-GMP). Our company holds active ISO 9001:2015 registration, ensuring process standardization across all liquid calcium and multivitamin formulation lines."
    },
    {
      category: "Samples & Catalogues",
      q: "Can B2B buyers request product testing samples?",
      a: "Yes. Licensed veterinary distributors, veterinary hospitals, or large dairy cooperatives can request sample bottles of key formulations like Chelated Magical-DS or Brocal-Forte by submitting a formal request via email (brovethealth@gmail.com) with company details."
    }
  ];

  const filteredFaqs = faqItems.filter(item => 
    item.q.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.a.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: "FAQs" }]} />

      {/* Header */}
      <div className="py-6 border-b border-neutral-border mb-10">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-dark">Frequently Asked Questions</h1>
        <p className="text-neutral-muted text-sm mt-1 leading-relaxed">
          Find answers to common questions about dealership bounds, shipping timelines, quality assurance, and bulk pricing.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative mb-10">
        <input
          type="text"
          placeholder="Search FAQs by keywords..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 text-sm text-neutral-dark bg-white border border-neutral-border rounded-xl shadow-premium focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <Icons.Search className="w-5 h-5 text-neutral-muted absolute left-3.5 top-3.5" />
      </div>

      {/* FAQ Accordion List */}
      {filteredFaqs.length > 0 ? (
        <div className="space-y-6">
          {/* Group FAQS by Category */}
          {["Distributorship & Dealership", "Order & Shipping", "Quality & Testing", "Samples & Catalogues"].map((cat, catIdx) => {
            const catFaqs = filteredFaqs.filter(f => f.category === cat);
            if (catFaqs.length === 0) return null;
            return (
              <div key={catIdx} className="space-y-3">
                <h3 className="text-xs font-bold text-primary uppercase tracking-widest border-l-4 border-primary pl-2.5 mb-4">
                  {cat}
                </h3>
                {catFaqs.map((faq, idx) => {
                  const globalIdx = `${catIdx}-${idx}`;
                  return (
                    <AccordionItem
                      key={idx}
                      title={faq.q}
                      isOpen={openIdx === globalIdx}
                      onToggle={() => setOpenIdx(openIdx === globalIdx ? null : globalIdx)}
                    >
                      {faq.a}
                    </AccordionItem>
                  );
                })}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 text-neutral-muted">
          No FAQs match your search term.
        </div>
      )}

    </div>
  );
};

export default FAQs;
