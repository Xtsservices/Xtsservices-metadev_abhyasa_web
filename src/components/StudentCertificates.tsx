import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { 
  Award,
  Download,
  Eye,
  Search,
  Filter,
  Calendar,
  FileText,
  Star,
  Trophy,
  Medal,
  GraduationCap
} from 'lucide-react';
import { toast } from "sonner";

interface StudentCertificatesProps {
  onNavigate: (screen: string) => void;
}

interface Certificate {
  id: string;
  title: string;
  type: 'academic' | 'achievement' | 'participation' | 'completion';
  issuedDate: string;
  issuer: string;
  description: string;
  grade?: string;
  downloadUrl: string;
  imageUrl?: string;
  verified: boolean;
}

export function StudentCertificates({ onNavigate }: StudentCertificatesProps) {
  const [certificates] = useState<Certificate[]>([
    {
      id: '1',
      title: 'Excellence in Mathematics',
      type: 'academic',
      issuedDate: '2025-06-15',
      issuer: 'Modern Public School',
      description: 'Awarded for outstanding performance in Mathematics during Academic Year 2024-25',
      grade: 'Grade 10',
      downloadUrl: '#',
      imageUrl: '/certificates/math-excellence.pdf',
      verified: true
    },
    {
      id: '2',
      title: 'Science Fair Winner - 1st Place',
      type: 'achievement',
      issuedDate: '2025-03-20',
      issuer: 'Modern Public School',
      description: 'First place winner in the Annual Science Fair for project on Renewable Energy',
      grade: 'Grade 10',
      downloadUrl: '#',
      verified: true
    },
    {
      id: '3',
      title: 'Inter-School Quiz Competition',
      type: 'participation',
      issuedDate: '2025-02-10',
      issuer: 'State Education Board',
      description: 'Participation in Regional Inter-School Quiz Competition',
      downloadUrl: '#',
      verified: true
    },
    {
      id: '4',
      title: 'Computer Programming Certificate',
      type: 'completion',
      issuedDate: '2024-12-15',
      issuer: 'TechEd Institute',
      description: 'Successfully completed 60-hour Python Programming Course',
      downloadUrl: '#',
      verified: true
    },
    {
      id: '5',
      title: 'Sports Excellence - Athletics',
      type: 'achievement',
      issuedDate: '2024-11-30',
      issuer: 'Modern Public School',
      description: 'Outstanding performance in Track and Field events during Annual Sports Day',
      grade: 'Grade 10',
      downloadUrl: '#',
      verified: true
    },
    {
      id: '6',
      title: 'Perfect Attendance Award',
      type: 'achievement',
      issuedDate: '2024-10-01',
      issuer: 'Modern Public School',
      description: 'Perfect attendance for the entire first semester',
      grade: 'Grade 10',
      downloadUrl: '#',
      verified: true
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterYear, setFilterYear] = useState('all');

  const filteredCertificates = certificates.filter(certificate => {
    const matchesSearch = certificate.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         certificate.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || certificate.type === filterType;
    const matchesYear = filterYear === 'all' || new Date(certificate.issuedDate).getFullYear().toString() === filterYear;
    
    return matchesSearch && matchesType && matchesYear;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'academic':
        return <GraduationCap className="h-5 w-5 text-blue-600" />;
      case 'achievement':
        return <Trophy className="h-5 w-5 text-yellow-600" />;
      case 'participation':
        return <Medal className="h-5 w-5 text-green-600" />;
      case 'completion':
        return <Star className="h-5 w-5 text-purple-600" />;
      default:
        return <Award className="h-5 w-5 text-gray-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'academic':
        return 'bg-blue-100 text-blue-800';
      case 'achievement':
        return 'bg-yellow-100 text-yellow-800';
      case 'participation':
        return 'bg-green-100 text-green-800';
      case 'completion':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDownload = (certificate: Certificate) => {
    // Simulate download
    toast.success(`Downloading ${certificate.title}...`);
  };

  const handleView = (certificate: Certificate) => {
    // Simulate viewing certificate
    toast.success(`Opening ${certificate.title} for preview...`);
  };

  const handleShare = (certificate: Certificate) => {
    // Simulate sharing
    navigator.clipboard.writeText(`Check out my certificate: ${certificate.title} from ${certificate.issuer}`);
    toast.success("Certificate link copied to clipboard!");
  };

  const certificatesByType = certificates.reduce((acc, cert) => {
    acc[cert.type] = (acc[cert.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Certificates</h1>
          <p className="text-muted-foreground">View and download your achievements and certificates</p>
        </div>
        <Button variant="outline" onClick={() => window.print()}>
          <FileText className="h-4 w-4 mr-2" />
          Print Summary
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Certificates</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{certificates.length}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Academic Awards</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{certificatesByType.academic || 0}</div>
            <p className="text-xs text-muted-foreground">Excellence certificates</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Achievements</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{certificatesByType.achievement || 0}</div>
            <p className="text-xs text-muted-foreground">Competition wins</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Year</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {certificates.filter(c => new Date(c.issuedDate).getFullYear() === 2025).length}
            </div>
            <p className="text-xs text-muted-foreground">Recent achievements</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-64">
              <Label htmlFor="search">Search Certificates</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by title or description..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Type</Label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="academic">Academic</SelectItem>
                  <SelectItem value="achievement">Achievement</SelectItem>
                  <SelectItem value="participation">Participation</SelectItem>
                  <SelectItem value="completion">Completion</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Year</Label>
              <Select value={filterYear} onValueChange={setFilterYear}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCertificates.map((certificate) => (
          <Card key={certificate.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {getTypeIcon(certificate.type)}
                  <Badge className={getTypeColor(certificate.type)}>
                    {certificate.type.charAt(0).toUpperCase() + certificate.type.slice(1)}
                  </Badge>
                </div>
                {certificate.verified && (
                  <Badge variant="outline" className="text-green-600">
                    ✓ Verified
                  </Badge>
                )}
              </div>
              <CardTitle className="text-lg">{certificate.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div>Issued by: {certificate.issuer}</div>
                  <div>Date: {new Date(certificate.issuedDate).toLocaleDateString()}</div>
                  {certificate.grade && <div>Grade: {certificate.grade}</div>}
                </div>
                <p className="text-sm text-muted-foreground">
                  {certificate.description}
                </p>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleView(certificate)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleDownload(certificate)}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCertificates.length === 0 && (
        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <Award className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-medium">No certificates found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Try adjusting your search criteria or filters.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}