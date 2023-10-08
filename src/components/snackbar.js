import React, { useEffect } from 'react';
import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const SnackBar = ({ errorMessage, infoMessage, bottom, top }) => {
  const [openError, setOpenError] = React.useState(false);
  const [openInfo, setOpenInfo] = React.useState(false);

  useEffect(() => {
    errorMessage && setOpenError(true);
    infoMessage && setOpenInfo(true);
  }, [errorMessage, infoMessage]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenInfo(false);
    setOpenError(false);
  };

  return (
    <>
      {errorMessage && (
        <Snackbar
          open={openError || openInfo}
          autoHideDuration={5000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          style={{ position: 'absolute', width: '100%', top: top || 0, left: 0, bottom: bottom && bottom }}
        >
          <Alert onClose={handleClose} severity="warning" style={{ width: '100%', alignItems: 'center' }}>
            {errorMessage}
          </Alert>
        </Snackbar>
      )}
      {infoMessage && (
        <Snackbar
          open={openError || openInfo}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          style={{
            position: 'absolute',
            width: '100%',
            left: 0,
            bottom: bottom || 0,
            top: top && top,
          }}
        >
          <Alert onClose={handleClose} severity="info" style={{ width: '100%', alignItems: 'center' }}>
            {infoMessage}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default SnackBar;
