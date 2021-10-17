import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function FieldWithIcon(props) {
  return (
    <View style={[styles.inputContainer, props?.style ? props?.style : {}]}>
      {props?.left && (
        <Ionicons
          style={{
            position: "absolute",
            top: 15,
            left: 10,
          }}
          name={props?.icon ? props?.icon : "search"}
          color={props?.iconColor ? props?.iconColor : "black"}
          size={props?.iconSize ? props?.iconSize : 14}
        />
      )}
      <TextInput
        style={styles.inputStyle}
        {...(props?.placeholder ? { placeholder: props?.placeholder } : null)}
        value={props?.value || ""}
        {...(props?.onChangeText
          ? { onChangeText: props?.onChangeText }
          : null)}
      />
      {!props?.left && (
        <Ionicons
          style={{
            position: "absolute",
            top: 15,
            right: 10,
          }}
          name={props?.icon ? props?.icon : "search"}
          color={props?.iconColor ? props?.iconColor : "black"}
          size={props?.iconSize ? props?.iconSize : 14}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    paddingBottom: 10,
    borderColor: "#000",
  },
  inputStyle: {
    flex: 1,
    justifyContent: "flex-end",
    paddingLeft: 40,
    color: "#505050",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    fontSize: 16,
    borderRadius: 6,
  },
});
