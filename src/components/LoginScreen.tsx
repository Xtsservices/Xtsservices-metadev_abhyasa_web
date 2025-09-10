import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Separator } from "./ui/separator";
import { Smartphone, Shield, RefreshCw, Users, GraduationCap, BookOpen, School, Building2, ArrowRight, UserCheck, UserX, Eye, EyeOff } from "lucide-react";

type UserRole = 'super_admin' | 'institution_admin' | 'teacher' | 'student' | 'parent';

interface LoginScreenProps {
  onLogin: (userRole: UserRole, userData: any) => void;
  onNavigate?: (screen: string) => void;
}

export function LoginScreen({ onLogin, onNavigate }: LoginScreenProps) {
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole | "">("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpEnabled, setOtpEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);
  const [showDemoUsers, setShowDemoUsers] = useState(false);

  const roleOptions = [
    { value: 'super_admin', label: 'Super Admin', icon: Shield, description: 'System Administrator' },
    { value: 'institution_admin', label: 'Institution Admin', icon: School, description: 'School/College Administrator' },
    { value: 'teacher', label: 'Teacher', icon: GraduationCap, description: 'Teaching Staff' },
    { value: 'student', label: 'Student', icon: BookOpen, description: 'Student' },
    { value: 'parent', label: 'Parent', icon: Users, description: 'Parent/Guardian' }
  ];

  const mockUserData = {
    super_admin: { name: 'John Admin', email: 'admin@edumanage.com', id: 'sa001' },
    institution_admin: { name: 'Jane Smith', email: 'jane.smith@greenwood.edu', id: 'ia001', institutionId: 'inst001' },
    teacher: { name: 'Dr. Michael Johnson', email: 'michael.johnson@greenwood.edu', id: 't001', subjects: ['Mathematics', 'Statistics'] },
    student: { name: 'Sarah Wilson', email: 'sarah.wilson@student.greenwood.edu', id: 's001', grade: 'Grade 10A', rollNumber: '2024001' },
    parent: { name: 'Robert Wilson', email: 'robert.wilson@email.com', id: 'p001', children: ['Sarah Wilson', 'Mike Wilson'] }
  };

  // Demo users for quick access
  const demoUsers = {
    onboarded: [
      { role: 'super_admin', mobile: '9876543210', name: 'John Admin', status: 'System Administrator' },
      { role: 'institution_admin', mobile: '9876543211', name: 'Jane Smith', status: 'School Administrator' },
      { role: 'teacher', mobile: '9876543212', name: 'Dr. Michael Johnson', status: 'Mathematics Teacher' },
      { role: 'student', mobile: '9876543213', name: 'Sarah Wilson', status: 'Grade 10A Student' },
      { role: 'parent', mobile: '9876543214', name: 'Robert Wilson', status: 'Parent of Sarah Wilson' }
    ],
    unonboarded: [
      { role: 'teacher', mobile: '9876543220', name: 'Alex Kumar', status: 'Needs Profile Setup', onboarding: 'teacher-onboarding' },
      { role: 'student', mobile: '9876543221', name: 'Priya Sharma', status: 'Needs Academic Setup', onboarding: 'student-onboarding' }
    ]
  };

  const handleDemoLogin = (demoUser: any) => {
    if (demoUser.onboarding) {
      // Navigate to onboarding flow for un-onboarded users
      onNavigate?.(demoUser.onboarding);
    } else {
      // Direct login for onboarded users
      const userData = mockUserData[demoUser.role as UserRole];
      onLogin(demoUser.role as UserRole, userData);
    }
  };

  const handleGetOtp = async () => {
    if (!selectedRole) {
      setError("Please select your role");
      return;
    }
    if (!mobileNumber || mobileNumber.length !== 10) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }

    setLoading(true);
    setError("");

    // Simulate API call
    setTimeout(() => {
      setOtpSent(true);
      setOtpEnabled(true);
      setSuccess(
        "OTP sent successfully to +91 " + mobileNumber,
      );
      setLoading(false);

      // Start resend cooldown
      setResendCooldown(30);
      const interval = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, 1500);
  };

  const handleResendOtp = () => {
    if (resendCooldown > 0) return;
    handleGetOtp();
  };

  const handleVerifyLogin = async () => {
    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    setError("");

    // Simulate OTP verification
    setTimeout(() => {
      if (otp === "123456") {
        setSuccess("Login Successful");
        setTimeout(() => {
          const userData = mockUserData[selectedRole as UserRole];
          onLogin(selectedRole as UserRole, userData);
        }, 1000);
      } else {
        setError("Invalid OTP, try again.");
        setLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
            <div>
            <img src="public/images/Abhyasa.png" alt="Abhyasa Logo" className="mx-auto h-20 w-20" />
            </div>
          <CardTitle className="text-2xl">
            Abhyasa Login
          </CardTitle>
          <CardDescription>
            Select your role and verify with OTP to access your dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="border-green-200 bg-green-50 text-green-800">
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="role">Select Role</Label>
            <Select value={selectedRole} onValueChange={(value: UserRole) => setSelectedRole(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Choose your role" />
              </SelectTrigger>
              <SelectContent>
                {roleOptions.map((role) => {
                  const Icon = role.icon;
                  return (
                    <SelectItem key={role.value} value={role.value}>
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        <div>
                          <div className="font-medium">{role.label}</div>
                          <div className="text-xs text-muted-foreground">{role.description}</div>
                        </div>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mobile">Mobile Number</Label>
            <div className="relative">
              <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="mobile"
                type="tel"
                placeholder="Enter 10-digit mobile number"
                value={mobileNumber}
                onChange={(e) =>
                  setMobileNumber(
                    e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 10),
                  )
                }
                className="pl-10"
                disabled={loading}
              />
            </div>
          </div>

          <Button
            onClick={handleGetOtp}
            disabled={
              loading ||
              !selectedRole ||
              !mobileNumber ||
              mobileNumber.length !== 10
            }
            className="w-full"
          >
            {loading && !otpSent ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Sending OTP...
              </>
            ) : (
              "Get OTP"
            )}
          </Button>

          <div className="space-y-2">
            <Label htmlFor="otp">OTP</Label>
            <Input
              id="otp"
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) =>
                setOtp(
                  e.target.value.replace(/\D/g, "").slice(0, 6),
                )
              }
              disabled={!otpEnabled || loading}
              maxLength={6}
            />
          </div>

          <Button
            onClick={handleVerifyLogin}
            disabled={
              !otpEnabled || loading || !otp || otp.length !== 6
            }
            className="w-full"
          >
            {loading && otpSent ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify & Login"
            )}
          </Button>

          {otpSent && (
            <div className="text-center">
              <button
                onClick={handleResendOtp}
                disabled={resendCooldown > 0}
                className="text-sm text-primary hover:underline disabled:text-muted-foreground disabled:no-underline"
              >
                {resendCooldown > 0
                  ? `Resend OTP in ${resendCooldown}s`
                  : "Resend OTP"}
              </button>
            </div>
          )}

          <div className="text-xs text-muted-foreground text-center mt-4">
            <p>
              For demo purposes, use OTP:{" "}
              <span className="font-mono bg-muted px-1 rounded">
                123456
              </span>
            </p>
          </div>

          <Separator className="my-6" />

          {/* Institute Registration CTA */}
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Building2 className="h-4 w-4" />
              <span className="text-sm">New to Abhyasa?</span>
            </div>
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => onNavigate?.('onboarding-landing')}
            >
              Register Your Institute
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            <p className="text-xs text-muted-foreground">
              Complete onboarding process for schools, colleges & institutes
            </p>
          </div>

          <Separator className="my-6" />

          {/* Demo Users Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span className="text-sm">Demo Users</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDemoUsers(!showDemoUsers)}
                className="h-8 px-2"
              >
                {showDemoUsers ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>

            {showDemoUsers && (
              <div className="space-y-4">
                {/* Onboarded Users */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                    <UserCheck className="h-3 w-3" />
                    <span>Onboarded Users (Ready to Use)</span>
                  </div>
                  <div className="space-y-2">
                    {demoUsers.onboarded.map((user, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="w-full justify-start text-left h-auto p-2"
                        onClick={() => handleDemoLogin(user)}
                      >
                        <div className="flex items-center gap-3">
                          {(() => {
                            const roleOption = roleOptions.find(r => r.value === user.role);
                            const Icon = roleOption?.icon || Users;
                            return <Icon className="h-4 w-4 shrink-0" />;
                          })()}
                          <div className="min-w-0 flex-1">
                            <div className="font-medium text-xs">{user.name}</div>
                            <div className="text-xs text-muted-foreground truncate">{user.status}</div>
                            <div className="text-xs text-muted-foreground">+91 {user.mobile}</div>
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Un-onboarded Users */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                    <UserX className="h-3 w-3" />
                    <span>Un-onboarded Users (Need Setup)</span>
                  </div>
                  <div className="space-y-2">
                    {demoUsers.unonboarded.map((user, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="w-full justify-start text-left h-auto p-2 border-orange-200 bg-orange-50 hover:bg-orange-100"
                        onClick={() => handleDemoLogin(user)}
                      >
                        <div className="flex items-center gap-3">
                          {(() => {
                            const roleOption = roleOptions.find(r => r.value === user.role);
                            const Icon = roleOption?.icon || Users;
                            return <Icon className="h-4 w-4 shrink-0 text-orange-600" />;
                          })()}
                          <div className="min-w-0 flex-1">
                            <div className="font-medium text-xs">{user.name}</div>
                            <div className="text-xs text-orange-600">{user.status}</div>
                            <div className="text-xs text-muted-foreground">+91 {user.mobile}</div>
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="text-xs text-muted-foreground text-center space-y-1">
                  <p>• Onboarded users go directly to their dashboard</p>
                  <p>• Un-onboarded users are guided through setup process</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}