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
  User, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft, 
  ArrowRight,
  UserCheck,
  MapPin,
  Calendar,
  Award,
  Phone,
  Mail,
  Camera,
  FileCheck,
  Lock,
  BookOpen,
  Users,
  Stethoscope
} from 'lucide-react';
import { toast } from "sonner";

interface StudentOnboardingProps {
  onNavigate: (screen: string) => void;
}

export function StudentOnboarding({ onNavigate }: StudentOnboardingProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    email: '',
    mobile: '',
    parentMobile: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    bloodGroup: '',
    
    // Identity Documents
    aadhaarNumber: '',
    studentAadhaarNumber: '',
    parentAadhaarNumber: '',
    
    // Address Information
    permanentAddress: '',
    currentAddress: '',
    city: '',
    state: '',
    pincode: '',
    
    // Academic Information
    admissionClass: '',
    previousSchool: '',
    previousClass: '',
    previousPercentage: '',
    boardName: '',
    passingYear: '',
    
    // Category Information
    category: '',
    caste: '',
    religion: '',
    ewsCertificate: '',
    disabilityStatus: '',
    disabilityType: '',
    disabilityPercentage: '',
    
    // Entrance/Admission Details
    entranceExam: '',
    entranceScore: '',
    entranceRank: '',
    admissionNumber: '',
    admissionDate: '',
    
    // Parent/Guardian Information
    fatherName: '',
    fatherOccupation: '',
    fatherEducation: '',
    fatherIncome: '',
    motherName: '',
    motherOccupation: '',
    motherEducation: '',
    motherIncome: '',
    guardianName: '',
    guardianRelation: '',
    guardianContact: '',
    
    // Emergency Contact
    emergencyContactName: '',
    emergencyContactRelation: '',
    emergencyContactPhone: '',
    
    // Health Information
    allergies: '',
    medicalConditions: '',
    medications: '',
    
    // Transportation
    transportRequired: false,
    transportRoute: '',
    pickupPoint: '',
    
    // Consent & Agreements
    antiRaggingConsent: false,
    codeOfConductConsent: false,
    dataPrivacyConsent: false,
    medicalConsentForm: false,
    photographConsent: false
  });

  const [uploadedFiles, setUploadedFiles] = useState({
    studentPhoto: null,
    aadhaarCard: null,
    parentAadhaarCard: null,
    birthCertificate: null,
    previousMarksheet: null,
    transferCertificate: null,
    characterCertificate: null,
    migrationCertificate: null,
    casteCertificate: null,
    ewsCertificate: null,
    disabilityCertificate: null,
    entranceScorecard: null,
    admissionLetter: null,
    medicalCertificate: null,
    vaccinationCertificate: null,
    addressProof: null
  });

  const totalSteps = 6;
  const progress = (currentStep / totalSteps) * 100;

  const steps = [
    { id: 1, title: 'Personal Details', icon: User, description: 'Student & family information' },
    { id: 2, title: 'Documents', icon: FileText, description: 'Identity & address proof' },
    { id: 3, title: 'Academic Records', icon: GraduationCap, description: 'Previous education details' },
    { id: 4, title: 'Category & Admission', icon: Award, description: 'Reservations & entrance details' },
    { id: 5, title: 'Health & Safety', icon: Stethoscope, description: 'Medical & compliance forms' },
    { id: 6, title: 'Final Review', icon: CheckCircle2, description: 'Consent & submission' }
  ];

  const classes = [
    'Pre-KG', 'LKG', 'UKG', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
    'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'
  ];

  const boards = [
    'CBSE', 'ICSE', 'State Board', 'IGCSE', 'IB', 'NIOS', 'Other'
  ];

  const categories = [
    'General', 'OBC', 'SC', 'ST', 'EWS'
  ];

  const bloodGroups = [
    'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'
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
    toast.success("Student onboarding application submitted successfully!");
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
            <Tabs defaultValue="student" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="student">Student Information</TabsTrigger>
                <TabsTrigger value="parents">Parent/Guardian Details</TabsTrigger>
              </TabsList>

              <TabsContent value="student" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Student Full Name *</Label>
                    <Input
                      id="fullName"
                      placeholder="Enter student's full name"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    <Label htmlFor="bloodGroup">Blood Group</Label>
                    <Select value={formData.bloodGroup} onValueChange={(value) => handleInputChange('bloodGroup', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select blood group" />
                      </SelectTrigger>
                      <SelectContent>
                        {bloodGroups.map(group => (
                          <SelectItem key={group} value={group}>{group}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nationality">Nationality</Label>
                    <Input
                      id="nationality"
                      placeholder="Indian"
                      value={formData.nationality}
                      onChange={(e) => handleInputChange('nationality', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="student@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mobile">Student Mobile Number</Label>
                    <Input
                      id="mobile"
                      placeholder="+91 98765 43210"
                      value={formData.mobile}
                      onChange={(e) => handleInputChange('mobile', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="studentAadhaarNumber">Student Aadhaar Number</Label>
                    <Input
                      id="studentAadhaarNumber"
                      placeholder="1234 5678 9012"
                      value={formData.studentAadhaarNumber}
                      onChange={(e) => handleInputChange('studentAadhaarNumber', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admissionClass">Admission Seeking for Class *</Label>
                    <Select value={formData.admissionClass} onValueChange={(value) => handleInputChange('admissionClass', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        {classes.map(cls => (
                          <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                        ))}
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
                      placeholder="Enter permanent address"
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
                      placeholder="Enter current address"
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
              </TabsContent>

              <TabsContent value="parents" className="space-y-4">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Father's Information
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fatherName">Father's Name *</Label>
                        <Input
                          id="fatherName"
                          placeholder="Father's full name"
                          value={formData.fatherName}
                          onChange={(e) => handleInputChange('fatherName', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="fatherOccupation">Father's Occupation</Label>
                        <Input
                          id="fatherOccupation"
                          placeholder="Occupation"
                          value={formData.fatherOccupation}
                          onChange={(e) => handleInputChange('fatherOccupation', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fatherEducation">Father's Education</Label>
                        <Input
                          id="fatherEducation"
                          placeholder="Educational qualification"
                          value={formData.fatherEducation}
                          onChange={(e) => handleInputChange('fatherEducation', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="fatherIncome">Father's Annual Income</Label>
                        <Input
                          id="fatherIncome"
                          placeholder="Annual income"
                          value={formData.fatherIncome}
                          onChange={(e) => handleInputChange('fatherIncome', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Mother's Information
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="motherName">Mother's Name *</Label>
                        <Input
                          id="motherName"
                          placeholder="Mother's full name"
                          value={formData.motherName}
                          onChange={(e) => handleInputChange('motherName', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="motherOccupation">Mother's Occupation</Label>
                        <Input
                          id="motherOccupation"
                          placeholder="Occupation"
                          value={formData.motherOccupation}
                          onChange={(e) => handleInputChange('motherOccupation', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="motherEducation">Mother's Education</Label>
                        <Input
                          id="motherEducation"
                          placeholder="Educational qualification"
                          value={formData.motherEducation}
                          onChange={(e) => handleInputChange('motherEducation', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="motherIncome">Mother's Annual Income</Label>
                        <Input
                          id="motherIncome"
                          placeholder="Annual income"
                          value={formData.motherIncome}
                          onChange={(e) => handleInputChange('motherIncome', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-medium flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Contact Information
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="parentMobile">Primary Contact Number *</Label>
                        <Input
                          id="parentMobile"
                          placeholder="+91 98765 43210"
                          value={formData.parentMobile}
                          onChange={(e) => handleInputChange('parentMobile', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="parentAadhaarNumber">Parent/Guardian Aadhaar *</Label>
                        <Input
                          id="parentAadhaarNumber"
                          placeholder="1234 5678 9012"
                          value={formData.parentAadhaarNumber}
                          onChange={(e) => handleInputChange('parentAadhaarNumber', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Guardian Information (if different from parents)</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="guardianName">Guardian Name</Label>
                          <Input
                            id="guardianName"
                            placeholder="Guardian's name"
                            value={formData.guardianName}
                            onChange={(e) => handleInputChange('guardianName', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="guardianRelation">Relation</Label>
                          <Input
                            id="guardianRelation"
                            placeholder="Relation to student"
                            value={formData.guardianRelation}
                            onChange={(e) => handleInputChange('guardianRelation', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="guardianContact">Guardian Contact</Label>
                          <Input
                            id="guardianContact"
                            placeholder="+91 98765 43210"
                            value={formData.guardianContact}
                            onChange={(e) => handleInputChange('guardianContact', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
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
                <TabsTrigger value="identity">Identity Documents</TabsTrigger>
                <TabsTrigger value="address">Address Proof</TabsTrigger>
                <TabsTrigger value="photo">Photographs</TabsTrigger>
              </TabsList>

              <TabsContent value="identity" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FileUploadCard
                    title="Student Aadhaar Card"
                    description="Student's Aadhaar card (front and back)"
                    fileType="aadhaarCard"
                    required={true}
                  />
                  <FileUploadCard
                    title="Parent/Guardian Aadhaar"
                    description="Parent or guardian's Aadhaar card"
                    fileType="parentAadhaarCard"
                    required={true}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FileUploadCard
                    title="Birth Certificate"
                    description="Official birth certificate or 10th grade certificate"
                    fileType="birthCertificate"
                    required={true}
                  />
                  <FileUploadCard
                    title="Address Proof"
                    description="Utility bill, rental agreement, or Aadhaar"
                    fileType="addressProof"
                    required={true}
                  />
                </div>
              </TabsContent>

              <TabsContent value="address" className="space-y-4">
                <FileUploadCard
                  title="Address Proof Document"
                  description="Recent utility bill, rental agreement, or property documents"
                  fileType="addressProof"
                  required={true}
                />
              </TabsContent>

              <TabsContent value="photo" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FileUploadCard
                    title="Student Photograph"
                    description="Recent passport-size photo with white background (2-4 copies)"
                    fileType="studentPhoto"
                    required={true}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                Previous Academic Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="previousSchool">Previous School/Institution *</Label>
                  <Input
                    id="previousSchool"
                    placeholder="Name of previous school"
                    value={formData.previousSchool}
                    onChange={(e) => handleInputChange('previousSchool', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="previousClass">Last Class Completed *</Label>
                  <Select value={formData.previousClass} onValueChange={(value) => handleInputChange('previousClass', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map(cls => (
                        <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="boardName">Board/University *</Label>
                  <Select value={formData.boardName} onValueChange={(value) => handleInputChange('boardName', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select board" />
                    </SelectTrigger>
                    <SelectContent>
                      {boards.map(board => (
                        <SelectItem key={board} value={board}>{board}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passingYear">Year of Passing *</Label>
                  <Input
                    id="passingYear"
                    placeholder="2023"
                    value={formData.passingYear}
                    onChange={(e) => handleInputChange('passingYear', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="previousPercentage">Percentage/CGPA *</Label>
                  <Input
                    id="previousPercentage"
                    placeholder="85% or 8.5 CGPA"
                    value={formData.previousPercentage}
                    onChange={(e) => handleInputChange('previousPercentage', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="font-medium">Academic Documents</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FileUploadCard
                  title="Previous Academic Marksheet"
                  description="Last qualifying exam marksheet/report card"
                  fileType="previousMarksheet"
                  required={true}
                />
                <FileUploadCard
                  title="Transfer Certificate (TC)"
                  description="School leaving certificate from previous institution"
                  fileType="transferCertificate"
                  required={true}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FileUploadCard
                  title="Character Certificate"
                  description="Character/conduct certificate from previous institution"
                  fileType="characterCertificate"
                  required={true}
                />
                <FileUploadCard
                  title="Migration Certificate"
                  description="Required for change of board/university (if applicable)"
                  fileType="migrationCertificate"
                  required={false}
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <Tabs defaultValue="category" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="category">Category & Reservation</TabsTrigger>
                <TabsTrigger value="admission">Admission Details</TabsTrigger>
              </TabsList>

              <TabsContent value="category" className="space-y-4">
                <div className="space-y-4">
                  <h3 className="font-medium flex items-center gap-2">
                    <Award className="h-4 w-4" />
                    Category Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(cat => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="caste">Caste (if applicable)</Label>
                      <Input
                        id="caste"
                        placeholder="Caste"
                        value={formData.caste}
                        onChange={(e) => handleInputChange('caste', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="religion">Religion</Label>
                      <Input
                        id="religion"
                        placeholder="Religion"
                        value={formData.religion}
                        onChange={(e) => handleInputChange('religion', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Disability Information (if applicable)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="disabilityStatus">Disability Status</Label>
                        <Select value={formData.disabilityStatus} onValueChange={(value) => handleInputChange('disabilityStatus', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">No Disability</SelectItem>
                            <SelectItem value="visual">Visual Impairment</SelectItem>
                            <SelectItem value="hearing">Hearing Impairment</SelectItem>
                            <SelectItem value="physical">Physical Disability</SelectItem>
                            <SelectItem value="intellectual">Intellectual Disability</SelectItem>
                            <SelectItem value="multiple">Multiple Disabilities</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="disabilityType">Type of Disability</Label>
                        <Input
                          id="disabilityType"
                          placeholder="Specify type"
                          value={formData.disabilityType}
                          onChange={(e) => handleInputChange('disabilityType', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="disabilityPercentage">Disability Percentage</Label>
                        <Input
                          id="disabilityPercentage"
                          placeholder="Percentage"
                          value={formData.disabilityPercentage}
                          onChange={(e) => handleInputChange('disabilityPercentage', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FileUploadCard
                    title="Caste Certificate"
                    description="Required for SC/ST/OBC categories"
                    fileType="casteCertificate"
                    required={false}
                  />
                  <FileUploadCard
                    title="EWS Certificate"
                    description="Required for Economically Weaker Section"
                    fileType="ewsCertificate"
                    required={false}
                  />
                </div>

                <FileUploadCard
                  title="Disability Certificate"
                  description="PwD certificate if applying under special category"
                  fileType="disabilityCertificate"
                  required={false}
                />
              </TabsContent>

              <TabsContent value="admission" className="space-y-4">
                <div className="space-y-4">
                  <h3 className="font-medium flex items-center gap-2">
                    <FileCheck className="h-4 w-4" />
                    Entrance & Admission Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="entranceExam">Entrance Exam (if applicable)</Label>
                      <Input
                        id="entranceExam"
                        placeholder="Name of entrance exam"
                        value={formData.entranceExam}
                        onChange={(e) => handleInputChange('entranceExam', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="entranceScore">Entrance Score</Label>
                      <Input
                        id="entranceScore"
                        placeholder="Score obtained"
                        value={formData.entranceScore}
                        onChange={(e) => handleInputChange('entranceScore', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="entranceRank">Entrance Rank</Label>
                      <Input
                        id="entranceRank"
                        placeholder="Rank obtained"
                        value={formData.entranceRank}
                        onChange={(e) => handleInputChange('entranceRank', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="admissionNumber">Admission Number</Label>
                      <Input
                        id="admissionNumber"
                        placeholder="Admission/Application number"
                        value={formData.admissionNumber}
                        onChange={(e) => handleInputChange('admissionNumber', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="admissionDate">Admission Date</Label>
                    <Input
                      id="admissionDate"
                      type="date"
                      value={formData.admissionDate}
                      onChange={(e) => handleInputChange('admissionDate', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FileUploadCard
                    title="Entrance Exam Scorecard"
                    description="Upload entrance exam result/scorecard"
                    fileType="entranceScorecard"
                    required={false}
                  />
                  <FileUploadCard
                    title="Admission Offer Letter"
                    description="Admission allotment/offer letter"
                    fileType="admissionLetter"
                    required={false}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <Tabs defaultValue="health" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="health">Health Information</TabsTrigger>
                <TabsTrigger value="emergency">Emergency & Transport</TabsTrigger>
              </TabsList>

              <TabsContent value="health" className="space-y-4">
                <div className="space-y-4">
                  <h3 className="font-medium flex items-center gap-2">
                    <Stethoscope className="h-4 w-4" />
                    Medical Information
                  </h3>

                  <div className="space-y-2">
                    <Label htmlFor="allergies">Known Allergies</Label>
                    <Textarea
                      id="allergies"
                      placeholder="List any known allergies (food, medicine, environmental)"
                      value={formData.allergies}
                      onChange={(e) => handleInputChange('allergies', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="medicalConditions">Medical Conditions</Label>
                    <Textarea
                      id="medicalConditions"
                      placeholder="Any chronic conditions, diseases, or medical history"
                      value={formData.medicalConditions}
                      onChange={(e) => handleInputChange('medicalConditions', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="medications">Current Medications</Label>
                    <Textarea
                      id="medications"
                      placeholder="List any regular medications with dosage"
                      value={formData.medications}
                      onChange={(e) => handleInputChange('medications', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FileUploadCard
                    title="Medical Fitness Certificate"
                    description="Basic health clearance from registered medical practitioner"
                    fileType="medicalCertificate"
                    required={true}
                  />
                  <FileUploadCard
                    title="Vaccination Certificate"
                    description="COVID vaccination certificate or other required immunizations"
                    fileType="vaccinationCertificate"
                    required={true}
                  />
                </div>
              </TabsContent>

              <TabsContent value="emergency" className="space-y-4">
                <div className="space-y-4">
                  <h3 className="font-medium flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Emergency Contact (Other than Parents)
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="emergencyContactName">Emergency Contact Name</Label>
                      <Input
                        id="emergencyContactName"
                        placeholder="Contact person name"
                        value={formData.emergencyContactName}
                        onChange={(e) => handleInputChange('emergencyContactName', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergencyContactRelation">Relationship</Label>
                      <Input
                        id="emergencyContactRelation"
                        placeholder="Relation to student"
                        value={formData.emergencyContactRelation}
                        onChange={(e) => handleInputChange('emergencyContactRelation', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergencyContactPhone">Phone Number</Label>
                      <Input
                        id="emergencyContactPhone"
                        placeholder="+91 98765 43210"
                        value={formData.emergencyContactPhone}
                        onChange={(e) => handleInputChange('emergencyContactPhone', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">Transportation Requirements</h3>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="transportRequired"
                      checked={formData.transportRequired}
                      onCheckedChange={(checked) => handleInputChange('transportRequired', checked)}
                    />
                    <Label htmlFor="transportRequired">School transportation required</Label>
                  </div>

                  {formData.transportRequired && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="transportRoute">Preferred Route</Label>
                        <Input
                          id="transportRoute"
                          placeholder="Route name or area"
                          value={formData.transportRoute}
                          onChange={(e) => handleInputChange('transportRoute', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pickupPoint">Pickup Point</Label>
                        <Input
                          id="pickupPoint"
                          placeholder="Specific pickup location"
                          value={formData.pickupPoint}
                          onChange={(e) => handleInputChange('pickupPoint', e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Consent Forms & Declarations
              </h3>

              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-4 border rounded-lg">
                  <Checkbox
                    id="antiRaggingConsent"
                    checked={formData.antiRaggingConsent}
                    onCheckedChange={(checked) => handleInputChange('antiRaggingConsent', checked)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="antiRaggingConsent" className="text-sm font-medium">
                      Anti-Ragging Affidavit *
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      I undertake that my child will not indulge in any form of ragging and will abide by 
                      anti-ragging policies. I understand that ragging is a criminal offense.
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
                      Code of Conduct Acceptance *
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      I agree that my child will follow the institution's code of conduct, rules, and 
                      regulations. I understand disciplinary actions for violations.
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
                      Data Privacy Consent *
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      I consent to the collection, processing, and storage of student and family data 
                      for educational purposes and institutional record-keeping.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 border rounded-lg">
                  <Checkbox
                    id="medicalConsentForm"
                    checked={formData.medicalConsentForm}
                    onCheckedChange={(checked) => handleInputChange('medicalConsentForm', checked)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="medicalConsentForm" className="text-sm font-medium">
                      Medical Emergency Consent *
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      I authorize the institution to provide necessary medical care to my child in case 
                      of emergency when I cannot be contacted immediately.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 border rounded-lg">
                  <Checkbox
                    id="photographConsent"
                    checked={formData.photographConsent}
                    onCheckedChange={(checked) => handleInputChange('photographConsent', checked)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="photographConsent" className="text-sm font-medium">
                      Photography & Publication Consent
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      I consent to my child's photograph being used for institutional publications, 
                      website, and promotional materials.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                By submitting this application, I declare that all information provided is true and complete. 
                Any false information may result in rejection of admission or cancellation of enrollment.
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
                <CardTitle className="text-2xl">Student Admission Application</CardTitle>
                <CardDescription>Complete student onboarding for enrollment</CardDescription>
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
                  disabled={!formData.antiRaggingConsent || !formData.codeOfConductConsent || !formData.dataPrivacyConsent || !formData.medicalConsentForm}
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