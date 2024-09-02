import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  Building2,
  MousePointer,
  TrendingUp,
  Users,
  UsersIcon,
} from "lucide-react";

import { getUser } from "@/data-access/get-user";
import { auth, clerkClient } from "@clerk/nextjs/server";

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

export default async function Dashboard() {
  const { userId } = auth();
  const loggedUser = await clerkClient.users.getUser(userId!);

  const user = await getUser({ id: userId! });

  const [email] = loggedUser.emailAddresses;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="bg-white shadow rounded-lg p-6 ">
        <h1 className="text-2xl font-bold mb-4">Meus dados</h1>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">{loggedUser.fullName}</p>
            <p className="text-sm text-gray-600">{email?.emailAddress}</p>
          </div>
          <div className="text-right">
            <p className="font-semibold">CRECI: {user.agent.agentId}</p>
            <div className="flex justify-end items-center mt-1 space-x-2">
              <Badge variant={user.agent.isActive ? "success" : "destructive"}>
                {user.agent.isActive ? "Ativo" : "Inativo"}
              </Badge>
              <Badge variant={user.agent.isRegular ? "success" : "destructive"}>
                {user.agent.isRegular
                  ? "Situação Regular"
                  : "Situação Irregular"}
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
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockTopProperties.map((property) => (
              <ListingItem
                key={property.id}
                listing={property}
                isLogged={true}
              />
            ))}
          </div> */}
        </CardContent>
      </Card>
    </div>
  );
}

function Sidebar() {
  const sidebarItems = [
    { icon: UsersIcon, label: "Corretores", href: "/dashboard/corretores" },
  ];

  return (
    <div className="w-64 bg-white shadow-md h-screen">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
        <nav>
          <ul>
            {sidebarItems.map((item, index) => (
              <li key={index} className="mb-2">
                <Link
                  href={item.href}
                  className="flex items-center p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <item.icon className="w-5 h-5 mr-3 text-gray-500" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
