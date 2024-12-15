import { useUserQuery } from '@/auth/user-query.ts';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/navigation-menu.tsx';
import { PropsWithChildren, ReactElement } from 'react';
import { Link, ToOptions } from '@tanstack/react-router';
import { buttonVariants } from '@/components/button.tsx';

function getActiveLinkStyles(isActive: boolean): string {
  if (isActive)
    return `${buttonVariants({
      variant: 'outline',
    })} font-bold`;

  return buttonVariants({ variant: 'ghost' });
}

function MainNavigationLink(props: PropsWithChildren<ToOptions>) {
  const { children, ...rest } = props;
  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link {...rest}>
          {({ isActive }) => (
            <span className={getActiveLinkStyles(isActive)}>{children}</span>
          )}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}

export function MainNavigation() {
  const { data: user } = useUserQuery();
  let navItems: ReactElement;

  if (user)
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
    <div className='flex'>
      <Link
        to='/'
        className={`${navigationMenuTriggerStyle()} mr-1`}
      >
        Monitor budżetu
      </Link>

      <NavigationMenu className='ml-auto'>
        <NavigationMenuList>{navItems}</NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
