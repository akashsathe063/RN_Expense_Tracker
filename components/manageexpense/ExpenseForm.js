import { StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../ui/Button";
import { getFormattedDate } from "../../util/date";

function ExpenseForm({ oncancel, onSubmit, isEditing, defaultValues }) {
  const [inputValues, setInputValues] = useState({
    amount: defaultValues ? defaultValues.amount.toString() : "",
    date: defaultValues ? getFormattedDate(defaultValues.date) : "",
    description: defaultValues ? defaultValues.description : "",
  });

  function inputChagedHandler(inputIdentifier, enterdValue) {
    setInputValues((currentInputValues) => {
      return { ...currentInputValues, [inputIdentifier]: enterdValue };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputValues.amount,
      date: new Date(inputValues.date),
      description: inputValues.description,
    };
    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;
    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      return;
    }

    onSubmit(expenseData);
  }
  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputRow}>
        <Input
          lable="Amount"
          style={styles.rowInput}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChagedHandler.bind(this, "amount"),
            value: inputValues.amount,
          }}
        />
        <Input
          lable="Date"
          style={styles.rowInput}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChagedHandler.bind(this, "date"),
            value: inputValues.date,
          }}
        />
      </View>

      <Input
        lable="Description"
        textInputConfig={{
          multiline: true,
          //   autoCapitalize: "none",
          //   autoCorrect:false // default is true
          onChangeText: inputChagedHandler.bind(this, "description"),
          value: inputValues.description,
        }}
      />
      <View style={styles.buttons}>
        <Button mode="flat" onPress={oncancel} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={submitHandler} style={styles.button}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },

  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    marginVertical: 24,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
    overflow: "hidden",
  },
});
