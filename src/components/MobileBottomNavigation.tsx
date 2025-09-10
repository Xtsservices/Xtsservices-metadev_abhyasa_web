import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Home, 
  Search, 
  Bell, 
  User,
  BookOpen,
  Calendar,
  MessageSquare,
  Users,
  TrendingUp,
  Award
} from 'lucide-react';

interface MobileBottomNavigationProps {
  userRole: 'student' | 'parent';
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

const navigationConfigs = {
  student: [
    { 
      id: 'dashboard', 
      label: 'Home', 
      icon: Home 
    },
    { 
      id: 'assignments', 
      label: 'Tasks', 
      icon: BookOpen,
      badge: '2'
    },
    { 
      id: 'announcements', 
      label: 'Activity', 
      icon: Bell,
      badge: '4'
    },
    { 
      id: 'student-profile', 
      label: 'Profile', 
      icon: User 
    }
  ],
  parent: [
    { 
      id: 'dashboard', 
      label: 'Home', 
      icon: Home 
    },
    { 
      id: 'children', 
      label: 'Children', 
      icon: Users 
    },
    { 
      id: 'notifications', 
      label: 'Activity', 
      icon: Bell,
      badge: '3'
    },
    { 
      id: 'parent-profile', 
      label: 'Profile', 
      icon: User 
    }
  ]
};

export function MobileBottomNavigation({ 
  userRole, 
  currentScreen, 
  onNavigate 
}: MobileBottomNavigationProps) {
  const navItems = navigationConfigs[userRole];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border safe-area-inset-bottom">
      <div className="flex items-center justify-around px-4 py-2 pb-safe">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              className={`flex flex-col items-center gap-1 h-auto py-2 px-3 relative min-w-0 ${
                isActive 
                  ? 'text-primary bg-primary/10' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => onNavigate(item.id)}
            >
              <div className="relative">
                <Icon className="h-5 w-5" />
                {item.badge && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-xs"
                  >
                    {item.badge}
                  </Badge>
                )}
              </div>
              <span className="text-xs font-medium truncate max-w-12">
                {item.label}
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}