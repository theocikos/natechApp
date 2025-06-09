import { useSessionContext } from "@/nucleus";
import { Redirect, Stack } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export default function WithSessionLayout() {
  const { isReady, isAuthenticated } = useSessionContext();

  if (!isReady) {
    return null;
  }

  if (!isAuthenticated) {
    return <Redirect href="/welcome" />;
  }
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
