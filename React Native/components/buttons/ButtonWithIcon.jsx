import React from "react";
import { Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { TouchableHighlight } from "react-native";

export default function ButtonWithIcon(props) {
  return (
    <TouchableHighlight>
      <Button
        mode="contained"
        style={[
          props?.style ? props?.style : {},
          {
            backgroundColor: "white",
            borderRadius: 10,
          },
        ]}
        onPress={props?.onPress}
      >
        <Ionicons
          name={props?.icon ? props?.icon : "search"}
          color={props?.iconColor ? props?.iconColor : "black"}
          size={props?.iconSize ? props?.iconSize : 14}
        />
      </Button>
    </TouchableHighlight>
  );
}
