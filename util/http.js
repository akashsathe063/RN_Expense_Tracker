import axios from "axios";
const BASE_URL =
  "https://react-native-expense-tra-cd131-default-rtdb.firebaseio.com";
export async function storeExpense(expensedata) {
  const response = await axios.post(
    "https://react-native-expense-tra-cd131-default-rtdb.firebaseio.com/expenses.json",
    expensedata
  );
  const id = response.data.name;
  return id;
}

export async function fetchExpenses() {
  const response = await axios.get(
    "https://react-native-expense-tra-cd131-default-rtdb.firebaseio.com/expenses.json"
  );

  const expenses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }

  return expenses;
}

//We use backtick `` to create such a template literal in javascript
export function updateExpense(id, expenseData) {
  return axios.put(BASE_URL + `/expenses/${id}.json`, expenseData);
}

export function deleteExpense(id) {
  return axios.delete(BASE_URL + `/expenses/${id}.json`);
}
