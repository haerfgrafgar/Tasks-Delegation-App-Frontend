import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAuth } from "../Context/useAuth";
import { useNavigate } from "react-router";
import "../assets/css/LoginPage.css";

type LoginFormsInputs = {
  userName: string;
  password: string;
};

const validation = Yup.object().shape({
  userName: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const { loginUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormsInputs>({ resolver: yupResolver(validation) });

  const handleLogin = async (form: LoginFormsInputs) => {
    await loginUser(form.userName, form.password);
    navigate("/");
  };
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100 full-screen-bg">
      <div
        className="card shadow-sm p-4"
        style={{ width: "400px", borderRadius: "10px" }}
      >
        <h1 className="text-center mb-4">Login</h1>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="form-control"
              placeholder="Username"
              {...register("userName")}
            />
            {errors.userName && (
              <p className="text-danger">{errors.userName.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="••••••••"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-danger">{errors.password.message}</p>
            )}
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
