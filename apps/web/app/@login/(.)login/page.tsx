import { LoginModal } from "@/components/login-modal";
import { SignIn } from "@/components/sign-in";

export default function Page() {
  return (
    <LoginModal>
      <SignIn />
    </LoginModal>
  );
}
