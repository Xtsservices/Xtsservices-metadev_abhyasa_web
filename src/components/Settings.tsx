import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog";
import { toast } from "sonner@2.0.3";
import { 
  ArrowLeft, 
  User, 
  Phone, 
  Mail, 
  Save,
  LogOut,
  Upload,
  Image,
  Building2
} from 'lucide-react';

interface SettingsProps {
  onNavigate: (screen: string) => void;
  onLogout: () => void;
}

export function Settings({ onNavigate, onLogout }: SettingsProps) {
  const [profileData, setProfileData] = useState({
    name: 'Super Admin',
    mobile: '+91-9876543210',
    email: 'admin@system.com'
  });
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [systemLogo, setSystemLogo] = useState<string | null>(null);

  const handleProfileUpdate = async () => {
    setIsUpdating(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Profile Updated Successfully');
      setIsUpdating(false);
    }, 1500);
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePhoto(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      toast.success('Profile photo uploaded successfully');
    }
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSystemLogo(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      toast.success('System logo uploaded successfully');
    }
  };



  const handleLogout = () => {
    setShowLogoutDialog(true);
  };

  const confirmLogout = () => {
    toast.success('Logged out successfully');
    onLogout();
  };

  return (
    <div className="p-6 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
                <CardDescription>
                  Update your personal information and contact details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Photo Upload */}
                <div className="space-y-4">
                  <Label>Profile Photo</Label>
                  <div className="flex items-center gap-4">
                    <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                      {profilePhoto ? (
                        <img src={profilePhoto} alt="Profile" className="h-full w-full object-cover" />
                      ) : (
                        <User className="h-8 w-8 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                        id="profile-photo"
                      />
                      <label htmlFor="profile-photo" className="cursor-pointer">
                        <Button variant="outline" size="sm" asChild>
                          <span>
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Photo
                          </span>
                        </Button>
                      </label>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                        className="pl-10"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="mobile">Mobile Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="mobile"
                        value={profileData.mobile}
                        className="pl-10 bg-muted"
                        disabled
                        placeholder="Mobile number"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Mobile number cannot be changed</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      className="pl-10"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <Separator />

                <div className="flex justify-end">
                  <Button onClick={handleProfileUpdate} disabled={isUpdating}>
                    {isUpdating ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Update Profile
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* System Configuration */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Configuration</CardTitle>
                <CardDescription>Customize system appearance and branding</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* System Logo Upload */}
                <div className="space-y-4">
                  <Label>System Logo</Label>
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-24 rounded border-2 border-dashed border-muted-foreground/25 bg-muted flex items-center justify-center overflow-hidden">
                      {systemLogo ? (
                        <img src={systemLogo} alt="System Logo" className="h-full w-full object-contain" />
                      ) : (
                        <Building2 className="h-6 w-6 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                        id="system-logo"
                      />
                      <label htmlFor="system-logo" className="cursor-pointer">
                        <Button variant="outline" size="sm" asChild>
                          <span>
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Logo
                          </span>
                        </Button>
                      </label>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">Recommended size: 200x80 pixels</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => onNavigate('master-data')}
                >
                  <User className="mr-2 h-4 w-4" />
                  Manage Users
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => onNavigate('reports')}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  View Reports
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => onNavigate('notifications')}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Notifications
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Your account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Role</span>
                  <span className="text-sm font-medium">Super Administrator</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Account Status</span>
                  <span className="text-sm font-medium text-green-600">Active</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Last Login</span>
                  <span className="text-sm font-medium">Today, 9:30 AM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Account Created</span>
                  <span className="text-sm font-medium">Jan 1, 2024</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">Danger Zone</CardTitle>
                <CardDescription>Irreversible actions</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="destructive" onClick={handleLogout} className="w-full">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>



        {/* Logout Confirmation Dialog */}
        <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to logout? You will need to sign in again to access the admin panel.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
  );
}