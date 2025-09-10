import React, { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import {
  LayoutDashboard,
  Users,
  School,
  FileText,
  Settings,
  LogOut,
  BookOpen,
  GraduationCap,
  Calendar,
  MessageSquare,
  Award,
  TrendingUp,
  Bell,
  CreditCard,
  UserCheck,
  Database,
  Building,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface RoleBasedSidebarProps {
  userRole: 'super_admin' | 'institution_admin' | 'teacher' | 'student' | 'parent';
  currentScreen: string;
  onNavigate: (screen: string) => void;
  onLogout: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const roleConfigs = {
  super_admin: {
  title: <span style={{ fontFamily: "'Lexend Deca', sans-serif" }}>Super Admin Portal</span>,
    menuItems: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'master-data', label: 'Master Data', icon: Database },
      { id: 'requests', label: 'Institute Requests', icon: Building, badge: '12' },
      { id: 'notifications', label: 'Notifications', icon: Bell, badge: '7' },
      { id: 'profile', label: 'Institute Profiles', icon: School },
      { id: 'reports', label: 'Reports', icon: FileText },
      { id: 'settings', label: 'Settings', icon: Settings }
    ]
  },
  institution_admin: {
    title: 'Institution Admin',
    menuItems: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'students', label: 'Student Management', icon: Users },
      { id: 'teachers', label: 'Teacher Management', icon: GraduationCap },
      { id: 'classes', label: 'Class Management', icon: BookOpen },
      { id: 'reports', label: 'Reports', icon: FileText },
      { id: 'settings', label: 'Settings', icon: Settings }
    ]
  },
  teacher: {
    title: 'Teacher Portal',
    menuItems: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'classes', label: 'My Classes', icon: BookOpen },
      { id: 'assignments', label: 'Assignments', icon: FileText, badge: '5' },
      { id: 'gradebook', label: 'Gradebook', icon: Award },
      { id: 'attendance', label: 'Attendance', icon: UserCheck },
      { id: 'leave-application', label: 'Leave Application', icon: FileText },
      { id: 'messages', label: 'Messages', icon: MessageSquare, badge: '3' },
      { id: 'calendar', label: 'Calendar', icon: Calendar },
      { id: 'settings', label: 'Settings', icon: Settings }
    ]
  },
  student: {
    title: 'Student Portal',
    menuItems: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'schedule', label: 'Class Schedule', icon: Calendar },
      { id: 'assignments', label: 'Assignments', icon: FileText, badge: '2' },
      { id: 'grades', label: 'Grades', icon: Award },
      { id: 'certificates', label: 'Certificates', icon: Award },
      { id: 'library', label: 'Library', icon: BookOpen },
      { id: 'announcements', label: 'Announcements', icon: Bell, badge: '4' },
      { id: 'institution-profile', label: 'Institution Profile', icon: Building },
      { id: 'settings', label: 'Settings', icon: Settings }
    ]
  },
  parent: {
    title: 'Parent Portal',
    menuItems: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'children', label: 'My Children', icon: Users },
      { id: 'academic', label: 'Academic Reports', icon: TrendingUp },
      { id: 'child-certificates', label: 'Child Certificates', icon: Award },
      { id: 'communication', label: 'Communications', icon: MessageSquare, badge: '2' },
      { id: 'events', label: 'School Events', icon: Calendar },
      { id: 'notifications', label: 'Notifications', icon: Bell, badge: '3' },
      { id: 'settings', label: 'Settings', icon: Settings }
    ]
  }
};

export function RoleBasedSidebar({
  userRole,
  currentScreen,
  onNavigate,
  onLogout,
  isCollapsed = false,
  onToggleCollapse
}: RoleBasedSidebarProps) {
  const config = roleConfigs[userRole];

  const renderMenuItem = (item: any) => {
    const Icon = item.icon;
    const isActive = currentScreen === item.id;

    if (isCollapsed) {
      return (
        <TooltipProvider key={item.id}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant={isActive ? "default" : "secondary"}
                className={`w-full h-10 p-0 justify-center relative ${
                  isActive 
                    ? "bg-sidebar-primary text-sidebar-primary-foreground" 
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
                onClick={() => onNavigate(item.id)}
              >
                <Icon className="h-4 w-4" />
                {item.badge && (
                  <Badge 
                    variant={isActive ? "secondary" : "outline"} 
                    className="absolute -top-2 -right-2 text-xs h-5 w-5 p-0 flex items-center justify-center"
                  >
                    {item.badge}
                  </Badge>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className="flex items-center gap-2 z-50">
              {item.label}
              {item.badge && (
                <Badge variant="outline" className="text-xs">
                  {item.badge}
                </Badge>
              )}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return (
      <Button
        key={item.id}
        variant={isActive ? "default" : "secondary"}
        className={`w-full justify-start h-10 ${
          isActive 
            ? "bg-sidebar-primary text-sidebar-primary-foreground" 
            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        }`}
        onClick={() => onNavigate(item.id)}
      >
        <Icon className="mr-3 h-4 w-4" />
        <span className="flex-1 text-left">{item.label}</span>
        {item.badge && (
          <Badge 
            variant={isActive ? "secondary" : "outline"} 
            className="ml-auto text-xs"
          >
            {item.badge}
          </Badge>
        )}
      </Button>
    );
  };

  return (
    <div className={`flex h-full flex-col border-r bg-sidebar transition-all duration-300 ease-in-out ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Sidebar Header */}
      <div className={`flex h-12 items-center ${isCollapsed ? 'px-2 justify-center' : 'px-4 justify-between'}`}>
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div>
              <p className="text-sm font-medium text-sidebar-foreground">{config.title}</p>
              <p className="text-xs text-sidebar-foreground/60">Navigation</p>
            </div>
          </div>
        )}

        {onToggleCollapse && (
          <Button
            variant="secondary"
            size="sm"
            className={`h-8 w-8 p-0 text-sidebar-foreground hover:bg-sidebar-accent ${
              isCollapsed ? '' : 'ml-auto'
            }`}
            onClick={onToggleCollapse}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>

      <Separator />

      {/* Navigation Menu */}
      <nav className={`flex-1 space-y-1 ${isCollapsed ? 'px-2' : 'px-4'}`}>
        {config.menuItems.map(renderMenuItem)}
      </nav>

      <Separator />

      {/* Footer */}
      <div className={isCollapsed ? 'p-2' : 'p-4'}>
        {isCollapsed ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="secondary"
                  className="w-full h-10 p-0 justify-center text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  onClick={onLogout}
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" className="z-50">
                Sign Out
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <Button
            variant="secondary"
            className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            onClick={onLogout}
          >
            <LogOut className="mr-3 h-4 w-4" />
            Sign Out
          </Button>
        )}
      </div>
    </div>
  );
}