import { Header } from "@/components/header";

type LayoutProps = {
  children: React.ReactNode;
  login: React.ReactNode & { props: { parallelRouterKey: string } };
};

export default async function ProtectedLayout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
