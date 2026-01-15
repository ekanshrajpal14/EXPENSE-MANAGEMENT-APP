import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync("expenses.db");

export const initDatabase = (): void => {
  // Enable foreign keys
  db.execSync("PRAGMA foreign_keys = ON;");

  db.execSync(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS expenses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      amount REAL NOT NULL,
      category_id INTEGER NOT NULL,
      date TEXT NOT NULL,
      name TEXT NOT NULL,
      FOREIGN KEY (category_id) REFERENCES categories(id)
    );
  `);
};

export const resetDatabase = (): void => {
  db.execSync("PRAGMA foreign_keys = OFF;");
  db.execSync(`
    DROP TABLE IF EXISTS expenses;
    DROP TABLE IF EXISTS categories;
  `);
  db.execSync("PRAGMA foreign_keys = ON;");
  initDatabase();
};
