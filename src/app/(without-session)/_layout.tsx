import { Stack } from "expo-router";

export default function WithoutSessionLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" />
      <Stack.Screen name="SignIn" />
    </Stack>
  );
}
