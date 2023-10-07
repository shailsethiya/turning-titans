/* eslint-disable padding-line-between-statements */
/* eslint-disable no-fallthrough */
import React, { useCallback, useMemo } from 'react';
import {
  TextField,
  SvgIcon,
  Box,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Checkbox,
  Typography,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import * as yup from 'yup';
import _isArray from 'lodash/isArray';
import _isString from 'lodash/isString';
import _findIndex from 'lodash/findIndex';
import variables from '../shared/variables.module.scss';
import moment from 'moment';
import { isArray } from 'lodash';
import { ReactComponent as Spinner } from '../../assets/images/spinner.svg';
import { ReactComponent as Success } from '../../assets/images/success.svg';
import { ReactComponent as Arrow } from '../../assets/images/arrow.svg';
import UploadFile from '../../components/upload-file';

export const format_file_size = (bytes) => {
  const thresh = 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + ' B';
  }

  const units = ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let u = -1;
  const r = 10 ** 1;

  do {
    bytes /= thresh;
    ++u;
  } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);

  return bytes.toFixed(1) + ' ' + units[u];
};

export const find_step_count = (deployedDate) => {
  const currentDate = new Date();

  let step;
  let startDate = deployedDate;
  let timeDifference = (currentDate.getTime() - deployedDate.getTime()) / (60 * 60 * 1000);

  if (timeDifference <= 24) {
    step = 1800;
  } else if (24 < timeDifference && timeDifference < 48) {
    step = 7200;
  } else {
    step = 14400;
    startDate = currentDate - 60 * 60 * 24 * 2 * 1000;
  }

  return [step, startDate];
};

export const split_number = (num, parts) => {
  let n = Math.floor(num / parts);
  const arr = [];

  for (let i = 0; i < parts; i++) {
    arr.push(n);
  }

  if (arr.reduce((a, b) => a + b, 0) === num) {
    return arr;
  }

  for (let i = 0; i < parts; i++) {
    arr[i]++;

    if (arr.reduce((a, b) => a + b, 0) === num) {
      return arr;
    }
  }
};

export const date_to_from_now_daily = (date) => {
  const fromNow = moment(date).fromNow();

  return moment(date).calendar(null, {
    lastWeek: '[This week]',
    lastDay: '[Yesterday]',
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: 'dddd',
    sameElse: function () {
      return '[' + fromNow + ']';
    },
  });
};

export const split_time_into_days = (list, time) => {
  let sortedList = list.sort((a, b) => {
    return new Date(b[time]) - new Date(a[time]);
  });

  sortedList.forEach((element) => {
    const timestamp = element[time];
    element[time] = moment(element[time]).format('DD/MM/YYYY HH:mm:ss');
    element['day'] = date_to_from_now_daily(timestamp);
  });

  return sortedList;
};

export const generate_times = () => {
  const times = [];
  let startTime = 0;

  for (var i = 0; startTime < 24 * 60; i++) {
    const hour = Math.floor(startTime / 60);
    const minute = startTime % 60;
    times[i] = ('0' + (hour % 24)).slice(-2) + ':' + ('0' + minute).slice(-2);
    startTime = startTime + 30;
  }

  return times;
};

export const scroll_to_element = (element) => {
  element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
};

export const create_api_options = (method, projectId, data) => {
  const option = {
    method: method,
    headers: {
      'X-Project-Id': projectId,
    },
    data: method === 'POST' || method === 'PUT' ? data : undefined,
  };

  return option;
};

export const extract_query_param = (url, queryParam) => {
  const param = new URLSearchParams(url).get(queryParam);

  return param;
};

export const replace_underscore_from_text = (text) => {
  if (text) {
    text = text.toLowerCase().replace(/_/g, ' ');
  }

  return text;
};

export const transform_text_to_titlecase = (text) => {
  if (text) {
    text = text.toLowerCase();
    text = text[0].toUpperCase() + text.slice(1);
  }

  return text;
};

export const duration = (time1, time2) => {
  let endDate = new Date(time1);
  let startDate = new Date(time2);

  return `${((endDate - startDate) / 1000).toFixed(1)}s`;
};

export const format_used_dataset = (obj) => {
  const inputDatasetIndex = _findIndex(obj, {
    dataset: { source_type: 'local' },
  });

  const datasetName = JSON.parse(obj[inputDatasetIndex].dataset.source).uri.split('/').pop();

  return transform_text_to_titlecase(datasetName);
};

export const format_object = (obj, metrics) => {
  let newObj = {};

  if (obj) {
    obj.forEach((item) => {
      if (metrics) {
        newObj[item.key] = { ...item };
      } else {
        newObj[item.key] = item.value;
      }
    });
  }

  return newObj;
};

export const convert_time = (time) => {
  let localeDate = new Date(time);

  let formattedDate = `${localeDate.getDate()}/${localeDate.getMonth() + 1
    }/${localeDate.getFullYear()}, ${localeDate.getHours()}:${localeDate.getMinutes()}`;

  return formattedDate;
};

export const section_name_formatter = (sectionName) => {
  let formattedSectionName;

  formattedSectionName = replace_underscore_from_text(sectionName);

  formattedSectionName = transform_text_to_titlecase(formattedSectionName);

  return formattedSectionName;
};

export const extract_default_container_id = (fields) => {
  let fieldsValues = fields.map((field) => Object.values(field));
  let containerSize;

  fieldsValues.forEach((field, index) => {
    if (index === 0) {
      containerSize = field[0].find(
        (field) => field.field_id === 'default_container_size'
      ).field_value;
    }
  });

  return containerSize;
};

export const remove_additional_plugin_fields = (fields) => {
  if (fields) {
    Object.entries(fields).forEach(([key, value]) => {
      Object.entries(value).forEach(([pluginSection, pluginValue]) => {
        if (_isArray(pluginValue[0])) {
          fields.splice(key, 1);
        }
      });
    });
  }

  return fields;
};

export const remove_model_configuration = (fields) => {
  const modelConfigurationIndex = fields
    .map((field) => Object.keys(field))
    .flat()
    .findIndex((field) => field === 'model_configuration');

  if (modelConfigurationIndex > -1) {
    fields.splice(modelConfigurationIndex, 1);
  }

  const pluginIndex = fields
    .map((field) => Object.keys(field))
    .flat()
    .findIndex((field) => field === 'plugin');

  if (pluginIndex > -1) {
    fields.splice(pluginIndex, 1);
  }

  return fields;
};

export const handle_data_source_plugin = (fields) => {
  let fieldsValues = fields.map((field) => Object.values(field));
  let dataSource;

  fieldsValues.forEach((field, index) => {
    if (index === 0) {
      dataSource = field[0].find((field) => field.field_id === 'data_source')?.field_value;
    }
  });

  if (dataSource) {
    const referenceDatasetIndex = fields.findIndex((field) => field.reference_dataset);
    const currentDatasetIndex = fields.findIndex((field) => field.current_dataset);

    const datasourceOptions = [
      { key: 'reference_dataset', index: referenceDatasetIndex },
      { key: 'current_dataset', index: currentDatasetIndex },
    ];

    datasourceOptions.forEach((field, loopIndex) => {
      if (field.index > -1) {
        if (loopIndex === 0) {
          fields[field.index][field.key].forEach((field) => {
            field.field_value = '';
          });
        } else {
          fields[field.index][field.key].forEach((field) => {
            field.field_value = '';
          });
        }
      }
    });
  }

  return fields;
};

export const extract_plugin_fields = (fields) => {
  let fieldsValues = fields.map((field) => Object.values(field));
  let pluginFields = [];

  fieldsValues.forEach((field) => {
    if (_isArray(field[0])) {
      field[0].forEach((childField) => {
        if (childField['field_id']) {
          pluginFields.push({
            field_id: childField['field_id'],
            field_label: childField['field_label'],
            field_value: childField['field_value'],
            field_type: childField['field_type'],
            field_mandatory: childField['field_mandatory'],
          });
        } else {
          childField.forEach((field) => {
            pluginFields.push({
              field_id: field['field_id'],
              field_label: field['field_label'],
              field_value: field['field_value'],
              field_type: field['field_type'],
              field_mandatory: field['field_mandatory'],
            });
          });
        }
      });
    } else {
      let nestedFieldsValues = Object.values(field[0]);

      nestedFieldsValues.forEach((field) => {
        field.forEach((childField) => {
          pluginFields.push({
            field_id: childField['field_id'],
            field_label: childField['field_label'],
            field_value: childField['field_value'],
            field_type: childField['field_type'],
            field_mandatory: childField['field_mandatory'],
          });
        });
      });
    }
  });

  return pluginFields;
};

export const set_formik_initial_values = (pluginFields, frequency, addFrequency) => {
  const pluginInitialValues = {};

  pluginFields
    .filter((field) => Object.keys(field).includes('field_id'))
    .forEach((field) => (pluginInitialValues[field['field_id']] = field['field_value']));

  if (addFrequency) {
    pluginInitialValues['frequency'] = frequency
      ? frequency
      : {
        frequencyType: 'ONCE',
        time: '',
        zone: '',
        day: '',
        date: '',
      };
  }

  return pluginInitialValues;
};

export const set_formik_validation_schema = (pluginFields, values) => {
  const pluginValidationFields = {};

  pluginFields
    .filter((field) => field.field_type !== 'hidden' && Object.keys(field).includes('field_id'))
    .forEach((field) => {
      const {
        field_mandatory,
        field_value,
        field_validation_regex,
        field_validation_message,
        field_min_limit,
        field_min_message,
        field_max_limit,
        field_max_message,
        field_validation_regex_azure,
        field_validation_message_azure,
      } = field;

      const repo_manager_value = values && values.repo_manager === 'Azuredevops';

      let fieldName;

      fieldName = replace_underscore_from_text(field['field_label']);

      fieldName = transform_text_to_titlecase(fieldName);

      if (field_mandatory === 'yes' || field_mandatory === true) {
        if (typeof field_value === 'object') {
          const validationObject = {};

          Object.keys(field_value).forEach(
            (key) =>
            (validationObject[key] =
              (key === 'file' || key === 'value') &&
              yup.string().required(`${fieldName} is required`))
          );

          pluginValidationFields[field['field_id']] = yup.object().shape(validationObject);
        } else {
          pluginValidationFields[field['field_id']] = yup
            .string()
            .required(`${fieldName} is required`)
            .min(field_min_limit ? field_min_limit : 0, field_min_message ? field_min_message : '')
            .max(
              field_max_limit ? field_max_limit : 1000,
              field_max_message ? field_max_message : ''
            )
            .matches(
              repo_manager_value ? field_validation_regex_azure : field_validation_regex,
              repo_manager_value ? field_validation_message_azure : field_validation_message
            )
            .nullable();
        }
      } else if (field_validation_regex) {
        if (field_mandatory === 'yes' || field_mandatory === true) {
          pluginValidationFields[field['field_id']] = yup
            .string()
            .matches(field_validation_regex, field_validation_message);
        }
      } else {
        if (field_mandatory === 'yes' || field_mandatory === true) {
          pluginValidationFields[field['field_id']] = yup.string();
        }
      }
    });

  return pluginValidationFields;
};


export const get_severity_color = (option) => {
  switch (option.icon) {
    case 'red':
    case 'failed':
      return variables.bostonUniversityRed;

    case 'amber':
    case 'running':
      return variables.amber;

    case 'green':
    case 'successful':
      return variables.apple;

    default:
      break;
  }
};

export const get_button_style = (
  buttonState,
  submitText,
  loadingText,
  completedText,
  errorText,
  continueText,
  disabledText
) => {
  switch (buttonState) {
    case 'submit':

    // eslint-disable-next-line no-fallthrough
    case 'complete':
      return {
        text: submitText,
        background: variables.grape,
        color: variables.white,
      };

    case 'loading':
      return {
        text: loadingText,
        background: variables.chineseWhite,
        color: variables.suvaGrey,
        icon: Spinner,
      };

    case 'completed':
      return {
        text: completedText,
        background: variables.apple,
        color: variables.white,
        icon: Success,
        iconStroke: variables.white,
      };

    case 'error':
      return {
        text: errorText,
        background: variables.bostonUniversityRed,
        color: variables.white,
        icon: CircleX,
        iconStroke: variables.white,
      };

    case 'continue':
      return {
        text: continueText,
        background: variables.grape,
        color: variables.white,
      };

    case 'disabled':
      return {
        text: disabledText,
        background: variables.white,
        color: variables.suvaGrey,
      };

    default:
      break;
  }
};

export const filter_plugin_fields = (
  field,
  fields,
  errors,
  values,
  touched,
  setFieldValue,
  projectId,
  updatePluginData,
  updateObject,
  handlePopperComponentClick,
  showErrorMessage
) => {
  let {
    field_id,
    field_type,
    field_name,
    field_label,
    hide_field_label,
    field_placeholder,
    field_value,
    field_options,
    field_mandatory,
    field_width,
    field_preload,
    field_action,
    max_rows,
    min_rows,
    max_characters,
    popper_component,
    file_type,
    file_accept,
    helper_text,
    disabled,
  } = field;

  switch (field_type) {
    case 'select':
      return (
        <Autocomplete
          key={field_id}
          name={field_id}
          disableClearable
          fullWidth
          disabled={disabled && disabled}
          value={
            field_options.find(
              (option) =>
                (option.value ? option.value : option) ===
                (updateObject ? field_value : values[field_id])
            ) || null
          }
          options={field_options}
          onChange={(e, selectedValue) => {
            setFieldValue(
              field_id,
              selectedValue && selectedValue.value
                ? selectedValue.value
                : selectedValue.label
                  ? selectedValue.label
                  : selectedValue
            );

            if (updateObject) {
              field['field_value'] =
                selectedValue && selectedValue.value
                  ? selectedValue.value
                  : selectedValue.label
                    ? selectedValue.label
                    : selectedValue;
            }

            if (
              field_id === 'data_source' ||
              field_id === 'flavour' ||
              field_id === 'inputParameterType' ||
              field_id === 'inputParameterDataType'
            ) {
              updatePluginData(selectedValue, fields, field_id);
            }
          }}
          getOptionSelected={(option, value) =>
            option.label ? option.label === value.label : option === value
          }
          getOptionLabel={(option) => (option.label ? option.label : option)}
          popupIcon={<Arrow style={{ width: '0.8vw', height: '0.5vw' }} />}
          renderOption={(option) => {
            return option.icon ? (
              <Box display="flex" alignItems="center">
                <SvgIcon
                  style={{ fill: get_severity_color(option) }}
                  viewBox="0 -7 24 24"
                  component={Severity}
                />
                {option.label}
              </Box>
            ) : option.label ? (
              option.label
            ) : (
              option
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={
                field_mandatory === 'yes' || field_mandatory === true
                  ? field_label
                  : `${field_label} (Optional)`
              }
              placeholder={field_placeholder}
              variant="outlined"
              error={errors[field_id] && touched[field_id] && field_value?.length === 0}
              helperText={
                errors[field_id] && touched[field_id] && field_value?.length === 0
                  ? errors[field_id]
                  : ''
              }
              InputProps={{
                ...params.InputProps,
                variant: 'outlined',
                startAdornment: field_label === 'Severity' && field_value && (
                  <SvgIcon
                    style={{
                      fill: get_severity_color({ icon: field_value.toLowerCase() }),
                      marginLeft: '0.5vw',
                    }}
                    viewBox="0 -7 2 24"
                    component={Severity}
                  />
                ),
              }}
            />
          )}
          style={{ width: field_width ? field_width : '49%' }}
        />
      );

    case 'selectWithIcons':
      return (
        <Autocomplete
          key={field_id}
          name={field_id}
          disableClearable
          fullWidth
          value={
            field_options.find(
              (option) =>
                (option.value ? option.value : option) ===
                (updateObject ? field_value.value : values[field_id]?.value)
            ) || null
          }
          options={field_options}
          onChange={(e, selectedValue) => {
            if (selectedValue.icon) {
              setFieldValue(field_id, {
                label: selectedValue.label,
                value: selectedValue.value,
                icon: selectedValue.icon,
                iconName: selectedValue.iconName,
                viewBox: selectedValue.viewBox,
                tagsType: selectedValue?.tagsType,
              });

              if (updateObject) {
                field['field_value'] = {
                  label: selectedValue.label,
                  value: selectedValue.value,
                  icon: selectedValue.icon,
                  iconName: selectedValue.iconName,
                  viewBox: selectedValue.viewBox,
                  tagsType: selectedValue?.tagsType,
                };
              }
            } else {
              setFieldValue(
                field_id,
                selectedValue && selectedValue.value ? selectedValue.value : selectedValue
              );

              if (updateObject) {
                field['field_value'] =
                  selectedValue && selectedValue.value ? selectedValue.value : selectedValue;
              }
            }
          }}
          getOptionSelected={(option, value) =>
            option.label ? option.label === value.label : option === value
          }
          getOptionLabel={(option) => (option.label ? option.label : option)}
          popupIcon={<Arrow style={{ width: '0.8vw', height: '0.5vw' }} />}
          renderOption={(option) => {
            return option.icon ? (
              <Box display="flex" alignItems="center" gridGap="0.5vw">
                <SvgIcon
                  style={{ fill: get_severity_color(option) }}
                  viewBox={option.viewBox ? option.viewBox : '0 -7 24 24'}
                  component={_isString(option.icon) ? Severity : option.icon}
                />
                <Box>{option.label}</Box>
              </Box>
            ) : option.label ? (
              option.label
            ) : (
              option
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={
                field_mandatory === 'yes' || field_mandatory === true
                  ? field_label
                  : `${field_label} (Optional)`
              }
              placeholder={field_placeholder}
              variant="outlined"
              error={
                errors[field_id]?.value &&
                touched[field_id]?.value &&
                values[field_id]?.value?.length === 0
              }
              helperText={
                errors[field_id]?.value &&
                  touched[field_id]?.value &&
                  values[field_id]?.value?.length === 0
                  ? errors[field_id].value
                  : ''
              }
              InputProps={{
                ...params.InputProps,
                variant: 'outlined',
                startAdornment:
                  field_label === 'Severity' && field_value ? (
                    <SvgIcon
                      style={{
                        fill: get_severity_color({ icon: field_value.toLowerCase() }),
                        marginLeft: '0.5vw',
                      }}
                      viewBox="0 -7 2 24"
                      component={Severity}
                    />
                  ) : (
                    values[field_id]?.icon && (
                      <SvgIcon
                        style={{
                          fill: get_severity_color({
                            icon: values[field_id]?.value?.toLowerCase(),
                          }),
                          marginLeft: '0.5vw',
                        }}
                        viewBox={values[field_id].viewBox ? values[field_id].viewBox : '0 -7 2 24'}
                        component={values[field_id].icon ? values[field_id].icon : Severity}
                      />
                    )
                  ),
              }}
            />
          )}
          style={{ width: field_width ? field_width : '49%' }}
        />
      );

    case 'text':

    case 'number':

    case 'date':

    case 'datetime-local':

    case 'password':

    case 'multipleselect':
      return (
        <TextField
          key={field_id}
          name={field_id}
          label={
            field_mandatory === 'yes' || field_mandatory === true
              ? field_label
              : `${field_label} (Optional)`
          }
          placeholder={field_placeholder}
          variant="outlined"
          type={field_type}
          value={updateObject ? field_value : values[field_id] || ''}
          disabled={disabled && disabled}
          onChange={(e) => {
            setFieldValue(field_id, e.target.value);

            if (updateObject) {
              field['field_value'] = e.target.value;
            }
          }}
          error={
            errors[field_id] &&
            touched[field_id] &&
            (field_value.length === 0 || values[field_id].length === 0)
          }
          helperText={
            <Box display="flex" flexDirection="column">
              <Box>
                {errors[field_id] &&
                  touched[field_id] &&
                  (field_value.length === 0 || values[field_id].length === 0)
                  ? errors[field_id]
                  : ''}
              </Box>
              {helper_text && <Box className="word-count">{helper_text}</Box>}
            </Box>
          }
          style={{ width: field_width ? field_width : '49%' }}
        />
      );

    case 'multiline':
      return (
        <TextField
          key={field_id}
          name={field_id}
          label={field_mandatory === true ? field_label : `${field_label} (Optional)`}
          variant="outlined"
          multiline
          minRows={min_rows}
          maxRows={max_rows}
          inputProps={{ maxLength: max_characters }}
          type={field_type}
          value={updateObject ? field_value : values[field_id] || ''}
          onChange={(e) => {
            setFieldValue(field_id, e.target.value);

            if (updateObject) {
              field['field_value'] = e.target.value;
            }
          }}
          error={errors[field_id] && touched[field_id] && field_value.length === 0}
          helperText={
            <Box display="flex">
              <Box>{errors[field_id] && touched[field_id] ? errors[field_id] : ''}</Box>
              {max_characters && (
                <Box
                  marginLeft="auto"
                  className="word-count"
                >{`${values[field_id]?.length}/${max_characters} chars`}</Box>
              )}
            </Box>
          }
          style={{ width: field_width ? field_width : '49%' }}
        />
      );

    case 'radio':
      return (
        <FormControl className="full-width">
          <RadioGroup
            key={field_id}
            name={field_id}
            value={updateObject ? field_value : values[field_id]}
            onChange={(e) => {
              setFieldValue(field_id, e.target.value);

              if (updateObject) {
                field['field_value'] = e.target.value;
              }

              if (
                field_id === 'authenticationType' ||
                field_id === 'register_condition' ||
                field_id === 'notebook' ||
                field_id === 'dataset'
              ) {
                updatePluginData(e.target.value, fields);
              }
            }}
            style={{ display: 'flex', flexDirection: 'row', marginTop: '-0.8vw' }}
          >
            {field_options.map((field) => (
              <FormControlLabel
                key={field.label}
                value={field.value}
                control={<Radio color="primary" />}
                label={
                  field_mandatory === 'yes' || field_mandatory === true
                    ? field.label
                    : `${field.label} (Optional)`
                }
                className="cursor-pointer"
              />
            ))}
          </RadioGroup>
        </FormControl>
      );

    case 'upload':
      return (
        <UploadFile
          fieldId={field_id}
          fieldLabel={field_label}
          hideFieldLabel={hide_field_label}
          values={values}
          touched={touched}
          errors={errors}
          setFieldValue={setFieldValue}
          fileType={file_type}
          fileAccept={file_accept}
        />
      );

    case 'checkbox':
      return (
        <Box display="flex" alignItems="center">
          <Checkbox
            key={field_id}
            color="primary"
            onChange={(e) => setFieldValue(field_id, e.target.checked)}
            checked={field_id === 'algorithm' ? true : values[field_id] || false}
            style={{ paddingLeft: 0 }}
          />
          <Typography className="checkbox-label">{field_label}</Typography>
        </Box>
      );

    default:
      return null;
  }
};

// export const update_dialog_header = (datasource, component, titleText, dialogBtnText) => {
//   datasource.component = component;
//   datasource['dialogTitle'] = titleText;
//   datasource['dialogBtnText'] = dialogBtnText;

//   return datasource;
// };

// export const datasources_list = [
//   {
//     displayName: 'SNOWFLAKE',
//     type: 'SNOWFLAKE',
//     icon: Snowflake,
//     color: variables.buttonBlue,
//     width: '18vw',
//     hoverColor: variables.white,
//     viewBox: '0 0 44 42',
//   },
//   {
//     displayName: 'HIVE',
//     type: 'HIVE',
//     icon: Hive,
//     color: variables.yellowSun,
//     width: '7.5vw',
//     viewBox: '0 0 44 42',
//   },
//   {
//     displayName: 'POSTGRE SQL',
//     type: 'POSTGRES',
//     icon: PostgreSql,
//     color: variables.bdazzledBlue,
//     hoverColor: variables.white,
//     viewBox: '0 0 44 48',
//   },
//   {
//     displayName: 'BIGQUERY',
//     type: 'BIGQUERY',
//     icon: GoogleQuery,
//     color: variables.blueBerry,
//     width: '7.5vw',
//     hoverColor: variables.white,
//     viewBox: '0 0 44 42',
//   },
//   {
//     displayName: 'AMAZON S3',
//     type: 'AMAZON_S3',
//     icon: AmazonS3,
//     color: variables.carminePink,
//     hoverColor: variables.white,
//   },
//   {
//     displayName: 'TERADATA',
//     type: 'TERADATA',
//     icon: Teradata,
//     color: variables.chineseOrange,
//     width: '7.5vw',
//     hoverColor: variables.white,
//     viewBox: '0 0 36 36',
//     fill: true,
//   },
//   {
//     displayName: 'SQL SERVER',
//     type: 'SQLSERVER',
//     icon: SqlServer,
//     color: variables.carnelian,
//     hoverColor: variables.white,
//     viewBox: '0 0 36 36',
//   },
// ];

export const create_message_icon = (iframeElement, alertElement, image) => {
  const alertIcon = iframeElement.createElement('div');

  Object.assign(alertIcon.style, {
    backgroundImage: image,
    backgroundRepeat: 'no-repeat',
    width: '1.4vw',
    height: '1.4vw',
  });

  alertElement.prepend(alertIcon);
};

export const persona_notifications_map = () => {
  let notificationType;

  switch (localStorage.getItem('persona')) {
    case 'mlops':
      notificationType = 'Monitor,Model';
      break;

    default:
      break;
  }

  return notificationType;
};

export const render_formik_form = (
  form,
  setFormInitialValues,
  setFormValidationSchema,
  setForm,
  formStepData
) => {
  const fields = Object.values({ ...form }).flat();

  setFormValidationSchema(yup.object(set_formik_validation_schema(fields, formStepData)));

  setFormInitialValues(
    formStepData && Object.keys(formStepData).length > 0
      ? { ...formStepData }
      : {
        ...set_formik_initial_values(fields, undefined, false),
      }
  );

  setForm({ ...form });
};

export const get_icon = (svg) => {
  const icons = {
    'python.svg': Python,
    'r.svg': R,
    'scipy.svg': Scipy,
    'tensorflow.svg': Tenserflow,
    'spark.svg': Spark,
    'python_snowflake.svg': PythonSnowflake,
    'python-jupyterlab.svg': PythonJupyterlab,
    'python-vscode.svg': PythonVSCode,
    'java-vscode.svg': JavaVSCode,
    'snowflake-vscode.svg': SnowflakeVSCode,
    'spark-jupyterlab.svg': SparkJupyterlab,
    'r-jupyterlab.svg': RJupyterlab,
    'sas.svg': Sas,
  };

  return icons[svg];
};

export const get_icon_viewbox = (svg) => {
  const icons = {
    'python.svg': '0 0 34 36',
    'r.svg': '0 0 40 35',
    'scipy.svg': '0 0 90 100',
    'tensorflow.svg': '0 0 32 34',
    'spark.svg': '0 0 32 34',
    'python_snowflake.svg': '0 0 34 34',
    'python-jupyterlab.svg': '0 0 220 220',
    'python-vscode.svg': '0 0 30 30',
    'java-vscode.svg': '0 0 200 200',
    'snowflake-vscode.svg': '0 0 200 200',
    'spark-jupyterlab.svg': '0 0 220 220',
    'r-jupyterlab.svg': '0 0 220 220',
    'sas.svg': '0 0 80 200',
  };

  return icons[svg];
};

export const rename_keys_in_object = (element, tableMapping) => {
  Object.keys(element).forEach((key) => {
    if (tableMapping[key]) {
      delete Object.assign(element, { [tableMapping[key]]: element[key] })[key];
    }
  });

  return element;
};

export const rename_keys_in_collection = (collection, tableMapping) => {
  collection.forEach((element) => {
    rename_keys_in_object(element, tableMapping);
  });

  return collection;
};

export const get_base_id_from_experiment = (experiment) => {
  const templateIndex = _findIndex(experiment.tags, {
    key: 'selected_template',
  });

  const tags = JSON.parse(experiment.tags[templateIndex].value).tags;
  const versionIndex = tags.findIndex((tag) => tag.includes('version=') && tag.includes('.'));

  return tags[versionIndex].split('=').pop();
};

export const convertToDHMSformat = (seconds) => {
  let days = Math.floor(seconds / (3600 * 24));
  let hours = Math.floor((seconds % (3600 * 24)) / 3600);
  let minutes = Math.floor((seconds % 3600) / 60);
  let sec = Math.floor(seconds % 60);
  let str = '';
  str = days ? str.concat(days).concat('d ') : str;
  str = hours ? str.concat(hours).concat('h ') : str;
  str = minutes ? str.concat(minutes).concat('m ') : str;
  str = sec ? str.concat(sec).concat('s') : str;

  return str;
};

export const fetch_use_case = async (usecaseId) => {
  const usecaseInfo = await fetch_async_select_data('use_case_details', undefined, usecaseId);
  return usecaseInfo;
};
