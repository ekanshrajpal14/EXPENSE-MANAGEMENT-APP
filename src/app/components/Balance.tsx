import React from "react";
import { Text, View } from "react-native";

interface BalanceProps {
  balance: number | string;
}

const Balance = ({ balance }: BalanceProps) => {
  return (
    <View style={{ width: "100%", justifyContent: "center", alignItems: "center", paddingTop: 35 }}>
      <View style={{ padding: 10, backgroundColor: "#606060", width: "90%", height: 60, borderRadius: 30, justifyContent: "center", alignItems: "flex-end", paddingRight: 30 }}>
        <Text style={{ color: "#fff", fontWeight: 600 }}>Balance</Text>
        <Text style={{ fontSize: 20, fontWeight: 800, color: "#fff" }}>${balance}</Text>
      </View>
    </View>
  );
};

export default Balance;
