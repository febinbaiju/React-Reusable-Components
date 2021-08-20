export default function RadioGroup(props)
{
    return(
        <>
        {
            props?.data?.map((item, index) => {
                return(<>{item?.label} <input type="radio" value={props?.value} name={props?.name} /></>)
            })
        }
        </>
    )
}