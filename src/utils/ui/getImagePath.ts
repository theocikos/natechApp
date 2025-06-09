import { ImageSetName } from "@/enums/ui";
import { ImageSourcePropType } from "react-native";

export function getImagePath(imageName: ImageSetName): ImageSourcePropType {
  switch (imageName) {
    case ImageSetName.WELCOME:
      return require("@/assets/images/welcome.png");
    default:
      return require("@/assets/images/welcome.png");
  }
}
