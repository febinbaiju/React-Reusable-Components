import React, { useEffect, useState } from "react";
import ImageUploading from "react-images-uploading";

export default function ImageUploader(props) {
  const [images, setImages] = React.useState([]);
  const [valid, setValid] = useState(false);
  const [prevSaveTrigger, setPrevSaveTrigger] = useState(props?.saveTrigger);
  const [showValidations, setShowValidations] = useState(false);

  const onChange = (imageList, addUpdateIndex) => {
    props?.onChange(imageList, props?.name);
    setImages(imageList);
  };

  useEffect(() => {
    if (props?.saveTrigger !== prevSaveTrigger) {
      setPrevSaveTrigger(props?.saveTrigger);
      // run validations
      setShowValidations(true);
    }
  }, [props?.saveTrigger]);

  useEffect(() => {
    if (props?.required) {
      if (images?.length < 1) {
        setValid(false);
        props.setValidStatus({
          ...props?.validStatus,
          [props?.name]: false,
        });
      } else {
        setValid(true);
        props.setValidStatus({
          ...props?.validStatus,
          [props?.name]: true,
        });
      }
    } else setValid(true);
  }, [props?.required, images]);

  useEffect(() => {
    if (images?.length > 0) {
      setValid(true);
      props.setValidStatus({
        ...props?.validStatus,
        [props?.name]: true,
      });
    }
  }, [images, props?.name]);

  return (
    <ImageUploading
      value={images}
      onChange={onChange}
      dataURLKey="data_url"
      {...(props?.acceptType ? { acceptType: props?.acceptType } : null)}
      {...(props?.maxFileSize
        ? { maxFileSize: props?.maxFileSize }
        : { maxFileSize: 2000000 })}
      {...(props?.maxNumber
        ? { maxNumber: props?.maxNumber }
        : { maxNumber: 1 })}
      onError={(errors, file) => {
        props.setValidStatus({
          ...props?.validStatus,
          [props?.name]: false,
        });
      }}
    >
      {({
        imageList,
        onImageUpload,
        errors,
        onImageUpdate,
        isDragging,
        dragProps,
      }) => (
        <div className="col-8 imgUp">
          <div className="imagePreview">
            <img
              style={{
                height: "100%",
                width: "100%",
                objectFit: "contain",
              }}
              src={
                props?.response_photo
                  ? props?.response_photo
                  : imageList?.[0]?.data_url
              }
              alt=""
            />
          </div>
          <label className="btn btn-primary">
            Upload
            <input
              type="file"
              onClick={(e) => {
                e.preventDefault();
                if (images.length > 0) onImageUpdate(0);
                else onImageUpload(e);
              }}
              {...dragProps}
              className="uploadFile img"
              style={{
                width: "0px",
                height: "0px",
                overflow: "hidden",
              }}
            />
          </label>

          {showValidations && !valid && (
            <div
              style={{
                color: "red",
              }}
            >
              {props?.label} is required
            </div>
          )}

          {errors && (
            <div
              style={{
                color: "red",
              }}
            >
              {errors?.maxNumber && (
                <span>Number of selected images exceeds</span>
              )}
              {errors?.acceptType && (
                <span>Selected file type is not allowed</span>
              )}
              {errors?.maxFileSize && (
                <span>Selected file size exceed allowed filesize of 2MB</span>
              )}
              {errors?.resolution && <span>resolution is not allowed</span>}
            </div>
          )}
        </div>
      )}
    </ImageUploading>
  );
}
