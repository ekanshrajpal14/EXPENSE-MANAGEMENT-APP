/* eslint-disable react-hooks/exhaustive-deps */
import { router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { ExpenseContext } from "../context/ExpenseContext";
import { datafetch } from "../helpers/apiCall";
import AddIconButton from "./components/AddIconButton";
import Balance from "./components/Balance";
import Category from "./components/Category";
import AddExpense from "./components/modals/AddExpense";
import CategoryModal from "./components/modals/CategoryModal";

export default function Index() {
  const { categories, selectedDate } = useContext(ExpenseContext);
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [openFormModal, setOpenFormModal] = useState(false);
  const [balance, setBalance] = useState(0);
  const [addNewExpense, setAddNewExpense] = useState<number>(1);

  useEffect(() => {
    fetchBalance();
  }, [selectedDate]);

  const fetchBalance = async () => {
    const d = await datafetch(selectedDate);
    if (d) setBalance(d);
    else setBalance(0);
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#3c3c3c" }}>
      <View style={{ flex: 1, padding: 10, paddingTop: 50 }}>
        <View>{/* <Month /> */}</View>

        <Balance balance={balance} />
        <View style={{ height: 100 }} />
        <View style={{ padding: 20, flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
            <Text style={{ color: "#fff", marginLeft: 10 }}>Create New category</Text>
            <Pressable onPress={() => setOpenCategoryModal(true)}>
              <Text style={{ color: "#fff", fontSize: 30 }}>+</Text>
            </Pressable>
          </View>

          <ScrollView
            style={{ marginTop: 20 }}
            contentContainerStyle={{ gap: 15, paddingBottom: 120 }}
            showsVerticalScrollIndicator={false}>
            {categories.length > 0 &&
              categories.map((e, key) => (
                <Category
                  key={key}
                  category={e?.name || ""}
                  totalSpent={e?.totalExp || 0}
                  onClick={() =>
                    router.push({
                      pathname: "/categoryView",
                      params: {
                        categoryId: e.id,
                        categoryName: e.name,
                        balance: balance,
                      },
                    })
                  }
                  onPlusClick={() => {
                    setAddNewExpense(e.id);
                    setOpenFormModal(true);
                  }}
                />
              ))}
          </ScrollView>
        </View>
      </View>

      {/* fixedd button */}
      <AddIconButton handleButtonClick={() => setOpenFormModal(true)} />

      {openCategoryModal && <CategoryModal onCrossClick={() => setOpenCategoryModal(false)} />}

      {openFormModal && (
        <AddExpense
          handleCrossClick={() => setOpenFormModal(false)}
          category_id={addNewExpense}
          datafetch={fetchBalance}
        />
      )}
    </View>
  );
}
