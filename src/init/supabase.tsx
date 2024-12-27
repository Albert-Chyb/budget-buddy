import { createClient } from '@supabase/supabase-js';
import { createContext, PropsWithChildren, useContext } from 'react';
import { Database } from '@/database/types.ts';

const supabaseClient = createClient<Database>(
  import.meta.env.VITE_SUPABASE_PROJECT_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

const supabaseContext = createContext(supabaseClient);

export function useSupabase() {
  const supabase = useContext(supabaseContext);

  if (!supabase)
    throw new Error(
      'Supabase context can only be used inside a supabase provider',
    );

  return supabase;
}

export function ProvideSupabase({ children }: PropsWithChildren) {
  return (
    <supabaseContext.Provider value={supabaseClient}>
      {children}
    </supabaseContext.Provider>
  );
}
