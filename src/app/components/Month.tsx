import { ExpenseContext } from "@/src/context/ExpenseContext";
import React, { useContext } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

const ITEM_WIDTH = 90;

const Month = () => {
  const { dates, onDatePress, activeDate } = useContext(ExpenseContext);

  return (
    <View style={{ backgroundColor: "#3c3c3c", paddingTop: 50 }}>
      <FlatList
        horizontal
        data={dates}
        keyExtractor={(item) => item.key}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        initialScrollIndex={35.5}
        getItemLayout={(_, index) => ({
          length: ITEM_WIDTH,
          offset: ITEM_WIDTH * index,
          index,
        })}
        renderItem={({ item }) => {
          const isActive = item.key === activeDate;

          return (
            <Pressable onPress={() => onDatePress(item)}>
              <View style={[styles.dateItem, isActive && styles.activeDate]}>
                <Text style={[styles.text, isActive && styles.activeText]}>{item.label}</Text>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 16,
  },
  dateItem: {
    width: ITEM_WIDTH,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#3A3A3A",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  activeDate: {
    backgroundColor: "#5A5A5A",
  },
  text: {
    color: "#AAA",
    fontSize: 14,
  },
  activeText: {
    color: "#FFF",
    fontWeight: "600",
  },
});

export default Month;
