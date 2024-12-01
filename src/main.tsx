import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { ProvideTanStackRouter } from '@/init/router.tsx';
import { ProvideTanStackQuery } from '@/init/tanstack-query.tsx';
import { ProvideSupabase } from '@/init/supabase.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProvideSupabase>
      <ProvideTanStackQuery>
        <ProvideTanStackRouter />
      </ProvideTanStackQuery>
    </ProvideSupabase>
  </StrictMode>,
);
