import React from "react";
import axios from "axios";
import "./Header.css";
import { useHistory } from "react-router-dom";

function Header({
  authenticated,
  setAuthenticated,
  setUsername,
  setPassword,
  setUser,
  uploadFormRef = { uploadFormRef },
}) {
  const history = useHistory();
  async function logout() {
    const res = await axios.get("/user/logout");
    setAuthenticated(false);
    setUsername("");
    setPassword("");
    window.localStorage.setItem("user", "{}");
    setUser({});
    if (history) history.push("/");
  }

  return (
    <div className="app__header">
      <div className="app__headerContainer">
        <img
          className="app__headerImg"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        ></img>

        <ul className="app__headerList">
          <li className="app__headerListItem">
            <a
              onClick={() => {
                uploadFormRef.current.style.display =
                  uploadFormRef.current.style.display === "flex"
                    ? "none"
                    : "flex";
              }}
              className="btn btn--header"
              role="button"
            >
              Upload
            </a>
          </li>
          <li className="app__headerListItem">
            <a onClick={logout} className="btn btn--header" role="button">
              Log Out
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
