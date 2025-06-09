import { useRouter } from "expo-router";
import { FC, useCallback } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import { Button, Image } from "@/components/atoms";
import { NTView } from "@/components/native";
import { AppRoutes } from "@/enums/misc";
import { ImageSetName } from "@/enums/ui";

export type WelcomeScreenProps = {};

const WelcomeScreen: FC<WelcomeScreenProps> = () => {
  const router = useRouter();

  const handleGetStarted = useCallback(() => {
    router.push(AppRoutes.SIGNIN.build());
  }, [router]);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={styles.logoContainer}
        entering={FadeInDown.delay(200).duration(800)}
      >
        <Image
          name={ImageSetName.WELCOME}
          style={styles.image}
          contentFit="contain"
        />
      </Animated.View>
      <NTView style={styles.contentContainer}>
        <Animated.View
          entering={FadeInDown.delay(400).duration(800)}
          style={styles.textContainer}
        >
          <Text style={styles.title}>Bolt Banking</Text>
          <Text style={styles.subtitle}>
            Fast, secure, and effortless money transfers at your fingertips
          </Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(600).duration(800)}>
          <Button
            title="Get Started"
            onPress={handleGetStarted}
            style={styles.button}
            accessibilityLabel="Get started with Bolt Banking"
            accessibilityRole="button"
          />

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              By continuing, you agree to our Terms of Service and Privacy
              Policy
            </Text>
          </View>
        </Animated.View>
      </NTView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  logoContainer: {
    flex: 2,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    paddingHorizontal: 24,
    flex: 1,
    justifyContent: "center",
    gap: 16,
  },
  title: {
    fontWeight: "bold",
    fontSize: 32,
    color: "#225870",
  },
  subtitle: {
    fontWeight: "semibold",
    fontSize: 18,
    color: "#555555",
  },
  textContainer: {
    gap: 8,
  },
  button: {
    marginBottom: 24,
  },
  footer: {
    alignItems: "center",
  },
  footerText: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    color: "#888888",
    textAlign: "center",
  },
});

export { WelcomeScreen };
