function validateNumber(strNumber) {
  var regExp = new RegExp("^\\d+$");
  var isValid = regExp.test(strNumber);
  return isValid;
}

function convertFieldName(str) {
  var splitStr = str.replace(/_/g, " ").toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(" ");
}

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validateFloatNumber(number, limit = 2) {
  const re = /^\d*[\.,]\d*(?:,\d*[\.,]\d*)*$/;
  return re.test(number);
}

function stringToRegex(s, m) {
  return (m = s.match(/^([\/~@;%#'])(.*?)\1([gimsuy]*)$/))
    ? new RegExp(
        m[2],
        m[3]
          .split("")
          .filter((i, p, s) => s.indexOf(i) === p)
          .join("")
      )
    : new RegExp(s);
}

export {
  convertFieldName,
  validateNumber,
  validateEmail,
  validateFloatNumber,
  stringToRegex,
};
