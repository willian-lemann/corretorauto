import { supabaseDB } from "@/lib/supabase";

export async function getUser({ id: userId }: { id: string }) {
  const { data: user } = await supabaseDB
    .from("users")
    .select("*, agents(*)")
    .eq("userAuthId", userId)
    .single()
    .then((res) => {
      const { agents, ...restUser } = res.data;
      const [agent] = agents;
      return {
        ...res,
        data: {
          ...restUser,
          agent: agent ?? null,
        },
      };
    });

  return user;
}
