import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { 
  Search,
  Plus,
  Download,
  Edit,
  Eye,
  Calendar as CalendarIcon,
  Clock,
  BookOpen,
  Users,
  CheckCircle,
  AlertCircle,
  FileText,
  PaperclipIcon
} from 'lucide-react';
import { toast } from "sonner";

interface AssignmentsManagementProps {
  onNavigate: (screen: string) => void;
}

interface Assignment {
  id: string;
  title: string;
  subject: string;
  class: string;
  description: string;
  dueDate: string;
  assignedDate: string;
  maxMarks: number;
  type: 'homework' | 'project' | 'test' | 'quiz';
  status: 'draft' | 'published' | 'completed';

  attachments?: string[];
}

export function AssignmentsManagement({ onNavigate }: AssignmentsManagementProps) {
  const [assignments] = useState<Assignment[]>([
    {
      id: '1',
      title: 'Quadratic Equations Problem Set',
      subject: 'Mathematics',
      class: '10A',
      description: 'Solve the given quadratic equations using different methods including factoring, completing the square, and quadratic formula.',
      dueDate: '2024-09-10',
      assignedDate: '2024-09-03',
      maxMarks: 50,
      type: 'homework',
      status: 'published',
      attachments: ['problem_set.pdf', 'formula_sheet.pdf']
    },
    {
      id: '2',
      title: 'Physics Lab Report - Motion Study',
      subject: 'Physics',
      class: '10A',
      description: 'Write a comprehensive lab report on the motion study experiment conducted last week.',
      dueDate: '2024-09-08',
      assignedDate: '2024-09-01',
      maxMarks: 30,
      type: 'project',
      status: 'published',
      attachments: ['lab_guidelines.pdf']
    },
    {
      id: '3',
      title: 'English Literature Essay',
      subject: 'English',
      class: '10B',
      description: 'Write a 500-word essay on the theme of friendship in "To Kill a Mockingbird".',
      dueDate: '2024-09-12',
      assignedDate: '2024-09-05',
      maxMarks: 40,
      type: 'homework',
      status: 'published'
    },
    {
      id: '4',
      title: 'Chemistry Quiz - Atomic Structure',
      subject: 'Chemistry',
      class: '11A',
      description: 'Online quiz covering atomic structure, electron configuration, and periodic trends.',
      dueDate: '2024-09-06',
      assignedDate: '2024-09-04',
      maxMarks: 25,
      type: 'quiz',
      status: 'completed'
    },
    {
      id: '5',
      title: 'History Research Project',
      subject: 'History',
      class: '9A',
      description: 'Research and prepare a presentation on the Indian Independence Movement.',
      dueDate: '2024-09-20',
      assignedDate: '2024-09-02',
      maxMarks: 60,
      type: 'project',
      status: 'published'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [activeTab, setActiveTab] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [dueDate, setDueDate] = useState<Date>();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'homework':
        return 'bg-blue-100 text-blue-800';
      case 'project':
        return 'bg-purple-100 text-purple-800';
      case 'test':
        return 'bg-red-100 text-red-800';
      case 'quiz':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.class.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || assignment.subject === selectedSubject;
    const matchesStatus = selectedStatus === 'all' || assignment.status === selectedStatus;
    const matchesTab = activeTab === 'all' || assignment.status === activeTab;
    return matchesSearch && matchesSubject && matchesStatus && matchesTab;
  });



  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'English', 'History', 'Biology'];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Assignments</h1>
          <p className="text-muted-foreground">Create, manage, and track student assignments</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => toast.success("Export started")}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Assignment
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Assignment</DialogTitle>
                <DialogDescription>
                  Fill in the assignment details to create a new task for students.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Assignment Title</Label>
                    <Input id="title" placeholder="e.g., Quadratic Equations" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map(subject => (
                          <SelectItem key={subject} value={subject.toLowerCase()}>{subject}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="class">Class</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10a">Class 10A</SelectItem>
                        <SelectItem value="10b">Class 10B</SelectItem>
                        <SelectItem value="11a">Class 11A</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="homework">Homework</SelectItem>
                        <SelectItem value="project">Project</SelectItem>
                        <SelectItem value="test">Test</SelectItem>
                        <SelectItem value="quiz">Quiz</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxMarks">Max Marks</Label>
                    <Input id="maxMarks" type="number" placeholder="e.g., 50" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Provide detailed instructions for the assignment..." 
                    className="min-h-[100px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Due Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dueDate ? dueDate.toDateString() : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={dueDate}
                        onSelect={setDueDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => {
                  toast.success("Assignment created successfully");
                  setIsAddDialogOpen(false);
                }}>
                  Create Assignment
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assignments</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assignments.length}</div>
            <p className="text-xs text-muted-foreground">
              Across all subjects
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assignments.filter(a => a.status === 'published').length}</div>
            <p className="text-xs text-muted-foreground">
              Active assignments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Draft Assignments</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {assignments.filter(a => a.status === 'draft').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Assignments in draft
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {assignments.filter(a => a.status === 'completed').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Finished assignments
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Assignments</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="draft">Drafts</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <AssignmentsList />
        </TabsContent>
        <TabsContent value="published" className="space-y-4">
          <AssignmentsList />
        </TabsContent>
        <TabsContent value="draft" className="space-y-4">
          <AssignmentsList />
        </TabsContent>
        <TabsContent value="completed" className="space-y-4">
          <AssignmentsList />
        </TabsContent>
      </Tabs>
    </div>
  );

  function AssignmentsList() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Assignment Management</CardTitle>
          <CardDescription>Create, edit, and track student assignments</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search assignments..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {subjects.map(subject => (
                  <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Assignments List */}
          <div className="space-y-4">
            {filteredAssignments.map((assignment) => (
              <Card key={assignment.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-lg">{assignment.title}</h3>
                      <Badge className={`${getStatusColor(assignment.status)} text-xs`}>
                        {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                      </Badge>
                      <Badge className={`${getTypeColor(assignment.type)} text-xs`}>
                        {assignment.type.charAt(0).toUpperCase() + assignment.type.slice(1)}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        <span>{assignment.subject} • {assignment.class}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="h-4 w-4" />
                        <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>Max: {assignment.maxMarks} marks</span>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      {assignment.description}
                    </p>

                    {assignment.attachments && assignment.attachments.length > 0 && (
                      <div className="flex items-center gap-2">
                        <PaperclipIcon className="h-4 w-4 text-muted-foreground" />
                        <div className="flex gap-2">
                          {assignment.attachments.map((file, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {file}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="ml-6 space-y-4">
                    {/* Assignment Status */}
                    <div className="text-right">
                      <div className="text-sm font-medium">Due Date</div>
                      <div className="text-lg font-bold text-blue-600">
                        {new Date(assignment.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {Math.ceil((new Date(assignment.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days left
                      </div>
                    </div>

                    {/* Assignment Info */}
                    <div className="text-right">
                      <div className="text-sm font-medium">Max Marks</div>
                      <div className="text-lg font-bold text-green-600">
                        {assignment.maxMarks}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Points possible
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredAssignments.length === 0 && (
            <div className="text-center py-12">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-medium">No assignments found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Create your first assignment to get started.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }
}