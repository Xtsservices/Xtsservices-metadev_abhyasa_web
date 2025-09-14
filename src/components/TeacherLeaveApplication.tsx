import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { 
  Calendar,
  Clock,
  FileText,
  Plus,
  Eye,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { toast } from "sonner";

interface TeacherLeaveApplicationProps {
  onNavigate: (screen: import("../App").Screen) => void;
}

interface LeaveApplication {
  id: string;
  type: 'sick' | 'personal' | 'emergency' | 'vacation';
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
  approvedBy?: string;
  comments?: string;
}

export function TeacherLeaveApplication({ onNavigate }: TeacherLeaveApplicationProps) {
  const [applications] = useState<LeaveApplication[]>([
    {
      id: '1',
      type: 'sick',
      startDate: '2024-09-15',
      endDate: '2024-09-16',
      days: 2,
      reason: 'Fever and flu symptoms',
      status: 'approved',
      appliedDate: '2024-09-13',
      approvedBy: 'Dr. Smith (Principal)',
      comments: 'Approved. Please submit medical certificate.'
    },
    {
      id: '2',
      type: 'personal',
      startDate: '2024-09-20',
      endDate: '2024-09-20',
      days: 1,
      reason: 'Family function attendance',
      status: 'pending',
      appliedDate: '2024-09-18'
    },
    {
      id: '3',
      type: 'vacation',
      startDate: '2024-10-10',
      endDate: '2024-10-12',
      days: 3,
      reason: 'Pre-planned vacation with family',
      status: 'rejected',
      appliedDate: '2024-09-01',
      approvedBy: 'Dr. Smith (Principal)',
      comments: 'Rejected due to overlapping with examination period.'
    }
  ]);

  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false);
  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getLeaveTypeLabel = (type: string) => {
    switch (type) {
      case 'sick':
        return 'Sick Leave';
      case 'personal':
        return 'Personal Leave';
      case 'emergency':
        return 'Emergency Leave';
      case 'vacation':
        return 'Vacation Leave';
      default:
        return type;
    }
  };

  const calculateDays = (start: string, end: string) => {
    if (!start || !end) return 0;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const handleSubmitApplication = () => {
    if (!leaveType || !startDate || !endDate || !reason) {
      toast.error("Please fill in all required fields");
      return;
    }

    const days = calculateDays(startDate, endDate);
    toast.success(`Leave application submitted for ${days} day(s)`);
    setIsApplyDialogOpen(false);
    setLeaveType('');
    setStartDate('');
    setEndDate('');
    setReason('');
  };

  const pendingApplications = applications.filter(app => app.status === 'pending').length;
  const approvedApplications = applications.filter(app => app.status === 'approved').length;
  const totalDaysThisMonth = applications
    .filter(app => app.status === 'approved' && new Date(app.startDate).getMonth() === new Date().getMonth())
    .reduce((acc, app) => acc + app.days, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Leave Application</h1>
          <p className="text-muted-foreground">Apply for leave and track your applications</p>
        </div>
        <Dialog open={isApplyDialogOpen} onOpenChange={setIsApplyDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Apply for Leave
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Apply for Leave</DialogTitle>
              <DialogDescription>
                Submit a new leave application to the administration
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="leaveType">Leave Type</Label>
                <Select value={leaveType} onValueChange={setLeaveType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select leave type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sick">Sick Leave</SelectItem>
                    <SelectItem value="personal">Personal Leave</SelectItem>
                    <SelectItem value="emergency">Emergency Leave</SelectItem>
                    <SelectItem value="vacation">Vacation Leave</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input 
                    id="startDate" 
                    type="date" 
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input 
                    id="endDate" 
                    type="date" 
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
              {startDate && endDate && (
                <div className="text-sm text-muted-foreground">
                  Total days: {calculateDays(startDate, endDate)}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="reason">Reason</Label>
                <Textarea 
                  id="reason" 
                  placeholder="Please provide reason for leave..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsApplyDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmitApplication}>
                Submit Application
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingApplications}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting approval
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved This Year</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedApplications}</div>
            <p className="text-xs text-muted-foreground">
              Successfully approved
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Days This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDaysThisMonth}</div>
            <p className="text-xs text-muted-foreground">
              Total leave days
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Applications List */}
      <Card>
        <CardHeader>
          <CardTitle>Leave Applications</CardTitle>
          <CardDescription>Your submitted leave applications and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {applications.map((application) => (
              <Card key={application.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(application.status)}
                        <h3 className="font-medium">{getLeaveTypeLabel(application.type)}</h3>
                      </div>
                      <Badge className={`${getStatusColor(application.status)}`}>
                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Start Date:</span>
                        <div className="font-medium">{new Date(application.startDate).toLocaleDateString()}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">End Date:</span>
                        <div className="font-medium">{new Date(application.endDate).toLocaleDateString()}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Duration:</span>
                        <div className="font-medium">{application.days} day(s)</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Applied Date:</span>
                        <div className="font-medium">{new Date(application.appliedDate).toLocaleDateString()}</div>
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-muted-foreground text-sm">Reason:</span>
                      <p className="text-sm mt-1">{application.reason}</p>
                    </div>
                    
                    {application.comments && (
                      <div>
                        <span className="text-muted-foreground text-sm">Comments:</span>
                        <p className="text-sm mt-1">{application.comments}</p>
                        {application.approvedBy && (
                          <p className="text-xs text-muted-foreground mt-1">- {application.approvedBy}</p>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {applications.length === 0 && (
            <div className="text-center py-12">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-medium">No applications found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                You haven't submitted any leave applications yet.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}