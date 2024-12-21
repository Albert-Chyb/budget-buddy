import { MainNavigation } from '@/components/main-navigation.tsx';

export function Banner() {
  return (
    <header className='h-[var(--banner-height)] border-b flex items-center backdrop-blur fixed top-0 inset-x-0 z-[2]'>
      <div className='container mx-auto px-[var(--global-layout-space)]'>
        <MainNavigation />
      </div>
    </header>
  );
}
