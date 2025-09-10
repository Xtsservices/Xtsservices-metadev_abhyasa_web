import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Separator } from './ui/separator';
import { SwipeHint } from './SwipeHint';
import { motion, AnimatePresence, PanInfo } from 'motion/react';
import { 
  Home,
  Users,
  TrendingUp,
  Award,
  MessageSquare,
  Calendar,
  Bell,
  Settings,
  LogOut,
  X,
  ChevronRight,
  Mail,
  BookOpen,
  GraduationCap,
  Building2
} from 'lucide-react';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  userRole: 'student' | 'parent';
  userName: string;
  userEmail: string;
  institutionName: string;
  currentScreen: string;
  onNavigate: (screen: string) => void;
  onLogout: () => void;
}

export function MobileDrawer({
  isOpen,
  onClose,
  userRole,
  userName,
  userEmail,
  institutionName,
  currentScreen,
  onNavigate,
  onLogout
}: MobileDrawerProps) {
  const [showSwipeHint, setShowSwipeHint] = React.useState(false);

  // Prevent body scroll when drawer is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.classList.add('drawer-open');
      // Show swipe hint on first open
      const hasSeenHint = localStorage.getItem('drawer-swipe-hint-seen');
      if (!hasSeenHint) {
        setTimeout(() => setShowSwipeHint(true), 1000); // Show after 1 second
      }
    } else {
      document.body.classList.remove('drawer-open');
      setShowSwipeHint(false);
    }
    
    return () => {
      document.body.classList.remove('drawer-open');
    };
  }, [isOpen]);

  const handleDismissHint = () => {
    setShowSwipeHint(false);
    localStorage.setItem('drawer-swipe-hint-seen', 'true');
  };

  const getMenuItems = () => {
    if (userRole === 'student') {
      return [
        { id: 'dashboard', label: 'Dashboard', icon: Home, badge: null },
        { id: 'assignments', label: 'My Assignments', icon: BookOpen, badge: '3' },
        { id: 'grades', label: 'My Grades', icon: TrendingUp, badge: null },
        { id: 'schedule', label: 'Schedule', icon: Calendar, badge: null },
        { id: 'certificates', label: 'Certificates', icon: Award, badge: null },
        { id: 'library', label: 'Library', icon: GraduationCap, badge: null },
        { id: 'announcements', label: 'Announcements', icon: Bell, badge: '2' },
        { id: 'settings', label: 'Settings', icon: Settings, badge: null }
      ];
    } else {
      return [
        { id: 'dashboard', label: 'Dashboard', icon: Home, badge: null },
        { id: 'children', label: 'My Children', icon: Users, badge: null },
        { id: 'academic', label: 'Academic Reports', icon: TrendingUp, badge: null },
        { id: 'child-certificates', label: 'Child Certificates', icon: Award, badge: null },
        { id: 'communication', label: 'Communications', icon: MessageSquare, badge: '5' },
        { id: 'events', label: 'School Events', icon: Calendar, badge: '2' },
        { id: 'notifications', label: 'Notifications', icon: Bell, badge: '3' },
        { id: 'settings', label: 'Settings', icon: Settings, badge: null }
      ];
    }
  };

  const menuItems = getMenuItems();

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

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'student':
        return 'bg-teal-100 text-teal-800 border-teal-200';
      case 'parent':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleItemClick = (itemId: string) => {
    onNavigate(itemId);
    onClose();
  };

  const handleDragEnd = (event: any, info: PanInfo) => {
    // Close drawer if dragged left more than 100px or with sufficient velocity
    if (info.offset.x < -100 || info.velocity.x < -500) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="drawer-backdrop fixed inset-0 z-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className="mobile-drawer drawer-draggable fixed top-0 left-0 h-full w-80 max-w-[85vw] z-50 md:hidden"
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ 
              type: "spring",
              damping: 25,
              stiffness: 200
            }}
            drag="x"
            dragConstraints={{ left: -320, right: 0 }}
            dragElastic={0.1}
            onDragEnd={handleDragEnd}
            style={{ borderRadius: '0 16px 16px 0' }}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg abhyvasa-gradient flex items-center justify-center">
                    <Building2 className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-sm truncate max-w-32">{institutionName}</h2>
                    <p className="text-xs text-muted-foreground">Menu</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* User Profile Section */}
              <motion.div 
                className="p-4 abhyvasa-gradient-soft border-b border-border"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="h-12 w-12 ring-2 ring-primary/30">
                    <AvatarFallback className="abhyvasa-gradient text-white font-semibold">
                      {userName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">{userName}</h3>
                    <div className="flex items-center gap-1 mb-1">
                      <Mail className="h-3 w-3 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
                    </div>
                    <Badge variant="secondary" className={`text-xs ${getRoleColor(userRole)}`}>
                      {getRoleDisplayName(userRole)}
                    </Badge>
                  </div>
                </div>
              </motion.div>

              {/* Menu Items */}
              <div className="flex-1 overflow-y-auto py-2 drawer-scroll">
                <div className="space-y-1 px-2">
                  {menuItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = currentScreen === item.id;
                    
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + index * 0.05 }}
                      >
                        <Button
                          variant={isActive ? "secondary" : "ghost"}
                          className={`w-full justify-start h-12 px-3 rounded-xl transition-all duration-200 ${
                            isActive 
                              ? 'abhyvasa-gradient-soft text-primary border border-primary/30 shadow-sm' 
                              : 'hover:bg-muted/50'
                          }`}
                          onClick={() => handleItemClick(item.id)}
                        >
                          <div className="flex items-center gap-3 flex-1">
                            <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${
                              isActive 
                                ? 'bg-primary/20 text-primary' 
                                : 'bg-muted text-muted-foreground'
                            }`}>
                              <Icon className="h-4 w-4" />
                            </div>
                            <span className="font-medium truncate">{item.label}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {item.badge && (
                              <Badge 
                                variant="destructive" 
                                className="h-5 px-2 text-xs font-semibold rounded-full"
                              >
                                {item.badge}
                              </Badge>
                            )}
                            <ChevronRight className={`h-4 w-4 transition-transform ${
                              isActive ? 'text-primary' : 'text-muted-foreground'
                            }`} />
                          </div>
                        </Button>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Footer with Logout */}
              <motion.div 
                className="p-4 border-t border-border bg-muted/30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Button
                  variant="outline"
                  className="w-full h-12 text-destructive border-destructive/20 hover:bg-destructive/10 rounded-xl"
                  onClick={() => {
                    onLogout();
                    onClose();
                  }}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </motion.div>

              {/* Drag Handle */}
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-full">
                <div className="drawer-handle h-16 w-1 rounded-r-full" />
              </div>

              {/* Swipe Hint */}
              <SwipeHint show={showSwipeHint} onDismiss={handleDismissHint} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}