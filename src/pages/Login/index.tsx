import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [auth] = useState({ username: "admin", password: "admin123456" });
  const navigate = useNavigate();

  const signIn = () => {
    if (!username || !password) {
      return setError("Please provide both the fields");
    } else if (username !== auth.username || password !== auth.password) {
      return setError("The username/password provided is wrong!");
    }

    navigate('/search')
  };

  return (
    <section className="h-screen w-full flex items-center justify-center">
      <div className="container w-[50%]">
        <h1 className="text-3xl font-bold text-center my-4">Login</h1>
        <div className="form-container">
          <p className="text-sm text-red-500 font-semibold text-center">
            {error}
          </p>
          <input
            type="text"
            className="my-4 py-3 px-4 rounded-md outline-none border bg-white shadow w-full"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="my-4 py-3 px-4 rounded-md outline-none border bg-white shadow w-full"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={signIn}
            className="w-full text-center bg-blue-800 outline-none font-semibold hover:bg-blue-900 text-white rounded-md py-2.5 shadow px-10 my-4 disabled:bg-gray-400 transition-all"
          >
            Login
          </button>
        </div>
      </div>
    </section>
  );
};

export default Login;
