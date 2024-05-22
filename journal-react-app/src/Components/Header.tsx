import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const Header = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/profile", { credentials: "include" }).then(
      (response) => {
        response.json().then((userInfo) => {
          setUsername(userInfo.username);
        });
      }
    );
  }, []);

  async function logout() {
    try {
      await axios.post(
        "http://localhost:3000/logout",
        {},
        { withCredentials: true }
      );
      // Remove the token and username cookies
      Cookies.remove("token");
      Cookies.remove("username");
      setUsername(null);
      // Redirect to login page
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }

  return (
    <nav>
      <div className="logo">
        <Link to={"/"}>
          <svg
            fill="currentColor"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            width="30"
            height="30"
          >
            <path d="M3.75 2a.75.75 0 0 0-.75.75v10.5a.75.75 0 0 0 1.28.53L8 10.06l3.72 3.72a.75.75 0 0 0 1.28-.53V2.75a.75.75 0 0 0-.75-.75h-8.5Z" />
          </svg>
          <h1>
            <a>Daily Zen</a>
          </h1>
        </Link>
      </div>
      <input type="search" placeholder="Search..." />
      {username && (
        <>
          <div className="login-info">
            <div className="profile">
              <svg
                fill="currentColor"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                width="30"
                height="30"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0Zm-5-2a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM8 9c-1.825 0-3.422.977-4.295 2.437A5.49 5.49 0 0 0 8 13.5a5.49 5.49 0 0 0 4.294-2.063A4.997 4.997 0 0 0 8 9Z"
                />
              </svg>
              <h4>{username}</h4>
            </div>
            <div className="profile">
              <h4 onClick={logout}>Logout</h4>
            </div>
          </div>
        </>
      )}

      {!username && (
        <>
          <div className="profile">
            <Link to={"/login"}>
              <svg
                fill="currentColor"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                width="30"
                height="30"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0Zm-5-2a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM8 9c-1.825 0-3.422.977-4.295 2.437A5.49 5.49 0 0 0 8 13.5a5.49 5.49 0 0 0 4.294-2.063A4.997 4.997 0 0 0 8 9Z"
                />
              </svg>
              <h4>Profile</h4>
            </Link>
          </div>
        </>
      )}
    </nav>
  );
};

export default Header;
