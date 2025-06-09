import { FC } from "react";

import { ImageSetName } from "@/enums/ui";
import { getImagePath } from "@/utils/ui";
import { Image, ImageProps } from "expo-image";

export type NTImageProps = Omit<ImageProps, "source"> & {
  readonly name: ImageSetName;
};

const NTImage: FC<NTImageProps> = ({ name, ...rest }) => {
  return <Image {...rest} source={getImagePath(name)} />;
};
NTImage.displayName = "NTImage";

export { NTImage };
