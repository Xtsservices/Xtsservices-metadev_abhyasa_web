import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { 
  ArrowLeft,
  Calendar, 
  Clock, 
  Users, 
  BookOpen, 
  CheckCircle, 
  AlertCircle, 
  FileText, 
  TrendingUp,
  MapPin,
  Edit,
  Eye,
  Download,
  Plus,
  MessageSquare,
  Award,
  Target,
  BarChart3,
  PieChart
} from 'lucide-react';

interface TeacherScheduleSummaryProps {
  onNavigate: (screen: import("../App").Screen) => void;
}

export function TeacherScheduleSummary({ onNavigate }: TeacherScheduleSummaryProps) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [activeTab, setActiveTab] = useState('overview');

  const todaySchedule = [
    {
      id: 1,
      subject: 'Mathematics',
      class: 'Grade 10A',
      time: '9:00 AM - 10:00 AM',
      room: 'Room 101',
      status: 'completed',
      studentsPresent: 26,
      totalStudents: 28,
      topicCovered: 'Quadratic Equations - Factoring Methods',
      objectives: [
        'Understand different factoring techniques',
        'Solve quadratic equations by factoring',
        'Apply factoring to real-world problems'
      ],
      homework: 'Complete exercises 5.1-5.3, pages 142-145',
      notes: 'Students showed good understanding of basic factoring. Need more practice with complex cases.'
    },
    {
      id: 2,
      subject: 'Mathematics',
      class: 'Grade 10B',
      time: '10:15 AM - 11:15 AM',
      room: 'Room 101',
      status: 'completed',
      studentsPresent: 24,
      totalStudents: 26,
      topicCovered: 'Quadratic Equations - Completing the Square',
      objectives: [
        'Master completing the square technique',
        'Convert quadratic equations to vertex form',
        'Understand geometric interpretation'
      ],
      homework: 'Practice worksheet - Completing the Square (20 problems)',
      notes: 'Good participation. Sarah and Mike need additional support with algebraic manipulation.'
    },
    {
      id: 3,
      subject: 'Advanced Mathematics',
      class: 'Grade 12',
      time: '2:00 PM - 3:00 PM',
      room: 'Room 205',
      status: 'upcoming',
      studentsPresent: null,
      totalStudents: 22,
      topicCovered: 'Calculus - Integration by Parts',
      objectives: [
        'Master integration by parts formula',
        'Identify when to use this technique',
        'Solve complex integration problems'
      ],
      homework: 'TBD',
      notes: ''
    },
    {
      id: 4,
      subject: 'Statistics',
      class: 'Grade 11',
      time: '3:15 PM - 4:15 PM',
      room: 'Room 205',
      status: 'upcoming',
      studentsPresent: null,
      totalStudents: 25,
      topicCovered: 'Probability Distributions',
      objectives: [
        'Understand normal distribution properties',
        'Calculate z-scores',
        'Apply to real-world scenarios'
      ],
      homework: 'TBD',
      notes: ''
    }
  ];

  const weeklyOverview = {
    totalClasses: 20,
    completedClasses: 12,
    upcomingClasses: 8,
    totalStudents: 101,
    averageAttendance: 92.3,
    assignmentsGiven: 8,
    assignmentsGraded: 5
  };

  const performanceMetrics = [
    { class: 'Grade 10A', avgScore: 82, attendance: 93, participation: 88 },
    { class: 'Grade 10B', avgScore: 79, attendance: 92, participation: 85 },
    { class: 'Grade 11', avgScore: 85, attendance: 89, participation: 90 },
    { class: 'Grade 12', avgScore: 88, attendance: 96, participation: 92 }
  ];

  const upcomingDeadlines = [
    { task: 'Grade Mid-term Exams', dueDate: '2024-09-25', priority: 'high', class: 'All Classes' },
    { task: 'Submit Monthly Report', dueDate: '2024-09-30', priority: 'medium', class: 'Administration' },
    { task: 'Parent-Teacher Conference Prep', dueDate: '2024-10-05', priority: 'high', class: 'All Classes' },
    { task: 'Curriculum Planning Meeting', dueDate: '2024-10-10', priority: 'medium', class: 'Mathematics Dept' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAttendanceStatus = (present: number, total: number) => {
    const percentage = (present / total) * 100;
    if (percentage >= 95) return { status: 'excellent', color: 'text-green-600' };
    if (percentage >= 85) return { status: 'good', color: 'text-blue-600' };
    if (percentage >= 75) return { status: 'average', color: 'text-yellow-600' };
    return { status: 'needs attention', color: 'text-red-600' };
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => onNavigate('dashboard')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Schedule Summary</h1>
            <p className="text-muted-foreground">
              Overview of your classes and teaching activities for {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => onNavigate('calendar')}>
            <Calendar className="h-4 w-4 mr-2" />
            Full Calendar
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Summary
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Classes</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">2 completed, 2 upcoming</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Students Today</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">101</div>
            <p className="text-xs text-muted-foreground">Across all classes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92.3%</div>
            <p className="text-xs text-muted-foreground">Above average</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Topics Covered</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Different topics taught</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Daily Overview</TabsTrigger>
          <TabsTrigger value="classes">Class Details</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="deadlines">Upcoming Tasks</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Today's Schedule Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Classes Summary</CardTitle>
                <CardDescription>Quick overview of all scheduled classes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todaySchedule.map((class_) => (
                    <div key={class_.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{class_.subject}</h4>
                          <Badge className={getStatusColor(class_.status)}>
                            {class_.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {class_.time}
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-4">
                          <span className="text-muted-foreground">Class:</span>
                          <span>{class_.class}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-muted-foreground">Room:</span>
                          <span>{class_.room}</span>
                        </div>
                        {class_.status === 'completed' && (
                          <div className="flex items-center gap-4">
                            <span className="text-muted-foreground">Attendance:</span>
                            <span className={getAttendanceStatus(class_.studentsPresent!, class_.totalStudents).color}>
                              {class_.studentsPresent}/{class_.totalStudents} ({Math.round((class_.studentsPresent! / class_.totalStudents) * 100)}%)
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Weekly Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Overview</CardTitle>
                <CardDescription>Your teaching metrics for this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-xl font-bold text-primary">{weeklyOverview.completedClasses}</div>
                      <div className="text-sm text-muted-foreground">Classes Completed</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-xl font-bold text-primary">{weeklyOverview.upcomingClasses}</div>
                      <div className="text-sm text-muted-foreground">Classes Remaining</div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Weekly Progress</span>
                      <span>{Math.round((weeklyOverview.completedClasses / weeklyOverview.totalClasses) * 100)}%</span>
                    </div>
                    <Progress value={(weeklyOverview.completedClasses / weeklyOverview.totalClasses) * 100} />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Average Attendance</span>
                      <span>{weeklyOverview.averageAttendance}%</span>
                    </div>
                    <Progress value={weeklyOverview.averageAttendance} />
                  </div>

                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between text-sm">
                      <span>Assignments Given:</span>
                      <span className="font-medium">{weeklyOverview.assignmentsGiven}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Assignments Graded:</span>
                      <span className="font-medium">{weeklyOverview.assignmentsGraded}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Total Students:</span>
                      <span className="font-medium">{weeklyOverview.totalStudents}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="classes" className="space-y-6">
          <div className="space-y-6">
            {todaySchedule.map((class_) => (
              <Card key={class_.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {class_.subject} - {class_.class}
                        <Badge className={getStatusColor(class_.status)}>
                          {class_.status}
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        {class_.time} • {class_.room}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => onNavigate('classes')}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Class
                      </Button>
                      {class_.status === 'completed' && (
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Summary
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Topic Covered</h4>
                        <p className="text-sm">{class_.topicCovered}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Learning Objectives</h4>
                        <ul className="text-sm space-y-1">
                          {class_.objectives.map((objective, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <Target className="h-3 w-3 mt-1 text-muted-foreground" />
                              {objective}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {class_.homework && (
                        <div>
                          <h4 className="font-semibold mb-2">Homework Assigned</h4>
                          <p className="text-sm">{class_.homework}</p>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      {class_.status === 'completed' && class_.studentsPresent !== null && (
                        <div>
                          <h4 className="font-semibold mb-2">Attendance</h4>
                          <div className="p-3 bg-muted/50 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm">Students Present</span>
                              <span className="font-medium">{class_.studentsPresent}/{class_.totalStudents}</span>
                            </div>
                            <Progress value={(class_.studentsPresent / class_.totalStudents) * 100} />
                            <div className="text-xs text-muted-foreground mt-1">
                              {Math.round((class_.studentsPresent / class_.totalStudents) * 100)}% attendance rate
                            </div>
                          </div>
                        </div>
                      )}

                      {class_.notes && (
                        <div>
                          <h4 className="font-semibold mb-2">Class Notes</h4>
                          <p className="text-sm text-muted-foreground">{class_.notes}</p>
                        </div>
                      )}

                      <div className="flex gap-2">
                        {class_.status === 'upcoming' && (
                          <Button size="sm" className="flex-1">
                            <Plus className="h-4 w-4 mr-2" />
                            Start Class
                          </Button>
                        )}
                        <Button size="sm" variant="outline" className="flex-1" onClick={() => onNavigate('assignments')}>
                          <FileText className="h-4 w-4 mr-2" />
                          Assignments
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Class Performance Metrics</CardTitle>
                <CardDescription>Overview of your classes' performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {performanceMetrics.map((metric, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-3">{metric.class}</h4>
                      <div className="space-y-3">
                        {metric.avgScore && (
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Average Score</span>
                              <span>{metric.avgScore}%</span>
                            </div>
                            <Progress value={metric.avgScore} />
                          </div>
                        )}
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Attendance Rate</span>
                            <span>{metric.attendance}%</span>
                          </div>
                          <Progress value={metric.attendance} />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Participation</span>
                            <span>{metric.participation}%</span>
                          </div>
                          <Progress value={metric.participation} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Teaching Effectiveness</CardTitle>
                <CardDescription>Your teaching metrics and student feedback</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center p-6 bg-muted/50 rounded-lg">
                    <div className="text-3xl font-bold text-primary mb-2">4.7/5.0</div>
                    <div className="text-sm text-muted-foreground">Overall Student Rating</div>
                    <div className="flex justify-center mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Award key={star} className={`h-4 w-4 ${star <= 4 ? 'text-yellow-500' : 'text-gray-300'}`} />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Lesson Clarity</span>
                        <span>92%</span>
                      </div>
                      <Progress value={92} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Student Engagement</span>
                        <span>88%</span>
                      </div>
                      <Progress value={88} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Assignment Quality</span>
                        <span>95%</span>
                      </div>
                      <Progress value={95} />
                    </div>
                  </div>

                  <Button className="w-full" onClick={() => onNavigate('reports')}>
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Detailed Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="deadlines" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Tasks & Deadlines</CardTitle>
              <CardDescription>Important tasks and deadlines you need to complete</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingDeadlines.map((deadline, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{deadline.task}</h4>
                        <Badge className={getPriorityColor(deadline.priority)}>
                          {deadline.priority} priority
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{deadline.class}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        Due: {new Date(deadline.dueDate).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button size="sm">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Mark Complete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks you can complete quickly</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" onClick={() => onNavigate('gradebook')}>
                  <FileText className="h-4 w-4 mr-2" />
                  Update Gradebook
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => onNavigate('assignments')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Assignment
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => onNavigate('messages')}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send Parent Update
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => onNavigate('attendance')}>
                  <Users className="h-4 w-4 mr-2" />
                  Take Attendance
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Reminders</CardTitle>
                <CardDescription>Important reminders for today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Faculty Meeting Today</p>
                      <p className="text-xs text-muted-foreground">Conference Room at 3:30 PM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Grade Submission Deadline</p>
                      <p className="text-xs text-muted-foreground">Mid-term grades due in 3 days</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Lesson Plans Updated</p>
                      <p className="text-xs text-muted-foreground">All classes prepared for this week</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}