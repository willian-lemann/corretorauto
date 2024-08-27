import { SignUp } from "@clerk/nextjs";

export default function SignupPage() {
  return (
    <SignUp
      appearance={{
        elements: {
          modalCloseButton: {
            zIndex: 9999,
            background: "#000",
          },

          rootBox: {
            width: "100%",
            border: "none",
            boxShadow: "none",
          },
          cardBox: {
            width: "100%",
            border: "none",
            boxShadow: "none",
          },
          card: {
            border: "none",
            boxShadow: "none",
          },
          footer: {
            background: "#fff",
            border: "none",
            boxShadow: "none",
          },
          footerAction: {
            border: "none",
            boxShadow: "none",
          },
        },
      }}
      fallbackRedirectUrl={process.env.NEXT_PUBLIC_AUTH_CALLBACK}
    />
  );
}
