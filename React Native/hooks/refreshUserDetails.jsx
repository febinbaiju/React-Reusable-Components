import React, { useContext } from "react";
import { Image } from "react-native";
import constants from "../constant/constants";
import { getData } from "../lib/api/keyStorage";
import AuthContext from "../lib/auth_context";
import { getProfileData } from "../lib/optimization_helpers";

export default function useRefreshUserDetails() {
  const { UserDetails } = useContext(AuthContext);

  async function profileUpdate(isFocused) {
    if (isFocused) {
      const userToken = await getData();
      if (userToken) {
        let profile_details = await getProfileData();
        let user_photo = profile_details[1]?.user_photo?.path || "";
        if (user_photo) await Image.prefetch(user_photo); //caching
        await UserDetails({
          token: userToken,
          isLoggedIn: true,
          name: profile_details[1]?.name || "",
          email: profile_details[1]?.email || "",
          photo: user_photo || constants.DEFAULT_AVATAR_PIC,
          address: profile_details[1]?.address || "",
          pincode: profile_details[1]?.pincode || "",
          phone: profile_details[1]?.phone || "",
          country: profile_details[1]?.get_country?.name || "",
          state: profile_details[1]?.get_state?.name || "",
          city: profile_details[1]?.get_city?.name || "",
          role_id: profile_details[1]?.role_id || "",
          id: profile_details[1]?.id || "",
        });
        return {
          loaded: true,
          isLoggedIn: true,
        };
      } else {
        return {
          loaded: true,
          isLoggedIn: false,
        };
      }
    } else {
      return {
        loaded: true,
        isLoggedIn: false,
      };
    }
  }

  return [profileUpdate];
}
