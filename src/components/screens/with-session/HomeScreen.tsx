import { FC } from "react";
import { StyleSheet } from "react-native";

import { NTText, NTView } from "@/components/native";

export type HomeScreenProps = {};

const HomeScreen: FC<HomeScreenProps> = () => {
  return (
    <NTView style={styles.container}>
      <NTText>This is the Home screen</NTText>
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

export { HomeScreen };
