import { Button } from "primereact/button";
// import { useGetEmployees } from "../features/employees/useGetEmployess";
// import Dialog from "../ui/DialogPopup";
import { useEffect, useState } from "react";
import DialogPopup from "../ui/DialogPopup";
import LeaveRequests from "../features/employees/LeaveRequests";
// import { useGetCurrentUser } from "../features/users/useGetCurrentUser";
import { useUser } from "../features/users/useUser";
import { useGetEmployee } from "../features/employees/useGetEmployee";
import { useLogout } from "../features/users/useLogout";
// import UpdateUserDataForm from "../features/users/updateUserDataForm";
import { useNavigate, useSearchParams } from "react-router-dom";
// import { useLoggedInUser } from "../features/users/useLoggedInUser";
// import { useUserDataContext } from "../contexts/userContext";

function EmployeeDashboard() {
  const [visible, setVisible] = useState(false);
  // const [showUserUpdateForm, setShowUserUpdateForm] = useState(false);
  const navigate = useNavigate();
  // const { dispatch } = useUserDataContext();
  // const { employee, isLoading, isError, error } = useGetEmployees();
  // const { data } = useGetCurrentUser();
  // const [avatar, setAvatar] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  // const {
  //   data: loggedIn,
  //   isLoading: loggedInLoading,
  //   isError: loggedInError,
  // } = useLoggedInUser();
  // console.log(loggedIn);

  // console.log(profile);
  const { user } = useUser();
  const {
    user_metadata: { name: userName },
  } = user;
  // console.log(user);
  // I don't need  the below because now when the user logs in, I dispatch the profile to the context. So check and fix later
  const { data, isLoading, isError, error } = useGetEmployee(user);

  const {
    mutate: logout,
    isPending,
    isError: isError2,
    error: error2,
  } = useLogout();

  // Placed the employee_id in the url so I can use it to get the notifications
  useEffect(
    function () {
      if (data?.id) {
        searchParams.set("employee_id", data.id);
        setSearchParams(searchParams);
      }
    },
    [data?.id, searchParams, setSearchParams]
  );

  // useEffect(
  //   function () {
  //     if (data) {
  //       dispatch({ type: "addCurrentUser", action: data });
  //     }
  //   },
  //   [data, dispatch]
  // );

  // if (loggedInLoading) return <p>Loading logged in user</p>;

  if (isLoading) return <p>Loading user data...</p>;

  if (isError) return <p>{error.message}</p>;

  if (isPending) return <p>Logging out...</p>;

  if (isError2) return <p>{error2.message}</p>;

  // I don't need this name variable because i am getting the name from the useUser hook above which gives me the name so I am deleting it from the below
  const { status, email, role, department, leave_balance } = data;
  // console.log(id);
  // searchParams.set("employee_id", id);
  // setSearchParams(searchParams);

  // const {
  //   user: {
  //     user_metadata: { avatar },
  //   },
  // } = loggedIn;

  // console.log(avatar);

  // if (profile) return;

  // const { name, department, email, status, role } = profile;

  // if (isLoading) return <p>Loading...</p>;

  // if (isError) return <p>Hi {error.message}</p>;
  // console.log(employee);

  // const { name, email, role, department, status, leave_balance } = employee;

  // if (avatar) {
  //   console.log(avatar.name);
  // }

  return (
    <>
      <div>
        <div>
          <div>
            <button onClick={logout}>Logout</button>
          </div>
          <h1>
            Hello {userName}, <small>Status {status}</small>
            <span>
              {/* <button onClick={() => setShowUserUpdateForm((prev) => !prev)}>
                Edit
              </button> */}
              <button onClick={() => navigate("/account")}>
                Update Account
              </button>
            </span>
          </h1>
          {/* If there's data.image then i will render that one but if that's not the case, we'll render the default one. i have put this in the header so that i can see the changes right after it's updated */}
          {/* <img src={user.user_metadata.avatar} alt="user" />
          <img
            src={
              image
                ? image
                : "https://blocks.primereact.org/demo/images/blocks/avatars/circle-big/avatar-f-2.png"
            }
          /> */}
          {/* <input
            type="file"
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files[0])}
          /> */}
          <p>Email: {email}</p>
          <p>Role: {role}</p>
          <p>Department - {department}</p>
          <h4>Leave Balance: {leave_balance}</h4>
          {/* I am adding the updateUser form here because I already have the data in this component but I will probably put this in a modal. I might put this in a new route and under the AppLayout - i think this is better. I put this in a new route and so there's no need here and I will delete it later but i am commenting it out now */}
          {/* {showUserUpdateForm && (
            <UpdateUserDataForm
              data={data}
              setShowUserUpdateForm={setShowUserUpdateForm}
            />
          )} */}

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
    </>
  );
}

export default EmployeeDashboard;
