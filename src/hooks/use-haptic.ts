/**
 * Hook for haptic feedback on mobile devices
 * Provides tactile feedback for better mobile UX
 */

export const useHaptic = () => {
  const lightImpact = () => {
    // iOS haptic feedback
    if ('navigator' in window && 'vibrate' in navigator) {
      navigator.vibrate(10);
    }
    
    // Web Vibration API fallback
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(10);
    }
  };

  const mediumImpact = () => {
    if ('navigator' in window && 'vibrate' in navigator) {
      navigator.vibrate(20);
    }
    
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(20);
    }
  };

  const heavyImpact = () => {
    if ('navigator' in window && 'vibrate' in navigator) {
      navigator.vibrate([30, 10, 30]);
    }
    
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate([30, 10, 30]);
    }
  };

  const selectionChanged = () => {
    lightImpact();
  };

  const notificationFeedback = (type: 'success' | 'warning' | 'error' = 'success') => {
    switch (type) {
      case 'success':
        lightImpact();
        break;
      case 'warning':
        mediumImpact();
        break;
      case 'error':
        heavyImpact();
        break;
    }
  };

  return {
    lightImpact,
    mediumImpact,
    heavyImpact,
    selectionChanged,
    notificationFeedback,
  };
};
