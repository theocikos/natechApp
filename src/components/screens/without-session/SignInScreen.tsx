import React, { FC, useCallback } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Button } from "@/components/atoms";
import { Input } from "@/components/atoms/Input";
import { useSessionContext } from "@/nucleus";
import { LoginFormValues, loginSchema } from "@/utils/ui/validation";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import Animated, { FadeInUp } from "react-native-reanimated";
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
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollView}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
              accessibilityLabel="Go back"
              accessibilityRole="button"
            >
              <MaterialCommunityIcons name="arrow-left" size={20} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Log In</Text>
          </View>
          <Animated.View
            style={styles.formContainer}
            entering={FadeInUp.duration(600).delay(300)}
          >
            <Text style={styles.formTitle}>Welcome back</Text>
            <Text style={styles.formSubtitle}>
              Please sign in to your account
            </Text>

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
              style={styles.loginButton}
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
    </SafeAreaView>
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
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 16,
    marginBottom: 32,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#333",
  },
  formContainer: {
    flex: 1,
  },
  formTitle: {
    fontFamily: "Inter-Bold",
    fontSize: 28,
    color: "#333",
    marginBottom: 8,
  },
  formSubtitle: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    color: "#666",
    marginBottom: 32,
  },
  errorContainer: {
    backgroundColor: "#FFEEEE",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    fontWeight: "bold",
    color: "#FF3B30",
    fontSize: 14,
  },
  inputsContainer: {
    marginBottom: 16,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontWeight: "bold",
    color: "#225870",
    fontSize: 14,
  },
  loginButton: {
    marginBottom: 24,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 32,
  },
  footerText: {
    fontFamily: "Inter-Regular",
    color: "#666",
    fontSize: 14,
  },
  signUpText: {
    fontFamily: "Inter-SemiBold",
    color: "#225870",
    fontSize: 14,
  },
});

export { SignInScreen };
