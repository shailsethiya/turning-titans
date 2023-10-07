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
import variables from "../../containers/shared/variables.module.scss";
import StyledButton from "../../components/button";
import { CREATE_PROPOSAL } from "../../containers/shared/constants";
import Card from "../../components/card";
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

  const createProposal = (form) => {
    //Api call
    console.log("form====", form);
  };

  return (
    <Box className="proposal-form">
      <Formik
        validationSchema={formValidationSchema}
        initialValues={formInitialValues}
        enableReinitialize={true}
        onSubmit={async (form) => {
          setButtonState("loading");
          createProposal(form);
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
            <>
              <Card
                title="Create proposal"
                padding="1.111vw 1.111vw 0vw 1.111vw"
                divider={true}
              ></Card>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: "2vw",
                }}
              >
                <Form
                  style={{ width: "60%" }}
                  autoComplete="off"
                  noValidate
                  onSubmit={handleSubmit}
                >
                  <Card background={variables.white}>
                    {Object.entries({ ...CREATE_PROPOSAL }).map(
                      ([key, value]) => (
                        <Box className="form-section-gap">
                          <Typography className="form-heading">
                            {section_name_formatter(key)}
                          </Typography>
                          <Box className="form-section-gap">
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

                            <StyledButton
                              variant="outlined"
                              text={buttonStyle().text}
                              width={"100%"}
                              type="submit"
                              startIcon={
                                buttonStyle().icon && buttonStyle().icon
                              }
                              stroke={
                                buttonStyle().iconStroke &&
                                buttonStyle().iconStroke
                              }
                              iconWidth="1.2vw"
                              iconHeight="1.2vw"
                              background={buttonStyle().background}
                              color={buttonStyle().color}
                              buttonState={buttonState}
                            />
                          </Box>
                        </Box>
                      )
                    )}
                  </Card>
                </Form>
              </Box>
            </>
          );
        }}
      </Formik>
    </Box>
  );
};

export default withRouter(Proposal);
