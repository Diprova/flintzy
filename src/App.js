import React, { useState, useEffect } from "react";
import Nav from "./Components/Nav";
import { useCookies } from "react-cookie";
import "./App.css";

const App = () => {
  const [user, setUser] = useState();
  const [cookies] = useCookies(["user_detail"]);

  useEffect(() => {
    setUser(cookies.user_detail);
  }, [user]);

  console.log(user);

  return (
    <>
      <Nav user={user} />
    </>
  );
};

export default App;
