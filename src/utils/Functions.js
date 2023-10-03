import swal from "sweetalert";

/** ***************** 
@purpose : used for alert message 
@Parameter : {msg, type,autoHide}
@Author : shailendra
******************/
export const alertDialogue = (msg, type = "error", autoHide = true) => {
  swal(msg || "Something Went Wrong", "", type);
  if (autoHide && type !== "error") {
    setTimeout(() => {
      swal.close();
    }, 3000);
  }
};

/** ***************** 
@purpose : Get local storage 
@Parameter : {name}
@Author : shailendra
******************/
export function getLocalStorage(name) {
  if (name) {
    return localStorage.getItem(name);
  }
  return "";
}
/** 
@purpose : Set local storage 
@Parameter : {name, value}
@Author : shailendra
**/
export function setLocalStorage(name, value) {
  if (name) {
    localStorage.setItem(name, value);
  }
}
/** *****************    
@purpose : Remove local storage 
@Parameter : {name}
@Author : shailendra
******************/
export function removeLocalStorage(name) {
  if (name) {
    localStorage.removeItem(name);
  }
}

export const sectionDetails = [
 { orderNumber:'1',name:"question1 "},
 { orderNumber:'2', name:"question 2"},
];
export const initialDataFormat = () => {
  return {
    isLoad: true,
    rows: [],
    columns: [],
    rowsPerPageOptions: [2, 10, 20, 30],
    currentPage: 0,
    totalElements: 0,
    totalNumberOfPages: 0,
    filters: {
      rank: true,
      rankGroup: true,
      nationality: true,
      managingOwner: true,
      managingAgency: true,
      vesselType: true,
      seafarerIDCode: true,
    },
  };
};
/******************* 
@Purpose : Add Value Label key based on key passed in function parameter used perticularly for the react select 
@Parameter :arrayObj, labelKey, valueKey
@Author : INIC
******************/
export const addLabelValue = (arrayObj, labelKey, valueKey) => {
  let newArrayObj = arrayObj ? [...arrayObj] : [];
  if (newArrayObj.length > 0) {
      for (let i = 0; i < arrayObj.length; i++) {
          newArrayObj[i].label = newArrayObj[i][labelKey];
          newArrayObj[i].value = newArrayObj[i][valueKey];
      }
  }
  return newArrayObj;
};