# Tennis Loading Animation

## Overview
I've added an attractive tennis-themed loading animation that automatically displays during page transitions. The animation features:

### 🎾 Animation Elements
- **Bouncing Tennis Ball** - Yellow tennis ball with realistic curved lines
- **Tennis Court** - Green court surface with center line
- **Spinning Tennis Racket** - Detailed SVG racket with strings
- **Floating Trophy** - Gold trophy with smooth floating animation
- **Progress Bar** - Animated loading bar with tennis green colors
- **Loading Dots** - Pulsing dots with staggered animation timing

### 🚀 Features
- **Automatic Page Transitions** - Shows automatically when navigating between pages
- **Tennis Club Branding** - Displays "Bhimavaram Tennis Club" during loading
- **Responsive Design** - Works perfectly on mobile and desktop
- **Dark Mode Support** - Adapts colors for dark theme
- **Smooth Animations** - Professional CSS animations with proper timing

### 📁 Files Created
1. `src/components/TennisLoadingAnimation.tsx` - Main loading animation component
2. `src/contexts/LoadingContext.tsx` - Context for managing loading state
3. `src/hooks/usePageLoading.tsx` - Hook for automatic page loading
4. `src/components/LoadingTrigger.tsx` - Component for manual loading triggers

### 🔧 Usage

#### Automatic (Already Implemented)
The loading animation automatically shows for 1.2 seconds when users navigate between pages.

#### Manual Trigger
You can manually show the loading animation:

```tsx
import { useLoading } from '@/contexts/LoadingContext';

const MyComponent = () => {
  const { showLoading, hideLoading } = useLoading();
  
  const handleAction = async () => {
    showLoading();
    // Perform your action
    await someAsyncOperation();
    hideLoading();
  };
  
  return <button onClick={handleAction}>Do Something</button>;
};
```

#### Using LoadingTrigger Component
```tsx
import LoadingTrigger from '@/components/LoadingTrigger';

<LoadingTrigger onClick={myFunction} className="my-button">
  Click me to show loading
</LoadingTrigger>
```

### 🎨 Customization
You can modify the animation timing in:
- `usePageLoading.tsx` - Change the duration (currently 1.2 seconds)
- `TennisLoadingAnimation.tsx` - Modify colors, animations, or add new elements

The animation perfectly matches your Bhimavaram Tennis Club theme with tennis green colors and professional styling!