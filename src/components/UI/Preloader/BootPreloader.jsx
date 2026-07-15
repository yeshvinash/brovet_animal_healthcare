import { useEffect } from 'react';
import { dismissAppPreloader } from './dismissPreloader';

const MIN_VISIBLE_MS = 900;

/**
 * Hides the HTML splash once React (and AuthProvider) are ready,
 * respecting a short minimum display time to avoid flicker.
 */
const BootPreloader = () => {
  useEffect(() => {
    const started = window.__BROVET_PRELOAD_STARTED__ || Date.now();
    const remaining = Math.max(0, MIN_VISIBLE_MS - (Date.now() - started));
    const timer = window.setTimeout(dismissAppPreloader, remaining);
    return () => window.clearTimeout(timer);
  }, []);

  return null;
};

export default BootPreloader;
