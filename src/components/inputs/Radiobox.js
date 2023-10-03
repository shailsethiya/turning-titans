import React from "react";

function Radiobox(props) {
  /** *****************
    @purpose : Rander checkbox
    @Author : shailendra
    ******************/
  const {
    labelText,
    value,
    checkboxKey,
    name,
    clsses,
    classes,
    onChange,
    id,
    checked,
    type,
    ...otherProps
  } = props;
  /** *****************
     @purpose : Rander checkbox Components Ui
     @Author : shailendra
     ******************/
  return (
    <div className={`custom-radio`}>
    <label className="m-0" data-testid="radiobox_label"  htmlFor={id}>
      <input
          type={type}
          name={name}
          id={id}
          key={checkboxKey}
          data-testid={"radiobox_component"}
          onChange={onChange}
          checked={checked}
          value={value}
          {...otherProps}
      />
      <span></span> {labelText}
    </label>
  </div>
  );
}

export default Radiobox;
