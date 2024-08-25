import supabase from "./supabase";

export async function signUpUser({
  email,
  password,
  role,
  name,
  department,
  leave_balance,
  status,
}) {
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw new Error(
      `Something went wrong whiles signing you up - ${error.message}`
    );
  } else {
    // If sign-up is successful, insert the user details into the employees table
    const { error: insertError } = await supabase
      .from("employees")
      .insert([{ email, role, name, department, leave_balance, status }]);

    if (insertError) {
      console.error(
        "Error inserting into employees table:",
        insertError.message
      );
    } else {
      console.log("Employee record created successfully");
    }
  }

  return data;
}

export async function loginUser({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error)
    throw new Error(`There was a problem logging you in - ${error.message}`);

  return data;
}

export async function getCurrentUserSession() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function userLogout() {
  let { error } = await supabase.auth.signOut();

  if (error)
    throw new Error(`There was a problem loging out - ${error.message}`);
}
