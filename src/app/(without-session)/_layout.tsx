import { Stack } from "expo-router";

export default function WithoutSessionLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="welcome" />
      <Stack.Screen name="signIn" />
    </Stack>
  );
}
