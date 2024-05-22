import { useState } from "react";
import axios from "axios";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function register(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/register", {
        username,
        password,
      });
      console.log(response);
      console.log("Data sent successfully:", response.data);
      if (response.status === 201) {
        alert("Registration Successfully!");
      } else {
        alert("Registration Failed. Please try again!");
      }
    } catch (error) {
      alert("Registration Failed. Please try again!");
      console.error("Error sending data:", error);
    }
  }

  return (
    <>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form onSubmit={register}>
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

        <button>Register</button>
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

export default RegisterPage;
