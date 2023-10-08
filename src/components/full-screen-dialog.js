import React, { useState } from 'react';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Slide,
  SvgIcon,
  Typography,
} from '@material-ui/core';
import _isEmpty from 'lodash/isEmpty';
import SnackBar from './snackbar';
import { ReactComponent as Cross } from "../assets/images/cross.svg";
import variables from '../containers/shared/variables.module.scss';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FullScreenDialog = ({
  selectedOption,
  selectedAction,
  resetAction,
  dialogBtnText,
  datasources,
  updateDialogTitle,
  handleclose,
  bottom,
  top,
  dialogIconStart,
  handleSchemaFinalSelect,
  usecaseId,
  ...props
}) => {
  const dialogTitle = selectedAction?.dialogTitle
    ? selectedAction?.dialogTitle
    : selectedAction?.text;

  const dialogDescription = selectedAction?.dialogDescription && selectedAction?.dialogDescription;
  const openDialog = !_isEmpty(selectedAction);
  const [open, setOpen] = useState(openDialog);
  const [errorMessage, setErrorMessage] = useState('');
  const [infoMessage, setInfoMessage] = useState('');

  return (
    <>
      <Box
        position="fixed"
        top="2%"
        left="0"
        right="1%"
        borderRadius="0.3vw"
        padding="0.4% 0.6%"
        // zIndex="1301"
        style={{ background: variables.arsenic, cursor: 'pointer' }}
        onClick={() => {
          setOpen(false);

          setTimeout(() => {
            resetAction(props?.callFrom);
          }, 100);
        }}
      >
        <SvgIcon component={Cross} viewBox="-3 -5 20 20" stroke={variables.white} />
      </Box>
      <Dialog
        fullScreen
        open={open}
        onClose={() => {
          setOpen(false);

          setTimeout(() => {
            resetAction(props?.callFrom);
          }, 100);
        }}
        TransitionComponent={Transition}
      >
        <DialogTitle
          style={{
            background: variables.white,
            borderBottom:
              selectedAction?.callFrom === 'copilot' ? 'none' : `1px solid ${variables.whiteSmoke}`,
            padding: props.titlePadding ? props.titlePadding : `1vw 1.5vw`,
          }}
        >
          <Box
            className="vertical-align-center"
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            {selectedAction?.dialogIconStart && (
              <SvgIcon
                component={selectedAction?.dialogIconStart}
                viewBox="0 0 52 52"
                style={{
                  width: '3vw',
                  height: '3vw',
                  fill: 'none',
                  paddingRight: '0.5vw',
                }}
              />
            )}
            <Box>
              <Box
                className={`card-title ${
                  selectedAction?.dialogIcon
                    ? selectedAction?.dialogIcon && 'vertical-align-center gap-05'
                    : selectedAction?.dialogIconEnd && 'vertical-align-left gap-05'
                }`}
              >
                {selectedAction?.dialogIcon && (
                  <SvgIcon
                    component={selectedAction?.dialogIcon}
                    viewBox={selectedAction?.viewBox}
                    style={{
                      width: '1.8vw',
                      height: '1.8vw',
                      fill: selectedAction?.fill ? selectedAction?.color : 'none',
                    }}
                  />
                )}
                {dialogTitle}
                {selectedAction?.dialogIconEnd && (
                  <SvgIcon
                    component={selectedAction?.dialogIconEnd}
                    viewBox={selectedAction?.viewBox}
                    style={{
                      width: '2vw',
                      height: '2vw',
                      fill: selectedAction?.fill ? selectedAction?.color : 'none',
                    }}
                  />
                )}
              </Box>
              <Typography className="dialog-description">{dialogDescription}</Typography>
            </Box>

            <Box className="margin-left-auto">{props.children}</Box>
          </Box>
        </DialogTitle>
        <DialogContent style={selectedAction.contentHeader ? { paddingBottom: '4vw' } : {}}>
          <>
            {selectedAction?.contentHeader && <Box>{selectedAction?.contentHeader}</Box>}
            <Box
              className="vertical-align-center component-container"
              style={
                ['app-details', 'notebook', 'run-history'].includes(props.section)
                  ? {
                      justifyContent: selectedAction.callFrom === 'app-resource' && 'space-around',
                      padding: props.contentPadding ? props.contentPadding : 0,
                      display: 'block',
                      flexDirection: selectedAction.callFrom === 'app-resource' && 'column',
                      overflowY: props?.section === 'run-history' && 'hidden',
                    }
                  : {}
              }
            >
              <selectedAction.component
                selectedAction={selectedAction}
                selectedOption={selectedOption}
                showErrorMessage={(message) => {
                  setErrorMessage('');
                  setErrorMessage(message);
                }}
                showInfoMessage={(message) => {
                  setInfoMessage('');
                  setInfoMessage(message);
                }}
                resetAction={() => {
                  resetAction(props?.callFrom);
                }}
                handleclose={(e) => {
                  setOpen(false);
                  resetAction(props?.callFrom);

                  if (e) {
                    handleclose(e);
                  }
                }}
                datasources={datasources}
                handleSchemaFinalSelect={handleSchemaFinalSelect}
                updateDialogTitle={(datasource, parameter) => {
                  updateDialogTitle(datasource, parameter);
                }}
                usecaseId={usecaseId}
                props={props}
              />
            </Box>
            {(infoMessage || errorMessage) && (
              <SnackBar
                infoMessage={infoMessage}
                errorMessage={errorMessage}
                bottom={bottom}
                top={top}
              />
            )}
          </>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FullScreenDialog;
