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
  Building2, 
  School, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft, 
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Award,
  FileCheck,
  Lock,
  Globe,
  Users,
  Briefcase,
  ClipboardCheck,
  AlertTriangle,
  Info
} from 'lucide-react';
import { toast } from "sonner";

interface InstituteOnboardingProps {
  onNavigate: (screen: import("../App").Screen) => void;
}

export function InstituteOnboarding({ onNavigate }: InstituteOnboardingProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<{
    // Basic Information
    instituteName: string;
    phone: string;
    email: string;
    alternatePhone: string;
    alternateEmail: string;
    otp: string;
    institutionType: string;
    registrationNumber: string;
    panNumber: string;
    gstNumber: string;
    trustRegistrationNumber: string;
    incorporationNumber: string;
    completeAddress: string;
    city: string;
    state: string;
    pincode: string;
    district: string;
    landmark: string;
    website: string;
    affiliatedBoard: string;
    affiliationNumber: string;
    recognitionNumber: string;
    aicteApprovalNumber: string;
    ugcRecognitionNumber: string;
    naacGrade: string;
    isoNumber: string;
    yearEstablished: string;
    landArea: string;
    builtUpArea: string;
    totalClassrooms: string;
    laboratories: string;
    library: string;
    playground: string;
    coursesOffered: string[];
    mediumOfInstruction: string[];
    boardsAffiliated: string[];
    classesOffered: string[];
    totalStudentCapacity: string;
    currentStudentStrength: string;
    totalTeachingStaff: string;
    totalNonTeachingStaff: string;
    signatoryName: string;
    signatoryDesignation: string;
    signatoryPhone: string;
    signatoryEmail: string;
    signatoryIdType: string;
    signatoryIdNumber: string;
    bankName: string;
    branchName: string;
    accountNumber: string;
    ifscCode: string;
    accountHolderName: string;
    annualFeeCollection: string;
    fireSafetyCertificateNumber: string;
    buildingSafetyCertificateNumber: string;
    healthCertificateNumber: string;
    udiseCode: string;
    aisheCode: string;
    affiliationVerificationConsent: boolean;
    physicalVerificationConsent: boolean;
    dataPrivacyConsent: boolean;
    termsConditionsConsent: boolean;
  }>({
    // Basic Information
    instituteName: '',
    phone: '',
    email: '',
    alternatePhone: '',
    alternateEmail: '',
    otp: '',
    
    // Institution Type & Registration
    institutionType: '',
    registrationNumber: '',
    panNumber: '',
    gstNumber: '',
    trustRegistrationNumber: '',
    incorporationNumber: '',
    
    // Address Information
    completeAddress: '',
    city: '',
    state: '',
    pincode: '',
    district: '',
    landmark: '',
    website: '',
    
    // Accreditation & Recognition
    affiliatedBoard: '',
    affiliationNumber: '',
    recognitionNumber: '',
    aicteApprovalNumber: '',
    ugcRecognitionNumber: '',
    naacGrade: '',
    isoNumber: '',
    
    // Operational Details
    yearEstablished: '',
    landArea: '',
    builtUpArea: '',
    totalClassrooms: '',
    laboratories: '',
    library: '',
    playground: '',
    
    // Academic Information
    coursesOffered: [],
    mediumOfInstruction: [],
    boardsAffiliated: [],
    classesOffered: [],
    totalStudentCapacity: '',
    currentStudentStrength: '',
    totalTeachingStaff: '',
    totalNonTeachingStaff: '',
    
    // Authorized Signatory
    signatoryName: '',
    signatoryDesignation: '',
    signatoryPhone: '',
    signatoryEmail: '',
    signatoryIdType: '',
    signatoryIdNumber: '',
    
    // Banking & Financial
    bankName: '',
    branchName: '',
    accountNumber: '',
    ifscCode: '',
    accountHolderName: '',
    annualFeeCollection: '',
    
    // Safety & Compliance
    fireSafetyCertificateNumber: '',
    buildingSafetyCertificateNumber: '',
    healthCertificateNumber: '',
    
    // Cross-Verification
    udiseCode: '',
    aisheCode: '',
    affiliationVerificationConsent: false,
    physicalVerificationConsent: false,
    dataPrivacyConsent: false,
    termsConditionsConsent: false
  });

  const [uploadedFiles, setUploadedFiles] = useState({
    // Core Legal Documents
    registrationCertificate: null,
    panCard: null,
    gstCertificate: null,
    trustCertificate: null,
    incorporationCertificate: null,
    
    // Accreditation Documents
    affiliationLetter: null,
    boardRecognition: null,
    aicteApproval: null,
    ugcRecognition: null,
    naacCertificate: null,
    isoCertificate: null,
    
    // Operational Compliance
    fireSafetyCertificate: null,
    buildingSafetyCertificate: null,
    healthCertificate: null,
    
    // Infrastructure & Facilities
    buildingPhotos: null,
    facilityPhotos: null,
    
    // Authorized Signatory
    signatoryIdProof: null,
    signatoryPhoto: null,
    
    // Banking
    bankPassbook: null,
    
    // Additional Documents
    feeStructure: null,
    prospectus: null,
    studentHandbook: null
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const totalSteps = 8;
  const progress = (currentStep / totalSteps) * 100;

  const steps = [
    { id: 1, title: 'Basic Information', icon: Building2, description: 'Institution details & contact' },
    { id: 2, title: 'Legal Registration', icon: FileText, description: 'Registration & legal documents' },
    { id: 3, title: 'Accreditation', icon: Award, description: 'Recognition & certification' },
    { id: 4, title: 'Infrastructure', icon: School, description: 'Facilities & operational details' },
    { id: 5, title: 'Academic Setup', icon: ClipboardCheck, description: 'Courses & academic structure' },
    { id: 6, title: 'Compliance', icon: Shield, description: 'Safety & regulatory compliance' },
    { id: 7, title: 'Banking & Finance', icon: Briefcase, description: 'Financial & banking details' },
    { id: 8, title: 'Final Review', icon: CheckCircle2, description: 'Verification & submission' }
  ];

  const institutionTypes = [
    'CBSE School',
    'ICSE School',
    'State Board School',
    'Central School (KV)',
    'Navodaya Vidyalaya (JNV)',
    'Kendriya Vidyalaya',
    'Engineering College',
    'Medical College',
    'Dental College',
    'Arts & Science College',
    'Commerce College',
    'Law College',
    'Management Institute',
    'Technical Institute',
    'Polytechnic Institute',
    'ITI (Industrial Training Institute)',
    'Training Center',
    'University',
    'Deemed University',
    'Research Institute',
    'Coaching Center',
    'Other'
  ];

  const boardOptions = [
    'CBSE (Central Board of Secondary Education)',
    'ICSE (Indian Certificate of Secondary Education)',
    'State Board',
    'IB (International Baccalaureate)',
    'Cambridge International',
    'IGCSE',
    'NIOS (National Institute of Open Schooling)',
    'Other'
  ];

  const coursesOptions = [
    'Pre-Primary (Nursery, LKG, UKG)',
    'Primary (Classes 1-5)',
    'Secondary (Classes 6-10)',
    'Higher Secondary (Classes 11-12)',
    'Undergraduate Programs',
    'Postgraduate Programs',
    'Diploma Courses',
    'Certificate Courses',
    'Professional Courses',
    'Vocational Training',
    'Research Programs',
    'Distance Learning',
    'Online Programs'
  ];

  const mediumOptions = [
    'English', 'Hindi', 'Tamil', 'Telugu', 'Kannada', 'Malayalam', 'Marathi', 
    'Bengali', 'Gujarati', 'Punjabi', 'Urdu', 'Sanskrit', 'Other'
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (fileType: string, file: File) => {
    setUploadedFiles(prev => ({ ...prev, [fileType]: file }));
    toast.success(`${fileType} uploaded successfully`);
  };

  const handleSendOTP = () => {
    if (!formData.phone || !formData.email) {
      toast.error("Please enter phone number and email");
      return;
    }
    setOtpSent(true);
    toast.success("OTP sent to your phone and email");
  };

  const handleVerifyOTP = () => {
    if (!formData.otp) {
      toast.error("Please enter OTP");
      return;
    }
    if (formData.otp === "123456") {
      setOtpVerified(true);
      toast.success("OTP verified successfully");
    } else {
      toast.error("Invalid OTP. Use 123456 for demo");
    }
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
    toast.success("Institute onboarding application submitted successfully!");
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
                <Label htmlFor="instituteName">Institution Name *</Label>
                <Input
                  id="instituteName"
                  placeholder="Enter institution name"
                  value={formData.instituteName}
                  onChange={(e) => handleInputChange('instituteName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="institutionType">Institution Type *</Label>
                <Select value={formData.institutionType} onValueChange={(value) => handleInputChange('institutionType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select institution type" />
                  </SelectTrigger>
                  <SelectContent>
                    {institutionTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Primary Phone Number *</Label>
                <Input
                  id="phone"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="alternatePhone">Alternate Phone Number</Label>
                <Input
                  id="alternatePhone"
                  placeholder="+91 98765 43211"
                  value={formData.alternatePhone}
                  onChange={(e) => handleInputChange('alternatePhone', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Primary Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@institution.edu"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="alternateEmail">Alternate Email Address</Label>
                <Input
                  id="alternateEmail"
                  type="email"
                  placeholder="principal@institution.edu"
                  value={formData.alternateEmail}
                  onChange={(e) => handleInputChange('alternateEmail', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Official Website</Label>
              <Input
                id="website"
                placeholder="https://www.institution.edu"
                value={formData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
              />
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="font-medium flex items-center gap-2">
                <Shield className="h-4 w-4" />
                OTP Verification
              </h3>

              {!otpSent ? (
                <Button onClick={handleSendOTP} className="w-full md:w-auto">
                  <Phone className="h-4 w-4 mr-2" />
                  Send OTP for Verification
                </Button>
              ) : (
                <div className="space-y-4">
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      OTP sent to {formData.phone} and {formData.email}
                    </AlertDescription>
                  </Alert>
                  
                  <div className="space-y-2">
                    <Label htmlFor="otp">Enter OTP *</Label>
                    <Input
                      id="otp"
                      placeholder="Enter 6-digit OTP (use 123456 for demo)"
                      maxLength={6}
                      value={formData.otp}
                      onChange={(e) => handleInputChange('otp', e.target.value)}
                    />
                  </div>

                  {!otpVerified ? (
                    <Button onClick={handleVerifyOTP} className="w-full md:w-auto">
                      <Shield className="h-4 w-4 mr-2" />
                      Verify OTP
                    </Button>
                  ) : (
                    <Alert className="border-green-200 bg-green-50">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-800">
                        OTP verified successfully!
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              )}
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Address Information
              </h3>
              
              <div className="space-y-2">
                <Label htmlFor="completeAddress">Complete Address *</Label>
                <Textarea
                  id="completeAddress"
                  placeholder="Enter complete address with landmarks"
                  value={formData.completeAddress}
                  onChange={(e) => handleInputChange('completeAddress', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                  <Label htmlFor="district">District</Label>
                  <Input
                    id="district"
                    placeholder="District"
                    value={formData.district}
                    onChange={(e) => handleInputChange('district', e.target.value)}
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

              <div className="space-y-2">
                <Label htmlFor="landmark">Landmark</Label>
                <Input
                  id="landmark"
                  placeholder="Near prominent landmark"
                  value={formData.landmark}
                  onChange={(e) => handleInputChange('landmark', e.target.value)}
                />
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
                <strong>Core Identity & Legal Registration Documents</strong><br />
                These confirm the institution's legal existence and are mandatory for onboarding.
              </AlertDescription>
            </Alert>

            <Tabs defaultValue="registration" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="registration">Registration Details</TabsTrigger>
                <TabsTrigger value="documents">Document Upload</TabsTrigger>
                <TabsTrigger value="trust">Trust/Society</TabsTrigger>
              </TabsList>

              <TabsContent value="registration" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="registrationNumber">Registration Number *</Label>
                    <Input
                      id="registrationNumber"
                      placeholder="Institution registration number"
                      value={formData.registrationNumber}
                      onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
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
                  <div className="space-y-2">
                    <Label htmlFor="gstNumber">GST Number</Label>
                    <Input
                      id="gstNumber"
                      placeholder="GST Number (if applicable)"
                      value={formData.gstNumber}
                      onChange={(e) => handleInputChange('gstNumber', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="yearEstablished">Year of Establishment *</Label>
                    <Input
                      id="yearEstablished"
                      placeholder="e.g., 1995"
                      value={formData.yearEstablished}
                      onChange={(e) => handleInputChange('yearEstablished', e.target.value)}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="documents" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FileUploadCard
                    title="Registration Certificate"
                    description="For schools: State Education Dept. | For colleges: UGC approval"
                    fileType="registrationCertificate"
                    required={true}
                  />
                  <FileUploadCard
                    title="PAN Card"
                    description="Permanent Account Number for taxation"
                    fileType="panCard"
                    required={true}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FileUploadCard
                    title="GST Certificate"
                    description="If applicable for your institution"
                    fileType="gstCertificate"
                    required={false}
                  />
                  <FileUploadCard
                    title="Building Photos"
                    description="Exterior and interior photos of the institution"
                    fileType="buildingPhotos"
                    required={true}
                  />
                </div>
              </TabsContent>

              <TabsContent value="trust" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="trustRegistrationNumber">Trust Registration Number</Label>
                    <Input
                      id="trustRegistrationNumber"
                      placeholder="Trust registration number"
                      value={formData.trustRegistrationNumber}
                      onChange={(e) => handleInputChange('trustRegistrationNumber', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="incorporationNumber">Incorporation Number</Label>
                    <Input
                      id="incorporationNumber"
                      placeholder="Company incorporation number"
                      value={formData.incorporationNumber}
                      onChange={(e) => handleInputChange('incorporationNumber', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FileUploadCard
                    title="Trust/Society Registration Certificate"
                    description="Trust deed or society registration certificate"
                    fileType="trustCertificate"
                    required={true}
                  />
                  <FileUploadCard
                    title="Company Incorporation Certificate"
                    description="If run by a private company"
                    fileType="incorporationCertificate"
                    required={false}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <Alert>
              <Award className="h-4 w-4" />
              <AlertDescription>
                <strong>Accreditation & Recognition Documents</strong><br />
                These verify academic legitimacy and regulatory compliance.
              </AlertDescription>
            </Alert>

            <Tabs defaultValue="affiliation" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="affiliation">Affiliation Details</TabsTrigger>
                <TabsTrigger value="accreditation">Accreditation & Quality</TabsTrigger>
              </TabsList>

              <TabsContent value="affiliation" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="affiliatedBoard">Affiliated Board/University *</Label>
                    <Select value={formData.affiliatedBoard} onValueChange={(value) => handleInputChange('affiliatedBoard', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select board/university" />
                      </SelectTrigger>
                      <SelectContent>
                        {boardOptions.map(board => (
                          <SelectItem key={board} value={board}>{board}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="affiliationNumber">Affiliation Number *</Label>
                    <Input
                      id="affiliationNumber"
                      placeholder="Board/University affiliation number"
                      value={formData.affiliationNumber}
                      onChange={(e) => handleInputChange('affiliationNumber', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="recognitionNumber">Recognition Number</Label>
                    <Input
                      id="recognitionNumber"
                      placeholder="Official recognition number"
                      value={formData.recognitionNumber}
                      onChange={(e) => handleInputChange('recognitionNumber', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="aicteApprovalNumber">AICTE Approval Number</Label>
                    <Input
                      id="aicteApprovalNumber"
                      placeholder="For technical institutions"
                      value={formData.aicteApprovalNumber}
                      onChange={(e) => handleInputChange('aicteApprovalNumber', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ugcRecognitionNumber">UGC Recognition Number</Label>
                  <Input
                    id="ugcRecognitionNumber"
                    placeholder="For higher education institutions"
                    value={formData.ugcRecognitionNumber}
                    onChange={(e) => handleInputChange('ugcRecognitionNumber', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FileUploadCard
                    title="Affiliation Letter"
                    description="From CBSE/ICSE/State Board or recognized university"
                    fileType="affiliationLetter"
                    required={true}
                  />
                  <FileUploadCard
                    title="Board Recognition Certificate"
                    description="For schools from respective education board"
                    fileType="boardRecognition"
                    required={true}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FileUploadCard
                    title="AICTE/UGC Approval"
                    description="For technical/professional colleges"
                    fileType="aicteApproval"
                    required={false}
                  />
                  <FileUploadCard
                    title="UGC Recognition Letter"
                    description="For higher education institutions"
                    fileType="ugcRecognition"
                    required={false}
                  />
                </div>
              </TabsContent>

              <TabsContent value="accreditation" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="naacGrade">NAAC Grade</Label>
                    <Select value={formData.naacGrade} onValueChange={(value) => handleInputChange('naacGrade', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select NAAC grade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A++">A++</SelectItem>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A">A</SelectItem>
                        <SelectItem value="B++">B++</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B">B</SelectItem>
                        <SelectItem value="C">C</SelectItem>
                        <SelectItem value="not-applicable">Not Applicable</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="isoNumber">ISO Certification Number</Label>
                    <Input
                      id="isoNumber"
                      placeholder="ISO certification number (optional)"
                      value={formData.isoNumber}
                      onChange={(e) => handleInputChange('isoNumber', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FileUploadCard
                    title="NAAC Certificate"
                    description="National Assessment and Accreditation Council certificate"
                    fileType="naacCertificate"
                    required={false}
                  />
                  <FileUploadCard
                    title="ISO Certificate"
                    description="Optional but adds credibility"
                    fileType="isoCertificate"
                    required={false}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium flex items-center gap-2">
                <School className="h-4 w-4" />
                Infrastructure & Facilities
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="landArea">Total Land Area (in sq. ft.)</Label>
                  <Input
                    id="landArea"
                    placeholder="e.g., 50000"
                    value={formData.landArea}
                    onChange={(e) => handleInputChange('landArea', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="builtUpArea">Built-up Area (in sq. ft.)</Label>
                  <Input
                    id="builtUpArea"
                    placeholder="e.g., 30000"
                    value={formData.builtUpArea}
                    onChange={(e) => handleInputChange('builtUpArea', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="totalClassrooms">Total Classrooms</Label>
                  <Input
                    id="totalClassrooms"
                    placeholder="e.g., 50"
                    value={formData.totalClassrooms}
                    onChange={(e) => handleInputChange('totalClassrooms', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="laboratories">Number of Laboratories</Label>
                  <Input
                    id="laboratories"
                    placeholder="e.g., 8"
                    value={formData.laboratories}
                    onChange={(e) => handleInputChange('laboratories', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="library">Library Details</Label>
                  <Input
                    id="library"
                    placeholder="Yes/No and capacity"
                    value={formData.library}
                    onChange={(e) => handleInputChange('library', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="playground">Playground/Sports Facilities</Label>
                  <Input
                    id="playground"
                    placeholder="Available facilities"
                    value={formData.playground}
                    onChange={(e) => handleInputChange('playground', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="font-medium">Cross-Verification Codes</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="udiseCode">UDISE+ Code</Label>
                  <Input
                    id="udiseCode"
                    placeholder="For schools (udiseplus.gov.in)"
                    value={formData.udiseCode}
                    onChange={(e) => handleInputChange('udiseCode', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="aisheCode">AISHE Code</Label>
                  <Input
                    id="aisheCode"
                    placeholder="For higher education (aishe.gov.in)"
                    value={formData.aisheCode}
                    onChange={(e) => handleInputChange('aisheCode', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FileUploadCard
                title="Facility Photos"
                description="Photos of classrooms, labs, library, and other facilities"
                fileType="facilityPhotos"
                required={true}
              />
              <FileUploadCard
                title="Infrastructure Documents"
                description="Building plans, facility details, etc."
                fileType="buildingPhotos"
                required={false}
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium flex items-center gap-2">
                <ClipboardCheck className="h-4 w-4" />
                Academic Structure & Capacity
              </h3>

              <div className="space-y-2">
                <Label>Courses Offered *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto border rounded-lg p-3">
                  {coursesOptions.map((course) => (
                    <div key={course} className="flex items-center space-x-2">
                      <Checkbox
                        id={course}
                        checked={formData.coursesOffered.includes(course)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            handleInputChange('coursesOffered', [...formData.coursesOffered, course]);
                          } else {
                            handleInputChange('coursesOffered', formData.coursesOffered.filter((c: string) => c !== course));
                          }
                        }}
                      />
                      <Label htmlFor={course} className="text-sm">{course}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Medium of Instruction *</Label>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-2 max-h-32 overflow-y-auto border rounded-lg p-3">
                  {mediumOptions.map((medium) => (
                    <div key={medium} className="flex items-center space-x-2">
                      <Checkbox
                        id={medium}
                        checked={formData.mediumOfInstruction.includes(medium)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            handleInputChange('mediumOfInstruction', [...formData.mediumOfInstruction, medium]);
                          } else {
                            handleInputChange('mediumOfInstruction', formData.mediumOfInstruction.filter((m: string) => m !== medium));
                          }
                        }}
                      />
                      <Label htmlFor={medium} className="text-sm">{medium}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Boards Affiliated With</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-32 overflow-y-auto border rounded-lg p-3">
                  {boardOptions.map((board) => (
                    <div key={board} className="flex items-center space-x-2">
                      <Checkbox
                        id={`board-${board}`}
                        checked={formData.boardsAffiliated.includes(board)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            handleInputChange('boardsAffiliated', [...formData.boardsAffiliated, board]);
                          } else {
                            handleInputChange('boardsAffiliated', formData.boardsAffiliated.filter((b: string) => b !== board));
                          }
                        }}
                      />
                      <Label htmlFor={`board-${board}`} className="text-sm">{board}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="font-medium">Capacity & Staffing</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="totalStudentCapacity">Total Student Capacity *</Label>
                  <Input
                    id="totalStudentCapacity"
                    placeholder="e.g., 2500"
                    value={formData.totalStudentCapacity}
                    onChange={(e) => handleInputChange('totalStudentCapacity', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currentStudentStrength">Current Student Strength</Label>
                  <Input
                    id="currentStudentStrength"
                    placeholder="e.g., 2200"
                    value={formData.currentStudentStrength}
                    onChange={(e) => handleInputChange('currentStudentStrength', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="totalTeachingStaff">Total Teaching Staff</Label>
                  <Input
                    id="totalTeachingStaff"
                    placeholder="e.g., 150"
                    value={formData.totalTeachingStaff}
                    onChange={(e) => handleInputChange('totalTeachingStaff', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="totalNonTeachingStaff">Total Non-Teaching Staff</Label>
                  <Input
                    id="totalNonTeachingStaff"
                    placeholder="e.g., 50"
                    value={formData.totalNonTeachingStaff}
                    onChange={(e) => handleInputChange('totalNonTeachingStaff', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FileUploadCard
                title="Fee Structure"
                description="Official fee structure document"
                fileType="feeStructure"
                required={true}
              />
              <FileUploadCard
                title="Prospectus/Brochure"
                description="Institution prospectus or informational brochure"
                fileType="prospectus"
                required={false}
              />
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                <strong>Operational & Compliance Proof</strong><br />
                These ensure regulatory compliance and safety standards.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <h3 className="font-medium">Safety & Compliance Certificates</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fireSafetyCertificateNumber">Fire Safety Certificate Number</Label>
                  <Input
                    id="fireSafetyCertificateNumber"
                    placeholder="Fire safety certificate number"
                    value={formData.fireSafetyCertificateNumber}
                    onChange={(e) => handleInputChange('fireSafetyCertificateNumber', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="buildingSafetyCertificateNumber">Building Safety Certificate Number</Label>
                  <Input
                    id="buildingSafetyCertificateNumber"
                    placeholder="Building safety certificate number"
                    value={formData.buildingSafetyCertificateNumber}
                    onChange={(e) => handleInputChange('buildingSafetyCertificateNumber', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="healthCertificateNumber">Health Certificate Number</Label>
                  <Input
                    id="healthCertificateNumber"
                    placeholder="Health & sanitation certificate number"
                    value={formData.healthCertificateNumber}
                    onChange={(e) => handleInputChange('healthCertificateNumber', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FileUploadCard
                title="Fire Safety Certificate"
                description="From local fire department"
                fileType="fireSafetyCertificate"
                required={false}
              />
              <FileUploadCard
                title="Building Safety Certificate"
                description="Structural safety compliance"
                fileType="buildingSafetyCertificate"
                required={false}
              />
              <FileUploadCard
                title="Health & Sanitation Certificate"
                description="Health department approval"
                fileType="healthCertificate"
                required={false}
              />
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="font-medium flex items-center gap-2">
                <Users className="h-4 w-4" />
                Authorized Signatory Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="signatoryName">Signatory Name *</Label>
                  <Input
                    id="signatoryName"
                    placeholder="Full name of authorized signatory"
                    value={formData.signatoryName}
                    onChange={(e) => handleInputChange('signatoryName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signatoryDesignation">Designation *</Label>
                  <Input
                    id="signatoryDesignation"
                    placeholder="e.g., Principal, Director, Chairman"
                    value={formData.signatoryDesignation}
                    onChange={(e) => handleInputChange('signatoryDesignation', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="signatoryPhone">Signatory Phone Number *</Label>
                  <Input
                    id="signatoryPhone"
                    placeholder="+91 98765 43210"
                    value={formData.signatoryPhone}
                    onChange={(e) => handleInputChange('signatoryPhone', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signatoryEmail">Signatory Email *</Label>
                  <Input
                    id="signatoryEmail"
                    type="email"
                    placeholder="signatory@institution.edu"
                    value={formData.signatoryEmail}
                    onChange={(e) => handleInputChange('signatoryEmail', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="signatoryIdType">ID Proof Type *</Label>
                  <Select value={formData.signatoryIdType} onValueChange={(value) => handleInputChange('signatoryIdType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select ID type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aadhaar">Aadhaar Card</SelectItem>
                      <SelectItem value="pan">PAN Card</SelectItem>
                      <SelectItem value="passport">Passport</SelectItem>
                      <SelectItem value="voter-id">Voter ID</SelectItem>
                      <SelectItem value="driving-license">Driving License</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signatoryIdNumber">ID Number *</Label>
                  <Input
                    id="signatoryIdNumber"
                    placeholder="ID number"
                    value={formData.signatoryIdNumber}
                    onChange={(e) => handleInputChange('signatoryIdNumber', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FileUploadCard
                title="Signatory ID Proof"
                description="Copy of authorized signatory's ID proof"
                fileType="signatoryIdProof"
                required={true}
              />
              <FileUploadCard
                title="Signatory Photograph"
                description="Recent passport-size photograph"
                fileType="signatoryPhoto"
                required={true}
              />
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Banking & Financial Information
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
                  <Label htmlFor="branchName">Branch Name *</Label>
                  <Input
                    id="branchName"
                    placeholder="Branch name and location"
                    value={formData.branchName}
                    onChange={(e) => handleInputChange('branchName', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Account Number *</Label>
                  <Input
                    id="accountNumber"
                    placeholder="Bank account number"
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="accountHolderName">Account Holder Name *</Label>
                  <Input
                    id="accountHolderName"
                    placeholder="As per bank records"
                    value={formData.accountHolderName}
                    onChange={(e) => handleInputChange('accountHolderName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="annualFeeCollection">Annual Fee Collection (Optional)</Label>
                  <Input
                    id="annualFeeCollection"
                    placeholder="Approx. annual fee collection"
                    value={formData.annualFeeCollection}
                    onChange={(e) => handleInputChange('annualFeeCollection', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FileUploadCard
                title="Bank Passbook/Cancelled Cheque"
                description="First page of bank passbook or cancelled cheque"
                fileType="bankPassbook"
                required={true}
              />
              <FileUploadCard
                title="Student Handbook"
                description="Institution's student handbook or policies"
                fileType="studentHandbook"
                required={false}
              />
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Consent Forms & Final Verification
              </h3>

              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-4 border rounded-lg">
                  <Checkbox
                    id="affiliationVerificationConsent"
                    checked={formData.affiliationVerificationConsent}
                    onCheckedChange={(checked) => handleInputChange('affiliationVerificationConsent', checked)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="affiliationVerificationConsent" className="text-sm font-medium">
                      Affiliation Verification Consent *
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      I consent to verification of our institution's affiliation and recognition through 
                      government portals (UDISE+, AISHE, UGC/AICTE) and official board/university databases.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 border rounded-lg">
                  <Checkbox
                    id="physicalVerificationConsent"
                    checked={formData.physicalVerificationConsent}
                    onCheckedChange={(checked) => handleInputChange('physicalVerificationConsent', checked)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="physicalVerificationConsent" className="text-sm font-medium">
                      Physical Verification Consent
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      I consent to physical verification of our institution premises through site visits 
                      or video verification if required for high-risk onboarding assessments.
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
                      I consent to the collection, processing, and storage of institutional data for 
                      onboarding, verification, and platform service delivery purposes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 border rounded-lg">
                  <Checkbox
                    id="termsConditionsConsent"
                    checked={formData.termsConditionsConsent}
                    onCheckedChange={(checked) => handleInputChange('termsConditionsConsent', checked)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="termsConditionsConsent" className="text-sm font-medium">
                      Terms & Conditions Agreement *
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      I agree to abide by the platform's terms of service, data security policies, 
                      and institutional compliance requirements.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Cross-Verification Notice:</strong> We will verify all provided information through:
                <ul className="mt-2 list-disc list-inside text-xs space-y-1">
                  <li>Government portals (UDISE+, AISHE, UGC/AICTE official websites)</li>
                  <li>Board/University affiliation databases</li>
                  <li>Document authenticity checks</li>
                  <li>Online reputation and legal case verification</li>
                  <li>Physical verification (if required)</li>
                </ul>
              </AlertDescription>
            </Alert>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                By submitting this application, I declare that all information provided is true, complete, 
                and accurate. Any false information may result in rejection of the onboarding application 
                or termination of platform services.
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
                <CardTitle className="text-2xl">Institution Onboarding</CardTitle>
                <CardDescription>Complete registration process for your educational institution</CardDescription>
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
                const Icon = steps[currentStep - 1]?.icon || Building2;
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
                  disabled={!formData.affiliationVerificationConsent || !formData.dataPrivacyConsent || !formData.termsConditionsConsent}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Submit Application
                  <CheckCircle2 className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button 
                  onClick={handleNextStep}
                  disabled={currentStep === 1 && !otpVerified}
                >
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