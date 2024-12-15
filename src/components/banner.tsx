import { MainNavigation } from '@/components/main-navigation.tsx';

export function Banner() {
  return (
    <header className='h-14 md:h-16 border-b flex items-center backdrop-blur fixed top-0 inset-x-0'>
      <div className='container mx-auto px-2'>
        <MainNavigation />
      </div>
    </header>
  );
}
