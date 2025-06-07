import type { Href, Route, RouteSegments } from 'expo-router';

import { ScreenNames } from './ScreenNames';

type AppRoute = {
  name: ScreenNames;
  segments: RouteSegments<Route> | [];
  build: () => Href;
};

type AppRoutesMap = {
  [key in string]: AppRoute;
};

export const AppRoutes = {
  /* Root level */
  NOT_FOUND: {
    name: ScreenNames.NOT_FOUND,
    segments: ['+not-found'],
    build: () => '/+not-found',
  },
} satisfies AppRoutesMap;
