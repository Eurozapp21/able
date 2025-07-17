import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useLocation } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/lib/auth';
import { 
  User, 
  MessageSquare, 
  Calendar, 
  Settings, 
  LogOut,
  Eye,
  Plus,
  Clock
} from 'lucide-react';

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  const { data: enquiries = [], isLoading: enquiriesLoading } = useQuery({
    queryKey: ['/api/enquiries'],
    enabled: isAuthenticated,
  });

  const { data: upcomingSeminars = [] } = useQuery({
    queryKey: ['/api/seminars', { upcoming: true }],
  });

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation('/login?redirect=/dashboard');
    }
  }, [isAuthenticated, setLocation]);

  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await logout();
      setLocation('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-primary text-text-dark';
      case 'in-progress': return 'bg-blue-500 text-white';
      case 'resolved': return 'bg-secondary-green text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-text-dark">
              Welcome back, {user?.firstName}!
            </h1>
            <p className="text-gray-custom text-lg">
              Manage your account and track your enquiries
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="mt-4 md:mt-0 hover-gold"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="fontsearch mx-auto mb-2">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-text-dark">
                {enquiriesLoading ? <Skeleton className="h-6 w-8 mx-auto" /> : enquiries.length}
              </h3>
              <p className="text-gray-custom text-sm">Total Enquiries</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="bg-secondary-green text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-text-dark">
                {enquiriesLoading ? <Skeleton className="h-6 w-8 mx-auto" /> : enquiries.filter(e => e.status === 'new').length}
              </h3>
              <p className="text-gray-custom text-sm">Pending</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-text-dark">{upcomingSeminars.length}</h3>
              <p className="text-gray-custom text-sm">Upcoming Seminars</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="bg-gray-500 text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">
                <User className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-text-dark">Active</h3>
              <p className="text-gray-custom text-sm">Account Status</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Enquiries */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl text-text-dark">Recent Enquiries</CardTitle>
                  <Link href="/enquiry">
                    <Button className="btn-cardbutn">
                      <Plus className="w-4 h-4 mr-2" />
                      New Enquiry
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                {enquiriesLoading ? (
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <Skeleton className="w-16 h-10" />
                        <div className="flex-1">
                          <Skeleton className="h-4 w-3/4 mb-2" />
                          <Skeleton className="h-3 w-1/2" />
                        </div>
                        <Skeleton className="w-20 h-8" />
                      </div>
                    ))}
                  </div>
                ) : enquiries.length > 0 ? (
                  <div className="space-y-4">
                    {enquiries.slice(0, 5).map((enquiry) => (
                      <div key={enquiry.id} className="flex items-center justify-between p-4 border border-light rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-semibold text-text-dark">
                              ENQ{enquiry.id}
                            </h4>
                            <Badge className={getStatusColor(enquiry.status)}>
                              {enquiry.status}
                            </Badge>
                          </div>
                          <p className="text-gray-custom text-sm mb-1">
                            {enquiry.type} - {enquiry.about || 'General Enquiry'}
                          </p>
                          <p className="text-gray-400 text-xs">
                            {formatDate(enquiry.createdAt!.toString())}
                          </p>
                        </div>
                        <Link href={`/enquiry/${enquiry.id}`}>
                          <Button variant="outline" size="sm" className="hover-gold">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        </Link>
                      </div>
                    ))}
                    {enquiries.length > 5 && (
                      <div className="text-center pt-4">
                        <Link href="/enquiry">
                          <Button variant="outline" className="hover-gold">
                            View All Enquiries
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-semibold mb-2 text-text-dark">No Enquiries Yet</h3>
                    <p className="text-gray-custom mb-4">
                      Start by creating your first enquiry about our products or services.
                    </p>
                    <Link href="/enquiry">
                      <Button className="btn-cardbutn">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Enquiry
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-text-dark">Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-custom">Name</p>
                    <p className="font-medium text-text-dark">{user?.firstName} {user?.lastName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-custom">Email</p>
                    <p className="font-medium text-text-dark">{user?.email}</p>
                  </div>
                  {user?.phone && (
                    <div>
                      <p className="text-sm text-gray-custom">Phone</p>
                      <p className="font-medium text-text-dark">{user.phone}</p>
                    </div>
                  )}
                  {user?.occupation && (
                    <div>
                      <p className="text-sm text-gray-custom">Occupation</p>
                      <p className="font-medium text-text-dark">{user.occupation}</p>
                    </div>
                  )}
                </div>
                <Button variant="outline" className="w-full mt-4 hover-gold">
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            {/* Upcoming Seminars */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-text-dark">Upcoming Seminars</CardTitle>
              </CardHeader>
              <CardContent>
                {upcomingSeminars.length > 0 ? (
                  <div className="space-y-3">
                    {upcomingSeminars.slice(0, 3).map((seminar) => (
                      <div key={seminar.id} className="p-3 border border-light rounded-lg">
                        <h4 className="font-semibold text-sm text-text-dark mb-1">
                          {seminar.title}
                        </h4>
                        <p className="text-xs text-gray-custom mb-2">
                          {formatDate(seminar.date.toString())}
                        </p>
                        <Link href={`/seminars/${seminar.id}`}>
                          <Button variant="outline" size="sm" className="w-full hover-gold">
                            Learn More
                          </Button>
                        </Link>
                      </div>
                    ))}
                    <div className="text-center">
                      <Link href="/seminars">
                        <Button variant="outline" size="sm" className="hover-gold">
                          View All
                        </Button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p className="text-sm text-gray-custom">No upcoming seminars</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-text-dark">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Link href="/enquiry">
                    <Button variant="outline" className="w-full justify-start hover-gold">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      New Enquiry
                    </Button>
                  </Link>
                  <Link href="/products">
                    <Button variant="outline" className="w-full justify-start hover-gold">
                      <Settings className="w-4 h-4 mr-2" />
                      Browse Products
                    </Button>
                  </Link>
                  <Link href="/seminars">
                    <Button variant="outline" className="w-full justify-start hover-gold">
                      <Calendar className="w-4 h-4 mr-2" />
                      View Seminars
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" className="w-full justify-start hover-gold">
                      <User className="w-4 h-4 mr-2" />
                      Contact Support
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
