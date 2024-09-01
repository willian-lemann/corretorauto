import { Button } from "@/components/ui/button";
import { BathIcon, BedIcon, LocateIcon, RulerIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Metadata, ResolvingMetadata } from "next";
import { createSlug, extractIdFromSlug } from "@/lib/utils";
import { getListing } from "@/data-access/get-listing";

type ListingDetailsProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata(
  { params }: ListingDetailsProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = extractIdFromSlug(params.slug);
  const listing = await getListing(id);

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${listing.id}-${createSlug(listing.address)}`,
    openGraph: {
      images: [listing.image, ...previousImages],
    },
  };
}
export default async function ListingDetails({ params }: ListingDetailsProps) {
  const id = extractIdFromSlug(params.slug);
  const listing = await getListing(id!);

  return (
    <>
      <div className="flex flex-col min-h-dvh">
        <section className="bg-white">
          <div className="container px-8 py-12 md:py-12">
            <Breadcrumb className="pb-8">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Imoveis</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{listing.ref}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

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
                    {listing.bedrooms} Quarto(s) · {listing.bathrooms}{" "}
                    Banheiro(s) · {listing.area} m²
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

                  {listing.area ? (
                    <div className="flex items-center gap-2">
                      <RulerIcon className="w-5 h-5 text-muted-foreground" />
                      <span>{listing.area}</span>
                    </div>
                  ) : null}

                  <div className="flex items-center gap-2">
                    <LocateIcon className="w-5 h-5 text-muted-foreground" />
                    <span>{listing.address}</span>
                  </div>
                </div>

                <div
                  className="text-justify"
                  dangerouslySetInnerHTML={{ __html: listing.content }}
                />

                {/* <div className="relative max-w-2xl mx-auto">
                  <div className="overflow-hidden transition-all duration-300 ease-in-out max-h-[100px]">
                    <div
                      className="text-justify"
                      dangerouslySetInnerHTML={{ __html: listing.content }}
                    />

                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
                  </div>

                  <div className="mt-4 text-center">
                    <Button className="">Ver mais</Button>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </section>

        <section className="container px-8 py-12 md:py-16 lg:py-20">
          <div className="grid gap-8 lg:gap-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Galeria</h2>
              <div className="grid grid-cols-2 md:grid-cols-4  gap-4 mt-4">
                {listing?.photos?.map((photo: any) => (
                  <img
                    key={photo.href}
                    src={photo.href}
                    width={400}
                    height={300}
                    alt="Imagem de um ímóvel"
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
    </>
  );
}
