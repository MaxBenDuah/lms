import supabase, { supabaseUrl } from "./supabase";

export async function signUpUser({
  email,
  password,
  role,
  name,
  department,
  // leave_balance, - i don't need this because i'm setting a default value for it
  status,
}) {
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        department,
        status,
        role,
        avatar: "",
      },
    },
  });

  if (error) {
    throw new Error(
      `Something went wrong whiles signing you up - ${error.message}`
    );
  } else {
    // If sign-up is successful, insert the user details into the employees table
    const { error: insertError } = await supabase
      .from("employees")
      .insert([{ email, role, name, department, status }]);

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

export async function updateCurrentUser({ password, updateName, avatar }) {
  // console.log(updateName, avatar, avatar.name);
  // 1. Update Password OR Name
  let updateData = {};

  if (password) updateData = { password };

  // if (updateName) updateData = { date: { name: updateName } }; previous. i just realised there was a typo, it should have been data not date above, lol... this was giving me the error!
  if (updateName) updateData.data = { name: updateName };

  const { data, error } = await supabase.auth.updateUser(updateData);
  // console.log(data);

  if (error)
    throw new Error(
      `There was a problem updating the user data - ${error.message}`
    );

  if (!avatar) return data;

  // 2. Upload the avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError)
    throw new Error(
      `There was a problem uploading the avatar - ${storageError.message}`
    );

  // 3. Update avatar in the user

  // https://unjfpbxmseuokgzzqbko.supabase.co/storage/v1/object/public/avatars/avatar-7285335e-a068-410b-bbcf-c124a748ee60-0.6420373753115627

  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  // console.log(updatedUser);

  if (error2)
    throw new Error(
      `There was a problem updating the user avatar - ${error2.message}`
    );

  return updatedUser;
}

export async function forgotPassword({ email }) {
  let { data, error } = await supabase.auth.resetPasswordForEmail(email);

  if (error)
    throw new Error(
      `There was a problem resetting password - ${error.message}`
    );

  return data;
}
