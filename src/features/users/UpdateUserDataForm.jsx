import { useState } from "react";
import { useUpdateCurrentUser } from "./useUpdateCurrentUser";

function UpdateUserDataForm({ userData: { name, email } }) {
  // console.log(name);
  const [updateName, setUpdateName] = useState(name);
  // const [updateDepartment, setUpdateDepartment] = useState(department);
  const [avatar, setAvatar] = useState(null);

  const {
    mutate: updateUser,
    isPending: isUpdating,
    isError,
    error,
  } = useUpdateCurrentUser();

  function handleSubmit(e) {
    e.preventDefault();

    // if (!updateName) return;

    // console.log(updateName, avatar);

    updateUser(
      { updateName, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          e.target.reset();
          setUpdateName("");
        },
      }
    );
  }

  if (isError) return <p>Hello {error.message}</p>;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} disabled />
        <br />
        <input
          type="text"
          placeholder="Enter your name"
          value={updateName}
          onChange={(e) => setUpdateName(e.target.value)}
        />
        {/* <input
          type="text"
          placeholder="Enter your department"
          value={updateDepartment}
          onChange={(e) => setUpdateDepartment(e.target.value)}
          disabled
        /> */}
        <br />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
        />
        <br />
        <button type="submit">{isUpdating ? `Updating` : `Submit`}</button>
        {/* I wouldn't need this cancel button here anymore */}
        {/* <button onClick={() => setShowUserUpdateForm(false)}>Cancel</button> */}
      </form>
    </div>
  );
}

export default UpdateUserDataForm;
