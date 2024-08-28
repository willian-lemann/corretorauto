import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMoney(money?: number) {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return formatter.format(Number(money));
}

export function createSlug(propertyName: string) {
  return propertyName
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function extractIdFromSlug(url: string) {
  const parts = url.split("/");
  const slug = parts[parts.length - 1];
  if (!slug) {
    return 0;
  }
  const id = slug.split("-")[0]!;
  return +id;
}
