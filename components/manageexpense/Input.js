import { StyleSheet, Text, TextInput, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function Input({ lable, style, textInputConfig }) {
  let inputStyle = [styles.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyle.push(styles.inputMultiline);
  }

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={styles.lable}>{lable}</Text>
      <TextInput style={inputStyle} {...textInputConfig} />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 16,
  },
  lable: {
    fontSize: 14,
    color: GlobalStyles.Colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.Colors.primary100,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: GlobalStyles.Colors.primary700,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
});
