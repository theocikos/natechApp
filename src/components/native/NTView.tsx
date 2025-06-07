import { forwardRef } from 'react';
import { View, ViewProps } from 'react-native';

export type NTViewProps = ViewProps;

const NTView = forwardRef<View, NTViewProps>(({ children, ...rest }, ref) => {
  return (
    <View ref={ref} {...rest}>
      {children}
    </View>
  );
});
NTView.displayName = 'NTView';

export { NTView };
