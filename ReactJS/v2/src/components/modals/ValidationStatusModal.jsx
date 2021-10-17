export default function ValidationStatusModal({
  show = false,
  setModalController,
}) {
  return (
    show && (
      <div
        className={`modal fade ${show ? ` show` : ``}`}
        id="confirmDeactivateModal"
        tabindex="-1"
        role="dialog"
        {...(show
          ? {
              style: {
                display: "block",
                "padding-right": "17px",
              },
            }
          : {
              display: "none",
            })}
        {...(show ? { "aria-modal": "true" } : { "aria-hidden": "true" })}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Validation Failed
              </h5>
              <button
                type="button"
                className="close"
                onClick={(e) =>
                  setModalController({
                    show: false,
                    title: "",
                    confirmation: "",
                    type: "",
                  })
                }
              >
                <span aria-hidden="true">
                  <i className="far fa-times-circle"></i>
                </span>
              </button>
            </div>
            <>
              <div className="modal-body">
                There are some errors in the form
              </div>
              <div className="modal-footer">
                <div className=" justify-content-end mt-2 col-md-8 d-md-flex ">
                  <a
                    type="submit"
                    className="btn btn-primary mb-2 mr-3 mb-2"
                    onClick={(e) => {
                      setModalController({
                        show: false,
                        title: "",
                        confirmation: "",
                        type: "",
                      });
                    }}
                  >
                    Ok
                  </a>
                </div>
              </div>
            </>
          </div>
        </div>
      </div>
    )
  );
}
