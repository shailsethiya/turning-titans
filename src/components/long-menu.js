import React from 'react';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import variables from '../containers/shared/variables.module.scss';

const LongMenu = ({
  longMenu,
  options,
  anchorEl,
  handleClick,
  handleMenuClick,
  handleClose,
  anchorOrigin,
  transformOrigin,
  ...props
}) => {
  const open = Boolean(anchorEl);

  return (
    <div>
      {longMenu ? (
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
          style={{ padding: '5px' }}
        >
          <MoreVertIcon />
        </IconButton>
      ) : (
        <Box>{props.children}</Box>
      )}

      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={anchorOrigin || { vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={transformOrigin || { vertical: 'top', horizontal: 'right' }}
      >
        {options &&
          options.map((option) => (
            <MenuItem
              key={option.label}
              onClick={handleMenuClick}
              style={{
                color: option.type === 'alert' && variables.bostonUniversityRed,
                fontSize: variables.font_14,
              }}
            >
              {option.label}
            </MenuItem>
          ))}
      </Menu>
    </div>
  );
};

export default LongMenu;
