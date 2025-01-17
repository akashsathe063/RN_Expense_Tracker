import { Text, View } from "react-native";
import ExpensesOutPut from "../components/expensesoutput/ExpensesOutPut";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";

function AllExpenses() {
  const expensesContext = useContext(ExpensesContext);
  return (
    <ExpensesOutPut
      expenses={expensesContext.expenses}
      expensesPeriod="Total"
      fallbackText="No registered expenses found!"
    />
  );
}

export default AllExpenses;
