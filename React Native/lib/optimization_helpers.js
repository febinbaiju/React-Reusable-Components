import { api } from "./api/base";
import { getDetailsAPI } from "./helpers";

async function getProfileData() {
  let apiString = await getDetailsAPI();
  let profile_details = await api.get(apiString);
  return profile_details;
}

export { getProfileData };
