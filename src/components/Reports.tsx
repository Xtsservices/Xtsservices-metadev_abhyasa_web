import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "./ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { toast } from "sonner@2.0.3";
import { 
  ArrowLeft, 
  Download, 
  FileText, 
  Calendar as CalendarIcon,
  Filter,
  Eye,
  AlertTriangle,
  Users,
  TrendingDown,
  Search,
  BarChart3,
  PieChart as PieChartIcon,
  TrendingUp
} from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// Removed date-fns import to avoid dependency issues

interface ReportsProps {
  onNavigate: (screen: string) => void;
}

export function Reports({ onNavigate }: ReportsProps) {
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [showReportDialog, setShowReportDialog] = useState(false);

  // Mock reports data
  const mockReports = [
    {
      id: 1,
      instituteName: 'Delhi Public School',
      reportType: 'Compliance',
      date: '2024-01-15',
      status: 'Resolved',
      severity: 'Medium',
      description: 'Fire safety equipment inspection overdue',
      reportedBy: 'System Alert',
      resolvedBy: 'Admin Team',
      resolvedDate: '2024-01-16',
      details: 'Fire safety equipment inspection was overdue by 15 days. Institute was notified and inspection was completed on 2024-01-16.'
    },
    {
      id: 2,
      instituteName: 'St. Marys College',
      reportType: 'Spam',
      date: '2024-01-14',
      status: 'Pending',
      severity: 'Low',
      description: 'Multiple spam complaints about promotional emails',
      reportedBy: 'User Reports',
      reportedCount: 12,
      details: 'Multiple users reported receiving unwanted promotional emails from the institute. Investigation ongoing.'
    },
    {
      id: 3,
      instituteName: 'Tech Training Institute',
      reportType: 'Performance',
      date: '2024-01-13',
      status: 'Resolved',
      severity: 'High',
      description: 'Low student satisfaction scores',
      reportedBy: 'Student Feedback',
      resolvedBy: 'Academic Team',
      resolvedDate: '2024-01-14',
      details: 'Student satisfaction scores dropped below threshold (3.2/5). Institute implemented improvement plan and scores improved to 4.1/5.'
    },
    {
      id: 4,
      instituteName: 'Modern Business School',
      reportType: 'Compliance',
      date: '2024-01-12',
      status: 'Pending',
      severity: 'Critical',
      description: 'Missing accreditation renewal documents',
      reportedBy: 'System Alert',
      details: 'Accreditation renewal documents were due 30 days ago but have not been submitted. Immediate action required.'
    },
    {
      id: 5,
      instituteName: 'Green Valley School',
      reportType: 'Performance',
      date: '2024-01-11',
      status: 'Resolved',
      severity: 'Medium',
      description: 'High student dropout rate reported',
      reportedBy: 'Academic Monitoring',
      resolvedBy: 'Counseling Team',
      resolvedDate: '2024-01-13',
      details: 'Student dropout rate increased to 8% in Q4. Counseling program implemented, rate reduced to 3%.'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'High':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Compliance':
        return <AlertTriangle className="h-4 w-4" />;
      case 'Performance':
        return <TrendingDown className="h-4 w-4" />;
      case 'Spam':
        return <Users className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const filteredReports = mockReports.filter(report => {
    const matchesSearch = report.instituteName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.reportType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || report.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesType = typeFilter === 'all' || report.reportType.toLowerCase() === typeFilter.toLowerCase();
    
    let matchesDate = true;
    if (dateFrom && dateTo) {
      const reportDate = new Date(report.date);
      matchesDate = reportDate >= dateFrom && reportDate <= dateTo;
    }
    
    return matchesSearch && matchesStatus && matchesType && matchesDate;
  });

  const handleViewReport = (report: any) => {
    setSelectedReport(report);
    setShowReportDialog(true);
  };

  const handleExportPDF = () => {
    toast.success('PDF report is being generated and will be downloaded shortly');
  };

  const handleExportExcel = () => {
    toast.success('Excel report is being generated and will be downloaded shortly');
  };

  const resetFilters = () => {
    setDateFrom(undefined);
    setDateTo(undefined);
    setStatusFilter('all');
    setTypeFilter('all');
    setSearchTerm('');
  };

  // Chart data
  const reportsByMonth = [
    { month: 'Jan', total: 15, resolved: 12, pending: 3 },
    { month: 'Feb', total: 23, resolved: 18, pending: 5 },
    { month: 'Mar', total: 18, resolved: 14, pending: 4 },
    { month: 'Apr', total: 32, resolved: 25, pending: 7 },
    { month: 'May', total: 28, resolved: 22, pending: 6 },
    { month: 'Jun', total: 35, resolved: 28, pending: 7 }
  ];

  const reportsByType = [
    { name: 'Compliance', value: 45, color: '#ef4444' },
    { name: 'Performance', value: 32, color: '#f59e0b' },
    { name: 'Spam', value: 23, color: '#3b82f6' }
  ];

  const reportsBySeverity = [
    { name: 'Critical', value: 12, color: '#dc2626' },
    { name: 'High', value: 25, color: '#ea580c' },
    { name: 'Medium', value: 40, color: '#ca8a04' },
    { name: 'Low', value: 23, color: '#2563eb' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Export Actions */}
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={handleExportPDF}>
          <Download className="mr-2 h-4 w-4" />
          Export PDF
        </Button>
        <Button variant="outline" onClick={handleExportExcel}>
          <Download className="mr-2 h-4 w-4" />
          Export Excel
        </Button>
      </div>
        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </CardTitle>
            <CardDescription>Filter reports by date range, status, and type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-2">
                <Label>Date Range</Label>
                <div className="flex gap-2 mt-1">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateFrom ? dateFrom.toLocaleDateString() : "From date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={dateFrom}
                        onSelect={setDateFrom}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateTo ? dateTo.toLocaleDateString() : "To date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={dateTo}
                        onSelect={setDateTo}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div>
                <Label>Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="in progress">In Progress</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Type</Label>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="compliance">Compliance</SelectItem>
                    <SelectItem value="spam">Spam</SelectItem>
                    <SelectItem value="performance">Performance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Search</Label>
                <div className="relative mt-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search reports..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Button variant="outline" onClick={resetFilters}>
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Analytics Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Reports Trend */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Reports Trend
              </CardTitle>
              <CardDescription>Monthly report statistics with resolution status</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={reportsByMonth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="total" fill="#3b82f6" name="Total Reports" />
                  <Bar dataKey="resolved" fill="#10b981" name="Resolved" />
                  <Bar dataKey="pending" fill="#f59e0b" name="Pending" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Reports by Type */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChartIcon className="h-5 w-5" />
                Reports by Type
              </CardTitle>
              <CardDescription>Distribution of report categories</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={reportsByType}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {reportsByType.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Severity Analysis */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Reports by Severity
            </CardTitle>
            <CardDescription>Analysis of report severity levels</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={reportsBySeverity} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={80} />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8">
                  {reportsBySeverity.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Reports Table */}
        <Card>
          <CardHeader>
            <CardTitle>Reports Overview</CardTitle>
            <CardDescription>
              Showing {filteredReports.length} reports
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Institute Name</TableHead>
                    <TableHead>Report Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.instituteName}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getTypeIcon(report.reportType)}
                          <span>{report.reportType}</span>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{report.description}</TableCell>
                      <TableCell>{new Date(report.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge className={getSeverityColor(report.severity)} variant="outline">
                          {report.severity}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(report.status)} variant="outline">
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewReport(report)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Report Details Dialog */}
        <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {selectedReport && getTypeIcon(selectedReport.reportType)}
                Report Details
              </DialogTitle>
              <DialogDescription>
                Detailed information about the selected report
              </DialogDescription>
            </DialogHeader>
            {selectedReport && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Institute</Label>
                    <p className="text-sm text-muted-foreground mt-1">{selectedReport.instituteName}</p>
                  </div>
                  <div>
                    <Label>Report Type</Label>
                    <div className="flex items-center gap-2 mt-1">
                      {getTypeIcon(selectedReport.reportType)}
                      <span className="text-sm text-muted-foreground">{selectedReport.reportType}</span>
                    </div>
                  </div>
                  <div>
                    <Label>Date Reported</Label>
                    <p className="text-sm text-muted-foreground mt-1">{new Date(selectedReport.date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <Label>Severity</Label>
                    <div className="mt-1">
                      <Badge className={getSeverityColor(selectedReport.severity)} variant="outline">
                        {selectedReport.severity}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <div className="mt-1">
                      <Badge className={getStatusColor(selectedReport.status)} variant="outline">
                        {selectedReport.status}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <Label>Reported By</Label>
                    <p className="text-sm text-muted-foreground mt-1">{selectedReport.reportedBy}</p>
                  </div>
                </div>
                
                <div>
                  <Label>Description</Label>
                  <p className="text-sm text-muted-foreground mt-1">{selectedReport.description}</p>
                </div>
                
                <div>
                  <Label>Details</Label>
                  <p className="text-sm text-muted-foreground mt-1">{selectedReport.details}</p>
                </div>

                {selectedReport.status === 'Resolved' && (
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <Label>Resolved By</Label>
                      <p className="text-sm text-muted-foreground mt-1">{selectedReport.resolvedBy}</p>
                    </div>
                    <div>
                      <Label>Resolution Date</Label>
                      <p className="text-sm text-muted-foreground mt-1">{new Date(selectedReport.resolvedDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                )}

                {selectedReport.reportedCount && (
                  <div className="pt-4 border-t">
                    <Label>Report Count</Label>
                    <p className="text-sm text-muted-foreground mt-1">{selectedReport.reportedCount} complaints received</p>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
  );
}