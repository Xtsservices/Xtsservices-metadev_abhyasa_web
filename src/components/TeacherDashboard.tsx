import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BookOpen, Users, Calendar, Clock, CheckCircle, AlertCircle, FileText, MessageSquare } from 'lucide-react';

interface TeacherDashboardProps {
  onNavigate: (screen: import("../App").Screen) => void;
}

export function TeacherDashboard({ onNavigate }: TeacherDashboardProps) {
  const [todayClasses] = useState([
    { id: 1, subject: 'Mathematics', class: 'Grade 10A', time: '9:00 AM - 10:00 AM', room: 'Room 101', status: 'upcoming' },
    { id: 2, subject: 'Mathematics', class: 'Grade 10B', time: '10:15 AM - 11:15 AM', room: 'Room 101', status: 'upcoming' },
    { id: 3, subject: 'Advanced Math', class: 'Grade 12', time: '2:00 PM - 3:00 PM', room: 'Room 205', status: 'completed' },
    { id: 4, subject: 'Statistics', class: 'Grade 11', time: '3:15 PM - 4:15 PM', room: 'Room 205', status: 'upcoming' }
  ]);

  const [assignments] = useState([
    { id: 1, title: 'Quadratic Equations Worksheet', class: 'Grade 10A', dueDate: '2024-11-20', submitted: 23, total: 28, status: 'active' },
    { id: 2, title: 'Calculus Problem Set', class: 'Grade 12', dueDate: '2024-11-18', submitted: 19, total: 22, status: 'grading' },
    { id: 3, title: 'Probability Quiz', class: 'Grade 11', dueDate: '2024-11-15', submitted: 25, total: 25, status: 'completed' }
  ]);

  const [recentActivities] = useState([
    { id: 1, action: 'Assignment submitted', details: 'Sarah Johnson submitted Calculus Problem Set', time: '30 minutes ago' },
    { id: 2, action: 'Grade updated', details: 'Updated grades for Probability Quiz - Grade 11', time: '2 hours ago' },
    { id: 3, action: 'Message received', details: 'Parent inquiry about homework policy', time: '4 hours ago' },
    { id: 4, action: 'Class completed', details: 'Advanced Math - Grade 12 lesson completed', time: '1 day ago' }
  ]);

  const stats = {
    todayClasses: 4,
    totalStudents: 125,
    pendingGrading: 47,
    messagesUnread: 8,
    attendanceRate: 92.5,
    assignmentCompletionRate: 87.3
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'default';
      case 'completed': return 'secondary';
      case 'active': return 'default';
      case 'grading': return 'destructive';
      default: return 'secondary';
    }
  };

  // Chart data
  const studentPerformance = [
    { class: 'Grade 10A', avgScore: 82, attendance: 94 },
    { class: 'Grade 10B', avgScore: 78, attendance: 91 },
    { class: 'Grade 11', avgScore: 85, attendance: 89 },
    { class: 'Grade 12', avgScore: 88, attendance: 96 }
  ];

  const weeklyProgress = [
    { week: 'Week 1', completed: 23, pending: 5 },
    { week: 'Week 2', completed: 26, pending: 2 },
    { week: 'Week 3', completed: 24, pending: 4 },
    { week: 'Week 4', completed: 27, pending: 1 }
  ];

  const gradeDistribution = [
    { grade: 'A', count: 34, color: '#10b981' },
    { grade: 'B', count: 42, color: '#3b82f6' },
    { grade: 'C', count: 28, color: '#f59e0b' },
    { grade: 'D', count: 15, color: '#ef4444' },
    { grade: 'F', count: 6, color: '#6b7280' }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
          <p className="text-muted-foreground">Good morning! Here's your schedule and recent updates.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => onNavigate('gradebook')}>
            <FileText className="h-4 w-4 mr-2" />
            Gradebook
          </Button>
          <Button onClick={() => onNavigate('assignments')}>
            <BookOpen className="h-4 w-4 mr-2" />
            Create Assignment
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Classes</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.todayClasses}</div>
            <p className="text-xs text-muted-foreground">
              2 completed, 2 upcoming
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">
              Across 4 different classes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Grading</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingGrading}</div>
            <p className="text-xs text-muted-foreground">
              Assignments to review
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.messagesUnread}</div>
            <p className="text-xs text-muted-foreground">
              Unread messages
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
            <CardDescription>Your classes for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayClasses.map((class_) => (
                <div key={class_.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{class_.subject}</p>
                      <Badge variant={getStatusColor(class_.status)}>
                        {class_.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{class_.class}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {class_.time}
                      </span>
                      <span>{class_.room}</span>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onNavigate(class_.status === 'completed' ? 'schedule-summary' : 'classes')}
                  >
                    {class_.status === 'completed' ? 'View Summary' : 'Start Class'}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
            <CardDescription>Class performance metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Average Attendance</span>
                <span>{stats.attendanceRate}%</span>
              </div>
              <Progress value={stats.attendanceRate} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Assignment Completion</span>
                <span>{stats.assignmentCompletionRate}%</span>
              </div>
              <Progress value={stats.assignmentCompletionRate} />
            </div>
            <div className="pt-4 space-y-2">
              <Button variant="outline" size="sm" className="w-full" onClick={() => onNavigate('reports')}>
                <FileText className="h-4 w-4 mr-2" />
                View Full Report
              </Button>
              <Button variant="outline" size="sm" className="w-full" onClick={() => onNavigate('reports')}>
                <Users className="h-4 w-4 mr-2" />
                Student Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Class Performance Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Class Performance Overview</CardTitle>
            <CardDescription>Average scores and attendance by class</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={studentPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="class" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="avgScore" fill="#3b82f6" name="Avg Score" />
                <Bar dataKey="attendance" fill="#10b981" name="Attendance %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Grade Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Grade Distribution</CardTitle>
            <CardDescription>Current grade breakdown across all classes</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={gradeDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ grade, count }) => `${grade}: ${count}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {gradeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Assignment Progress Tracking */}
      <Card>
        <CardHeader>
          <CardTitle>Assignment Completion Trends</CardTitle>
          <CardDescription>Weekly assignment completion rates</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={weeklyProgress}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="completed" stroke="#10b981" strokeWidth={2} name="Completed" />
              <Line type="monotone" dataKey="pending" stroke="#ef4444" strokeWidth={2} name="Pending" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Assignments & Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Assignments</CardTitle>
            <CardDescription>Track assignment progress and submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assignments.map((assignment) => (
                <div key={assignment.id} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="space-y-1">
                      <p className="font-medium">{assignment.title}</p>
                      <p className="text-sm text-muted-foreground">{assignment.class}</p>
                      <p className="text-xs text-muted-foreground">Due: {assignment.dueDate}</p>
                    </div>
                    <Badge variant={getStatusColor(assignment.status)}>
                      {assignment.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <span className="font-medium">{assignment.submitted}</span>
                      <span className="text-muted-foreground">/{assignment.total} submitted</span>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => onNavigate('assignments')}>
                      {assignment.status === 'grading' ? 'Review' : 'View Details'}
                    </Button>
                  </div>
                  <Progress value={(assignment.submitted / assignment.total) * 100} className="mt-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest updates and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.details}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}