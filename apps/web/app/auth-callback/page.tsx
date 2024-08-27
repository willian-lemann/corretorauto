import { getUser } from "@/data-access/get-user";
import { supabaseDB } from "@/lib/supabase";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React, { PropsWithChildren } from "react";

async function saveUserToDatabase(userId: string) {
  const response = await supabaseDB
    .from("users")
    .insert({ userAuthId: userId });
  return response;
}

async function getUserFromDatabase(userId: string) {
  const user = await getUser({ id: userId });
  return user;
}

export default async function CallbackAuthPage({
  children,
}: PropsWithChildren) {
  const { userId } = auth();

  if (userId) {
    const hasUserInDatabase = await getUserFromDatabase(userId);

    if (!hasUserInDatabase) {
      const { error } = await saveUserToDatabase(userId);
      if (error) return console.log("did not save to database user", userId);
      return redirect("/");
    }

    redirect("/");
  }

  return <>{children}</>;
}
