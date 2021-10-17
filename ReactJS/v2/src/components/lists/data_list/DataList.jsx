import { useState } from "react";
import { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { api } from "../../../lib/api/base";
import Button from "../../buttons/Button";
import lodash from "lodash";
import { GetPropertyValue } from "../../../lib/utils/transform";
import constants from "../../../config/constant";
import ConfirmationModal from "../../modals/ConfirmationModal";

export default function DataListFromApi(props) {
  const [apiQuery, setApiQuery] = useState(props?.api + "?page=1");
  const [id, setID] = useState(props?.id || "id");
  const [response, setResponse] = useState();
  const [showTable, setShowTable] = useState();
  const [dataPath, setDataPath] = useState(props?.dataPath || "data");
  const [uiPath, setUiPath] = useState(props?.uiPath);
  const history = useHistory();

  // filter options
  const [vendorList, setVendorList] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    role_id: "",
    vendor_id: "",
  });

  const [modalController, setModalController] = useState({
    show: false,
    title: "",
    confirmation: "",
  });

  const [searchKeyword, setSearchKeyword] = useState();
  const [status, setStatus] = useState(1);
  const [searchInputValue, setSearchInputValue] = useState();
  const [change, setChange] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [pages, setpages] = useState({
    current_page: 1,
    last_page: 0,
    total_pages: 0,
    pagination_item: [],
    total_pages: 0,
  });

  useEffect(() => {
    setIsLoading(true);
    props?.setLoading(true);
    api
      .post(
        apiQuery,
        {
          search_keyword: searchKeyword,
          ...(status !== 3 ? { status: status } : { profile_status: 1 }),
        },
        true
      )
      .then(([success, response]) => {
        if (success) {
          setResponse(response);
          var total_pages = response.data.last_page;
          var items = [];
          var page = response?.data?.current_page;
          for (let number = 1; number <= total_pages; number++) {
            number === page
              ? items.push(
                  <li key={number} className="page-item active">
                    <a
                      className="page-link"
                      onClick={() => handlePagination(number)}
                    >
                      {number}
                    </a>
                  </li>
                )
              : items.push(
                  <li key={number} className="page-item">
                    <a
                      className="page-link"
                      onClick={() => handlePagination(number)}
                    >
                      {number}
                    </a>
                  </li>
                );
          }

          setpages({
            ...pages,
            current_page: response?.data?.current_page,
            last_page: response?.data?.last_page,
            total_pages: response?.data?.last_page,
            pagination_items: items,
          });
        } else {
          setResponse([]);
        }
        props?.setLoading(false);
      })
      .catch((err) => {
        props?.setLoading(false);
        setResponse([]);
        console.log(err);
      });
    setIsLoading(false);
  }, [apiQuery, searchKeyword, status, change]);

  const handleFilter = (e, type) => {
    switch (type) {
      case "vendor_selection":
        setApiQuery(
          props?.api +
            "?page=1&" +
            (e?.target?.value ? "vendor_id=" + e?.target?.value : "")
        );
        setFilterOptions((data) => ({
          ...data,
          vendor_id: e?.target?.value || "",
        }));
        break;
      case "user_selection":
        setApiQuery(
          props?.api +
            "?page=1&" +
            (e?.target?.value ? "role_id=" + e?.target?.value : "")
        );
        setFilterOptions((data) => ({
          ...data,
          role_id: e?.target?.value || "",
        }));
        break;
      case "vendor_type_selection":
        setApiQuery(
          props?.api +
            "?page=1&" +
            (e?.target?.value ? "role_id=" + e?.target?.value : "")
        );
        setFilterOptions((data) => ({
          ...data,
          role_id: e?.target?.value || "",
        }));
        break;
      case "agent_selection":
        setApiQuery(
          props?.api +
            "?page=1&" +
            (e?.target?.value ? "role_id=" + e?.target?.value : "")
        );
        setFilterOptions((data) => ({
          ...data,
          role_id: e?.target?.value || "",
        }));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (props?.AgentUnderVendorFilter) {
      props?.setLoading(true);
      api
        .post(
          "/api/vendor/get_vendors",
          {
            status: 1,
          },
          true
        )
        .then(([success, response]) => {
          props?.setLoading(false);
          setVendorList(response);
        })
        .catch((err) => {
          props?.setLoading(false);
          console.log(err);
        });
    }
  }, []);

  const handlePagination = (number) => {
    setpages({
      ...pages,
      current_page: number,
    });

    let path = "?page=" + number;

    if (filterOptions?.vendor_id) {
      path = path + "&vendor_id=" + filterOptions?.vendor_id;
    } else if (filterOptions?.role_id) {
      path = path + "&role_id=" + filterOptions?.role_id;
    }
    setApiQuery(props?.api + path);
  };

  useEffect(() => {
    if (response && response?.data?.data && response?.data?.data?.length > 0) {
      setShowTable(true);
    } else {
      setShowTable(false);
    }
  }, [response, dataPath]);

  const onDoubleClick = (e, id) => {
    history.push(uiPath + id);
  };

  const setServicesValue = (value) => setSearchKeyword(value);

  const setServicesValueDebounced = useRef(
    lodash.debounce(setServicesValue, 250)
  );

  const handleStatus = (id, status_change) => {
    props?.setLoading(true);
    let path = props?.api.toString().replace("/list", "");
    api
      .post(
        path + "/change_status",
        {
          id: id,
          status: status_change,
        },
        true
      )
      .then(([status, response]) => {
        if (status) {
          setChange((count) => count + 1);
          setModalController((data) => ({
            ...data,
            statusDisplay: true,
          }));
        }
        props?.setLoading(false);
      })
      .catch((err) => {
        props?.setLoading(false);
        console.log(err);
      });
  };

  const handleProfile = (id, status_change) => {
    props?.setLoading(true);
    let path = props?.api.toString().replace("/list", "");
    api
      .post(
        path + "/change_profile_status",
        {
          id: id,
          status: status_change,
        },
        true
      )
      .then(([status, response]) => {
        if (status) {
          setChange((count) => count + 1);
          setModalController((data) => ({
            ...data,
            statusDisplay: true,
          }));
        }
        props?.setLoading(false);
      })
      .catch((err) => {
        props?.setLoading(false);
        console.log(err);
      });
  };

  const handleSearch = ({ currentTarget: { value } }) => {
    setSearchInputValue(value);
    setServicesValueDebounced.current(value);
  };

  const handleView = (id) => {
    history.push(uiPath + id);
  };

  const handleAllButton = (event) => {
    setStatus();
  };
  const handleActiveButton = (event) => {
    setStatus(1);
  };
  const handleDeActiveButton = (event) => {
    setStatus(2);
  };

  const handleProfileButton = (event) => {
    setStatus(3);
  };

  return (
    <>
      <div className="widget-head">
        <div className="row">
          <div className="col-md-6 search">
            <div className="input-group ">
              <input
                type="text"
                className="form-control bg-light border-0 small"
                placeholder="Search"
                onChange={handleSearch}
                value={searchInputValue}
              ></input>
              <div className="input-group-append align-items-center justify-content-center">
                <i className="fas fa-search fa-sm"></i>
              </div>
            </div>
          </div>
          {props?.AgentUnderVendorFilter ? (
            <div className="col-md-2">
              <div className="form-group dropbox">
                <select
                  className="form-control"
                  name="vendor_selection"
                  onChange={(e) => handleFilter(e, "vendor_selection")}
                >
                  <option value="">--SELECT--</option>
                  {vendorList?.map((vendor_obj, index) => {
                    return (
                      <option value={vendor_obj?.id}>{vendor_obj?.name}</option>
                    );
                  })}
                </select>
              </div>
            </div>
          ) : props?.UsersFilter ? (
            <div className="col-md-2">
              <div className="form-group dropbox">
                <select
                  className="form-control"
                  name="user_selection"
                  onChange={(e) => handleFilter(e, "user_selection")}
                >
                  <option value="">--SELECT--</option>
                  <option value={constants.ROLES.USER}>User</option>
                  <option value={constants.ROLES.CREDITED_USER}>
                    Credited User
                  </option>
                </select>
              </div>
            </div>
          ) :  props?.VendorTypeFilter ? (
            <div className="col-md-2">
              <div className="form-group dropbox">
                <select
                  className="form-control"
                  name="vendor_type_selection"
                  onChange={(e) => handleFilter(e, "vendor_type_selection")}
                >
                  <option value="">--SELECT--</option>
                  <option value={constants.ROLES.VENDOR}>Vendor</option>
                  <option value={constants.ROLES.AGENT_WITH_TANKER}>
                    Agent with tanker
                  </option>
                </select>
              </div>
            </div>
          ) : null}
          {props?.AgentsFilter ? (
            <div className="col-md-2">
              <div className="form-group dropbox">
                <select
                  className="form-control"
                  name="agent_selection"
                  onChange={(e) => handleFilter(e, "agent_selection")}
                >
                  <option value="">--SELECT--</option>
                  <option value={constants.ROLES.AGENT_UNDER_VENDOR}>
                    Agent Under Vendor
                  </option>
                  <option value={constants.ROLES.AGENT_WITH_TANKER}>
                    Agent With Truck
                  </option>
                </select>
              </div>
            </div>
          ) : null}
          <div className="col-md">
            <div
              className="btn-group float-right"
              role="group"
              aria-label="Basic outlined example"
            >
              <Button
                type="button"
                className={
                  status === undefined
                    ? "btn btn-outline-secondary active"
                    : "btn btn-outline-secondary"
                }
                onClick={handleAllButton}
                value="All"
              />
              <Button
                type="button"
                className={
                  status === 1
                    ? "btn btn-outline-secondary active"
                    : "btn btn-outline-secondary"
                }
                onClick={handleActiveButton}
                value="Active"
              />
              <Button
                type="button"
                className={
                  status === 2
                    ? "btn btn-outline-secondary active"
                    : "btn btn-outline-secondary"
                }
                onClick={handleDeActiveButton}
                value="Inactive"
              />

              {props?.profile_status && (
                <Button
                  type="button"
                  className={
                    status === 3
                      ? "btn btn-outline-secondary active"
                      : "btn btn-outline-secondary"
                  }
                  onClick={handleProfileButton}
                  value="Unapproved Profiles"
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {!isLoading && showTable && (
        <>
          <div class="table-widget">
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    {props?.headers?.map((head, index) => {
                      return <th scope="col">{head.label}</th>;
                    })}
                    <th scope="col" className="text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {response?.data?.data?.map((item, key) => {
                    return (
                      <tr key={key}>
                        {props?.headers?.map((head, index) => {
                          return (
                            <>
                              {head?.value == "role_id" ? (
                                <td
                                  key={index}
                                  onDoubleClick={(e) =>
                                    onDoubleClick(e, item[id])
                                  }
                                >
                                  <strong>
                                    {GetPropertyValue(item, head.value) ==
                                    constants.ROLES.USER ? (
                                      <strong>User</strong>
                                    ) : GetPropertyValue(item, head.value) ==
                                      constants.ROLES.CREDITED_USER ? (
                                      <strong>Credited User</strong>
                                    ) : GetPropertyValue(item, head.value) ==
                                      constants.ROLES.ADMIN ? (
                                      <strong>Admin</strong>
                                    ) : GetPropertyValue(item, head.value) ==
                                      constants.ROLES.AGENT_WITH_TANKER ? (
                                      <strong>Agent With Truck</strong>
                                    ) : GetPropertyValue(item, head.value) ==
                                      constants.ROLES.AGENT_UNDER_VENDOR ? (
                                      <strong>Agent Under Vendor</strong>
                                    ) : GetPropertyValue(item, head.value) ==
                                      constants.ROLES.VENDOR ? (
                                      <strong>Vendor</strong>
                                    ) : null}
                                  </strong>
                                </td>
                              ) : (
                                <td
                                  key={index}
                                  onDoubleClick={(e) =>
                                    onDoubleClick(e, item[id])
                                  }
                                >
                                  <strong>
                                    {GetPropertyValue(item, head.value)}
                                  </strong>
                                </td>
                              )}
                            </>
                          );
                        })}

                        <td>
                          <div className="dropdown text-center">
                            <a
                              className=" sub-btn"
                              id="dropdownMenuButton"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <i className="fas fa-ellipsis-h"></i>
                            </a>
                            <div
                              className="dropdown-menu"
                              aria-labelledby="dropdownMenuButton"
                            >
                              {item?.status === 1 && (
                                <a
                                  className="dropdown-item"
                                  value={item.id}
                                  onClick={(event) => handleView(item.id)}
                                >
                                  <i className="fas fa-eye mr-2"></i>View/Edit
                                </a>
                              )}
                              {props?.status && (
                                <>
                                  {item.status === 1 ? (
                                    <a
                                      className="dropdown-item"
                                      value={item.id}
                                      onClick={(e) => {
                                        setModalController({
                                          show: true,
                                          statusDisplay: false,
                                          confirmation:
                                            "Do you really want to deactivate?",
                                          title: "Deactivation Confirmation",
                                          type: "deactivate",
                                          data: {
                                            id: item?.id,
                                            status: 2,
                                          },
                                        });
                                      }}
                                    >
                                      <i className="fas fa-toggle-off mr-2"></i>
                                      Deactivate
                                    </a>
                                  ) : (
                                    <a
                                      className="dropdown-item"
                                      value={item.id}
                                      onClick={(e) => {
                                        setModalController({
                                          show: true,
                                          statusDisplay: false,
                                          confirmation:
                                            "Do you really want to activate?",
                                          title: "Activation Confirmation",
                                          type: "activate",
                                          data: {
                                            id: item?.id,
                                            status: 1,
                                          },
                                        });
                                      }}
                                    >
                                      <i className="fas fa-toggle-on  mr-2"></i>
                                      Activate
                                    </a>
                                  )}
                                  {props?.profile_status &&
                                    item.profile_status === 2 && (
                                      <a
                                        className="dropdown-item"
                                        value={item.id}
                                        onClick={(e) => {
                                          setModalController({
                                            show: true,
                                            statusDisplay: false,
                                            confirmation:
                                              "Do you really want to approve this user?",
                                            title: "Approval Confirmation",
                                            type: "approval",
                                            data: {
                                              id: item?.id,
                                              status: 1,
                                            },
                                          });
                                        }}
                                        data-toggle="modal"
                                        data-target="#confirmApproveModal"
                                      >
                                        <i className="fas fa-toggle-off mr-2"></i>
                                        Approve
                                      </a>
                                    )}
                                </>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-end">
              {pages.total_pages > 1 && pages.pagination_items}
            </ul>
          </nav>

          <ConfirmationModal
            show={modalController?.show || false}
            statusDisplay={modalController?.statusDisplay || false}
            title={modalController?.title}
            type={modalController?.type}
            confirmation={modalController?.confirmation}
            data={modalController?.data}
            {...(modalController?.type === "activate" ||
            modalController?.type === "deactivate"
              ? { setHandleFunction: handleStatus }
              : modalController?.type === "approval"
              ? { setHandleFunction: handleProfile }
              : null)}
            setModalController={setModalController}
          />
        </>
      )}
      {!isLoading && showTable === false && (
        <div className="row justify-content-center mt-2">
          {props?.customNoDataMessage ? props?.customNoDataMessage : "No Data"}
        </div>
      )}
    </>
  );
}

DataListFromApi.propTypes = {
  headers: PropTypes.array.isRequired,
  api: PropTypes.string.isRequired,
  dataPath: PropTypes.string,
  uiPath: PropTypes.string.isRequired,
  id: PropTypes.string,
};
