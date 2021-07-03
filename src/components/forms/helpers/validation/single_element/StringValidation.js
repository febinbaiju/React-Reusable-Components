import * as Yup from 'yup';

export function EqualStringField(compare_with, message, case_sensitive = true)
{

    var args = [compare_with, message]

    return Yup.string().test("EqualStringField", args, function(value)
    {
        const { path, createError } = this;

        if(value)
        {
            if(!case_sensitive)
            {
                args[0] = args[0].toString().toLowerCase()
                value = value.toString().toLowerCase()
            }
            
            if (args[0].toString().localeCompare(value) !== 0) {
                return createError({ path, message: args[1] });
            }
        }
        
        return true;
    })
}

export function NotEqualStringField(compare_with, message, case_sensitive = true)
{

    var args = [compare_with, message]

    return Yup.string().test("NotEqualStringField", args, function(value)
    {
        const { path, createError } = this;

        if(value)
        {
            if(!case_sensitive)
            {
                args[0] = args[0].toString().toLowerCase()
                value = value.toString().toLowerCase()
            }
            
            if (args[0].toString().localeCompare(value) === 0) {
                return createError({ path, message: args[1] });
            }
        }
        
        return true;
    })
}


export function EqualRegexStringField(regex, message)
{

    var args = [regex, message]

    return Yup.string().test("EqualRegexStringField", args, function(value)
    {
        const { path, createError } = this;

        if(value)
        {
            if (!new RegExp(args[0]).test(value)) {
                return createError({ path, message: args[1] });
            }
        }
        
        return true;
    })
}


export function NotEqualRegexStringField(regex, message)
{

    var args = [regex, message]

    return Yup.string().test("NotEqualRegexStringField", args, function(value)
    {
        const { path, createError } = this;

        if(value)
        {
            if (new RegExp(args[0]).test(value)) {
                return createError({ path, message: args[1] });
            }
        }
        return true;
    })
}