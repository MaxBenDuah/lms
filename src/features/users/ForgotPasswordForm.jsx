import { useState } from "react";
import { useForgottenPassword } from "./useForgottenPassword";

function ForgotPasswordForm() {
  const [email, setEmail] = useState("");

  const {
    mutate: resetPasword,
    isPending,
    isError,
    error,
  } = useForgottenPassword();

  if (isError) return <p>{error.message}</p>;

  function handleSubmit(e) {
    e.preventDefault();

    resetPasword(
      { email },
      {
        onSuccess: () => {
          alert(
            "Please check your email address for the link to reset your password"
          );
        },
      }
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">{isPending ? "Submitting..." : "Submit"}</button>
      </form>
      {/* {!isPending || <p>Please check your email for instructions</p>} */}
    </>
  );
}

export default ForgotPasswordForm;
