'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const DynamicComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Chargement...</p>,
  ssr: false
});

export default function DynamicComponentWrapper() {
  return (
    <Suspense fallback={<p>Chargement du composant lourd...</p>}>
      <DynamicComponent />
    </Suspense>
  );
}
