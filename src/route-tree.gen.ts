/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as UnauthenticatedImport } from './routes/_unauthenticated'
import { Route as AuthenticatedImport } from './routes/_authenticated'
import { Route as AuthenticatedIndexImport } from './routes/_authenticated/index'
import { Route as UnauthenticatedSignUpImport } from './routes/_unauthenticated/sign-up'
import { Route as UnauthenticatedSignInImport } from './routes/_unauthenticated/sign-in'
import { Route as UnauthenticatedResetPasswordImport } from './routes/_unauthenticated/reset-password'
import { Route as AuthenticatedSignOutImport } from './routes/_authenticated/sign-out'
import { Route as AuthenticatedChangePasswordImport } from './routes/_authenticated/change-password'
import { Route as AuthenticatedDataManagementImport } from './routes/_authenticated/_data-management'
import { Route as UnauthenticatedResetPasswordOtpDialogImport } from './routes/_unauthenticated/reset-password.otp-dialog'
import { Route as AuthenticatedDataManagementWalletsImport } from './routes/_authenticated/_data-management/wallets'
import { Route as AuthenticatedDataManagementTransactionsImport } from './routes/_authenticated/_data-management/transactions'
import { Route as AuthenticatedDataManagementCategoriesImport } from './routes/_authenticated/_data-management/categories'

// Create/Update Routes

const UnauthenticatedRoute = UnauthenticatedImport.update({
  id: '/_unauthenticated',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedRoute = AuthenticatedImport.update({
  id: '/_authenticated',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedIndexRoute = AuthenticatedIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const UnauthenticatedSignUpRoute = UnauthenticatedSignUpImport.update({
  id: '/sign-up',
  path: '/sign-up',
  getParentRoute: () => UnauthenticatedRoute,
} as any)

const UnauthenticatedSignInRoute = UnauthenticatedSignInImport.update({
  id: '/sign-in',
  path: '/sign-in',
  getParentRoute: () => UnauthenticatedRoute,
} as any)

const UnauthenticatedResetPasswordRoute =
  UnauthenticatedResetPasswordImport.update({
    id: '/reset-password',
    path: '/reset-password',
    getParentRoute: () => UnauthenticatedRoute,
  } as any)

const AuthenticatedSignOutRoute = AuthenticatedSignOutImport.update({
  id: '/sign-out',
  path: '/sign-out',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedChangePasswordRoute =
  AuthenticatedChangePasswordImport.update({
    id: '/change-password',
    path: '/change-password',
    getParentRoute: () => AuthenticatedRoute,
  } as any)

const AuthenticatedDataManagementRoute =
  AuthenticatedDataManagementImport.update({
    id: '/_data-management',
    getParentRoute: () => AuthenticatedRoute,
  } as any)

const UnauthenticatedResetPasswordOtpDialogRoute =
  UnauthenticatedResetPasswordOtpDialogImport.update({
    id: '/otp-dialog',
    path: '/otp-dialog',
    getParentRoute: () => UnauthenticatedResetPasswordRoute,
  } as any)

const AuthenticatedDataManagementWalletsRoute =
  AuthenticatedDataManagementWalletsImport.update({
    id: '/wallets',
    path: '/wallets',
    getParentRoute: () => AuthenticatedDataManagementRoute,
  } as any)

const AuthenticatedDataManagementTransactionsRoute =
  AuthenticatedDataManagementTransactionsImport.update({
    id: '/transactions',
    path: '/transactions',
    getParentRoute: () => AuthenticatedDataManagementRoute,
  } as any)

const AuthenticatedDataManagementCategoriesRoute =
  AuthenticatedDataManagementCategoriesImport.update({
    id: '/categories',
    path: '/categories',
    getParentRoute: () => AuthenticatedDataManagementRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_authenticated': {
      id: '/_authenticated'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthenticatedImport
      parentRoute: typeof rootRoute
    }
    '/_unauthenticated': {
      id: '/_unauthenticated'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof UnauthenticatedImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated/_data-management': {
      id: '/_authenticated/_data-management'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthenticatedDataManagementImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/change-password': {
      id: '/_authenticated/change-password'
      path: '/change-password'
      fullPath: '/change-password'
      preLoaderRoute: typeof AuthenticatedChangePasswordImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/sign-out': {
      id: '/_authenticated/sign-out'
      path: '/sign-out'
      fullPath: '/sign-out'
      preLoaderRoute: typeof AuthenticatedSignOutImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_unauthenticated/reset-password': {
      id: '/_unauthenticated/reset-password'
      path: '/reset-password'
      fullPath: '/reset-password'
      preLoaderRoute: typeof UnauthenticatedResetPasswordImport
      parentRoute: typeof UnauthenticatedImport
    }
    '/_unauthenticated/sign-in': {
      id: '/_unauthenticated/sign-in'
      path: '/sign-in'
      fullPath: '/sign-in'
      preLoaderRoute: typeof UnauthenticatedSignInImport
      parentRoute: typeof UnauthenticatedImport
    }
    '/_unauthenticated/sign-up': {
      id: '/_unauthenticated/sign-up'
      path: '/sign-up'
      fullPath: '/sign-up'
      preLoaderRoute: typeof UnauthenticatedSignUpImport
      parentRoute: typeof UnauthenticatedImport
    }
    '/_authenticated/': {
      id: '/_authenticated/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof AuthenticatedIndexImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/_data-management/categories': {
      id: '/_authenticated/_data-management/categories'
      path: '/categories'
      fullPath: '/categories'
      preLoaderRoute: typeof AuthenticatedDataManagementCategoriesImport
      parentRoute: typeof AuthenticatedDataManagementImport
    }
    '/_authenticated/_data-management/transactions': {
      id: '/_authenticated/_data-management/transactions'
      path: '/transactions'
      fullPath: '/transactions'
      preLoaderRoute: typeof AuthenticatedDataManagementTransactionsImport
      parentRoute: typeof AuthenticatedDataManagementImport
    }
    '/_authenticated/_data-management/wallets': {
      id: '/_authenticated/_data-management/wallets'
      path: '/wallets'
      fullPath: '/wallets'
      preLoaderRoute: typeof AuthenticatedDataManagementWalletsImport
      parentRoute: typeof AuthenticatedDataManagementImport
    }
    '/_unauthenticated/reset-password/otp-dialog': {
      id: '/_unauthenticated/reset-password/otp-dialog'
      path: '/otp-dialog'
      fullPath: '/reset-password/otp-dialog'
      preLoaderRoute: typeof UnauthenticatedResetPasswordOtpDialogImport
      parentRoute: typeof UnauthenticatedResetPasswordImport
    }
  }
}

// Create and export the route tree

interface AuthenticatedDataManagementRouteChildren {
  AuthenticatedDataManagementCategoriesRoute: typeof AuthenticatedDataManagementCategoriesRoute
  AuthenticatedDataManagementTransactionsRoute: typeof AuthenticatedDataManagementTransactionsRoute
  AuthenticatedDataManagementWalletsRoute: typeof AuthenticatedDataManagementWalletsRoute
}

const AuthenticatedDataManagementRouteChildren: AuthenticatedDataManagementRouteChildren =
  {
    AuthenticatedDataManagementCategoriesRoute:
      AuthenticatedDataManagementCategoriesRoute,
    AuthenticatedDataManagementTransactionsRoute:
      AuthenticatedDataManagementTransactionsRoute,
    AuthenticatedDataManagementWalletsRoute:
      AuthenticatedDataManagementWalletsRoute,
  }

const AuthenticatedDataManagementRouteWithChildren =
  AuthenticatedDataManagementRoute._addFileChildren(
    AuthenticatedDataManagementRouteChildren,
  )

interface AuthenticatedRouteChildren {
  AuthenticatedDataManagementRoute: typeof AuthenticatedDataManagementRouteWithChildren
  AuthenticatedChangePasswordRoute: typeof AuthenticatedChangePasswordRoute
  AuthenticatedSignOutRoute: typeof AuthenticatedSignOutRoute
  AuthenticatedIndexRoute: typeof AuthenticatedIndexRoute
}

const AuthenticatedRouteChildren: AuthenticatedRouteChildren = {
  AuthenticatedDataManagementRoute:
    AuthenticatedDataManagementRouteWithChildren,
  AuthenticatedChangePasswordRoute: AuthenticatedChangePasswordRoute,
  AuthenticatedSignOutRoute: AuthenticatedSignOutRoute,
  AuthenticatedIndexRoute: AuthenticatedIndexRoute,
}

const AuthenticatedRouteWithChildren = AuthenticatedRoute._addFileChildren(
  AuthenticatedRouteChildren,
)

interface UnauthenticatedResetPasswordRouteChildren {
  UnauthenticatedResetPasswordOtpDialogRoute: typeof UnauthenticatedResetPasswordOtpDialogRoute
}

const UnauthenticatedResetPasswordRouteChildren: UnauthenticatedResetPasswordRouteChildren =
  {
    UnauthenticatedResetPasswordOtpDialogRoute:
      UnauthenticatedResetPasswordOtpDialogRoute,
  }

const UnauthenticatedResetPasswordRouteWithChildren =
  UnauthenticatedResetPasswordRoute._addFileChildren(
    UnauthenticatedResetPasswordRouteChildren,
  )

interface UnauthenticatedRouteChildren {
  UnauthenticatedResetPasswordRoute: typeof UnauthenticatedResetPasswordRouteWithChildren
  UnauthenticatedSignInRoute: typeof UnauthenticatedSignInRoute
  UnauthenticatedSignUpRoute: typeof UnauthenticatedSignUpRoute
}

const UnauthenticatedRouteChildren: UnauthenticatedRouteChildren = {
  UnauthenticatedResetPasswordRoute:
    UnauthenticatedResetPasswordRouteWithChildren,
  UnauthenticatedSignInRoute: UnauthenticatedSignInRoute,
  UnauthenticatedSignUpRoute: UnauthenticatedSignUpRoute,
}

const UnauthenticatedRouteWithChildren = UnauthenticatedRoute._addFileChildren(
  UnauthenticatedRouteChildren,
)

export interface FileRoutesByFullPath {
  '': typeof AuthenticatedDataManagementRouteWithChildren
  '/change-password': typeof AuthenticatedChangePasswordRoute
  '/sign-out': typeof AuthenticatedSignOutRoute
  '/reset-password': typeof UnauthenticatedResetPasswordRouteWithChildren
  '/sign-in': typeof UnauthenticatedSignInRoute
  '/sign-up': typeof UnauthenticatedSignUpRoute
  '/': typeof AuthenticatedIndexRoute
  '/categories': typeof AuthenticatedDataManagementCategoriesRoute
  '/transactions': typeof AuthenticatedDataManagementTransactionsRoute
  '/wallets': typeof AuthenticatedDataManagementWalletsRoute
  '/reset-password/otp-dialog': typeof UnauthenticatedResetPasswordOtpDialogRoute
}

export interface FileRoutesByTo {
  '': typeof AuthenticatedDataManagementRouteWithChildren
  '/change-password': typeof AuthenticatedChangePasswordRoute
  '/sign-out': typeof AuthenticatedSignOutRoute
  '/reset-password': typeof UnauthenticatedResetPasswordRouteWithChildren
  '/sign-in': typeof UnauthenticatedSignInRoute
  '/sign-up': typeof UnauthenticatedSignUpRoute
  '/': typeof AuthenticatedIndexRoute
  '/categories': typeof AuthenticatedDataManagementCategoriesRoute
  '/transactions': typeof AuthenticatedDataManagementTransactionsRoute
  '/wallets': typeof AuthenticatedDataManagementWalletsRoute
  '/reset-password/otp-dialog': typeof UnauthenticatedResetPasswordOtpDialogRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_authenticated': typeof AuthenticatedRouteWithChildren
  '/_unauthenticated': typeof UnauthenticatedRouteWithChildren
  '/_authenticated/_data-management': typeof AuthenticatedDataManagementRouteWithChildren
  '/_authenticated/change-password': typeof AuthenticatedChangePasswordRoute
  '/_authenticated/sign-out': typeof AuthenticatedSignOutRoute
  '/_unauthenticated/reset-password': typeof UnauthenticatedResetPasswordRouteWithChildren
  '/_unauthenticated/sign-in': typeof UnauthenticatedSignInRoute
  '/_unauthenticated/sign-up': typeof UnauthenticatedSignUpRoute
  '/_authenticated/': typeof AuthenticatedIndexRoute
  '/_authenticated/_data-management/categories': typeof AuthenticatedDataManagementCategoriesRoute
  '/_authenticated/_data-management/transactions': typeof AuthenticatedDataManagementTransactionsRoute
  '/_authenticated/_data-management/wallets': typeof AuthenticatedDataManagementWalletsRoute
  '/_unauthenticated/reset-password/otp-dialog': typeof UnauthenticatedResetPasswordOtpDialogRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/change-password'
    | '/sign-out'
    | '/reset-password'
    | '/sign-in'
    | '/sign-up'
    | '/'
    | '/categories'
    | '/transactions'
    | '/wallets'
    | '/reset-password/otp-dialog'
  fileRoutesByTo: FileRoutesByTo
  to:
    | ''
    | '/change-password'
    | '/sign-out'
    | '/reset-password'
    | '/sign-in'
    | '/sign-up'
    | '/'
    | '/categories'
    | '/transactions'
    | '/wallets'
    | '/reset-password/otp-dialog'
  id:
    | '__root__'
    | '/_authenticated'
    | '/_unauthenticated'
    | '/_authenticated/_data-management'
    | '/_authenticated/change-password'
    | '/_authenticated/sign-out'
    | '/_unauthenticated/reset-password'
    | '/_unauthenticated/sign-in'
    | '/_unauthenticated/sign-up'
    | '/_authenticated/'
    | '/_authenticated/_data-management/categories'
    | '/_authenticated/_data-management/transactions'
    | '/_authenticated/_data-management/wallets'
    | '/_unauthenticated/reset-password/otp-dialog'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  AuthenticatedRoute: typeof AuthenticatedRouteWithChildren
  UnauthenticatedRoute: typeof UnauthenticatedRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  AuthenticatedRoute: AuthenticatedRouteWithChildren,
  UnauthenticatedRoute: UnauthenticatedRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_authenticated",
        "/_unauthenticated"
      ]
    },
    "/_authenticated": {
      "filePath": "_authenticated.tsx",
      "children": [
        "/_authenticated/_data-management",
        "/_authenticated/change-password",
        "/_authenticated/sign-out",
        "/_authenticated/"
      ]
    },
    "/_unauthenticated": {
      "filePath": "_unauthenticated.tsx",
      "children": [
        "/_unauthenticated/reset-password",
        "/_unauthenticated/sign-in",
        "/_unauthenticated/sign-up"
      ]
    },
    "/_authenticated/_data-management": {
      "filePath": "_authenticated/_data-management.tsx",
      "parent": "/_authenticated",
      "children": [
        "/_authenticated/_data-management/categories",
        "/_authenticated/_data-management/transactions",
        "/_authenticated/_data-management/wallets"
      ]
    },
    "/_authenticated/change-password": {
      "filePath": "_authenticated/change-password.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/sign-out": {
      "filePath": "_authenticated/sign-out.tsx",
      "parent": "/_authenticated"
    },
    "/_unauthenticated/reset-password": {
      "filePath": "_unauthenticated/reset-password.tsx",
      "parent": "/_unauthenticated",
      "children": [
        "/_unauthenticated/reset-password/otp-dialog"
      ]
    },
    "/_unauthenticated/sign-in": {
      "filePath": "_unauthenticated/sign-in.tsx",
      "parent": "/_unauthenticated"
    },
    "/_unauthenticated/sign-up": {
      "filePath": "_unauthenticated/sign-up.tsx",
      "parent": "/_unauthenticated"
    },
    "/_authenticated/": {
      "filePath": "_authenticated/index.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/_data-management/categories": {
      "filePath": "_authenticated/_data-management/categories.tsx",
      "parent": "/_authenticated/_data-management"
    },
    "/_authenticated/_data-management/transactions": {
      "filePath": "_authenticated/_data-management/transactions.tsx",
      "parent": "/_authenticated/_data-management"
    },
    "/_authenticated/_data-management/wallets": {
      "filePath": "_authenticated/_data-management/wallets.tsx",
      "parent": "/_authenticated/_data-management"
    },
    "/_unauthenticated/reset-password/otp-dialog": {
      "filePath": "_unauthenticated/reset-password.otp-dialog.tsx",
      "parent": "/_unauthenticated/reset-password"
    }
  }
}
ROUTE_MANIFEST_END */
