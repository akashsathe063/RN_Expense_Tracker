import { Text, View } from "react-native";
import ExpensesOutPut from "../components/expensesoutput/ExpensesOutPut";
import { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import LoadingOverLay from "../components/ui/LoadingOverLay";
import ErrorOverLay from "../components/ui/ErrorOverLay";

function RecentExpenses() {
  const [isFetching, setisFetching] = useState(true);
  const [error, setError] = useState();
  const expensesContext = useContext(ExpensesContext);
  useEffect(() => {
    async function getExpenses() {
      setisFetching(true);
      try {
        const expenses = await fetchExpenses();
        expensesContext.setExpenses(expenses);
      } catch (error) {
        setError("Could not fetch expenses!");
      }
      setisFetching(false);
    }
    getExpenses();
  }, []);

  function errorHandler() {
    setError(null);
  }

  if (error && !isFetching) {
    return <ErrorOverLay message={error} onConfirm={errorHandler} />;
  }

  if (isFetching) {
    return <LoadingOverLay />;
  }

  const recentExpenses = expensesContext.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date > date7DaysAgo && expense.date <= today;
  });
  return (
    <ExpensesOutPut
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText="No expenses registered"
    />
  );
}

export default RecentExpenses;
