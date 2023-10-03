import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import color from '../containers/shared/variables.module.scss';

export default function AlertDialog({
  open,
  handleClose,
  dialogTitle,
  boldContent,
  dialogContent,
  dialogSecContent,
  noBtn,
  yesBtn,
  handleConfirm,
  isDiabled,
  customContent,
  disableMaxWidth,
  optionalText,
  handleButtonClick,
  ...props
}) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={`${props?.returnContent ? 'home-dialog' : 'alert-dialog'}`}
        maxWidth={disableMaxWidth}
      >
        <DialogTitle
          id="alert-dialog-title"
          className="alert-dialog-title"
          style={{ backgroundColor: props.background ? props.background : '#fff' }}
        >
          {dialogTitle}
        </DialogTitle>
        <DialogContent style={{ backgroundColor: props.background ? props.background : '#fff' }}>
          {customContent ? (
            customContent
          ) : (
            <DialogContentText
              id="alert-dialog-description"
              style={{
                fontWeight: 400,
                fontSize: color.font_16,
                color: color.arsenic,
                marginBottom: 0,
              }}
            >
              {dialogContent} <b>{boldContent}</b> {dialogSecContent} <br />
              <br />
              {props?.returnContent ? props?.returnContent() : ''}
              {props.secondContent}
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions style={{ backgroundColor: props.background ? props.background : '#fff' }}>
        {optionalText && (
          <Button
            onClick={handleButtonClick}
            style={{
              color: color.arsenic,
              fontSize: color.font_14,
              fontWeight: 500,
              textTransform: 'none',
              position:'absolute',
              left:'1vw'
            }}
          >
            {optionalText}
          </Button>
          )}
          {noBtn && (
            <Button
              onClick={handleClose}
              style={{
                color: color.arsenic,
                fontSize: color.font_14,
                fontWeight: 500,
                textTransform: 'none',
              }}
            >
              {noBtn}
            </Button>
          )}
          {yesBtn && (
            <Button
              onClick={handleConfirm}
              color="primary"
              style={{
                fontSize: color.font_14,
                fontWeight: 500,
                background: props.btnbgColor && props.btnbgColor,
                textTransform: 'none',
                borderRadius: '6px',
              }}
              variant="contained"
              disabled={isDiabled}
            >
              {yesBtn}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
