import { useMemo } from 'react';
import { useNavigate, useLocation, useParams, useSearchParams } from 'react-router-dom';

/**
 * Compatibility hook over react-router-dom so existing pages can keep using useRouter().
 */
export const useRouter = () => {
  const navigateRr = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [searchParams] = useSearchParams();

  return useMemo(() => {
    const pathname = location.pathname || '/';
    const search = location.search || '';
    const currentPath = `${pathname}${search}`;

    let route = pathname;
    if (pathname.startsWith('/product/')) route = '/product';
    else if (pathname.startsWith('/blog/')) route = '/blog';

    const queryParams = {};
    searchParams.forEach((value, key) => {
      queryParams[key] = value;
    });

    const navigate = (path) => {
      if (!path) return;
      const next = path.startsWith('#') ? path.slice(1) : path;
      navigateRr(next.startsWith('/') ? next : `/${next}`);
      window.scrollTo(0, 0);
    };

    return {
      navigate,
      currentPath,
      route,
      paramId: params.id || null,
      queryParams,
      pathname,
      search,
    };
  }, [navigateRr, location.pathname, location.search, params.id, searchParams]);
};
