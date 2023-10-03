import React from 'react';
import { Paper, Box, Divider, SvgIcon, Typography } from '@material-ui/core';
import variables from '../containers/shared/variables.module.scss';
import StyledButton from './button';

const Card = ({
  background,
  borderWidth,
  borderStyle,
  borderRadius,
  borderBottomStyle,
  borderColor,
  children,
  click,
  divider,
  alert,
  cursor,
  height,
  padding,
  margin,
  title,
  width,
  textAlign,
  alignItems,
  justifyContent,
  minWidth,
  position,
  subtitle,
  startImg,
  startImgWidth,
  startImgHeight,
  startImgcursor,
  endImg,
  viewBox,
  titleclick,
  action,
  addOneMoreAction,
  handleAction,
  handleAddMoreAction,
  handleCardHover,
  handleCardHoverLeave,
  handleEndImgClick,
  iconHeight,
  iconWidth,
  endIconfill,
  handleStartImgClick,
  gridGap,
  createBtn,
  handleCreateNew,
  className,
  display,
  fontColor,
  fontSize,
  borderLeft,
  overflow,
}) => {
  return (
    <Paper
      elevation={0}
      className={className}
      style={{
        width: width,
        minWidth: minWidth && minWidth,
        height: height,
        padding: padding || '1.111vw',
        borderWidth: borderWidth || '1px',
        borderStyle: borderStyle || 'none',
        borderColor: borderColor || variables.americanSilver,
        borderBottomStyle: borderBottomStyle || borderStyle,
        borderRadius: borderRadius || '0.417vw',
        background: background || '#FFFFFF',
        cursor: cursor || 'default',
        margin: margin,
        alignItems: alignItems,
        textAlign: textAlign,
        position: position && position,
        display: display && display,
        color: fontColor && fontColor,
        fontSize: fontSize && fontSize,
        borderLeft: borderLeft && borderLeft,
        overflow: overflow && overflow,
      }}
      onClick={click}
      onMouseEnter={() => handleCardHover && handleCardHover()}
      onMouseLeave={() => handleCardHoverLeave && handleCardHoverLeave()}
    >
      <Box
        style={{
          display: (startImg || endImg) && 'flex',
          alignItems: 'center',
          textAlign: 'center',
          gridGap: gridGap || '0.8vw',
          justifyContent: justifyContent || 'left',
        }}
      >
        {startImg && (
          <SvgIcon
            component={startImg}
            onClick={handleStartImgClick}
            viewBox={viewBox || '0 0 90 110'}
            style={{
              fill: 'none',
              height: startImgHeight,
              width: startImgWidth,
              cursor: startImgcursor || 'default',
            }}
          />
        )}
        {title && (
          <Box
            style={{ display: 'flex', alignContent: 'center' }}
            className={`${action && 'vertical-align-center'}`}
          >
            <Box
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
              onClick={titleclick}
            >
              <Typography className="card-title">{title}</Typography>
              <Typography className="card-subtitle">{subtitle}</Typography>
            </Box>

            <Box className="action-text action-btn-added margin-left-auto">
              {action && <Box onClick={handleAction}>{action}</Box>}
              {addOneMoreAction && (
                <StyledButton
                  text={addOneMoreAction}
                  variant="contained"
                  margin=" 0 0 0 1vw"
                  color={variables.grape}
                  background={variables.ghostWhite}
                  border="none"
                  click={handleAddMoreAction}
                />
              )}
            </Box>
            {createBtn && (
              <Box marginLeft="auto">
                <StyledButton
                  text={createBtn}
                  variant="contained"
                  color={variables.grape}
                  background={variables.ghostWhite}
                  border="none"
                  click={handleCreateNew}
                />
              </Box>
            )}
          </Box>
        )}
        {endImg && (
          <SvgIcon
            className="endImg"
            component={endImg}
            onClick={handleEndImgClick}
            viewBox={viewBox || '0 0 90 110'}
            style={{
              fill: endIconfill && endIconfill,
              height: iconHeight && iconHeight,
              width: iconWidth && iconWidth,
              cursor: 'pointer',
            }}
          />
        )}
      </Box>
      {divider && <Divider style={{ margin: '1vw -1vw 0', background: variables.whiteSmoke }} />}
      {alert ? <Box className="alert">{children}</Box> : children}
    </Paper>
  );
};

export default Card;
