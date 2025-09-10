import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Separator } from "./ui/separator";
import { 
  Search, 
  Filter, 
  MarkAsUnread,
  Trash2,
  Bell,
  BellRing,
  AlertTriangle,
  CheckCircle,
  Info,
  XCircle,
  Clock,
  ChevronLeft,
  Calendar,
  User,
  Building2,
  FileText,
  Settings as SettingsIcon,
  Archive,
  Star,
  MoreVertical,
  Eye,
  EyeOff
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

interface NotificationsProps {
  onNavigate: (screen: string) => void;
}

export function Notifications({ onNavigate }: NotificationsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedNotifications, setSelectedNotifications] = useState<number[]>([]);

  // Comprehensive mock data for notifications
  const allNotifications = [
    {
      id: 1,
      title: "New Institute Registration",
      message: "Delhi Public School has submitted their registration documents for review. Please verify the provided information and approve or reject the application.",
      type: "info",
      priority: "medium",
      timestamp: "2024-01-20T10:30:00Z",
      read: false,
      category: "registration",
      sender: "System",
      relatedEntity: "Delhi Public School",
      actionRequired: true
    },
    {
      id: 2,
      title: "Critical Compliance Alert",
      message: "5 institutes require immediate document updates to maintain their compliance status. Failure to update may result in suspension.",
      type: "urgent",
      priority: "high",
      timestamp: "2024-01-20T08:15:00Z",
      read: false,
      category: "compliance",
      sender: "Compliance System",
      relatedEntity: "Multiple Institutes",
      actionRequired: true
    },
    {
      id: 3,
      title: "System Maintenance Scheduled",
      message: "Platform maintenance is scheduled for tomorrow from 2:00 AM to 4:00 AM IST. All services will be temporarily unavailable.",
      type: "info",
      priority: "medium",
      timestamp: "2024-01-19T16:45:00Z",
      read: true,
      category: "system",
      sender: "System Administrator",
      relatedEntity: "Platform",
      actionRequired: false
    },
    {
      id: 4,
      title: "High-Priority Institute Approval",
      message: "Ryan International School application is marked as high-priority and requires immediate review. Application deadline is approaching.",
      type: "urgent",
      priority: "high",
      timestamp: "2024-01-18T14:20:00Z",
      read: false,
      category: "approval",
      sender: "Review System",
      relatedEntity: "Ryan International School",
      actionRequired: true
    },
    {
      id: 5,
      title: "Monthly Report Generated",
      message: "Your monthly institute analytics report for December 2023 has been generated and is ready for download.",
      type: "success",
      priority: "low",
      timestamp: "2024-01-18T09:00:00Z",
      read: true,
      category: "reports",
      sender: "Analytics System",
      relatedEntity: "Monthly Report",
      actionRequired: false
    },
    {
      id: 6,
      title: "Document Verification Required",
      message: "St. Mary's Convent School has uploaded new accreditation documents that require verification within 48 hours.",
      type: "warning",
      priority: "medium",
      timestamp: "2024-01-17T13:30:00Z",
      read: false,
      category: "verification",
      sender: "Document System",
      relatedEntity: "St. Mary's Convent School",
      actionRequired: true
    },
    {
      id: 7,
      title: "User Access Request",
      message: "New teacher account approval request from Kendriya Vidyalaya. Please review the credentials and approve access.",
      type: "info",
      priority: "medium",
      timestamp: "2024-01-17T11:15:00Z",
      read: true,
      category: "access",
      sender: "User Management",
      relatedEntity: "Kendriya Vidyalaya",
      actionRequired: true
    },
    {
      id: 8,
      title: "Fee Payment Overdue Alert",
      message: "3 institutes have overdue annual subscription fees. Please follow up with the respective institutions.",
      type: "warning",
      priority: "medium",
      timestamp: "2024-01-16T15:45:00Z",
      read: false,
      category: "payment",
      sender: "Billing System",
      relatedEntity: "Multiple Institutes",
      actionRequired: true
    },
    {
      id: 9,
      title: "Security Update Applied",
      message: "Latest security patches have been successfully applied to the platform. All systems are secure and operational.",
      type: "success",
      priority: "low",
      timestamp: "2024-01-16T02:00:00Z",
      read: true,
      category: "security",
      sender: "Security Team",
      relatedEntity: "Platform",
      actionRequired: false
    },
    {
      id: 10,
      title: "Institute License Expiring",
      message: "Modern Public School's license will expire in 15 days. Please coordinate with the institute for renewal.",
      type: "warning",
      priority: "medium",
      timestamp: "2024-01-15T10:20:00Z",
      read: false,
      category: "license",
      sender: "License Management",
      relatedEntity: "Modern Public School",
      actionRequired: true
    }
  ];

  // Statistics
  const stats = {
    total: allNotifications.length,
    unread: allNotifications.filter(n => !n.read).length,
    urgent: allNotifications.filter(n => n.type === 'urgent').length,
    actionRequired: allNotifications.filter(n => n.actionRequired).length
  };

  // Filter notifications
  const filteredNotifications = allNotifications
    .filter(notification => {
      const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           notification.relatedEntity.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = typeFilter === 'all' || notification.type === typeFilter;
      const matchesStatus = statusFilter === 'all' || 
                           (statusFilter === 'read' && notification.read) ||
                           (statusFilter === 'unread' && !notification.read);
      
      return matchesSearch && matchesType && matchesStatus;
    })
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'urgent':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'info':
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getNotificationBadge = (type: string, priority: string) => {
    const getTypeColor = () => {
      switch (type) {
        case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
        case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case 'success': return 'bg-green-100 text-green-800 border-green-200';
        default: return 'bg-blue-100 text-blue-800 border-blue-200';
      }
    };

    return (
      <div className="flex gap-2">
        <Badge variant="outline" className={getTypeColor()}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </Badge>
        {priority === 'high' && (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            High Priority
          </Badge>
        )}
      </div>
    );
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} days ago`;
    }
  };

  const handleSelectNotification = (id: number) => {
    setSelectedNotifications(prev => 
      prev.includes(id) 
        ? prev.filter(nId => nId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedNotifications.length === filteredNotifications.length) {
      setSelectedNotifications([]);
    } else {
      setSelectedNotifications(filteredNotifications.map(n => n.id));
    }
  };

  const handleMarkAsRead = (ids: number[]) => {
    // Implementation would update notification status
    console.log('Mark as read:', ids);
  };

  const handleMarkAsUnread = (ids: number[]) => {
    // Implementation would update notification status
    console.log('Mark as unread:', ids);
  };

  const handleDelete = (ids: number[]) => {
    // Implementation would delete notifications
    console.log('Delete notifications:', ids);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onNavigate('dashboard')}
            className="text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Notifications</h1>
            <p className="text-muted-foreground">Manage system alerts and updates</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Archive className="h-4 w-4 mr-2" />
            Archive All Read
          </Button>
          <Button variant="outline" size="sm">
            <SettingsIcon className="h-4 w-4 mr-2" />
            Notification Settings
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Notifications</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">All notifications</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread</CardTitle>
            <BellRing className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.unread}</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Urgent</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.urgent}</div>
            <p className="text-xs text-muted-foreground">Critical alerts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Action Required</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.actionRequired}</div>
            <p className="text-xs text-muted-foreground">Need response</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Center</CardTitle>
          <CardDescription>Manage and filter your notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="info">Information</SelectItem>
                <SelectItem value="success">Success</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="unread">Unread</SelectItem>
                <SelectItem value="read">Read</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Bulk Actions */}
          {selectedNotifications.length > 0 && (
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg mb-6">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">
                  {selectedNotifications.length} selected
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleMarkAsRead(selectedNotifications)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Mark as Read
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleMarkAsUnread(selectedNotifications)}
                >
                  <EyeOff className="h-4 w-4 mr-2" />
                  Mark as Unread
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDelete(selectedNotifications)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          )}

          {/* Select All */}
          <div className="flex items-center gap-2 mb-4">
            <Checkbox
              checked={selectedNotifications.length === filteredNotifications.length}
              onCheckedChange={handleSelectAll}
              id="select-all"
            />
            <label htmlFor="select-all" className="text-sm font-medium cursor-pointer">
              Select all notifications
            </label>
          </div>

          <Separator className="mb-6" />

          {/* Notifications List */}
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={`transition-all duration-200 hover:shadow-md ${
                  !notification.read ? 'border-l-4 border-l-blue-500 bg-blue-50/30' : ''
                } ${selectedNotifications.includes(notification.id) ? 'ring-2 ring-primary/20' : ''}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Checkbox
                      checked={selectedNotifications.includes(notification.id)}
                      onCheckedChange={() => handleSelectNotification(notification.id)}
                    />
                    
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className={`font-medium ${!notification.read ? 'font-semibold' : ''}`}>
                              {notification.title}
                            </h3>
                            {!notification.read && (
                              <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatTimestamp(notification.timestamp)}
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {notification.sender}
                            </div>
                            <div className="flex items-center gap-1">
                              <Building2 className="h-3 w-3" />
                              {notification.relatedEntity}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-2">
                          {getNotificationBadge(notification.type, notification.priority)}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleMarkAsRead([notification.id])}>
                                <Eye className="h-4 w-4 mr-2" />
                                Mark as Read
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleMarkAsUnread([notification.id])}>
                                <EyeOff className="h-4 w-4 mr-2" />
                                Mark as Unread
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Star className="h-4 w-4 mr-2" />
                                Star
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDelete([notification.id])}>
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                      
                      {notification.actionRequired && (
                        <div className="mt-3 pt-3 border-t">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                              Action Required
                            </Badge>
                            <Button variant="outline" size="sm">
                              Take Action
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredNotifications.length === 0 && (
            <div className="text-center py-8">
              <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">No notifications found</h3>
              <p className="text-muted-foreground">Try adjusting your search criteria</p>
            </div>
          )}

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6 pt-6 border-t">
            <div className="text-sm text-muted-foreground">
              Showing {filteredNotifications.length} of {stats.total} notifications
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}