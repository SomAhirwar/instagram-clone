import React from "react";
import axios from "axios";
import "./SignupForm.css";
import { useHistory } from "react-router-dom";
import loginLogo from "../../img/login_logo.png";
import inputSetState from "../../utils/inputSetState";

function SignupForm({
  username,
  password,
  usernameSetState,
  passwordSetState,
  setAuthenticated,
  setUser,
}) {
  const [email, setEmail] = React.useState("");
  const [fullname, setFullname] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const history = useHistory();

  const usernameLabelRef = React.useRef();
  const passwordLabelRef = React.useRef();
  const fullnameLabelRef = React.useRef();
  const emailLabelRef = React.useRef();
  const confirmPasswordLabelRef = React.useRef();

  async function onSignup(event) {
    event.preventDefault();
    try {
      const user = await axios.post(
        `/user/signup`,
        {
          username,
          password,
          passwordConfirm: confirmPassword,
          email,
          fullname,
        },
        { withCredentials: true }
      );
      console.log(typeof setUser);
      window.localStorage.setItem("user", JSON.stringify(user.data.data.user));
      setUser(user.data.data.user);
      setAuthenticated("true");
      history.push("/");
    } catch (error) {
      console.log(error);
      if (error.response) {
        console.log("hello");
        console.log(error.response);
        // Request made and server responded
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
        alert(
          `Error (${error.response.status}):\n${error.response.data.error}`
        );
      } else if (error.request) {
        // The request was made but no response was received
        console.log("response not recieved from server");
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        alert("Error", error.message);
      }
    }
  }

  return (
    <div>
      <div className="authentication-box">
        <div className="auth">
          <div className="auth__image-container">
            <img
              className="auth-form__image"
              src={loginLogo}
              alt="Instagram-Logo"
            ></img>
          </div>
          <form className="auth__form" onSubmit={onSignup}>
            <label className="auth__label" ref={fullnameLabelRef}>
              <span>Full Name</span>

              <input
                className="auth__input"
                type="text"
                value={fullname}
                onFocus={() => {
                  fullnameLabelRef.current.style.border = "1px solid grey";
                }}
                onBlur={() => {
                  fullnameLabelRef.current.style.border = "1px solid lightgrey";
                }}
                onChange={inputSetState(setFullname)}
                required={true}
              />
            </label>

            <label className="auth__label" ref={emailLabelRef}>
              <span>email</span>

              <input
                className="auth__input"
                type="email"
                value={email}
                onFocus={() => {
                  emailLabelRef.current.style.border = "1px solid grey";
                }}
                onBlur={() => {
                  emailLabelRef.current.style.border = "1px solid lightgrey";
                }}
                onChange={inputSetState(setEmail)}
                required={true}
              />
            </label>

            <label className="auth__label" ref={usernameLabelRef}>
              <span>username</span>

              <input
                className="auth__input"
                value={username}
                onFocus={() => {
                  usernameLabelRef.current.style.border = "1px solid grey";
                }}
                onBlur={() => {
                  usernameLabelRef.current.style.border = "1px solid lightgrey";
                }}
                onChange={usernameSetState}
                required={true}
              />
            </label>

            <label className="auth__label" ref={passwordLabelRef}>
              <span>password</span>

              <input
                className="auth__input"
                type="password"
                value={password}
                onFocus={() => {
                  passwordLabelRef.current.style.border = "1px solid grey";
                }}
                onBlur={() => {
                  passwordLabelRef.current.style.border = "1px solid lightgrey";
                }}
                onChange={passwordSetState}
                required={true}
              />
            </label>

            <label className="auth__label" ref={confirmPasswordLabelRef}>
              <span>confirm password</span>

              <input
                className="auth__input"
                type="password"
                value={confirmPassword}
                onFocus={() => {
                  confirmPasswordLabelRef.current.style.border =
                    "1px solid grey";
                }}
                onBlur={() => {
                  confirmPasswordLabelRef.current.style.border =
                    "1px solid lightgrey";
                }}
                onChange={inputSetState(setConfirmPassword)}
                required={true}
              />
            </label>

            <button className="auth__submit">Log In</button>
          </form>
        </div>
        <div className="signup">
          Already have an account? <a href="/">Login</a>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;

/*
 */
