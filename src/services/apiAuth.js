import supabase, { supabaseUrl } from "./supabase";

export async function singUp({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  console.log(data);
  return data;
}

// we need this due to later user can be able to login
// if still the user and pass is in the local Storage
export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  // if the is no current user return null
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  // ? is used to make sure if the user is exist
  return data?.user;
}

export async function logOut() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

// Update user information account

export async function updateCurrentUser({ password, fullName, avatar }) {
  // 1. Upate password OR fullName
  let updateData;
  if (password) updateData = { password };
  if (fullName)
    updateData = {
      data: { fullName },
    };

  const { data, error } = await supabase.auth.updateUser(updateData);

  console.log(data);
  if (error) throw new Error(error.message);

  if (!avatar) return data;

  // 2. Upload the avatar image

  // create uniq name
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  // 3. Update avatar in the user
  const { data: updatedUser, error: updateError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });
  if (updateError) throw new Error(updateError.message);

  return updatedUser;
}
