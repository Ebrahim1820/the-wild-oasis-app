import supabase from "./supabase";

export async function Login({ email, password }) {
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

export async function Logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}
