import React from "react";
import { Box, SvgIcon } from "@material-ui/core";

const RfaPreview = ({ props, selectedAction }) => {
  const { previewHtmlContent } = selectedAction;

  return (
    <>
      {previewHtmlContent && (
        <Box
          style={{
            borderWidth: '0px',
            width: '100%',
            height: '100%',
          }}
        >
          <iframe
            id="plugin-iframe"
            title="File Preview"
            src={previewHtmlContent}
            style={{
              borderWidth: '0px',
              width: '100%',
              height: '100%',
            }}
          />
        </Box>
      )}
      {!previewHtmlContent && <ListingSkeleton />};
    </>)
};

export default RfaPreview;
