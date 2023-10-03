import React, { Fragment } from "react";
import {
  FormControl,
} from '@material-ui/core';

const TextField = (props) => {
  const {
    label,
    placeholder,
    type,
    name,
    labelClassName,
    formik,
    inputRef,
    withicon,
    ParentClass,
    floatingInput = true,
    showUntoucherError = false,
    shouldShowErrorIcon = true,
    showError = true,
    disabled = false,
    // readOnly = false,
    ...otherProps
  } = props;
  /*******************
    @purpose : Render TextField Component
    @Parameter : {}
    @Author : INIC
    ******************/

  return (
    <Fragment>

      {floatingInput === false && (
        <>
          {console.log(disabled)}
          {label && <label className={labelClassName}>{label}</label>}
          <FormControl
            ref={inputRef}
            type={type}
            placeholder={placeholder}
            className={`${formik && formik.values[name]?.length > 0 && "input-filled"
              } ${!shouldShowErrorIcon ? "hide-error-icon" : ""}`}
            {...(formik && formik.getFieldProps(name))}
            isInvalid={
              formik &&
              (formik.touched[name] || showUntoucherError) &&
              formik.errors[name]
            }
            {...otherProps}
            disabled={disabled}
          // readOnly={ readOnly && "readonly"}
          />
          {showError &&
            formik &&
            formik["errors"][name] &&
            (formik.touched[name] || showUntoucherError) && (
              <div className="message-block">{formik["errors"][name]}</div>
            )}
        </>
      )}
      {floatingInput === true && (
        <>
          <div className={`input-effect ${withicon && "withicon"} ${ParentClass}`}>

            <FormControl
              ref={inputRef}
              type={type}
              disabled={disabled}
              placeholder={placeholder}
              className={`${formik && formik.values[name]?.length > 0 && "input-filled"
                } ${!shouldShowErrorIcon ? "hide-error-icon" : ""}`}
              {...(formik && formik.getFieldProps(name))}
              isInvalid={
                formik &&
                (formik.touched[name] || showUntoucherError) &&
                formik.errors[name]
              }
              // readOnly={ readOnly && "readonly"}
              {...otherProps}
            />
            {label && <label className={labelClassName}>{label}</label>}

            {withicon}


            {showError &&
              formik &&
              formik["errors"][name] &&
              (formik.touched[name] || showUntoucherError) && (
                <div className="message-block">{formik["errors"][name]}</div>
              )}
          </div>

        </>
      )}
    </Fragment>
  );
};
export default TextField;
