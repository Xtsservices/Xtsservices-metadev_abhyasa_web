import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Bell,
  Search,
  Filter,
  Calendar,
  Clock,
  User,
  BookOpen,
  AlertTriangle,
  CheckCircle,
  Info,
  MessageSquare,
  Award,
  Users,
  Settings,
  Archive,
  Trash2,
  MoreHorizontal
} from 'lucide-react';
import { toast } from "sonner";

interface RoleBasedNotificationsProps {
  onNavigate: (screen: import("../App").Screen) => void;
  userRole: 'super_admin' | 'institution_admin' | 'teacher' | 'student' | 'parent';
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  category: string;
  timestamp: string;
  isRead: boolean;
  isImportant: boolean;
  actionRequired: boolean;
  relatedEntity?: string;
}

export function RoleBasedNotifications({ onNavigate, userRole }: RoleBasedNotificationsProps) {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Role-specific notifications
  const getNotificationsForRole = (): Notification[] => {
    const baseNotifications: Notification[] = [];

    switch (userRole) {
      case 'super_admin':
        return [
          {
            id: '1',
            title: 'New Institute Registration',
            message: 'Greenfield Academy has submitted registration request for review',
            type: 'info',
            category: 'Registration',
            timestamp: '2025-09-02T09:30:00',
            isRead: false,
            isImportant: true,
            actionRequired: true,
            relatedEntity: 'Greenfield Academy'
          },
          {
            id: '2',
            title: 'System Maintenance Scheduled',
            message: 'Scheduled maintenance will occur on September 5th from 2 AM to 4 AM',
            type: 'warning',
            category: 'System',
            timestamp: '2025-09-01T16:00:00',
            isRead: true,
            isImportant: true,
            actionRequired: false
          },
          {
            id: '3',
            title: 'Monthly Report Generated',
            message: 'August 2025 system analytics report is ready for review',
            type: 'success',
            category: 'Reports',
            timestamp: '2025-09-01T10:15:00',
            isRead: false,
            isImportant: false,
            actionRequired: false
          }
        ];

      case 'institution_admin':
        return [
          {
            id: '1',
            title: 'Teacher Leave Request',
            message: 'Dr. Sarah Wilson has requested leave for September 10-12',
            type: 'info',
            category: 'Leave Management',
            timestamp: '2025-09-02T08:45:00',
            isRead: false,
            isImportant: true,
            actionRequired: true,
            relatedEntity: 'Dr. Sarah Wilson'
          },
          {
            id: '2',
            title: 'New Student Enrollment',
            message: '15 new students have completed enrollment for Grade 9',
            type: 'success',
            category: 'Enrollment',
            timestamp: '2025-09-01T14:30:00',
            isRead: true,
            isImportant: false,
            actionRequired: false
          },
          {
            id: '3',
            title: 'Academic Calendar Update',
            message: 'Mid-term exam schedule has been updated and published',
            type: 'info',
            category: 'Academic',
            timestamp: '2025-09-01T11:20:00',
            isRead: false,
            isImportant: true,
            actionRequired: false
          }
        ];

      case 'teacher':
        return [
          {
            id: '1',
            title: 'Assignment Submission Reminder',
            message: '12 students have not submitted Mathematics homework due today',
            type: 'warning',
            category: 'Assignments',
            timestamp: '2025-09-02T07:30:00',
            isRead: false,
            isImportant: true,
            actionRequired: true
          },
          {
            id: '2',
            title: 'Parent Meeting Scheduled',
            message: 'Meeting with Emma Thompson\'s parents scheduled for September 5th at 3 PM',
            type: 'info',
            category: 'Meetings',
            timestamp: '2025-09-01T16:45:00',
            isRead: true,
            isImportant: true,
            actionRequired: false
          },
          {
            id: '3',
            title: 'Grading Completed',
            message: 'Physics test grading completed for Grade 11-A',
            type: 'success',
            category: 'Grading',
            timestamp: '2025-09-01T12:00:00',
            isRead: true,
            isImportant: false,
            actionRequired: false
          }
        ];

      case 'student':
        return [
          {
            id: '1',
            title: 'Assignment Due Tomorrow',
            message: 'Mathematics homework is due tomorrow at 9 AM',
            type: 'warning',
            category: 'Assignments',
            timestamp: '2025-09-02T10:00:00',
            isRead: false,
            isImportant: true,
            actionRequired: true
          },
          {
            id: '2',
            title: 'New Certificate Available',
            message: 'Your Science Fair participation certificate is ready for download',
            type: 'success',
            category: 'Certificates',
            timestamp: '2025-09-01T15:30:00',
            isRead: false,
            isImportant: false,
            actionRequired: true
          },
          {
            id: '3',
            title: 'Grade Published',
            message: 'Your Physics test grade (A-) has been published',
            type: 'info',
            category: 'Grades',
            timestamp: '2025-09-01T13:20:00',
            isRead: true,
            isImportant: false,
            actionRequired: false
          },
          {
            id: '4',
            title: 'Class Schedule Change',
            message: 'Tomorrow\'s Chemistry class moved to Lab Room 2',
            type: 'warning',
            category: 'Schedule',
            timestamp: '2025-09-01T11:15:00',
            isRead: false,
            isImportant: true,
            actionRequired: false
          }
        ];

      case 'parent':
        return [
          {
            id: '1',
            title: 'Child\'s Assignment Due',
            message: 'Emma\'s Mathematics homework is due tomorrow',
            type: 'warning',
            category: 'Academic',
            timestamp: '2025-09-02T09:45:00',
            isRead: false,
            isImportant: true,
            actionRequired: false,
            relatedEntity: 'Emma Thompson'
          },
          {
            id: '2',
            title: 'New Certificate Available',
            message: 'Emma\'s Science Fair certificate is ready for download',
            type: 'success',
            category: 'Certificates',
            timestamp: '2025-09-01T16:20:00',
            isRead: false,
            isImportant: false,
            actionRequired: true,
            relatedEntity: 'Emma Thompson'
          },
          {
            id: '3',
            title: 'Parent-Teacher Meeting',
            message: 'Meeting with Dr. Sarah Wilson scheduled for September 5th at 3 PM',
            type: 'info',
            category: 'Meetings',
            timestamp: '2025-09-01T14:15:00',
            isRead: true,
            isImportant: true,
            actionRequired: false
          },
          {
            id: '4',
            title: 'Attendance Alert',
            message: 'Emma was marked absent in today\'s Chemistry class',
            type: 'warning',
            category: 'Attendance',
            timestamp: '2025-09-01T10:30:00',
            isRead: false,
            isImportant: true,
            actionRequired: false,
            relatedEntity: 'Emma Thompson'
          }
        ];

      default:
        return [];
    }
  };

  const [notifications] = useState<Notification[]>(getNotificationsForRole());

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || notification.type === filterType;
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'unread' && !notification.isRead) ||
                      (activeTab === 'important' && notification.isImportant) ||
                      (activeTab === 'action' && notification.actionRequired);
    
    return matchesSearch && matchesType && matchesTab;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <Info className="h-4 w-4 text-blue-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const handleMarkAsRead = (notificationId: string) => {
    toast.success("Notification marked as read");
  };

  const handleMarkAllAsRead = () => {
    toast.success("All notifications marked as read");
  };

  const handleDeleteNotification = (notificationId: string) => {
    toast.success("Notification deleted");
  };

  const handleAction = (notification: Notification) => {
    switch (notification.category) {
      case 'Certificates':
        onNavigate('certificates');
        break;
      case 'Assignments':
        onNavigate('assignments');
        break;
      case 'Registration':
        onNavigate('requests');
        break;
      default:
        toast.info("Action performed");
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const importantCount = notifications.filter(n => n.isImportant).length;
  const actionRequiredCount = notifications.filter(n => n.actionRequired).length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">Stay updated with important information and alerts</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleMarkAllAsRead}>
            <CheckCircle className="h-4 w-4 mr-2" />
            Mark All Read
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{notifications.length}</div>
            <p className="text-xs text-muted-foreground">All notifications</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread</CardTitle>
            <Badge variant="destructive" className="text-xs">
              {unreadCount}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unreadCount}</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Important</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{importantCount}</div>
            <p className="text-xs text-muted-foreground">High priority</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Action Required</CardTitle>
            <Clock className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{actionRequiredCount}</div>
            <p className="text-xs text-muted-foreground">Require action</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search notifications..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>{filteredNotifications.length} notifications found</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All ({notifications.length})</TabsTrigger>
              <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
              <TabsTrigger value="important">Important ({importantCount})</TabsTrigger>
              <TabsTrigger value="action">Action ({actionRequiredCount})</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="space-y-4 mt-4">
              {filteredNotifications.length === 0 ? (
                <div className="text-center py-8">
                  <Bell className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-2 text-sm font-medium">No notifications</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    You're all caught up! Check back later for updates.
                  </p>
                </div>
              ) : (
                filteredNotifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`p-4 border rounded-lg ${
                      !notification.isRead ? 'bg-blue-50 border-blue-200' : 'bg-white'
                    } ${notification.isImportant ? 'ring-1 ring-yellow-400' : ''}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="mt-1">
                          {getTypeIcon(notification.type)}
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className={`font-medium ${!notification.isRead ? 'font-bold' : ''}`}>
                              {notification.title}
                            </h3>
                            <Badge className={getTypeColor(notification.type)}>
                              {notification.type}
                            </Badge>
                            <Badge variant="outline">
                              {notification.category}
                            </Badge>
                            {!notification.isRead && (
                              <Badge variant="destructive" className="text-xs">
                                New
                              </Badge>
                            )}
                            {notification.isImportant && (
                              <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                                Important
                              </Badge>
                            )}
                            {notification.actionRequired && (
                              <Badge className="bg-red-100 text-red-800 text-xs">
                                Action Required
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {notification.message}
                          </p>
                          {notification.relatedEntity && (
                            <p className="text-xs text-muted-foreground">
                              Related to: {notification.relatedEntity}
                            </p>
                          )}
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {new Date(notification.timestamp).toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 ml-4">
                        {notification.actionRequired && (
                          <Button 
                            size="sm" 
                            onClick={() => handleAction(notification)}
                            className="text-xs"
                          >
                            Take Action
                          </Button>
                        )}
                        {!notification.isRead && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleMarkAsRead(notification.id)}
                          >
                            <CheckCircle className="h-3 w-3" />
                          </Button>
                        )}
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteNotification(notification.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}