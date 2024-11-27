import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { ProvideTanStackRouter } from '@/router/setup';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProvideTanStackRouter />
  </StrictMode>,
);
