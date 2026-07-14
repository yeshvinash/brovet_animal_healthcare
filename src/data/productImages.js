import brovitH1L from '../assets/images/products/Brovit-H-1liter-Multivitamin-liquid.jpg';
import brovitH250 from '../assets/images/products/Brovit-H-250-ml-Multivitamin-Liquid.jpg';
import brocalForte5L from '../assets/images/products/Brocal-Forte-5-liter-liquid-Calcium.jpg';
import broLiv5L from '../assets/images/products/Bro-Liv-5-liter-Liver-Tonic.jpg';
import chelatedSuperAdv from '../assets/images/products/Chelated-Super-Advance-1kg-Mineral-Mixture.jpg';
import magicalDs1L from '../assets/images/products/Chelated-Magical-DS-1-Liter-Chelated-liquid-calcium.jpg';
import magicalDs5L from '../assets/images/products/Chelated-Magical-Ds-5-liter-Chelated-liquid-calcium.jpg';
import magicalDs40L from '../assets/images/products/Chelated-Magical-Ds-40-liter-Chelated-liquid-calcium.jpg';
import enrolite1L from '../assets/images/products/Enrolite-1liter-Milk-Booster-Energy-Booster.jpg';
import packagingFallback from '../assets/images/products/Magical-gel-500-ml-Ionic-calcium.jpg';

/** Local catalog images keyed by product id (resolved at build time via Vite). */
export const PRODUCT_IMAGES = {
  'prod-brovit-h-1l': brovitH1L,
  'prod-brovit-h-250': brovitH250,
  'prod-brocal-forte-5l': brocalForte5L,
  'prod-broliv-500': broLiv5L, // stand-in until 500 ml pack shot is available
  'prod-chel-super-adv-1kg': chelatedSuperAdv,
  'prod-magical-ds-1l': magicalDs1L,
  'prod-magical-ds-5l': magicalDs5L,
  'prod-magical-ds-40l': magicalDs40L,
  'prod-enrolite-1l': enrolite1L,
  'prod-udder-treat-300': packagingFallback, // stand-in until dedicated asset is added
  'prod-ultra-clean-500': packagingFallback, // stand-in until dedicated asset is added
  'prod-broliv-5l': broLiv5L,
};

export const getProductImage = (product) => {
  if (!product) return packagingFallback;
  return PRODUCT_IMAGES[product.id] || product.image || packagingFallback;
};
