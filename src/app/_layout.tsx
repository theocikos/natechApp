import { SessionProvider } from "@/nucleus";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function RootLayout() {

  return (
    <>
      <StatusBar />
      <SessionProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="(without-session)"
            options={{ animation: "none" }}
          />
          <Stack.Screen name="(with-session)" options={{ animation: "none" }} />
          <Stack.Screen name="index" options={{ animation: "none" }} />
        </Stack>
      </SessionProvider>
    </>
  );
}
