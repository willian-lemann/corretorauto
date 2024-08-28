import Image from "next/image";
import Link from "next/link";

import { BathIcon, BedIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { login } from "@/app/utils/redirects";
import { createSlug } from "@/lib/utils";

type ListingItemProps = {
  isLogged: boolean;
  listing: {
    id: string;
    image: string;
    name: string;
    address: string;
    bedrooms: number;
    bathrooms: number;
    area: string;
    price: number;
    photos: { href: string }[];
    forSale: boolean;
    type: string;
  };
};

export async function ListingItem({ listing, isLogged }: ListingItemProps) {
  function getListingURL(listingItem: any) {
    return isLogged
      ? `/listings/${listingItem.id}-${createSlug(listingItem.address)}`
      : login;
  }

  return (
    <Link href={getListingURL(listing)} key={listing.id}>
      <Card className="w-full max-w-md shadow-none overflow-hidden rounded-lg border-none transition-all">
        <Image
          src={listing?.image!}
          width={500}
          height={300}
          alt="Property Image"
          className="w-full h-48 object-cover"
          style={{ aspectRatio: "500/300", objectFit: "cover" }}
        />

        <div className="py-4 bg-background">
          <div className="flex items-center justify-between mb-2">
            <div className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground">
              {listing.type}
            </div>
            <div className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary text-primary-foreground">
              {listing.forSale ? "Venda" : "Aluguel"}
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-2">
            {listing.name || listing.address}
          </h3>
          <div className="flex items-center text-sm text-muted-foreground mb-4">
            <BedIcon className="w-4 h-4 mr-1" />
            {listing.bedrooms} Quarto(s)
            <Separator orientation="vertical" className="mx-2" />
            <BathIcon className="w-4 h-4 mr-1" />
            {listing.bathrooms} Banheiro(s)
          </div>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">R$ {listing.price}</div>
            {/* <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-primary"
            >
              <Heart className="w-5 h-5" />
              <span className="sr-only">Save</span>
            </Button> */}
          </div>
        </div>
      </Card>
    </Link>
  );
}
