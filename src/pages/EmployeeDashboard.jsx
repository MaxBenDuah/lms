import { Button } from "primereact/button";
// import { useGetEmployees } from "../features/employees/useGetEmployess";
// import Dialog from "../ui/DialogPopup";
import { useState } from "react";
import DialogPopup from "../ui/DialogPopup";
import LeaveRequests from "../features/employees/LeaveRequests";
// import { useGetCurrentUser } from "../features/users/useGetCurrentUser";
import { useUser } from "../features/users/useUser";
import { useGetEmployee } from "../features/employees/useGetEmployee";
import { useLogout } from "../features/users/useLogout";
// import { useUserDataContext } from "../contexts/userContext";

function EmployeeDashboard() {
  const [visible, setVisible] = useState(false);
  // const { dispatch } = useUserDataContext();
  // const { employee, isLoading, isError, error } = useGetEmployees();
  // const { data } = useGetCurrentUser();

  // console.log(profile);
  const { user } = useUser();
  // I don't need  the below because now when the user logs in, I dispatch the profile to the context. So check and fix later
  const { data, isLoading, isError, error } = useGetEmployee(user);
  const {
    mutate: logout,
    isPending,
    isError: isError2,
    error: error2,
  } = useLogout();

  // useEffect(
  //   function () {
  //     if (data) {
  //       dispatch({ type: "addCurrentUser", action: data });
  //     }
  //   },
  //   [data, dispatch]
  // );

  if (isLoading) return <p>Loading user data...</p>;

  if (isError) return <p>{error.message}</p>;

  if (isPending) return <p>Logging out...</p>;

  if (isError2) return <p>{error2.message}</p>;

  const { name, status, email, role, department, leave_balance } = data;
  // console.log(user);

  // if (profile) return;

  // const { name, department, email, status, role } = profile;

  // if (isLoading) return <p>Loading...</p>;

  // if (isError) return <p>Hi {error.message}</p>;
  // console.log(employee);

  // const { name, email, role, department, status, leave_balance } = employee;

  return (
    <div>
      <div>
        <div>
          <button onClick={logout}>Logout</button>
        </div>
        <h1>
          Hello {name}, <small>Status {status}</small>
        </h1>
        <p>Email: {email}</p>
        <p>Role: {role}</p>
        <p>Department - {department}</p>
        <h4>Leave Balance: {leave_balance}</h4>
        <Button
          label="Apply Leave"
          icon="pi pi-plus"
          raised
          size="small"
          onClick={() => setVisible((prev) => !prev)}
        />
      </div>
      {/* {visible && <Dialog visible={visible} setVisible={setVisible} />} */}
      {visible && <DialogPopup data={data} setVisible={setVisible} />}
      <LeaveRequests data={data} />
    </div>
  );
}

export default EmployeeDashboard;
