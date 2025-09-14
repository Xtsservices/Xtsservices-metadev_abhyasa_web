import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "./ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { toast } from "sonner";
import { ArrowLeft, Eye, CheckCircle, XCircle, FileText, Search, Filter } from 'lucide-react';

interface InstituteRequestsProps {
  onNavigate: (screen: import("../App").Screen) => void;
  onViewInstitute: (institute: any) => void;
}

export function InstituteRequests({ onNavigate, onViewInstitute }: InstituteRequestsProps) {
  const [selectedInstitute, setSelectedInstitute] = useState<any>(null);
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [showRequestDocsDialog, setShowRequestDocsDialog] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  // Mock data for institute requests
  const mockRequests = [
    {
      id: 1,
      instituteName: 'Delhi Public School',
      type: 'School',
      docsStatus: 'Complete',
      dateOfRequest: '2024-01-15',
      status: 'Pending',
      address: 'New Delhi, India',
      establishmentYear: 2010,
      contactEmail: 'admin@dps.edu',
      contactPhone: '+91-9876543210'
    },
    {
      id: 2,
      instituteName: 'St. Marys College',
      type: 'College',
      docsStatus: 'Incomplete',
      dateOfRequest: '2024-01-14',
      status: 'Pending',
      address: 'Mumbai, India',
      establishmentYear: 1995,
      contactEmail: 'info@stmarys.edu',
      contactPhone: '+91-9876543211'
    },
    {
      id: 3,
      instituteName: 'Tech Training Institute',
      type: 'Training',
      docsStatus: 'Complete',
      dateOfRequest: '2024-01-13',
      status: 'Approved',
      address: 'Bangalore, India',
      establishmentYear: 2018,
      contactEmail: 'contact@techtraining.com',
      contactPhone: '+91-9876543212'
    },
    {
      id: 4,
      instituteName: 'Green Valley School',
      type: 'School',
      docsStatus: 'Under Review',
      dateOfRequest: '2024-01-12',
      status: 'Rejected',
      address: 'Chennai, India',
      establishmentYear: 2005,
      contactEmail: 'admin@greenvalley.edu',
      contactPhone: '+91-9876543213'
    },
    {
      id: 5,
      instituteName: 'Modern Business School',
      type: 'College',
      docsStatus: 'Complete',
      dateOfRequest: '2024-01-11',
      status: 'Pending',
      address: 'Pune, India',
      establishmentYear: 2000,
      contactEmail: 'info@modernbusiness.edu',
      contactPhone: '+91-9876543214'
    }
  ];

  const requiredDocs = [
    'Registration Certificate',
    'Accreditation Certificate',
    'Fire Safety Certificate',
    'Health Compliance Certificate',
    'Building Approval Certificate',
    'Tax Registration Documents'
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDocsStatusColor = (status: string) => {
    switch (status) {
      case 'Complete':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Incomplete':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Under Review':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredRequests = mockRequests.filter(request => {
    const matchesSearch = request.instituteName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesType = typeFilter === 'all' || request.type.toLowerCase() === typeFilter.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleApprove = (institute: any) => {
    setSelectedInstitute(institute);
    setShowApproveDialog(true);
  };

  const handleReject = (institute: any) => {
    setSelectedInstitute(institute);
    setShowRejectDialog(true);
  };

  const handleRequestDocs = (institute: any) => {
    setSelectedInstitute(institute);
    setShowRequestDocsDialog(true);
  };

  const confirmApprove = () => {
    toast.success(`${selectedInstitute?.instituteName} has been approved successfully`);
    setShowApproveDialog(false);
    setSelectedInstitute(null);
  };

  const confirmReject = () => {
    if (!rejectionReason.trim()) {
      toast.error('Please provide a rejection reason');
      return;
    }
    toast.success(`${selectedInstitute?.instituteName} has been rejected`);
    setShowRejectDialog(false);
    setSelectedInstitute(null);
    setRejectionReason('');
  };

  const confirmRequestDocs = () => {
    toast.success(`Document request sent to ${selectedInstitute?.instituteName}`);
    setShowRequestDocsDialog(false);
    setSelectedInstitute(null);
  };

  return (
    <div className="p-6 space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Pending Requests</CardTitle>
                <CardDescription>Review institute applications and manage approvals</CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search institutes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="school">School</SelectItem>
                    <SelectItem value="college">College</SelectItem>
                    <SelectItem value="training">Training</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Institute Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Documents Status</TableHead>
                    <TableHead>Date of Request</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{request.instituteName}</div>
                          <div className="text-sm text-muted-foreground">{request.address}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{request.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getDocsStatusColor(request.docsStatus)} variant="outline">
                          {request.docsStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(request.dateOfRequest).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(request.status)} variant="outline">
                          {request.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => onViewInstitute(request)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {request.status === 'Pending' && (
                            <>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleApprove(request)}
                              >
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleReject(request)}
                              >
                                <XCircle className="h-4 w-4 text-red-600" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleRequestDocs(request)}
                              >
                                <FileText className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Approve Dialog */}
        <AlertDialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Approve Institute</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to approve <strong>{selectedInstitute?.instituteName}</strong>? 
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
                Please provide a reason for rejecting <strong>{selectedInstitute?.instituteName}</strong>
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="rejection-reason">Rejection Reason</Label>
                <Textarea
                  id="rejection-reason"
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

        {/* Request More Documents Dialog */}
        <Dialog open={showRequestDocsDialog} onOpenChange={setShowRequestDocsDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Request Additional Documents</DialogTitle>
              <DialogDescription>
                Select the documents you need from <strong>{selectedInstitute?.instituteName}</strong>
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-3">
                <Label>Required Documents</Label>
                {requiredDocs.map((doc, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox id={`doc-${index}`} />
                    <Label htmlFor={`doc-${index}`} className="text-sm font-normal">
                      {doc}
                    </Label>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <Label htmlFor="additional-notes">Additional Notes</Label>
                <Textarea
                  id="additional-notes"
                  placeholder="Any specific instructions or requirements..."
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowRequestDocsDialog(false)}>Cancel</Button>
              <Button onClick={confirmRequestDocs}>
                <FileText className="mr-2 h-4 w-4" />
                Send Request
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
  );
}