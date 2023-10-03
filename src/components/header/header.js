import { Box, Breadcrumbs, Link, SvgIcon } from '@material-ui/core';
import React from 'react';
import variables from '../../shared/variables.module.scss';

const Header = ({ breadcrumbs, children, pageTitle, margin, showHelp, handleHelpAction }) => {
  return (
    <Box display="flex" alignItems="center" padding="1vw 0 1.2vw">
      <Box>
        <Breadcrumbs separator="|">
          {breadcrumbs?.map((breadcrumb, index) => (
            <Link color="inherit" key={breadcrumb.label} href={`/ai${breadcrumb.route}`}>
              {breadcrumb.label}
            </Link>
          ))}
        </Breadcrumbs>
        <Box style={{ display: 'flex' }}>
          <label className="page-title">{pageTitle}</label>
        </Box>
      </Box>
      <Box marginLeft={margin ? margin : 'auto'}>{children}</Box>
    </Box>
  );
};

export default Header;
