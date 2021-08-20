import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { api } from "../../../lib/api/base";

export default function DataListFromApi(props) {
  const [apiQuery, setApiQuery] = useState(props?.api);
  const [id, setID] = useState(props?.id || "id");
  const [response, setResponse] = useState();
  const [showTable, setShowTable] = useState(false);
  const [dataPath, setDataPath] = useState(props?.dataPath || "data");
  const [uiPath, setUiPath] = useState(props?.uiPath);
  const history = useHistory();

  useEffect(() => {
    api
      .get(apiQuery)
      .then(([success, response]) => {
        if (success) {
          setResponse(response);
        } else {
          setResponse([]);
        }
      })
      .catch((err) => {
        setResponse([]);
        console.log(err);
      });
  }, [apiQuery]);

  useEffect(() => {
    if (response && response?.[dataPath] && response?.[dataPath].length > 0) {
      setShowTable(true);
    } else {
      setShowTable(false);
    }
  }, [response, dataPath]);

  const onDoubleClick = (e, id) => {
    console.log(id);
    history.push(uiPath + id);
  };

  return (
    showTable && (
      <table>
        <thead>
          <tr>
            {props?.headers?.map((head, index) => {
              return <td>{head.label}</td>;
            })}
          </tr>
        </thead>
        <tbody>
          {response?.[dataPath]?.map((item, key) => {
            return (
              <tr key={key}>
                {props?.headers?.map((head, index) => {
                  return (
                    <td
                      key={index}
                      onDoubleClick={(e) => onDoubleClick(e, item[id])}
                    >
                      {item[head.value]}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    )
  );
}

DataListFromApi.propTypes = {
  headers: PropTypes.array.isRequired,
  api: PropTypes.string.isRequired,
  dataPath: PropTypes.string,
  uiPath: PropTypes.string.isRequired,
  id: PropTypes.string,
};
