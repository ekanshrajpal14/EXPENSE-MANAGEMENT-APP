export interface DateItem {
  key: string; // YYYY-MM-DD
  date: Date;
  label: string;
  isToday: boolean;
}

export const generateDateRange = (range = 30): DateItem[] => {
  const dates: DateItem[] = [];
  const today = new Date();
  const todayKey = today.toISOString().split("T")[0];

  for (let i = -range; i <= range; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);

    const key = d.toISOString().split("T")[0];

    dates.push({
      key,
      date: d,
      label: d.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
      }),
      isToday: key === todayKey,
    });
  }

  return dates;
};
