import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React, { FC, useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

import { Button, Input, NavBar } from "@/components/atoms";
import { NTText, NTView } from "@/components/native";
import { ScreenTemplate } from "@/components/templates";
import { AppRoutes } from "@/enums/misc";
import { useSessionContext } from "@/nucleus";
import { formatCurrency, formatIBAN } from "@/utils/ui";
import {
  MoneyTransferFormValues,
  moneyTransferSchema,
} from "@/utils/ui/validation";

export type SendMoneyScreenProps = {};

const SendMoneyScreen: FC<SendMoneyScreenProps> = () => {
  const [transferMethod, setTransferMethod] = useState<"iban" | "phone">(
    "iban"
  );
  const { session } = useSessionContext();
  const userBalance = session?.toPrimitives().userSnippet.balance || 0;
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<MoneyTransferFormValues>({
    resolver: zodResolver(moneyTransferSchema(userBalance)),
    defaultValues: {
      amount: 0,
      recipient: {
        name: "",
        iban: undefined,
        phoneNumber: undefined,
      },
      reference: "",
    },
  });

  const toggleTransferMethod = useCallback(
    (method: "iban" | "phone") => {
      setTransferMethod(method);
      if (method === "iban") {
        setValue("recipient.phoneNumber", undefined);
      } else {
        setValue("recipient.iban", undefined);
      }
    },
    [setValue]
  );

  const onSubmit = useCallback((data: MoneyTransferFormValues) => {
    const transactionRequest = {
      amount: data.amount.toString(),
      recipient: data.recipient.iban
        ? data.recipient.iban.trim()
        : data.recipient.phoneNumber?.trim() || "",
      recipientName: data.recipient.name.trim(),
      reference: data?.reference,
    };
    router.push(AppRoutes.REVIEW_TRANSACTION.build(transactionRequest));
  }, []);
  return (
    <ScreenTemplate
      includeHorizontalPadding
      avoidBottomInset
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollView}
          keyboardShouldPersistTaps="handled"
        >
          <NavBar text="Send Money" />

          <Animated.View
            style={styles.formContainer}
            entering={FadeInUp.duration(600).delay(300)}
          >
            <NTView style={styles.balanceCard}>
              <NTText style={styles.balanceLabel}>Available Balance</NTText>
              <NTText style={styles.balanceAmount}>
                {formatCurrency(userBalance)}
              </NTText>
            </NTView>
            <Controller
              control={control}
              name="amount"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Amount"
                  placeholder="0.00"
                  value={value > 0 ? value.toString() : ""}
                  onChangeText={(text) => {
                    const numValue = parseFloat(text) || 0;
                    onChange(numValue);
                  }}
                  keyboardType="decimal-pad"
                  error={errors.amount?.message}
                  leftIcon={
                    <MaterialCommunityIcons name="currency-usd" size={20} />
                  }
                />
              )}
            />
            <Controller
              control={control}
              name="recipient.name"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Recipient Name"
                  placeholder="Full name"
                  value={value}
                  onChangeText={(text) => {
                    onChange(text.trim());
                  }}
                  error={errors.recipient?.name?.message}
                  leftIcon={<MaterialCommunityIcons name="account" size={20} />}
                  autoCapitalize="words"
                />
              )}
            />

            <View style={styles.methodSelector}>
              <TouchableOpacity
                style={[
                  styles.methodOption,
                  transferMethod === "iban" && styles.methodOptionActive,
                ]}
                onPress={() => toggleTransferMethod("iban")}
                accessibilityRole="radio"
                accessibilityState={{ checked: transferMethod === "iban" }}
                accessibilityLabel="Pay with IBAN"
              >
                <NTText
                  style={[
                    styles.methodText,
                    transferMethod === "iban" && styles.methodTextActive,
                  ]}
                >
                  IBAN
                </NTText>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.methodOption,
                  transferMethod === "phone" && styles.methodOptionActive,
                ]}
                onPress={() => toggleTransferMethod("phone")}
                accessibilityRole="radio"
                accessibilityState={{ checked: transferMethod === "phone" }}
                accessibilityLabel="Pay with phone number"
              >
                <NTText
                  style={[
                    styles.methodText,
                    transferMethod === "phone" && styles.methodTextActive,
                  ]}
                >
                  Phone
                </NTText>
              </TouchableOpacity>
            </View>

            {transferMethod === "iban" ? (
              <Controller
                control={control}
                name="recipient.iban"
                render={({ field: { onChange, value } }) => (
                  <Input
                    label="IBAN"
                    placeholder="e.g. GR89 3704 0044 0532 0130 00"
                    value={formatIBAN(value!)}
                    onChangeText={(text) => {
                      onChange(text.trim());
                    }}
                    error={
                      errors.recipient?.iban?.message ||
                      (errors.recipient as any)?.message
                    }
                    leftIcon={<MaterialCommunityIcons name="bank" size={20} />}
                    autoCapitalize="characters"
                  />
                )}
              />
            ) : (
              <Controller
                control={control}
                name="recipient.phoneNumber"
                render={({ field: { onChange, value } }) => (
                  <Input
                    label="Phone Number"
                    placeholder="e.g. +1 234 567 890"
                    value={value}
                    onChangeText={(text) => {
                      onChange(text.trim());
                    }}
                    error={
                      errors.recipient?.phoneNumber?.message ||
                      (errors.recipient as any)?.message
                    }
                    leftIcon={<MaterialCommunityIcons name="phone" size={20} />}
                    keyboardType="phone-pad"
                  />
                )}
              />
            )}
            <Controller
              control={control}
              name="reference"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Reference (Optional)"
                  placeholder="e.g. Dinner payment"
                  value={value}
                  onChangeText={(text) => {
                    onChange(text.trim());
                  }}
                  error={errors.reference?.message}
                />
              )}
            />

            <Button title="Continue" onPress={handleSubmit(onSubmit)} />
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenTemplate>
  );
};

const styles = StyleSheet.create({
  container: {},
  keyboardAvoidView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    gap: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  headerTitle: {
    fontWeight: "semibold",
    fontSize: 18,
    color: "#333",
  },
  formContainer: {
    flex: 1,
    gap: 16,
  },
  balanceCard: {
    backgroundColor: "#add8e6",
    borderRadius: 12,
    padding: 24,
  },
  balanceLabel: {
    fontWeight: "medium",
    fontSize: 14,
    color: "#64748B",
    marginBottom: 4,
  },
  balanceAmount: {
    fontFamily: "Inter-Bold",
    fontSize: 24,
    color: "#0F172A",
  },
  methodSelector: {
    flexDirection: "row",
    borderRadius: 12,
    backgroundColor: "#F1F5F9",
    padding: 4,
  },
  methodOption: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 8,
  },
  methodOptionActive: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  methodText: {
    fontWeight: "medium",
    fontSize: 14,
    color: "#64748B",
  },
  methodTextActive: {
    color: "#225870",
  },
});

export { SendMoneyScreen };
