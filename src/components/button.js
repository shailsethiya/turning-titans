import React, { useState } from 'react';
import { Button, Box, LinearProgress } from '@material-ui/core';
import { useEffect } from 'react';
import variables from '../containers/shared/variables.module.scss';

const StyledButton = ({
  background,
  border,
  buttonState,
  children,
  color,
  click,
  padding,
  margin,
  stroke,
  text,
  type,
  variant,
  width,
  show,
  borderRadius,
  marginSvg,
  height,
  ...props
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (buttonState === 'completed') {
      handleUploadProgressBar();
    }
  }, [buttonState]);

  const handleUploadProgressBar = () => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const diff = Math.random() * 10;

        return Math.min(oldProgress + diff, 100);
      });
    }, 100);

    return () => {
      clearInterval(timer);
    };
  };

  return (
    <Box position="relative" style={{ width: width }}>
      <Button
        variant={variant}
        startIcon={
          props.startIcon && (
            <props.startIcon
              style={{
                stroke: stroke || 'primary',
                width: props.iconWidth,
                height: props.iconHeight,
                margin: marginSvg || 0,
              }}
            />
          )
        }
        endIcon={
          props.endIcon && (
            <props.endIcon
              style={{
                stroke: stroke || 'primary',
                width: props.iconWidth,
                height: props.iconHeight,
                strokeWidth: props.strokeWidth && props.strokeWidth,
              }}
            />
          )
        }
        type={type && type}
        disabled={
          props.disabled || (buttonState && buttonState !== 'submit' && buttonState !== 'continue')
        }
        style={{
          width: width,
          height: height,
          padding: padding || '0.521vw 0.833vw',
          borderRadius: borderRadius ? borderRadius : '0.4vw',
          fontSize: variables.font_14,
          fontWeight: 500,
          margin: margin || 0,
          textTransform: 'none',
          color: color || variables.white,
          backgroundColor: background || (variant === 'contained' ? variables.grape : 'none'),
          border: border || (variant === 'outlined' ? `1px solid ${variables.arsenic}` : 'none'),
          justifyContent: props.justifyLeft && 'left',
        }}
        onClick={click}
      >
        {!show ? text : <span className="convo">{text}</span>}
        {children}
      </Button>
      {buttonState && buttonState === 'completed' && progress < 100 && (
        <Box className="button-progress-bar">
          <LinearProgress variant="determinate" value={progress} />
        </Box>
      )}
    </Box>
  );
};

export default StyledButton;
