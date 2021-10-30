import React from "react";
import { StyleSheet, Text } from "react-native";
import { View } from "react-native";
import Modal from "react-native-modal";

export default function HalfScreenModal(props) {
  return (
    <Modal
      testID={"modal"}
      isVisible={props?.show}
      onSwipeComplete={() => props?.setShow(false)}
      swipeDirection={["down"]}
      style={styles.view}
      animationOutTiming={250}
      useNativeDriver={true}
      onBackButtonPress={() => props?.setShow(false)}
      onBackdropPress={() => props?.setShow(false)}
    >
      <View style={styles.content}>
        <View
          style={{
            backgroundColor: "red",
          }}
        ></View>
        {props?.children}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  view: {
    justifyContent: "flex-end",
    margin: 0,
  },
  content: {
    backgroundColor: "white",
    borderRadius: 18,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
});
