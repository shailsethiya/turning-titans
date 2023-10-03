import React, { useState, useEffect } from "react";
import { Form, Formik } from 'formik';
import { loginSchema } from "../../utils/index";
import { Box, Typography } from '@material-ui/core';
import { useDispatch } from "react-redux";
import * as yup from 'yup';
import {
  set_formik_validation_schema,
  set_formik_initial_values,
  section_name_formatter,
  filter_plugin_fields,
  get_button_style,
} from '../../containers/utils/utils';
import StyledButton from '../../components/button';
import { LOGIN } from '../../containers/shared/constants';
import { login } from "../../utils/loginAPi";
import { paths } from "../../routes/Path";
import { setUserToken } from "../../store/actions";
import { useNavigate } from "react-router-dom";
import './Login.scss'
// import { login } from "../../store/actions/index";

function Login() {
  const [formValidationSchema, setFormValidationSchema] = useState(yup.object({}));
  const [formInitialValues, setFormInitialValues] = useState({});
  const [buttonState, setButtonState] = useState('submit');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const buttonStyle = () => {
    return get_button_style(
      buttonState,
      'Login',
      'Please wait while we submit your login',
      'Login successfully',
      'Login failed'
    );
  };

  const handleFormSubmit = async (val) => {
    try {
      const res = await login(val?.username, val.password);
      if (res.success) {
        // let mockResponseToken = {tokens :{access:"123456" , refresh:"123456"} }
        // dispatch(setUserToken(mockResponseToken));
        navigate(paths.DASHBOARD);
      }
    } catch (err) {
      console.log("err", err)
    }
  }

  return (
    <Box className="bg-img">
      <Formik
        validationSchema={formValidationSchema}
        initialValues={formInitialValues}
        enableReinitialize={false}
        onSubmit={(form) => {
          setButtonState('loading');
          handleFormSubmit(form)
        }}
      >
        {({ handleSubmit, values, errors, touched, setFieldValue, setTouched }) => {
          const renderForm = () => {
            const fields = Object.values({ ...LOGIN }).flat();

            setFormValidationSchema(yup.object(set_formik_validation_schema(fields)));

            setFormInitialValues({
              ...set_formik_initial_values(fields, undefined, false),
            });
          };

          useEffect(() => {
            renderForm();
          }, []);

          return (
            <Box className="bg-img">
            <Form
              className="login-form"
              autoComplete="off"
              noValidate
              onSubmit={handleSubmit}
            >
              {Object.entries({ ...LOGIN }).map(([key, value]) => (
                <Box className="form-section-gap">
                  <Typography className="form-heading">{section_name_formatter(key)}</Typography>
                  <Box className="form-control use-case-form-control">
                    {value.map((field) =>
                      filter_plugin_fields(
                        field,
                        Object.values({ ...LOGIN }).flat(),
                        errors,
                        values,
                        touched,
                        setFieldValue,
                        undefined,
                        true
                      )
                    )}
                  </Box>
                  <StyledButton
                    variant="outlined"
                    text={buttonStyle().text}
                    width={'100%'}
                    type="submit"
                    startIcon={buttonStyle().icon && buttonStyle().icon}
                    stroke={buttonStyle().iconStroke && buttonStyle().iconStroke}
                    iconWidth="1.2vw"
                    iconHeight="1.2vw"
                    background={buttonStyle().background}
                    color={buttonStyle().color}
                    buttonState={buttonState}
                  />
                </Box>
              ))}
            </Form>
            </Box>
          );
        }}
      </Formik>
    </Box>
  );
}
export default Login;
