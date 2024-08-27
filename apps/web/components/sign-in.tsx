import { SignIn as SigninComponent } from "@clerk/nextjs";

export function SignIn() {
  return (
    <SigninComponent
      fallbackRedirectUrl={process.env.NEXT_PUBLIC_AUTH_CALLBACK}
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
    />
  );
}
