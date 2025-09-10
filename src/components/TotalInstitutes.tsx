import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  Building2,
  Users,
  ChevronLeft,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

interface TotalInstitutesProps {
  onNavigate: (screen: string) => void;
  onViewInstitute: (institute: any) => void;
}

export function TotalInstitutes({ onNavigate, onViewInstitute }: TotalInstitutesProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Mock data for institutes
  const allInstitutes = [
    {
      id: 1,
      name: "Delhi Public School",
      type: "CBSE School",
      status: "approved",
      location: "New Delhi, India",
      studentsCount: 2500,
      teachersCount: 150,
      principal: "Dr. Rajesh Kumar",
      phone: "+91 98765 43210",
      email: "admin@dps.edu",
      established: "1995",
      logo: "",
      registrationDate: "2024-01-15",
      lastActive: "2 hours ago"
    },
    {
      id: 2,
      name: "St. Mary's Convent School",
      type: "ICSE School",
      status: "approved",
      location: "Mumbai, India",
      studentsCount: 1800,
      teachersCount: 120,
      principal: "Sister Margaret",
      phone: "+91 87654 32109",
      email: "info@stmarys.edu",
      established: "1987",
      logo: "",
      registrationDate: "2024-01-20",
      lastActive: "1 day ago"
    },
    {
      id: 3,
      name: "Kendriya Vidyalaya",
      type: "Central School",
      status: "pending",
      location: "Bangalore, India",
      studentsCount: 2200,
      teachersCount: 140,
      principal: "Mr. Suresh Reddy",
      phone: "+91 76543 21098",
      email: "kv.bangalore@edu.gov.in",
      established: "2001",
      logo: "",
      registrationDate: "2024-02-05",
      lastActive: "5 hours ago"
    },
    {
      id: 4,
      name: "Ryan International School",
      type: "CBSE School",
      status: "approved",
      location: "Gurgaon, India",
      studentsCount: 3200,
      teachersCount: 200,
      principal: "Dr. Anita Sharma",
      phone: "+91 65432 10987",
      email: "principal@ryan.edu",
      established: "1989",
      logo: "",
      registrationDate: "2024-01-12",
      lastActive: "30 minutes ago"
    },
    {
      id: 5,
      name: "DAV Public School",
      type: "CBSE School",
      status: "approved",
      location: "Chennai, India",
      studentsCount: 2800,
      teachersCount: 170,
      principal: "Mr. Vikram Singh",
      phone: "+91 54321 09876",
      email: "admin@dav.edu",
      established: "1993",
      logo: "",
      registrationDate: "2024-01-18",
      lastActive: "3 hours ago"
    },
    {
      id: 6,
      name: "Modern Public School",
      type: "State Board",
      status: "rejected",
      location: "Kolkata, India",
      studentsCount: 1200,
      teachersCount: 80,
      principal: "Mrs. Priya Banerjee",
      phone: "+91 43210 98765",
      email: "info@modern.edu",
      established: "2005",
      logo: "",
      registrationDate: "2024-02-10",
      lastActive: "1 week ago"
    },
    {
      id: 7,
      name: "Vidya Mandir Senior Secondary",
      type: "CBSE School",
      status: "pending",
      location: "Pune, India",
      studentsCount: 1900,
      teachersCount: 110,
      principal: "Dr. Amit Joshi",
      phone: "+91 32109 87654",
      email: "principal@vidyamandir.edu",
      established: "1998",
      logo: "",
      registrationDate: "2024-02-08",
      lastActive: "2 days ago"
    },
    {
      id: 8,
      name: "Christ Church School",
      type: "ICSE School",
      status: "approved",
      location: "Hyderabad, India",
      studentsCount: 2100,
      teachersCount: 130,
      principal: "Fr. Thomas Joseph",
      phone: "+91 21098 76543",
      email: "admin@christchurch.edu",
      established: "1985",
      logo: "",
      registrationDate: "2024-01-25",
      lastActive: "4 hours ago"
    }
  ];

  // Statistics
  const stats = {
    total: allInstitutes.length,
    approved: allInstitutes.filter(i => i.status === 'approved').length,
    pending: allInstitutes.filter(i => i.status === 'pending').length,
    rejected: allInstitutes.filter(i => i.status === 'rejected').length
  };

  // Filter institutes based on search and filters
  const filteredInstitutes = allInstitutes
    .filter(institute => {
      const matchesSearch = institute.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           institute.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           institute.principal.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || institute.status === statusFilter;
      const matchesType = typeFilter === 'all' || institute.type === typeFilter;
      
      return matchesSearch && matchesStatus && matchesType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'students':
          return b.studentsCount - a.studentsCount;
        case 'date':
          return new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime();
        default:
          return 0;
      }
    });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100"><CheckCircle className="h-3 w-3 mr-1" />Approved</Badge>;
      case 'pending':
        return <Badge variant="default" className="bg-orange-100 text-orange-800 hover:bg-orange-100"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case 'rejected':
        return <Badge variant="default" className="bg-red-100 text-red-800 hover:bg-red-100"><XCircle className="h-3 w-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onNavigate('dashboard')}
            className="text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Total Institutes</h1>
            <p className="text-muted-foreground">Manage and monitor all registered educational institutions</p>
          </div>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Institutes</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1 text-green-500" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
            <p className="text-xs text-muted-foreground">Active and operational</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
            <p className="text-xs text-muted-foreground">Did not meet criteria</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Institute Directory</CardTitle>
          <CardDescription>Search and filter through all registered institutes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search institutes, locations, or principals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="CBSE School">CBSE School</SelectItem>
                <SelectItem value="ICSE School">ICSE School</SelectItem>
                <SelectItem value="State Board">State Board</SelectItem>
                <SelectItem value="Central School">Central School</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="students">Students</SelectItem>
                <SelectItem value="date">Registration Date</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Results Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Institute</TableHead>
                  <TableHead>Principal</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Registration Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInstitutes.map((institute) => (
                  <TableRow key={institute.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={institute.logo} />
                          <AvatarFallback>{getInitials(institute.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{institute.name}</div>
                          <div className="text-sm text-muted-foreground">Est. {institute.established}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{institute.principal}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {institute.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{institute.type}</Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(institute.status)}</TableCell>
                    <TableCell>
                      <div className="text-center">
                        <div className="font-medium">{institute.studentsCount.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">{institute.teachersCount} teachers</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        {institute.location}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{new Date(institute.registrationDate).toLocaleDateString()}</div>
                        <div className="text-muted-foreground">Active {institute.lastActive}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onViewInstitute(institute)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Phone className="h-4 w-4 mr-2" />
                            Contact
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Users className="h-4 w-4 mr-2" />
                            View Users
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredInstitutes.length === 0 && (
            <div className="text-center py-8">
              <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">No institutes found</h3>
              <p className="text-muted-foreground">Try adjusting your search criteria</p>
            </div>
          )}

          {/* Results Summary */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <div className="text-sm text-muted-foreground">
              Showing {filteredInstitutes.length} of {stats.total} institutes
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}