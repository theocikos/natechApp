import { Stack } from "expo-router";

export default function ExpoRouterHomeLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="send-money" />
      <Stack.Screen name="review-transaction" />
      <Stack.Screen name="feedback" />
    </Stack>
  );
}
