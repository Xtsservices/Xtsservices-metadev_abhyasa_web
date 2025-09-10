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
  Shield,
  Settings,
  Users,
  Clock,
  Edit,
  Save,
  Camera,
  Building,
  Award,
  Activity
} from 'lucide-react';
import { toast } from "sonner";

interface SuperAdminProfileProps {
  onNavigate: (screen: string) => void;
}

export function SuperAdminProfile({ onNavigate }: SuperAdminProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

  const [adminData, setAdminData] = useState({
    personalInfo: {
      firstName: 'John',
      lastName: 'Administrator',
      email: 'john.admin@edumanage.com',
      phone: '+1 (555) 000-0001',
      address: '100 Admin Plaza, Management City, MC 00001',
      dateOfBirth: '1980-01-15',
      emergencyContact: '+1 (555) 000-0002',
      employeeId: 'SA001',
      joiningDate: '2019-01-01'
    },
    systemInfo: {
      role: 'Super Administrator',
      accessLevel: 'Full System Access',
      department: 'System Administration',
      lastLogin: '2025-09-01T08:30:00',
      totalSessions: 1247,
      accountStatus: 'Active'
    },
    permissions: [
      'Full System Administration',
      'Institute Management',
      'User Role Management',
      'System Configuration',
      'Data Analytics Access',
      'Security Settings',
      'Backup & Recovery',
      'API Access Management'
    ],
    statistics: {
      institutesManaged: 127,
      totalUsers: 15420,
      systemUptime: '99.8%',
      dataProcessed: '2.4TB'
    },
    achievements: [
      {
        title: 'System Launch',
        year: '2019',
        description: 'Successfully launched Abhyasa platform'
      },
      {
        title: '100+ Institutes',
        year: '2023',
        description: 'Onboarded over 100 educational institutes'
      },
      {
        title: 'Security Excellence',
        year: '2024',
        description: 'Maintained 99.8% system uptime with zero security breaches'
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
          <h1 className="text-3xl font-bold">Super Admin Profile</h1>
          <p className="text-muted-foreground">Manage your system administration profile</p>
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
              <p className="text-muted-foreground">{adminData.systemInfo.role}</p>
              <p className="text-sm text-muted-foreground">{adminData.systemInfo.department}</p>
              <div className="flex gap-2 mt-2">
                <Badge variant="secondary">
                  <Shield className="h-3 w-3 mr-1" />
                  {adminData.systemInfo.accessLevel}
                </Badge>
                <Badge variant="outline">
                  ID: {adminData.personalInfo.employeeId}
                </Badge>
                <Badge className="bg-green-100 text-green-800">
                  {adminData.systemInfo.accountStatus}
                </Badge>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">{adminData.statistics.institutesManaged}</div>
                <div className="text-sm text-muted-foreground">Institutes</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{adminData.statistics.totalUsers.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Users</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{adminData.statistics.systemUptime}</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{adminData.statistics.dataProcessed}</div>
                <div className="text-sm text-muted-foreground">Data</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Details */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="system">System Access</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
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

        <TabsContent value="system" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>System Information</CardTitle>
                <CardDescription>Your system access details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Role</Label>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <span>{adminData.systemInfo.role}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Access Level</Label>
                  <div className="flex items-center gap-2">
                    <Settings className="h-4 w-4 text-muted-foreground" />
                    <span>{adminData.systemInfo.accessLevel}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Department</Label>
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span>{adminData.systemInfo.department}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Total Sessions</Label>
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-muted-foreground" />
                    <span>{adminData.systemInfo.totalSessions.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Activity Information</CardTitle>
                <CardDescription>Recent activity and login details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Last Login</Label>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{new Date(adminData.systemInfo.lastLogin).toLocaleString()}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Joining Date</Label>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{new Date(adminData.personalInfo.joiningDate).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Account Status</Label>
                  <Badge className="bg-green-100 text-green-800">
                    {adminData.systemInfo.accountStatus}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Permissions</CardTitle>
              <CardDescription>Your current system access permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {adminData.permissions.map((permission, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                    <Shield className="h-5 w-5 text-green-600" />
                    <span className="font-medium">{permission}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Achievements & Milestones</CardTitle>
              <CardDescription>System administration accomplishments</CardDescription>
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