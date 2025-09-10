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
  Building
} from 'lucide-react';
import { toast } from "sonner";

interface TeacherProfileProps {
  onNavigate: (screen: string) => void;
}

export function TeacherProfile({ onNavigate }: TeacherProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

  const [teacherData, setTeacherData] = useState({
    personalInfo: {
      firstName: 'Dr. Sarah',
      lastName: 'Wilson',
      email: 'sarah.wilson@modernschool.edu',
      phone: '+1 (555) 123-4567',
      address: '123 Academic Street, Education City, EC 12345',
      dateOfBirth: '1985-03-15',
      emergencyContact: '+1 (555) 987-6543',
      employeeId: 'TCH001',
      joiningDate: '2020-08-15'
    },
    professional: {
      position: 'Senior Mathematics Teacher',
      department: 'Mathematics Department',
      experience: '8 years',
      specialization: 'Advanced Mathematics, Calculus, Statistics',
      qualifications: [
        'Ph.D. in Mathematics - Stanford University (2018)',
        'M.Sc. in Applied Mathematics - MIT (2015)',
        'B.Sc. in Mathematics - Harvard University (2013)'
      ],
      certifications: [
        'Certified Mathematics Educator (2019)',
        'Advanced Teaching Methods Certificate (2020)',
        'Technology in Education Certificate (2021)'
      ]
    },
    teaching: {
      subjects: ['Mathematics', 'Advanced Calculus', 'Statistics', 'Algebra'],
      classes: [
        { name: 'Grade 10A', students: 30, subject: 'Mathematics' },
        { name: 'Grade 11B', students: 28, subject: 'Advanced Calculus' },
        { name: 'Grade 12A', students: 25, subject: 'Statistics' }
      ],
      totalStudents: 83,
      averageGrade: 87.5,
      teachingLoad: '20 hours/week'
    },
    achievements: [
      {
        title: 'Teacher of the Year',
        year: '2024',
        description: 'Awarded for outstanding contribution to student success'
      },
      {
        title: 'Best Mathematics Teacher',
        year: '2023',
        description: 'Recognized for innovative teaching methods in mathematics'
      },
      {
        title: 'Research Publication Award',
        year: '2022',
        description: 'Published research on modern mathematics teaching techniques'
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

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Teacher Profile</h1>
          <p className="text-muted-foreground">Manage your personal and professional information</p>
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
                  {teacherData.personalInfo.firstName[0]}{teacherData.personalInfo.lastName[0]}
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
                {teacherData.personalInfo.firstName} {teacherData.personalInfo.lastName}
              </h2>
              <p className="text-muted-foreground">{teacherData.professional.position}</p>
              <p className="text-sm text-muted-foreground">{teacherData.professional.department}</p>
              <div className="flex gap-2 mt-2">
                <Badge variant="secondary">
                  {teacherData.professional.experience} Experience
                </Badge>
                <Badge variant="outline">
                  ID: {teacherData.personalInfo.employeeId}
                </Badge>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">{teacherData.teaching.totalStudents}</div>
                <div className="text-sm text-muted-foreground">Students</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{teacherData.teaching.classes.length}</div>
                <div className="text-sm text-muted-foreground">Classes</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{teacherData.teaching.averageGrade}%</div>
                <div className="text-sm text-muted-foreground">Avg Grade</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Details */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="professional">Professional</TabsTrigger>
          <TabsTrigger value="teaching">Teaching</TabsTrigger>
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
                    value={teacherData.personalInfo.firstName}
                    onChange={(e) => setTeacherData(prev => ({
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
                    value={teacherData.personalInfo.lastName}
                    onChange={(e) => setTeacherData(prev => ({
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
                    value={teacherData.personalInfo.email}
                    onChange={(e) => setTeacherData(prev => ({
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
                    value={teacherData.personalInfo.phone}
                    onChange={(e) => setTeacherData(prev => ({
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
                    value={teacherData.personalInfo.address}
                    onChange={(e) => setTeacherData(prev => ({
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
                    value={teacherData.personalInfo.dateOfBirth}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Emergency Contact</Label>
                  <Input
                    id="emergencyContact"
                    value={teacherData.personalInfo.emergencyContact}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="professional" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Professional Information</CardTitle>
              <CardDescription>Your role and qualifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Position</Label>
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span>{teacherData.professional.position}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Department</Label>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{teacherData.professional.department}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Experience</Label>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{teacherData.professional.experience}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Joining Date</Label>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{new Date(teacherData.personalInfo.joiningDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Specialization</Label>
                <p className="text-sm">{teacherData.professional.specialization}</p>
              </div>

              <div className="space-y-2">
                <Label>Qualifications</Label>
                <div className="space-y-2">
                  {teacherData.professional.qualifications.map((qualification, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
                      <GraduationCap className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{qualification}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Certifications</Label>
                <div className="space-y-2">
                  {teacherData.professional.certifications.map((certification, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
                      <Award className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{certification}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="teaching" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Teaching Load</CardTitle>
                <CardDescription>Your current classes and students</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted rounded">
                    <div className="text-2xl font-bold">{teacherData.teaching.classes.length}</div>
                    <div className="text-sm text-muted-foreground">Classes</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded">
                    <div className="text-2xl font-bold">{teacherData.teaching.totalStudents}</div>
                    <div className="text-sm text-muted-foreground">Students</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Teaching Hours</Label>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{teacherData.teaching.teachingLoad}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Subjects</CardTitle>
                <CardDescription>Subjects you teach</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {teacherData.teaching.subjects.map((subject, index) => (
                    <Badge key={index} variant="secondary">
                      <BookOpen className="h-3 w-3 mr-1" />
                      {subject}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Current Classes</CardTitle>
              <CardDescription>Classes you're currently teaching</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teacherData.teaching.classes.map((classInfo, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h3 className="font-medium">{classInfo.name}</h3>
                      <p className="text-sm text-muted-foreground">{classInfo.subject}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{classInfo.students} Students</div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-2"
                        onClick={() => onNavigate('classes')}
                      >
                        View Class
                      </Button>
                    </div>
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
                {teacherData.achievements.map((achievement, index) => (
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