import React from 'react';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarProvider, 
  SidebarTrigger,
  SidebarInset
} from "./ui/sidebar";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { 
  LayoutDashboard, 
  Database, 
  Users, 
  FileText, 
  Settings, 
  Building2,
  Shield,
  LogOut,
  Bell,
  User
} from 'lucide-react';

interface SidebarLayoutProps {
  children: React.ReactNode;
  currentScreen: string;
  onNavigate: (screen: string) => void;
  onLogout: () => void;
}

export function SidebarLayout({ children, currentScreen, onNavigate, onLogout }: SidebarLayoutProps) {
  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      description: 'Overview & Analytics'
    },
    {
      id: 'master-data',
      label: 'Master Data',
      icon: Database,
      description: 'System Configuration'
    },
    {
      id: 'requests',
      label: 'Institute Requests',
      icon: Building2,
      description: 'Onboarding & Approvals',
      badge: '18'
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: FileText,
      description: 'Analytics & Insights'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      description: 'Account & Preferences'
    }
  ];

  const quickStats = [
    { label: 'Total Institutes', value: '245', color: 'bg-blue-500' },
    { label: 'Pending Requests', value: '18', color: 'bg-orange-500' },
    { label: 'Active Users', value: '1.2K', color: 'bg-green-500' }
  ];

  return (
    <SidebarProvider>
      <Sidebar className="border-r">
        <SidebarHeader className="border-b px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">EduAdmin</h2>
              <p className="text-xs text-muted-foreground" style={{ fontFamily: "'Lexend Deca', sans-serif" }}>Super Admin Panel</p>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent>
          {/* Navigation */}
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navigationItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => onNavigate(item.id)}
                      isActive={currentScreen === item.id}
                      className="h-12"
                    >
                      <item.icon className="h-4 w-4" />
                      <div className="flex-1 text-left">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{item.label}</span>
                          {item.badge && (
                            <Badge variant="secondary" className="h-5 px-1.5 text-xs">
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <Separator />

          {/* Quick Stats */}
          <SidebarGroup>
            <SidebarGroupLabel>Quick Stats</SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="space-y-3 px-3">
                {quickStats.map((stat, index) => (
                  <div key={index} className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                    <div className={`h-3 w-3 rounded-full ${stat.color}`} />
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                      <p className="text-sm font-semibold">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </SidebarGroupContent>
          </SidebarGroup>

          <Separator />

          {/* Notifications */}
          <SidebarGroup>
            <SidebarGroupLabel className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Recent Alerts
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="space-y-2 px-3">
                <div className="rounded-lg bg-yellow-50 dark:bg-yellow-950 p-3 border-l-4 border-yellow-400">
                  <p className="text-xs font-medium text-yellow-800 dark:text-yellow-200">
                    5 institutes pending approval
                  </p>
                  <p className="text-xs text-yellow-600 dark:text-yellow-300 mt-1">
                    Requires immediate attention
                  </p>
                </div>
                <div className="rounded-lg bg-blue-50 dark:bg-blue-950 p-3 border-l-4 border-blue-400">
                  <p className="text-xs font-medium text-blue-800 dark:text-blue-200">
                    System maintenance scheduled
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-300 mt-1">
                    Tomorrow at 2:00 AM
                  </p>
                </div>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t p-4">
          {/* User Profile */}
          <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="" alt="Admin" />
              <AvatarFallback className="bg-primary text-primary-foreground">
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate" style={{ fontFamily: "'Lexend Deca', sans-serif" }}>Super Admin</p>
              <p className="text-xs text-muted-foreground truncate">admin@system.com</p>
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            onClick={onLogout}
            className="w-full justify-start gap-2 mt-2 text-muted-foreground hover:text-foreground"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex-1">
            <h1 className="text-lg font-semibold capitalize">
              {currentScreen === 'master-data' ? 'Master Data Management' : 
               currentScreen === 'requests' ? 'Institute Requests' :
               currentScreen}
            </h1>
          </div>
        </header>
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}