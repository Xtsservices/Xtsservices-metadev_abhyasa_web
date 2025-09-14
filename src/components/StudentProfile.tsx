import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { 
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  BookOpen,
  Award,
  Users,
  Clock,
  Edit,
  Save,
  Camera,
  GraduationCap,
  Star,
  TrendingUp
} from 'lucide-react';
import { toast } from "sonner";

interface StudentProfileProps {
  onNavigate: (screen: import("../App").Screen) => void;
}

export function StudentProfile({ onNavigate }: StudentProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

  const [studentData, setStudentData] = useState({
    personalInfo: {
      firstName: 'Emma',
      lastName: 'Thompson',
      email: 'emma.thompson@student.modernschool.edu',
      phone: '+1 (555) 234-5678',
      address: '789 Student Lane, Education District, ED 67890',
      dateOfBirth: '2007-08-15',
      guardianName: 'Robert Thompson',
      guardianPhone: '+1 (555) 876-5432',
      studentId: 'STU2024001',
      admissionDate: '2021-09-01'
    },
    academic: {
      grade: 'Grade 11',
      section: 'A',
      rollNumber: '011',
      academicYear: '2024-2025',
      subjects: [
        { name: 'Mathematics', teacher: 'Dr. Sarah Wilson', grade: 'A' },
        { name: 'Physics', teacher: 'Mr. David Brown', grade: 'A-' },
        { name: 'Chemistry', teacher: 'Dr. Lisa Martinez', grade: 'B+' },
        { name: 'English', teacher: 'Ms. Jennifer Davis', grade: 'A' },
        { name: 'History', teacher: 'Mr. James Wilson', grade: 'B+' },
        { name: 'Biology', teacher: 'Dr. Maria Garcia', grade: 'A-' }
      ],
      gpa: 3.7,
      attendance: 94.5,
      classRank: 5
    },
    activities: [
      'Science Club - President',
      'Student Council - Vice President',
      'Mathematics Olympiad Team',
      'Debate Society',
      'Environmental Club'
    ],
    achievements: [
      {
        title: 'Mathematics Excellence Award',
        year: '2024',
        description: 'Top performer in Advanced Mathematics'
      },
      {
        title: 'Science Fair Winner',
        year: '2023',
        description: 'First place in Regional Science Fair'
      },
      {
        title: 'Student Leadership Award',
        year: '2023',
        description: 'Outstanding leadership in student activities'
      }
    ]
  });

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  const handleProfilePictureUpload = () => {
    toast.success("Profile picture updated!");
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'bg-green-100 text-green-800';
    if (grade.startsWith('B')) return 'bg-blue-100 text-blue-800';
    if (grade.startsWith('C')) return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Student Profile</h1>
          <p className="text-muted-foreground">Manage your academic profile and personal information</p>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveProfile}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      {/* Profile Overview */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/api/placeholder/96/96" alt="Profile" />
                <AvatarFallback className="text-xl">
                  {studentData.personalInfo.firstName[0]}{studentData.personalInfo.lastName[0]}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button 
                  size="sm" 
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                  onClick={handleProfilePictureUpload}
                >
                  <Camera className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">
                {studentData.personalInfo.firstName} {studentData.personalInfo.lastName}
              </h2>
              <p className="text-muted-foreground">{studentData.academic.grade} - Section {studentData.academic.section}</p>
              <p className="text-sm text-muted-foreground">Roll No: {studentData.academic.rollNumber}</p>
              <div className="flex gap-2 mt-2">
                <Badge variant="secondary">
                  GPA: {studentData.academic.gpa}
                </Badge>
                <Badge variant="outline">
                  ID: {studentData.personalInfo.studentId}
                </Badge>
                <Badge className="bg-green-100 text-green-800">
                  Rank #{studentData.academic.classRank}
                </Badge>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">{studentData.academic.gpa}</div>
                <div className="text-sm text-muted-foreground">GPA</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{studentData.academic.attendance}%</div>
                <div className="text-sm text-muted-foreground">Attendance</div>
              </div>
              <div>
                <div className="text-2xl font-bold">#{studentData.academic.classRank}</div>
                <div className="text-sm text-muted-foreground">Class Rank</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{studentData.academic.subjects.length}</div>
                <div className="text-sm text-muted-foreground">Subjects</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Details */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Your basic personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={studentData.personalInfo.firstName}
                    onChange={(e) => setStudentData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, firstName: e.target.value }
                    }))}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={studentData.personalInfo.lastName}
                    onChange={(e) => setStudentData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, lastName: e.target.value }
                    }))}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="flex">
                  <Mail className="h-4 w-4 mt-3 mr-2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={studentData.personalInfo.email}
                    onChange={(e) => setStudentData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, email: e.target.value }
                    }))}
                    disabled={!isEditing}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="flex">
                  <Phone className="h-4 w-4 mt-3 mr-2 text-muted-foreground" />
                  <Input
                    id="phone"
                    value={studentData.personalInfo.phone}
                    onChange={(e) => setStudentData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, phone: e.target.value }
                    }))}
                    disabled={!isEditing}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <div className="flex">
                  <MapPin className="h-4 w-4 mt-3 mr-2 text-muted-foreground" />
                  <Textarea
                    id="address"
                    value={studentData.personalInfo.address}
                    onChange={(e) => setStudentData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, address: e.target.value }
                    }))}
                    disabled={!isEditing}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={studentData.personalInfo.dateOfBirth}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admissionDate">Admission Date</Label>
                  <Input
                    id="admissionDate"
                    type="date"
                    value={studentData.personalInfo.admissionDate}
                    disabled={true}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="guardianName">Guardian Name</Label>
                  <Input
                    id="guardianName"
                    value={studentData.personalInfo.guardianName}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guardianPhone">Guardian Phone</Label>
                  <Input
                    id="guardianPhone"
                    value={studentData.personalInfo.guardianPhone}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="academic" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Academic Information</CardTitle>
                <CardDescription>Your current academic details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Grade</Label>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-muted-foreground" />
                      <span>{studentData.academic.grade}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Section</Label>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>Section {studentData.academic.section}</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Roll Number</Label>
                    <span className="font-medium">{studentData.academic.rollNumber}</span>
                  </div>
                  <div className="space-y-2">
                    <Label>Academic Year</Label>
                    <span>{studentData.academic.academicYear}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold">{studentData.academic.gpa}</div>
                    <div className="text-sm text-muted-foreground">Current GPA</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold">{studentData.academic.attendance}%</div>
                    <div className="text-sm text-muted-foreground">Attendance</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance</CardTitle>
                <CardDescription>Academic performance metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-primary/10 rounded-lg">
                  <div className="text-3xl font-bold text-primary">#{studentData.academic.classRank}</div>
                  <div className="text-sm text-muted-foreground">Class Rank</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Overall Performance</span>
                    <span className="text-sm font-medium">Excellent</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Current Subjects</CardTitle>
              <CardDescription>Your enrolled subjects and grades</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {studentData.academic.subjects.map((subject, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <BookOpen className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <h3 className="font-medium">{subject.name}</h3>
                        <p className="text-sm text-muted-foreground">{subject.teacher}</p>
                      </div>
                    </div>
                    <Badge className={getGradeColor(subject.grade)}>
                      {subject.grade}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activities" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Extracurricular Activities</CardTitle>
              <CardDescription>Your involvement in school activities and clubs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {studentData.activities.map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <span className="font-medium">{activity}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Awards & Achievements</CardTitle>
              <CardDescription>Recognition and accomplishments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {studentData.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{achievement.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{achievement.year}</p>
                      <p className="text-sm">{achievement.description}</p>
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