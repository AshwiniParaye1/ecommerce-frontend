import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { login } from "../../redux/apiCalls";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const { isFetchin, error, currentUser } = useSelector((state) => state.user);
  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };
  if (currentUser) {
    history.replace("/");
    return null;
  }

  console.log("ERROR", error);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <input
        style={{ padding: 10, marginBottom: 20 }}
        type="text"
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        style={{ padding: 10, marginBottom: 20 }}
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        disabled={isFetchin}
        onClick={handleClick}
        style={{ padding: 10, width: 100 }}
      >
        Login
      </button>
      {error && <h4>Something went wrong...</h4>}
      {/* {currentUser && <Redirect to={"/"} />} */}
      {/* {!isFetchin && <h4>Something Went Wrong</h4>} */}
    </div>
  );
};

export default Login;
