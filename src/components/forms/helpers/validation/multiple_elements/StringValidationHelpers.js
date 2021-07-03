import * as Yup from 'yup';

export function EqualStringFields(compare_with, message)
{

    const args = [compare_with, message]

    return Yup.string().test("EqualStringFields", args, function(value)
    {
        const { path, createError } = this;

            if (args[0].toString().localeCompare(value) !== 0) {
                return createError({ path, message: args[1] });
              }
        
        return true;
    })
}

export function NotEqualStringFields(compare_with, message)
{

    const args = [compare_with, message]

    return Yup.string().test("NotEqualStringFields", args, function(value)
    {
        const { path, createError } = this;

            if (args[0].toString().localeCompare(value) === 0) {
                return createError({ path, message: args[1] });
              }
        
        return true;
    })
}