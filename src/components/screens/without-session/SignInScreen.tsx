import { FC } from "react";
import { StyleSheet } from "react-native";

import { NTText, NTView } from "@/components/native";

export type SignInScreenProps = {};

const SignInScreen: FC<SignInScreenProps> = () => {
  return (
    <NTView style={styles.container}>
      <NTText>This is the Sign In screen</NTText>
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
