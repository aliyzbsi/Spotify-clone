import { useForm } from "react-hook-form";
import LoginForm from "../components/LoginForm";

function Login({ loggedUser, setLoggedUser }) {
  return (
    <div>
      <LoginForm loggedUser={loggedUser} setLoggedUser={setLoggedUser} />
    </div>
  );
}

export default Login;
