import { LoginModal } from "@/components/login-modal";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const SignIn = dynamic(() =>
  import("@/components/sign-in").then((mod) => mod.SignIn)
);

export default function Page() {
  return (
    <LoginModal>
      <Suspense fallback={<p>loading...</p>}>
        <SignIn />
      </Suspense>
    </LoginModal>
  );
}
