import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { 
  Home, 
  Search, 
  Bell, 
  User,
  BookOpen,
  Users,
  MessageSquare,
  Calendar,
  TrendingUp,
  Award
} from 'lucide-react';

interface ModernMobileBottomNavProps {
  userRole: 'student' | 'parent';
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

const navigationConfigs = {
  student: [
    { 
      id: 'dashboard', 
      label: 'Home', 
      icon: Home,
      activeColor: 'text-blue-600',
      activeBg: 'bg-blue-50'
    },
    { 
      id: 'search', 
      label: 'Search', 
      icon: Search,
      activeColor: 'text-purple-600',
      activeBg: 'bg-purple-50'
    },
    { 
      id: 'activity', 
      label: 'Activity', 
      icon: Bell,
      badge: '4',
      activeColor: 'text-green-600',
      activeBg: 'bg-green-50'
    },
    { 
      id: 'student-profile', 
      label: 'Profile', 
      icon: User,
      activeColor: 'text-orange-600',
      activeBg: 'bg-orange-50'
    }
  ],
  parent: [
    { 
      id: 'dashboard', 
      label: 'Home', 
      icon: Home,
      activeColor: 'text-blue-600',
      activeBg: 'bg-blue-50'
    },
    { 
      id: 'search', 
      label: 'Search', 
      icon: Search,
      activeColor: 'text-purple-600',
      activeBg: 'bg-purple-50'
    },
    { 
      id: 'activity', 
      label: 'Activity', 
      icon: Bell,
      badge: '3',
      activeColor: 'text-green-600',
      activeBg: 'bg-green-50'
    },
    { 
      id: 'parent-profile', 
      label: 'Profile', 
      icon: User,
      activeColor: 'text-orange-600',
      activeBg: 'bg-orange-50'
    }
  ]
};

export function ModernMobileBottomNav({ 
  userRole, 
  currentScreen, 
  onNavigate 
}: ModernMobileBottomNavProps) {
  const navItems = navigationConfigs[userRole];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 safe-area-inset-bottom">
      <motion.div 
        className="bottom-nav-floating mx-auto max-w-sm"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="flex items-center justify-around px-2 py-3">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            
            return (
              <motion.div
                key={item.id}
                whileTap={{ scale: 0.9 }}
                className="relative"
              >
                <Button
                  variant="ghost"
                  className={`flex flex-col items-center gap-1 h-auto py-2 px-3 relative min-w-0 rounded-xl transition-all duration-200 ${
                    isActive 
                      ? `${item.activeBg} ${item.activeColor} shadow-sm` 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                  onClick={() => onNavigate(item.id)}
                >
                  <motion.div 
                    className="relative nav-icon-scale"
                    animate={{ 
                      scale: isActive ? 1.1 : 1,
                      rotate: isActive ? [0, -5, 5, 0] : 0
                    }}
                    transition={{ 
                      duration: 0.2,
                      rotate: { duration: 0.3 }
                    }}
                  >
                    <Icon className={`h-5 w-5 ${isActive ? 'drop-shadow-sm' : ''}`} />
                    {item.badge && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-2 -right-2"
                      >
                        <Badge 
                          variant="destructive" 
                          className="h-5 w-5 p-0 flex items-center justify-center text-xs font-semibold rounded-full shadow-md"
                        >
                          {item.badge}
                        </Badge>
                      </motion.div>
                    )}
                  </motion.div>
                  <motion.span 
                    className={`text-xs font-medium truncate max-w-12 ${
                      isActive ? 'font-semibold' : ''
                    }`}
                    animate={{ 
                      scale: isActive ? 1.05 : 1,
                      fontWeight: isActive ? 600 : 500
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.label}
                  </motion.span>
                </Button>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}