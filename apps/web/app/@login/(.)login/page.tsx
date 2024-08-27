import { ModalPage } from "@/components/modal-page";
import { SignIn } from "@/components/sign-in";

export default function Page() {
  return (
    <ModalPage>
      <div className="w-full">
        <SignIn />
      </div>
    </ModalPage>
  );
}
