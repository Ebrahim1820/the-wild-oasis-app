import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagepath = newCabin.image?.startsWith?.(supabaseUrl);

  // create URL for image
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  // create image path
  const imagepath = hasImagepath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  // image URL: https://gdlndlvdysmalupvefox.supabase.co/storage/v1/object/public/cabin-images/cabin-002.jpg

  // Create/Edit
  let query = supabase.from("cabins");

  // A. CREATE a cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagepath }]);

  // B. EDIT
  if (id) query = query.update({ ...newCabin, image: imagepath }).eq("id", id);
  const { data, error } = await query.select().single();

  if (error) {
    throw new Error("Cabin could not be created");
  }

  // Upload image
  if (hasImagepath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);
  // 3. Delete the cabin if there was an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);

    console.log(storageError);
    throw new Error(
      "Cabin image could not be uploadet. and the cabin was not created"
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
  return data;
}
