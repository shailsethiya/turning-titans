import React from "react";

const RfaPreview = ({ props, selectedAction }) => {
  const { previewHtmlContent } = selectedAction;
  console.log("props===", props)

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
            srcDoc={previewHtmlContent}
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
