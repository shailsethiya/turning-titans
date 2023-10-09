import React from "react";
import { Box, SvgIcon, Typography } from "@material-ui/core";

const RfaPreview = ({ props, selectedAction }) => {
  const { previewHtmlContent } = selectedAction;
  console.log("props===", previewHtmlContent)

  return (
    <Box>
      <h1>{previewHtmlContent?.summary}</h1>
    </Box>
    /**<>
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
    </>**/)
};

export default RfaPreview;
