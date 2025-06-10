import { FC, useCallback } from "react";
import { StyleSheet } from "react-native";

import { Button } from "@/components/atoms";
import { NTText } from "@/components/native";
import { ScreenTemplate } from "@/components/templates";
import { useSessionContext } from "@/nucleus";

export type SettingsScreenProps = {};

const SettingsScreen: FC<SettingsScreenProps> = () => {
  const { logOut } = useSessionContext();

  const handleLogout = useCallback(() => {
    logOut();
  }, [logOut]);

  return (
    <ScreenTemplate includeHorizontalPadding style={styles.container}>
      <NTText>This is the Settings screen</NTText>
      <Button title="Log out" onPress={handleLogout} />
    </ScreenTemplate>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    gap: 16,
  },
});

export { SettingsScreen };
