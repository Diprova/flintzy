import React from "react";
import GoogleLogin from "react-google-login";
import { withCookies } from "react-cookie";
import "../App.css";

const Login = (props) => {
  const responseGoogle = (response) => {
    console.log(response.accessToken);
    console.log(response.profileObj);
    props.cookies.set("user_detail", JSON.stringify(response.accessToken), {
      path: "/",
    });
  };

  return (
    <div>
      <GoogleLogin
        clientId="778483277047-j3e7chol25pfqbqiru2pp0kh64a0l5j3.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};
const UpdatedLogin = withCookies(Login);
export default UpdatedLogin;
