import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormHelperText,
  LinearProgress,
  SvgIcon,
  Typography,
} from "@material-ui/core";
import variables from "../containers/shared/variables.module.scss";
import { format_file_size } from "../containers/utils/utils";
import { ReactComponent as Cross } from "../assets/images/cross.svg";

const UploadFile = ({
  fieldId,
  fieldLabel,
  hideFieldLabel,
  values,
  touched,
  errors,
  setFieldValue,
  fileType,
  fileAccept,
}) => {
  const [progress, setProgress] = useState(0);

  const handleUploadProgressBar = () => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const diff = Math.random() * 10;

        return Math.min(oldProgress + diff, 100);
      });
    }, 100);

    return () => {
      clearInterval(timer);
    };
  };

  const handleClose = (fieldId) => {
    console.log("fieldId====", fieldId);
    setFieldValue(fieldId, {
      file: "",
      fileName: "",
      fileSize: "",
    });
  };

  return (
    <Box className="form-section-gap">
      {!hideFieldLabel && (
        <Typography className="form-heading">{fieldLabel}</Typography>
      )}
      <FormControl>
        <Box
          flexDirection="column"
          className={`upload-container ${
            (values[fieldId] === "" || values[fieldId]?.file === "") &&
            "vertical-align-center"
          } ${
            (values[fieldId] === "" || values[fieldId]?.file === "") &&
            touched[fieldId]
              ? "upload-container-error"
              : ""
          }`}
          style={{ padding: "4%" }}
        >
          {values[fieldId] === "" || values[fieldId]?.file === "" ? (
            <Typography>Browse {fileType} file to upload</Typography>
          ) : (
            <Box style={{ display: "flex" }}>
              <Box className="uploaded-file">
                <Typography>{values[fieldId]?.fileName}</Typography>
                <Typography>
                  {values[fieldId]?.fileSize &&
                    format_file_size(values[fieldId]?.fileSize)}
                </Typography>
              </Box>

              <Box
                style={{ marginLeft: "auto" }}
                className="cursor-pointer"
                onClick={() => handleClose(fieldId)}
              >
                <SvgIcon
                  component={Cross}
                  stroke={variables.arsenic}
                  viewBox="-3 -5 20 20"
                />
              </Box>
            </Box>
          )}

          <input
            id={fieldId}
            name={fieldLabel}
            type="file"
            accept={fileAccept}
            onChange={(e) => {
              const { name, size } = e.target.files[0];

              handleUploadProgressBar();

              setFieldValue(`${fieldId}.${["file"]}`, e.target.files[0]);
              setFieldValue(`${fieldId}.${["fileName"]}`, name);
              setFieldValue(`${fieldId}.${["fileSize"]}`, size);

              e.target.value = null;
            }}
          />

          {values[fieldId] !== "" &&
            values[fieldId]?.file !== "" &&
            progress < 100 && (
              <Box className="progress-bar">
                <LinearProgress variant="determinate" value={progress} />
              </Box>
            )}
        </Box>
        <FormHelperText>
          {(values[fieldId] === "" ||
            values[fieldId] === undefined ||
            values[fieldId]?.file === "" ||
            values[fieldId]?.file === undefined) &&
          touched[fieldId]
            ? errors[fieldId]?.file
            : ""}
        </FormHelperText>
      </FormControl>
    </Box>
  );
};

export default UploadFile;
