import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { 
  Building2, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Database, 
  FileText, 
  Settings, 
  Bell,
  TrendingUp,
  Users,
  AlertTriangle
} from 'lucide-react';

interface DashboardProps {
  onNavigate: (screen: import("../App").Screen) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const stats = {
    totalInstitutes: 245,
    pendingRequests: 18,
    approvedInstitutes: 203,
    rejectedInstitutes: 24
  };

  const notifications = [
    {
      id: 1,
      title: "New Institute Registration",
      message: "Delhi Public School submitted registration documents",
      timestamp: "2 hours ago",
      type: "info"
    },
    {
      id: 2,
      title: "Compliance Alert",
      message: "5 institutes require document updates",
      timestamp: "4 hours ago",
      type: "warning"
    },
    {
      id: 3,
      title: "System Update",
      message: "Platform maintenance scheduled for tomorrow",
      timestamp: "1 day ago",
      type: "info"
    },
    {
      id: 4,
      title: "Critical Review",
      message: "High-priority institute approval pending",
      timestamp: "2 days ago",
      type: "urgent"
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'urgent':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Bell className="h-4 w-4 text-blue-500" />;
    }
  };

  // Chart data
  const monthlyRegistrations = [
    { month: 'Jan', registrations: 15, approved: 12, rejected: 3 },
    { month: 'Feb', registrations: 23, approved: 18, rejected: 5 },
    { month: 'Mar', registrations: 18, approved: 14, rejected: 4 },
    { month: 'Apr', registrations: 32, approved: 25, rejected: 7 },
    { month: 'May', registrations: 28, approved: 22, rejected: 6 },
    { month: 'Jun', registrations: 35, approved: 28, rejected: 7 }
  ];

  const instituteTypes = [
    { name: 'Schools', value: 145, color: '#3b82f6' },
    { name: 'Colleges', value: 68, color: '#10b981' },
    { name: 'Universities', value: 24, color: '#f59e0b' },
    { name: 'Training Centers', value: 8, color: '#ef4444' }
  ];



  return (
    <div className="p-6 space-y-8">
      {/* Welcome Section */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Good morning, Admin! 👋</h1>
          <p className="text-muted-foreground mt-1">Here's what's happening with your education platform today.</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Today</p>
          <p className="text-lg font-semibold">{new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</p>
        </div>
      </div>

      {/* Stats Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 relative overflow-hidden border-blue-200" onClick={() => onNavigate('total-institutes')}>
          <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 rounded-full -mr-8 -mt-8"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Institutes</CardTitle>
            <Building2 className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{stats.totalInstitutes}</div>
            <p className="text-xs text-muted-foreground mt-2 flex items-center">
              <TrendingUp className="inline h-3 w-3 mr-1 text-green-500" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 relative overflow-hidden border-orange-200" onClick={() => onNavigate('requests')}>
          <div className="absolute top-0 right-0 w-16 h-16 bg-orange-500/10 rounded-full -mr-8 -mt-8"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <div className="relative">
              <Clock className="h-5 w-5 text-orange-500" />
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-orange-500 rounded-full animate-pulse"></div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">{stats.pendingRequests}</div>
            <p className="text-xs text-muted-foreground mt-2">Require immediate attention</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 relative overflow-hidden" onClick={() => onNavigate('requests')}>
          <div className="absolute top-0 right-0 w-16 h-16 bg-green-500/10 rounded-full -mr-8 -mt-8"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved Institutes</CardTitle>
            <CheckCircle className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{stats.approvedInstitutes}</div>
            <p className="text-xs text-muted-foreground mt-2">Active and operational</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 relative overflow-hidden" onClick={() => onNavigate('requests')}>
          <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/10 rounded-full -mr-8 -mt-8"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected Institutes</CardTitle>
            <XCircle className="h-5 w-5 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">{stats.rejectedInstitutes}</div>
            <p className="text-xs text-muted-foreground mt-2">Did not meet criteria</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Monthly Registration Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Registration Trends</CardTitle>
            <CardDescription>Institute registrations, approvals, and rejections over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyRegistrations}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="registrations" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="approved" stroke="#10b981" strokeWidth={2} />
                <Line type="monotone" dataKey="rejected" stroke="#ef4444" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Institute Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Institute Distribution</CardTitle>
            <CardDescription>Breakdown by institute type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={instituteTypes}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {instituteTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>



      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Frequently used administrative functions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                <Card 
                  className="cursor-pointer hover:shadow-md transition-all duration-200 border-2 hover:border-primary/20"
                  onClick={() => onNavigate('master-data')}
                >
                  <CardContent className="p-6 text-center">
                    <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Database className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold">Master Data</h3>
                    <p className="text-sm text-muted-foreground mt-1">Manage system configuration</p>
                  </CardContent>
                </Card>
                
                <Card 
                  className="cursor-pointer hover:shadow-md transition-all duration-200 border-2 hover:border-orange-200"
                  onClick={() => onNavigate('requests')}
                >
                  <CardContent className="p-6 text-center">
                    <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Users className="h-6 w-6 text-orange-600" />
                    </div>
                    <h3 className="font-semibold">Onboarding Requests</h3>
                    <p className="text-sm text-muted-foreground mt-1">Review institute applications</p>
                  </CardContent>
                </Card>
                
                <Card 
                  className="cursor-pointer hover:shadow-md transition-all duration-200 border-2 hover:border-green-200"
                  onClick={() => onNavigate('onboarding-landing')}
                >
                  <CardContent className="p-6 text-center">
                    <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Building2 className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold">Institute Onboarding</h3>
                    <p className="text-sm text-muted-foreground mt-1">Help new institutes register</p>
                  </CardContent>
                </Card>
                
                <Card 
                  className="cursor-pointer hover:shadow-md transition-all duration-200 border-2 hover:border-blue-200"
                  onClick={() => onNavigate('reports')}
                >
                  <CardContent className="p-6 text-center">
                    <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold">Reports</h3>
                    <p className="text-sm text-muted-foreground mt-1">Analytics and insights</p>
                  </CardContent>
                </Card>
                
                <Card 
                  className="cursor-pointer hover:shadow-md transition-all duration-200 border-2 hover:border-gray-200"
                  onClick={() => onNavigate('settings')}
                >
                  <CardContent className="p-6 text-center">
                    <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Settings className="h-6 w-6 text-gray-600" />
                    </div>
                    <h3 className="font-semibold">System Settings</h3>
                    <p className="text-sm text-muted-foreground mt-1">Configure preferences</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notifications */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
              <CardDescription>Recent system alerts and updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {notifications.map((notification) => (
                <div key={notification.id} className="flex gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted cursor-pointer transition-colors">
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{notification.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notification.timestamp}</p>
                  </div>
                </div>
              ))}
              <Button variant="ghost" className="w-full mt-4" onClick={() => onNavigate('notifications')}>
                View All Notifications
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}