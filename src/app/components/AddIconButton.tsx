import React from "react";
import { Pressable, Text, View } from "react-native";

interface AddIconButtonProps {
  handleButtonClick?: () => void;
}

const AddIconButton: React.FC<AddIconButtonProps> = ({ handleButtonClick }) => {
  return (
    <Pressable onPress={handleButtonClick}>
      <View
        style={{
          position: "absolute",
          bottom: 50,
          right: 20,
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: "#606060",
          justifyContent: "center",
          alignItems: "center",
          elevation: 6, // Android shadow
          shadowColor: "#000", // iOS shadow
          shadowOpacity: 0.3,
          shadowRadius: 4,
        }}>
        <Text style={{ color: "white", fontSize: 28 }}>+</Text>
      </View>
    </Pressable>
  );
};

export default AddIconButton;
