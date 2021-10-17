export function EqualStringField(
  compare_with,
  message,
  case_sensitive = true,
  obj
) {
  var args = [compare_with, message];

  return obj.test("EqualStringField", args, function (value) {
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

export function NotEqualStringField(
  compare_with,
  message,
  case_sensitive = true,
  obj
) {
  var args = [compare_with, message];

  return obj.test("NotEqualStringField", args, function (value) {
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

export function EqualRegexStringField(regex, message, obj) {
  var args = [regex, message];

  return obj.test("EqualRegexStringField", args, function (value) {
    const { path, createError } = this;

    if (value) {
      if (!new RegExp(args[0]).test(value)) {
        return createError({ path, message: args[1] });
      }
    }

    return true;
  });
}

export function NotEqualRegexStringField(regex, message, obj) {
  var args = [regex, message];

  return obj.test("NotEqualRegexStringField", args, function (value) {
    const { path, createError } = this;

    if (value) {
      if (new RegExp(args[0]).test(value)) {
        return createError({ path, message: args[1] });
      }
    }
    return true;
  });
}
