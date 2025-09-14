import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Upload, 
  FileText, 
  Shield, 
  GraduationCap, 
  Building, 
  Heart, 
  CreditCard, 
  Smartphone, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft, 
  ArrowRight,
  User,
  MapPin,
  Calendar,
  Award,
  Briefcase,
  Phone,
  Mail,
  Camera,
  FileCheck,
  Lock
} from 'lucide-react';
import { toast } from "sonner";

interface TeacherOnboardingProps {
  onNavigate: (screen: import("../App").Screen) => void;
}

export function TeacherOnboarding({ onNavigate }: TeacherOnboardingProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<{
    // Personal Information
    fullName: string;
    email: string;
    mobile: string;
    alternateContact: string;
    dateOfBirth: string;
    gender: string;
    nationality: string;
    maritalStatus: string;
    aadhaarNumber: string;
    panNumber: string;
    passportNumber: string;
    voterIdNumber: string;
    drivingLicense: string;
    permanentAddress: string;
    currentAddress: string;
    city: string;
    state: string;
    pincode: string;
    highestDegree: string;
    university: string;
    graduationYear: string;
    cgpa: string;
    specialization: string;
    additionalQualifications: string;
    tetCertificate: string;
    ctetCertificate: string;
    netSetCertificate: string;
    otherCertifications: string;
    previousEmployer: string;
    designation: string;
    experienceYears: string;
    currentSalary: string;
    noticePeriod: string;
    reasonForLeaving: string;
    bankName: string;
    accountNumber: string;
    ifscCode: string;
    accountHolderName: string;
    emergencyContactName: string;
    emergencyContactRelation: string;
    emergencyContactPhone: string;
    subjectsToTeach: string[];
    preferredClasses: string[];
    teachingExperience: string;
    backgroundCheckConsent: boolean;
    dataPrivacyConsent: boolean;
    codeOfConductConsent: boolean;
    medicalFitnessConsent: boolean;
  }>({
    // Personal Information
    fullName: '',
    email: '',
    mobile: '',
    alternateContact: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    maritalStatus: '',
    
    // Identity Documents
    aadhaarNumber: '',
    panNumber: '',
    passportNumber: '',
    voterIdNumber: '',
    drivingLicense: '',
    
    // Address Information
    permanentAddress: '',
    currentAddress: '',
    city: '',
    state: '',
    pincode: '',
    
    // Academic Qualifications
    highestDegree: '',
    university: '',
    graduationYear: '',
    cgpa: '',
    specialization: '',
    additionalQualifications: '',
    
    // Professional Certifications
    tetCertificate: '',
    ctetCertificate: '',
    netSetCertificate: '',
    otherCertifications: '',
    
    // Employment History
    previousEmployer: '',
    designation: '',
    experienceYears: '',
    currentSalary: '',
    noticePeriod: '',
    reasonForLeaving: '',
    
    // Bank Details
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    accountHolderName: '',
    
    // Emergency Contact
    emergencyContactName: '',
    emergencyContactRelation: '',
    emergencyContactPhone: '',
    
    // Subjects & Classes
    subjectsToTeach: [],
    preferredClasses: [],
    teachingExperience: '',
    
    // Consent & Agreements
    backgroundCheckConsent: false,
    dataPrivacyConsent: false,
    codeOfConductConsent: false,
    medicalFitnessConsent: false
  });

  const [uploadedFiles, setUploadedFiles] = useState({
    profilePhoto: null,
    aadhaarCard: null,
    panCard: null,
    passport: null,
    addressProof: null,
    educationCertificates: null,
    experienceCertificates: null,
    relievingLetter: null,
    medicalCertificate: null,
    policeVerification: null,
    bankPassbook: null,
    professionalCertificates: null
  });

  const totalSteps = 7;
  const progress = (currentStep / totalSteps) * 100;

  const steps = [
    { id: 1, title: 'Personal Details', icon: User, description: 'Basic information & identity' },
    { id: 2, title: 'Documents', icon: FileText, description: 'Identity & address proof' },
    { id: 3, title: 'Qualifications', icon: GraduationCap, description: 'Academic & professional' },
    { id: 4, title: 'Experience', icon: Briefcase, description: 'Employment history' },
    { id: 5, title: 'Background Check', icon: Shield, description: 'Verification & compliance' },
    { id: 6, title: 'Banking', icon: CreditCard, description: 'Salary & tax details' },
    { id: 7, title: 'Final Review', icon: CheckCircle2, description: 'Consent & submission' }
  ];

  const subjects = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Hindi', 'History', 
    'Geography', 'Political Science', 'Economics', 'Computer Science', 'Physical Education',
    'Art', 'Music', 'Sanskrit', 'French', 'German', 'Environmental Science'
  ];

  const classes = [
    'Pre-KG', 'LKG', 'UKG', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
    'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (fileType: string, file: File) => {
    setUploadedFiles(prev => ({ ...prev, [fileType]: file }));
    toast.success(`${fileType} uploaded successfully`);
  };

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    toast.success("Teacher onboarding application submitted successfully!");
    setTimeout(() => {
      onNavigate('login');
    }, 2000);
  };

  const FileUploadCard = ({ title, description, fileType, required = true }: any) => (
    <Card className="relative">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-sm">{title}</CardTitle>
            <CardDescription className="text-xs">{description}</CardDescription>
          </div>
          {required && <Badge variant="destructive" className="text-xs">Required</Badge>}
          {uploadedFiles[fileType as keyof typeof uploadedFiles] && (
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
          <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
          <p className="text-sm text-gray-600 mb-2">
            {uploadedFiles[fileType as keyof typeof uploadedFiles] 
              ? `Uploaded: ${(uploadedFiles[fileType as keyof typeof uploadedFiles] as any)?.name || 'File uploaded'}`
              : 'Click to upload or drag and drop'
            }
          </p>
          <Input
            type="file"
            className="hidden"
            id={fileType}
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileUpload(fileType, file);
            }}
          />
          <Label htmlFor={fileType} className="cursor-pointer">
            <Button variant="outline" size="sm" className="mt-2">
              Choose File
            </Button>
          </Label>
        </div>
      </CardContent>
    </Card>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number *</Label>
                <Input
                  id="mobile"
                  placeholder="+91 98765 43210"
                  value={formData.mobile}
                  onChange={(e) => handleInputChange('mobile', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="alternateContact">Alternate Contact</Label>
                <Input
                  id="alternateContact"
                  placeholder="+91 98765 43210"
                  value={formData.alternateContact}
                  onChange={(e) => handleInputChange('alternateContact', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender *</Label>
                <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="maritalStatus">Marital Status</Label>
                <Select value={formData.maritalStatus} onValueChange={(value) => handleInputChange('maritalStatus', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="married">Married</SelectItem>
                    <SelectItem value="divorced">Divorced</SelectItem>
                    <SelectItem value="widowed">Widowed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Address Information
              </h3>
              
              <div className="space-y-2">
                <Label htmlFor="permanentAddress">Permanent Address *</Label>
                <Textarea
                  id="permanentAddress"
                  placeholder="Enter your permanent address"
                  value={formData.permanentAddress}
                  onChange={(e) => handleInputChange('permanentAddress', e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="sameAddress"
                  onCheckedChange={(checked) => {
                    if (checked) {
                      handleInputChange('currentAddress', formData.permanentAddress);
                    }
                  }}
                />
                <Label htmlFor="sameAddress" className="text-sm">Current address is same as permanent address</Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentAddress">Current Address *</Label>
                <Textarea
                  id="currentAddress"
                  placeholder="Enter your current address"
                  value={formData.currentAddress}
                  onChange={(e) => handleInputChange('currentAddress', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pincode">PIN Code *</Label>
                  <Input
                    id="pincode"
                    placeholder="123456"
                    value={formData.pincode}
                    onChange={(e) => handleInputChange('pincode', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <Alert>
              <FileText className="h-4 w-4" />
              <AlertDescription>
                Please upload clear, scanned copies of all required documents. Accepted formats: PDF, JPG, PNG (Max 5MB each)
              </AlertDescription>
            </Alert>

            <Tabs defaultValue="identity" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="identity">Identity Proof</TabsTrigger>
                <TabsTrigger value="address">Address Proof</TabsTrigger>
                <TabsTrigger value="photo">Photograph</TabsTrigger>
              </TabsList>

              <TabsContent value="identity" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="aadhaarNumber">Aadhaar Number</Label>
                    <Input
                      id="aadhaarNumber"
                      placeholder="1234 5678 9012"
                      value={formData.aadhaarNumber}
                      onChange={(e) => handleInputChange('aadhaarNumber', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="panNumber">PAN Number *</Label>
                    <Input
                      id="panNumber"
                      placeholder="ABCDE1234F"
                      value={formData.panNumber}
                      onChange={(e) => handleInputChange('panNumber', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FileUploadCard
                    title="Aadhaar Card"
                    description="Upload front and back copy"
                    fileType="aadhaarCard"
                    required={true}
                  />
                  <FileUploadCard
                    title="PAN Card"
                    description="For tax purposes"
                    fileType="panCard"
                    required={true}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="passportNumber">Passport Number (Optional)</Label>
                    <Input
                      id="passportNumber"
                      placeholder="A1234567"
                      value={formData.passportNumber}
                      onChange={(e) => handleInputChange('passportNumber', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="voterIdNumber">Voter ID Number (Optional)</Label>
                    <Input
                      id="voterIdNumber"
                      placeholder="ABC1234567"
                      value={formData.voterIdNumber}
                      onChange={(e) => handleInputChange('voterIdNumber', e.target.value)}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="address" className="space-y-4">
                <FileUploadCard
                  title="Address Proof"
                  description="Utility bill, rental agreement, or Aadhaar card"
                  fileType="addressProof"
                  required={true}
                />
              </TabsContent>

              <TabsContent value="photo" className="space-y-4">
                <FileUploadCard
                  title="Passport Size Photograph"
                  description="Recent professional photo with white background"
                  fileType="profilePhoto"
                  required={true}
                />
              </TabsContent>
            </Tabs>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <Tabs defaultValue="education" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="education">Educational Qualifications</TabsTrigger>
                <TabsTrigger value="professional">Professional Certifications</TabsTrigger>
              </TabsList>

              <TabsContent value="education" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="highestDegree">Highest Degree *</Label>
                    <Select value={formData.highestDegree} onValueChange={(value) => handleInputChange('highestDegree', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select degree" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                        <SelectItem value="master">Master's Degree</SelectItem>
                        <SelectItem value="phd">Ph.D.</SelectItem>
                        <SelectItem value="diploma">Diploma</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="specialization">Specialization *</Label>
                    <Input
                      id="specialization"
                      placeholder="e.g., Mathematics, Physics"
                      value={formData.specialization}
                      onChange={(e) => handleInputChange('specialization', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="university">University/Institution *</Label>
                    <Input
                      id="university"
                      placeholder="University name"
                      value={formData.university}
                      onChange={(e) => handleInputChange('university', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="graduationYear">Graduation Year *</Label>
                    <Input
                      id="graduationYear"
                      placeholder="2020"
                      value={formData.graduationYear}
                      onChange={(e) => handleInputChange('graduationYear', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cgpa">CGPA/Percentage *</Label>
                    <Input
                      id="cgpa"
                      placeholder="8.5 or 85%"
                      value={formData.cgpa}
                      onChange={(e) => handleInputChange('cgpa', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalQualifications">Additional Qualifications</Label>
                  <Textarea
                    id="additionalQualifications"
                    placeholder="Any additional degrees, diplomas, or certifications"
                    value={formData.additionalQualifications}
                    onChange={(e) => handleInputChange('additionalQualifications', e.target.value)}
                  />
                </div>

                <FileUploadCard
                  title="Educational Certificates"
                  description="Upload all degree certificates, mark sheets, and transcripts"
                  fileType="educationCertificates"
                  required={true}
                />
              </TabsContent>

              <TabsContent value="professional" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tetCertificate">TET Certificate Number</Label>
                    <Input
                      id="tetCertificate"
                      placeholder="TET Certificate Number"
                      value={formData.tetCertificate}
                      onChange={(e) => handleInputChange('tetCertificate', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ctetCertificate">CTET Certificate Number</Label>
                    <Input
                      id="ctetCertificate"
                      placeholder="CTET Certificate Number"
                      value={formData.ctetCertificate}
                      onChange={(e) => handleInputChange('ctetCertificate', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="netSetCertificate">NET/SET Certificate Number</Label>
                  <Input
                    id="netSetCertificate"
                    placeholder="NET/SET Certificate Number"
                    value={formData.netSetCertificate}
                    onChange={(e) => handleInputChange('netSetCertificate', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="otherCertifications">Other Professional Certifications</Label>
                  <Textarea
                    id="otherCertifications"
                    placeholder="List any other relevant certifications (IT, Language, etc.)"
                    value={formData.otherCertifications}
                    onChange={(e) => handleInputChange('otherCertifications', e.target.value)}
                  />
                </div>

                <FileUploadCard
                  title="Professional Certificates"
                  description="Upload CTET, TET, NET, SET and other professional certificates"
                  fileType="professionalCertificates"
                  required={false}
                />
              </TabsContent>
            </Tabs>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="experienceYears">Total Teaching Experience *</Label>
                <Select value={formData.experienceYears} onValueChange={(value) => handleInputChange('experienceYears', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fresher">Fresher (0 years)</SelectItem>
                    <SelectItem value="1-2">1-2 years</SelectItem>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="6-10">6-10 years</SelectItem>
                    <SelectItem value="10+">10+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="previousEmployer">Previous/Current Employer</Label>
                <Input
                  id="previousEmployer"
                  placeholder="School/Institution name"
                  value={formData.previousEmployer}
                  onChange={(e) => handleInputChange('previousEmployer', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="designation">Previous Designation</Label>
                <Input
                  id="designation"
                  placeholder="e.g., Assistant Teacher, PGT Mathematics"
                  value={formData.designation}
                  onChange={(e) => handleInputChange('designation', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currentSalary">Current/Last Salary (Optional)</Label>
                <Input
                  id="currentSalary"
                  placeholder="₹ 50,000"
                  value={formData.currentSalary}
                  onChange={(e) => handleInputChange('currentSalary', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="noticePeriod">Notice Period</Label>
                <Select value={formData.noticePeriod} onValueChange={(value) => handleInputChange('noticePeriod', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select notice period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate</SelectItem>
                    <SelectItem value="15days">15 days</SelectItem>
                    <SelectItem value="1month">1 month</SelectItem>
                    <SelectItem value="2months">2 months</SelectItem>
                    <SelectItem value="3months">3 months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reasonForLeaving">Reason for Leaving</Label>
                <Input
                  id="reasonForLeaving"
                  placeholder="Brief reason"
                  value={formData.reasonForLeaving}
                  onChange={(e) => handleInputChange('reasonForLeaving', e.target.value)}
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="font-medium flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                Teaching Preferences
              </h3>

              <div className="space-y-2">
                <Label>Subjects You Can Teach *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-40 overflow-y-auto border rounded-lg p-3">
                  {subjects.map((subject) => (
                    <div key={subject} className="flex items-center space-x-2">
                      <Checkbox
                        id={subject}
                        checked={formData.subjectsToTeach.includes(subject)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            handleInputChange('subjectsToTeach', [...formData.subjectsToTeach, subject]);
                          } else {
                            handleInputChange('subjectsToTeach', formData.subjectsToTeach.filter((s: string) => s !== subject));
                          }
                        }}
                      />
                      <Label htmlFor={subject} className="text-sm">{subject}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Preferred Classes to Teach *</Label>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-2 max-h-32 overflow-y-auto border rounded-lg p-3">
                  {classes.map((className) => (
                    <div key={className} className="flex items-center space-x-2">
                      <Checkbox
                        id={className}
                        checked={formData.preferredClasses.includes(className)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            handleInputChange('preferredClasses', [...formData.preferredClasses, className]);
                          } else {
                            handleInputChange('preferredClasses', formData.preferredClasses.filter((c: string) => c !== className));
                          }
                        }}
                      />
                      <Label htmlFor={className} className="text-sm">{className}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FileUploadCard
                title="Experience Certificates"
                description="Upload experience letters from previous employers"
                fileType="experienceCertificates"
                required={false}
              />
              <FileUploadCard
                title="Relieving Letter"
                description="Upload relieving letter from last employer"
                fileType="relievingLetter"
                required={false}
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                Background verification is mandatory for all teaching positions to ensure child safety and institutional security.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FileUploadCard
                title="Police Verification Certificate"
                description="Mandatory for child safety compliance"
                fileType="policeVerification"
                required={true}
              />
              <FileUploadCard
                title="Medical Fitness Certificate"
                description="Basic health clearance certificate"
                fileType="medicalCertificate"
                required={true}
              />
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="font-medium flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Emergency Contact Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emergencyContactName">Emergency Contact Name *</Label>
                  <Input
                    id="emergencyContactName"
                    placeholder="Contact person name"
                    value={formData.emergencyContactName}
                    onChange={(e) => handleInputChange('emergencyContactName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyContactRelation">Relationship *</Label>
                  <Select value={formData.emergencyContactRelation} onValueChange={(value) => handleInputChange('emergencyContactRelation', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="father">Father</SelectItem>
                      <SelectItem value="mother">Mother</SelectItem>
                      <SelectItem value="spouse">Spouse</SelectItem>
                      <SelectItem value="sibling">Sibling</SelectItem>
                      <SelectItem value="friend">Friend</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyContactPhone">Phone Number *</Label>
                  <Input
                    id="emergencyContactPhone"
                    placeholder="+91 98765 43210"
                    value={formData.emergencyContactPhone}
                    onChange={(e) => handleInputChange('emergencyContactPhone', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Banking Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bankName">Bank Name *</Label>
                  <Input
                    id="bankName"
                    placeholder="e.g., State Bank of India"
                    value={formData.bankName}
                    onChange={(e) => handleInputChange('bankName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountHolderName">Account Holder Name *</Label>
                  <Input
                    id="accountHolderName"
                    placeholder="As per bank records"
                    value={formData.accountHolderName}
                    onChange={(e) => handleInputChange('accountHolderName', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Account Number *</Label>
                  <Input
                    id="accountNumber"
                    placeholder="1234567890"
                    value={formData.accountNumber}
                    onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ifscCode">IFSC Code *</Label>
                  <Input
                    id="ifscCode"
                    placeholder="SBIN0001234"
                    value={formData.ifscCode}
                    onChange={(e) => handleInputChange('ifscCode', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <FileUploadCard
              title="Bank Passbook/Cancelled Cheque"
              description="Upload bank passbook first page or cancelled cheque for salary credit"
              fileType="bankPassbook"
              required={true}
            />
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Consent & Declarations
              </h3>

              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-4 border rounded-lg">
                  <Checkbox
                    id="backgroundCheckConsent"
                    checked={formData.backgroundCheckConsent}
                    onCheckedChange={(checked) => handleInputChange('backgroundCheckConsent', checked)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="backgroundCheckConsent" className="text-sm font-medium">
                      Background Verification Consent *
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      I consent to background verification checks including criminal record verification, 
                      reference checks, and social media screening as required by the institution.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 border rounded-lg">
                  <Checkbox
                    id="dataPrivacyConsent"
                    checked={formData.dataPrivacyConsent}
                    onCheckedChange={(checked) => handleInputChange('dataPrivacyConsent', checked)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="dataPrivacyConsent" className="text-sm font-medium">
                      Data Privacy & Processing Consent *
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      I consent to the collection, processing, and storage of my personal data for 
                      employment purposes and institutional record-keeping.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 border rounded-lg">
                  <Checkbox
                    id="codeOfConductConsent"
                    checked={formData.codeOfConductConsent}
                    onCheckedChange={(checked) => handleInputChange('codeOfConductConsent', checked)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="codeOfConductConsent" className="text-sm font-medium">
                      Code of Conduct Agreement *
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      I agree to abide by the institution's code of conduct, child protection policies, 
                      and professional ethics standards.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 border rounded-lg">
                  <Checkbox
                    id="medicalFitnessConsent"
                    checked={formData.medicalFitnessConsent}
                    onCheckedChange={(checked) => handleInputChange('medicalFitnessConsent', checked)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="medicalFitnessConsent" className="text-sm font-medium">
                      Medical Fitness Declaration *
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      I declare that I am medically fit to perform teaching duties and will notify 
                      the institution of any health conditions that may affect my work.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                By submitting this application, you declare that all information provided is true and complete. 
                Any false information may result in rejection of application or termination of employment.
              </AlertDescription>
            </Alert>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Teacher Onboarding</CardTitle>
                <CardDescription>Complete your profile to join our teaching faculty</CardDescription>
              </div>
              <Button variant="outline" onClick={() => onNavigate('login')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Login
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Progress Bar */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm text-muted-foreground">{currentStep} of {totalSteps}</span>
              </div>
              <Progress value={progress} className="w-full" />
              
              {/* Step Indicators */}
              <div className="flex items-center justify-between">
                {steps.map((step) => {
                  const Icon = step.icon;
                  const isCompleted = currentStep > step.id;
                  const isCurrent = currentStep === step.id;
                  
                  return (
                    <div key={step.id} className="flex flex-col items-center space-y-2">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                          isCompleted
                            ? 'bg-green-500 border-green-500 text-white'
                            : isCurrent
                            ? 'bg-primary border-primary text-primary-foreground'
                            : 'bg-background border-border text-muted-foreground'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="h-5 w-5" />
                        ) : (
                          <Icon className="h-5 w-5" />
                        )}
                      </div>
                      <div className="text-center">
                        <div className="text-xs font-medium">{step.title}</div>
                        <div className="text-xs text-muted-foreground hidden md:block">{step.description}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {(() => {
                const Icon = steps[currentStep - 1]?.icon || User;
                return <Icon className="h-5 w-5" />;
              })()}
              {steps[currentStep - 1]?.title}
            </CardTitle>
            <CardDescription>{steps[currentStep - 1]?.description}</CardDescription>
          </CardHeader>
          <CardContent>
            {renderStepContent()}
          </CardContent>
          <CardContent className="pt-0">
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePreviousStep}
                disabled={currentStep === 1}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              
              {currentStep === totalSteps ? (
                <Button
                  onClick={handleSubmit}
                  disabled={!formData.backgroundCheckConsent || !formData.dataPrivacyConsent || !formData.codeOfConductConsent || !formData.medicalFitnessConsent}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Submit Application
                  <CheckCircle2 className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleNextStep}>
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}