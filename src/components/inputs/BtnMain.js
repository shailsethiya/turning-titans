import React from "react";

/** ***************** 
    @purpose : Rander Button component
    @Author : shailendra
    ******************/
function BtnMain(props) {
  /** ***************** 
    @purpose : return props 
    @Author : shailendra
    ******************/
  const {
    type = "button",
    className,
    onClick,
    disabled,
    text,
    iconLeft,
    iconRight,
    id = "",
    ...otherProps
  } = props;
  /** ***************** 
    @purpose : Rander Ui
    @Author : shailendra
    ******************/
  return (
    <button
      data-testid="btn_main"
      type={type}
      className={className}
      onClick={onClick}
      id={id}
      disabled={disabled}
      {...otherProps}
    >
      {iconLeft} {text} {iconRight}
    </button>
  );
}

export default BtnMain;
