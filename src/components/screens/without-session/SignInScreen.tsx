import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { FC, useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

import { Button, Input, NavBar } from "@/components/atoms";
import { NTView } from "@/components/native";
import { ScreenTemplate } from "@/components/templates";
import { useSessionContext } from "@/nucleus";
import { LoginFormValues, loginSchema } from "@/utils/ui/validation";

export type SignInScreenProps = {};

const SignInScreen: FC<SignInScreenProps> = () => {
  const { signIn, isLoading, error } = useSessionContext();
  const handleSignIn = useCallback(
    async (data: LoginFormValues) => {
      signIn(data.email, data.password);
    },
    [signIn]
  );
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "theodosis44@gmail.com",
      password: "password",
    },
  });

  const notImplementedAlert = useCallback(() => {
    Alert.alert("Not implemented", "This feature is not available in the demo");
  }, []);

  return (
    <ScreenTemplate includeHorizontalPadding style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollView}
          keyboardShouldPersistTaps="handled"
        >
          <NavBar text="Sign In" />
          <Animated.View
            style={styles.formContainer}
            entering={FadeInUp.duration(600).delay(300)}
          >
            <NTView style={{ gap: 4 }}>
              <Text style={styles.formTitle}>Welcome back</Text>
              <Text style={styles.formSubtitle}>
                Please sign in to your account
              </Text>
            </NTView>

            {error && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            <View style={styles.inputsContainer}>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <Input
                    label="Email"
                    placeholder="your.email@example.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={value}
                    onChangeText={onChange}
                    error={errors.email?.message}
                    leftIcon={<MaterialCommunityIcons name="mail" size={20} />}
                    autoComplete="email"
                    textContentType="emailAddress"
                  />
                )}
              />

              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <Input
                    label="Password"
                    placeholder="••••••••"
                    secureTextEntry
                    value={value}
                    onChangeText={onChange}
                    error={errors.password?.message}
                    leftIcon={<MaterialCommunityIcons name="lock" size={20} />}
                    showPasswordToggle
                    autoComplete="password"
                    textContentType="password"
                  />
                )}
              />
            </View>
            <TouchableOpacity
              style={styles.forgotPassword}
              accessibilityRole="button"
              accessibilityLabel="Forgot password"
              onPress={notImplementedAlert}
            >
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </TouchableOpacity>

            <Button
              title="Log In"
              onPress={handleSubmit(handleSignIn)}
              isLoading={isLoading}
            />

            <View style={styles.footer}>
              <Text style={styles.footerText}>{`Don't have an account?`}</Text>
              <TouchableOpacity
                onPress={notImplementedAlert}
                accessibilityRole="button"
                accessibilityLabel="Create an account"
              >
                <Text style={styles.signUpText}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenTemplate>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  keyboardAvoidView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    gap: 16,
  },
  formContainer: {
    flex: 1,
    gap: 16,
  },
  formTitle: {
    fontSize: 20,
    color: "#333",
  },
  formSubtitle: {
    fontWeight: "regular",
    fontSize: 16,
    color: "#666",
  },
  inputsContainer: {
    gap: 8,
  },
  errorContainer: {
    backgroundColor: "#FFEEEE",
    borderRadius: 8,
    padding: 12,
  },
  errorText: {
    fontWeight: "bold",
    color: "#FF3B30",
    fontSize: 14,
  },
  forgotPassword: {
    alignSelf: "flex-end",
  },
  forgotPasswordText: {
    fontWeight: "bold",
    color: "#225870",
    fontSize: 14,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  footerText: {
    fontWeight: "regular",
    color: "#666",
    fontSize: 14,
  },
  signUpText: {
    fontWeight: "semibold",
    color: "#225870",
    fontSize: 14,
  },
});

export { SignInScreen };
