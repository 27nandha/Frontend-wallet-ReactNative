import { useState } from "react";
import { useCallback } from "react";
import { Alert } from "react-native";

const API_URL = "https://wallet-api-rn.onrender.com/api"; // Replace with your API URL

export const useTransactions = (userId) => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    balance: 0,
    income: 0,
    expenses: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchTransactions = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/transactions/${userId}`);
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.log("error fetching transactions:", error);
    }
  }, [userId]);

  const fetchSummary = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/transactions/summary/${userId}`);
      const data = await response.json();
      setSummary(data);
    } catch (error) {
      console.log("error fetching transactions:", error);
    }
  }, [userId]);

  const loadData = useCallback(async () => {
    if (!userId) return;

    setIsLoading(true);
    try {
        //can run in parallel
      await Promise.all([fetchTransactions(), fetchSummary()]);
    } catch (error) {
      console.log("Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchTransactions, fetchSummary, userId]);

  const deleteTransaction = async (id) => {
    try {
      const response = await fetch(`${API_URL}/transactions/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete transaction");
      }
      loadData();
      Alert.alert("Transaction deleted successfully");
    } catch (error) {
      console.log("Error deleting transaction:", error);
      Alert.alert("Error deleting transaction:", error.message);
    }
  };

  return {
    transactions,
    summary,
    isLoading,
    loadData,
    deleteTransaction,
  };
};
