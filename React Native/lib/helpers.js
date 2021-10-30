import constants from "../constant/constants";
import { getData } from "./api/keyStorage";
import OrderStatusStyles from "../styles/OrderstatusStyles";
import { getDistance } from "geolib";

function getQuality(id) {
  return parseInt(id) === constants.ORDER_CATEGORY.BOOK_DRINKING_WATER
    ? "Drinking Water"
    : parseInt(id) === constants.ORDER_CATEGORY.COLLECT_TREATED_WATER
    ? "Treated Water"
    : parseInt(id) === constants.ORDER_CATEGORY.COLLECT_SEWAGE_OR_GREY_WATER
    ? "Sewage Water"
    : parseInt(id) === constants.ORDER_CATEGORY.BOOK_TREATED_WATER
    ? "Treated Water"
    : null;
}
function getOrderStatus(id) {
  return parseInt(id) === constants.ORDER_STATUS.PENDING
    ? "Pending"
    : parseInt(id) === constants.ORDER_STATUS.DELIVERED
    ? "Delivered"
    : parseInt(id) === constants.ORDER_STATUS.APPROVED
    ? "Accepted"
    : parseInt(id) === constants.ORDER_STATUS.DISPATCHED
    ? "Dispatched"
    : parseInt(id) === constants.ORDER_STATUS.ARRIVED_AT_LOCATION
    ? "Arrived at Location"
    : parseInt(id) === constants.ORDER_STATUS.WATING_FOR_OTP
    ? "Waiting for OTP"
    : parseInt(id) === constants.ORDER_STATUS.PAYMENT_AWATING
    ? "Payment Awaiting"
    : parseInt(id) === constants.ORDER_STATUS.PICKEDUP
    ? "Picked up"
    : parseInt(id) === constants.ORDER_STATUS.CANCELED
    ? "Cancelled"
    : parseInt(id) === constants.ORDER_STATUS.PAYMENT_FAILED
    ? "Payment failed"
    : parseInt(id) === constants.ORDER_STATUS.VERIFY_OTP
    ? "Verify OTP"
    : null;
}
function getOrderStyle(id) {
  return parseInt(id) === constants.ORDER_STATUS.PENDING
    ? OrderStatusStyles.pending
    : parseInt(id) === constants.ORDER_STATUS.DELIVERED
    ? OrderStatusStyles.delivered
    : parseInt(id) === constants.ORDER_STATUS.APPROVED
    ? OrderStatusStyles.Approved
    : parseInt(id) === constants.ORDER_STATUS.DISPATCHED
    ? OrderStatusStyles.delivered
    : parseInt(id) === constants.ORDER_STATUS.ARRIVED_AT_LOCATION
    ? OrderStatusStyles.delivered
    : parseInt(id) === constants.ORDER_STATUS.WATING_FOR_OTP
    ? OrderStatusStyles.delivered
    : parseInt(id) === constants.ORDER_STATUS.PAYMENT_AWATING
    ? OrderStatusStyles.delivered
    : parseInt(id) === constants.ORDER_STATUS.PICKEDUP
    ? OrderStatusStyles.delivered
    : parseInt(id) === constants.ORDER_STATUS.CANCELED
    ? OrderStatusStyles.canceled
    : parseInt(id) === constants.ORDER_STATUS.PAYMENT_FAILED
    ? OrderStatusStyles.canceled
    : parseInt(id) === constants.ORDER_STATUS.VERIFY_OTP
    ? OrderStatusStyles.delivered
    : null;
}

async function getDetailsAPI() {
  let role_id = await getData("ROLE_ID");
  if (
    parseInt(role_id) === constants.USER_ROLES.USER ||
    parseInt(role_id) === constants.USER_ROLES.CREDITED_USER
  ) {
    return "/user/get_detail";
  } else if (parseInt(role_id) === constants.USER_ROLES.VENDOR) {
    return "/vendor/get_detail";
  } else if (parseInt(role_id) === constants.USER_ROLES.AGENT_UNDER_VENDOR) {
    return "/agent/get_detail";
  } else if (parseInt(role_id) === constants.USER_ROLES.AGENT_WITH_TANKER) {
    return "/agent/get_detail";
  }
}

async function getUpdateAPI() {
  let role_id = await getData("ROLE_ID");
  if (
    parseInt(role_id) === constants.USER_ROLES.USER ||
    parseInt(role_id) === constants.USER_ROLES.CREDITED_USER
  ) {
    return "/user/register";
  } else if (parseInt(role_id) === constants.USER_ROLES.VENDOR) {
    return "/vendor/register";
  } else if (parseInt(role_id) === constants.USER_ROLES.AGENT_UNDER_VENDOR) {
    return "/agent_under_vendor/register";
  } else if (parseInt(role_id) === constants.USER_ROLES.AGENT_WITH_TANKER) {
    return "/agent/save";
  }
}

function breakLine(text) {
  return text.replaceAll(" ", "\n", text);
}

function timeSince(in_date) {
  var date = new Date(in_date);
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

function extractLatLong(latlong) {
  if (latlong) {
    var l = latlong.split(",");
    return [l[0].trim(), l[1].trim()];
  } else return [0, 0];
}

function calculateDistance(lati1, long1, lati2, long2) {
  let c1 = {
    latitude: parseFloat(lati1),
    longitude: parseFloat(long1),
  };
  let c2 = {
    latitude: parseFloat(lati2),
    longitude: parseFloat(long2),
  };
  var dist = getDistance(c1, c2);
  const dist_cal = `${dist / 1000}`;
  return dist_cal;
}

export {
  getQuality,
  breakLine,
  timeSince,
  extractLatLong,
  getDetailsAPI,
  getUpdateAPI,
  getOrderStatus,
  getOrderStyle,
  calculateDistance,
};
