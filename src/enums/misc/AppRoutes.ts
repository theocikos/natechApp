import type { Href, Route, RouteSegments } from "expo-router";

import { ScreenNames } from "./ScreenNames";

type AppRoute = {
  name: ScreenNames;
  segments: RouteSegments<Route> | [];
  build: (...args: any[]) => Href;
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
    build: () => ({ pathname: "/" }),
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
    segments: ["(with-session)", "(tabs)", "(home)"],
    build: () => ({ pathname: "/(with-session)/(tabs)/(home)" }),
  },
  SETTINGS: {
    name: ScreenNames.SETTINGS,
    segments: ["(with-session)", "(tabs)", "settings"],
    build: () => ({ pathname: "/(with-session)/(tabs)/settings" }),
  },
  SEND_MONEY: {
    name: ScreenNames.SEND_MONEY,
    segments: ["(with-session)", "(tabs)", "(home)", "send-money"],
    build: () => ({ pathname: "/(with-session)/(tabs)/(home)/send-money" }),
  },
  REVIEW_TRANSACTION: {
    name: ScreenNames.REVIEW_TRANSACTION,
    segments: ["(with-session)", "(tabs)", "(home)", "review-transaction"],
    build: (transaction: {
      amount: string;
      recipient: string;
      recipientName: string;
      reference?: string;
    }) => ({
      pathname: "/(with-session)/(tabs)/(home)/review-transaction",
      params: transaction,
    }),
  },
  FEEDBACK: {
    name: ScreenNames.FEEDBACK,
    segments: ["(with-session)", "(tabs)", "(home)", "feedback"],
    build: (amount: string, state: "success" | "error") => ({
      pathname: "/(with-session)/(tabs)/(home)/feedback",
      params: { amount, state },
    }),
  },
} satisfies AppRoutesMap;
