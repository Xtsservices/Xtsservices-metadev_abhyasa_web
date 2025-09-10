import React, { useState } from 'react';
import { UnifiedHeader } from './UnifiedHeader';
import { RoleBasedSidebar } from './RoleBasedSidebar';
import { ModernMobileHeader } from './ModernMobileHeader';
import { ModernMobileBottomNav } from './ModernMobileBottomNav';
import { MobileDrawer } from './MobileDrawer';
import { EdgeSwipeDetector } from './EdgeSwipeDetector';
import { StudentHomeScreen } from './modern-mobile/StudentHomeScreen';
import { ParentHomeScreen } from './modern-mobile/ParentHomeScreen';
import { SearchScreen } from './modern-mobile/SearchScreen';
import { ActivityScreen } from './modern-mobile/ActivityScreen';
import { ProfileScreen } from './modern-mobile/ProfileScreen';
import { motion, AnimatePresence } from 'motion/react';

interface ModernResponsiveLayoutProps {
  children: React.ReactNode;
  userRole: 'student' | 'parent' | 'super_admin' | 'institution_admin' | 'teacher';
  currentScreen: string;
  userData: any;
  isSidebarCollapsed: boolean;
  onNavigate: (screen: string) => void;
  onLogout: () => void;
  onToggleCollapse: () => void;
}

export function ModernResponsiveLayout({
  children,
  userRole,
  currentScreen,
  userData,
  isSidebarCollapsed,
  onNavigate,
  onLogout,
  onToggleCollapse
}: ModernResponsiveLayoutProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const getInstitutionName = () => {
    switch (userRole) {
      case 'super_admin':
        return 'Abhyasa System';
      case 'institution_admin':
      case 'teacher':
      case 'student':
      case 'parent':
        return 'Modern Public School';
      default:
        return 'Abhyasa System';
    }
  };

  // Mobile layout for student and parent only
  const isMobileRole = userRole === 'student' || userRole === 'parent';

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  // Mobile screen rendering logic
  const renderMobileScreen = () => {
    // Handle mobile-specific screens
    switch (currentScreen) {
      case 'dashboard':
        return userRole === 'student' ? 
          <StudentHomeScreen onNavigate={onNavigate} /> : 
          <ParentHomeScreen onNavigate={onNavigate} />;
      
      case 'search':
        return <SearchScreen userRole={userRole} onNavigate={onNavigate} />;
      
      case 'activity':
        return <ActivityScreen userRole={userRole} onNavigate={onNavigate} />;
      
      case 'student-profile':
      case 'parent-profile':
        return <ProfileScreen userRole={userRole} onNavigate={onNavigate} onLogout={onLogout} />;
      
      // For other screens, render the children (existing components)
      default:
        return children;
    }
  };

  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden md:flex h-screen flex-col">
        <UnifiedHeader
          userRole={userRole}
          userName={userData?.name || 'User'}
          userEmail={userData?.email || 'user@email.com'}
          institutionName={getInstitutionName()}
          onNavigate={onNavigate}
          onLogout={onLogout}
        />
        
        <div className="flex-1 flex overflow-hidden">
          <RoleBasedSidebar
            userRole={userRole}
            currentScreen={currentScreen}
            onNavigate={onNavigate}
            onLogout={onLogout}
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={onToggleCollapse}
          />
          <motion.div 
            className="flex-1 overflow-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </div>
      </div>

      {/* Mobile Layout - Only for Student and Parent */}
      {isMobileRole && (
        <div className="flex md:hidden h-screen flex-col bg-background">
          <ModernMobileHeader
            userRole={userRole}
            userName={userData?.name || 'User'}
            userEmail={userData?.email || 'user@email.com'}
            institutionName={getInstitutionName()}
            onNavigate={onNavigate}
            onOpenDrawer={handleOpenDrawer}
          />
          
          <motion.div 
            className="flex-1 overflow-auto"
            layout
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentScreen}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ 
                  duration: 0.2,
                  ease: "easeInOut"
                }}
                className="min-h-full"
              >
                {renderMobileScreen()}
              </motion.div>
            </AnimatePresence>
          </motion.div>
          
          <ModernMobileBottomNav
            userRole={userRole}
            currentScreen={currentScreen}
            onNavigate={onNavigate}
          />

          {/* Mobile Drawer */}
          <MobileDrawer
            isOpen={isDrawerOpen}
            onClose={handleCloseDrawer}
            userRole={userRole}
            userName={userData?.name || 'User'}
            userEmail={userData?.email || 'user@email.com'}
            institutionName={getInstitutionName()}
            currentScreen={currentScreen}
            onNavigate={onNavigate}
            onLogout={onLogout}
          />

          {/* Edge Swipe Detector */}
          <EdgeSwipeDetector 
            onSwipeFromLeft={handleOpenDrawer}
            isDrawerOpen={isDrawerOpen}
          />
        </div>
      )}

      {/* Fallback for non-mobile roles on small screens */}
      {!isMobileRole && (
        <div className="flex md:hidden h-screen items-center justify-center p-4 bg-background">
          <motion.div 
            className="text-center max-w-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4"
              animate={{ 
                rotate: [0, -5, 5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <svg 
                className="h-8 w-8 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                />
              </svg>
            </motion.div>
            <h2 className="text-xl font-semibold text-foreground mb-2">Desktop Required</h2>
            <p className="text-muted-foreground mb-4">
              This role requires a desktop or tablet device with a larger screen for the best experience.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button 
                onClick={onLogout}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
              >
                Switch Account
              </button>
            </motion.div>
          </motion.div>
        </div>
      )}
    </>
  );
}