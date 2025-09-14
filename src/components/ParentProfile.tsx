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
  Users,
  Briefcase,
  Edit,
  Save,
  Camera,
  Heart,
  GraduationCap,
  Clock,
  Building
} from 'lucide-react';
import { toast } from "sonner";

interface ParentProfileProps {
  onNavigate: (screen: import("../App").Screen) => void;
}

export function ParentProfile({ onNavigate }: ParentProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

  const [parentData, setParentData] = useState({
    personalInfo: {
      firstName: 'Robert',
      lastName: 'Thompson',
      email: 'robert.thompson@email.com',
      phone: '+1 (555) 876-5432',
      address: '789 Student Lane, Education District, ED 67890',
      dateOfBirth: '1978-11-25',
      emergencyContact: '+1 (555) 234-5678',
      parentId: 'PAR2024001',
      registrationDate: '2021-08-15'
    },
    professional: {
      occupation: 'Software Engineer',
      company: 'Tech Solutions Inc.',
      workPhone: '+1 (555) 999-8888',
      workAddress: '456 Corporate Blvd, Business City, BC 11111',
      experience: '12 years'
    },
    children: [
      {
        name: 'Emma Thompson',
        studentId: 'STU2024001',
        grade: 'Grade 11',
        section: 'A',
        rollNumber: '011',
        gpa: 3.7,
        attendance: 94.5,
        lastExamScore: 92,
        subjects: ['Mathematics', 'Physics', 'Chemistry', 'English', 'History', 'Biology']
      },
      {
        name: 'Jake Thompson',
        studentId: 'STU2024045',
        grade: 'Grade 8',
        section: 'B',
        rollNumber: '023',
        gpa: 3.5,
        attendance: 91.2,
        lastExamScore: 88,
        subjects: ['Mathematics', 'Science', 'English', 'Social Studies', 'Art']
      }
    ],
    preferences: {
      communicationMethod: 'Email',
      meetingPreference: 'After school hours',
      emergencyContact: true,
      academicUpdates: true,
      eventNotifications: true,
      behaviorReports: true
    }
  });

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  const handleProfilePictureUpload = () => {
    toast.success("Profile picture updated!");
  };

  const getGradeColor = (gpa: number) => {
    if (gpa >= 3.5) return 'bg-green-100 text-green-800';
    if (gpa >= 3.0) return 'bg-blue-100 text-blue-800';
    if (gpa >= 2.5) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Parent Profile</h1>
          <p className="text-muted-foreground">Manage your profile and children's information</p>
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
                  {parentData.personalInfo.firstName[0]}{parentData.personalInfo.lastName[0]}
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
                {parentData.personalInfo.firstName} {parentData.personalInfo.lastName}
              </h2>
              <p className="text-muted-foreground">{parentData.professional.occupation}</p>
              <p className="text-sm text-muted-foreground">{parentData.professional.company}</p>
              <div className="flex gap-2 mt-2">
                <Badge variant="secondary">
                  {parentData.children.length} {parentData.children.length === 1 ? 'Child' : 'Children'}
                </Badge>
                <Badge variant="outline">
                  ID: {parentData.personalInfo.parentId}
                </Badge>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">{parentData.children.length}</div>
                <div className="text-sm text-muted-foreground">Children</div>
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {(parentData.children.reduce((sum, child) => sum + child.gpa, 0) / parentData.children.length).toFixed(1)}
                </div>
                <div className="text-sm text-muted-foreground">Avg GPA</div>
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {(parentData.children.reduce((sum, child) => sum + child.attendance, 0) / parentData.children.length).toFixed(1)}%
                </div>
                <div className="text-sm text-muted-foreground">Avg Attendance</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{parentData.professional.experience}</div>
                <div className="text-sm text-muted-foreground">Experience</div>
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
          <TabsTrigger value="children">Children</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
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
                    value={parentData.personalInfo.firstName}
                    onChange={(e) => setParentData(prev => ({
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
                    value={parentData.personalInfo.lastName}
                    onChange={(e) => setParentData(prev => ({
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
                    value={parentData.personalInfo.email}
                    onChange={(e) => setParentData(prev => ({
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
                    value={parentData.personalInfo.phone}
                    onChange={(e) => setParentData(prev => ({
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
                    value={parentData.personalInfo.address}
                    onChange={(e) => setParentData(prev => ({
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
                    value={parentData.personalInfo.dateOfBirth}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Emergency Contact</Label>
                  <Input
                    id="emergencyContact"
                    value={parentData.personalInfo.emergencyContact}
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
              <CardDescription>Your work and career details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Occupation</Label>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <span>{parentData.professional.occupation}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Experience</Label>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{parentData.professional.experience}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Company</Label>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span>{parentData.professional.company}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="workPhone">Work Phone</Label>
                <div className="flex">
                  <Phone className="h-4 w-4 mt-3 mr-2 text-muted-foreground" />
                  <Input
                    id="workPhone"
                    value={parentData.professional.workPhone}
                    disabled={!isEditing}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="workAddress">Work Address</Label>
                <div className="flex">
                  <MapPin className="h-4 w-4 mt-3 mr-2 text-muted-foreground" />
                  <Textarea
                    id="workAddress"
                    value={parentData.professional.workAddress}
                    disabled={!isEditing}
                    className="flex-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="children" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Children Information</CardTitle>
              <CardDescription>Overview of your children's academic progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {parentData.children.map((child, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium flex items-center gap-2">
                          <Heart className="h-4 w-4 text-red-500" />
                          {child.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {child.grade} - Section {child.section} (Roll: {child.rollNumber})
                        </p>
                        <p className="text-xs text-muted-foreground">ID: {child.studentId}</p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onNavigate('children')}
                      >
                        View Details
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-lg font-bold">{child.gpa}</div>
                        <div className="text-xs text-muted-foreground">GPA</div>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-lg font-bold">{child.attendance}%</div>
                        <div className="text-xs text-muted-foreground">Attendance</div>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-lg font-bold">{child.lastExamScore}%</div>
                        <div className="text-xs text-muted-foreground">Last Exam</div>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-lg font-bold">{child.subjects.length}</div>
                        <div className="text-xs text-muted-foreground">Subjects</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Subjects Enrolled</Label>
                      <div className="flex flex-wrap gap-2">
                        {child.subjects.map((subject, subIndex) => (
                          <Badge key={subIndex} variant="secondary" className="text-xs">
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Communication Preferences</CardTitle>
              <CardDescription>Manage how you receive updates and notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Preferred Communication Method</Label>
                <Input
                  value={parentData.preferences.communicationMethod}
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label>Meeting Preference</Label>
                <Input
                  value={parentData.preferences.meetingPreference}
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-4">
                <Label>Notification Settings</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span>Emergency Contact</span>
                    <Badge className={parentData.preferences.emergencyContact ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {parentData.preferences.emergencyContact ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span>Academic Updates</span>
                    <Badge className={parentData.preferences.academicUpdates ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {parentData.preferences.academicUpdates ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span>Event Notifications</span>
                    <Badge className={parentData.preferences.eventNotifications ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {parentData.preferences.eventNotifications ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span>Behavior Reports</span>
                    <Badge className={parentData.preferences.behaviorReports ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {parentData.preferences.behaviorReports ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}