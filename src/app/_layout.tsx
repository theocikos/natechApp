import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

import { SessionProvider } from "@/nucleus";

export default function RootLayout() {
  return (
    <SessionProvider>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="(with-session)"
          options={{
            animation: "none",
          }}
        />
        <Stack.Screen
          name="(without-session)"
          options={{
            animation: "none",
          }}
        />
      </Stack>
    </SessionProvider>
  );
}
