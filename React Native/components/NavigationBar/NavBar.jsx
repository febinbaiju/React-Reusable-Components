import React from "react";
import { Text, TouchableOpacity, SafeAreaView } from "react-native";
import { Entypo } from "@expo/vector-icons";
import bookWaterStyles from "../../styles/BookWater";
import AvatarPic from "../Avatar/Avatar";
import { StatusBar } from "expo-status-bar";

const NavBar = ({ title, navigation, profile_icon }) => {
  return (
    <>
      <StatusBar />
      <SafeAreaView
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 2,
        }}
      >
        <Entypo
          name="menu"
          size={24}
          color="black"
          onPress={() => navigation.toggleDrawer()}
        />
        <Text style={[bookWaterStyles.title, { flex: 3, textAlign: "center" }]}>
          {title}
        </Text>
        {profile_icon && (
          <TouchableOpacity
            onPress={() => navigation.navigate("profile_details")}
          >
            <AvatarPic
              style={{
                width: 32,
                borderRadius: 999,
                height: 32,
              }}
            />
          </TouchableOpacity>
        )}
      </SafeAreaView>
    </>
  );
};

export default NavBar;
