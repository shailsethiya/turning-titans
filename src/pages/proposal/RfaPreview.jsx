import React from "react";
import { Box, SvgIcon } from "@material-ui/core";

const RfaPreview = ({ props, selectedAction }) => {
  const { previewHtmlContent } = selectedAction;
  const url =  `http://127.0.0.1:5000/api/preview_proposal/${selectedAction?.props?.id}`

  return (
    <>
      {url && (
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
            srcDoc={url}
            style={{
              borderWidth: '0px',
              width: '100%',
              height: '100%',
            }}
          />
        </Box>
      )}
      {!url && <ListingSkeleton />};
    </>)
};

export default RfaPreview;
