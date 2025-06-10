import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import { FC, useCallback } from "react";
import {
    GestureResponderEvent,
    StyleSheet,
    TouchableOpacity,
} from "react-native";

import { AppRoutes } from "@/enums/misc";
import { NTText, NTView } from "../native";

export type NavBarProps = {
  onPress?: (event: GestureResponderEvent) => void;
  text: string;
};

const NavBar: FC<NavBarProps> = ({ text, onPress }) => {
  const router = useRouter();

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      onPress?.(event);
      if (router.canGoBack()) return router.back();
      if (router.canDismiss()) return router.dismiss();
      router.replace(AppRoutes.INDEX.build());
    },
    [router, onPress]
  );

  return (
    <NTView style={styles.header}>
      <TouchableOpacity
        onPress={handlePress}
        accessibilityLabel="Go back"
        accessibilityRole="button"
      >
        <MaterialCommunityIcons name="arrow-left" size={24} />
      </TouchableOpacity>
      <NTText style={styles.headerTitle}>{text}</NTText>
    </NTView>
  );
};

NavBar.displayName = "NavBar";

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: 24,
  },
});

export { NavBar };
