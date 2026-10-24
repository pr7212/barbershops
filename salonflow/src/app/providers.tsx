// Import React so we can build a wrapper component
import React from 'react';

// Define what props our Providers component can accept (children are the other components inside it)
interface ProvidersProps {
  children: React.ReactNode;
}

// This component wraps around your app to provide global tools, themes, or data context
export function Providers({ children }: ProvidersProps) {
  return (
    // For now, this acts as a clean wrapper container holding all child components (like App)
    <div className="min-h-screen bg-stone-50 text-stone-900 antialiased">
      {children}
    </div>
  );
}