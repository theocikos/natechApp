
import { ReviewTransactionScreen } from "@/components/screens/with-session";
import { useLocalSearchParams } from "expo-router";

type ReviewTransactionScreenParams = {
  amount: string;
  recipient: string;
  recipientName: string;
  description?: string;
};

export default function ExpoRouterReviewTransactionScreen() {
  const { amount, recipient, recipientName, description } =
    useLocalSearchParams<ReviewTransactionScreenParams>();
  return (
    <ReviewTransactionScreen
      transaction={{ amount, recipient, recipientName, description }}
    />
  );
}
