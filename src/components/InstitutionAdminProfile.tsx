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
  Building,
  Users,
  Clock,
  Edit,
  Save,
  Camera,
  GraduationCap,
  Award,
  BookOpen,
  Settings
} from 'lucide-react';
import { toast } from "sonner";

interface InstitutionAdminProfileProps {
  onNavigate: (screen: import("../App").Screen) => void;
}

export function InstitutionAdminProfile({ onNavigate }: InstitutionAdminProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

  const [adminData, setAdminData] = useState({
    personalInfo: {
      firstName: 'Dr. Michael',
      lastName: 'Johnson',
      email: 'michael.johnson@modernschool.edu',
      phone: '+1 (555) 123-4567',
      address: '456 Education Avenue, School District, SD 54321',
      dateOfBirth: '1975-05-20',
      emergencyContact: '+1 (555) 987-6543',
      employeeId: 'IA001',
      joiningDate: '2020-03-01'
    },
    professional: {
      position: 'Institution Administrator',
      department: 'Administration',
      institution: 'Modern Public School',
      experience: '15 years',
      qualifications: [
        'Ed.D. in Educational Leadership - Harvard University (2018)',
        'M.Ed. in School Administration - Stanford University (2015)',
        'B.A. in Education - University of California (2008)'
      ],
      certifications: [
        'School Leadership Certificate (2019)',
        'Educational Management Certification (2020)',
        'Technology Integration in Education (2021)'
      ]
    },
    institution: {
      name: 'Modern Public School',
      totalStudents: 1250,
      totalTeachers: 85,
      totalClasses: 45,
      establishedYear: '1995',
      accreditation: 'A+ Grade',
      board: 'State Education Board'
    },
    achievements: [
      {
        title: 'Excellence in Education',
        year: '2024',
        description: 'Led school to achieve highest academic performance in the district'
      },
      {
        title: 'Digital Transformation',
        year: '2023',
        description: 'Successfully implemented comprehensive digital learning platform'
      },
      {
        title: 'Teacher Development Program',
        year: '2022',
        description: 'Launched innovative teacher training and development initiative'
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
          <h1 className="text-3xl font-bold">Institution Admin Profile</h1>
          <p className="text-muted-foreground">Manage your administrative profile and institution details</p>
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
                  {adminData.personalInfo.firstName[0]}{adminData.personalInfo.lastName[0]}
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
                {adminData.personalInfo.firstName} {adminData.personalInfo.lastName}
              </h2>
              <p className="text-muted-foreground">{adminData.professional.position}</p>
              <p className="text-sm text-muted-foreground">{adminData.professional.institution}</p>
              <div className="flex gap-2 mt-2">
                <Badge variant="secondary">
                  {adminData.professional.experience} Experience
                </Badge>
                <Badge variant="outline">
                  ID: {adminData.personalInfo.employeeId}
                </Badge>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">{adminData.institution.totalStudents}</div>
                <div className="text-sm text-muted-foreground">Students</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{adminData.institution.totalTeachers}</div>
                <div className="text-sm text-muted-foreground">Teachers</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{adminData.institution.totalClasses}</div>
                <div className="text-sm text-muted-foreground">Classes</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{adminData.institution.accreditation}</div>
                <div className="text-sm text-muted-foreground">Grade</div>
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
          <TabsTrigger value="institution">Institution</TabsTrigger>
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
                    value={adminData.personalInfo.firstName}
                    onChange={(e) => setAdminData(prev => ({
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
                    value={adminData.personalInfo.lastName}
                    onChange={(e) => setAdminData(prev => ({
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
                    value={adminData.personalInfo.email}
                    onChange={(e) => setAdminData(prev => ({
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
                    value={adminData.personalInfo.phone}
                    onChange={(e) => setAdminData(prev => ({
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
                    value={adminData.personalInfo.address}
                    onChange={(e) => setAdminData(prev => ({
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
                    value={adminData.personalInfo.dateOfBirth}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Emergency Contact</Label>
                  <Input
                    id="emergencyContact"
                    value={adminData.personalInfo.emergencyContact}
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
                    <Settings className="h-4 w-4 text-muted-foreground" />
                    <span>{adminData.professional.position}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Department</Label>
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span>{adminData.professional.department}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Experience</Label>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{adminData.professional.experience}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Joining Date</Label>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{new Date(adminData.personalInfo.joiningDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Qualifications</Label>
                <div className="space-y-2">
                  {adminData.professional.qualifications.map((qualification, index) => (
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
                  {adminData.professional.certifications.map((certification, index) => (
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

        <TabsContent value="institution" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Institution Information</CardTitle>
              <CardDescription>Details about your institution</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Institution Name</Label>
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span>{adminData.institution.name}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Established Year</Label>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{adminData.institution.establishedYear}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Accreditation</Label>
                  <Badge className="bg-green-100 text-green-800">
                    {adminData.institution.accreditation}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <Label>Education Board</Label>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span>{adminData.institution.board}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold">{adminData.institution.totalStudents}</div>
                  <div className="text-sm text-muted-foreground">Total Students</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold">{adminData.institution.totalTeachers}</div>
                  <div className="text-sm text-muted-foreground">Total Teachers</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold">{adminData.institution.totalClasses}</div>
                  <div className="text-sm text-muted-foreground">Total Classes</div>
                </div>
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
                {adminData.achievements.map((achievement, index) => (
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