import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Users, Package, Calendar, MessageSquare, TrendingUp, FolderOpen } from "lucide-react";

interface AdminStats {
  totalProducts: number;
  totalCategories: number;
  totalSeminars: number;
  totalEvents: number;
  pendingEnquiries: number;
}

export default function AdminDashboard() {
  const [, setLocation] = useLocation();

  const { data: stats, isLoading, error } = useQuery<AdminStats>({
    queryKey: ['/api/admin/stats'],
  });

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-4">You need admin privileges to access this area.</p>
          <Button onClick={() => setLocation('/login')}>Go to Login</Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading admin dashboard...</div>
      </div>
    );
  }

  const cardData = [
    {
      title: "Total Products",
      value: stats?.totalProducts || 0,
      icon: Package,
      description: "Active products in catalog",
      color: "bg-blue-500",
      action: () => setLocation('/admin/products')
    },
    {
      title: "Categories",
      value: stats?.totalCategories || 0,
      icon: TrendingUp,
      description: "Product categories",
      color: "bg-green-500",
      action: () => setLocation('/admin/categories')
    },
    {
      title: "Seminars",
      value: stats?.totalSeminars || 0,
      icon: Calendar,
      description: "Educational seminars",
      color: "bg-purple-500",
      action: () => setLocation('/admin/seminars')
    },
    {
      title: "Events",
      value: stats?.totalEvents || 0,
      icon: Calendar,
      description: "Company events",
      color: "bg-orange-500",
      action: () => setLocation('/admin/events')
    },
    {
      title: "Pending Enquiries",
      value: stats?.pendingEnquiries || 0,
      icon: MessageSquare,
      description: "Awaiting response",
      color: "bg-red-500",
      action: () => setLocation('/admin/enquiries')
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage your rehabilitation equipment platform content</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
        {cardData.map((card, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={card.action}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <div className={`w-8 h-8 ${card.color} rounded-full flex items-center justify-center`}>
                <card.icon className="w-4 h-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" style={{ color: '#ffeb3b' }}>{card.value}</div>
              <p className="text-xs text-gray-600">{card.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" style={{ color: '#ffeb3b' }} />
              Product Management
            </CardTitle>
            <CardDescription>
              Add, edit, and manage product catalog in both languages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button 
                onClick={() => setLocation('/admin/products')} 
                className="w-full"
                style={{ backgroundColor: '#ffeb3b', color: '#000' }}
              >
                Manage Products
              </Button>
              <Button 
                onClick={() => setLocation('/admin/categories')} 
                variant="outline" 
                className="w-full"
              >
                Manage Categories
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" style={{ color: '#ffeb3b' }} />
              Education & Events
            </CardTitle>
            <CardDescription>
              Manage seminars, training, and company events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button 
                onClick={() => setLocation('/admin/seminars')} 
                className="w-full"
                style={{ backgroundColor: '#ffeb3b', color: '#000' }}
              >
                Manage Seminars
              </Button>
              <Button 
                onClick={() => setLocation('/admin/events')} 
                variant="outline" 
                className="w-full"
              >
                Manage Events
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" style={{ color: '#ffeb3b' }} />
              Customer Support
            </CardTitle>
            <CardDescription>
              Handle customer enquiries and support requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button 
                onClick={() => setLocation('/admin/enquiries')} 
                className="w-full"
                style={{ backgroundColor: '#ffeb3b', color: '#000' }}
              >
                View Enquiries
              </Button>
              <Button 
                onClick={() => setLocation('/admin/users')} 
                variant="outline" 
                className="w-full"
              >
                Manage Users
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}