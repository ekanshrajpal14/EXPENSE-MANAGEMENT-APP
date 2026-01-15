import { Stack } from "expo-router";
import { View } from "react-native";
import { ExpenseProvider } from "../context/ExpenseContext";
import Month from "./components/Month";

export default function RootLayout() {
  return (
    <ExpenseProvider>
      <Month />
      <View style={{ flex: 1, backgroundColor: "#3c3c3c" }}>
        <Stack>
          <Stack.Screen
            name="index"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="categoryView"
            options={{ headerShown: false }}
          />
        </Stack>
      </View>
    </ExpenseProvider>
  );
}
