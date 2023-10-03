import { getLocalStorage } from "./Functions";

export const ROLES = {
  ADMIN: "ADMIN",
  SEAFARER: "SEAFARER",
  AGENT: "AGENT",
  OPERATOR: "OPERATOR",
};

export const COOKIES = {
  TOKEN: "token",
};
export const LOCAL_STORAGE = {
  SET_SELECTED_SECTION: "setSelectedSection",
  SET_QUESTION_ID: "setQuestionId",
  SET_ORDER_CHANGE_SECTION: "setOrderChangeSection",
  REFRESH_TOKEN: "refresh_token",
  SET_ORDER_CHANGE_QUESTION: "setOrderChangeQuestion",
};

export const PAGE = "page";
export const COMMON = {
  SUCCESS: "success",
  ERROR: "error",
  ID: "id",
};

export const loginInitialData = {
  emailId: "",
  password: "",
};

export const STATUS_CODE = {
  UNAUTHORIZED: 401,
};

export const STATUS = {
  UNAUTHORIZED: "UNAUTHORIZED",
};

export const sectionInitData = {
  name: "",
  description: "",
  orderNumber: "",
};
// export const reorderInitData = {
//   fromQuestion: "",
//   toQuestion: "",
// };
export const logoutData = {
  token: false,
  refresh_token: false,
  userInfo: {},
};

export const resetPasswordInitData = {
  password: "",
  confimPassword: "",
};

export const forgetPasswordInitData = {
  emailId: "",
};

export const ruleGroupInitData = {
  ruleGroupName: "",
  selectedCategories: [],
  selectedSections: [],
};

export const RATING_SCALE = {
  like: "VERY LIKELY",
  unlike: "UNLIKELY",
  totalRatings: 5,
};

export const ANSWER_TYPES = {
  checkBox: "CheckBox",
  email: "Email",
  radio: "RadioButton",
  document: "Document",
  date: "Date",
  textBox: "Text Box",
  phoneNumber: "Phone Number",
  country: "Country",
  ratingScale: "RatingScale",
};

const REDUX_INITIAL_STORE = {
  ADMIN_STORE: {
    allSectionDetails: [],
    allLogsDetails: {
      isLoad: false,
      allLogs: [],
    },
    allQuestionTypes: [],
    sectionDetailsById: "",
    questions: {
      isLoad: false,
      questionsBySectionId: [],
      selectedSectionId: "",
    },
    question: {
      isLoad: false,
      isAdded: false,
      data: {},
    },
    categories: [],
    rulesData: {
      isLoad: false,
      data: [],
      currentPage: 0,
      totalElements: 0,
      totalNumberOfPages: 0,
    },
    addRuleGroup: {
      isLoad: false,
      isAdded: false,
    },
    deleteRuleGroup: {
      isLoad: false,
      isDeleted: false,
    },
    updateRule: {
      isLoad: false,
      data: {},
      isUpdated: false,
    },
    deactiveQuestion: {
      isLoad: false,
      isDeactive: false,
    },
    previewSectionData: {
      isLoad: false,
      data: [],
    },
  },
  AUTH_STORE: {
    userToken: {},
    refresh_token: getLocalStorage(LOCAL_STORAGE.REFRESH_TOKEN),
    userInfo: {},
    forgetPassword: {
      status: false,
      isMailSent: false,
    },
    resetPassword: {
      status: false,
      isLoad: false,
    },
  },
  UI_STORE: {
    isLoad: false,
    loaders: {
      page: false,
    },
    mobileDevice: {
      sidebar: false,
    },
    messages: [],
    modals: {
      add_modal: false,
    },
  },
  USER_STORE: {
    userRole: "",
  },
  COUNTRY_STORE: {
    allCountry: [],
  },
  SEAFARER_STORE: {
    activeDebriefing: {
      isLoad: false,
      data: {},
      isSubmit: false,
      isSave: false,
    },
  },
};

export const {
  ADMIN_STORE,
  AUTH_STORE,
  UI_STORE,
  USER_STORE,
  COUNTRY_STORE,
  SEAFARER_STORE,
} = REDUX_INITIAL_STORE;

export const VALIDATION_KEYS = {
  NAME: "name",
  QUESTION_TYPE_ID: "questionTypeId",
  MIN_CHAR: "ansMinLen",
  IS_MANDATORY: "isMandatory",
  IS_MULTIPLE_SELECTION: "isMultipleSelection",
  DESC_FOR_LOWEST_ANS: "descForLowestAns",
  DESC_FOR_HIGHEST_ANS: "descForHighestAns",
  IF_ANSWERS: "ifAnswers",
};
export const CHANGE_ORDER_KEYS = {
  FROM_QUE: "fromQuestion",
  TO_QUE: "toQuestion",
};
export const QUESTION_TYPES = {
  RADIO_BUTTON: "RadioButton",
  CHECKBOX: "CheckBox",
  TEXT_BOX: "Text Box",
  COUNTRY: "Country",
  RATING_SCALE: "RatingScale",
  DATE: "Date",
  DOCUMENT: "Document",
  PHONE_NUMBER: "Phone Number",
  EMAIL: "Email",
};

export const CATEGORIES = {
  rank: "Rank",
  rankGroup: "Rank group",
  managingOwner: "Managing owner",
  managingAgency: "Manning agency",
  vesselType: "Vessel type",
  nationality: "Nationality",
  seafarerIDCode: "Seafarer ID/code",
};

export const EMPTY_MESSAGE = "You don't have answer's for this question yet";

export const defaultFilters = {
  page: 1,
  size: 10,
  totalRecords: 0,
  categoryIds: "",
  sort: "",
};

export const getDefaultOptions = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

export const initialQuestionData = {
  name: "",
  sectionId: getLocalStorage(LOCAL_STORAGE.SET_SELECTED_SECTION),
  isMandatory: false,
  isMultipleSelection: false,
  ansMinLen: 0,
  questionTypeId: null,
  singleOrMultipleSelection: false,
  descForLowestAns: 1,
  descForHighestAns: 5,
  orderNumber: 0,
  answerOptions: [],
  subQuestions: [],
  ruleIds: [],
  meta: {
    questionType: null,
  },
};

export const ALL = "all";
export const REMOVE = "remove";
export const CODE = "code";
export const PHONE = "phone";
export const filterBy = {
  nationality: "Filter by nationality",
  rank: "Filter by rank",
  managingOwner: "Filter by managing owner",
  manningAgency: "Filter by manning agency",
  seafarerId: "Filter by Seafarer ID/ Code",
  columns: "Filter by columns",
  filters: "Filter by filters",
  rankGroup: "Filter by rank group",
  vesselTypes: "Filter by vessel types",
};
export const paginationDropdown = [
  { value: "5", label: "5" },
  { value: "10", label: "10" },
  { value: "25", label: "25" },
  { value: "50", label: "50" },
  { value: "100", label: "100" },
];
export const visibilityOptions = [
  { key: "always", name: "Always show question",id:1 },
  { key: "only", name: "Only show based on existing question:",id:2 },

];
export const  questionstate = [
  { value: "isansweredwith", label: "Is answered with:" },
  { value: "isvisible", label: "Is Visible" },
  { value: "ishidden", label: "Is Hidden" },
];
export const dateOptions = [
    { answervalue: "greaterhen", answerLabel: ">" },
    { answervalue: "lessthen", answerLabel: "<" },
    { answervalue: "greaterthequal", answerLabel: ">=" },
    { answervalue: "lessthenequal", answerLabel: "<=" },
    { answervalue: "equalqual", answerLabel: "==" },
    { answervalue: "notequal", answerLabel: "!=" },
  ];
  export const InputValidator = {
    phoneRegExp: /([+]?\d{1,2}[.-\s]?)?(\d{3}[.-]?){2}\d{4}/,
    passwordRegExp:
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    emailRegExp:
      /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    otpRegExp: /[0-9]{6,6}$/,
    alphaOnlyRegx: /^[^\d]+$/,
  };