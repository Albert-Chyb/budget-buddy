import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { ProvideTanStackRouter } from '@/init/router.tsx';
import { ProvideTanStackQuery } from '@/init/tanstack-query.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProvideTanStackQuery>
      <ProvideTanStackRouter />
    </ProvideTanStackQuery>
  </StrictMode>,
);
