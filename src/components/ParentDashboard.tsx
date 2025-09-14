import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, Calendar, TrendingUp, MessageSquare, BookOpen, Award, Bell } from 'lucide-react';

interface ParentDashboardProps {
  onNavigate: (screen: import("../App").Screen) => void;
}

export function ParentDashboard({ onNavigate }: ParentDashboardProps) {
  const [selectedChild, setSelectedChild] = useState('sarah');
  
  const [children] = useState([
    { id: 'sarah', name: 'Sarah Johnson', grade: 'Grade 10A', class: 'Section A', image: '/api/placeholder/40/40' },
    { id: 'mike', name: 'Mike Johnson', grade: 'Grade 7B', class: 'Section B', image: '/api/placeholder/40/40' }
  ]);

  const [childData] = useState({
    sarah: {
      attendance: 96.5,
      gpa: 3.8,
      upcomingExams: 3,
      recentGrades: [
        { subject: 'Mathematics', grade: 'A-', percentage: 87, date: '2024-11-10' },
        { subject: 'Physics', grade: 'B+', percentage: 84, date: '2024-11-08' },
        { subject: 'English', grade: 'A', percentage: 92, date: '2024-11-05' },
        { subject: 'Chemistry', grade: 'B', percentage: 81, date: '2024-11-03' }
      ],
      schedule: [
        { subject: 'Mathematics', teacher: 'Mr. Johnson', time: '9:00 AM', room: 'Room 101' },
        { subject: 'Physics', teacher: 'Dr. Smith', time: '10:15 AM', room: 'Lab 1' },
        { subject: 'English', teacher: 'Ms. Wilson', time: '11:30 AM', room: 'Room 203' },
        { subject: 'Chemistry', teacher: 'Dr. Brown', time: '2:00 PM', room: 'Lab 2' }
      ],
      activities: [
        { action: 'Assignment submitted', details: 'Mathematics - Quadratic Equations', time: '2 hours ago' },
        { action: 'Attendance marked', details: 'Present in all classes today', time: '4 hours ago' },
        { action: 'Grade updated', details: 'English Literature Essay - A grade', time: '1 day ago' }
      ]
    },
    mike: {
      attendance: 94.2,
      gpa: 3.5,
      upcomingExams: 2,
      recentGrades: [
        { subject: 'Science', grade: 'A-', percentage: 88, date: '2024-11-10' },
        { subject: 'Mathematics', grade: 'B+', percentage: 85, date: '2024-11-08' },
        { subject: 'English', grade: 'A', percentage: 90, date: '2024-11-05' },
        { subject: 'Social Studies', grade: 'B', percentage: 82, date: '2024-11-03' }
      ],
      schedule: [
        { subject: 'Science', teacher: 'Ms. Davis', time: '9:00 AM', room: 'Room 205' },
        { subject: 'Mathematics', teacher: 'Mr. Wilson', time: '10:15 AM', room: 'Room 108' },
        { subject: 'English', teacher: 'Mrs. Brown', time: '11:30 AM', room: 'Room 210' },
        { subject: 'Social Studies', teacher: 'Mr. Taylor', time: '2:00 PM', room: 'Room 115' }
      ],
      activities: [
        { action: 'Test scheduled', details: 'Science test on November 20th', time: '1 hour ago' },
        { action: 'Assignment due', details: 'Mathematics homework due tomorrow', time: '3 hours ago' },
        { action: 'Parent meeting', details: 'Scheduled with class teacher', time: '2 days ago' }
      ]
    }
  });

  const [notifications] = useState([
    { id: 1, title: 'Parent-Teacher Meeting', message: 'Scheduled meeting with Sarah\'s Mathematics teacher', time: '2 days ago', type: 'meeting', urgent: false },
    { id: 2, title: 'Assignment Update', message: 'Mike submitted his Science project', time: '1 day ago', type: 'academic', urgent: false },
    { id: 3, title: 'Grade Posted', message: 'New grades available for Sarah in Mathematics', time: '3 hours ago', type: 'academic', urgent: false }
  ]);

  const currentChild = childData[selectedChild as keyof typeof childData];
  const currentChildInfo = children.find(child => child.id === selectedChild);

  // Chart data
  const academicProgress = [
    { month: 'Aug', sarah: 3.6, mike: 3.2 },
    { month: 'Sep', sarah: 3.7, mike: 3.4 },
    { month: 'Oct', sarah: 3.75, mike: 3.45 },
    { month: 'Nov', sarah: 3.8, mike: 3.5 }
  ];

  const attendanceComparison = [
    { child: 'Sarah', attendance: 96.5, target: 95 },
    { child: 'Mike', attendance: 94.2, target: 95 }
  ];

  const subjectPerformance = selectedChild === 'sarah' ? [
    { subject: 'Math', percentage: 87, color: '#3b82f6' },
    { subject: 'Physics', percentage: 84, color: '#10b981' },
    { subject: 'English', percentage: 92, color: '#f59e0b' },
    { subject: 'Chemistry', percentage: 81, color: '#ef4444' }
  ] : [
    { subject: 'Science', percentage: 88, color: '#3b82f6' },
    { subject: 'Math', percentage: 85, color: '#10b981' },
    { subject: 'English', percentage: 90, color: '#f59e0b' },
    { subject: 'Social Studies', percentage: 82, color: '#ef4444' }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Parent Dashboard</h1>
          <p className="text-muted-foreground">Monitor your children's academic progress and stay connected with school.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => onNavigate('messages')}>
            <MessageSquare className="h-4 w-4 mr-2" />
            Messages
          </Button>
          <Button onClick={() => onNavigate('children')}>
            <BookOpen className="h-4 w-4 mr-2" />
            Children Overview
          </Button>
        </div>
      </div>

      {/* Child Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Child</CardTitle>
          <CardDescription>Choose which child's information you want to view</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            {children.map((child) => (
              <Button
                key={child.id}
                variant={selectedChild === child.id ? "default" : "outline"}
                onClick={() => setSelectedChild(child.id)}
                className="h-auto p-4 flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <div className="font-medium">{child.name}</div>
                  <div className="text-sm text-muted-foreground">{child.grade}</div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics for Selected Child */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentChild.attendance}%</div>
            <Progress value={currentChild.attendance} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current GPA</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentChild.gpa}</div>
            <p className="text-xs text-muted-foreground">
              Semester average
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Exams</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentChild.upcomingExams}</div>
            <p className="text-xs text-muted-foreground">
              Next 2 weeks
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Unread messages
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Academic Progress Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Academic Progress Comparison</CardTitle>
            <CardDescription>GPA trends for both children over the semester</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={academicProgress}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[3.0, 4.0]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sarah" stroke="#3b82f6" strokeWidth={2} name="Sarah" />
                <Line type="monotone" dataKey="mike" stroke="#10b981" strokeWidth={2} name="Mike" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Subject Performance */}
        <Card>
          <CardHeader>
            <CardTitle>{currentChildInfo?.name}'s Subject Performance</CardTitle>
            <CardDescription>Current grades across all subjects</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={subjectPerformance}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ subject, percentage }) => `${subject}: ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="percentage"
                >
                  {subjectPerformance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Attendance Comparison</CardTitle>
          <CardDescription>Current attendance rates vs school targets</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={attendanceComparison}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="child" />
              <YAxis domain={[85, 100]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="attendance" fill="#3b82f6" name="Current Attendance" />
              <Bar dataKey="target" fill="#10b981" name="School Target" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Academic Performance */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Academic Performance - {currentChildInfo?.name}</CardTitle>
            <CardDescription>Recent grades and academic progress</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="grades" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="grades">Recent Grades</TabsTrigger>
                <TabsTrigger value="schedule">Today's Schedule</TabsTrigger>
                <TabsTrigger value="activities">Activities</TabsTrigger>
              </TabsList>
              
              <TabsContent value="grades" className="space-y-4">
                {currentChild.recentGrades.map((grade, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">{grade.subject}</p>
                      <p className="text-sm text-muted-foreground">Tested on {grade.date}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{grade.grade}</div>
                      <div className="text-sm text-muted-foreground">{grade.percentage}%</div>
                    </div>
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="schedule" className="space-y-4">
                {currentChild.schedule.map((class_, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">{class_.subject}</p>
                      <p className="text-sm text-muted-foreground">{class_.teacher}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{class_.time}</div>
                      <div className="text-sm text-muted-foreground">{class_.room}</div>
                    </div>
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="activities" className="space-y-4">
                {currentChild.activities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.details}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Updates</CardTitle>
            <CardDescription>Latest notifications and updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {notifications.map((notification) => (
              <div key={notification.id} className="p-3 border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <Badge variant={notification.urgent ? 'destructive' : 'secondary'}>
                    {notification.type}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{notification.time}</span>
                </div>
                <h3 className="font-medium text-sm">{notification.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
              </div>
            ))}
            
            <div className="pt-4 space-y-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => onNavigate('messages')}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                View All Messages
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => onNavigate('notifications')}
              >
                <Bell className="h-4 w-4 mr-2" />
                View Notifications
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Access */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Academic Overview</CardTitle>
            <CardDescription>Quick overview of children's academic status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {children.map((child) => {
                const childInfo = childData[child.id as keyof typeof childData];
                return (
                  <div key={child.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">{child.name}</p>
                      <p className="text-sm text-muted-foreground">GPA: {childInfo.gpa} | Attendance: {childInfo.attendance}%</p>
                    </div>
                    <div className="text-right">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onNavigate('children')}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                );
              })}
              <Button 
                className="w-full"
                onClick={() => onNavigate('children')}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Complete Children Overview
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common parent portal actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  className="h-auto p-4 flex flex-col items-center"
                  onClick={() => onNavigate('messages')}
                >
                  <MessageSquare className="h-6 w-6 mb-2" />
                  <span className="text-sm">Messages</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-auto p-4 flex flex-col items-center"
                  onClick={() => onNavigate('children')}
                >
                  <Users className="h-6 w-6 mb-2" />
                  <span className="text-sm">My Children</span>
                </Button>
              </div>
              
              <div className="pt-4 border-t">
                <h4 className="font-medium mb-2">Recent Messages</h4>
                <div className="space-y-2">
                  <div className="text-sm p-2 bg-muted rounded cursor-pointer hover:bg-muted/80" onClick={() => onNavigate('messages')}>
                    <p className="font-medium">Math Teacher</p>
                    <p className="text-muted-foreground">Great progress on latest assignment!</p>
                  </div>
                  <div className="text-sm p-2 bg-muted rounded cursor-pointer hover:bg-muted/80" onClick={() => onNavigate('messages')}>
                    <p className="font-medium">Class Teacher</p>
                    <p className="text-muted-foreground">Attendance has been excellent this month</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}