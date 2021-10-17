import React from "react";

const urlRegex = new RegExp("^https?:\\/\\/\\S+$");
const isUrl = (str) => urlRegex.test(str);

class Api {
  constructor() {
    this.url = "http://localhost:8000";
  }

  async get(path, headers = {}, timeout = 10000) {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), timeout);
    var success = false;
    const response = await fetch(this.getApiUrl(path), {
      method: "GET",
      mode: "cors",
      signal: controller.signal,
      referrerPolicy: "origin",
      headers: headers,
    });

    if (response.ok) {
      success = true;
      let data = await response.json();
      return [true, data];
    } else {
      return [success, null];
    }
  }

  getApiUrl(path) {
    return isUrl(path) ? path : this.url + path;
  }
}

export const api = new Api();
