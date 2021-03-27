import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import Login from "./Login";
import "./../App.css";
import Tab1 from "./Tab1";

const TabBtn = ({ name, state }) => {
  return <div className={state === name ? "tabs active" : "tabs"}>{name}</div>;
};

const Nav = ({ user }) => {
  const [state, setState] = useState("Tab1");
  return (
    <div>
      <nav className="container">
        <div className="navbar">
          <ul>
            <li onClick={() => setState("Tab1")}>
              <TabBtn name={"Tab1"} state={state} />
            </li>
            <li onClick={() => setState("Tab2")}>
              <TabBtn name={"Tab2"} state={state} />
            </li>
            <Dropdown>
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                Dropdown
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">dropdown item 1</Dropdown.Item>
                <Dropdown.Item href="#/action-2">dropdown item 2</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </ul>

          <Login />
        </div>
      </nav>
      <Tab1 user={user} />
    </div>
  );
};

export default Nav;
