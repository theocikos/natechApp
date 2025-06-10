import { FC } from "react";
import { StyleSheet } from "react-native";

import { NTText, NTView } from "@/components/native";

export type FeedbackScreenProps = {};

const FeedbackScreen: FC<FeedbackScreenProps> = () => {
  return (
    <NTView style={styles.container}>
      <NTText>This is the Feedback screen</NTText>
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

export { FeedbackScreen };
