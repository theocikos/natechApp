import { Stack } from "expo-router";

export default function ExpoRouterSettingsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />;
    </Stack>
  );
}
