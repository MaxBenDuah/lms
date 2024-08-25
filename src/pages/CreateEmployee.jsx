import { useState } from "react";
import MainNav from "../ui/MainNav";
import { useCreateEmployees } from "../features/employees/useCreateEmployees";
import { useNavigate } from "react-router-dom";

function CreateEmployee() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("active");
  const navigate = useNavigate();

  const {
    mutate: addEmployee,
    isPending,
    isError,
    error,
  } = useCreateEmployees();

  if (isPending) return <p>Creating Employee...</p>;

  if (isError) return <p>{error.message}</p>;

  function handleSubmit(e) {
    e.preventDefault();

    addEmployee(
      {
        name,
        email,
        role,
        department,
        status,
      },
      {
        onSuccess: (data) => {
          // console.log(data);
          const id = data.at(0).id;
          navigate(`/dashboard?id=${id}`);
        },
      }
    );
  }

  return (
    <div>
      <MainNav />
      <h1>Employees</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Enter your role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Enter your department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
        <br />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <br />
        <button type="submit">Submit</button>
      </form>
      {/* <ul>
        {employees?.map((employee) => (
          <li key={employee.id}>
            <h2>{employee.name}</h2>
            <p>{employee.email}</p>
            <p>{employee.role}</p>
            <p>{employee.department}</p>
          </li>
        ))}
      </ul> */}
    </div>
  );
}

export default CreateEmployee;
