import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import { Separator } from "./ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog";
import { toast } from "sonner@2.0.3";
import { 
  ArrowLeft, 
  CheckCircle, 
  XCircle, 
  FileText, 
  Download, 
  Building2, 
  Calendar,
  MapPin,
  Phone,
  Mail,
  User,
  Shield,
  Award,
  Globe
} from 'lucide-react';

interface InstituteProfileProps {
  institute: any;
  onNavigate: (screen: string) => void;
}

export function InstituteProfile({ institute, onNavigate }: InstituteProfileProps) {
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  // Mock detailed institute data
  const mockInstituteDetails = {
    id: institute?.id || 1,
    instituteName: institute?.instituteName || 'Delhi Public School',
    type: institute?.type || 'School',
    address: institute?.address || 'Sector 12, New Delhi, India - 110001',
    establishmentYear: institute?.establishmentYear || 2010,
    contactEmail: institute?.contactEmail || 'admin@dps.edu',
    contactPhone: institute?.contactPhone || '+91-9876543210',
    website: 'https://www.dps.edu',
    affiliation: 'Central Board of Secondary Education (CBSE)',
    principalName: 'Dr. Rajesh Kumar',
    principalEmail: 'principal@dps.edu',
    principalPhone: '+91-9876543220',
    capacity: '2500 students',
    facilities: ['Library', 'Science Labs', 'Computer Lab', 'Sports Complex', 'Auditorium'],
    registrationDocs: [
      { name: 'School Registration Certificate', status: 'Verified', uploadDate: '2024-01-10' },
      { name: 'CBSE Affiliation Certificate', status: 'Verified', uploadDate: '2024-01-10' },
      { name: 'Society Registration', status: 'Verified', uploadDate: '2024-01-10' }
    ],
    accreditationProofs: [
      { name: 'ISO 9001:2015 Certificate', status: 'Verified', uploadDate: '2024-01-10' },
      { name: 'NAAC Accreditation', status: 'Under Review', uploadDate: '2024-01-10' }
    ],
    complianceDocs: [
      { name: 'Fire Safety Certificate', status: 'Verified', uploadDate: '2024-01-10' },
      { name: 'Health Department NOC', status: 'Verified', uploadDate: '2024-01-10' },
      { name: 'Building Approval', status: 'Verified', uploadDate: '2024-01-10' },
      { name: 'Environmental Clearance', status: 'Pending', uploadDate: '2024-01-10' }
    ],
    contacts: [
      { name: 'Dr. Rajesh Kumar', designation: 'Principal', email: 'principal@dps.edu', phone: '+91-9876543220' },
      { name: 'Ms. Priya Sharma', designation: 'Vice Principal', email: 'vp@dps.edu', phone: '+91-9876543221' },
      { name: 'Mr. Amit Singh', designation: 'Admin Officer', email: 'admin@dps.edu', phone: '+91-9876543222' }
    ]
  };

  const getDocStatusColor = (status: string) => {
    switch (status) {
      case 'Verified':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Under Review':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleApprove = () => {
    setShowApproveDialog(true);
  };

  const handleReject = () => {
    setShowRejectDialog(true);
  };

  const confirmApprove = () => {
    toast.success(`${mockInstituteDetails.instituteName} has been approved successfully`);
    setShowApproveDialog(false);
    onNavigate('requests');
  };

  const confirmReject = () => {
    if (!rejectionReason.trim()) {
      toast.error('Please provide a rejection reason');
      return;
    }
    toast.success(`${mockInstituteDetails.instituteName} has been rejected`);
    setShowRejectDialog(false);
    setRejectionReason('');
    onNavigate('requests');
  };

  const handleDownload = (docName: string) => {
    toast.success(`Downloading ${docName}`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => onNavigate('requests')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Requests
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReject}>
            <XCircle className="mr-2 h-4 w-4" />
            Reject
          </Button>
          <Button onClick={handleApprove}>
            <CheckCircle className="mr-2 h-4 w-4" />
            Approve
          </Button>
        </div>
      </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Institute Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Institute Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Institute Name</label>
                    <p className="text-sm text-muted-foreground mt-1">{mockInstituteDetails.instituteName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Type</label>
                    <div className="mt-1">
                      <Badge variant="outline">{mockInstituteDetails.type}</Badge>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      Address
                    </label>
                    <p className="text-sm text-muted-foreground mt-1">{mockInstituteDetails.address}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Establishment Year
                    </label>
                    <p className="text-sm text-muted-foreground mt-1">{mockInstituteDetails.establishmentYear}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Affiliation</label>
                    <p className="text-sm text-muted-foreground mt-1">{mockInstituteDetails.affiliation}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Student Capacity</label>
                    <p className="text-sm text-muted-foreground mt-1">{mockInstituteDetails.capacity}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium flex items-center gap-1">
                      <Globe className="h-4 w-4" />
                      Website
                    </label>
                    <a href={mockInstituteDetails.website} className="text-sm text-blue-600 hover:underline mt-1 block">
                      {mockInstituteDetails.website}
                    </a>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Facilities</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {mockInstituteDetails.facilities.map((facility, index) => (
                      <Badge key={index} variant="secondary">{facility}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Registration Documents */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Registration Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockInstituteDetails.registrationDocs.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">Uploaded: {doc.uploadDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getDocStatusColor(doc.status)} variant="outline">
                          {doc.status}
                        </Badge>
                        <Button variant="ghost" size="sm" onClick={() => handleDownload(doc.name)}>
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Accreditation Proofs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Accreditation Proofs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockInstituteDetails.accreditationProofs.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Award className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">Uploaded: {doc.uploadDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getDocStatusColor(doc.status)} variant="outline">
                          {doc.status}
                        </Badge>
                        <Button variant="ghost" size="sm" onClick={() => handleDownload(doc.name)}>
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Compliance Documents */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Compliance Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockInstituteDetails.complianceDocs.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Shield className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">Uploaded: {doc.uploadDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getDocStatusColor(doc.status)} variant="outline">
                          {doc.status}
                        </Badge>
                        <Button variant="ghost" size="sm" onClick={() => handleDownload(doc.name)}>
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockInstituteDetails.contacts.map((contact, index) => (
                  <div key={index} className="space-y-2">
                    <div>
                      <p className="text-sm font-medium">{contact.name}</p>
                      <p className="text-xs text-muted-foreground">{contact.designation}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        <span>{contact.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        <span>{contact.phone}</span>
                      </div>
                    </div>
                    {index < mockInstituteDetails.contacts.length - 1 && <Separator />}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Verification Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Verification Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Registration Docs</span>
                  <Badge className="bg-green-100 text-green-800 border-green-200" variant="outline">
                    3/3 Verified
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Accreditation</span>
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200" variant="outline">
                    1/2 Verified
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Compliance</span>
                  <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200" variant="outline">
                    3/4 Verified
                  </Badge>
                </div>
                <Separator />
                <div className="flex justify-between items-center font-medium">
                  <span className="text-sm">Overall Status</span>
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200" variant="outline">
                    Under Review
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Approve Dialog */}
        <AlertDialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Approve Institute</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to approve <strong>{mockInstituteDetails.instituteName}</strong>? 
                This will grant them access to the platform and allow them to start onboarding their staff and students.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmApprove}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Approve
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Reject Dialog */}
        <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reject Institute Application</DialogTitle>
              <DialogDescription>
                Please provide a reason for rejecting <strong>{mockInstituteDetails.instituteName}</strong>
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Rejection Reason</label>
                <Textarea
                  placeholder="Please provide a detailed reason for rejection..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowRejectDialog(false)}>Cancel</Button>
              <Button variant="destructive" onClick={confirmReject}>
                <XCircle className="mr-2 h-4 w-4" />
                Reject
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
  );
}