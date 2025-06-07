import { FC } from "react";
import { Button, ButtonProps } from "react-native";

const NTButton: FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};
NTButton.displayName = "NTButton";

export { NTButton };
