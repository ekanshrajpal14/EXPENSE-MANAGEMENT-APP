/* eslint-disable react-hooks/exhaustive-deps */
import { router, useLocalSearchParams } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { ExpenseContext } from "../context/ExpenseContext";
import { fetchCategoryBasedItems } from "../database/expense.service";
import { datafetch } from "../helpers/apiCall";
import { Expense } from "../types/expense";
import AddIconButton from "./components/AddIconButton";
import Balance from "./components/Balance";

const CategoryView = () => {
  let { categoryId, categoryName } = useLocalSearchParams<{ categoryId: string; categoryName: string; totalExp: string; balance: string }>();
  const { selectedDate } = useContext(ExpenseContext);
  const [items, setItems] = useState<Expense[]>([]);
  const [totalExpData, setTotalExpData] = useState(0);
  const [balance, setBalance] = useState(0);
  const fetchCategoryBasedDataItems = async () => {
    try {
      const resp = await fetchCategoryBasedItems(selectedDate, Number(categoryId));
      console.log(resp);
      setItems(resp);
      if (resp.length === 0) {
        setTotalExpData(0);
      } else {
        let tot = 0;
        resp.map((e) => {
          tot += e.amount;
        });
        setTotalExpData(tot);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategoryBasedDataItems();
    fetchBalance();
  }, [selectedDate]);
  const fetchBalance = async () => {
    const d = await datafetch(selectedDate);
    if (d) setBalance(d);
    else setBalance(0);
  };
  return (
    <View>
      <View
        style={{
          backgroundColor: "#3c3c3c",
          height: Dimensions.get("window").height,
        }}>
        <View
          style={{
            flex: 1,
            padding: 10,
            paddingTop: 50,
          }}>
          <Balance balance={balance} />
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <View style={{ backgroundColor: "#606060", borderRadius: 10, padding: 20, marginVertical: 30, width: "90%" }}>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <View style={{ flexDirection: "row", gap: 30, alignItems: "center" }}>
                  <Pressable
                    onPress={() => {
                      router.back();
                    }}>
                    <Image
                      source={require("../../assets/icons/right-arrow.png")}
                      style={{ width: 20, height: 20, transform: [{ rotate: "180deg" }] }}
                    />
                  </Pressable>
                  <Text style={styles.textColor}>{categoryName}</Text>
                </View>
                <Text style={styles.textColor}>-${totalExpData}</Text>
              </View>
              <ScrollView
                style={{ marginTop: 10 }}
                contentContainerStyle={{ gap: 15, paddingBottom: 200 }}
                showsVerticalScrollIndicator={false}>
                {items && items.length > 0
                  ? items.map((e: any, i: number) => (
                      <View
                        key={i}
                        style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 10 }}>
                        <View>
                          <Text style={{ color: "#fff" }}>{e.name}</Text>
                          <Text style={{ color: "#c3c3c3" }}>{e.date}</Text>
                        </View>
                        <Text style={{ color: "#fff" }}>-${e.amount}</Text>
                      </View>
                    ))
                  : ""}
              </ScrollView>
            </View>
          </View>
        </View>
      </View>
      <AddIconButton />
    </View>
  );
};

const styles = StyleSheet.create({
  textColor: {
    color: "#fff",
    fontSize: 20,
  },
});

export default CategoryView;
