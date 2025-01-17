import { FlatList } from "react-native";
import ExpenseItem from "./ExpenseItem";

function renderExpenseItem(itemData) {
  return <ExpenseItem {...itemData.item} />;
}

function ExpensesList({ expensesList }) {
  return (
    <FlatList
      data={expensesList}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => {
        item.id;
      }}
    />
  );
}

export default ExpensesList;
