import "@/app/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { ptBR } from "@clerk/localizations";

import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { Metadata } from "next";

const fontHeading = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

type LayoutProps = {
  children: React.ReactNode;
  login: React.ReactNode & { props: { parallelRouterKey: string } };
};

export const metadata: Metadata = {
  title: {
    template: "%s - Imóvel Facil",
    default:
      "Imóvel Facil - facilidade em encontrar seu imóvel, mais de 300 imóveis disponíveis",
  },
  description:
    "Imóvel Facil - facilidade em encontrar seu imóvel, mais de 300 imóveis disponíveis",
};

export default async function Layout({ children }: LayoutProps) {
  return (
    <ClerkProvider localization={ptBR}>
      <html lang="pt-BR">
        <body
          className={cn("antialiased", fontHeading.variable, fontBody.variable)}
        >
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
