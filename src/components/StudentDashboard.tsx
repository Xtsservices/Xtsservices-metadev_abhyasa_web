import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BookOpen, Calendar, Clock, Award, TrendingUp, AlertCircle, CheckCircle, Bell } from 'lucide-react';

interface StudentDashboardProps {
  onNavigate: (screen: import("../App").Screen) => void;
}

export function StudentDashboard({ onNavigate }: StudentDashboardProps) {
  const [todaySchedule] = useState([
    { id: 1, subject: 'Mathematics', teacher: 'Mr. Johnson', time: '9:00 AM - 10:00 AM', room: 'Room 101', status: 'completed' },
    { id: 2, subject: 'Physics', teacher: 'Dr. Smith', time: '10:15 AM - 11:15 AM', room: 'Lab 1', status: 'current' },
    { id: 3, subject: 'English Literature', teacher: 'Ms. Wilson', time: '11:30 AM - 12:30 PM', room: 'Room 203', status: 'upcoming' },
    { id: 4, subject: 'Chemistry', teacher: 'Dr. Brown', time: '2:00 PM - 3:00 PM', room: 'Lab 2', status: 'upcoming' }
  ]);

  const [assignments] = useState([
    { id: 1, subject: 'Mathematics', title: 'Quadratic Equations Worksheet', dueDate: '2024-11-20', status: 'pending', priority: 'high' },
    { id: 2, subject: 'Physics', title: 'Lab Report - Pendulum Experiment', dueDate: '2024-11-18', status: 'submitted', priority: 'medium' },
    { id: 3, subject: 'English', title: 'Essay - Modern Literature Analysis', dueDate: '2024-11-25', status: 'in-progress', priority: 'medium' },
    { id: 4, subject: 'Chemistry', title: 'Periodic Table Quiz Preparation', dueDate: '2024-11-22', status: 'pending', priority: 'low' }
  ]);

  const [grades] = useState([
    { subject: 'Mathematics', currentGrade: 'A-', percentage: 87, trend: 'up' },
    { subject: 'Physics', currentGrade: 'B+', percentage: 84, trend: 'stable' },
    { subject: 'English Literature', currentGrade: 'A', percentage: 92, trend: 'up' },
    { subject: 'Chemistry', currentGrade: 'B', percentage: 81, trend: 'down' },
    { subject: 'History', currentGrade: 'A-', percentage: 88, trend: 'up' }
  ]);

  const [recentAnnouncements] = useState([
    { id: 1, title: 'Mid-term Exam Schedule Released', message: 'Check your exam timetable and preparation guidelines', time: '2 hours ago', type: 'exam' },
    { id: 2, title: 'Library Extended Hours', message: 'Library will be open until 8 PM during exam week', time: '1 day ago', type: 'facility' },
    { id: 3, title: 'Science Fair Registration', message: 'Register for the annual science fair by November 30th', time: '2 days ago', type: 'event' }
  ]);

  const stats = {
    currentGPA: 3.67,
    attendanceRate: 95.2,
    assignmentsPending: 2,
    upcomingExams: 5
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'secondary';
      case 'current': return 'default';
      case 'upcoming': return 'outline';
      case 'submitted': return 'secondary';
      case 'pending': return 'destructive';
      case 'in-progress': return 'default';
      default: return 'outline';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down': return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />;
      default: return <div className="w-4 h-1 bg-gray-400 rounded"></div>;
    }
  };

  // Chart data
  const semesterProgress = [
    { month: 'Aug', gpa: 3.2, attendance: 92 },
    { month: 'Sep', gpa: 3.4, attendance: 94 },
    { month: 'Oct', gpa: 3.6, attendance: 96 },
    { month: 'Nov', gpa: 3.67, attendance: 95 }
  ];

  const subjectPerformance = [
    { subject: 'Math', score: 87, maxScore: 100 },
    { subject: 'Physics', score: 84, maxScore: 100 },
    { subject: 'English', score: 92, maxScore: 100 },
    { subject: 'Chemistry', score: 81, maxScore: 100 },
    { subject: 'History', score: 88, maxScore: 100 }
  ];

  const studyTime = [
    { subject: 'Mathematics', hours: 12, color: '#3b82f6' },
    { subject: 'Physics', hours: 10, color: '#10b981' },
    { subject: 'English', hours: 8, color: '#f59e0b' },
    { subject: 'Chemistry', hours: 9, color: '#ef4444' },
    { subject: 'History', hours: 6, color: '#6b7280' }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Student Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Track your academic progress and stay organized.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => onNavigate('schedule')}>
            <Calendar className="h-4 w-4 mr-2" />
            Full Calendar
          </Button>
          <Button onClick={() => onNavigate('certificates')}>
            <Award className="h-4 w-4 mr-2" />
            My Certificates
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current GPA</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.currentGPA}</div>
            <p className="text-xs text-muted-foreground">
              Semester average
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.attendanceRate}%</div>
            <Progress value={stats.attendanceRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Exams</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.upcomingExams}</div>
            <p className="text-xs text-muted-foreground">
              Next 2 weeks
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule - Calendar Type */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Today's Schedule</CardTitle>
                <CardDescription>Your classes for Monday, September 1, 2025</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={() => onNavigate('schedule')}>
                <Calendar className="h-4 w-4 mr-2" />
                Full Calendar
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {todaySchedule.map((class_) => (
                <div key={class_.id} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="font-medium">{class_.subject}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <div className="flex items-center gap-1 mb-1">
                          <Clock className="h-3 w-3" />
                          {class_.time}
                        </div>
                        <div>{class_.teacher}</div>
                        <div>{class_.room}</div>
                      </div>
                    </div>
                    <Badge variant={getStatusColor(class_.status)}>
                      {class_.status}
                    </Badge>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => onNavigate('schedule')}
                  >
                    {class_.status === 'current' ? 'Join Class' : 'View Details'}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Summary</CardTitle>
            <CardDescription>Current academic status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <div className="font-medium">Overall GPA</div>
                  <div className="text-sm text-muted-foreground">Current semester</div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold">3.67</div>
                  <div className="text-xs text-green-600">+0.07</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <div className="font-medium">Class Rank</div>
                  <div className="text-sm text-muted-foreground">Out of 45 students</div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold">8th</div>
                  <div className="text-xs text-green-600">↑2</div>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => onNavigate('grades')}
              >
                <Award className="h-4 w-4 mr-2" />
                View Detailed Grades
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Semester Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Semester Progress</CardTitle>
            <CardDescription>Your GPA and attendance trends over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={semesterProgress}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="gpa" stroke="#3b82f6" strokeWidth={2} name="GPA" />
                <Line type="monotone" dataKey="attendance" stroke="#10b981" strokeWidth={2} name="Attendance %" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Weekly Study Time */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Study Time</CardTitle>
            <CardDescription>Hours spent studying each subject this week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={studyTime}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ subject, hours }) => `${subject}: ${hours}h`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="hours"
                >
                  {studyTime.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Subject Performance Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Subject Performance Comparison</CardTitle>
          <CardDescription>Your current scores across all subjects</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={subjectPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="score" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Assignments & Grades */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Assignments</CardTitle>
            <CardDescription>Track your assignment progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assignments.map((assignment) => (
                <div key={assignment.id} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="space-y-1">
                      <p className="font-medium">{assignment.title}</p>
                      <p className="text-sm text-muted-foreground">{assignment.subject}</p>
                      <p className="text-xs text-muted-foreground">Due: {assignment.dueDate}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <Badge variant={getStatusColor(assignment.status)}>
                        {assignment.status}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {assignment.priority}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onNavigate('assignments')}
                    >
                      {assignment.status === 'submitted' ? 'View Grades' : 'View Details'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Grade Overview</CardTitle>
            <CardDescription>Current semester performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {grades.map((grade, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium">{grade.subject}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">{grade.currentGrade}</span>
                      <span className="text-sm text-muted-foreground">({grade.percentage}%)</span>
                      {getTrendIcon(grade.trend)}
                    </div>
                  </div>
                  <Progress value={grade.percentage} className="w-20" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Announcements */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Announcements</CardTitle>
          <CardDescription>Important updates from your school</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentAnnouncements.map((announcement) => (
              <div key={announcement.id} className="p-4 border rounded-lg">
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <Badge variant="outline">{announcement.type}</Badge>
                    <span className="text-xs text-muted-foreground">{announcement.time}</span>
                  </div>
                  <h3 className="font-medium">{announcement.title}</h3>
                  <p className="text-sm text-muted-foreground">{announcement.message}</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => onNavigate('announcements')}
                  >
                    Read More
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}