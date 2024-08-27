import { supabaseDB } from "@/lib/supabase";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { BathIcon, BedIcon, LocateIcon, RulerIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function extractIdFromSlug(url: string) {
  const parts = url.split("/");
  const slug = parts[parts.length - 1];
  if (!slug) {
    return null;
  }
  const id = slug.split("-")[0];
  return id;
}

type ListingDetailsProps = {
  params: {
    slug: string;
  };
};

export default async function ListingDetails({ params }: ListingDetailsProps) {
  const id = extractIdFromSlug(params.slug);
  const { data: listing } = await supabaseDB
    .from("listings")
    .select("*")
    .filter("id", "eq", id)
    .single();

  return (
    <div className="flex flex-col min-h-dvh">
      <section className="bg-white">
        <div className="container px-4 md:px-6 py-12 md:py-16 lg:py-20">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <div className="flex flex-col gap-4 md:gap-6">
              <Image
                src={listing.image}
                width={800}
                height={500}
                alt="Imagem de um apartamento"
                className="rounded-lg object-cover aspect-[4/3]"
              />
            </div>

            <div className="grid gap-4 md:gap-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">
                  {listing.name || listing.address}
                </h1>
                <p className="text-muted-foreground">
                  {listing.bedrooms} Quarto(s) · {listing.bathrooms} Banheiro(s)
                  · {listing.area} m²
                </p>

                <Button asChild>
                  <Link href={listing.link} target="_blank" className="mt-4">
                    Ir para site
                  </Link>
                </Button>
              </div>

              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <BedIcon className="w-5 h-5 text-muted-foreground" />
                  <span>{listing.bedrooms} Quarto(s)</span>
                </div>
                <div className="flex items-center gap-2">
                  <BathIcon className="w-5 h-5 text-muted-foreground" />
                  <span>{listing.bathrooms} Banheiro(s)</span>
                </div>
                <div className="flex items-center gap-2">
                  <RulerIcon className="w-5 h-5 text-muted-foreground" />
                  <span>{listing.area} m²</span>
                </div>
                <div className="flex items-center gap-2">
                  <LocateIcon className="w-5 h-5 text-muted-foreground" />
                  <span>{listing.address}</span>
                </div>
              </div>

              <div
                className="text-justify"
                dangerouslySetInnerHTML={{ __html: listing.content }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="container px-4 md:px-6 py-12 md:py-16 lg:py-20">
        <div className="grid gap-8 lg:gap-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Galeria</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {listing?.photos?.map((photo) => (
                <img
                  key={photo.href}
                  src={photo.href}
                  width={400}
                  height={300}
                  alt="Property Image 1"
                  className="rounded-lg object-cover aspect-[4/3]"
                />
              ))}
            </div>
          </div>

          {/* <div>
            <h2 className="text-2xl md:text-3xl font-bold">Contact Us</h2>
            <form className="grid gap-4 mt-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" placeholder="Enter your name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  rows={5}
                  placeholder="Enter your message"
                />
              </div>
              <Button type="submit" className="justify-self-start">
                Submit Inquiry
              </Button>
            </form>
          </div> */}
        </div>
      </section>
    </div>
  );
}
