import React, { useEffect, useState } from "react";
import withRouter from "../../hooks/withRouter";
import { Form, Formik } from "formik";
import Card from "../../components/card";
import {
  set_formik_validation_schema,
  set_formik_initial_values,
  section_name_formatter,
  filter_plugin_fields,
  get_button_style,
} from "../../containers/utils/utils";
import { ListingSkeleton } from "../../containers/shared/skeletons";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import { Box, Typography } from "@material-ui/core";
import * as yup from "yup";
import StyledButton from "../../components/button";
import variables from "../../containers/shared/variables.module.scss";
import { MANAGE_OFFER } from "../../containers/shared/constants";
import listingmock from "./listingmock.json";
import "./Offering.scss";

const Offering = () => {
  const [formValidationSchema, setFormValidationSchema] = useState(
    yup.object({})
  );
  const [listing, setListing] = useState([]);
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

  const fetchList = () => {
    const { data } = listingmock;
    setListing(data);
  };

  useEffect(() => {
    fetchList();
  }, []);



  return (
    <Box className="manage-view">
      <Card title="Offering" padding="1.111vw 1.111vw 0vw 1.111vw" divider={true}>
      </Card>
      <Box style={{ display: "flex" }}>
        <Box style={{ width: '40%'}}>
          <Formik
            validationSchema={formValidationSchema}
            initialValues={formInitialValues}
            enableReinitialize={true}
            onSubmit={async (form) => {
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
                const fields = Object.values({ ...MANAGE_OFFER }).flat();

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
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      paddingTop: "2vw",
                    }}
                  >
                    <Card>
                      <Form
                        style={{ width: "100%" }}
                        autoComplete="off"
                        noValidate
                        onSubmit={handleSubmit}
                      >

                        {Object.entries({ ...MANAGE_OFFER }).map(
                          ([key, value]) => (
                            <Box className="form-section-gap">
                              <Typography className="form-heading">{section_name_formatter(key)}</Typography>
                              <Box className="form-section-gap">
                                {value.map((field) =>
                                  filter_plugin_fields(
                                    field,
                                    Object.values({ ...MANAGE_OFFER }).flat(),
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
                      </Form>
                    </Card>
                  </Box>
                </>
              );
            }}
          </Formik>
        </Box>
        <Box style={{ width: '60%'}}>
          <Card
            borderRadius="0"
            title="Listing">
          </Card>
          <Box>
            <List className="list-header" aria-label="Model at risk">
              <ListItemText
                style={{ paddingLeft: "2vw" }}
                className="col-width1"
                primary={<label className="card-title table-header">No.</label>}
              />
              <ListItemText
                className="col-width2"
                primary={<label className="card-title table-header">Name</label>}
              />
              <ListItemText
                className="col-width"
                primary={
                  <label className="card-title table-header">LITM Offering</label>
                }
              />
              <ListItemText
                className="col-width"
                primary={
                  <label className="card-title table-header">Created By</label>
                }
              />
            </List>
          </Box>

          {listing?.length > 0 ? (
            <Box className="list-body">
              {listing?.map((item, i) => (
                <List
                  key={i}
                  className="list-item-risk"
                  aria-label="Model At Risk list"
                >
                  <ListItemText
                    style={{ paddingLeft: "2vw" }}
                    className="col-width1"
                    primary={<label className="list-col run">{i + 1}</label>}
                  />
                  <ListItemText
                    className="col-width2"
                    primary={
                      <label
                        onClick={() => {
                          handlePreviewOpen(item);
                        }}
                        style={{ color: variables.grape }}
                        className="list-col run"
                      >
                        {item?.name}
                      </label>
                    }
                  />
                  <ListItemText
                    className="col-width"
                    primary={
                      <label className="list-col run">{item?.LITM_offering}</label>
                    }
                  />
                  <ListItemText
                    className="col-width"
                    primary={
                      <label className="list-col run">{item?.created_by}</label>
                    }
                  />
                </List>
              ))}
            </Box>
          ) : (
            <Card>
              <ListingSkeleton />
            </Card>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default withRouter(Offering);
