"use server";

import { cookies } from "next/headers";

export async function setListingsCount(count: number) {
  cookies().set({
    name: "listings_count",
    value: count.toString(),
    httpOnly: false,
    path: "/",
  });
}
