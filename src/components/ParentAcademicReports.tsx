import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { 
  FileText, 
  Download, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Award,
  BookOpen,
  Target,
  Clock,
  Users,
  BarChart3,
  Filter
} from 'lucide-react';

interface ParentAcademicReportsProps {
  onNavigate: (screen: string) => void;
}

export function ParentAcademicReports({ onNavigate }: ParentAcademicReportsProps) {
  const [selectedChild, setSelectedChild] = useState('sarah');
  const [selectedPeriod, setSelectedPeriod] = useState('current');
  const [selectedSubject, setSelectedSubject] = useState('all');

  const children = [
    { id: 'sarah', name: 'Sarah Johnson', grade: 'Grade 10A' },
    { id: 'mike', name: 'Mike Johnson', grade: 'Grade 7B' }
  ];

  const reportData = {
    sarah: {
      overallGrade: 'A',
      gpa: 3.85,
      attendance: 96.5,
      rank: 3,
      totalStudents: 45,
      subjects: [
        { name: 'Mathematics', grade: 'A', marks: 94, total: 100, teacher: 'Mr. Johnson', trend: 'up' },
        { name: 'Physics', grade: 'A-', marks: 88, total: 100, teacher: 'Dr. Smith', trend: 'stable' },
        { name: 'Chemistry', grade: 'A', marks: 92, total: 100, teacher: 'Dr. Brown', trend: 'up' },
        { name: 'Biology', grade: 'B+', marks: 85, total: 100, teacher: 'Ms. Davis', trend: 'down' },
        { name: 'English', grade: 'A+', marks: 96, total: 100, teacher: 'Ms. Wilson', trend: 'up' }
      ],
      monthlyProgress: [
        { month: 'Jan', gpa: 3.6, attendance: 94 },
        { month: 'Feb', gpa: 3.7, attendance: 96 },
        { month: 'Mar', gpa: 3.75, attendance: 95 },
        { month: 'Apr', gpa: 3.8, attendance: 97 },
        { month: 'May', gpa: 3.85, attendance: 96.5 }
      ],
      examResults: [
        { exam: 'Unit Test 1', date: '2024-02-15', overall: 'A', percentage: 89 },
        { exam: 'Mid Term', date: '2024-03-20', overall: 'A', percentage: 92 },
        { exam: 'Unit Test 2', date: '2024-04-18', overall: 'A-', percentage: 87 },
        { exam: 'Annual Exam', date: '2024-05-25', overall: 'A', percentage: 94 }
      ],
      activities: [
        { activity: 'Science Fair', position: '1st Place', date: '2024-03-15', points: 100 },
        { activity: 'Mathematics Olympiad', position: '3rd Place', date: '2024-04-10', points: 80 },
        { activity: 'Essay Competition', position: '2nd Place', date: '2024-05-05', points: 90 }
      ]
    },
    mike: {
      overallGrade: 'B+',
      gpa: 3.45,
      attendance: 94.2,
      rank: 12,
      totalStudents: 40,
      subjects: [
        { name: 'Mathematics', grade: 'B', marks: 78, total: 100, teacher: 'Mr. Wilson', trend: 'up' },
        { name: 'Science', grade: 'B+', marks: 82, total: 100, teacher: 'Ms. Davis', trend: 'up' },
        { name: 'English', grade: 'A-', marks: 87, total: 100, teacher: 'Mrs. Brown', trend: 'stable' },
        { name: 'Social Studies', grade: 'B+', marks: 80, total: 100, teacher: 'Mr. Taylor', trend: 'up' },
        { name: 'Computer Science', grade: 'A', marks: 90, total: 100, teacher: 'Ms. Anderson', trend: 'up' }
      ],
      monthlyProgress: [
        { month: 'Jan', gpa: 3.2, attendance: 92 },
        { month: 'Feb', gpa: 3.3, attendance: 93 },
        { month: 'Mar', gpa: 3.35, attendance: 94 },
        { month: 'Apr', gpa: 3.4, attendance: 95 },
        { month: 'May', gpa: 3.45, attendance: 94.2 }
      ],
      examResults: [
        { exam: 'Unit Test 1', date: '2024-02-12', overall: 'B+', percentage: 82 },
        { exam: 'Mid Term', date: '2024-03-18', overall: 'B+', percentage: 84 },
        { exam: 'Unit Test 2', date: '2024-04-15', overall: 'A-', percentage: 86 },
        { exam: 'Annual Exam', date: '2024-05-22', overall: 'B+', percentage: 83 }
      ],
      activities: [
        { activity: 'Coding Competition', position: '2nd Place', date: '2024-03-20', points: 90 },
        { activity: 'Art Exhibition', position: 'Participant', date: '2024-04-15', points: 60 },
        { activity: 'Sports Day', position: '1st Place - 100m', date: '2024-05-10', points: 100 }
      ]
    }
  };

  const currentChild = reportData[selectedChild as keyof typeof reportData];
  const currentChildInfo = children.find(child => child.id === selectedChild);

  const subjectColors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <div className="w-4 h-4 bg-gray-400 rounded-full"></div>;
    }
  };

  const getGradeColor = (grade: string) => {
    if (grade.includes('A')) return 'text-green-600 bg-green-50';
    if (grade.includes('B')) return 'text-blue-600 bg-blue-50';
    if (grade.includes('C')) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Academic Reports</h1>
          <p className="text-muted-foreground">Comprehensive academic performance analysis for your children</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button onClick={() => onNavigate('children')}>
            <Users className="h-4 w-4 mr-2" />
            Children Overview
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filters:</span>
            </div>
            <Select value={selectedChild} onValueChange={setSelectedChild}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select Child" />
              </SelectTrigger>
              <SelectContent>
                {children.map((child) => (
                  <SelectItem key={child.id} value={child.id}>
                    {child.name} - {child.grade}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Select Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">Current Term</SelectItem>
                <SelectItem value="previous">Previous Term</SelectItem>
                <SelectItem value="yearly">Full Year</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Subjects" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {currentChild.subjects.map((subject) => (
                  <SelectItem key={subject.name} value={subject.name.toLowerCase()}>
                    {subject.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Grade</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentChild.overallGrade}</div>
            <p className="text-xs text-muted-foreground">
              GPA: {currentChild.gpa}/4.0
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Class Rank</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentChild.rank}</div>
            <p className="text-xs text-muted-foreground">
              Out of {currentChild.totalStudents} students
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentChild.attendance}%</div>
            <Progress value={currentChild.attendance} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Subjects</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentChild.subjects.length}</div>
            <p className="text-xs text-muted-foreground">
              Active subjects
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="subjects" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="subjects">Subject Performance</TabsTrigger>
          <TabsTrigger value="progress">Progress Tracking</TabsTrigger>
          <TabsTrigger value="exams">Exam Results</TabsTrigger>
          <TabsTrigger value="activities">Activities & Awards</TabsTrigger>
        </TabsList>

        <TabsContent value="subjects" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Subject Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Subject-wise Performance</CardTitle>
                <CardDescription>{currentChildInfo?.name}'s grades across all subjects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentChild.subjects.map((subject, index) => (
                    <div key={subject.name} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: subjectColors[index % subjectColors.length] }}
                        ></div>
                        <div>
                          <p className="font-medium">{subject.name}</p>
                          <p className="text-sm text-muted-foreground">Teacher: {subject.teacher}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {getTrendIcon(subject.trend)}
                        <div className="text-right">
                          <Badge className={getGradeColor(subject.grade)}>
                            {subject.grade}
                          </Badge>
                          <p className="text-sm text-muted-foreground mt-1">
                            {subject.marks}/{subject.total}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Subject Distribution Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Grade Distribution</CardTitle>
                <CardDescription>Visual breakdown of performance across subjects</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={currentChild.subjects.map((subject, index) => ({
                        name: subject.name,
                        value: subject.marks,
                        color: subjectColors[index % subjectColors.length]
                      }))}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {currentChild.subjects.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={subjectColors[index % subjectColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* GPA Trend */}
            <Card>
              <CardHeader>
                <CardTitle>GPA Progress</CardTitle>
                <CardDescription>Monthly GPA tracking over the academic year</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={currentChild.monthlyProgress}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[3.0, 4.0]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="gpa" stroke="#3b82f6" strokeWidth={2} name="GPA" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Attendance Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Attendance Progress</CardTitle>
                <CardDescription>Monthly attendance tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={currentChild.monthlyProgress}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[85, 100]} />
                    <Tooltip />
                    <Bar dataKey="attendance" fill="#10b981" name="Attendance %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="exams" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Examination Results</CardTitle>
              <CardDescription>Detailed results from all major examinations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentChild.examResults.map((exam, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{exam.exam}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(exam.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getGradeColor(exam.overall)}>
                        {exam.overall}
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-1">
                        {exam.percentage}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activities" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Extracurricular Activities & Awards</CardTitle>
              <CardDescription>Achievements and participation in school activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentChild.activities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <Award className="h-6 w-6 text-yellow-600" />
                      </div>
                      <div>
                        <p className="font-medium">{activity.activity}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(activity.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline">
                        {activity.position}
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-1">
                        {activity.points} points
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}