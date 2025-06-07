import { FC } from "react";

import { Image, ImageProps } from "expo-image";

export type NTImageProps = ImageProps;

const NTImage: FC<NTImageProps> = (props) => {
  return <Image {...props} />;
};
NTImage.displayName = "NTImage";

export { NTImage };
