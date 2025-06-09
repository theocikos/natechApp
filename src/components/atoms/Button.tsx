import React from "react";
import {
    GestureResponderEvent,
    Pressable,
    PressableProps,
    StyleProp,
    StyleSheet,
    ViewStyle,
} from "react-native";
import { NTText, NTView } from "../native";

type ButtonProps = PressableProps & {
  title: string;
  style?: StyleProp<ViewStyle> | undefined;
  onPress: (event: GestureResponderEvent) => void;
};

const Button: React.FC<ButtonProps> = ({ title, style, onPress, ...rest }) => {
  return (
    <NTView style={[styles.container, style]}>
      <Pressable
        {...rest}
        onPress={onPress}
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      >
        <NTText style={styles.text}>{title}</NTText>
      </Pressable>
    </NTView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
  },
  button: {
    backgroundColor: "#225870",
    padding: 16,

    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: {
    opacity: 0.85,
  },
  text: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export { Button };
