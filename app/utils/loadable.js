import React, { lazy, Suspense } from 'react';

const loadable = (importFunc, { fallback = null } = { fallback: null }) => {
  const LazyComponent = lazy(importFunc);

  // Suspense is not supported with server-side rendering yet. We will
  // just need to wait until the client takes over
  if (__SERVER__) {
    return () => <div />;
  }

  return props => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

export default loadable;
