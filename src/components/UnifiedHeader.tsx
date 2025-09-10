import React, { useState } from 'react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Bell, Settings, LogOut, User, Building2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface UnifiedHeaderProps {
  userRole: 'super_admin' | 'institution_admin' | 'teacher' | 'student' | 'parent';
  userName: string;
  userEmail: string;
  institutionName?: string;
  onNavigate: (screen: string) => void;
  onLogout: () => void;
}

export function UnifiedHeader({ 
  userRole, 
  userName, 
  userEmail, 
  institutionName = "Abhyasa",
  onNavigate,
  onLogout 
}: UnifiedHeaderProps) {
  const [notifications] = useState([
    { id: 1, title: 'New Assignment Posted', message: 'Mathematics homework due tomorrow', time: '2 min ago', type: 'assignment' },
    { id: 2, title: 'Meeting Reminder', message: 'Parent-teacher meeting at 3 PM', time: '1 hour ago', type: 'meeting' },
    { id: 3, title: 'Grade Updated', message: 'Physics test results published', time: '2 hours ago', type: 'grade' }
  ]);

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'super_admin':
  return <span style={{ fontFamily: "'Lexend Deca', sans-serif" }}>Super Administrator</span>;
      case 'institution_admin':
        return 'Institution Admin';
      case 'teacher':
        return 'Teacher';
      case 'student':
        return 'Student';
      case 'parent':
        return 'Parent';
      default:
        return 'User';
    }
  };

  const getNotificationIcon = (type: string) => {
    return <div className="w-2 h-2 bg-blue-500 rounded-full"></div>;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background shadow-sm">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left side - Logo and Institution Name */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            <div className="h-16 w-16 flex items-center justify-center">
              <img src="public/images/Abhyasa.png" alt="Logo" className="h-16 w-16 object-contain" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">{institutionName}</h1>
              <p className="text-sm text-muted-foreground">
                {userRole === 'super_admin' ? 'System Administration' : 'Education Management'}
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Notifications and Profile */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                {notifications.length > 0 && (
                  <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {notifications.length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Notifications</CardTitle>
                  <CardDescription>Recent updates and alerts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="flex gap-3 p-2 hover:bg-muted rounded-lg cursor-pointer">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{notification.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full mt-2" 
                    onClick={() => onNavigate('notifications')}
                  >
                    View All Notifications
                  </Button>
                </CardContent>
              </Card>
            </PopoverContent>
          </Popover>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-auto px-2">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" />
                    <AvatarFallback>{userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <p className="text-sm font-medium">{userName}</p>
                    <p className="text-xs text-muted-foreground">{getRoleDisplayName(userRole)}</p>
                  </div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">{userName}</p>
                  <p className="w-[200px] truncate text-sm text-muted-foreground">
                    {userEmail}
                  </p>
                  <Badge variant="secondary" className="w-fit text-xs">
                    {getRoleDisplayName(userRole)}
                  </Badge>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => {
                let profileScreen = 'settings';
                switch (userRole) {
                  case 'super_admin':
                    profileScreen = 'super-admin-profile';
                    break;
                  case 'institution_admin':
                    profileScreen = 'institution-admin-profile';
                    break;
                  case 'teacher':
                    profileScreen = 'teacher-profile';
                    break;
                  case 'student':
                    profileScreen = 'student-profile';
                    break;
                  case 'parent':
                    profileScreen = 'parent-profile';
                    break;
                }
                onNavigate(profileScreen);
              }}>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onNavigate('settings')}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}