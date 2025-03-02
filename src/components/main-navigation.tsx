import { useUserQuery } from '@/auth/user-query.ts';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/navigation-menu.tsx';
import { Link, ToOptions } from '@tanstack/react-router';
import { PropsWithChildren, ReactElement } from 'react';
import { buttonVariants } from './button';

function getLinkStyles(isActive: boolean): string {
  if (isActive) return buttonVariants({ variant: 'outline' });

  return buttonVariants({ variant: 'ghost' });
}

function MainNavigationLink(props: PropsWithChildren<ToOptions>) {
  const { children, ...rest } = props;
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link {...rest}>
          {({ isActive }) => (
            <div className={`${getLinkStyles(isActive)} w-full`}>
              {children}
            </div>
          )}
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

interface AuthNavigationMenuProps {
  isLoggedIn: boolean;
}
const AuthNavigationMenu = ({ isLoggedIn }: AuthNavigationMenuProps) => {
  let navItems: ReactElement;
  if (isLoggedIn)
    navItems = (
      <>
        <MainNavigationLink to='/change-password'>
          Zmień hasło
        </MainNavigationLink>
        <MainNavigationLink to='/sign-out'>Wyloguj się</MainNavigationLink>
      </>
    );
  else
    navItems = (
      <>
        <MainNavigationLink to='/sign-in'>Zaloguj się</MainNavigationLink>
        <MainNavigationLink to='/sign-up'>Załóż konto</MainNavigationLink>
        <MainNavigationLink to='/reset-password'>
          Zresetuj hasło
        </MainNavigationLink>
      </>
    );

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>Konto</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className='p-2 space-y-2'>{navItems}</ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

const DataManagementNavigationMenu = () => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>Dane</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className='p-2 space-y-2'>
          <MainNavigationLink to='/categories'>Kategorie</MainNavigationLink>
          <MainNavigationLink to='/wallets'>Portfele</MainNavigationLink>
          <MainNavigationLink to='/transactions'>Transakcje</MainNavigationLink>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export function MainNavigation() {
  const { data: user } = useUserQuery();

  return (
    <div className='flex'>
      <Link
        to='/'
        className={`${navigationMenuTriggerStyle()} mr-1`}
      >
        Monitor budżetu
      </Link>

      <NavigationMenu className='ml-auto'>
        <NavigationMenuList>
          <AuthNavigationMenu isLoggedIn={!!user} />
          <DataManagementNavigationMenu />
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
