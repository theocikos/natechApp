import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(without-session)" options={{ animation: "none" }} />
      <Stack.Screen name="(with-session)" options={{ animation: "none" }} />
      <Stack.Screen name="index" options={{ animation: "none" }} />
    </Stack>
  );
}
