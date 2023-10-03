import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

export const configureMockStore = () => {
  const middleWares = [thunk];
  const mockStore = configureStore(middleWares);
  const store = mockStore({
    auth: { token: "" },
  });
  return store;
};

const MOCK_RESPONSE = {
  loginMockResponse: {
    success: true,
    message: "string",
    errors: ["string"],
    errorCode: 0,
    data: {
      authToken: "string",
    },
  },
  logoutMockResponse: {
    success: true,
    message: "string",
    errors: ["string"],
    errorCode: 0,
    data: {},
  },
  resetPasswordMockResponse: {
    success: true,
    message: "string",
    errors: ["string"],
    errorCode: 0,
    data: {},
  },
  forgetPasswordMockResponse: {
    success: true,
    message: "string",
    errors: ["string"],
    errorCode: 0,
    data: {},
  },
  userInfoMockResponse: {
    success: true,
    message: "string",
    errors: ["string"],
    errorCode: 0,
    data: {
      userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      idNumber: 0,
      name: "string",
      designation: "string",
      profilePicture: "string",
      roles: [{}],
    },
  },
  allSectionMockResponse: {
    success: true,
    message: "string",
    errors: ["string"],
    errorCode: 0,
    data: [
      {
        sectionId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        name: "string",
        description: "string",
        orderNumber: 0,
        questions: [
          {
            questionId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            name: "string",
            sectionId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            isMandatory: true,
            questionType: "string",
          },
        ],
      },
    ],
  },
  testSelectOptionMockResponse: [
    { label: "Mocked option 1", value: "mocked-option-1" },
    { label: "Mocked option 2", value: "mocked-option-2" },
    { label: "Mocked option 3", value: "mocked-option-3" },
    { label: "Mocked option 4", value: "mocked-option-4" },
    { label: "Mocked option 5", value: "mocked-option-5" },
  ],
  dataTableHeadingMockResponse: [
    { name: "Mock Name 1", selector: (row) => row.name1 },
    { name: "Mock Name 2", selector: (row) => row.name2 },
    { name: "Mock Name 3", selector: (row) => row.name3 },
    { name: "Mock Name 4", selector: (row) => row.name4 },
    { name: "Mock Name 5", selector: (row) => row.name5 },
    { name: "Mock Name 6", selector: (row) => row.name6 },
    { name: "Mock Name 7", selector: (row) => row.name7 },
  ],
  loginAndSetUser: {
    type: "SET_USER_DATA",
    data: { token: "abc123" },
  },
  invalidUserMockResponse: {
    success: true,
    message: "string",
    errors: ["string"],
    errorCode: 0,
    data: {},
  },
  headerWithOutToken: {
    "Content-Type": "application/json;",
    Accept: "application/json, application/+json",
  },
  headerWithToken: {
    "Content-Type": "application/json;",
    Accept: "application/json, application/+json",
    Authorization: "Bearer test-token",
  },
  getAllLogsMockResponse: {
    success: true,
    message: "string",
    errors: ["string"],
    errorCode: 0,
    data: [
      {
        logId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        createdDate: "2023-02-14T05:10:32.769Z",
        name: "string",
        description: "string",
        userName: "string",
      },
    ],
  },
  questionRender: {
    sectionId: "34d802c8-7a72-4cea-928b-e5a041fd8ce8",
    name: "Feedback for batch May-Oct 2022",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    orderNumber: 31,
    questions: [
      {
        questionId: "c560e9f6-a338-4f68-8484-8ba64c5ede38",
        name: "Question 1",
        sectionId: "34d802c8-7a72-4cea-928b-e5a041fd8ce8",
        isMandatory: true,
        questionTypeId: "4696fd07-4cdd-46a4-8c68-86b0b0a0603a",
        answerOptions: [
          {
            description: "feedback",
            markAsImportant: false,
          },
        ],
      },
    ],
  },
  dropDownMockResponse: {
    className: "dot-dropdown card-dropdown 1",
    key: "down-centered",
    id: "dropdown-button-drop-up-centered",
    drop: "down-centered",
    ToggleId: "dropdown-basic",
    MenuClassName: "dropdown-with-ic",
    Items: [
      {
        href: "",
        id: "item-1",
        itemClick: () => console.log("item 1 clicked"),
        text: "Item 1",
      },
      {
        href: "",
        id: "item-2",
        itemClick: null,
        text: "Item 2",
      },
    ],
    // eslint-disable-next-line react/react-in-jsx-scope
    DropdownToggle: <span className="icon-dots"></span>,
  },
};

const TEST_CASES = {
  loginTestCases: {
    pageRender: "login page test cases",
    fieldAndTextBox:
      "renders login page and check title, two text box on screen",
    noDataField: "on submit, with no input data login request is not called",
    noRequestCall:
      "on submit, with invalid input data login request is not called",
    requestCall: "on submit, with valid input data login request happens",
  },
  dashboardTestCases: {
    testCase: "dashboard page test cases",
    pageRender: "renders dashboard page",
    renderSectionData: "renders section data",
    addSectionBtn: "add section button when clicked",
  },
  forgotPasswordTestCases: {
    testCase: "forgot password page test cases",
    pageRender: "renders forgot password page",
    noDataField:
      "on submit, with no input data forgot password request is not called",
    noRequestCall:
      "on submit, with invalid input data forgot password request is not called",
    requestCall:
      "on submit, with valid input data forgot password request happens",
  },
  resetPasswordTestCases: {
    testCase: "reset password page test cases",
    pageRender: "renders reset password page",
    noDataField:
      "on submit, with no input data reset password request is not called",
    noRequestCall:
      "on submit, with invalid input data reset password request is not called",
    requestCall:
      "on submit, with valid input data reset password request happens",
  },
  seafarersTestCases: {
    testCase: "seafarers profile page test cases",
    headerDetails: "should have seafarers header details",
    logoutClick: "on click of logout button",
    ansDebClick: "on click of answer debriefing button",
    profilePic: "seafarers profile pic must have src and alt",
    dropDown: "prevDefDropDown should work",
    userInfoAPIMock: "user info api mock response test case",
  },
  newQuestionTestCases: {
    testCase: "new question test cases",
    renderScreen: "new question screen render",
    tabOneTestCases: "tab new question test cases",
    newQuestion: "new question: render screen elements",
    newQueBtnClick: "new question button click handle",
    subQue: "sub-question & rule: render modal when click on add button",
    rules: "rules: render screen elements",
  },
  themeContextTestCases: {
    testCase: "theme context test cases",
    checkTheme: "Should check theme",
    checkFunction: "Should check function",
  },
  ruleGroupListingTestCase: {
    testCase: "rule group listing screen test cases",
    renderScreen: "rule group listing screen should render",
    selectTestCase: "test react-select component",
    applyClearBtn: "test apply filters and clear filters button",
    dataListTestCase: "test rule group data listing",
    usingSelector: "should render the correctly when using selector function",
    onSelectedRowsChange:
      "should call onSelectedRowsChange with the correct values when select all rows is selected",
    pagination: "should render correctly if pagination is enabled",
    pageOne: "should navigate to page 1 if the table is sorted",
    buttonsToBeCheck: [
      {
        testId: "applyFilterBtn",
        text: "APPLY FILTERS",
      },
      {
        testId: "clearFilterBtn",
        text: "APPLY FILTERS",
      },
    ],
    checkText: ["Rule Groups", "Rank groups"],
  },
  ruleGroupAddTestCase: {
    testCase: "test cases for add rule group screen",
    renderScreen: "should render screen with elements and texts",
    checkBtnClick: "should click save button",
    screenTabs: "should render no nav items if no tabs are supplied",
    buttonsToBeCheck: ["submitBtn", "nextBtn"],
    checkText: [
      "New rule group",
      "SAVE",
      "Section Name",
      "Rule Group",
      "Add receivers",
      "Assign Questions",
    ],
  },
  dropZoneTestCases: {
    testCase: "test cases for DropZone",
    dropFile: "should drop file",
    dropMultipleFile: "should upload multiple files",
  },
  adminReducerTestCases: {
    testCase: "admin reducer test cases",
    renderInitialState: "should return the initial state",
    setSectionDetails: "should handle SET_ALL_SECTION_DETAILS",
  },
  authReducerTestCases: {
    testCase: "auth reducer test cases",
    renderInitialState: "should return the initial state",
    setUserData: "should handle SET_USER_DATA",
    setLogoutData: "should handle LOGOUT_USER",
  },
  dateTimeTestCases: {
    testCase: "test cases for DatePicker",
    inputRender: "renders an input component",
    openOnClick: "opens the datepicker when the input is clicked",
    selectDateOnClick: "selects the correct date when a date is clicked",
    eventChange: "handles change events correctly",
  },
  dropDownTestCases: {
    testCase: "test cases for Dropdown",
    render: "renders without crashing",
    renderDropDown: "renders a dropdown component",
    openOnToggelClick: "opens the dropdown when the toggle is clicked",
    eventChange: "handles item click events correctly",
  },
  logTestCases: {
    testCase: "test cases for log detail screen",
    shouldRender: "should render log detail screen",
    checkRequestMock: "check logs api response mocking",
  },
  toolTipTestCase: {
    testCase: "test cases for Tooltip",
    render: "renders without crashing",
    renderComponent: "renders a Tooltip component",
    displayWhenTrigger:
      "displays the Tooltip when the trigger element is hovered",
    hideWhenNoHover:
      "hides the Tooltip when the trigger element is no longer hovered",
  },
  apiTestCases: {
    getFunction: "get API function test cases",
    showLoader: "dispatches toggleLoader with true and PAGE as the loader",
    hideLoader: "dispatches toggleLoader with true and the provided loader",
    successfulLogin: "Test for successful login",
    setUserDataOnLogin:
      "dispatches SET_USER_DATA action and sets auth token cookie on successful login",
    unsuccessfulLogin: "Test for unsuccessful login",
    showError: "shows error message on unsuccessful login",
    logoutTestCase: "Test for successful logout",
    dispatchLogout: "should dispatch logoutUser action on successful logout",
    getHeaders: "test cases for get initial and auth headers",
    correctInitHeaders: "getInitialHeaders returns correct initial headers",
    headerWithToken:
      "getHeader returns correct headers with token cookie available",
    headerWithOutToken:
      "getHeader returns correct headers with no token cookie available",
    postFunction: "post API function test cases",
    postToggleLoader:
      "post toggles loader on when a loader is passed as a parameter",
  },
  questionRenderTestCases: {
    testCase: "All test cases for QuestionRender component",
    renderScreen: "should render question listing",
    renderLink: "should render with the correct `to` prop",
    correctProps: "should render with the correct props",
    hideShow: "should show/hide the dropdown menu when toggle is clicked",
    renderQueHeading: "should render question heading",
  },
};

export const {
  loginMockResponse,
  logoutMockResponse,
  resetPasswordMockResponse,
  forgetPasswordMockResponse,
  userInfoMockResponse,
  allSectionMockResponse,
  testSelectOptionMockResponse,
  dataTableHeadingMockResponse,
  loginAndSetUser,
  invalidUserMockResponse,
  headerWithOutToken,
  headerWithToken,
  getAllLogsMockResponse,
  questionRender,
  dropDownMockResponse,
} = MOCK_RESPONSE;

export const {
  loginTestCases,
  dashboardTestCases,
  forgotPasswordTestCases,
  resetPasswordTestCases,
  seafarersTestCases,
  newQuestionTestCases,
  themeContextTestCases,
  ruleGroupListingTestCase,
  ruleGroupAddTestCase,
  dropZoneTestCases,
  adminReducerTestCases,
  authReducerTestCases,
  dateTimeTestCases,
  dropDownTestCases,
  logTestCases,
  toolTipTestCase,
  apiTestCases,
  questionRenderTestCases,
} = TEST_CASES;

export const COMMON_TEST_ID = {
  employeeID: "employeeID",
  userEmail: "userEmail",
  password: "password",
  confirmPassword: "confirmPassword",
  submitBtn: "submitBtn",
  cancelBtn: "cancelBtn",
  nextBtn: "nextBtn",
  openModalTestId: "openModalTestId",
  textField: "textField",
  logoutButton: "logoutButton",
  profilePic: "profilePic",
  newTab1: "newTab1",
  newTab2: "newTab2",
  newTab3: "newTab3",
  typeQueField: "typeQueField",
  queHeading: "queHeading",
  queType: "queType",
  addRulesModal: "addRulesModal",
  ruleLists: "ruleLists",
  commonDataList: "commonDataList",
  mySelectComponent: "mySelectComponent",
  dropInput: "drop-input",
  logHeading: "log-heading",
  queList: "queList",
  newQuestion: "newQuestion",
  dropdown: "dropdown",
  quesHeading: "quesHeading",
};

export const COMMON_CLASS = {
  formFalse: "false form-control",
  filledFormControl: "input-filled form-control",
  errorFilledFormControl: "false form-control is-invalid",
};

export const commonRoleName = "textbox";

export const COMMON_NAME = {
  Dropdown: "Dropdown",
  item1: "Item 1",
  hoverMe: "Hover Me",
  tooltipContent: "Tooltip Content",
  name: "name",
  selectedCategories: "selectedCategories",
};

export const dataMock = (colProps) => {
  return {
    columns: [{ name: "Test", selector: (row) => row.some.name, ...colProps }],
    data: [
      {
        id: 1,
        ruleGroup: "Mock rule group",
        rank: "-",
        rankGroup: "Mock rank group",
        showFullData: true,
        nationality: "Mock",
        manningAgency: {
          heading: "Mock",
          data: ["ODO", "OCB", "OEM", "PAX"],
        },
        vesselType: "-",
        seafarerID: "-",
        managingOwner: "-",
      },
      {
        id: 2,
        ruleGroup: "Mock rule group",
        rank: "-",
        rankGroup: "Mock rank group",
        showFullData: true,
        nationality: "Mock",
        manningAgency: {
          heading: "Mock",
          data: ["ODO", "OCB", "OEM", "PAX"],
        },
        vesselType: "-",
        seafarerID: "-",
        managingOwner: "-",
      },
    ],
  };
};

export const fileMockData = () => {
  return {
    mockFiles: [
      new File(["hello"], "hello.geojson", { type: "application/json" }),
      new File(["there"], "hello2.geojson", { type: "application/json" }),
    ],
    mockFileName: ["hello.geojson", "hello2.geojson"],
  };
};

export const testData = { email: "test@test.com", password: "test" };

export const checkToBeOnDom = [
  "queHeading",
  "typeQueField",
  "queType",
  "addRulesModal",
  "ruleLists",
];
export const checkTitleTxt = [
  "Mandatory question",
  "Minimum required characters",
];
export const checkButtons = ["submitBtn", "cancelBtn"];

export const mockDataDropDown = (jest) => {
  return [
    {
      label: "Item 1",
      onClick: jest.fn(),
    },
    {
      label: "Item 2",
      onClick: jest.fn(),
    },
  ];
};

export const initFormik = (jest) => {
  return {
    values: {},
    handleChange: jest.fn(),
    setFieldValue: jest.fn(),
    errors: {},
    touched: {},
  };
};
