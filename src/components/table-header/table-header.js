import * as React from 'react';
import { Box, Grid } from '@material-ui/core';

const TableHeader = ({ background, tableHeader, padding, border, margin }) => {
  return (
    <Box>
      <Grid
        container
        style={{
          display: 'flex',
          alignItems: 'center',
          background: background || '#FFFFFF',
          borderRadius: '0.4vw',
          padding: padding || '1vw',
          border: border || 'none',
          margin: margin || '0',
        }}
        aria-label="collapsible table"
        spacing={1}
      >
        {tableHeader?.map((item, i) => (
          <Grid item key={item.data} style={{ textAlign: item.textAlign, width: item.width }}>
            {' '}
            <label className="table-data table-header">{item.data}</label>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TableHeader;
