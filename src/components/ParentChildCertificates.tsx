import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  Award, 
  Download, 
  Search, 
  Filter, 
  Calendar, 
  Trophy, 
  BookOpen, 
  Users, 
  FileText, 
  Star, 
  Eye,
  Share2,
  CheckCircle,
  Clock,
  Medal,
  GraduationCap,
  Building
} from 'lucide-react';

interface ParentChildCertificatesProps {
  onNavigate: (screen: import("../App").Screen) => void;
}

interface Certificate {
  id: string;
  title: string;
  description: string;
  type: 'academic' | 'sports' | 'extracurricular' | 'participation' | 'achievement';
  issuedDate: string;
  issuedBy: string;
  certificateNumber: string;
  grade?: string;
  subject?: string;
  event?: string;
  status: 'issued' | 'pending' | 'verified';
  downloadUrl?: string;
  thumbnailUrl?: string;
  childId: string;
  validUntil?: string;
  credentialId?: string;
}

export function ParentChildCertificates({ onNavigate }: ParentChildCertificatesProps) {
  const [selectedChild, setSelectedChild] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const children = [
    { id: 'sarah', name: 'Sarah Johnson', grade: 'Grade 10A', avatar: '' },
    { id: 'mike', name: 'Mike Johnson', grade: 'Grade 7B', avatar: '' }
  ];

  const certificates: Certificate[] = [
    {
      id: '1',
      title: 'Excellence in Mathematics',
      description: 'Outstanding performance in Calculus and Advanced Mathematics throughout the academic year 2024.',
      type: 'academic',
      issuedDate: '2024-05-15',
      issuedBy: 'Mathematics Department',
      certificateNumber: 'MATH-2024-001',
      grade: 'A+',
      subject: 'Mathematics',
      status: 'issued',
      childId: 'sarah',
      credentialId: 'CRED-MATH-001'
    },
    {
      id: '2',
      title: 'Science Fair Winner - 1st Place',
      description: 'First place winner in the Annual Science Fair 2024 for innovative project on Renewable Energy.',
      type: 'achievement',
      issuedDate: '2024-03-20',
      issuedBy: 'Science Department',
      certificateNumber: 'SCI-FAIR-2024-001',
      event: 'Annual Science Fair 2024',
      status: 'issued',
      childId: 'sarah',
      credentialId: 'CRED-SCI-001'
    },
    {
      id: '3',
      title: 'Inter-School Basketball Championship',
      description: 'Member of the winning team in the Inter-School Basketball Championship 2024.',
      type: 'sports',
      issuedDate: '2024-04-10',
      issuedBy: 'Sports Department',
      certificateNumber: 'SPORT-2024-015',
      event: 'Inter-School Basketball Championship',
      status: 'issued',
      childId: 'sarah',
      credentialId: 'CRED-SPORT-001'
    },
    {
      id: '4',
      title: 'Perfect Attendance Award',
      description: 'Perfect attendance record for the entire academic year 2023-2024.',
      type: 'achievement',
      issuedDate: '2024-06-01',
      issuedBy: 'School Administration',
      certificateNumber: 'ATT-2024-042',
      status: 'issued',
      childId: 'sarah',
      validUntil: '2025-06-01',
      credentialId: 'CRED-ATT-001'
    },
    {
      id: '5',
      title: 'Coding Competition Participant',
      description: 'Active participation in the Regional Coding Competition 2024.',
      type: 'participation',
      issuedDate: '2024-02-28',
      issuedBy: 'Computer Science Department',
      certificateNumber: 'CODE-2024-089',
      event: 'Regional Coding Competition',
      status: 'issued',
      childId: 'mike',
      credentialId: 'CRED-CODE-001'
    },
    {
      id: '6',
      title: 'Science Project Excellence',
      description: 'Outstanding science project on Volcano Formation with exceptional presentation skills.',
      type: 'academic',
      issuedDate: '2024-04-15',
      issuedBy: 'Science Department',
      certificateNumber: 'SCI-PROJ-2024-025',
      grade: 'A',
      subject: 'Science',
      status: 'issued',
      childId: 'mike',
      credentialId: 'CRED-SCI-002'
    },
    {
      id: '7',
      title: 'School Chess Tournament - 2nd Place',
      description: 'Second place winner in the Annual School Chess Tournament 2024.',
      type: 'sports',
      issuedDate: '2024-03-05',
      issuedBy: 'Sports Department',
      certificateNumber: 'CHESS-2024-012',
      event: 'Annual Chess Tournament',
      status: 'issued',
      childId: 'mike',
      credentialId: 'CRED-CHESS-001'
    },
    {
      id: '8',
      title: 'English Literature Award',
      description: 'Recognition for exceptional creative writing and poetry composition.',
      type: 'academic',
      issuedDate: '2024-01-20',
      issuedBy: 'English Department',
      certificateNumber: 'ENG-2024-007',
      grade: 'A+',
      subject: 'English Literature',
      status: 'issued',
      childId: 'sarah',
      credentialId: 'CRED-ENG-001'
    },
    {
      id: '9',
      title: 'Community Service Award',
      description: 'Recognition for outstanding contribution to community service projects.',
      type: 'extracurricular',
      issuedDate: '2024-05-30',
      issuedBy: 'Student Council',
      certificateNumber: 'COMM-2024-003',
      status: 'pending',
      childId: 'mike',
      credentialId: 'CRED-COMM-001'
    },
    {
      id: '10',
      title: 'Art Exhibition Participant',
      description: 'Participation in the Annual Art Exhibition showcasing creative artwork.',
      type: 'extracurricular',
      issuedDate: '2024-02-14',
      issuedBy: 'Art Department',
      certificateNumber: 'ART-2024-034',
      event: 'Annual Art Exhibition',
      status: 'issued',
      childId: 'mike',
      credentialId: 'CRED-ART-001'
    }
  ];

  const filteredCertificates = certificates.filter(cert => {
    const childMatch = selectedChild === 'all' || cert.childId === selectedChild;
    const typeMatch = selectedType === 'all' || cert.type === selectedType;
    const statusMatch = selectedStatus === 'all' || cert.status === selectedStatus;
    const searchMatch = searchTerm === '' || 
      cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.issuedBy.toLowerCase().includes(searchTerm.toLowerCase());
    
    return childMatch && typeMatch && statusMatch && searchMatch;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'academic':
        return <BookOpen className="h-5 w-5 text-blue-600" />;
      case 'sports':
        return <Trophy className="h-5 w-5 text-green-600" />;
      case 'achievement':
        return <Medal className="h-5 w-5 text-yellow-600" />;
      case 'participation':
        return <Users className="h-5 w-5 text-purple-600" />;
      case 'extracurricular':
        return <Star className="h-5 w-5 text-orange-600" />;
      default:
        return <Award className="h-5 w-5 text-gray-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'academic':
        return 'bg-blue-100 text-blue-800';
      case 'sports':
        return 'bg-green-100 text-green-800';
      case 'achievement':
        return 'bg-yellow-100 text-yellow-800';
      case 'participation':
        return 'bg-purple-100 text-purple-800';
      case 'extracurricular':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'issued':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Issued</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case 'verified':
        return <Badge className="bg-blue-100 text-blue-800"><Star className="h-3 w-3 mr-1" />Verified</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const certificateStats = {
    total: certificates.length,
    issued: certificates.filter(c => c.status === 'issued').length,
    pending: certificates.filter(c => c.status === 'pending').length,
    byChild: children.map(child => ({
      ...child,
      count: certificates.filter(c => c.childId === child.id).length
    }))
  };

  const handleDownload = (certificate: Certificate) => {
    // Mock download functionality
    console.log('Downloading certificate:', certificate.id);
    // In real implementation, this would trigger a download
  };

  const handleShare = (certificate: Certificate) => {
    // Mock share functionality
    console.log('Sharing certificate:', certificate.id);
    // In real implementation, this would open share dialog
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Children's Certificates</h1>
          <p className="text-muted-foreground">View and manage your children's academic and extracurricular certificates</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => onNavigate('children')}>
            <Users className="h-4 w-4 mr-2" />
            Children Overview
          </Button>
          <Button onClick={() => onNavigate('academic')}>
            <GraduationCap className="h-4 w-4 mr-2" />
            Academic Reports
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Certificates</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{certificateStats.total}</div>
            <p className="text-xs text-muted-foreground">All children combined</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Issued</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{certificateStats.issued}</div>
            <p className="text-xs text-muted-foreground">Ready for download</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{certificateStats.pending}</div>
            <p className="text-xs text-muted-foreground">Being processed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Certificate types</p>
          </CardContent>
        </Card>
      </div>

      {/* Children Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Certificates by Child</CardTitle>
          <CardDescription>Overview of certificates for each child</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certificateStats.byChild.map((child) => (
              <div key={child.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={child.avatar} />
                    <AvatarFallback>
                      {child.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{child.name}</p>
                    <p className="text-sm text-muted-foreground">{child.grade}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{child.count}</div>
                  <p className="text-xs text-muted-foreground">certificates</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filters:</span>
            </div>
            
            <div className="flex-1 relative max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search certificates..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Select value={selectedChild} onValueChange={setSelectedChild}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Children" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Children</SelectItem>
                {children.map((child) => (
                  <SelectItem key={child.id} value={child.id}>
                    {child.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="academic">Academic</SelectItem>
                <SelectItem value="sports">Sports</SelectItem>
                <SelectItem value="achievement">Achievement</SelectItem>
                <SelectItem value="participation">Participation</SelectItem>
                <SelectItem value="extracurricular">Extracurricular</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="issued">Issued</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex border rounded-lg">
              <Button 
                variant={viewMode === 'grid' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              >
                Grid
              </Button>
              <Button 
                variant={viewMode === 'list' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                List
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Certificates Display */}
      <Tabs defaultValue="certificates" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="certificates">All Certificates ({filteredCertificates.length})</TabsTrigger>
          <TabsTrigger value="achievements">Top Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="certificates" className="space-y-4">
          {filteredCertificates.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Award className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No certificates found</h3>
                <p className="text-muted-foreground">Try adjusting your filters to see more certificates.</p>
              </CardContent>
            </Card>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCertificates.map((certificate) => {
                const child = children.find(c => c.id === certificate.childId);
                return (
                  <Card key={certificate.id} className="overflow-hidden">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(certificate.type)}
                          <Badge className={getTypeColor(certificate.type)}>
                            {certificate.type}
                          </Badge>
                        </div>
                        {getStatusBadge(certificate.status)}
                      </div>
                      <CardTitle className="text-lg">{certificate.title}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {certificate.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={child?.avatar} />
                          <AvatarFallback className="text-xs">
                            {child?.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{child?.name}</p>
                          <p className="text-xs text-muted-foreground">{child?.grade}</p>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>Issued: {new Date(certificate.issuedDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-muted-foreground" />
                          <span>By: {certificate.issuedBy}</span>
                        </div>
                        {certificate.grade && (
                          <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 text-muted-foreground" />
                            <span>Grade: {certificate.grade}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1" onClick={() => handleDownload(certificate)}>
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleShare(certificate)}>
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCertificates.map((certificate) => {
                const child = children.find(c => c.id === certificate.childId);
                return (
                  <Card key={certificate.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                            {getTypeIcon(certificate.type)}
                          </div>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-semibold">{certificate.title}</h3>
                              <Badge className={getTypeColor(certificate.type)}>
                                {certificate.type}
                              </Badge>
                              {getStatusBadge(certificate.status)}
                            </div>
                            <p className="text-muted-foreground">{certificate.description}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {new Date(certificate.issuedDate).toLocaleDateString()}
                              </div>
                              <span>•</span>
                              <span>{certificate.issuedBy}</span>
                              {certificate.grade && (
                                <>
                                  <span>•</span>
                                  <span>Grade: {certificate.grade}</span>
                                </>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={child?.avatar} />
                                <AvatarFallback className="text-xs">
                                  {child?.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm">{child?.name} - {child?.grade}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 ml-4">
                          <Button size="sm" onClick={() => handleDownload(certificate)}>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleShare(certificate)}>
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {children.map((child) => {
              const childCertificates = certificates.filter(c => c.childId === child.id && c.type === 'achievement');
              return (
                <Card key={child.id}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={child.avatar} />
                        <AvatarFallback>
                          {child.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle>{child.name}</CardTitle>
                        <CardDescription>{child.grade} - Top Achievements</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {childCertificates.length === 0 ? (
                        <p className="text-muted-foreground text-center py-4">No achievements yet</p>
                      ) : (
                        childCertificates.map((cert) => (
                          <div key={cert.id} className="flex items-center gap-3 p-3 border rounded-lg">
                            <Medal className="h-8 w-8 text-yellow-500" />
                            <div className="flex-1">
                              <p className="font-medium">{cert.title}</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(cert.issuedDate).toLocaleDateString()}
                              </p>
                            </div>
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}