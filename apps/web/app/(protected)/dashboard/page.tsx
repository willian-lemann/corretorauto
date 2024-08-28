import { Header } from "@/components/header";
import { getUser } from "@/data-access/get-user";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const { userId } = auth().protect({
    unauthenticatedUrl: "/",
  });

  const user = await getUser({ id: userId });

  if (user.role !== "agent") {
    return redirect("/");
  }

  return (
    <>
      <Header />
      <div className="container">dashboard for agent</div>
    </>
  );
}
