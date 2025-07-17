import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { 
  Users, Package, Calendar, FileText, BarChart3, 
  Plus, Edit, Trash2, Eye, Download 
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function AdminDashboard() {
  const { t } = useTranslation();

  // Get statistics
  const { data: stats, isLoading } = useQuery({
    queryKey: ['/api/admin/stats'],
    queryFn: () => fetch('/api/admin/stats').then(res => res.json()),
  });

  const { data: recentActivities } = useQuery({
    queryKey: ['/api/admin/recent-activities'],
    queryFn: () => fetch('/api/admin/recent-activities').then(res => res.json()),
  });

  const adminSections = [
    {
      title: 'Users Management',
      description: 'Manage user accounts, roles and permissions',
      icon: Users,
      color: 'bg-blue-500',
      href: '/admin/users',
      count: stats?.users || 0
    },
    {
      title: 'Products',
      description: 'Add, edit and manage product catalog',
      icon: Package,
      color: 'bg-green-500',
      href: '/admin/products',
      count: stats?.products || 0
    },
    {
      title: 'Categories',
      description: 'Organize product categories and subcategories',
      icon: BarChart3,
      color: 'bg-purple-500',
      href: '/admin/categories',
      count: stats?.categories || 0
    },
    {
      title: 'Seminars & Training',
      description: 'Manage educational events and training sessions',
      icon: Calendar,
      color: 'bg-orange-500',
      href: '/admin/seminars',
      count: stats?.seminars || 0
    },
    {
      title: 'News & Events',
      description: 'Create and manage news articles and events',
      icon: FileText,
      color: 'bg-red-500',
      href: '/admin/events',
      count: stats?.events || 0
    },
    {
      title: 'Achievements',
      description: 'Showcase company milestones and awards',
      icon: Eye,
      color: 'bg-indigo-500',
      href: '/admin/achievements',
      count: stats?.achievements || 0
    },
    {
      title: 'Homepage Banners',
      description: 'Manage carousel banners and featured content',
      icon: Edit,
      color: 'bg-pink-500',
      href: '/admin/banners',
      count: stats?.banners || 0
    },
    {
      title: 'Catalogue & Brochures',
      description: 'Manage downloadable brochures and catalogues',
      icon: Download,
      color: 'bg-teal-500',
      href: '/admin/catalogue',
      count: stats?.brochures || 0
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-400 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">AbleTools CMS</h1>
              <p className="text-gray-600">Content Management System Dashboard</p>
            </div>
            <div className="flex gap-4">
              <Link href="/">
                <Button variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  View Website
                </Button>
              </Link>
              <Link href="/admin/settings">
                <Button style={{backgroundColor: '#ffeb3b'}} className="text-black hover:bg-yellow-500">
                  Settings
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.users || 0}</div>
              <p className="text-xs text-muted-foreground">
                +2 from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.products || 0}</div>
              <p className="text-xs text-muted-foreground">
                Active products in catalog
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Seminars</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.seminars || 0}</div>
              <p className="text-xs text-muted-foreground">
                Upcoming events
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Downloads</CardTitle>
              <Download className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.downloads || 0}</div>
              <p className="text-xs text-muted-foreground">
                Brochure downloads this month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Management Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {adminSections.map((section, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-200 cursor-pointer">
              <Link href={section.href}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-lg ${section.color} flex items-center justify-center`}>
                      <section.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">{section.count}</div>
                      <div className="text-xs text-gray-500">items</div>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{section.description}</CardDescription>
                  <Button 
                    size="sm" 
                    className="mt-4 w-full"
                    style={{backgroundColor: '#ffeb3b'}}
                    variant="secondary"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Manage
                  </Button>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest changes and updates to your content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities?.map((activity: any, index: number) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Edit className="w-5 h-5 text-black" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              )) || (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No recent activity</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}