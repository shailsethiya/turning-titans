import React, { useEffect, useState } from "react";
import withRouter from "../../hooks/withRouter";
import { Form, Formik } from "formik";
import { Box, Typography } from "@material-ui/core";
import * as yup from "yup";
import {
  set_formik_validation_schema,
  set_formik_initial_values,
  section_name_formatter,
  filter_plugin_fields,
  get_button_style,
} from "../../containers/utils/utils";
import StyledButton from "../../components/button";
import { CREATE_PROPOSAL } from "../../containers/shared/constants";
import Card from "../../components/card";
import { ListingSkeleton } from "../../containers/shared/skeletons";
import "./Proposal.scss";

const Proposal = ({ history }) => {
  const [formValidationSchema, setFormValidationSchema] = useState(
    yup.object({})
  );
  const [formInitialValues, setFormInitialValues] = useState({});
  const [buttonState, setButtonState] = useState("submit");

  const buttonStyle = () => {
    return get_button_style(
      buttonState,
      "Submit",
      "Please wait while we submit your form",
      "Submit successfully",
      "Submit failed"
    );
  };

  return (
    <Box className="proposal-view">
      <Formik
        validationSchema={formValidationSchema}
        initialValues={formInitialValues}
        enableReinitialize={false}
        onSubmit={(form) => {
          setButtonState("loading");
        }}
      >
        {({
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
          setTouched,
        }) => {
          const renderForm = () => {
            const fields = Object.values({ ...CREATE_PROPOSAL }).flat();

            setFormValidationSchema(
              yup.object(set_formik_validation_schema(fields))
            );

            setFormInitialValues({
              ...set_formik_initial_values(fields, undefined, false),
            });
          };

          useEffect(() => {
            renderForm();
          }, []);

          return (
            <Form
              className="dashboard-form"
              autoComplete="off"
              noValidate
              onSubmit={handleSubmit}
            >
              {Object.entries({ ...CREATE_PROPOSAL }).map(([key, value]) => (
                <Card title="Create proposal" className="form-section-gap">
                  <Box className="fields-container">
                    {value.map((field) =>
                      filter_plugin_fields(
                        field,
                        Object.values({ ...CREATE_PROPOSAL }).flat(),
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
                    width={"100%"}
                    type="submit"
                    startIcon={buttonStyle().icon && buttonStyle().icon}
                    stroke={
                      buttonStyle().iconStroke && buttonStyle().iconStroke
                    }
                    iconWidth="1.2vw"
                    iconHeight="1.2vw"
                    background={buttonStyle().background}
                    color={buttonStyle().color}
                    buttonState={buttonState}
                  />
                </Card>
              ))}
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default withRouter(Proposal);
