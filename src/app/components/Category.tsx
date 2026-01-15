import React from "react";
import { Pressable, Text, View } from "react-native";

interface CategoryProps {
  category: string;
  totalSpent: number;
  onClick?: () => void;
  onPlusClick?: () => void;
}

const Category: React.FC<CategoryProps> = ({ category, onClick, totalSpent, onPlusClick }) => {
  return (
    <View style={{ padding: 20, backgroundColor: "#606060", flexDirection: "row", borderRadius: 10, alignItems: "center", justifyContent: "space-between" }}>
      <Text
        style={{ color: "#fff", fontSize: 17, fontWeight: 700 }}
        onPress={onClick}>
        {category}
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 20 }}>
        <Text style={{ color: "#fff" }}>-${totalSpent}</Text>
        <Pressable
          style={{ justifyContent: "center", alignItems: "center" }}
          onPress={onPlusClick}>
          <Text style={{ color: "#fff", fontSize: 25, marginTop: -2 }}>+</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Category;
