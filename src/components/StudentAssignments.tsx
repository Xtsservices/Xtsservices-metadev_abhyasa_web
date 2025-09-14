import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { 
  FileText, 
  Calendar, 
  Clock, 
  BookOpen, 
  CheckCircle, 
  AlertCircle, 
  Search, 
  Filter, 
  Download, 
  Upload,
  Eye,
  User,
  Target,
  TrendingUp
} from 'lucide-react';

interface StudentAssignmentsProps {
  onNavigate: (screen: import("../App").Screen) => void;
}

interface Assignment {
  id: string;
  title: string;
  description: string;
  subject: string;
  teacher: string;
  dueDate: string;
  assignedDate: string;
  status: 'pending' | 'submitted' | 'graded' | 'overdue';
  priority: 'high' | 'medium' | 'low';
  points: number;
  maxPoints: number;
  grade?: string;
  feedback?: string;
  type: 'homework' | 'project' | 'quiz' | 'exam' | 'essay';
  attachments?: string[];
  submissionFile?: string;
}

export function StudentAssignments({ onNavigate }: StudentAssignmentsProps) {
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('pending');

  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History'];

  const assignments: Assignment[] = [
    {
      id: '1',
      title: 'Calculus Problem Set 5',
      description: 'Complete problems 1-20 from Chapter 8: Integration by Parts. Show all work and provide detailed explanations.',
      subject: 'Mathematics',
      teacher: 'Dr. Sarah Wilson',
      dueDate: '2024-09-10T23:59:00',
      assignedDate: '2024-09-03T09:00:00',
      status: 'pending',
      priority: 'high',
      points: 0,
      maxPoints: 50,
      type: 'homework',
      attachments: ['Chapter8_Problems.pdf', 'Integration_Examples.pdf']
    },
    {
      id: '2',
      title: 'Physics Lab Report - Pendulum Motion',
      description: 'Write a comprehensive lab report analyzing pendulum motion experiments. Include data analysis, graphs, and conclusions.',
      subject: 'Physics',
      teacher: 'Mr. Robert Johnson',
      dueDate: '2024-09-08T18:00:00',
      assignedDate: '2024-08-30T10:00:00',
      status: 'submitted',
      priority: 'medium',
      points: 42,
      maxPoints: 50,
      grade: 'B+',
      type: 'project',
      submissionFile: 'Physics_Lab_Report.pdf',
      feedback: 'Good analysis and data presentation. Consider adding more detailed error analysis for higher marks.'
    },
    {
      id: '3',
      title: 'Organic Chemistry Quiz 3',
      description: 'Online quiz covering alkenes, alkynes, and aromatic compounds. 25 multiple choice questions.',
      subject: 'Chemistry',
      teacher: 'Dr. Emily Brown',
      dueDate: '2024-09-06T15:30:00',
      assignedDate: '2024-09-02T08:00:00',
      status: 'graded',
      priority: 'high',
      points: 23,
      maxPoints: 25,
      grade: 'A-',
      type: 'quiz',
      feedback: 'Excellent understanding of aromatic compound properties. Minor error in alkyne naming.'
    },
    {
      id: '4',
      title: 'Cell Division Research Paper',
      description: 'Write a 1500-word research paper on mitosis and meiosis. Include at least 5 peer-reviewed sources.',
      subject: 'Biology',
      teacher: 'Ms. Jennifer Davis',
      dueDate: '2024-09-15T23:59:00',
      assignedDate: '2024-08-25T09:00:00',
      status: 'pending',
      priority: 'medium',
      points: 0,
      maxPoints: 100,
      type: 'essay'
    },
    {
      id: '5',
      title: 'Shakespeare Essay - Hamlet Analysis',
      description: 'Analyze the theme of revenge in Hamlet. 800-1000 words with textual evidence and literary analysis.',
      subject: 'English',
      teacher: 'Mrs. Lisa Wilson',
      dueDate: '2024-09-05T23:59:00',
      assignedDate: '2024-08-28T14:00:00',
      status: 'overdue',
      priority: 'high',
      points: 0,
      maxPoints: 75,
      type: 'essay'
    },
    {
      id: '6',
      title: 'World War II Timeline Project',
      description: 'Create an interactive timeline of major World War II events. Include dates, descriptions, and images.',
      subject: 'History',
      teacher: 'Mr. David Taylor',
      dueDate: '2024-09-12T23:59:00',
      assignedDate: '2024-09-01T11:00:00',
      status: 'pending',
      priority: 'medium',
      points: 0,
      maxPoints: 60,
      type: 'project'
    },
    {
      id: '7',
      title: 'Trigonometry Practice Test',
      description: 'Practice test covering sine, cosine, tangent functions and their applications.',
      subject: 'Mathematics',
      teacher: 'Dr. Sarah Wilson',
      dueDate: '2024-09-04T16:00:00',
      assignedDate: '2024-08-29T09:00:00',
      status: 'graded',
      priority: 'low',
      points: 38,
      maxPoints: 40,
      grade: 'A',
      type: 'exam',
      feedback: 'Excellent work! Strong understanding of trigonometric concepts.'
    }
  ];

  const filteredAssignments = assignments.filter(assignment => {
    const subjectMatch = selectedSubject === 'all' || assignment.subject === selectedSubject;
    const statusMatch = selectedStatus === 'all' || assignment.status === selectedStatus;
    const searchMatch = searchTerm === '' || 
      assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.teacher.toLowerCase().includes(searchTerm.toLowerCase());
    
    return subjectMatch && statusMatch && searchMatch;
  });

  const getTabAssignments = (status: string) => {
    if (status === 'pending') return assignments.filter(a => a.status === 'pending');
    if (status === 'submitted') return assignments.filter(a => a.status === 'submitted');
    if (status === 'graded') return assignments.filter(a => a.status === 'graded');
    if (status === 'overdue') return assignments.filter(a => a.status === 'overdue');
    return assignments;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-blue-600 border-blue-600">Pending</Badge>;
      case 'submitted':
        return <Badge className="bg-yellow-100 text-yellow-800">Submitted</Badge>;
      case 'graded':
        return <Badge className="bg-green-100 text-green-800">Graded</Badge>;
      case 'overdue':
        return <Badge variant="destructive">Overdue</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-4 border-l-red-500';
      case 'medium':
        return 'border-l-4 border-l-yellow-500';
      case 'low':
        return 'border-l-4 border-l-green-500';
      default:
        return '';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'homework':
        return <BookOpen className="h-4 w-4 text-blue-600" />;
      case 'project':
        return <Target className="h-4 w-4 text-purple-600" />;
      case 'quiz':
        return <Clock className="h-4 w-4 text-orange-600" />;
      case 'exam':
        return <FileText className="h-4 w-4 text-red-600" />;
      case 'essay':
        return <User className="h-4 w-4 text-green-600" />;
      default:
        return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const calculateOverallProgress = () => {
    const completed = assignments.filter(a => a.status === 'graded').length;
    return Math.round((completed / assignments.length) * 100);
  };

  const calculateGPA = () => {
    const gradedAssignments = assignments.filter(a => a.status === 'graded');
    if (gradedAssignments.length === 0) return 0;
    
    const totalPoints = gradedAssignments.reduce((sum, a) => sum + a.points, 0);
    const totalMaxPoints = gradedAssignments.reduce((sum, a) => sum + a.maxPoints, 0);
    
    return Math.round((totalPoints / totalMaxPoints) * 100);
  };

  const stats = {
    total: assignments.length,
    pending: assignments.filter(a => a.status === 'pending').length,
    submitted: assignments.filter(a => a.status === 'submitted').length,
    graded: assignments.filter(a => a.status === 'graded').length,
    overdue: assignments.filter(a => a.status === 'overdue').length,
    progress: calculateOverallProgress(),
    gpa: calculateGPA()
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Assignments</h1>
          <p className="text-muted-foreground">Track and manage your academic assignments</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => onNavigate('schedule')}>
            <Calendar className="h-4 w-4 mr-2" />
            View Schedule
          </Button>
          <Button onClick={() => onNavigate('grades')}>
            <TrendingUp className="h-4 w-4 mr-2" />
            Grades
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assignments</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">This semester</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">Need to complete</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.progress}%</div>
            <Progress value={stats.progress} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.gpa}%</div>
            <p className="text-xs text-muted-foreground">From graded work</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filters:</span>
            </div>
            
            <div className="flex-1 relative max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search assignments..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Subjects" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="submitted">Submitted</SelectItem>
                <SelectItem value="graded">Graded</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Assignments Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="pending">Pending ({stats.pending})</TabsTrigger>
          <TabsTrigger value="submitted">Submitted ({stats.submitted})</TabsTrigger>
          <TabsTrigger value="graded">Graded ({stats.graded})</TabsTrigger>
          <TabsTrigger value="overdue">Overdue ({stats.overdue})</TabsTrigger>
          <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
        </TabsList>

        {['pending', 'submitted', 'graded', 'overdue', 'all'].map((tab) => (
          <TabsContent key={tab} value={tab} className="space-y-4">
            {getTabAssignments(tab).length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No assignments found</h3>
                  <p className="text-muted-foreground">No assignments in this category.</p>
                </CardContent>
              </Card>
            ) : (
              getTabAssignments(tab).map((assignment) => (
                <Card key={assignment.id} className={`${getPriorityColor(assignment.priority)}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                          {getTypeIcon(assignment.type)}
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold">{assignment.title}</h3>
                            {getStatusBadge(assignment.status)}
                            {assignment.priority === 'high' && (
                              <Badge variant="destructive" className="text-xs">High Priority</Badge>
                            )}
                          </div>
                          
                          <p className="text-muted-foreground">{assignment.description}</p>
                          
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <BookOpen className="h-4 w-4" />
                              {assignment.subject}
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              {assignment.teacher}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              Due: {new Date(assignment.dueDate).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <Target className="h-4 w-4" />
                              {assignment.points}/{assignment.maxPoints} points
                            </div>
                          </div>

                          {assignment.grade && (
                            <div className="flex items-center gap-4">
                              <Badge className="bg-green-100 text-green-800">
                                Grade: {assignment.grade}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                {assignment.points}/{assignment.maxPoints} points
                              </span>
                            </div>
                          )}

                          {assignment.feedback && (
                            <div className="p-3 bg-muted rounded-lg">
                              <p className="text-sm"><strong>Feedback:</strong> {assignment.feedback}</p>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2 ml-4">
                        {assignment.status === 'pending' && (
                          <Button size="sm">
                            <Upload className="h-4 w-4 mr-2" />
                            Submit
                          </Button>
                        )}
                        {assignment.attachments && assignment.attachments.length > 0 && (
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Materials
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}