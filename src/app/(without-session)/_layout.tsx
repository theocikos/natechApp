import { Stack } from "expo-router";

export default function ExpoRouterWithoutSessionLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="signIn" />
      <Stack.Screen
        name="welcome"
        options={{
          animation: "none",
        }}
      />
    </Stack>
  );
}
