import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { 
  Search,
  Plus,
  Download,
  Edit,
  Eye,
  Users,
  BookOpen,
  Calendar,
  Clock,
  TrendingUp,
  GraduationCap,
  UserCheck,
  School
} from 'lucide-react';
import { toast } from "sonner";

interface ClassesManagementProps {
  onNavigate: (screen: string) => void;
}

interface ClassInfo {
  id: string;
  name: string;
  section: string;
  grade: string;
  classTeacher: {
    name: string;
    avatar?: string;
  };
  subjects: string[];
  totalStudents: number;
  capacity: number;
  schedule: {
    startTime: string;
    endTime: string;
    days: string[];
  };
  room: string;
  averageAttendance: number;
  academicYear: string;
  status: 'active' | 'inactive';
}

export function ClassesManagement({ onNavigate }: ClassesManagementProps) {
  const [classes] = useState<ClassInfo[]>([
    {
      id: '1',
      name: 'Class 10A',
      section: 'A',
      grade: '10',
      classTeacher: {
        name: 'Dr. Priya Sharma',
        avatar: undefined
      },
      subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English'],
      totalStudents: 35,
      capacity: 40,
      schedule: {
        startTime: '08:00',
        endTime: '14:00',
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
      },
      room: 'Room 101',
      averageAttendance: 95,
      academicYear: '2024-25',
      status: 'active'
    },
    {
      id: '2',
      name: 'Class 10B',
      section: 'B',
      grade: '10',
      classTeacher: {
        name: 'Rajesh Kumar',
        avatar: undefined
      },
      subjects: ['Mathematics', 'Physics', 'Chemistry', 'English', 'Hindi'],
      totalStudents: 38,
      capacity: 40,
      schedule: {
        startTime: '08:00',
        endTime: '14:00',
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
      },
      room: 'Room 102',
      averageAttendance: 92,
      academicYear: '2024-25',
      status: 'active'
    },
    {
      id: '3',
      name: 'Class 9A',
      section: 'A',
      grade: '9',
      classTeacher: {
        name: 'Sneha Patel',
        avatar: undefined
      },
      subjects: ['Mathematics', 'Science', 'English', 'Social Studies', 'Hindi'],
      totalStudents: 32,
      capacity: 35,
      schedule: {
        startTime: '08:00',
        endTime: '13:30',
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
      },
      room: 'Room 201',
      averageAttendance: 97,
      academicYear: '2024-25',
      status: 'active'
    },
    {
      id: '4',
      name: 'Class 11A',
      section: 'A',
      grade: '11',
      classTeacher: {
        name: 'Amit Singh',
        avatar: undefined
      },
      subjects: ['Physics', 'Chemistry', 'Mathematics', 'English', 'Physical Education'],
      totalStudents: 28,
      capacity: 35,
      schedule: {
        startTime: '08:00',
        endTime: '15:00',
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      },
      room: 'Room 301',
      averageAttendance: 89,
      academicYear: '2024-25',
      status: 'active'
    },
    {
      id: '5',
      name: 'Class 8C',
      section: 'C',
      grade: '8',
      classTeacher: {
        name: 'Kavya Reddy',
        avatar: undefined
      },
      subjects: ['Mathematics', 'Science', 'English', 'Social Studies', 'Computer Science'],
      totalStudents: 30,
      capacity: 35,
      schedule: {
        startTime: '08:00',
        endTime: '13:30',
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
      },
      room: 'Computer Lab 1',
      averageAttendance: 94,
      academicYear: '2024-25',
      status: 'active'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<ClassInfo | null>(null);

  const filteredClasses = classes.filter(classInfo => {
    const matchesSearch = classInfo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         classInfo.classTeacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         classInfo.room.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = selectedGrade === 'all' || classInfo.grade === selectedGrade;
    const matchesStatus = selectedStatus === 'all' || classInfo.status === selectedStatus;
    return matchesSearch && matchesGrade && matchesStatus;
  });

  const totalClasses = classes.length;
  const totalStudents = classes.reduce((acc, c) => acc + c.totalStudents, 0);
  const avgAttendance = Math.round(classes.reduce((acc, c) => acc + c.averageAttendance, 0) / classes.length);
  const totalCapacity = classes.reduce((acc, c) => acc + c.capacity, 0);

  const handleViewClass = (classInfo: ClassInfo) => {
    setSelectedClass(classInfo);
    setIsViewDialogOpen(true);
  };

  const handleEditClass = (classInfo: ClassInfo) => {
    setSelectedClass(classInfo);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Classes Management</h1>
          <p className="text-muted-foreground">Organize and manage class schedules, assignments, and student groups</p>
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
                Add Class
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Class</DialogTitle>
                <DialogDescription>
                  Create a new class and assign teachers and subjects.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="grade">Grade</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select grade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6">Grade 6</SelectItem>
                        <SelectItem value="7">Grade 7</SelectItem>
                        <SelectItem value="8">Grade 8</SelectItem>
                        <SelectItem value="9">Grade 9</SelectItem>
                        <SelectItem value="10">Grade 10</SelectItem>
                        <SelectItem value="11">Grade 11</SelectItem>
                        <SelectItem value="12">Grade 12</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="section">Section</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select section" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A">Section A</SelectItem>
                        <SelectItem value="B">Section B</SelectItem>
                        <SelectItem value="C">Section C</SelectItem>
                        <SelectItem value="D">Section D</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="capacity">Capacity</Label>
                    <Input id="capacity" type="number" placeholder="e.g., 40" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="classTeacher">Class Teacher</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select teacher" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="teacher1">Dr. Priya Sharma</SelectItem>
                        <SelectItem value="teacher2">Rajesh Kumar</SelectItem>
                        <SelectItem value="teacher3">Sneha Patel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="room">Room</Label>
                    <Input id="room" placeholder="e.g., Room 103" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input id="startTime" type="time" defaultValue="08:00" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endTime">End Time</Label>
                    <Input id="endTime" type="time" defaultValue="14:00" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subjects">Subjects (comma separated)</Label>
                  <Textarea id="subjects" placeholder="e.g., Mathematics, Physics, Chemistry, English" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => {
                  toast.success("Class created successfully");
                  setIsAddDialogOpen(false);
                }}>
                  Create Class
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
            <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
            <School className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClasses}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              All active classes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents}</div>
            <p className="text-xs text-muted-foreground">
              Across all classes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Attendance</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgAttendance}%</div>
            <p className="text-xs text-muted-foreground">
              Class attendance rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Capacity Utilization</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round((totalStudents / totalCapacity) * 100)}%</div>
            <p className="text-xs text-muted-foreground">
              {totalStudents}/{totalCapacity} students
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Class Directory</CardTitle>
          <CardDescription>Manage all classes, schedules, and assignments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by class name, teacher, or room..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Select value={selectedGrade} onValueChange={setSelectedGrade}>
              <SelectTrigger className="w-full md:w-32">
                <SelectValue placeholder="Grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Grades</SelectItem>
                <SelectItem value="6">Grade 6</SelectItem>
                <SelectItem value="7">Grade 7</SelectItem>
                <SelectItem value="8">Grade 8</SelectItem>
                <SelectItem value="9">Grade 9</SelectItem>
                <SelectItem value="10">Grade 10</SelectItem>
                <SelectItem value="11">Grade 11</SelectItem>
                <SelectItem value="12">Grade 12</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full md:w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Classes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClasses.map((classInfo) => (
              <Card key={classInfo.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{classInfo.name}</CardTitle>
                      <CardDescription>Grade {classInfo.grade} - Section {classInfo.section}</CardDescription>
                    </div>
                    <Badge variant={classInfo.status === 'active' ? 'default' : 'secondary'}>
                      {classInfo.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Class Teacher */}
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={classInfo.classTeacher.avatar} />
                      <AvatarFallback>
                        {classInfo.classTeacher.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{classInfo.classTeacher.name}</p>
                      <p className="text-xs text-muted-foreground">Class Teacher</p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-lg font-bold text-blue-600">{classInfo.totalStudents}</div>
                      <div className="text-xs text-muted-foreground">Students</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-lg font-bold text-green-600">{classInfo.averageAttendance}%</div>
                      <div className="text-xs text-muted-foreground">Attendance</div>
                    </div>
                  </div>

                  {/* Schedule */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{classInfo.schedule.startTime} - {classInfo.schedule.endTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <span>{classInfo.room}</span>
                    </div>
                  </div>

                  {/* Subjects */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Subjects:</p>
                    <div className="flex flex-wrap gap-1">
                      {classInfo.subjects.slice(0, 3).map((subject, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                      {classInfo.subjects.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{classInfo.subjects.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4">
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => handleViewClass(classInfo)}>
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEditClass(classInfo)}>
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredClasses.length === 0 && (
            <div className="text-center py-12">
              <School className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-medium">No classes found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Try adjusting your search criteria or add a new class.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Class Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Class Details</DialogTitle>
            <DialogDescription>
              Complete information about {selectedClass?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedClass && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Class Information</Label>
                    <div className="mt-1 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Class Name:</span>
                        <span className="text-sm font-medium">{selectedClass.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Grade:</span>
                        <span className="text-sm font-medium">{selectedClass.grade}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Section:</span>
                        <span className="text-sm font-medium">{selectedClass.section}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Room:</span>
                        <span className="text-sm font-medium">{selectedClass.room}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">Class Teacher</Label>
                    <div className="mt-1 flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={selectedClass.classTeacher.avatar} />
                        <AvatarFallback>
                          {selectedClass.classTeacher.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{selectedClass.classTeacher.name}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Schedule</Label>
                    <div className="mt-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{selectedClass.schedule.startTime} - {selectedClass.schedule.endTime}</span>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Days: </span>
                        {selectedClass.schedule.days.join(', ')}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">Statistics</Label>
                    <div className="mt-1 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Students:</span>
                        <span className="text-sm font-medium">{selectedClass.totalStudents}/{selectedClass.capacity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Attendance:</span>
                        <span className="text-sm font-medium text-green-600">{selectedClass.averageAttendance}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Academic Year:</span>
                        <span className="text-sm font-medium">{selectedClass.academicYear}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium">Subjects</Label>
                <div className="mt-1 flex flex-wrap gap-2">
                  {selectedClass.subjects.map((subject, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
            <Button onClick={() => {
              setIsViewDialogOpen(false);
              if (selectedClass) handleEditClass(selectedClass);
            }}>
              Edit Class
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Class Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Class</DialogTitle>
            <DialogDescription>
              Update class information for {selectedClass?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedClass && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-grade">Grade</Label>
                  <Select defaultValue={selectedClass.grade}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6">Grade 6</SelectItem>
                      <SelectItem value="7">Grade 7</SelectItem>
                      <SelectItem value="8">Grade 8</SelectItem>
                      <SelectItem value="9">Grade 9</SelectItem>
                      <SelectItem value="10">Grade 10</SelectItem>
                      <SelectItem value="11">Grade 11</SelectItem>
                      <SelectItem value="12">Grade 12</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-section">Section</Label>
                  <Select defaultValue={selectedClass.section}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">Section A</SelectItem>
                      <SelectItem value="B">Section B</SelectItem>
                      <SelectItem value="C">Section C</SelectItem>
                      <SelectItem value="D">Section D</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-capacity">Capacity</Label>
                  <Input id="edit-capacity" type="number" defaultValue={selectedClass.capacity} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-room">Room</Label>
                  <Input id="edit-room" defaultValue={selectedClass.room} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select defaultValue={selectedClass.status}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-startTime">Start Time</Label>
                  <Input id="edit-startTime" type="time" defaultValue={selectedClass.schedule.startTime} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-endTime">End Time</Label>
                  <Input id="edit-endTime" type="time" defaultValue={selectedClass.schedule.endTime} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-subjects">Subjects (comma separated)</Label>
                <Textarea id="edit-subjects" defaultValue={selectedClass.subjects.join(', ')} />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              toast.success("Class information updated successfully");
              setIsEditDialogOpen(false);
            }}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}