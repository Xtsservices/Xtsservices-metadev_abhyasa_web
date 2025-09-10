import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { 
  Trophy, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Award, 
  BookOpen, 
  Target, 
  BarChart3, 
  FileText,
  Download,
  Eye,
  Star,
  CheckCircle
} from 'lucide-react';

interface StudentGradesProps {
  onNavigate: (screen: string) => void;
}

interface Grade {
  subject: string;
  teacher: string;
  currentGrade: string;
  percentage: number;
  trend: 'up' | 'down' | 'stable';
  assignments: {
    name: string;
    type: string;
    grade: string;
    points: number;
    maxPoints: number;
    date: string;
  }[];
  tests: {
    name: string;
    grade: string;
    percentage: number;
    date: string;
  }[];
}

export function StudentGrades({ onNavigate }: StudentGradesProps) {
  const [selectedSemester, setSelectedSemester] = useState('current');
  const [selectedSubject, setSelectedSubject] = useState('all');

  const grades: Grade[] = [
    {
      subject: 'Mathematics',
      teacher: 'Dr. Sarah Wilson',
      currentGrade: 'A',
      percentage: 94,
      trend: 'up',
      assignments: [
        { name: 'Calculus Problem Set 4', type: 'Homework', grade: 'A', points: 48, maxPoints: 50, date: '2024-08-28' },
        { name: 'Integration Quiz', type: 'Quiz', grade: 'A-', points: 23, maxPoints: 25, date: '2024-08-25' },
        { name: 'Derivatives Project', type: 'Project', grade: 'A+', points: 95, maxPoints: 100, date: '2024-08-20' }
      ],
      tests: [
        { name: 'Mid-term Exam', grade: 'A', percentage: 92, date: '2024-08-15' },
        { name: 'Unit Test - Limits', grade: 'A+', percentage: 98, date: '2024-08-05' }
      ]
    },
    {
      subject: 'Physics',
      teacher: 'Mr. Robert Johnson',
      currentGrade: 'A-',
      percentage: 88,
      trend: 'stable',
      assignments: [
        { name: 'Lab Report - Pendulum', type: 'Lab', grade: 'B+', points: 42, maxPoints: 50, date: '2024-08-30' },
        { name: 'Motion Problems', type: 'Homework', grade: 'A', points: 28, maxPoints: 30, date: '2024-08-26' },
        { name: 'Force Diagram Quiz', type: 'Quiz', grade: 'A-', points: 17, maxPoints: 20, date: '2024-08-22' }
      ],
      tests: [
        { name: 'Mechanics Test', grade: 'A-', percentage: 87, date: '2024-08-18' },
        { name: 'Kinematics Quiz', grade: 'B+', percentage: 85, date: '2024-08-08' }
      ]
    },
    {
      subject: 'Chemistry',
      teacher: 'Dr. Emily Brown',
      currentGrade: 'A',
      percentage: 92,
      trend: 'up',
      assignments: [
        { name: 'Organic Chemistry Lab', type: 'Lab', grade: 'A', points: 90, maxPoints: 100, date: '2024-08-29' },
        { name: 'Bonding Worksheet', type: 'Homework', grade: 'A+', points: 25, maxPoints: 25, date: '2024-08-24' },
        { name: 'Molecular Structure Quiz', type: 'Quiz', grade: 'A-', points: 23, maxPoints: 25, date: '2024-08-21' }
      ],
      tests: [
        { name: 'Organic Chemistry Test', grade: 'A-', percentage: 89, date: '2024-08-16' },
        { name: 'Periodic Table Quiz', grade: 'A+', percentage: 96, date: '2024-08-06' }
      ]
    },
    {
      subject: 'Biology',
      teacher: 'Ms. Jennifer Davis',
      currentGrade: 'B+',
      percentage: 85,
      trend: 'down',
      assignments: [
        { name: 'Cell Division Report', type: 'Report', grade: 'B', points: 40, maxPoints: 50, date: '2024-08-27' },
        { name: 'Genetics Problems', type: 'Homework', grade: 'A-', points: 22, maxPoints: 25, date: '2024-08-23' },
        { name: 'Microscopy Lab', type: 'Lab', grade: 'B+', points: 42, maxPoints: 50, date: '2024-08-19' }
      ],
      tests: [
        { name: 'Genetics Test', grade: 'B+', percentage: 83, date: '2024-08-14' },
        { name: 'Cell Biology Quiz', grade: 'A-', percentage: 87, date: '2024-08-04' }
      ]
    },
    {
      subject: 'English',
      teacher: 'Mrs. Lisa Wilson',
      currentGrade: 'A+',
      percentage: 96,
      trend: 'up',
      assignments: [
        { name: 'Hamlet Essay', type: 'Essay', grade: 'A+', points: 95, maxPoints: 100, date: '2024-08-31' },
        { name: 'Poetry Analysis', type: 'Assignment', grade: 'A', points: 45, maxPoints: 50, date: '2024-08-26' },
        { name: 'Grammar Quiz', type: 'Quiz', grade: 'A+', points: 20, maxPoints: 20, date: '2024-08-22' }
      ],
      tests: [
        { name: 'Literature Test', grade: 'A+', percentage: 97, date: '2024-08-17' },
        { name: 'Writing Assessment', grade: 'A', percentage: 93, date: '2024-08-07' }
      ]
    }
  ];

  const calculateOverallGPA = () => {
    const totalPercentage = grades.reduce((sum, grade) => sum + grade.percentage, 0);
    return Math.round((totalPercentage / grades.length) * 100) / 100;
  };

  const getGradePoints = (percentage: number) => {
    if (percentage >= 97) return 4.0;
    if (percentage >= 93) return 3.7;
    if (percentage >= 90) return 3.3;
    if (percentage >= 87) return 3.0;
    if (percentage >= 83) return 2.7;
    if (percentage >= 80) return 2.3;
    if (percentage >= 77) return 2.0;
    if (percentage >= 73) return 1.7;
    if (percentage >= 70) return 1.3;
    if (percentage >= 67) return 1.0;
    return 0.0;
  };

  const calculateGPA = () => {
    const totalPoints = grades.reduce((sum, grade) => sum + getGradePoints(grade.percentage), 0);
    return Math.round((totalPoints / grades.length) * 100) / 100;
  };

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

  const chartData = grades.map(grade => ({
    subject: grade.subject.split(' ')[0],
    percentage: grade.percentage,
    gpa: getGradePoints(grade.percentage)
  }));

  const pieData = grades.map((grade, index) => ({
    name: grade.subject,
    value: grade.percentage,
    color: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][index]
  }));

  const overallStats = {
    gpa: calculateGPA(),
    average: calculateOverallGPA(),
    totalAssignments: grades.reduce((sum, grade) => sum + grade.assignments.length, 0),
    totalTests: grades.reduce((sum, grade) => sum + grade.tests.length, 0),
    highestGrade: Math.max(...grades.map(g => g.percentage)),
    lowestGrade: Math.min(...grades.map(g => g.percentage))
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Grades</h1>
          <p className="text-muted-foreground">Track your academic performance and progress</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => onNavigate('assignments')}>
            <FileText className="h-4 w-4 mr-2" />
            Assignments
          </Button>
          <Button onClick={() => onNavigate('certificates')}>
            <Award className="h-4 w-4 mr-2" />
            Certificates
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <Select value={selectedSemester} onValueChange={setSelectedSemester}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select Semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">Current Semester</SelectItem>
                <SelectItem value="previous">Previous Semester</SelectItem>
                <SelectItem value="yearly">Full Year</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Subjects" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {grades.map((grade) => (
                  <SelectItem key={grade.subject} value={grade.subject}>
                    {grade.subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall GPA</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallStats.gpa}</div>
            <p className="text-xs text-muted-foreground">Out of 4.0</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallStats.average}%</div>
            <Progress value={overallStats.average} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assignments</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallStats.totalAssignments}</div>
            <p className="text-xs text-muted-foreground">Completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tests</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallStats.totalTests}</div>
            <p className="text-xs text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Grade Overview</TabsTrigger>
          <TabsTrigger value="subjects">Subject Details</TabsTrigger>
          <TabsTrigger value="analytics">Performance Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Subject Grades */}
            <Card>
              <CardHeader>
                <CardTitle>Current Grades by Subject</CardTitle>
                <CardDescription>Your current standing in each subject</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {grades.map((grade) => (
                    <div key={grade.subject} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <BookOpen className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{grade.subject}</p>
                          <p className="text-sm text-muted-foreground">{grade.teacher}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {getTrendIcon(grade.trend)}
                        <div className="text-right">
                          <Badge className={getGradeColor(grade.currentGrade)}>
                            {grade.currentGrade}
                          </Badge>
                          <p className="text-sm text-muted-foreground mt-1">
                            {grade.percentage}%
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Grade Distribution Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Grade Distribution</CardTitle>
                <CardDescription>Visual breakdown of your performance</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="percentage" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {grades.map((grade) => (
              <Card key={grade.subject}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{grade.subject}</CardTitle>
                      <CardDescription>Teacher: {grade.teacher}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      {getTrendIcon(grade.trend)}
                      <Badge className={getGradeColor(grade.currentGrade)}>
                        {grade.currentGrade} ({grade.percentage}%)
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="assignments" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="assignments">Assignments ({grade.assignments.length})</TabsTrigger>
                      <TabsTrigger value="tests">Tests ({grade.tests.length})</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="assignments" className="space-y-3">
                      {grade.assignments.map((assignment, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{assignment.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {assignment.type} • {new Date(assignment.date).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge className={getGradeColor(assignment.grade)}>
                              {assignment.grade}
                            </Badge>
                            <p className="text-sm text-muted-foreground mt-1">
                              {assignment.points}/{assignment.maxPoints}
                            </p>
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                    
                    <TabsContent value="tests" className="space-y-3">
                      {grade.tests.map((test, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{test.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(test.date).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge className={getGradeColor(test.grade)}>
                              {test.grade}
                            </Badge>
                            <p className="text-sm text-muted-foreground mt-1">
                              {test.percentage}%
                            </p>
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Comparison</CardTitle>
                <CardDescription>Your grades across all subjects</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Grade Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Grade Trends</CardTitle>
                <CardDescription>Performance improvement areas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      <span className="font-medium text-green-800">Improving Subjects</span>
                    </div>
                    <div className="space-y-1">
                      {grades.filter(g => g.trend === 'up').map(grade => (
                        <p key={grade.subject} className="text-sm text-green-700">
                          {grade.subject} ({grade.currentGrade})
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 bg-yellow-500 rounded-full" />
                      <span className="font-medium text-yellow-800">Stable Subjects</span>
                    </div>
                    <div className="space-y-1">
                      {grades.filter(g => g.trend === 'stable').map(grade => (
                        <p key={grade.subject} className="text-sm text-yellow-700">
                          {grade.subject} ({grade.currentGrade})
                        </p>
                      ))}
                    </div>
                  </div>

                  {grades.some(g => g.trend === 'down') && (
                    <div className="p-4 bg-red-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingDown className="h-5 w-5 text-red-600" />
                        <span className="font-medium text-red-800">Needs Attention</span>
                      </div>
                      <div className="space-y-1">
                        {grades.filter(g => g.trend === 'down').map(grade => (
                          <p key={grade.subject} className="text-sm text-red-700">
                            {grade.subject} ({grade.currentGrade})
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}