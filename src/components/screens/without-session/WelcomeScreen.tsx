import { useRouter } from "expo-router";
import { FC, useCallback } from "react";
import { StyleSheet } from "react-native";

import { NTButton, NTText, NTView } from "@/components/native";
import { AppRoutes } from "@/enums/misc";

export type WelcomeScreenProps = {};

const WelcomeScreen: FC<WelcomeScreenProps> = () => {
  const router = useRouter();

  const handleGetStarted = useCallback(() => {
    router.push(AppRoutes.SIGNIN.build());
  }, [router]);

  return (
    <NTView style={styles.container}>
      <NTText>This is the welcome screen</NTText>
      <NTButton title="Get started" onPress={handleGetStarted} />
    </NTView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

export { WelcomeScreen };
