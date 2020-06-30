import React from "react";
import NEDForum from "./NEDForum.svg";
// import './Logo.scss';

function Logo() {
  return (
    <div className="Logo">
      <header>
        <img src={NEDForum} className="App-Logo" alt="Logo" />
      </header>
    </div>
  );
}

export default Logo;
