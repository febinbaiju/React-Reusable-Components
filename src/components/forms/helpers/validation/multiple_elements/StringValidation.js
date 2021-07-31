import * as Yup from "yup";

export function EqualStringFields(
  compare_with,
  message,
  case_sensitive = true
) {
  var args = [compare_with, message];

  return Yup.string().test("EqualStringFields", args, function (value) {
    const { path, createError } = this;

    if (value) {
      if (!case_sensitive) {
        args[0] = args[0].toString().toLowerCase();
        value = value.toString().toLowerCase();
      }

      if (args[0].toString().localeCompare(value) !== 0) {
        return createError({ path, message: args[1] });
      }
    }

    return true;
  });
}

export function NotEqualStringFields(
  compare_with,
  message,
  case_sensitive = true
) {
  var args = [compare_with, message];

  return Yup.string().test("NotEqualStringFields", args, function (value) {
    const { path, createError } = this;

    if (value) {
      if (!case_sensitive) {
        args[0] = args[0].toString().toLowerCase();
        value = value.toString().toLowerCase();
      }

      if (args[0].toString().localeCompare(value) === 0) {
        return createError({ path, message: args[1] });
      }
    }

    return true;
  });
}
