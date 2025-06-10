import { FC, PropsWithChildren } from "react";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { NTView, NTViewProps } from "../native";

export type ScreenTemplateProps = PropsWithChildren<
  NTViewProps & {
    readonly includeHorizontalPadding?: boolean;
  }
>;
const ScreenTemplate: FC<ScreenTemplateProps> = (props) => {
  const { children, style, includeHorizontalPadding, ...rest } = props;
  const insets = useSafeAreaInsets();
  return (
    <NTView
    {...rest}
      style={[
        styles.container,
        style,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
        {
          paddingHorizontal: includeHorizontalPadding ? 24 : 0,
        },
      ]}
    >
      {children}
    </NTView>
  );
};

ScreenTemplate.displayName = "ScreenTemplate";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export { ScreenTemplate };
