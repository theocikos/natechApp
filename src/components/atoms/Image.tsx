import { FC } from "react";

import { ImageSetName } from "@/enums/ui";
import { getImagePath } from "@/utils/ui";
import { NTImage, NTImageProps } from "../native";

export type ImageProps = Omit<NTImageProps, "source"> & {
  readonly name: ImageSetName;
};

const Image: FC<ImageProps> = ({ name, ...rest }) => {
  return <NTImage {...rest} source={getImagePath(name)} />;
};

Image.displayName = "Image";

export { Image };
