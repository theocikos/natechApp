import { FC, useCallback } from "react";
import { StyleSheet } from "react-native";

import { NTButton, NTText, NTView } from "@/components/native";
import { useSessionContext } from "@/nucleus";

export type SignInScreenProps = {};

const SignInScreen: FC<SignInScreenProps> = () => {
  const { signIn, isLoading } = useSessionContext();
  const handleSignIn = useCallback(() => {
    signIn("theodosis44@gmail.com", "password");
  }, [signIn]);
  
  return (
    <NTView style={styles.container}>
      {isLoading ? (
        <NTText>Loading...</NTText>
      ) : (
        <>
          <NTText>This is the Sign In screen</NTText>
          <NTButton title="Sign In" onPress={handleSignIn} />
        </>
      )}
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
