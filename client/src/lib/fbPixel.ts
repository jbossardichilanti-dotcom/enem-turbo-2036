declare global {
  interface Window {
    fbq: (action: string, event: string, params?: Record<string, any>) => void;
  }
}

export const trackEvent = (event: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', event, params);
  }
};

export const trackInitiateCheckout = () => {
  trackEvent('InitiateCheckout', {
    content_name: 'ENEM Turbo 2025',
    content_category: 'Education',
    currency: 'BRL'
  });
};

export const trackPurchase = (value: number = 97) => {
  trackEvent('Purchase', {
    value: value,
    currency: 'BRL',
    content_name: 'ENEM Turbo 2025',
    content_type: 'product'
  });
};

export const trackViewContent = () => {
  trackEvent('ViewContent', {
    content_name: 'ENEM Turbo 2025 - Landing Page',
    content_category: 'Education'
  });
};
