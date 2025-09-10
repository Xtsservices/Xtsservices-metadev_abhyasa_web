import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { 
  BookOpen,
  Upload,
  FileSpreadsheet,
  Plus,
  Edit,
  Save,
  Download,
  Users,
  TrendingUp,
  Award,
  Filter
} from 'lucide-react';
import { toast } from "sonner";

interface TeacherGradebookProps {
  onNavigate: (screen: string) => void;
}

interface StudentGrade {
  studentId: string;
  studentName: string;
  rollNumber: string;
  assignments: { [key: string]: number };
  tests: { [key: string]: number };
  totalMarks: number;
  percentage: number;
  grade: string;
}

interface Assignment {
  id: string;
  name: string;
  type: 'assignment' | 'test' | 'quiz' | 'project';
  maxMarks: number;
  date: string;
  subject: string;
}

export function TeacherGradebook({ onNavigate }: TeacherGradebookProps) {
  const [assignments] = useState<Assignment[]>([
    { id: '1', name: 'Math Assignment 1', type: 'assignment', maxMarks: 20, date: '2024-09-01', subject: 'Mathematics' },
    { id: '2', name: 'Unit Test 1', type: 'test', maxMarks: 50, date: '2024-09-05', subject: 'Mathematics' },
    { id: '3', name: 'Quiz 1', type: 'quiz', maxMarks: 10, date: '2024-09-10', subject: 'Mathematics' },
    { id: '4', name: 'Project 1', type: 'project', maxMarks: 30, date: '2024-09-15', subject: 'Mathematics' }
  ]);

  const [students, setStudents] = useState<StudentGrade[]>([
    {
      studentId: '1',
      studentName: 'Aarav Sharma',
      rollNumber: '001',
      assignments: { '1': 18, '3': 9 },
      tests: { '2': 45, '4': 28 },
      totalMarks: 100,
      percentage: 90.9,
      grade: 'A+'
    },
    {
      studentId: '2',
      studentName: 'Priya Patel',
      rollNumber: '002',
      assignments: { '1': 16, '3': 8 },
      tests: { '2': 42, '4': 25 },
      totalMarks: 91,
      percentage: 82.7,
      grade: 'A'
    },
    {
      studentId: '3',
      studentName: 'Rohan Singh',
      rollNumber: '003',
      assignments: { '1': 15, '3': 7 },
      tests: { '2': 38, '4': 22 },
      totalMarks: 82,
      percentage: 74.5,
      grade: 'B+'
    },
    {
      studentId: '4',
      studentName: 'Ananya Reddy',
      rollNumber: '004',
      assignments: { '1': 19, '3': 10 },
      tests: { '2': 47, '4': 29 },
      totalMarks: 105,
      percentage: 95.5,
      grade: 'A+'
    }
  ]);

  const [selectedClass, setSelectedClass] = useState('10A');
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [isAddAssignmentOpen, setIsAddAssignmentOpen] = useState(false);
  const [isBulkUploadOpen, setIsBulkUploadOpen] = useState(false);
  const [editingCell, setEditingCell] = useState<{studentId: string, assignmentId: string} | null>(null);
  const [editValue, setEditValue] = useState('');

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+':
        return 'bg-green-100 text-green-800';
      case 'A':
        return 'bg-blue-100 text-blue-800';
      case 'B+':
        return 'bg-yellow-100 text-yellow-800';
      case 'B':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-red-100 text-red-800';
    }
  };

  const handleCellEdit = (studentId: string, assignmentId: string, currentValue: number) => {
    setEditingCell({ studentId, assignmentId });
    setEditValue(currentValue.toString());
  };

  const handleSaveEdit = () => {
    if (!editingCell) return;
    
    const newValue = parseFloat(editValue);
    if (isNaN(newValue)) {
      toast.error("Please enter a valid number");
      return;
    }

    setStudents(prev => prev.map(student => {
      if (student.studentId === editingCell.studentId) {
        const assignment = assignments.find(a => a.id === editingCell.assignmentId);
        if (assignment && newValue > assignment.maxMarks) {
          toast.error(`Marks cannot exceed ${assignment.maxMarks}`);
          return student;
        }

        const updatedStudent = { ...student };
        if (assignment?.type === 'assignment' || assignment?.type === 'quiz' || assignment?.type === 'project') {
          updatedStudent.assignments = { ...student.assignments, [editingCell.assignmentId]: newValue };
        } else {
          updatedStudent.tests = { ...student.tests, [editingCell.assignmentId]: newValue };
        }
        
        // Recalculate totals
        const totalAssignments = Object.values(updatedStudent.assignments).reduce((sum, mark) => sum + mark, 0);
        const totalTests = Object.values(updatedStudent.tests).reduce((sum, mark) => sum + mark, 0);
        updatedStudent.totalMarks = totalAssignments + totalTests;
        
        const maxPossible = assignments.reduce((sum, assignment) => sum + assignment.maxMarks, 0);
        updatedStudent.percentage = (updatedStudent.totalMarks / maxPossible) * 100;
        
        // Calculate grade
        if (updatedStudent.percentage >= 90) updatedStudent.grade = 'A+';
        else if (updatedStudent.percentage >= 80) updatedStudent.grade = 'A';
        else if (updatedStudent.percentage >= 70) updatedStudent.grade = 'B+';
        else if (updatedStudent.percentage >= 60) updatedStudent.grade = 'B';
        else updatedStudent.grade = 'C';

        return updatedStudent;
      }
      return student;
    }));

    setEditingCell(null);
    toast.success("Grade updated successfully");
  };

  const averagePercentage = students.reduce((sum, student) => sum + student.percentage, 0) / students.length;
  const highestPercentage = Math.max(...students.map(s => s.percentage));
  const totalStudents = students.length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gradebook</h1>
          <p className="text-muted-foreground">Manage student grades and assessments</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isBulkUploadOpen} onOpenChange={setIsBulkUploadOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Bulk Upload
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Bulk Upload Grades</DialogTitle>
                <DialogDescription>
                  Upload student grades using Excel file
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Select Assignment/Test</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose assignment" />
                    </SelectTrigger>
                    <SelectContent>
                      {assignments.map(assignment => (
                        <SelectItem key={assignment.id} value={assignment.id}>
                          {assignment.name} (Max: {assignment.maxMarks})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Upload Excel File</Label>
                  <Input type="file" accept=".xlsx,.xls,.csv" />
                  <p className="text-xs text-muted-foreground">
                    Upload Excel file with columns: Roll Number, Student Name, Marks
                  </p>
                </div>
                <Button variant="outline" className="w-full">
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Download Template
                </Button>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsBulkUploadOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => {
                  toast.success("Grades uploaded successfully");
                  setIsBulkUploadOpen(false);
                }}>
                  Upload Grades
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Dialog open={isAddAssignmentOpen} onOpenChange={setIsAddAssignmentOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Assessment
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Assessment</DialogTitle>
                <DialogDescription>
                  Create a new assignment, test, or quiz
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label>Assessment Name</Label>
                  <Input placeholder="e.g., Unit Test 2" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="assignment">Assignment</SelectItem>
                        <SelectItem value="test">Test</SelectItem>
                        <SelectItem value="quiz">Quiz</SelectItem>
                        <SelectItem value="project">Project</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Maximum Marks</Label>
                    <Input type="number" placeholder="e.g., 50" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input type="date" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddAssignmentOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => {
                  toast.success("Assessment added successfully");
                  setIsAddAssignmentOpen(false);
                }}>
                  Create Assessment
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="space-y-2">
              <Label>Class</Label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10A">10A</SelectItem>
                  <SelectItem value="10B">10B</SelectItem>
                  <SelectItem value="11A">11A</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Subject</Label>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Chemistry">Chemistry</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Apply Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Class Average</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averagePercentage.toFixed(1)}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Highest Score</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{highestPercentage.toFixed(1)}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Gradebook Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Class {selectedClass} - {selectedSubject}</CardTitle>
              <CardDescription>Click on any cell to edit marks</CardDescription>
            </div>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">Roll</TableHead>
                  <TableHead>Student Name</TableHead>
                  {assignments.map(assignment => (
                    <TableHead key={assignment.id} className="text-center">
                      {assignment.name}
                      <br />
                      <span className="text-xs text-muted-foreground">
                        ({assignment.maxMarks} marks)
                      </span>
                    </TableHead>
                  ))}
                  <TableHead className="text-center">Total</TableHead>
                  <TableHead className="text-center">%</TableHead>
                  <TableHead className="text-center">Grade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map(student => (
                  <TableRow key={student.studentId}>
                    <TableCell className="font-medium">{student.rollNumber}</TableCell>
                    <TableCell>{student.studentName}</TableCell>
                    {assignments.map(assignment => {
                      const marks = assignment.type === 'assignment' || assignment.type === 'quiz' || assignment.type === 'project'
                        ? student.assignments[assignment.id]
                        : student.tests[assignment.id];
                      
                      const isEditing = editingCell?.studentId === student.studentId && editingCell?.assignmentId === assignment.id;
                      
                      return (
                        <TableCell key={assignment.id} className="text-center">
                          {isEditing ? (
                            <div className="flex items-center gap-1">
                              <Input
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                className="w-16 text-center"
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') handleSaveEdit();
                                  if (e.key === 'Escape') setEditingCell(null);
                                }}
                              />
                              <Button size="sm" variant="ghost" onClick={handleSaveEdit}>
                                <Save className="h-3 w-3" />
                              </Button>
                            </div>
                          ) : (
                            <span 
                              className="cursor-pointer hover:bg-muted rounded px-2 py-1"
                              onClick={() => handleCellEdit(student.studentId, assignment.id, marks || 0)}
                            >
                              {marks || '-'}
                            </span>
                          )}
                        </TableCell>
                      );
                    })}
                    <TableCell className="text-center font-medium">{student.totalMarks}</TableCell>
                    <TableCell className="text-center">{student.percentage.toFixed(1)}%</TableCell>
                    <TableCell className="text-center">
                      <Badge className={getGradeColor(student.grade)}>
                        {student.grade}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}