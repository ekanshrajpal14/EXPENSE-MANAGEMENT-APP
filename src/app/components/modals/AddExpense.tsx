/* eslint-disable react-hooks/exhaustive-deps */
import { ExpenseContext } from "@/src/context/ExpenseContext";
import { addExpense, fetchAllCategory } from "@/src/database/expense.service";
import { Category } from "@/src/types/expense";
import { Picker } from "@react-native-picker/picker";
import React, { useContext, useEffect, useState } from "react";
import { Alert, Modal, Pressable, Text, TextInput, View } from "react-native";
interface AddExpenseProps {
  handleCrossClick: () => void;
  category_id?: number;
  datafetch?: () => void;
}

const AddExpense: React.FC<AddExpenseProps> = ({ handleCrossClick, category_id = 1, datafetch }) => {
  const [form, setForm] = useState<{
    name: string;
    amount: number | null;
    category_id: number | null;
  }>({
    name: "",
    amount: null,
    category_id: null,
  });
  const { selectedDate, fetchCategories } = useContext(ExpenseContext);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCate = async () => {
    try {
      const data = await fetchAllCategory();
      console.log(data);
      if (data.length > 0) {
        setForm({ ...form, category_id: 1 });
      }
      setAllCategories(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCate();
  }, []);

  const addExpenseEntry = async () => {
    if (!form.amount || !form.category_id || !form.name || form.name.trim() === "") {
      Alert.alert("Error Occured", `${!form.category_id ? "Please Create the category first" : "Please fill the data in the form"}`);
      return;
    }
    try {
      await addExpense(form.amount, form.category_id, selectedDate, form.name.trim());
      fetchCategories();
      handleCrossClick();
      if (datafetch) datafetch();
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
        }}>
        {loading ? (
          <View style={{ width: 300, height: 200, backgroundColor: "#cacaca", padding: 15, borderRadius: 10, position: "relative" }}>
            <Text>Loading...</Text>
          </View>
        ) : (
          <View style={{ width: 300, backgroundColor: "#cacaca", padding: 15, borderRadius: 10, position: "relative" }}>
            <Text style={{ fontSize: 20 }}>Create Expense</Text>
            <Text style={{ fontSize: 17, marginTop: 20 }}>Expence Name</Text>
            <TextInput
              placeholder="Enter name"
              style={{ borderWidth: 1, borderRadius: 10, padding: 10, marginTop: 5 }}
              onChangeText={(text) => setForm({ ...form, name: text })}
            />
            <Text style={{ fontSize: 17, marginTop: 20 }}>Spend Amount</Text>
            <TextInput
              placeholder="Enter amount"
              keyboardType="numeric"
              style={{ borderWidth: 1, borderRadius: 10, padding: 10, marginTop: 5 }}
              onChangeText={(text) => setForm({ ...form, amount: parseFloat(text) || 0 })}
            />
            {allCategories && allCategories.length > 0 ? (
              <>
                <Text style={{ marginTop: 20, fontSize: 17 }}>Select Category</Text>
                <Picker
                  selectedValue={category_id}
                  onValueChange={(itemValue) => {
                    if (!itemValue) return;
                    setForm({ ...form, category_id: itemValue });
                  }}
                  style={{ maxHeight: 400, marginTop: -5 }}>
                  {allCategories.map((cat: any) => (
                    <Picker.Item
                      key={cat.id}
                      label={cat.name}
                      value={cat.id}
                    />
                  ))}
                </Picker>
              </>
            ) : (
              <Text style={{ paddingTop: 10, color: "red" }}>Please create the category first</Text>
            )}
            <View style={{ flexDirection: "row-reverse", paddingTop: 20, gap: 10 }}>
              <Pressable
                onPress={addExpenseEntry}
                style={{ paddingHorizontal: 10, paddingVertical: 5, backgroundColor: "#acff68", borderRadius: 20 }}>
                <Text>Confirm</Text>
              </Pressable>
              <Pressable
                onPress={handleCrossClick}
                style={{ paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 }}>
                <Text>Cancel</Text>
              </Pressable>
            </View>
          </View>
        )}
      </View>
    </Modal>
  );
};

export default AddExpense;
