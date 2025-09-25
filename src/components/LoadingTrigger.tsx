import React from 'react';
import { useLoading } from '@/contexts/LoadingContext';

interface LoadingTriggerProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const LoadingTrigger: React.FC<LoadingTriggerProps> = ({ 
  children, 
  onClick, 
  className 
}) => {
  const { showLoading, hideLoading } = useLoading();

  const handleClick = async () => {
    showLoading();
    
    // Execute the original onClick if provided
    if (onClick) {
      await onClick();
    }
    
    // Hide loading after a short delay
    setTimeout(() => {
      hideLoading();
    }, 1000);
  };

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};

export default LoadingTrigger;