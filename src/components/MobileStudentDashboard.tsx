import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback } from './ui/avatar';
import { 
  BookOpen, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
  Calendar,
  Award,
  ChevronRight,
  Bell
} from 'lucide-react';

interface MobileStudentDashboardProps {
  onNavigate: (screen: import("../App").Screen) => void;
}

export function MobileStudentDashboard({ onNavigate }: MobileStudentDashboardProps) {
  const upcomingAssignments = [
    {
      id: 1,
      title: 'Mathematics Quiz',
      subject: 'Mathematics',
      dueDate: 'Tomorrow',
      priority: 'high'
    },
    {
      id: 2,
      title: 'History Essay',
      subject: 'History',
      dueDate: 'Dec 28',
      priority: 'medium'
    }
  ];

  const recentGrades = [
    { subject: 'Mathematics', grade: 'A', score: 92 },
    { subject: 'Science', grade: 'B+', score: 87 },
    { subject: 'English', grade: 'A-', score: 89 }
  ];

  const todaySchedule = [
    { time: '09:00', subject: 'Mathematics', room: 'Room 101' },
    { time: '10:30', subject: 'Science', room: 'Lab 2' },
    { time: '13:00', subject: 'History', room: 'Room 205' }
  ];

  return (
    <div className="p-4 space-y-4">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 rounded-lg">
        <h1 className="text-xl font-semibold mb-1">Good morning, Alex!</h1>
        <p className="text-muted-foreground">You have 2 assignments due this week</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">85%</p>
              <p className="text-sm text-muted-foreground">Attendance</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">88.5</p>
              <p className="text-sm text-muted-foreground">Avg Grade</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Today's Schedule */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Today's Schedule</CardTitle>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onNavigate('schedule')}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {todaySchedule.map((item, index) => (
            <div key={index} className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
              <div className="text-sm font-medium text-primary min-w-12">
                {item.time}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{item.subject}</p>
                <p className="text-sm text-muted-foreground">{item.room}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Upcoming Assignments */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Upcoming Tasks</CardTitle>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onNavigate('assignments')}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {upcomingAssignments.map((assignment) => (
            <div key={assignment.id} className="flex items-center gap-3 p-3 border rounded-lg">
              <div className={`h-3 w-3 rounded-full ${
                assignment.priority === 'high' ? 'bg-red-400' : 'bg-yellow-400'
              }`} />
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{assignment.title}</p>
                <p className="text-sm text-muted-foreground">{assignment.subject}</p>
              </div>
              <div className="text-sm text-muted-foreground">
                {assignment.dueDate}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Grades */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Recent Grades</CardTitle>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onNavigate('grades')}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentGrades.map((grade, index) => (
            <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
              <div>
                <p className="font-medium">{grade.subject}</p>
                <p className="text-sm text-muted-foreground">{grade.score}%</p>
              </div>
              <Badge variant={grade.grade.startsWith('A') ? 'default' : 'secondary'}>
                {grade.grade}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button 
          variant="outline" 
          className="h-16 flex-col gap-2"
          onClick={() => onNavigate('library')}
        >
          <BookOpen className="h-5 w-5" />
          Library
        </Button>
        <Button 
          variant="outline" 
          className="h-16 flex-col gap-2"
          onClick={() => onNavigate('certificates')}
        >
          <Award className="h-5 w-5" />
          Certificates
        </Button>
      </div>
    </div>
  );
}