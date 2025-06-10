import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React, { FC, useCallback, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

import { Button } from "@/components/atoms";
import { NTText, NTView } from "@/components/native";
import { ScreenTemplate } from "@/components/templates";
import { AppRoutes } from "@/enums/misc";
import { useSessionContext } from "@/nucleus";
import { formatCurrency } from "@/utils/ui";
import { router } from "expo-router";

export type HomeScreenProps = {};

const HomeScreen: FC<HomeScreenProps> = () => {
  const { session } = useSessionContext();
  const [hideBalance, setHideBalance] = useState(false);
  const toggleBalanceVisibility = useCallback(() => {
    setHideBalance(!hideBalance);
  }, [hideBalance]);

  const handleSendMoney = useCallback(() => {
    router.push(AppRoutes.SEND_MONEY.build());
  }, []);

  return (
    <ScreenTemplate includeHorizontalPadding style={styles.container}>
      <NTView>
        <NTText style={styles.greeting}>Welcome,</NTText>
        <NTText style={styles.name}>
          {session?.toPrimitives().userSnippet.firstName || "Guest"}
        </NTText>
      </NTView>

      <Animated.View entering={FadeInUp.duration(600).delay(100)}>
        <NTView style={styles.balanceCard}>
          <NTView style={styles.balanceHeader}>
            <NTText style={styles.balanceLabel}>Available Balance</NTText>
            <TouchableOpacity
              onPress={toggleBalanceVisibility}
              accessibilityRole="button"
              accessibilityLabel={hideBalance ? "Show balance" : "Hide balance"}
            >
              {hideBalance ? (
                <MaterialCommunityIcons name="eye-off" size={20} />
              ) : (
                <MaterialCommunityIcons name="eye" size={20} />
              )}
            </TouchableOpacity>
          </NTView>

          <NTText style={styles.balanceAmount}>
            {hideBalance
              ? "******"
              : formatCurrency(
                  session?.toPrimitives().userSnippet.balance || 0
                )}
          </NTText>
          <Button title="Send Money" onPress={handleSendMoney} />
        </NTView>
      </Animated.View>

      <Animated.View
        style={styles.transactionsContainer}
        entering={FadeInUp.duration(600).delay(300)}
      >
        <NTText style={styles.sectionTitle}>Recent Transactions</NTText>
        <NTText style={styles.emptyText}>No transactions yet</NTText>
      </Animated.View>
    </ScreenTemplate>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  greeting: {
    fontSize: 16,
    color: "#64748B",
  },
  name: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#0F172A",
  },
  balanceCard: {
    backgroundColor: "#add8e6",
    borderRadius: 12,
    padding: 24,
    gap: 8,
  },
  balanceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  balanceLabel: {
    fontWeight: "medium",
    fontSize: 16,
    color: "#64748B",
  },
  balanceAmount: {
    fontWeight: "bold",
    fontSize: 32,
    color: "#0F172A",
    marginBottom: 24,
  },
  transactionsContainer: {
    gap: 16,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#0F172A",
  },
  emptyText: {
    fontWeight: "medium",
    fontSize: 16,
    color: "#64748B",
    alignSelf: "center",
  },
});

export { HomeScreen };
