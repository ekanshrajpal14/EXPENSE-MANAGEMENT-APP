import { createCategory } from "@/src/database/expense.service";
import React, { useState } from "react";
import { Alert, Modal, Pressable, Text, TextInput, View } from "react-native";

interface CategoryModalProps {
  onCrossClick: () => void;
}

const CategoryModal: React.FC<CategoryModalProps> = ({ onCrossClick }) => {
  const [categoryName, setCategoryName] = useState<string>("");
  const onConfirmClick = async () => {
    try {
      if (categoryName.trim() === "") {
        return Alert.alert("Error", "Category cannot be empty");
      }
      await createCategory(categoryName.trim());
      setCategoryName("");
      onCrossClick();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal transparent={true}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(255, 40, 40, 0)",
        }}>
        <View style={{ width: 300, backgroundColor: "#fff", padding: 15, borderRadius: 10, position: "relative" }}>
          <Text style={{ fontSize: 20 }}>Category Modal</Text>
          <TextInput
            placeholder="Category Name"
            style={{ borderWidth: 1, borderRadius: 10, padding: 10, marginTop: 20 }}
            onChangeText={(text) => setCategoryName(text)}
          />
          <View style={{ flexDirection: "row-reverse", paddingTop: 20, gap: 10 }}>
            <Pressable
              onPress={onConfirmClick}
              style={{ paddingHorizontal: 10, paddingVertical: 5, backgroundColor: "#acff68", borderRadius: 20 }}>
              <Text>Confirm</Text>
            </Pressable>
            <Pressable
              onPress={onCrossClick}
              style={{ paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 }}>
              <Text>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CategoryModal;
