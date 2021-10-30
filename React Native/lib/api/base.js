import { API_URL } from "../../constant/API_Settings";
import { getData } from "./keyStorage";

const urlRegex = new RegExp("^https?:\\/\\/\\S+$");
const isUrl = (str) => urlRegex.test(str);

class Api {
  constructor() {
    this.url = API_URL;
  }

  async get(path, auth = true, headers = {}, timeout = 10000) {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), timeout);
    var success = false;
    const token = await getData();
    const response = await fetch(this.getApiUrl(path), {
      method: "GET",
      mode: "cors",
      signal: controller.signal,
      referrerPolicy: "origin",
      headers: {
        Accept: "application/json",
        ...(auth ? { Authorization: "Bearer " + token } : null),
        ...headers,
      },
    });

    if (response.ok) {
      success = true;
      let data = await response.json();
      return [true, data];
    } else {
      return [success, null];
    }
  }

  async post(path, body = {}, auth = true, headers = {}, timeout = 10000) {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), timeout);
    var success = false;

    const token = await getData();

    const response = await fetch(this.getApiUrl(path), {
      method: "POST",
      headers: {
        mode: "cors",
        signal: controller.signal,
        referrerPolicy: "origin",
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(auth ? { Authorization: "Bearer " + token } : null),
        "X-Requested-With": "XMLHttpRequest",
        ...headers,
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      success = true;
      let data = await response.json();
      return [true, data];
    } else {
      return [success, null];
    }
  }

  async file(
    path,
    body = null,
    field_name = "file",
    auth = true,
    timeout = 10000
  ) {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), timeout);

    let localUri = body.uri;
    let filename = localUri.split("/").pop();

    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    const token = await getData();

    let formData = new FormData();
    formData.append(field_name, { uri: localUri, name: filename, type });

    let options = {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        ...(auth ? { Authorization: "Bearer " + token } : null),
      },
    };
    let response = await fetch(this.getApiUrl(API_URL + path), options);
    let result = await response.json();
    return result;
  }

  getApiUrl(path) {
    return isUrl(path) ? path : this.url + path;
  }
}

export const api = new Api();
