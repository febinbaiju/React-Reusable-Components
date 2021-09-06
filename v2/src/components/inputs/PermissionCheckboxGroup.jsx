import "../../../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
import { enableRipple } from "@syncfusion/ej2-base";
import { CheckBoxComponent } from "@syncfusion/ej2-react-buttons";
import { React, useMemo } from "react";
import "./PermissionCheckboxGroup.css";

enableRipple(true);

export default function CheckBox(props) {
  const data = useMemo(() => props?.data, [props?.data]);

  const onChange = (e) => {
    let value = parseInt(e?.event?.target?.value);
    let checked = e?.checked;

    var filtered = [...props?.value];

    if (props?.value?.includes(value) && !checked && value) {
      filtered = props?.value?.filter((e) => e !== value);
    }
    if (!props?.value?.includes(value) && checked && value) {
      filtered.push(parseInt(value));
    }
    props?.setValue((data2) => ({
      ...data2,
      [props?.name]: filtered,
    }));
  };

  return (
    <div>
      {data?.map((obj, key) => {
        return (
          <>
            <CheckBoxComponent
              cssClass="e-info p-2"
              change={onChange}
              name={props?.name}
              value={obj?.value}
              label={obj?.label}
              {...(props?.value?.includes(obj?.value)
                ? { checked: true }
                : { checked: false })}
            />
            {(key + 1) % 3 === 0 ? <br /> : null}
          </>
        );
      })}
    </div>
  );
}
