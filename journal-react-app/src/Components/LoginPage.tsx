import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import axios from "axios";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        { username, password },
        { withCredentials: true }
      );
      console.log("Data send successfully: ", response.data);
      navigate("/");
    } catch (err) {
      alert("Login failed!. Please try again!");
      console.log(err);
    }
  }

  return (
    <>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form onSubmit={login}>
        <h3>Login Here</h3>

        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="Email or Phone"
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <button type="submit">Log In</button>
        <button>
          <Link to={"/register"}>Register</Link>
        </button>
        <div className="social">
          <div className="go">
            <i className="fab fa-google"></i> Google
          </div>
          <div className="fb">
            <i className="fab fa-facebook"></i> Facebook
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginPage;
