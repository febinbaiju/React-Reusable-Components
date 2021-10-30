import { GOOGLE_MAPS_API_KEY } from "../constant/API_Settings";
import { api } from "./api/base";

function processJsonResponse(data, fields = ["id", "name"]) {
  let dataProcessedResponse = data?.map(function (obj) {
    obj["value"] = obj[fields[0]];
    obj["label"] = obj[fields[1]];
    delete obj[fields[0]];
    delete obj[fields[1]];
    return obj;
  });
  return dataProcessedResponse;
}

function convertISODateToDate(iso_date) {
  var date = new Date(iso_date);
  let months = {
    month_names: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    month_names_short: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  };
  return (
    months.month_names_short[date.getMonth()] +
    " " +
    date.getDate() +
    "," +
    date.getFullYear()
  );
}

function convertISODateToTime(iso_date) {
  var date = new Date(iso_date);
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return hours + ":" + minutes + " " + ampm;
}

function convertISODateToDateTime(iso_date_time) {
  return (
    convertISODateToDate(iso_date_time) +
    " " +
    convertISODateToTime(iso_date_time)
  );
}

function convertTo24HourFormat(time12h) {
  const [time, modifier] = time12h.split(" ");

  let [hours, minutes] = time.split(":");

  if (hours === "12") {
    hours = "00";
  }

  if (modifier === "PM") {
    hours = parseInt(hours, 10) + 12;
  }

  return `${hours}:${minutes}`;
}

function convertTo12HourFormat(time) {
  // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time,
  ];

  if (time.length > 1) {
    // If time format correct
    time = time.slice(1); // Remove full string match value
    time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join(""); // return adjusted time or original string
}

const getAddressFromCoordinates = async (lat, long) => {
  let address = await api.get(
    "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
      lat +
      "," +
      long +
      "&key=" +
      GOOGLE_MAPS_API_KEY
  );

  return (
    address?.[1]?.results[0]?.address_components[1]?.long_name ||
    address?.[1]?.results[0]?.address_components[0]?.long_name
  );
};

export {
  processJsonResponse,
  getAddressFromCoordinates,
  convertTo12HourFormat,
  convertTo24HourFormat,
  convertISODateToDate,
  convertISODateToTime,
  convertISODateToDateTime,
};
