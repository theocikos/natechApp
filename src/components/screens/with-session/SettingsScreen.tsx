import { FC, useCallback } from "react";
import { StyleSheet } from "react-native";

import { NTButton, NTText, NTView } from "@/components/native";
import { useSessionContext } from "@/nucleus";

export type SettingsScreenProps = {};

const SettingsScreen: FC<SettingsScreenProps> = () => {
  const { logOut } = useSessionContext();

  const handleLogout = useCallback(() => {
    logOut();
  }, [logOut]);

  return (
    <NTView style={styles.container}>
      <NTText>This is the Settings screen</NTText>
      <NTButton title="Log out" onPress={handleLogout} />
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

export { SettingsScreen };
