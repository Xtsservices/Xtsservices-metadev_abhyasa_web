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
  UserPlus,
  Download,
  Edit,
  Eye,
  Mail,
  Phone,
  BookOpen,
  Calendar,
  Award,
  TrendingUp,
  Users,
  GraduationCap,
  Clock
} from 'lucide-react';
import { toast } from "sonner";

interface TeachersManagementProps {
  onNavigate: (screen: string) => void;
}

interface Teacher {
  id: string;
  name: string;
  employeeId: string;
  email: string;
  phone: string;
  subjects: string[];
  classes: string[];
  department: string;
  qualification: string;
  experience: number;
  joiningDate: string;
  status: 'active' | 'inactive' | 'on_leave';
  avatar?: string;
  totalClasses: number;
  attendanceRate: number;
  rating: number;
  salary: number;
}

export function TeachersManagement({ onNavigate }: TeachersManagementProps) {
  const [teachers] = useState<Teacher[]>([
    {
      id: '1',
      name: 'Dr. Priya Sharma',
      employeeId: 'EMP001',
      email: 'priya.sharma@school.edu',
      phone: '+91 98765 43210',
      subjects: ['Mathematics', 'Physics'],
      classes: ['10A', '10B', '11A'],
      department: 'Science',
      qualification: 'M.Sc, Ph.D Mathematics',
      experience: 8,
      joiningDate: '2020-06-15',
      status: 'active',
      totalClasses: 24,
      attendanceRate: 98,
      rating: 4.8,
      salary: 75000
    },
    {
      id: '2',
      name: 'Rajesh Kumar',
      employeeId: 'EMP002',
      email: 'rajesh.kumar@school.edu',
      phone: '+91 87654 32109',
      subjects: ['English', 'Literature'],
      classes: ['9A', '9B', '10C'],
      department: 'Languages',
      qualification: 'M.A English Literature',
      experience: 12,
      joiningDate: '2018-04-20',
      status: 'active',
      totalClasses: 18,
      attendanceRate: 95,
      rating: 4.6,
      salary: 68000
    },
    {
      id: '3',
      name: 'Sneha Patel',
      employeeId: 'EMP003',
      email: 'sneha.patel@school.edu',
      phone: '+91 76543 21098',
      subjects: ['Chemistry', 'Biology'],
      classes: ['11A', '11B', '12A'],
      department: 'Science',
      qualification: 'M.Sc Chemistry, B.Ed',
      experience: 6,
      joiningDate: '2021-08-10',
      status: 'active',
      totalClasses: 20,
      attendanceRate: 97,
      rating: 4.7,
      salary: 65000
    },
    {
      id: '4',
      name: 'Amit Singh',
      employeeId: 'EMP004',
      email: 'amit.singh@school.edu',
      phone: '+91 65432 10987',
      subjects: ['History', 'Geography'],
      classes: ['8A', '8B', '9C'],
      department: 'Social Science',
      qualification: 'M.A History',
      experience: 10,
      joiningDate: '2019-01-15',
      status: 'on_leave',
      totalClasses: 16,
      attendanceRate: 92,
      rating: 4.4,
      salary: 58000
    },
    {
      id: '5',
      name: 'Kavya Reddy',
      employeeId: 'EMP005',
      email: 'kavya.reddy@school.edu',
      phone: '+91 54321 09876',
      subjects: ['Computer Science', 'IT'],
      classes: ['11A', '12A', '12B'],
      department: 'Technology',
      qualification: 'B.Tech Computer Science, M.Tech',
      experience: 5,
      joiningDate: '2022-03-01',
      status: 'active',
      totalClasses: 22,
      attendanceRate: 99,
      rating: 4.9,
      salary: 72000
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'on_leave':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'on_leave':
        return 'On Leave';
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.subjects.some(subject => subject.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDepartment = selectedDepartment === 'all' || teacher.department === selectedDepartment;
    const matchesStatus = selectedStatus === 'all' || teacher.status === selectedStatus;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const totalTeachers = teachers.length;
  const activeTeachers = teachers.filter(t => t.status === 'active').length;
  const avgRating = (teachers.reduce((acc, t) => acc + t.rating, 0) / teachers.length).toFixed(1);
  const avgAttendance = Math.round(teachers.reduce((acc, t) => acc + t.attendanceRate, 0) / teachers.length);

  const departments = ['Science', 'Languages', 'Social Science', 'Technology', 'Mathematics', 'Arts'];

  const handleViewTeacher = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setIsViewDialogOpen(true);
  };

  const handleEditTeacher = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Teachers Management</h1>
          <p className="text-muted-foreground">Manage faculty, assignments, and performance tracking</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => toast.success("Export started")}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Add Teacher
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Teacher</DialogTitle>
                <DialogDescription>
                  Enter teacher details to add them to the faculty.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Enter teacher name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employeeId">Employee ID</Label>
                    <Input id="employeeId" placeholder="e.g., EMP006" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="teacher@school.edu" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" placeholder="+91 98765 43210" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map(dept => (
                        <SelectItem key={dept} value={dept.toLowerCase()}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subjects">Subjects (comma separated)</Label>
                  <Input id="subjects" placeholder="e.g., Mathematics, Physics" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="joiningDate">Joining Date</Label>
                  <Input id="joiningDate" type="date" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => {
                  toast.success("Teacher added successfully");
                  setIsAddDialogOpen(false);
                }}>
                  Add Teacher
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
            <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTeachers}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Teachers</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeTeachers}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((activeTeachers / totalTeachers) * 100)}% of faculty
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgRating}/5</div>
            <p className="text-xs text-muted-foreground">
              Student feedback rating
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Attendance</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgAttendance}%</div>
            <p className="text-xs text-muted-foreground">
              Faculty attendance rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Faculty Directory</CardTitle>
          <CardDescription>Search and manage all teaching staff</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, employee ID, email, or subject..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
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
                <SelectItem value="on_leave">On Leave</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Teachers List */}
          <div className="space-y-4">
            {filteredTeachers.map((teacher) => (
              <Card key={teacher.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={teacher.avatar} />
                      <AvatarFallback>{teacher.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{teacher.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          {teacher.employeeId}
                        </Badge>
                        <Badge className={`text-xs ${getStatusColor(teacher.status)}`}>
                          {getStatusText(teacher.status)}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-3 w-3" />
                          {teacher.department}
                        </div>
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {teacher.email}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {teacher.experience} years exp
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {teacher.subjects.map((subject, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="text-sm font-medium">Classes</div>
                      <div className="text-lg font-bold text-blue-600">{teacher.totalClasses}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">Attendance</div>
                      <div className="text-lg font-bold text-green-600">{teacher.attendanceRate}%</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">Rating</div>
                      <div className="text-lg font-bold text-orange-600">{teacher.rating}/5</div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewTeacher(teacher)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleEditTeacher(teacher)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredTeachers.length === 0 && (
            <div className="text-center py-12">
              <Users className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-medium">No teachers found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Try adjusting your search criteria or add a new teacher.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Teacher Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Teacher Details</DialogTitle>
            <DialogDescription>
              Complete information about {selectedTeacher?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedTeacher && (
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedTeacher.avatar} />
                  <AvatarFallback>{selectedTeacher.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{selectedTeacher.name}</h3>
                  <p className="text-muted-foreground">ID: {selectedTeacher.employeeId}</p>
                  <Badge className={`${getStatusColor(selectedTeacher.status)} mt-1`}>
                    {getStatusText(selectedTeacher.status)}
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Contact Information</Label>
                    <div className="mt-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{selectedTeacher.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{selectedTeacher.phone}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">Academic Information</Label>
                    <div className="mt-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{selectedTeacher.department}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{selectedTeacher.qualification}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Joined: {selectedTeacher.joiningDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Subjects</Label>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {selectedTeacher.subjects.map((subject, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">Classes</Label>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {selectedTeacher.classes.map((className, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {className}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">Performance</Label>
                    <div className="mt-1 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Experience</span>
                        <span className="text-sm font-medium">{selectedTeacher.experience} years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Attendance Rate</span>
                        <span className="text-sm font-medium text-green-600">{selectedTeacher.attendanceRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Student Rating</span>
                        <span className="text-sm font-medium text-orange-600">{selectedTeacher.rating}/5</span>
                      </div>
                    </div>
                  </div>
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
              if (selectedTeacher) handleEditTeacher(selectedTeacher);
            }}>
              Edit Teacher
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Teacher Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Teacher</DialogTitle>
            <DialogDescription>
              Update teacher information for {selectedTeacher?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedTeacher && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Full Name</Label>
                  <Input id="edit-name" defaultValue={selectedTeacher.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-employeeId">Employee ID</Label>
                  <Input id="edit-employeeId" defaultValue={selectedTeacher.employeeId} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input id="edit-email" type="email" defaultValue={selectedTeacher.email} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-phone">Phone</Label>
                  <Input id="edit-phone" defaultValue={selectedTeacher.phone} />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-department">Department</Label>
                  <Select defaultValue={selectedTeacher.department}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map(dept => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-experience">Experience (Years)</Label>
                  <Input id="edit-experience" type="number" defaultValue={selectedTeacher.experience} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select defaultValue={selectedTeacher.status}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="on_leave">On Leave</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-qualification">Qualification</Label>
                <Input id="edit-qualification" defaultValue={selectedTeacher.qualification} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-subjects">Subjects (comma separated)</Label>
                <Input id="edit-subjects" defaultValue={selectedTeacher.subjects.join(', ')} />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              toast.success("Teacher information updated successfully");
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