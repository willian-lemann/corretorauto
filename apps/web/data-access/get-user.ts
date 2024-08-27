import { supabaseDB } from "@/lib/supabase";

export async function getUser({ id: userId }: { id: string }) {
  const { data: user } = await supabaseDB
    .from("users")
    .select("*")
    .filter("userAuthId", "eq", userId)
    .single();

  return user;
}
