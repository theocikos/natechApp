
import { ReviewTransactionScreen } from "@/components/screens/with-session";
import { useLocalSearchParams } from "expo-router";

type ReviewTransactionScreenParams = {
  amount: string;
  recipient: string;
  recipientName: string;
  reference?: string;
};

export default function ExpoRouterReviewTransactionScreen() {
  const { amount, recipient, recipientName, reference } =
    useLocalSearchParams<ReviewTransactionScreenParams>();
  return (
    <ReviewTransactionScreen
      transaction={{ amount, recipient, recipientName, reference }}
    />
  );
}
