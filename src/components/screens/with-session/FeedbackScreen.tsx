import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FC, useCallback } from "react";
import { StyleSheet } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

import { Button } from "@/components/atoms";
import { ScreenTemplate } from "@/components/templates";

export type FeedbackScreenProps = {};
export type FeedbackScreenParams = {
  amount?: string;
  state: "success" | "error";
};
const FeedbackScreen: FC<FeedbackScreenProps> = () => {
  const router = useRouter();
  const params = useLocalSearchParams<FeedbackScreenParams>();
  const amount = params.amount ? parseFloat(params.amount as string) : 0;

  const handleDone = useCallback(() => {
    router.push("/");
  }, [router]);

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <ScreenTemplate style={styles.container}>
      <Animated.View style={styles.content} entering={FadeIn.duration(800)}>
        <Animated.View
          style={styles.iconContainer}
          entering={FadeInDown.delay(300).duration(800)}
        >
          {params.state === "success" ? (
            <MaterialCommunityIcons
              name="check-circle"
              size={64}
              color="#4CAF50"
            />
          ) : (
            <MaterialCommunityIcons
              name="alert-circle"
              size={64}
              color="#F87171"
            />
          )}
        </Animated.View>

        <Animated.Text
          style={styles.title}
          entering={FadeInDown.delay(500).duration(800)}
        >
          {params.state === "success"
            ? `Payment Successful!`
            : `Payment Failed!`}
        </Animated.Text>
        {params.state === "success" ? (
          <>
            <Animated.Text
              style={styles.subtitle}
              entering={FadeInDown.delay(700).duration(800)}
            >
              You have sent
            </Animated.Text>

            <Animated.Text
              style={styles.amount}
              entering={FadeInDown.delay(900).duration(800)}
            >
              {formatCurrency(amount)}
            </Animated.Text>

            <Animated.Text
              style={styles.message}
              entering={FadeInDown.delay(1100).duration(800)}
            >
              Your transaction has been processed successfully.
            </Animated.Text>
          </>
        ) : (
          <Animated.Text
            style={styles.message}
            entering={FadeInDown.delay(700).duration(800)}
          >
            Failed to process your transaction. Please try again later.
          </Animated.Text>
        )}

        <Animated.View
          style={styles.buttonContainer}
          entering={FadeInDown.delay(1300).duration(800)}
        >
          <Button
            title={params.state === "success" ? "Done" : "Cancel"}
            onPress={handleDone}
          />
        </Animated.View>
      </Animated.View>
    </ScreenTemplate>
  );
};

const styles = StyleSheet.create({
  container: {},
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  iconContainer: {
    marginBottom: 24,
  },
  title: {
    fontFamily: "Inter-Bold",
    fontSize: 24,
    color: "#0F172A",
    textAlign: "center",
    marginBottom: 16,
  },
  subtitle: {
    fontFamily: "Inter-Medium",
    fontSize: 16,
    color: "#64748B",
    textAlign: "center",
    marginBottom: 8,
  },
  amount: {
    fontFamily: "Inter-Bold",
    fontSize: 36,
    color: "#0F172A",
    textAlign: "center",
    marginBottom: 24,
  },
  message: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    color: "#64748B",
    textAlign: "center",
    marginBottom: 48,
    paddingHorizontal: 24,
  },
  buttonContainer: {
    width: "100%",
  },
});

export { FeedbackScreen };
