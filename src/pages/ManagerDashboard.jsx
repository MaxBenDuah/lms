import { useNavigate, useSearchParams } from "react-router-dom";
import LeaveRequestsItemForManagers from "../features/employees/LeaveRequestsItemForManagers";
import { useGetAllLeaveRequest } from "../features/employees/useGetAllLeaveRequest";
import { useGetEmployee } from "../features/employees/useGetEmployee";
import { useLogout } from "../features/users/useLogout";
import { useUser } from "../features/users/useUser";
import { useEffect } from "react";

function ManagerDashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useUser();
  const { data, isLoading, isError, error } = useGetEmployee(user);
  const {
    mutate: logout,
    isPending,
    isError: isError2,
    error: error2,
  } = useLogout();
  const {
    data: allLeaveRequest,
    isLoading: isLoading3,
    isError: isError3,
    error: error3,
  } = useGetAllLeaveRequest();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (data) {
        searchParams.set("employee_id", data.id);
        setSearchParams(searchParams);
      }
    },
    [data, searchParams, setSearchParams]
  );

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>{error.message}</p>;

  if (isPending) return <p>Logging out...</p>;

  if (isError2) return <p>{error2.message}</p>;

  if (isLoading3) return <p>Loaing all leave requests...</p>;

  if (isError3) return <p>{error3.message}</p>;

  const { name, status, email, role, department } = data;
  const {
    user_metadata: { name: metaDataName },
  } = user;
  // console.log(user);
  // console.log(data);

  return (
    <div>
      <h1>Manager Dashboard</h1>
      <div>
        <button onClick={logout}>Logout</button>
        <button onClick={() => navigate("/account")}>Update Account</button>
      </div>
      <h1>
        Hello {metaDataName ? metaDataName : name},{" "}
        <small>Status {status}</small>
      </h1>
      <p>Email: {email}</p>
      <p>Role: {role}</p>
      <p>Department - {department}</p>
      <ul>
        {allLeaveRequest.map((leave) => (
          <LeaveRequestsItemForManagers
            key={leave.id}
            leave={leave}
            data={data}
          />
        ))}
      </ul>
    </div>
  );
}

export default ManagerDashboard;
