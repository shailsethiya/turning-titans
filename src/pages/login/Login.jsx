import React, { useState, useEffect } from "react";
import { Form, Formik } from 'formik';
// import { loginSchema } from "../../utils/index";
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
import Card from "../../components/card";
import StyledButton from '../../components/button';
import { LOGIN } from '../../containers/shared/constants';
// import { login } from "../../utils/loginAPi";
import variables from "../../containers/shared/variables.module.scss";
import { paths } from "../../routes/Path";
import { setUserToken } from "../../store/actions";
import { useNavigate } from "react-router-dom";
import './Login.scss'
import { login } from "../../store/actions/index";
import { alertDialogue } from "../../utils";

function Login() {
  const [formValidationSchema, setFormValidationSchema] = useState(yup.object({}));
  const [formInitialValues, setFormInitialValues] = useState({});
  const [buttonState, setButtonState] = useState('submit');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const buttonStyle = () => {
    return get_button_style(
      buttonState,
      'Sign in',
      'Please wait while we submit your Sign in request',
      'Sign in successfully',
      'Sign in  failed'
    );
  };

  const handleFormSubmit = async  (val) => {
    const body = {username : val?.username,
    password  :  val.password}
    const  res = await  dispatch(login(body));
    if(res.statusCode == 200){
      alertDialogue(res.message, "", "success");
      navigate(paths.PROPOSAL);
    }
  }

  return (
    <Box className="login-wrapper">
      <Formik
        validationSchema={formValidationSchema}
        initialValues={formInitialValues}
        enableReinitialize={true}
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
              style={{ width: "25%" }}
              autoComplete="off"
              noValidate
              onSubmit={handleSubmit}
            >
              <Card padding="2vw" borderRadius="2vw" background={variables.white}>
              {Object.entries({ ...LOGIN }).map(([key, value]) => (
                <Box className="form-section-gap">
                  <Typography className="form-heading">{section_name_formatter(key)}</Typography>
                  <Box className="form-section-gap">
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
              </Card>
            </Form>
            </Box>
          );
        }}
      </Formik>
    </Box>
  );
}
export default Login;
