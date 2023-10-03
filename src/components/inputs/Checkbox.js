import React from "react";

function Checkbox(props) {
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
    <div
      className={
        classes && classes.parentClass
          ? `custom-checkbox ${clsses.parentClass}`
          : "custom-checkbox"
      }
    >
      <label
        htmlFor={id}
        data-testid="checkbox_label"
        className={
          classes && classes.labelClass
            ? `checkbox-label ${clsses.labelClass}`
            : "checkbox-label"
        }
      >
        <input
          type={type}
          name={name}
          id={id}
          key={checkboxKey}
          data-testid={"checkbox_component"}
          onChange={onChange}
          checked={checked}
          value={value}
          {...otherProps}
        />
        <span></span>
        {labelText}
      </label>
    </div>
  );
}

export default Checkbox;
