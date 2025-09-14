import React from 'react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { Bell, Building2 } from 'lucide-react';

interface ModernMobileHeaderProps {
  userRole: 'student' | 'parent';
  userName: string;
  userEmail: string;
  institutionName: string;
  onNavigate: (screen: import("../App").Screen) => void;
  onOpenDrawer: () => void;
}

export function ModernMobileHeader({ 
  userRole, 
  userName, 
  userEmail, 
  institutionName,
  onNavigate,
  onOpenDrawer
}: ModernMobileHeaderProps) {
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

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'student':
        return 'bg-teal-100 text-teal-800';
      case 'parent':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.header 
      className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="flex h-16 items-center justify-between px-4">
        {/* Left side - Logo and Institution */}
        <motion.div 
          className="flex items-center gap-3 min-w-0 flex-1"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <motion.div 
            className="h-10 w-10 rounded-xl abhyvasa-gradient flex items-center justify-center shadow-lg flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Building2 className="h-5 w-5 text-white" />
          </motion.div>
          <div className="min-w-0">
            <h1 className="text-lg font-semibold text-foreground truncate leading-tight">
              {institutionName}
            </h1>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className={`text-xs px-2 py-0.5 ${getRoleColor(userRole)}`}>
                {getRoleDisplayName(userRole)}
              </Badge>
            </div>
          </div>
        </motion.div>

        {/* Right side - Notifications and Profile */}
        <motion.div 
          className="flex items-center gap-2"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {/* Notifications */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              variant="ghost" 
              size="sm" 
              className="relative h-10 w-10 p-0 rounded-xl hover:bg-muted/50"
              onClick={() => onNavigate('announcements')}
            >
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1"
                >
                  <Badge 
                    variant="destructive" 
                    className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs font-semibold shadow-md"
                  >
                    {notificationCount}
                  </Badge>
                </motion.div>
              )}
            </Button>
          </motion.div>

          {/* Profile Avatar Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              variant="ghost" 
              className="h-10 w-10 p-0 rounded-xl" 
              onClick={onOpenDrawer}
            >
              <Avatar className="h-8 w-8 ring-2 ring-primary/20">
                <AvatarFallback className="text-xs font-semibold abhyvasa-gradient-soft">
                  {userName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.header>
  );
}