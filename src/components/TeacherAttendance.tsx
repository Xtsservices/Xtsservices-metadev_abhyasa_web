import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Checkbox } from "./ui/checkbox";
import { 
  Calendar,
  Users,
  UserCheck,
  UserX,
  Search,
  Download,
  Upload,
  Clock,
  TrendingUp,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { toast } from "sonner";

interface TeacherAttendanceProps {
  onNavigate: (screen: import("../App").Screen) => void;
}

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  avatar?: string;
}

interface AttendanceRecord {
  studentId: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  remarks?: string;
}

export function TeacherAttendance({ onNavigate }: TeacherAttendanceProps) {
  const [students] = useState<Student[]>([
    { id: '1', name: 'Aarav Sharma', rollNumber: '001' },
    { id: '2', name: 'Priya Patel', rollNumber: '002' },
    { id: '3', name: 'Rohan Singh', rollNumber: '003' },
    { id: '4', name: 'Ananya Reddy', rollNumber: '004' },
    { id: '5', name: 'Arjun Kumar', rollNumber: '005' },
    { id: '6', name: 'Kavya Nair', rollNumber: '006' },
    { id: '7', name: 'Vishal Gupta', rollNumber: '007' },
    { id: '8', name: 'Meera Shah', rollNumber: '008' }
  ]);

  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([
    { studentId: '1', date: '2024-09-01', status: 'present' },
    { studentId: '2', date: '2024-09-01', status: 'present' },
    { studentId: '3', date: '2024-09-01', status: 'absent' },
    { studentId: '4', date: '2024-09-01', status: 'present' },
    { studentId: '5', date: '2024-09-01', status: 'late' },
    { studentId: '6', date: '2024-09-01', status: 'present' },
    { studentId: '7', date: '2024-09-01', status: 'present' },
    { studentId: '8', date: '2024-09-01', status: 'excused' }
  ]);

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedClass, setSelectedClass] = useState('10A');
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [searchTerm, setSearchTerm] = useState('');
  const [isMarkingAttendance, setIsMarkingAttendance] = useState(false);
  const [tempAttendance, setTempAttendance] = useState<{[key: string]: string}>({});

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNumber.includes(searchTerm)
  );

  const getAttendanceForDate = (studentId: string, date: string) => {
    const record = attendanceRecords.find(r => r.studentId === studentId && r.date === date);
    return record?.status || 'present';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-green-100 text-green-800';
      case 'absent':
        return 'bg-red-100 text-red-800';
      case 'late':
        return 'bg-yellow-100 text-yellow-800';
      case 'excused':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'absent':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'late':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'excused':
        return <UserCheck className="h-4 w-4 text-blue-600" />;
      default:
        return <UserCheck className="h-4 w-4 text-gray-600" />;
    }
  };

  const startMarkingAttendance = () => {
    setIsMarkingAttendance(true);
    const initialAttendance: {[key: string]: string} = {};
    students.forEach(student => {
      initialAttendance[student.id] = getAttendanceForDate(student.id, selectedDate);
    });
    setTempAttendance(initialAttendance);
  };

  const saveAttendance = () => {
    const newRecords = students.map(student => ({
      studentId: student.id,
      date: selectedDate,
      status: tempAttendance[student.id] as 'present' | 'absent' | 'late' | 'excused'
    }));

    // Remove existing records for this date and add new ones
    setAttendanceRecords(prev => [
      ...prev.filter(record => record.date !== selectedDate),
      ...newRecords
    ]);

    setIsMarkingAttendance(false);
    toast.success("Attendance saved successfully");
  };

  const markAllPresent = () => {
    const allPresent: {[key: string]: string} = {};
    students.forEach(student => {
      allPresent[student.id] = 'present';
    });
    setTempAttendance(allPresent);
  };

  const markAllAbsent = () => {
    const allAbsent: {[key: string]: string} = {};
    students.forEach(student => {
      allAbsent[student.id] = 'absent';
    });
    setTempAttendance(allAbsent);
  };

  // Calculate statistics
  const todayRecords = attendanceRecords.filter(r => r.date === selectedDate);
  const presentCount = todayRecords.filter(r => r.status === 'present').length;
  const absentCount = todayRecords.filter(r => r.status === 'absent').length;
  const lateCount = todayRecords.filter(r => r.status === 'late').length;
  const attendancePercentage = students.length > 0 ? ((presentCount + lateCount) / students.length) * 100 : 0;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Attendance Management</h1>
          <p className="text-muted-foreground">Mark and track student attendance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4">
            <div className="space-y-2">
              <Label>Date</Label>
              <Input 
                type="date" 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-40"
              />
            </div>
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
            <div className="space-y-2 flex-1">
              <Label>Search Students</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or roll number..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Present</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{presentCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Absent</CardTitle>
            <UserX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{absentCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendancePercentage.toFixed(1)}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Marking */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Class {selectedClass} - {selectedSubject}</CardTitle>
              <CardDescription>
                Attendance for {new Date(selectedDate).toLocaleDateString()}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              {isMarkingAttendance ? (
                <>
                  <Button variant="outline" onClick={markAllPresent}>
                    Mark All Present
                  </Button>
                  <Button variant="outline" onClick={markAllAbsent}>
                    Mark All Absent
                  </Button>
                  <Button variant="outline" onClick={() => setIsMarkingAttendance(false)}>
                    Cancel
                  </Button>
                  <Button onClick={saveAttendance}>
                    Save Attendance
                  </Button>
                </>
              ) : (
                <Button onClick={startMarkingAttendance}>
                  <Calendar className="h-4 w-4 mr-2" />
                  Mark Attendance
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStudents.map(student => {
              const currentStatus = isMarkingAttendance 
                ? tempAttendance[student.id] 
                : getAttendanceForDate(student.id, selectedDate);

              return (
                <Card key={student.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={student.avatar} />
                        <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-muted-foreground">Roll: {student.rollNumber}</p>
                      </div>
                    </div>
                    
                    {isMarkingAttendance ? (
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-1">
                          <Button
                            variant={tempAttendance[student.id] === 'present' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setTempAttendance(prev => ({...prev, [student.id]: 'present'}))}
                          >
                            P
                          </Button>
                          <Button
                            variant={tempAttendance[student.id] === 'absent' ? 'destructive' : 'outline'}
                            size="sm"
                            onClick={() => setTempAttendance(prev => ({...prev, [student.id]: 'absent'}))}
                          >
                            A
                          </Button>
                          <Button
                            variant={tempAttendance[student.id] === 'late' ? 'secondary' : 'outline'}
                            size="sm"
                            onClick={() => setTempAttendance(prev => ({...prev, [student.id]: 'late'}))}
                          >
                            L
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        {getStatusIcon(currentStatus)}
                        <Badge className={getStatusColor(currentStatus)}>
                          {currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)}
                        </Badge>
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>

          {filteredStudents.length === 0 && (
            <div className="text-center py-12">
              <Users className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-medium">No students found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Try adjusting your search criteria.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}