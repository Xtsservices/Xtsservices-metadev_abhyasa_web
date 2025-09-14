import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { 
  User,
  BookOpen,
  Calendar,
  Award,
  TrendingUp,
  TrendingDown,
  Clock,
  Users,
  Phone,
  Mail,
  MapPin,
  Bell,
  FileText,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

interface ChildrenOverviewProps {
  onNavigate: (screen: import("../App").Screen) => void;
}

interface Child {
  id: string;
  name: string;
  avatar?: string;
  class: string;
  section: string;
  rollNumber: string;
  school: string;
  classTeacher: string;
  dateOfBirth: string;
  bloodGroup: string;
  attendance: {
    percentage: number;
    present: number;
    absent: number;
    total: number;
  };
  grades: {
    overall: string;
    subjects: {
      name: string;
      grade: string;
      marks: number;
      outOf: number;
    }[];
  };
  upcomingEvents: {
    title: string;
    date: string;
    type: 'exam' | 'assignment' | 'event' | 'meeting';
  }[];
  recentActivity: {
    title: string;
    description: string;
    date: string;
    type: 'achievement' | 'concern' | 'info';
  }[];

}

export function ChildrenOverview({ onNavigate }: ChildrenOverviewProps) {
  const [children] = useState<Child[]>([
    {
      id: '1',
      name: 'Sarah Wilson',
      class: '10',
      section: 'A',
      rollNumber: '2024001',
      school: 'Greenwood High School',
      classTeacher: 'Dr. Priya Sharma',
      dateOfBirth: '2009-05-15',
      bloodGroup: 'B+',
      attendance: {
        percentage: 95,
        present: 171,
        absent: 9,
        total: 180
      },
      grades: {
        overall: 'A+',
        subjects: [
          { name: 'Mathematics', grade: 'A+', marks: 94, outOf: 100 },
          { name: 'Physics', grade: 'A', marks: 88, outOf: 100 },
          { name: 'Chemistry', grade: 'A+', marks: 92, outOf: 100 },
          { name: 'Biology', grade: 'A', marks: 89, outOf: 100 },
          { name: 'English', grade: 'A+', marks: 96, outOf: 100 }
        ]
      },
      upcomingEvents: [
        { title: 'Mathematics Test', date: '2024-09-08', type: 'exam' },
        { title: 'Science Project Submission', date: '2024-09-10', type: 'assignment' },
        { title: 'Parent-Teacher Meeting', date: '2024-09-12', type: 'meeting' },
        { title: 'Annual Sports Day', date: '2024-09-15', type: 'event' }
      ],
      recentActivity: [
        {
          title: 'Excellent Performance',
          description: 'Scored 94% in Mathematics Unit Test',
          date: '2024-09-02',
          type: 'achievement'
        },
        {
          title: 'Science Fair Winner',
          description: 'Won 1st place in school science fair with renewable energy project',
          date: '2024-08-28',
          type: 'achievement'
        },
        {
          title: 'Assignment Reminder',
          description: 'Physics lab report due tomorrow',
          date: '2024-09-03',
          type: 'info'
        }
      ]
    },
    {
      id: '2',
      name: 'Mike Wilson',
      class: '8',
      section: 'B',
      rollNumber: '2024045',
      school: 'Greenwood High School',
      classTeacher: 'Sneha Patel',
      dateOfBirth: '2011-08-22',
      bloodGroup: 'O+',
      attendance: {
        percentage: 88,
        present: 158,
        absent: 22,
        total: 180
      },
      grades: {
        overall: 'B+',
        subjects: [
          { name: 'Mathematics', grade: 'B', marks: 78, outOf: 100 },
          { name: 'Science', grade: 'B+', marks: 82, outOf: 100 },
          { name: 'English', grade: 'A', marks: 87, outOf: 100 },
          { name: 'Social Studies', grade: 'B+', marks: 80, outOf: 100 },
          { name: 'Computer Science', grade: 'A', marks: 90, outOf: 100 }
        ]
      },
      upcomingEvents: [
        { title: 'English Quiz', date: '2024-09-07', type: 'exam' },
        { title: 'Art Competition', date: '2024-09-09', type: 'event' },
        { title: 'Math Assignment Due', date: '2024-09-11', type: 'assignment' }
      ],
      recentActivity: [
        {
          title: 'Improved Attendance',
          description: 'Great improvement in regular attendance this month',
          date: '2024-09-01',
          type: 'achievement'
        },
        {
          title: 'Computer Programming Skills',
          description: 'Excellent work in coding assignment - Python basics',
          date: '2024-08-30',
          type: 'achievement'
        },
        {
          title: 'Attendance Concern',
          description: 'Missed 3 classes this week due to illness',
          date: '2024-08-26',
          type: 'concern'
        }
      ]
    }
  ]);

  const getGradeColor = (grade: string) => {
    if (grade.includes('A')) return 'text-green-600';
    if (grade.includes('B')) return 'text-blue-600';
    if (grade.includes('C')) return 'text-orange-600';
    return 'text-red-600';
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'exam':
        return <FileText className="h-4 w-4 text-red-500" />;
      case 'assignment':
        return <BookOpen className="h-4 w-4 text-blue-500" />;
      case 'meeting':
        return <Users className="h-4 w-4 text-purple-500" />;
      case 'event':
        return <Calendar className="h-4 w-4 text-green-500" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'achievement':
        return <Award className="h-4 w-4 text-green-500" />;
      case 'concern':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'info':
        return <Bell className="h-4 w-4 text-blue-500" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Children</h1>
          <p className="text-muted-foreground">Monitor your children's academic progress and school activities</p>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Children</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{children.length}</div>
            <p className="text-xs text-muted-foreground">Enrolled students</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Attendance</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(children.reduce((acc, child) => acc + child.attendance.percentage, 0) / children.length)}%
            </div>
            <p className="text-xs text-muted-foreground">Across all children</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Performance</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {children.filter(child => child.grades.overall.includes('A')).length}/{children.length}
            </div>
            <p className="text-xs text-muted-foreground">Children with A grades</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {children.reduce((acc, child) => acc + child.upcomingEvents.length, 0)}
            </div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
      </div>

      {/* Children Tabs */}
      <Tabs defaultValue={children[0]?.id} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          {children.map((child) => (
            <TabsTrigger key={child.id} value={child.id} className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={child.avatar} />
                <AvatarFallback>{child.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              {child.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {children.map((child) => (
          <TabsContent key={child.id} value={child.id} className="space-y-6">
            {/* Child Overview */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={child.avatar} />
                    <AvatarFallback className="text-lg">
                      {child.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-2xl">{child.name}</CardTitle>
                    <CardDescription>
                      Class {child.class}{child.section} • Roll No: {child.rollNumber} • {child.school}
                    </CardDescription>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span>Class Teacher: {child.classTeacher}</span>
                      <span>DOB: {new Date(child.dateOfBirth).toLocaleDateString()}</span>
                      <span>Blood Group: {child.bloodGroup}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Academic Performance */}
              <div className="lg:col-span-2 space-y-6">
                {/* Attendance */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Attendance Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold">{child.attendance.percentage}%</div>
                        <p className="text-sm text-muted-foreground">Overall Attendance</p>
                      </div>
                      <div className={`flex items-center gap-2 ${
                        child.attendance.percentage >= 90 ? 'text-green-600' : 
                        child.attendance.percentage >= 75 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {child.attendance.percentage >= 90 ? 
                          <TrendingUp className="h-4 w-4" /> : 
                          <TrendingDown className="h-4 w-4" />
                        }
                        <span className="font-medium">
                          {child.attendance.percentage >= 90 ? 'Excellent' : 
                           child.attendance.percentage >= 75 ? 'Good' : 'Needs Improvement'}
                        </span>
                      </div>
                    </div>
                    <Progress value={child.attendance.percentage} className="w-full" />
                    <div className="flex justify-between text-sm">
                      <span>Present: {child.attendance.present}</span>
                      <span>Absent: {child.attendance.absent}</span>
                      <span>Total: {child.attendance.total}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Grades */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Academic Performance
                    </CardTitle>
                    <CardDescription>
                      Overall Grade: <span className={`font-bold ${getGradeColor(child.grades.overall)}`}>
                        {child.grades.overall}
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {child.grades.subjects.map((subject, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <div className="flex items-center gap-3">
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{subject.name}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-muted-foreground">
                              {subject.marks}/{subject.outOf}
                            </span>
                            <Badge className={`${getGradeColor(subject.grade)} bg-transparent border`}>
                              {subject.grade}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Upcoming Events */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Upcoming Events
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {child.upcomingEvents.map((event, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                        {getEventTypeIcon(event.type)}
                        <div className="flex-1">
                          <p className="text-sm font-medium">{event.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(event.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Academic Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Academic Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Overall Grade:</span>
                        <span className={`font-bold ${getGradeColor(child.grades.overall)}`}>
                          {child.grades.overall}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Attendance:</span>
                        <span className={`font-bold ${child.attendance.percentage >= 90 ? 'text-green-600' : 'text-yellow-600'}`}>
                          {child.attendance.percentage}%
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Total Subjects:</span>
                        <span className="font-bold">{child.grades.subjects.length}</span>
                      </div>
                    </div>
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <span className="font-medium">Strongest Subject:</span> {
                          child.grades.subjects.reduce((prev, current) => 
                            (prev.marks > current.marks) ? prev : current
                          ).name
                        }
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {child.recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                        {getActivityIcon(activity.type)}
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.title}</p>
                          <p className="text-xs text-muted-foreground mb-1">
                            {activity.description}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(activity.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}