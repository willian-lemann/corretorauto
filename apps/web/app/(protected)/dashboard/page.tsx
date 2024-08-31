import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import {
  Building2,
  MousePointer,
  TrendingUp,
  Users,
  BathIcon,
  BedIcon,
} from "lucide-react";

// Mock data - replace with actual data from your backend
const agentData = {
  name: "John Doe",
  email: "john.doe@example.com",
  creciNumber: "123456",
  creciStatus: "Active",
  creciRegularity: "Regular",
};

const mockChartData = [
  { name: "Jan", clicks: 400 },
  { name: "Feb", clicks: 300 },
  { name: "Mar", clicks: 500 },
  { name: "Apr", clicks: 280 },
  { name: "May", clicks: 590 },
  { name: "Jun", clicks: 320 },
];

const mockTopProperties = [
  {
    id: "1",
    image: "/placeholder.svg?height=300&width=500",
    name: "Luxury Apartment",
    address: "123 Main St",
    bedrooms: 3,
    bathrooms: 2,
    area: "150m²",
    price: 500000,
    photos: [{ href: "/placeholder.svg?height=300&width=500" }],
    forSale: true,
    type: "Apartment",
    clicks: 1500,
  },
  {
    id: "2",
    image: "/placeholder.svg?height=300&width=500",
    name: "Cozy House",
    address: "456 Elm St",
    bedrooms: 4,
    bathrooms: 3,
    area: "200m²",
    price: 750000,
    photos: [{ href: "/placeholder.svg?height=300&width=500" }],
    forSale: true,
    type: "House",
    clicks: 1200,
  },
  {
    id: "3",
    image: "/placeholder.svg?height=300&width=500",
    name: "Modern Studio",
    address: "789 Oak St",
    bedrooms: 1,
    bathrooms: 1,
    area: "50m²",
    price: 250000,
    photos: [{ href: "/placeholder.svg?height=300&width=500" }],
    forSale: false,
    type: "Studio",
    clicks: 1000,
  },
  {
    id: "4",
    image: "/placeholder.svg?height=300&width=500",
    name: "Spacious Villa",
    address: "101 Pine St",
    bedrooms: 5,
    bathrooms: 4,
    area: "300m²",
    price: 1200000,
    photos: [{ href: "/placeholder.svg?height=300&width=500" }],
    forSale: true,
    type: "Villa",
    clicks: 950,
  },
];

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
    clicks: number;
  };
};

function ListingItem({ listing, isLogged }: ListingItemProps) {
  function getListingURL(listingItem: any) {
    // For this example, we'll always use the logged-in URL
    return `/listings/${listingItem.id}-${listingItem.address.replace(/\s+/g, "-").toLowerCase()}`;
  }

  return (
    <Link href={getListingURL(listing)} key={listing.id}>
      <Card className="w-full max-w-md relative shadow-none overflow-hidden rounded-lg border-none transition-all">
        <Image
          src={listing.image}
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
          <h3 className="text-base font-semibold mb-2 text-muted-foreground">
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
            <div className="text-2xl font-bold">
              R$ {listing.price.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">
              {listing.clicks} clicks
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Agent Information Header */}
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">{agentData.name}</p>
              <p className="text-sm text-gray-600">{agentData.email}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold">CRECI: {agentData.creciNumber}</p>
              <div className="flex justify-end items-center mt-1 space-x-2">
                <Badge
                  variant={
                    agentData.creciStatus === "Active"
                      ? "default"
                      : "destructive"
                  }
                >
                  {agentData.creciStatus}
                </Badge>
                <Badge
                  variant={
                    agentData.creciRegularity === "Regular"
                      ? "default"
                      : "destructive"
                  }
                >
                  {agentData.creciRegularity}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de imóveis
              </CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">
                +20% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de cliques
              </CardTitle>
              <MousePointer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45,678</div>
              <p className="text-xs text-muted-foreground">
                +15% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avg. Click-through Rate
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.2%</div>
              <p className="text-xs text-muted-foreground">
                +0.5% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Número de visitantes
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,345</div>
              <p className="text-xs text-muted-foreground">
                +10% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Property Click Trends Chart */}
        {/* <Card>
          <CardHeader>
            <CardTitle>Property Click Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="clicks" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card> */}

        {/* Top Clicked Properties Grid */}
        <Card>
          <CardHeader>
            <CardTitle>Imóveis mais vistos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockTopProperties.map((property) => (
                <ListingItem
                  key={property.id}
                  listing={property}
                  isLogged={true}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
