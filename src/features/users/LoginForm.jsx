import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "./useLogin";
import { useEffect, useState } from "react";
import { useGetCurrentUser } from "./useGetCurrentUser";
import { useUserDataContext } from "../../contexts/userContext";

function LoginForm() {
  const [email, setEmail] = useState("john.doe@example.com");
  const [password, setPassword] = useState("12345678");
  const [userProfile, setUserProfile] = useState(null);

  const { mutate: login, isPending, isError, error } = useLogin();
  const navigate = useNavigate();
  const { dispatch } = useUserDataContext();

  const {
    profile,
    isError: isError2,
    error: error2,
  } = useGetCurrentUser(userProfile);
  // probably have to create a context to
  // console.log(profile);
  // console.log(profile);

  useEffect(
    function () {
      if (profile) {
        dispatch({ type: "addCurrentUser", payload: profile });
      }
    },
    [dispatch, profile]
  );

  useEffect(
    function () {
      if (profile?.role === "Employee") {
        navigate("/employee/dashboard");
      }

      if (profile?.role === "Manager") {
        navigate("/manager/dashboard");
      }
    },
    [profile?.role, navigate]
  );

  if (isError2) return <p>Hello {error2.message}</p>;
  // console.log(error2);

  // console.log(userProfile);

  if (isError) return <p>Hi {error.message}</p>;

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) return;

    login(
      {
        email,
        password,
      },
      {
        onSuccess: (data) => {
          // console.log(data);
          setUserProfile(data);
          // console.log(role);

          // if (role === "Employee") {
          //   navigate("/employees");
          // }
        },
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button disabled={isPending} type="submit">
          {isPending ? `Loging in` : `Login`}
        </button>
      </form>
      <p>
        Don&apos;t have an account. <Link to="/signup">Sign up</Link>
      </p>
    </>
  );
}

export default LoginForm;
