import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormHelperText,
  LinearProgress,
  SvgIcon,
  Typography,
} from '@material-ui/core';
import variables from '../containers/shared/variables.module.scss';
import { format_file_size } from '../containers/utils/utils';
import { ReactComponent as Cross } from '../assets/images/cross.svg';


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
  const [pdfFileUrl, setPdfFileUrl] = useState('');


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

  return (
    <Box className="form-section-gap">
      {!hideFieldLabel && <Typography className="form-heading">{fieldLabel}</Typography>}
      <FormControl>
        <Box
          flexDirection="column"
          className={`upload-container ${(values[fieldId] === '' || values[fieldId]?.file === '') && 'vertical-align-center'
            } ${(values[fieldId] === '' || values[fieldId]?.file === '') && touched[fieldId]
              ? 'upload-container-error'
              : ''
            }`}
          style={{ padding: '4%' }}
        >
          {values[fieldId] === '' || values[fieldId]?.file === '' ? (
            <Typography>Browse {fileType} file to upload</Typography>
          ) : (
            <Box display="flex" alignItems="center">
              <Box className="uploaded-file">
                <Typography>{values[fieldId]?.fileName}</Typography>
                <Typography>{format_file_size(values[fieldId]?.fileSize)}</Typography>
              </Box>
              <Box
                marginLeft="auto"
                className="cursor-pointer"
                style={{ zIndex: 1 }}
                onClick={() => {
                  setFieldValue(fieldId, {
                    file: '',
                    fileName: '',
                    fileSize: '',
                  });
                }}
              >
                <SvgIcon component={Cross} stroke={variables.arsenic} viewBox="-3 -5 20 20" />
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

              setFieldValue(`${fieldId}.${['file']}`, e.target.files[0]);
              setFieldValue(`${fieldId}.${['fileName']}`, name);
              setFieldValue(`${fieldId}.${['fileSize']}`, size);
              const file = e.target.files[0];
              const fileExtension = name.split('.').pop().toLowerCase();
              console.log(fileExtension , "name" , URL.createObjectURL(file));
             
              if (file &&  (fileExtension === 'pdf' || fileExtension === 'doc' || fileExtension === 'docx')) {
                const fileUrl = URL.createObjectURL(file);
                setPdfFileUrl(fileUrl);
              }
             

              e.target.value = null;
            }}
          />
           {console.log("pdfFileUrl" , pdfFileUrl)}
          {pdfFileUrl && 
          (
            <iframe
              src={pdfFileUrl}
              width="100%"
              height="600px"
              // title="PDF Viewer"
              title="DOC Viewer"
            ></iframe>
          )}
          {values[fieldId] !== '' && values[fieldId]?.file !== '' && progress < 100 && (
            <Box className="progress-bar">
              <LinearProgress variant="determinate" value={progress} />
            </Box>
          )}
        </Box>
        <FormHelperText>
          {(values[fieldId] === '' || values[fieldId]?.file === '') && touched[fieldId]
            ? errors[fieldId]?.file
            : ''}
        </FormHelperText>
      </FormControl>
    </Box>
  );
};

export default UploadFile;