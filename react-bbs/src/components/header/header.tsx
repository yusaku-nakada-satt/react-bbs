import React from "react";
import "./header.css";

function Header() {
  return (
    <div>
      <header className="App-header">
        <div className="app-name">
          React BBS
          <a href="#">スレッドを立てる</a>
        </div>
      </header>
    </div>
  );
}

export default Header;
