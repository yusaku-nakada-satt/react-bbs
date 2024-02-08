import React from "react";
import "./header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      <header className="App-header">
        <div className="app-name">
          React BBS
          <span>
            <p className="thred-link">
              <Link to={`/thred/new`}>スレッドを立てる</Link>
            </p>
          </span>
        </div>
      </header>
    </div>
  );
}

export default Header;
