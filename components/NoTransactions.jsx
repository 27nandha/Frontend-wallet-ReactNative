import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router"; // <-- added
import { styles } from "../assets/styles/home.styles";
import { COLORS } from "../constants/colors";

const NoTransactions = () => {
  const router = useRouter(); // <-- added

  return (
    <View style={styles.emptyState}>
      <Ionicons
        name="wallet-outline"
        size={48}
        color={COLORS.primary}
        style={styles.emptyStateIcon}
      />
      <Text style={styles.emptyStateTitle}>No Transactions Yet</Text>
      <Text style={styles.emptyStateText}>
        You haven't added any transactions. Tap the button below to get started.
      </Text>

      <TouchableOpacity
        style={styles.emptyStateButton}
        onPress={() => router.push("/create")} // <-- added
      >
        <Ionicons name="add" size={20} color={COLORS.white} />
        <Text style={styles.emptyStateButtonText}>Add Transaction</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NoTransactions;
