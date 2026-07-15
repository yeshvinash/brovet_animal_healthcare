/**
 * Fades out and removes the #app-preloader element from index.html.
 */
export function dismissAppPreloader() {
  const el = document.getElementById('app-preloader');
  if (!el || el.dataset.dismissing === '1') return;

  el.dataset.dismissing = '1';
  el.classList.add('app-preloader--hide');

  const remove = () => {
    el.remove();
    document.documentElement.classList.remove('preload-active');
  };

  el.addEventListener('transitionend', remove, { once: true });
  // Fallback if transitionend doesn't fire
  window.setTimeout(remove, 500);
}
