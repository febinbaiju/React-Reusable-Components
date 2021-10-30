import * as SecureStore from "expo-secure-store";

const storeData = async (value, key = "userToken") => {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (e) {
    console.log(e);
  }
};

const getData = async (key = "userToken") => {
  try {
    const value = await SecureStore.getItemAsync(key);
    return value;
  } catch (e) {
    // error reading value
    return null;
  }
};

const clearData = async (key = "userToken") => {
  const ret = await SecureStore.deleteItemAsync(key);
  return true;
};

export { getData, storeData, clearData };
