import React from "react";
import "../styles/normalize.sass";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/style.sass";
import Header from "./Header.jsx";
import Coding from "./CodingHook.jsx";

const App = () => {
  return (
    <>
      <Header />
      <Coding />
    </>
  );
};

export default App;
