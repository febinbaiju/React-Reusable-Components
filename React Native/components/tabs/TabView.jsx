import React, { useState } from "react";
import { Text, View } from "react-native";

const TabView = (props) => {

  const [currentTab, setCurrentTab] = useState(props?.defaultTab || 0);

  const [commonStyles] = useState({
    fontFamily: "inter-bold",
    textAlign: "center",
    padding: 10,
  });

  const tabSwitch = (tabID) => {
    setCurrentTab(tabID);
  };

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          display: "flex",
        }}
      >
        {props?.tabs?.map((tab, tabIndex) => {
          return (
            <View
              key={tabIndex}
              style={{
                flex: 1,
                ...(tabIndex === currentTab
                  ? { borderBottomWidth: 2, borderBottomColor: "#24a0ed" }
                  : null),
              }}
            >
              <Text
                {...(tabIndex === 0
                  ? {
                      style: {
                        ...commonStyles,
                        textAlign: "left",
                      },
                    }
                  : tabIndex === 1
                  ? {
                      style: {
                        ...commonStyles,
                        textAlign: "center",
                      },
                    }
                  : {
                      style: {
                        ...commonStyles,
                        textAlign: "right",
                      },
                    })}
                onPress={() => {
                  tabSwitch(tabIndex);
                }}
              >
                {tab?.label}
              </Text>
            </View>
          );
        })}
      </View>
      {props?.tabs[currentTab]?.scene()}
    </>
  );
};

export default TabView;
