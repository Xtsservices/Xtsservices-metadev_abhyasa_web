import React from 'react';
import { UnifiedHeader } from './UnifiedHeader';
import { RoleBasedSidebar } from './RoleBasedSidebar';
import { MobileHeader } from './MobileHeader';
import { MobileBottomNavigation } from './MobileBottomNavigation';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  userRole: 'student' | 'parent' | 'super_admin' | 'institution_admin' | 'teacher';
  currentScreen: string;
  userData: any;
  isSidebarCollapsed: boolean;
  onNavigate: (screen: string) => void;
  onLogout: () => void;
  onToggleCollapse: () => void;
}

export function ResponsiveLayout({
  children,
  userRole,
  currentScreen,
  userData,
  isSidebarCollapsed,
  onNavigate,
  onLogout,
  onToggleCollapse
}: ResponsiveLayoutProps) {
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
          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </div>
      </div>

      {/* Mobile Layout - Only for Student and Parent */}
      {isMobileRole && (
        <div className="flex md:hidden h-screen flex-col">
          <MobileHeader
            userRole={userRole}
            userName={userData?.name || 'User'}
            userEmail={userData?.email || 'user@email.com'}
            institutionName={getInstitutionName()}
            onNavigate={onNavigate}
            onLogout={onLogout}
          />
          
          <div className="flex-1 overflow-auto pb-20">
            {children}
          </div>
          
          <MobileBottomNavigation
            userRole={userRole}
            currentScreen={currentScreen}
            onNavigate={onNavigate}
          />
        </div>
      )}

      {/* Fallback for non-mobile roles on small screens */}
      {!isMobileRole && (
        <div className="flex md:hidden h-screen items-center justify-center p-4">
          <div className="text-center">
            <h2 className="text-lg font-semibold mb-2">Desktop Required</h2>
            <p className="text-muted-foreground">
              This role requires a desktop or tablet device with a larger screen.
            </p>
          </div>
        </div>
      )}
    </>
  );
}