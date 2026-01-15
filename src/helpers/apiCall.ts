import { fetchBalanceOfDayBased } from "../database/expense.service";

export const datafetch = async (selectedDate: string) => {
  try {
    const fetchBalance: { balance: number } | null = await fetchBalanceOfDayBased(selectedDate);
    return fetchBalance?.balance || 0;
  } catch (error) {
    console.log(error);
  }
};
