import { omit } from "lodash";
import { useEffect, useState } from "react";

import { ErrorMsg, getInitialQuestionData, getLocalStorage } from "../utils";
import {
  LOCAL_STORAGE,
  QUESTION_TYPES,
  VALIDATION_KEYS,
} from "../utils/constants";

/** ***************** 
@Purpose : render form validation
@Parameter : {}
@Author : shailendra
******************/
const useForm = (callback, setAddSubQuestion) => {
  const [values, setValues] = useState(
    getInitialQuestionData(getLocalStorage(LOCAL_STORAGE.SET_SELECTED_SECTION))
  );
  const [errors, setErrors] = useState({});
  const [subErrors, setSubErrors] = useState({});
  const [selectedQuestionType, setSelectedQuestionType] = useState({});

  const defaultSubQuestion = {
    ifAnswers: [],
    question: {
      questionId: null,
      name: "",
      sectionId: getLocalStorage(LOCAL_STORAGE.SET_SELECTED_SECTION),
      isMandatory: false,
      isMultipleSelection: false,
      ansMinLen: 0,
      questionTypeId: null,
      singleOrMultipleSelection: false,
      descForLowestAns: 1,
      descForHighestAns: 5,
      answerOptions: [],
    },
  };
  const [subQuestion, setSubQuestion] = useState(defaultSubQuestion);

  // useEffect(() => {
  //   console.log(subQuestion, "subQuestion");
  //   console.log(values, "values");
  // }, [values, subQuestion]);

  // useEffect(() => {
  //   console.log(subErrors, "subErrors");
  //   console.log(errors, "errors");
  // }, [subErrors, errors]);

  const answerOptionData = {
    desc: "",
    markAsImportant: false,
  };

  useEffect(() => {
    if (values.meta?.questionType?.label === QUESTION_TYPES.RATING_SCALE) {
      const updatedData = { ...values };
      updatedData.answerOptions = getDynamicElement(values.descForHighestAns);
      setValues(updatedData);
    }
  }, [values.questionTypeId]);

  useEffect(() => {
    if (
      subQuestion.question.meta?.questionType?.label ===
      QUESTION_TYPES.RATING_SCALE
    ) {
      const updatedData = { ...subQuestion };
      updatedData.question.answerOptions = getDynamicElement(
        subQuestion.question.descForHighestAns
      );
      setSubQuestion(updatedData);
    }
  }, [subQuestion.question.questionTypeId]);
  /** ***************** 
@Purpose : used for validate form
@Parameter : {}
@Author : shailendra
******************/
  const validate = (name, value, isSub = false) => {
    let errorObj = { ...(isSub ? subErrors : errors) };
    const existErrorData = { ...(isSub ? subErrors : errors) };
    switch (name) {
      case VALIDATION_KEYS.NAME:
        if (value.length === 0) {
          errorObj = {
            ...existErrorData,
            name: ErrorMsg.QUESTION_NAME_REQUIRED,
          };
        } else if (value.length <= 4) {
          errorObj = {
            ...existErrorData,
            name: ErrorMsg.QUESTION_NAME_LENGTH,
          };
        } else {
          const newObj = omit(existErrorData, VALIDATION_KEYS.NAME);
          errorObj = newObj;
        }
        break;
      case VALIDATION_KEYS.QUESTION_TYPE_ID:
        if (value.length === 0) {
          errorObj = {
            ...existErrorData,
            questionTypeId: ErrorMsg.QUESTION_TYPE_REQUIRED,
          };
        } else {
          const newObj = omit(existErrorData, VALIDATION_KEYS.QUESTION_TYPE_ID);
          errorObj = newObj;
        }
        break;
      case VALIDATION_KEYS.MIN_CHAR:
        if (!value) {
          errorObj = {
            ...existErrorData,
            ansMinLen: ErrorMsg.MINIMUM_CHAR_REQUIRE,
          };
        } else {
          const newObj = omit(existErrorData, VALIDATION_KEYS.MIN_CHAR);
          errorObj = newObj;
        }
        break;
      default:
        break;
    }

    if (isSub) {
      setSubErrors(errorObj);
    } else {
      setErrors(errorObj);
    }
  };

  const getDynamicElement = (value) => {
    const dynamicElement = [];
    for (let i = 1; i <= parseInt(value); i++) {
      if (i <= 10) {
        dynamicElement.push({
          desc: i,
          markAsImportant: false,
        });
      }
    }
    return dynamicElement;
  };

  /** ***************** 
@Purpose : used for handleChange
@Parameter : {}
@Author : shailendra
******************/
  const handleChange = (name, value, objectData = null) => {
    const meta = {
      questionType: null,
    };
    const updatedData = {
      ...values,
      [name]: value,
    };

    if (name === VALIDATION_KEYS.QUESTION_TYPE_ID) {
      meta.questionType = objectData;
      updatedData.meta = meta;
    }
    if (name === VALIDATION_KEYS.MIN_CHAR) {
      updatedData.ansMinLen = value;
    }
    if (
      objectData &&
      (objectData.label === QUESTION_TYPES.CHECKBOX ||
        objectData.label === QUESTION_TYPES.RADIO_BUTTON)
    ) {
      updatedData.isMultipleSelection =
        objectData.label === QUESTION_TYPES.CHECKBOX ? true : false;
      updatedData.answerOptions = [answerOptionData];
    }

    if (name === VALIDATION_KEYS.DESC_FOR_HIGHEST_ANS) {
      updatedData.answerOptions = getDynamicElement(value);
    }

    validate(name, value);
    setValues(updatedData);
  };

  const getIsFormError = (errors, values) => {
    let isError = false;
    for (const err in errors) {
      if (errors[err] !== "") {
        isError = true;
        break;
      }
    }
    if (
      values?.meta?.questionType?.label === QUESTION_TYPES.CHECKBOX ||
      values?.meta?.questionType?.label === QUESTION_TYPES.RADIO_BUTTON
    ) {
      if (getIsCheckboxTypeBtnDisabled(values)) {
        isError = true;
      }
    }
    if (
      values?.meta?.questionType?.label === QUESTION_TYPES.TEXT_BOX &&
      (values?.ansMinLen === "" ||
        values?.ansMinLen === 0 ||
        isNaN(values?.ansMinLen))
    ) {
      isError = true;
    }
    return isError;
  };

  /** ***************** 
@Purpose : used for handle submit
@Parameter : {}
@Author : shailendra
******************/
  const handleSubmit = () => {
    const errorObj = {};
    if (values?.name?.length === 0) {
      errorObj.name = ErrorMsg.QUESTION_NAME_REQUIRED;
    }
    if (
      !values[VALIDATION_KEYS.QUESTION_TYPE_ID] ||
      values[VALIDATION_KEYS.QUESTION_TYPE_ID] === 0
    ) {
      errorObj.questionTypeId = ErrorMsg.QUESTION_TYPE_REQUIRED;
    }
    if (
      values?.meta?.questionType?.label === QUESTION_TYPES.TEXT_BOX &&
      (values.ansMinLen === "" ||
        values.ansMinLen === 0 ||
        isNaN(values.ansMinLen))
    ) {
      errorObj.ansMinLen = ErrorMsg.MINIMUM_CHAR_REQUIRE;
    }

    if (values?.meta?.questionType?.label === QUESTION_TYPES.RATING_SCALE) {
      if (values?.descForHighestAns < 1) {
        errorObj.descForHighestAns = ErrorMsg.RATING_SCALE_MAX_VALUE;
      }
      if (values?.descForLowestAns < 1) {
        errorObj.descForLowestAns = ErrorMsg.RATING_SCALE_MIN_VALUE;
      }
      if (values?.descForLowestAns >= values.descForHighestAns) {
        errorObj.descForLowestAns = ErrorMsg.RATING_MIN_MAX_EQUAL_VALUE;
      }
      if (values.descForHighestAns > 10) {
        errorObj.descForHighestAns = ErrorMsg.RATING_HIGHEST_MAX_VALUE;
      }
    }

    setErrors(errorObj);
    if (!getIsFormError(errorObj, values)) {
      callback();
    }
  };

  const addNewCheckList = (isSub = false) => {
    const existStateData = isSub ? { ...subQuestion.question } : { ...values };
    existStateData.answerOptions = [
      ...existStateData.answerOptions,
      answerOptionData,
    ];
    if (isSub) {
      setSubQuestion({
        ...subQuestion,
        question: existStateData,
      });
    } else {
      setValues(existStateData);
    }
  };

  const handleRemoveCheckItemList = (index, isSub = false) => {
    const newOptionList = isSub
      ? [...subQuestion.question.answerOptions]
      : [...values.answerOptions];
    newOptionList.splice(index, 1);
    if (isSub) {
      setSubQuestion({
        ...subQuestion,
        question: {
          ...subQuestion.question,
          newOptionList,
        },
      });
    } else {
      setValues({ ...values, answerOptions: newOptionList });
    }
  };

  /** ***************** 
  @Purpose : Used for add dynamic input in checkbox 
  @Parameter : {e}
  @Author : shailendra
  *******************/
  const handleCheckboxTypeChange = (event, index, key, isSub = false) => {
    const { value } = event.target;
    const newOptionList = isSub
      ? [...subQuestion.question.answerOptions]
      : [...values.answerOptions];
    newOptionList[index][key] = value;
    if (isSub) {
      setSubQuestion({
        ...subQuestion,
        question: {
          ...subQuestion.question,
          newOptionList,
        },
      });
    } else {
      setValues({ ...values, answerOptions: newOptionList });
    }
  };

  const getIsCheckboxTypeBtnDisabled = (values) => {
    let isError = false;
    if (values?.answerOptions?.length > 0) {
      for (const obj of values.answerOptions) {
        if (obj?.desc?.length === 0) {
          isError = true;
          break;
        }
      }
    }
    return isError;
  };

  const handleSubQuestionSubmit = () => {
    const errorObj = {};
    if (subQuestion.ifAnswers.length === 0) {
      errorObj.ifAnswers = ErrorMsg.IF_ANSWER_REQUIRED;
    }
    if (subQuestion.question.name.length === 0) {
      errorObj.name = ErrorMsg.QUESTION_NAME_REQUIRED;
    }
    if (!subQuestion.question.questionTypeId) {
      errorObj.questionTypeId = ErrorMsg.QUESTION_TYPE_REQUIRED;
    }
    if (
      subQuestion.question.questionTypeId &&
      subQuestion.question?.meta?.questionType?.label ===
        QUESTION_TYPES.TEXT_BOX
    ) {
      if (parseInt(subQuestion.question.ansMinLen) === 0) {
        errorObj.ansMinLen = ErrorMsg.MINIMUM_CHAR_REQUIRE;
      }
    }

    if (subQuestion.question.descForHighestAns > 10) {
      errorObj.descForHighestAns = ErrorMsg.RATING_HIGHEST_MAX_VALUE;
    }

    setSubErrors(errorObj);

    if (!getIsFormError(errorObj, subQuestion.question)) {
      setValues({
        ...values,
        subQuestions: [...values.subQuestions, subQuestion],
      });
      setSubQuestion(defaultSubQuestion);
      setAddSubQuestion(false);
    } else {
      console.log("notvalid", !getIsFormError(errorObj, subQuestion.question));
    }
  };

  const handleSubQuestionChanges = (name, value, objectData = null) => {
    const meta = {
      questionType: null,
    };

    const updatedData = {
      ...subQuestion,
      question: {
        ...subQuestion.question,
        [name]: value,
      },
    };
    const rootKey = updatedData.question;

    if (name === VALIDATION_KEYS.QUESTION_TYPE_ID) {
      meta.questionType = objectData;
      rootKey.meta = meta;
      setSelectedQuestionType(objectData);
    }
    if (name === VALIDATION_KEYS.MIN_CHAR) {
      rootKey.ansMinLen = value;
    }
    if (
      objectData &&
      (objectData.label === QUESTION_TYPES.CHECKBOX ||
        objectData.label === QUESTION_TYPES.RADIO_BUTTON)
    ) {
      rootKey.isMultipleSelection =
        objectData.label === QUESTION_TYPES.CHECKBOX ||
        objectData.label === QUESTION_TYPES.RADIO_BUTTON
          ? true
          : false;
      rootKey.answerOptions = [answerOptionData];
    }

    if (name === VALIDATION_KEYS.DESC_FOR_HIGHEST_ANS) {
      rootKey.answerOptions = getDynamicElement(value);
    }

    if (name === VALIDATION_KEYS.IF_ANSWERS) {
      updatedData.ifAnswers = [
        {
          questionDesc: value,
          answerDesc: true,
        },
      ];
    }

    if (name === VALIDATION_KEYS.NAME) {
      rootKey.name = value;
    }
    validate(name, value, true);
    setSubQuestion(updatedData);
  };

  const handleSubQuestionClose = () => {
    setSubQuestion(defaultSubQuestion);
  };

  const removeSubQuestionList = (index) => {
    const subQuestionOptionList = [...values.subQuestions];
    subQuestionOptionList.splice(index, 1);
    const existData = { ...values };
    existData.subQuestions = subQuestionOptionList;
    setValues(existData);
  };

  return {
    values,
    setValues,
    errors,
    subErrors,
    subQuestion,
    handleChange,
    handleSubQuestionChanges,
    handleSubmit,
    addNewCheckList,
    handleRemoveCheckItemList,
    handleCheckboxTypeChange,
    getIsCheckboxTypeBtnDisabled,
    handleSubQuestionSubmit,
    selectedQuestionType,
    handleSubQuestionClose,
    removeSubQuestionList,
  };
};

export default useForm;
