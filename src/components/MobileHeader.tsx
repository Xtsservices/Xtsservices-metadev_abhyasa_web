import React from 'react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Bell, Building2, Settings, LogOut, User } from 'lucide-react';

interface MobileHeaderProps {
  userRole: 'student' | 'parent';
  userName: string;
  userEmail: string;
  institutionName: string;
  onNavigate: (screen: string) => void;
  onLogout: () => void;
}

export function MobileHeader({ 
  userRole, 
  userName, 
  userEmail, 
  institutionName,
  onNavigate,
  onLogout 
}: MobileHeaderProps) {
  const notificationCount = userRole === 'student' ? 4 : 3;

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'student':
        return 'Student';
      case 'parent':
        return 'Parent';
      default:
        return 'User';
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-4">
        {/* Left side - Logo and Institution */}
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
            <Building2 className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="min-w-0">
            <h1 className="text-base font-semibold text-foreground truncate">
              {institutionName}
            </h1>
            <p className="text-xs text-muted-foreground">
              {getRoleDisplayName(userRole)} Portal
            </p>
          </div>
        </div>

        {/* Right side - Notifications and Profile */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="relative h-10 w-10 p-0"
            onClick={() => onNavigate('notifications')}
          >
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-xs">
                {notificationCount}
              </Badge>
            )}
          </Button>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-10 w-10 p-0">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
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
              <DropdownMenuItem onClick={() => onNavigate(userRole === 'student' ? 'student-profile' : 'parent-profile')}>
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