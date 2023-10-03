import * as yup from "yup";

import { ErrorMsg } from "./ErrorMessages";
import { InputValidator } from "./constants";

/** ***************** 
@purpose : user for Validation Scheme
@Parameter : {} 
@Author : shailendra
******************/
export const FORM_SCHEMA = yup.object().shape({
  formName: yup.string().trim().required(ErrorMsg.PROVIDE_FORM_NAME),
});

export const AAD_SETCION_SCHEMA  =
yup.object().shape({
    name: yup.string().trim().required(ErrorMsg.SECTION_NAME_REQUIRED),
  });
export const ADD_QUESTIONS  =
yup.object().shape({
    question: yup.string().trim().required(ErrorMsg.PROVIDE_QUESTION),
  //   questionType: yup.object().test({
  //     message: ErrorMsg.QUESTION_TYPE,
  //     test: (obj) => obj?.value,
  // }),
  });
  export const loginSchema  =
  yup.object().shape({
    emailId: yup.string().trim().required(ErrorMsg.EMAIL).matches(InputValidator.emailRegExp,ErrorMsg?.EMAIL_MATCHES),
    password: yup.string().trim().required(ErrorMsg.PASSWORD).matches(InputValidator.passwordRegExp,ErrorMsg?.PASSWORD_MATCHES),
    });