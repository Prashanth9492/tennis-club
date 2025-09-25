import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLoading } from '@/contexts/LoadingContext';

export const usePageLoading = () => {
  const { setLoading } = useLoading();
  const location = useLocation();

  useEffect(() => {
    // Show loading when route changes
    setLoading(true);
    
    // Hide loading after a short delay to show the animation
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200); // 1.2 seconds loading time

    return () => {
      clearTimeout(timer);
    };
  }, [location.pathname, setLoading]);

  return useLoading();
};

export default usePageLoading;