import React from "react";
import BaseRoutes from "./routes/Routes";
// customized design intigration
import "react-datepicker/dist/react-datepicker.css";
import "./styles.scss";

/** *****************
@Purpose : render App
@Parameter : {}
@Author : shailendra 
******************/
function App() {
  return (
    <div className="App">
      <BaseRoutes />
    </div>
  );
}

export default App;
