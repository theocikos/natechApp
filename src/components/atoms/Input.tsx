import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React, { forwardRef, useState } from "react";
import {
    StyleProp,
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    TouchableOpacity,
    View,
    ViewStyle,
} from "react-native";

interface InputProps extends TextInputProps {
  readonly label?: string;
  readonly error?: string;
  readonly helperText?: string;
  readonly leftIcon?: React.ReactNode;
  readonly rightIcon?: React.ReactNode;
  readonly containerStyle?: StyleProp<ViewStyle>;
  readonly showPasswordToggle?: boolean;
}

export const Input = forwardRef<TextInput, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      containerStyle,
      showPasswordToggle = false,
      secureTextEntry,
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isSecure = secureTextEntry && !showPassword;

    const renderPasswordIcon = () => {
      if (!showPasswordToggle) return null;

      return (
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          accessibilityRole="button"
          accessibilityLabel={showPassword ? "Hide password" : "Show password"}
          style={styles.iconContainer}
        >
          {showPassword ? (
            <MaterialCommunityIcons name="eye-off" size={20} />
          ) : (
            <MaterialCommunityIcons name="eye" size={20} />
          )}
        </TouchableOpacity>
      );
    };

    return (
      <View style={[styles.container, containerStyle]}>
        {label && <Text style={styles.label}>{label}</Text>}
        <View
          style={[
            styles.inputContainer,
            error ? styles.inputError : null,
            leftIcon ? { paddingLeft: 40 } : null,
          ]}
        >
          {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
          <TextInput
            ref={ref}
            style={styles.input}
            placeholderTextColor="#A3A3A3"
            secureTextEntry={isSecure}
            accessibilityLabel={label}
            accessibilityHint={helperText}
            accessibilityState={{ disabled: rest.editable === false }}
            {...rest}
          />
          {showPasswordToggle ? renderPasswordIcon() : rightIcon}
        </View>
        {(error || helperText) && (
          <Text style={[styles.helperText, error ? styles.errorText : null]}>
            {error || helperText}
          </Text>
        )}
      </View>
    );
  }
);
Input.displayName = "Input";

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: "100%",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "500",
    color: "#333333",
  },
  inputContainer: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#F8FAFC",
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  input: {
    height: 48,
    flex: 1,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#333333",
  },
  inputError: {
    borderColor: "#FF3B30",
  },
  leftIcon: {
    position: "absolute",
    left: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    padding: 8,
    marginRight: 8,
  },
  helperText: {
    fontSize: 14,
    marginTop: 4,
    color: "#64748B",
  },
  errorText: {
    color: "#FF3B30",
  },
});
