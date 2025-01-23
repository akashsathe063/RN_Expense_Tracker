import { createContext, useReducer, useState } from "react";

// export const DUMMY_EXPENSES = [
//   {
//     id: "e1",
//     description: "A pair of shoes",
//     amount: 59.99,
//     date: new Date("2025-01-15"),
//   },
//   {
//     id: "e2",
//     description: "A pair of trousers",
//     amount: 89.25,
//     date: new Date("2024-04-24"),
//   },
//   {
//     id: "e3",
//     description: "Some Apples",
//     amount: 50.0,
//     date: new Date("2025-01-14"),
//   },
//   {
//     id: "e4",
//     description: "A Book",
//     amount: 289.25,
//     date: new Date("2024-02-19"),
//   },
//   {
//     id: "e5",
//     description: "A Birthdar Gift",
//     amount: 89.25,
//     date: new Date("2024-04-24"),
//   },
//   {
//     id: "e6",
//     description: "A pair of shoes",
//     amount: 59.99,
//     date: new Date("2025-01-15"),
//   },
//   {
//     id: "e7",
//     description: "A pair of trousers",
//     amount: 89.25,
//     date: new Date("2024-04-24"),
//   },
//   {
//     id: "e8",
//     description: "Some Apples",
//     amount: 50.0,
//     date: new Date("2025-01-20"),
//   },
//   {
//     id: "e9",
//     description: "A Book",
//     amount: 289.25,
//     date: new Date("2024-02-19"),
//   },
//   {
//     id: "e10",
//     description: "A Birthdar Gift",
//     amount: 89,
//     date: new Date("2025-01-18"),
//   },
// ];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
  setExpenses: (expenses) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      // const id = new Date().toString() + Math.random().toString();
      return [action.payload, ...state];
    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );

      const updatableExpense = state[updatableExpenseIndex];
      const updateItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updateItem;
      return updatedExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    case "SET":
      const inverted = action.payload.reverse();
      return inverted;
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  /**
   * useReducer() hook also used for state management
   * but which can be very useful if u have more complex state management
   */
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  function setExpenses(expenses) {
    dispatch({ type: "SET", payload: expenses });
  }
  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
    setExpenses: setExpenses,
  };
  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}
export default ExpensesContextProvider;
