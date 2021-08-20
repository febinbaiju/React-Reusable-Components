import { useMemo } from "react";
import DataListFromApi from "../components/lists/data_list/DataList";

export default function Test5(props) {
  let headers = useMemo(
    () => [
      // { label: "ID", value: "user_id" },
      { label: "First Name", value: "first_name" },
      { label: "Middle Name", value: "middle_name" },
      { label: "Last Name", value: "last_name" },
    ],
    []
  );

  return (
    <>
      <DataListFromApi
        api={"/api/list"}
        headers={headers}
        id={"user_id"}
        uiPath="/list_page/view/"
      />
    </>
  );
}
