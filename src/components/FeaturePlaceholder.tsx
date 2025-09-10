import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Construction, 
  Users, 
  GraduationCap, 
  BookOpen, 
  CreditCard, 
  FileText, 
  Award, 
  UserCheck, 
  MessageSquare, 
  Calendar, 
  Bell, 
  TrendingUp 
} from 'lucide-react';

interface FeaturePlaceholderProps {
  featureType: string;
  userRole: string;
  onNavigate: (screen: string) => void;
}

const featureConfig = {
  students: {
    title: 'Student Management',
    description: 'Manage student enrollment, profiles, and academic records',
    icon: Users,
    features: ['Add/Edit Students', 'Enrollment Management', 'Academic Records', 'Student Profiles', 'Bulk Operations']
  },
  teachers: {
    title: 'Teacher Management',
    description: 'Manage teaching staff, assignments, and performance',
    icon: GraduationCap,
    features: ['Teacher Profiles', 'Subject Assignment', 'Performance Reviews', 'Training Records', 'Attendance Tracking']
  },
  classes: {
    title: 'Class Management',
    description: 'Organize classes, schedules, and academic structure',
    icon: BookOpen,
    features: ['Class Creation', 'Timetable Management', 'Subject Allocation', 'Student Assignment', 'Classroom Resources']
  },
  fees: {
    title: 'Fee Management',
    description: 'Handle fee collection, payments, and financial tracking',
    icon: CreditCard,
    features: ['Fee Structure', 'Payment Tracking', 'Invoicing', 'Payment Reminders', 'Financial Reports']
  },
  assignments: {
    title: 'Assignment Center',
    description: 'Create, distribute, and grade assignments',
    icon: FileText,
    features: ['Assignment Creation', 'Distribution', 'Submission Tracking', 'Auto-Grading', 'Feedback System']
  },
  gradebook: {
    title: 'Gradebook',
    description: 'Record and manage student grades and assessments',
    icon: Award,
    features: ['Grade Entry', 'Assessment Tracking', 'Progress Reports', 'Grade Analytics', 'Parent Communication']
  },
  attendance: {
    title: 'Attendance Management',
    description: 'Track and manage student and staff attendance',
    icon: UserCheck,
    features: ['Daily Attendance', 'Absence Tracking', 'Attendance Reports', 'Parent Notifications', 'Attendance Trends']
  },
  messages: {
    title: 'Communication Hub',
    description: 'Messaging and communication platform',
    icon: MessageSquare,
    features: ['Direct Messages', 'Group Communications', 'Announcements', 'Parent-Teacher Chat', 'Email Integration']
  },
  calendar: {
    title: 'Academic Calendar',
    description: 'Manage events, schedules, and important dates',
    icon: Calendar,
    features: ['Event Scheduling', 'Exam Timetables', 'Holiday Calendar', 'Meeting Scheduling', 'Reminders']
  },
  schedule: {
    title: 'Class Schedule',
    description: 'View and manage class timetables',
    icon: Calendar,
    features: ['Daily Schedule', 'Weekly View', 'Subject Timetable', 'Room Allocation', 'Schedule Conflicts']
  },
  grades: {
    title: 'Grade Portal',
    description: 'View grades, transcripts, and academic progress',
    icon: Award,
    features: ['Grade Viewing', 'Progress Tracking', 'Transcript Generation', 'Performance Analytics', 'Goal Setting']
  },
  library: {
    title: 'Library System',
    description: 'Digital library and resource management',
    icon: BookOpen,
    features: ['Book Catalog', 'Digital Resources', 'Issue/Return', 'Reading Lists', 'Research Tools']
  },
  announcements: {
    title: 'Announcements',
    description: 'School-wide notifications and updates',
    icon: Bell,
    features: ['School News', 'Event Updates', 'Policy Changes', 'Emergency Alerts', 'Category Filters']
  },
  children: {
    title: 'My Children',
    description: 'Monitor and manage your children\'s education',
    icon: Users,
    features: ['Child Profiles', 'Academic Overview', 'Quick Actions', 'Progress Summary', 'Communication Links']
  },
  academic: {
    title: 'Academic Progress',
    description: 'Detailed academic performance and analytics',
    icon: TrendingUp,
    features: ['Performance Analytics', 'Grade Trends', 'Subject Analysis', 'Comparison Reports', 'Improvement Plans']
  },
  communication: {
    title: 'Parent Communication',
    description: 'Connect with teachers and school administration',
    icon: MessageSquare,
    features: ['Teacher Messages', 'Meeting Requests', 'School Updates', 'Event Participation', 'Feedback System']
  },
  events: {
    title: 'School Events',
    description: 'School activities, events, and participation',
    icon: Calendar,
    features: ['Event Calendar', 'Registration', 'Participation Tracking', 'Photo Gallery', 'Event Feedback']
  }
};

export function FeaturePlaceholder({ featureType, userRole, onNavigate }: FeaturePlaceholderProps) {
  const config = featureConfig[featureType as keyof typeof featureConfig];
  
  if (!config) {
    return (
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Feature Not Found</CardTitle>
            <CardDescription>The requested feature is not available.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => onNavigate('dashboard')}>
              Return to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const Icon = config.icon;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary rounded-lg">
            <Icon className="h-8 w-8 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{config.title}</h1>
            <p className="text-muted-foreground">{config.description}</p>
          </div>
        </div>
        <Badge variant="outline" className="text-sm">
          {userRole.replace('_', ' ').toUpperCase()}
        </Badge>
      </div>

      <Card className="border-dashed border-2">
        <CardHeader className="text-center">
          <div className="mx-auto bg-muted rounded-full p-4 w-16 h-16 flex items-center justify-center mb-4">
            <Construction className="h-8 w-8 text-muted-foreground" />
          </div>
          <CardTitle>Feature In Development</CardTitle>
          <CardDescription>
            This {config.title.toLowerCase()} feature is currently being developed and will be available soon.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold mb-3">Planned Features:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {config.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <Button onClick={() => onNavigate('dashboard')}>
              Return to Dashboard
            </Button>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Refresh Page
            </Button>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>
              This is a demo application showcasing the comprehensive education management system.
              In a full implementation, this would be a fully functional {config.title.toLowerCase()} module.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions Card */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common actions for {config.title.toLowerCase()}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {config.features.slice(0, 4).map((feature, index) => (
              <Button key={index} variant="outline" className="h-auto p-4 flex flex-col items-center">
                <Icon className="h-5 w-5 mb-2" />
                <span className="text-xs text-center">{feature}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}