import { FC, PropsWithChildren } from 'react';
import { Text, TextProps } from 'react-native';

export type NTTextProps = PropsWithChildren<TextProps>;

const NTText: FC<NTTextProps> = ({ children, ...rest }) => {
  return <Text {...rest}>{children}</Text>;
};
NTText.displayName = 'NTText';

export { NTText };
