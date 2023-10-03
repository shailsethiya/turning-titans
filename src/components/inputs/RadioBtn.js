import React from "react";

import TextField from "./TextField";

/** ***************** 
  @purpose : Rander RadioBtn
  @Author : shailendra
  ******************/
function RadioBtn(props) {
  /** *****************
     @purpose : Rander RadioBtn Components Ui
     @Author : shailendra
     ******************/
  return (
    <>
      <label className={props.parentClass}>
        <TextField {...props} />
        {props.labelText}
      </label>
    </>
  );
}

export default RadioBtn;
