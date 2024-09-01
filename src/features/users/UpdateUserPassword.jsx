import { useState } from "react";
import { useUpdateCurrentUser } from "./useUpdateCurrentUser";

function UpdateUserPassword() {
  const [password, setPassword] = useState("");

  const {
    mutate: updatePassword,
    isPending: isUpdating,
    isError,
    error,
  } = useUpdateCurrentUser();

  if (isError) return <p>{error.message}</p>;

  function handleSubmit(e) {
    e.preventDefault();

    if (!updatePassword) return;

    updatePassword(
      { password },
      {
        onSuccess: () => {
          alert("Password successfully updated");
          setPassword("");
        },
      }
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">
        {isUpdating ? "Updating..." : "Update Password"}
      </button>
    </form>
  );
}

export default UpdateUserPassword;
