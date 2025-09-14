import React, { useState, useEffect } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { Dashboard } from './components/Dashboard';
import { InstitutionAdminDashboard } from './components/InstitutionAdminDashboard';
import { TeacherDashboard } from './components/TeacherDashboard';
import { StudentDashboard } from './components/StudentDashboard';
import { ParentDashboard } from './components/ParentDashboard';
import { MasterDataManagement } from './components/MasterDataManagement';
import { InstituteRequests } from './components/InstituteRequests';
import { InstituteProfile } from './components/InstituteProfile';
import { TotalInstitutes } from './components/TotalInstitutes';
import { Notifications } from './components/Notifications';
import { InstituteOnboarding } from './components/InstituteOnboarding';
import { OnboardingLanding } from './components/OnboardingLanding';
import { StudentsManagement } from './components/StudentsManagement';
import { TeachersManagement } from './components/TeachersManagement';
import { ClassesManagement } from './components/ClassesManagement';
import { StudentSchedule } from './components/StudentSchedule';
import { AssignmentsManagement } from './components/AssignmentsManagement';
import { ChildrenOverview } from './components/ChildrenOverview';
import { Reports } from './components/Reports';
import { Settings } from './components/Settings';
import { TeacherLeaveApplication } from './components/TeacherLeaveApplication';
import { TeacherGradebook } from './components/TeacherGradebook';
import { TeacherAttendance } from './components/TeacherAttendance';
import { StudentCertificates } from './components/StudentCertificates';
import { Messages } from './components/Messages';
import { TeacherProfile } from './components/TeacherProfile';
import { SuperAdminProfile } from './components/SuperAdminProfile';
import { InstitutionAdminProfile } from './components/InstitutionAdminProfile';
import { StudentProfile } from './components/StudentProfile';
import { ParentProfile } from './components/ParentProfile';
import { RoleBasedSidebar } from './components/RoleBasedSidebar';
import { UnifiedHeader } from './components/UnifiedHeader';
import { FeaturePlaceholder } from './components/FeaturePlaceholder';
import { RoleBasedNotifications } from './components/RoleBasedNotifications';
import { ParentAcademicReports } from './components/ParentAcademicReports';
import { ParentCommunications } from './components/ParentCommunications';
import { ParentSchoolEvents } from './components/ParentSchoolEvents';
import { ParentChildCertificates } from './components/ParentChildCertificates';
import { StudentAssignments } from './components/StudentAssignments';
import { StudentGrades } from './components/StudentGrades';
import { StudentLibrary } from './components/StudentLibrary';
import { StudentAnnouncements } from './components/StudentAnnouncements';
import { StudentInstitutionProfile } from './components/StudentInstitutionProfile';
import { TeacherCalendar } from './components/TeacherCalendar';
import { TeacherScheduleSummary } from './components/TeacherScheduleSummary';
import { TeacherOnboarding } from './components/TeacherOnboarding';
import { StudentOnboarding } from './components/StudentOnboarding';
import { ResponsiveLayout } from './components/ResponsiveLayout';
import { ModernResponsiveLayout } from './components/ModernResponsiveLayout';
import { MobileStudentDashboard } from './components/MobileStudentDashboard';
import { MobileParentDashboard } from './components/MobileParentDashboard';
import { MobileStudentAssignments } from './components/MobileStudentAssignments';

export type UserRole = 'super_admin' | 'institution_admin' | 'teacher' | 'student' | 'parent';
export type Screen = 'login' | 'dashboard' | 'master-data' | 'requests' | 'profile' | 'reports' | 'settings' | 
             'total-institutes' | 'notifications' | 'onboarding' | 'onboarding-landing' | 'teacher-onboarding' | 'student-onboarding' | 'students' | 'teachers' | 'classes' | 'assignments' | 'gradebook' | 'attendance' | 
             'messages' | 'calendar' | 'schedule' | 'schedule-summary' | 'grades' | 'library' | 'announcements' | 'children' | 
             'academic' | 'communication' | 'events' | 'child-certificates' | 'leave-application' | 'certificates' | 
             'super-admin-profile' | 'institution-admin-profile' | 'teacher-profile' | 'student-profile' | 'parent-profile' | 'institution-profile';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [selectedInstitute, setSelectedInstitute] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('super_admin');
  const [userData, setUserData] = useState<any>(null);
  // Start with collapsed sidebar on mobile (screen width < 768px)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  const navigateToScreen = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleLogin = (role: UserRole, data: any) => {
    setUserRole(role);
    setUserData(data);
    setIsAuthenticated(true);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole('super_admin');
    setUserData(null);
    setCurrentScreen('login');
    setIsSidebarCollapsed(false);
  };

  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed(prev => !prev);
  };

  // Handle responsive sidebar behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarCollapsed(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleViewInstitute = (institute: any) => {
    setSelectedInstitute(institute);
    setCurrentScreen('profile');
  };

  if (!isAuthenticated) {
    // Handle public screens that don't require authentication
    switch (currentScreen) {
      case 'onboarding':
        return <InstituteOnboarding onNavigate={navigateToScreen} />;
      case 'onboarding-landing':
        return <OnboardingLanding 
          onStartOnboarding={() => navigateToScreen('onboarding')} 
          onNavigate={navigateToScreen} 
        />;
      case 'teacher-onboarding':
        return <TeacherOnboarding onNavigate={navigateToScreen} />;
      case 'student-onboarding':
        return <StudentOnboarding onNavigate={navigateToScreen} />;
      default:
        return <LoginScreen onLogin={handleLogin} onNavigate={navigateToScreen} />;
    }
  }

  const renderDashboard = () => {
    switch (userRole) {
      case 'super_admin':
        return <Dashboard onNavigate={navigateToScreen} />;
      case 'institution_admin':
        return <InstitutionAdminDashboard onNavigate={navigateToScreen} />;
      case 'teacher':
        return <TeacherDashboard onNavigate={navigateToScreen} />;
      case 'student':
        return (
          <>
            <div className="block md:hidden">
              <MobileStudentDashboard onNavigate={navigateToScreen} />
            </div>
            <div className="hidden md:block">
              <StudentDashboard onNavigate={navigateToScreen} />
            </div>
          </>
        );
      case 'parent':
        return (
          <>
            <div className="block md:hidden">
              <MobileParentDashboard onNavigate={navigateToScreen} />
            </div>
            <div className="hidden md:block">
              <ParentDashboard onNavigate={navigateToScreen} />
            </div>
          </>
        );
      default:
        return <Dashboard onNavigate={navigateToScreen} />;
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return renderDashboard();
      case 'master-data':
        return userRole === 'super_admin' ? 
          <MasterDataManagement onNavigate={navigateToScreen} /> : 
          renderDashboard();
      case 'requests':
        return userRole === 'super_admin' ? 
          <InstituteRequests onNavigate={navigateToScreen} onViewInstitute={handleViewInstitute} /> : 
          renderDashboard();
      case 'profile':
        return userRole === 'super_admin' ? 
          <InstituteProfile institute={selectedInstitute} onNavigate={navigateToScreen} /> : 
          renderDashboard();
      case 'institution-profile':
        return userRole === 'student' ? 
          <StudentInstitutionProfile onNavigate={navigateToScreen} /> : 
          renderDashboard();
      case 'super-admin-profile':
        return userRole === 'super_admin' ? 
          <SuperAdminProfile onNavigate={navigateToScreen} /> : 
          renderDashboard();
      case 'institution-admin-profile':
        return userRole === 'institution_admin' ? 
          <InstitutionAdminProfile onNavigate={navigateToScreen} /> : 
          renderDashboard();
      case 'teacher-profile':
        return userRole === 'teacher' ? 
          <TeacherProfile onNavigate={navigateToScreen} /> : 
          renderDashboard();
      case 'student-profile':
        return userRole === 'student' ? 
          <StudentProfile onNavigate={navigateToScreen} /> : 
          renderDashboard();
      case 'parent-profile':
        return userRole === 'parent' ? 
          <ParentProfile onNavigate={navigateToScreen} /> : 
          renderDashboard();
      case 'total-institutes':
        return userRole === 'super_admin' ? 
          <TotalInstitutes onNavigate={navigateToScreen} onViewInstitute={handleViewInstitute} /> : 
          renderDashboard();
      case 'notifications':
        return <RoleBasedNotifications onNavigate={navigateToScreen} userRole={userRole} />;
      case 'onboarding':
        return <InstituteOnboarding onNavigate={navigateToScreen} />;
      case 'onboarding-landing':
        return <OnboardingLanding 
          onStartOnboarding={() => navigateToScreen('onboarding')} 
          onNavigate={navigateToScreen} 
        />;
      case 'teacher-onboarding':
        return <TeacherOnboarding onNavigate={navigateToScreen} />;
      case 'student-onboarding':
        return <StudentOnboarding onNavigate={navigateToScreen} />;
      case 'reports':
        return <Reports onNavigate={navigateToScreen} />;
      case 'settings':
        return <Settings onLogout={handleLogout} onNavigate={navigateToScreen} />;
      // Role-specific screens
      case 'students':
        return userRole === 'institution_admin' ? 
          <StudentsManagement onNavigate={navigateToScreen} /> : 
          <FeaturePlaceholder featureType={currentScreen} userRole={userRole} onNavigate={navigateToScreen} />;
      case 'teachers':
        return userRole === 'institution_admin' ? 
          <TeachersManagement onNavigate={navigateToScreen} /> : 
          <FeaturePlaceholder featureType={currentScreen} userRole={userRole} onNavigate={navigateToScreen} />;
      case 'classes':
        return (userRole === 'institution_admin' || userRole === 'teacher') ? 
          <ClassesManagement onNavigate={navigateToScreen} /> : 
          <FeaturePlaceholder featureType={currentScreen} userRole={userRole} onNavigate={navigateToScreen} />;
      case 'schedule':
        return userRole === 'student' ? 
          <StudentSchedule onNavigate={navigateToScreen} /> : 
          <FeaturePlaceholder featureType={currentScreen} userRole={userRole} onNavigate={navigateToScreen} />;
      case 'assignments':
        return userRole === 'teacher' ? 
          <AssignmentsManagement onNavigate={navigateToScreen} /> : 
          userRole === 'student' ? (
            <>
              <div className="block md:hidden">
                <MobileStudentAssignments onNavigate={navigateToScreen} />
              </div>
              <div className="hidden md:block">
                <StudentAssignments onNavigate={navigateToScreen} />
              </div>
            </>
          ) :
          <FeaturePlaceholder featureType={currentScreen} userRole={userRole} onNavigate={navigateToScreen} />;
      case 'children':
        return userRole === 'parent' ? 
          <ChildrenOverview onNavigate={navigateToScreen} /> : 
          <FeaturePlaceholder featureType={currentScreen} userRole={userRole} onNavigate={navigateToScreen} />;
      case 'leave-application':
        return userRole === 'teacher' ? 
          <TeacherLeaveApplication onNavigate={navigateToScreen} /> : 
          <FeaturePlaceholder featureType={currentScreen} userRole={userRole} onNavigate={navigateToScreen} />;
      case 'gradebook':
        return userRole === 'teacher' ? 
          <TeacherGradebook onNavigate={navigateToScreen} /> : 
          <FeaturePlaceholder featureType={currentScreen} userRole={userRole} onNavigate={navigateToScreen} />;
      case 'attendance':
        return userRole === 'teacher' ? 
          <TeacherAttendance onNavigate={navigateToScreen} /> : 
          <FeaturePlaceholder featureType={currentScreen} userRole={userRole} onNavigate={navigateToScreen} />;
      case 'certificates':
        return userRole === 'student' ? 
          <StudentCertificates onNavigate={navigateToScreen} /> : 
          <FeaturePlaceholder featureType={currentScreen} userRole={userRole} onNavigate={navigateToScreen} />;
      case 'messages':
        return <Messages onNavigate={navigateToScreen} />;
      case 'academic':
        return userRole === 'parent' ? 
          <ParentAcademicReports onNavigate={navigateToScreen} /> : 
          <FeaturePlaceholder featureType={currentScreen} userRole={userRole} onNavigate={navigateToScreen} />;
      case 'communication':
        return userRole === 'parent' ? 
          <ParentCommunications onNavigate={navigateToScreen} /> : 
          <FeaturePlaceholder featureType={currentScreen} userRole={userRole} onNavigate={navigateToScreen} />;
      case 'events':
        return userRole === 'parent' ? 
          <ParentSchoolEvents onNavigate={navigateToScreen} /> : 
          <FeaturePlaceholder featureType={currentScreen} userRole={userRole} onNavigate={navigateToScreen} />;
      case 'child-certificates':
        return userRole === 'parent' ? 
          <ParentChildCertificates onNavigate={navigateToScreen} /> : 
          <FeaturePlaceholder featureType={currentScreen} userRole={userRole} onNavigate={navigateToScreen} />;
      case 'grades':
        return userRole === 'student' ? 
          <StudentGrades onNavigate={navigateToScreen} /> : 
          <FeaturePlaceholder featureType={currentScreen} userRole={userRole} onNavigate={navigateToScreen} />;
      case 'library':
        return userRole === 'student' ? 
          <StudentLibrary onNavigate={navigateToScreen} /> : 
          <FeaturePlaceholder featureType={currentScreen} userRole={userRole} onNavigate={navigateToScreen} />;
      case 'announcements':
        return userRole === 'student' ? 
          <StudentAnnouncements onNavigate={navigateToScreen} /> : 
          <FeaturePlaceholder featureType={currentScreen} userRole={userRole} onNavigate={navigateToScreen} />;
      case 'calendar':
        return userRole === 'teacher' ? 
          <TeacherCalendar onNavigate={navigateToScreen} /> : 
          <FeaturePlaceholder featureType={currentScreen} userRole={userRole} onNavigate={navigateToScreen} />;
      case 'schedule-summary':
        return userRole === 'teacher' ? 
          <TeacherScheduleSummary onNavigate={navigateToScreen} /> : 
          <FeaturePlaceholder featureType={currentScreen} userRole={userRole} onNavigate={navigateToScreen} />;
      default:
        return renderDashboard();
    }
  };

  const getInstitutionName = () => {
    switch (userRole) {
      case 'super_admin':
        return 'Abhyasa';
      case 'institution_admin':
        return 'Modern Public School';
      case 'teacher':
        return 'Modern Public School';
      case 'student':
        return 'Modern Public School';
      case 'parent':
        return 'Modern Public School';
      default:
        return 'Abhyasa';
    }
  };

  return (
    <ModernResponsiveLayout
      userRole={userRole}
      currentScreen={currentScreen}
      userData={userData}
      isSidebarCollapsed={isSidebarCollapsed}
      onNavigate={navigateToScreen}
      onLogout={handleLogout}
      onToggleCollapse={toggleSidebarCollapse}
    >
      {renderScreen()}
    </ModernResponsiveLayout>
  );
}