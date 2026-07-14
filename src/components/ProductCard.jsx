import React from 'react';
import { Link } from 'react-router-dom';
import { Icons } from './UI/Icons';
import { getProductImage } from '../data/productImages';

const formatPrice = (price) => {
  if (price == null) return null;
  return `₹${Number(price).toLocaleString('en-IN')}`;
};

const ProductCard = ({ product }) => {
  const imageSrc = getProductImage(product);
  const priceLabel = formatPrice(product.price);
  const packLabel = product.packagingSizes?.split('(')[0]?.trim();
  const suitableFor = product.suitableAnimals?.split(',')[0]?.trim();

  return (
    <Link
      to={`/product/${product.id}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-neutral-border transition duration-300 hover:-translate-y-1 hover:ring-primary/30 hover:shadow-premium-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      <div className="relative isolate overflow-hidden bg-[radial-gradient(ellipse_at_50%_30%,var(--color-primary-light)_0%,#ffffff_68%)]">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgb(15 81 50 / 0.08) 1px, transparent 0)',
            backgroundSize: '18px 18px',
          }}
          aria-hidden="true"
        />
        <div className="relative aspect-[5/4] flex items-center justify-center p-5 sm:p-6">
          <img
            src={imageSrc}
            alt={product.name}
            className="max-h-full max-w-full object-contain drop-shadow-[0_12px_24px_rgba(15,81,50,0.12)] transition duration-500 ease-out group-hover:scale-[1.06] group-hover:-translate-y-1"
            loading="lazy"
          />
        </div>
        {packLabel && (
          <span className="absolute bottom-3 left-3 rounded-md bg-white/90 px-2 py-1 text-2xs font-bold uppercase tracking-wide text-primary ring-1 ring-primary/10 backdrop-blur-sm">
            {packLabel}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 border-t border-neutral-border/80 p-4 sm:p-5">
        <div className="space-y-1.5">
          <p className="text-2xs font-bold uppercase tracking-[0.14em] text-primary">
            {product.category}
          </p>
          <h3 className="text-[0.95rem] sm:text-base font-bold leading-snug text-neutral-dark transition-colors duration-150 group-hover:text-primary line-clamp-2">
            {product.name}
          </h3>
        </div>

        <p className="text-sm leading-relaxed text-neutral-muted line-clamp-2 flex-1">
          {product.shortDescription}
        </p>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-2xs font-semibold text-neutral-muted">
          {suitableFor && (
            <span className="inline-flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-secondary" aria-hidden="true" />
              For {suitableFor}
            </span>
          )}
          {product.minOrderQty && (
            <span className="inline-flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              MOQ {product.minOrderQty}
            </span>
          )}
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-neutral-light pt-3.5">
          <div className="min-w-0">
            {priceLabel ? (
              <>
                <p className="text-2xs font-semibold uppercase tracking-wider text-neutral-muted">
                  Price / piece
                </p>
                <p className="truncate text-xl font-extrabold tracking-tight text-primary-dark">
                  {priceLabel}
                </p>
              </>
            ) : (
              <p className="text-sm font-semibold text-neutral-muted">Request quote</p>
            )}
          </div>

          <span className="inline-flex h-10 shrink-0 items-center gap-1 rounded-full bg-primary px-3.5 text-xs font-bold text-white shadow-sm transition duration-200 group-hover:bg-primary-hover group-hover:shadow-md">
            Details
            <Icons.ChevronRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
