// import { useUserDataContext } from "../../contexts/UserContext";
import UpdateUserDataForm from "./updateUserDataForm";
import UpdateUserPassword from "./UpdateUserPassword";
import { useUser } from "./useUser";

function Account() {
  // const { currentUserDetails } = useUserDataContext();
  // console.log(currentUserDetails);

  // const { name, email, department } = currentUserDetails;
  // console.log(name, email, department);

  const { user } = useUser();
  const {
    user_metadata: { name, email },
  } = user;
  // console.log(name, email);
  const userData = { name, email };
  return (
    <div>
      <h1>Update User Account</h1>

      {/* <UpdateUserDataForm name={name} email={email} department={department} /> previous */}
      <UpdateUserDataForm userData={userData} />
      <br />
      <h1>Update Password</h1>
      <p>Please enter your new password</p>
      <UpdateUserPassword />
    </div>
  );
}

export default Account;
