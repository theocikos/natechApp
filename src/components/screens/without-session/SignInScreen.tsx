import { useRouter } from "expo-router";
import { FC, useCallback } from "react";
import { StyleSheet } from "react-native";

import { NTButton, NTText, NTView } from "@/components/native";
import { AppRoutes } from "@/enums/misc";

export type SignInScreenProps = {};

const SignInScreen: FC<SignInScreenProps> = () => {
  const router = useRouter();

  const handleSignIn = useCallback(() => {
    router.push(AppRoutes.HOME.build());
  }, [router]);

  return (
    <NTView style={styles.container}>
      <NTText>This is the Sign In screen</NTText>
      <NTButton title="Sign In" onPress={handleSignIn} />
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

export { SignInScreen };
