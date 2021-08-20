export default function RadioGroup(props)
{
    return(
        <>
        <input type="radio" name={props?.name} />
        <input type="radio" name={props?.name} />
        <input type="radio" name={props?.name} />
        </>
    )
}