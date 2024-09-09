import { headers } from "next/headers";
import { userAgent } from "next/server";

export function isMobile() {
  const agent = userAgent({ headers: headers() });
  const isMobile = agent.device.type === "mobile";
  return isMobile;
}
