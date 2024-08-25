import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignUp } from "./useSignUp";

function SignUpForm() {
  const [fullName, setFullName] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Employee");
  const [status, setStatus] = useState("active");

  const navigate = useNavigate();

  const { mutate: signup, isPending, isError, error } = useSignUp();

  if (isPending) return <p>Logging you in.... hold on a sec</p>;

  if (isError) return <p>Hi{error.message}</p>;

  function handleSubmit(e) {
    e.preventDefault();

    signup(
      {
        email,
        password,
        role,
        name: fullName,
        department,
        status,
      },
      {
        onSuccess: () => {
          navigate("/login");
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
          type="text"
          placeholder="Enter your name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <br />
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
        <input
          type="text"
          placeholder="Enter your department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
        <br />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="Employee">Employee</option>
          <option value="Manager">Manager</option>
        </select>
        <br />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <br />
        <button type="submit">Sign up</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </>
  );
}

export default SignUpForm;
