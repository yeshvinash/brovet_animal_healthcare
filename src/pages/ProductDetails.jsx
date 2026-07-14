import React, { useState, useEffect } from 'react';
import { useRouter } from '../context/RouterContext';
import { db } from '../utils/db';
import { Icons } from '../components/UI/Icons';
import ProductCard from '../components/ProductCard';
import { getProductImage } from '../data/productImages';
import {
  Breadcrumbs,
  Button,
  Modal,
  Input,
  Textarea,
  Alert,
  AccordionItem
} from '../components/UI/Shared';

const ProductDetails = () => {
  const { paramId, navigate } = useRouter();
  const [product, setProduct] = useState(null);
  
  // Modals & Submissions States
  const [rfqModalOpen, setRfqModalOpen] = useState(false);
  const [rfqSuccess, setRfqSuccess] = useState(false);
  const [inquirySuccess, setInquirySuccess] = useState(false);
  const [openFaqIdx, setOpenFaqIdx] = useState(null);

  // RFQ Form Fields
  const [rfqForm, setRfqForm] = useState({
    quantity: '100',
    businessName: '',
    contactPerson: '',
    phone: '',
    email: '',
    address: '',
    message: ''
  });

  // Inline Product Inquiry Form Fields
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  // Fetch product based on ID
  useEffect(() => {
    if (!paramId) {
      setProduct(null);
      return;
    }
    const prod = db.getProducts().find(p => p.id === paramId) || null;
    setProduct(prod);
    if (prod) {
      setInquiryForm(prev => ({
        ...prev,
        message: `I would like to inquire about bulk supply of ${prod.name}.`
      }));
    }
  }, [paramId]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-neutral-dark">Product Not Found</h2>
        <p className="text-neutral-muted mt-2">The product you are looking for does not exist.</p>
        <div className="mt-6">
          <Button variant="primary" onClick={() => navigate('/products')}>Back to Products</Button>
        </div>
      </div>
    );
  }

  const relatedProducts = db.getProducts()
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  // Handle RFQ Submit
  const handleRfqSubmit = (e) => {
    e.preventDefault();
    db.saveQuotation({
      productName: product.name,
      productId: product.id,
      ...rfqForm
    });
    setRfqSuccess(true);
    setTimeout(() => {
      setRfqSuccess(false);
      setRfqModalOpen(false);
      // Reset form
      setRfqForm({
        quantity: '100',
        businessName: '',
        contactPerson: '',
        phone: '',
        email: '',
        address: '',
        message: ''
      });
    }, 2500);
  };

  // Handle Inline Inquiry Submit
  const handleInquirySubmit = (e) => {
    e.preventDefault();
    db.saveMessage({
      type: "Product Inquiry",
      subject: `Inquiry: ${product.name}`,
      ...inquiryForm
    });
    setInquirySuccess(true);
    setTimeout(() => {
      setInquirySuccess(false);
      setInquiryForm({
        name: '',
        phone: '',
        email: '',
        message: `I would like to inquire about bulk supply of ${product.name}.`
      });
    }, 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={[
        { label: "Products", path: "/products" },
        { label: product.name }
      ]} />

      {/* Main product overview */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mt-4 sm:mt-6">
        
        {/* Left Side: Product Image & Actions */}
        <div className="lg:col-span-5 space-y-5">
          <div className="aspect-square bg-gradient-to-b from-neutral-light to-white border border-neutral-border rounded-2xl overflow-hidden shadow-premium flex items-center justify-center">
            <img 
              src={getProductImage(product)} 
              alt={product.name} 
              className="w-full h-full object-contain p-6 sm:p-10"
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button 
              variant="primary" 
              onClick={() => setRfqModalOpen(true)}
              className="w-full py-3"
              icon={<Icons.Send className="w-4 h-4" />}
            >
              Request Quotation
            </Button>
            
            <a 
              href="/downloads"
              className="inline-flex items-center justify-center font-semibold rounded-md border border-neutral-border text-neutral-dark hover:bg-neutral-light focus:outline-none focus:ring-2 focus:ring-primary w-full py-3 text-sm shadow-2xs"
            >
              <Icons.Download className="w-4 h-4 mr-2" /> Download Catalog
            </a>
          </div>
        </div>

        {/* Right Side: Primary Info */}
        <div className="lg:col-span-7 space-y-5">
          <div className="space-y-3">
            <span className="inline-flex px-2.5 py-1 text-xs font-semibold tracking-wide text-primary bg-primary-light rounded border border-primary/20 uppercase">
              {product.category}
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-dark tracking-tight leading-tight">
              {product.name}
            </h1>
            {product.price != null && (
              <div className="flex flex-wrap items-end gap-2">
                <span className="text-3xl font-extrabold text-primary">
                  ₹{Number(product.price).toLocaleString('en-IN')}
                </span>
                <span className="text-sm text-neutral-muted pb-1">per piece</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {product.minOrderQty && (
              <div className="rounded-xl border border-neutral-border bg-neutral-light/80 p-3">
                <span className="block text-2xs uppercase tracking-wider text-neutral-muted font-bold mb-1">MOQ</span>
                <span className="text-sm font-semibold text-neutral-dark">{product.minOrderQty}</span>
              </div>
            )}
            {product.deliveryTime && (
              <div className="rounded-xl border border-neutral-border bg-neutral-light/80 p-3">
                <span className="block text-2xs uppercase tracking-wider text-neutral-muted font-bold mb-1">Delivery</span>
                <span className="text-sm font-semibold text-neutral-dark">{product.deliveryTime}</span>
              </div>
            )}
            {product.packagingSizes && (
              <div className="rounded-xl border border-neutral-border bg-neutral-light/80 p-3">
                <span className="block text-2xs uppercase tracking-wider text-neutral-muted font-bold mb-1">Pack Size</span>
                <span className="text-sm font-semibold text-neutral-dark">{product.packagingSizes}</span>
              </div>
            )}
            {product.suitableAnimals && (
              <div className="rounded-xl border border-neutral-border bg-neutral-light/80 p-3">
                <span className="block text-2xs uppercase tracking-wider text-neutral-muted font-bold mb-1">Suitable For</span>
                <span className="text-sm font-semibold text-neutral-dark">{product.suitableAnimals}</span>
              </div>
            )}
          </div>

          <div className="border-t border-neutral-light pt-4">
            <h3 className="text-xs font-bold text-neutral-muted uppercase tracking-wider mb-2">Short Overview</h3>
            <p className="text-neutral-body text-sm leading-relaxed">{product.shortDescription}</p>
          </div>

          {(product.productFunction || product.efficacy) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {product.productFunction && (
                <div className="rounded-lg border border-primary/15 bg-primary-light/50 px-4 py-3">
                  <strong className="block text-2xs uppercase tracking-wider text-primary mb-1">Function</strong>
                  <span className="text-neutral-dark">{product.productFunction}</span>
                </div>
              )}
              {product.efficacy && (
                <div className="rounded-lg border border-accent/20 bg-accent-light/60 px-4 py-3">
                  <strong className="block text-2xs uppercase tracking-wider text-accent-hover mb-1">Efficacy</strong>
                  <span className="text-neutral-dark">{product.efficacy}</span>
                </div>
              )}
            </div>
          )}

          <div className="border-t border-neutral-light pt-4 space-y-2 text-sm">
            {product.packagingDetails && (
              <div><strong className="text-neutral-dark">Packaging Details:</strong> {product.packagingDetails}</div>
            )}
            {product.supplyAbility && (
              <div><strong className="text-neutral-dark">Supply Ability:</strong> {product.supplyAbility}</div>
            )}
            {product.domesticMarket && (
              <div><strong className="text-neutral-dark">Domestic Market:</strong> {product.domesticMarket}</div>
            )}
            {product.exportMarkets && (
              <div><strong className="text-neutral-dark">Export Markets:</strong> {product.exportMarkets}</div>
            )}
            {product.storageInstructions && (
              <div><strong className="text-neutral-dark">Storage:</strong> {product.storageInstructions}</div>
            )}
          </div>

          <div className="border-t border-neutral-light pt-4">
            <h3 className="text-xs font-bold text-neutral-muted uppercase tracking-wider mb-2">Key Ingredients</h3>
            <p className="text-neutral-body text-sm bg-neutral-light px-4 py-3 rounded-lg border leading-relaxed">
              {product.ingredients}
            </p>
          </div>

          <div className="border-t border-neutral-light pt-4">
            <h3 className="text-xs font-bold text-neutral-muted uppercase tracking-wider mb-3">Key Benefits & Features</h3>
            <ul className="space-y-2.5 text-sm">
              {product.benefits && product.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-2.5 leading-relaxed text-neutral-body">
                  <Icons.CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </section>

      {/* Detailed Technical Specifications & Usage */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-20 pt-10 border-t border-neutral-border">
        
        {/* Technical details (Specs & Dosage) */}
        <div className="lg:col-span-7 space-y-10">
          
          {/* Detailed Description */}
          <div className="space-y-3">
            <h2 className="text-xl font-extrabold text-neutral-dark border-b pb-2">Detailed Product Description</h2>
            <p className="text-neutral-body text-sm leading-relaxed whitespace-pre-line">{product.detailedDescription}</p>
          </div>

          {/* Specifications Table */}
          {product.specifications && product.specifications.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-xl font-extrabold text-neutral-dark border-b pb-2">Product Specifications</h2>
              <div className="border border-neutral-border rounded-lg overflow-hidden shadow-2xs">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-neutral-light text-neutral-dark border-b border-neutral-border font-bold">
                      <th className="px-4 py-3">Parameter / Nutrient</th>
                      <th className="px-4 py-3">Guaranteed Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-light bg-white text-neutral-body">
                    {product.specifications.map((spec, i) => (
                      <tr key={i} className="hover:bg-slate-50/50">
                        <td className="px-4 py-3 font-semibold text-neutral-dark">{spec.parameter}</td>
                        <td className="px-4 py-3">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Dosage & Usage */}
          <div className="space-y-4 bg-slate-50 border border-neutral-border p-6 rounded-xl">
            <h3 className="font-bold text-neutral-dark text-md flex items-center gap-2">
              <Icons.Layers className="w-5 h-5 text-primary" /> Dosage & Administration Directions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              <div>
                <strong className="block text-xs uppercase tracking-wider text-neutral-muted mb-1">Recommended Dosage:</strong>
                <p className="text-neutral-body">{product.dosage}</p>
              </div>
              <div>
                <strong className="block text-xs uppercase tracking-wider text-neutral-muted mb-1">Usage Instructions:</strong>
                <p className="text-neutral-body">{product.usage}</p>
              </div>
            </div>
          </div>

          {/* Product Specific FAQs */}
          {product.faqs && product.faqs.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-extrabold text-neutral-dark border-b pb-2">Frequently Asked Questions</h2>
              <div>
                {product.faqs.map((faq, idx) => (
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
            </div>
          )}

        </div>

        {/* Right Column: Inline Inquiry Form */}
        <div className="lg:col-span-5 bg-white border border-neutral-border rounded-2xl p-6 sm:p-8 shadow-premium lg:sticky lg:top-24">
          <h3 className="text-lg font-extrabold text-neutral-dark mb-1">B2B Product Inquiry</h3>
          <p className="text-xs text-neutral-muted mb-6 leading-relaxed">
            Interested in stocking or bulk purchasing this product? Submit your inquiry, and our team will respond with product sheets and pricing.
          </p>

          {inquirySuccess && (
            <Alert type="success" message="Inquiry submitted successfully! Our team will contact you." className="mb-6" />
          )}

          <form onSubmit={handleInquirySubmit} className="space-y-4">
            <Input 
              label="Full Name" 
              id="inquiry_name" 
              placeholder="Your Name" 
              value={inquiryForm.name}
              onChange={(e) => setInquiryForm(prev => ({ ...prev, name: e.target.value }))}
              required 
            />
            <div className="grid grid-cols-2 gap-4">
              <Input 
                label="Phone Number" 
                id="inquiry_phone" 
                type="tel"
                placeholder="Mobile" 
                value={inquiryForm.phone}
                onChange={(e) => setInquiryForm(prev => ({ ...prev, phone: e.target.value }))}
                required 
              />
              <Input 
                label="Email Address" 
                id="inquiry_email" 
                type="email"
                placeholder="Email" 
                value={inquiryForm.email}
                onChange={(e) => setInquiryForm(prev => ({ ...prev, email: e.target.value }))}
                required 
              />
            </div>
            <Textarea 
              label="Inquiry message" 
              id="inquiry_message" 
              value={inquiryForm.message}
              onChange={(e) => setInquiryForm(prev => ({ ...prev, message: e.target.value }))}
              required 
            />
            <Button variant="primary" type="submit" className="w-full py-2.5">
              Submit Inquiry
            </Button>
          </form>
        </div>

      </section>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="mt-20 pt-10 border-t border-neutral-border space-y-8">
          <h2 className="text-2xl font-extrabold text-neutral-dark text-center lg:text-left">Related Supplements</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* REQUEST QUOTATION MODAL */}
      <Modal 
        isOpen={rfqModalOpen} 
        onClose={() => setRfqModalOpen(false)} 
        title={`Request Quotation (RFQ) - ${product.name}`}
      >
        {rfqSuccess ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto text-emerald-600">
              <Icons.CheckCircle className="w-8 h-8" />
            </div>
            <h4 className="font-extrabold text-neutral-dark">RFQ Submitted Successfully</h4>
            <p className="text-xs text-neutral-muted">Your quotation request has been received. Our sales desk will email your B2B proposal.</p>
          </div>
        ) : (
          <form onSubmit={handleRfqSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input 
                label="Product Name" 
                id="rfq_product" 
                value={product.name} 
                disabled 
              />
              <Input 
                label="Target Quantity (B2B)" 
                id="rfq_qty" 
                type="number"
                placeholder="100" 
                value={rfqForm.quantity}
                onChange={(e) => setRfqForm(prev => ({ ...prev, quantity: e.target.value }))}
                required 
              />
            </div>
            <Input 
              label="Business/Company Name" 
              id="rfq_business" 
              placeholder="e.g. Anand Dairy Farm Cooperative" 
              value={rfqForm.businessName}
              onChange={(e) => setRfqForm(prev => ({ ...prev, businessName: e.target.value }))}
              required 
            />
            <div className="grid grid-cols-2 gap-4">
              <Input 
                label="Contact Person" 
                id="rfq_contact" 
                placeholder="Authorized Name" 
                value={rfqForm.contactPerson}
                onChange={(e) => setRfqForm(prev => ({ ...prev, contactPerson: e.target.value }))}
                required 
              />
              <Input 
                label="Mobile Number" 
                id="rfq_phone" 
                type="tel"
                placeholder="e.g. +91 99999 88888" 
                value={rfqForm.phone}
                onChange={(e) => setRfqForm(prev => ({ ...prev, phone: e.target.value }))}
                required 
              />
            </div>
            <Input 
              label="Email Address" 
              id="rfq_email" 
              type="email"
              placeholder="corporate@email.com" 
              value={rfqForm.email}
              onChange={(e) => setRfqForm(prev => ({ ...prev, email: e.target.value }))}
              required 
            />
            <Input 
              label="Full Delivery Address" 
              id="rfq_address" 
              placeholder="City, State, Zip Code" 
              value={rfqForm.address}
              onChange={(e) => setRfqForm(prev => ({ ...prev, address: e.target.value }))}
              required 
            />
            <Textarea 
              label="Any Customization/Batch Requirements" 
              id="rfq_message" 
              placeholder="Write specifications, packaging requirements, or questions..." 
              value={rfqForm.message}
              onChange={(e) => setRfqForm(prev => ({ ...prev, message: e.target.value }))}
            />
            
            <div className="pt-2 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setRfqModalOpen(false)}>Cancel</Button>
              <Button variant="primary" type="submit">Submit RFQ Request</Button>
            </div>
          </form>
        )}
      </Modal>

    </div>
  );
};

export default ProductDetails;
