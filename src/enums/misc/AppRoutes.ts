import type { Href, Route, RouteSegments } from "expo-router";

import { ScreenNames } from "./ScreenNames";

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
    segments: ["+not-found"],
    build: () => "/+not-found",
  },
  INDEX: {
    name: ScreenNames.INDEX,
    segments: [],
    build: () => ({ pathname: '/' }),
  },
  /* (without-session) */
  WELCOME: {
    name: ScreenNames.WELCOME,
    segments: ["welcome"],
    build: () => ({ pathname: "/(without-session)/welcome" }),
  },
  SIGNIN: {
    name: ScreenNames.SIGNIN,
    segments: ["signIn"],
    build: () => ({ pathname: "/(without-session)/signIn" }),
  },

  /** (with-session) */
  HOME: {
    name: ScreenNames.HOME,
    segments: ['(with-session)', '(tabs)', '(home)'],
    build: () => ({ pathname: "/(with-session)/(tabs)/(home)" }),
  },
  SETTINGS: {
    name: ScreenNames.SETTINGS,
    segments: ['(with-session)', '(tabs)', 'settings'],
    build: () => ({ pathname: "/(with-session)/(tabs)/settings" }),
  },
  SEND_MONEY: {
    name: ScreenNames.SEND_MONEY,
    segments: ['(with-session)', '(tabs)', '(home)', 'send-money'],
    build: () => ({ pathname: "/(with-session)/(tabs)/(home)/send-money" }),
  },
} satisfies AppRoutesMap;
