import { router } from "expo-router";
import React, { FC, useCallback } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { Button, NavBar } from "@/components/atoms";
import { NTText, NTView } from "@/components/native";
import { ScreenTemplate } from "@/components/templates";
import { useSessionContext } from "@/nucleus";
import { formatCurrency } from "@/utils/ui";

type ReviewTransactionProps = {
  transaction: {
    amount: string;
    recipient: string;
    recipientName: string;
    reference?: string;
  };
};
const ReviewTransactionScreen: FC<ReviewTransactionProps> = ({
  transaction,
}) => {
  const { amount, recipient, recipientName, reference } = transaction;
  const { updateSession } = useSessionContext();
  const handleCancel = useCallback(() => {
    router.back();
  }, []);

  const hanndleTransaction = useCallback(() => {
    updateSession({
      amount: parseFloat(amount),
      reference: reference || "",
      recipient,
      recipientName,
    });
  }, [amount, recipient, recipientName, reference, updateSession]);

  return (
    <ScreenTemplate includeHorizontalPadding style={styles.container}>
      <NavBar text="Review Transaction" />
      <NTView style={styles.content}>
        <NTView style={styles.section}>
          <NTText style={styles.label}>Amount</NTText>
          <NTText style={styles.value}>
            {formatCurrency(parseFloat(amount))}
          </NTText>
        </NTView>

        <NTView style={styles.section}>
          <NTText style={styles.label}>Recipient</NTText>
          <NTText style={styles.value}>{recipient}</NTText>
        </NTView>

        <NTView style={styles.section}>
          <NTText style={styles.label}>Recipient Name</NTText>
          <NTText style={styles.value}>{recipientName}</NTText>
        </NTView>

        {reference && (
          <NTView style={styles.section}>
            <NTText style={styles.label}>Description</NTText>
            <NTText style={styles.value}>{reference}</NTText>
          </NTView>
        )}

        <Button title="Confirm Transaction" onPress={hanndleTransaction} />

        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <NTText style={styles.cancelButtonText}>Cancel</NTText>
        </TouchableOpacity>
      </NTView>
    </ScreenTemplate>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  content: {
    flex: 1,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  section: {
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  value: {
    fontSize: 18,
    fontWeight: "bold",
  },
  confirmButton: {
    backgroundColor: "#4CAF50",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    alignSelf: "center",
    padding: 12,
  },
  cancelButtonText: {
    color: "#666",
    fontSize: 16,
  },
});

export { ReviewTransactionScreen };
