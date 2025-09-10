import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, BookOpen, GraduationCap, Calendar, TrendingUp, Bell, FileText, Settings } from 'lucide-react';

interface InstitutionAdminDashboardProps {
  onNavigate: (screen: string) => void;
}

export function InstitutionAdminDashboard({ onNavigate }: InstitutionAdminDashboardProps) {
  const [notifications] = useState([
    { id: 1, title: 'New Teacher Application', message: 'John Smith has applied for Mathematics position', time: '2 hours ago', type: 'application' },
    { id: 2, title: 'Parent Meeting Request', message: 'Mrs. Johnson requests meeting about Sarah\'s progress', time: '4 hours ago', type: 'meeting' },
    { id: 3, title: 'Class Schedule Update', message: 'Math class rescheduled for Grade 10A', time: '1 day ago', type: 'schedule' }
  ]);

  const [selectedClass, setSelectedClass] = useState('all');

  const stats = {
    totalStudents: 1247,
    totalTeachers: 78,
    totalClasses: 42,
    pendingApplications: 12,
    thisMonthEnrollments: 23,
    attendanceRate: 94.2,
    examScheduled: 8
  };

  const recentActivities = [
    { id: 1, action: 'New student enrollment', details: 'Emma Wilson - Grade 10A', time: '1 hour ago' },
    { id: 2, action: 'Teacher assignment', details: 'Mr. Davis assigned to Chemistry lab', time: '3 hours ago' },
    { id: 3, action: 'Class schedule updated', details: 'Grade 12 - Section B timetable revised', time: '5 hours ago' },
    { id: 4, action: 'Exam schedule updated', details: 'Mid-term exams for November 2024', time: '1 day ago' }
  ];

  const upcomingEvents = [
    { id: 1, title: 'Parent-Teacher Meeting', date: '2024-11-15', time: '10:00 AM', type: 'meeting' },
    { id: 2, title: 'Annual Sports Day', date: '2024-11-20', time: '9:00 AM', type: 'event' },
    { id: 3, title: 'Mid-term Examinations', date: '2024-11-25', time: '9:00 AM', type: 'exam' },
    { id: 4, title: 'Teacher Training Workshop', date: '2024-12-01', time: '2:00 PM', type: 'training' }
  ];

  // Chart data
  const enrollmentTrends = [
    { month: 'Jan', students: 1150, teachers: 75 },
    { month: 'Feb', students: 1180, teachers: 76 },
    { month: 'Mar', students: 1200, teachers: 77 },
    { month: 'Apr', students: 1220, teachers: 78 },
    { month: 'May', students: 1235, teachers: 78 },
    { month: 'Jun', students: 1247, teachers: 78 }
  ];

  const gradeDistribution = [
    { grade: 'Grade 1-3', students: 185, color: '#3b82f6' },
    { grade: 'Grade 4-6', students: 198, color: '#10b981' },
    { grade: 'Grade 7-9', students: 242, color: '#f59e0b' },
    { grade: 'Grade 10-12', students: 622, color: '#ef4444' }
  ];

  const attendanceData = [
    { day: 'Mon', rate: 96.2, grade1: 98.1, grade2: 95.4, grade3: 94.8 },
    { day: 'Tue', rate: 94.8, grade1: 96.2, grade2: 93.7, grade3: 94.5 },
    { day: 'Wed', rate: 95.5, grade1: 97.3, grade2: 94.1, grade3: 95.2 },
    { day: 'Thu', rate: 93.1, grade1: 95.8, grade2: 91.6, grade3: 92.3 },
    { day: 'Fri', rate: 92.7, grade1: 94.9, grade2: 90.8, grade3: 92.4 },
    { day: 'Sat', rate: 89.3, grade1: 92.1, grade2: 87.2, grade3: 88.6 }
  ];

  const getAttendanceDataForClass = () => {
    if (selectedClass === 'all') return attendanceData.map(d => ({ day: d.day, rate: d.rate }));
    if (selectedClass === 'grade1-3') return attendanceData.map(d => ({ day: d.day, rate: d.grade1 }));
    if (selectedClass === 'grade4-6') return attendanceData.map(d => ({ day: d.day, rate: d.grade2 }));
    if (selectedClass === 'grade7-12') return attendanceData.map(d => ({ day: d.day, rate: d.grade3 }));
    return attendanceData.map(d => ({ day: d.day, rate: d.rate }));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Institution Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening at your institution.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => onNavigate('notifications')}>
            <Bell className="h-4 w-4 mr-2" />
            Notifications
            <Badge variant="destructive" className="ml-2">3</Badge>
          </Button>
          <Button onClick={() => onNavigate('quick-actions')}>
            <Settings className="h-4 w-4 mr-2" />
            Quick Actions
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStudents.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +{stats.thisMonthEnrollments} new this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTeachers}</div>
            <p className="text-xs text-muted-foreground">
              {stats.pendingApplications} applications pending
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalClasses}</div>
            <p className="text-xs text-muted-foreground">
              {stats.examScheduled} exams scheduled
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.attendanceRate}%</div>
            <p className="text-xs text-muted-foreground">
              Last 7 days average
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enrollment Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Enrollment Trends</CardTitle>
            <CardDescription>Student and teacher growth over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={enrollmentTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="students" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="teachers" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Grade Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Student Distribution by Grade</CardTitle>
            <CardDescription>Current enrollment across different grade levels</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={gradeDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ grade, students }) => `${grade}: ${students}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="students"
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

      {/* Weekly Attendance Chart */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Weekly Attendance Overview</CardTitle>
              <CardDescription>Daily attendance rates for the current week</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Filter by Class:</label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  <SelectItem value="grade1-3">Grade 1-3</SelectItem>
                  <SelectItem value="grade4-6">Grade 4-6</SelectItem>
                  <SelectItem value="grade7-12">Grade 7-12</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={getAttendanceDataForClass()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis domain={[85, 100]} />
              <Tooltip />
              <Bar dataKey="rate" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest updates and activities in your institution</CardDescription>
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

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Important updates requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div key={notification.id} className="p-3 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{notification.title}</p>
                      <p className="text-xs text-muted-foreground">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                    <Badge variant={notification.type === 'application' ? 'default' : 'secondary'}>
                      {notification.type}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Important dates and schedules</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{event.title}</p>
                    <p className="text-xs text-muted-foreground">{event.date} at {event.time}</p>
                  </div>
                  <Badge variant="outline">{event.type}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center" onClick={() => onNavigate('students')}>
                <Users className="h-6 w-6 mb-2" />
                <span className="text-sm">Manage Students</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center" onClick={() => onNavigate('teachers')}>
                <GraduationCap className="h-6 w-6 mb-2" />
                <span className="text-sm">Manage Teachers</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center" onClick={() => onNavigate('classes')}>
                <BookOpen className="h-6 w-6 mb-2" />
                <span className="text-sm">Class Schedule</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center" onClick={() => onNavigate('reports')}>
                <FileText className="h-6 w-6 mb-2" />
                <span className="text-sm">Generate Reports</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}