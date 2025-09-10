import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Heart, 
  Clock, 
  Star, 
  User, 
  Calendar,
  Bookmark,
  History,
  TrendingUp,
  FileText,
  Globe,
  Headphones,
  Video,
  Image
} from 'lucide-react';

interface StudentLibraryProps {
  onNavigate: (screen: string) => void;
}

interface LibraryResource {
  id: string;
  title: string;
  author: string;
  type: 'book' | 'ebook' | 'journal' | 'article' | 'video' | 'audio' | 'reference';
  category: string;
  subject: string;
  description: string;
  publishedDate: string;
  isbn?: string;
  pages?: number;
  duration?: string;
  language: string;
  availability: 'available' | 'borrowed' | 'reserved';
  rating: number;
  downloads: number;
  tags: string[];
  coverImage?: string;
  fileSize?: string;
  format?: string;
}

export function StudentLibrary({ onNavigate }: StudentLibraryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [activeTab, setActiveTab] = useState('browse');

  const categories = ['Fiction', 'Non-Fiction', 'Academic', 'Reference', 'Research', 'Journals'];
  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History', 'Computer Science'];

  const resources: LibraryResource[] = [
    {
      id: '1',
      title: 'Advanced Calculus and Mathematical Analysis',
      author: 'Dr. Robert Thompson',
      type: 'ebook',
      category: 'Academic',
      subject: 'Mathematics',
      description: 'Comprehensive guide to advanced calculus concepts including limits, derivatives, integrals, and their applications in real-world scenarios.',
      publishedDate: '2023-03-15',
      isbn: '978-0123456789',
      pages: 654,
      language: 'English',
      availability: 'available',
      rating: 4.8,
      downloads: 1250,
      tags: ['calculus', 'mathematics', 'derivatives', 'integrals'],
      fileSize: '15.2 MB',
      format: 'PDF'
    },
    {
      id: '2',
      title: 'Modern Physics: Concepts and Applications',
      author: 'Prof. Sarah Mitchell',
      type: 'book',
      category: 'Academic',
      subject: 'Physics',
      description: 'Explores modern physics concepts including quantum mechanics, relativity theory, and particle physics with practical applications.',
      publishedDate: '2023-01-20',
      isbn: '978-0987654321',
      pages: 892,
      language: 'English',
      availability: 'borrowed',
      rating: 4.6,
      downloads: 890,
      tags: ['quantum mechanics', 'relativity', 'modern physics', 'particles']
    },
    {
      id: '3',
      title: 'Organic Chemistry Fundamentals',
      author: 'Dr. Michael Chen',
      type: 'ebook',
      category: 'Academic',
      subject: 'Chemistry',
      description: 'Complete guide to organic chemistry covering molecular structures, reactions, and synthetic pathways.',
      publishedDate: '2023-05-10',
      pages: 445,
      language: 'English',
      availability: 'available',
      rating: 4.7,
      downloads: 756,
      tags: ['organic chemistry', 'molecules', 'reactions', 'synthesis'],
      fileSize: '12.8 MB',
      format: 'PDF'
    },
    {
      id: '4',
      title: 'Cell Biology and Genetics',
      author: 'Dr. Lisa Anderson',
      type: 'ebook',
      category: 'Academic',
      subject: 'Biology',
      description: 'In-depth study of cellular processes, genetics, and molecular biology with latest research findings.',
      publishedDate: '2023-02-28',
      pages: 567,
      language: 'English',
      availability: 'available',
      rating: 4.5,
      downloads: 923,
      tags: ['cell biology', 'genetics', 'DNA', 'molecular biology'],
      fileSize: '18.5 MB',
      format: 'PDF'
    },
    {
      id: '5',
      title: 'Shakespeare Complete Works',
      author: 'William Shakespeare',
      type: 'ebook',
      category: 'Fiction',
      subject: 'English',
      description: 'Complete collection of Shakespeare\'s plays and sonnets with annotations and historical context.',
      publishedDate: '2022-11-15',
      pages: 1234,
      language: 'English',
      availability: 'available',
      rating: 4.9,
      downloads: 2150,
      tags: ['shakespeare', 'literature', 'plays', 'poetry'],
      fileSize: '8.9 MB',
      format: 'EPUB'
    },
    {
      id: '6',
      title: 'World History: Ancient to Modern',
      author: 'Prof. David Wilson',
      type: 'ebook',
      category: 'Academic',
      subject: 'History',
      description: 'Comprehensive overview of world history from ancient civilizations to the modern era.',
      publishedDate: '2023-04-12',
      pages: 789,
      language: 'English',
      availability: 'available',
      rating: 4.4,
      downloads: 678,
      tags: ['world history', 'civilizations', 'modern era', 'ancient'],
      fileSize: '22.1 MB',
      format: 'PDF'
    },
    {
      id: '7',
      title: 'Introduction to Programming',
      author: 'Dr. James Parker',
      type: 'video',
      category: 'Academic',
      subject: 'Computer Science',
      description: 'Video lecture series covering programming fundamentals, algorithms, and data structures.',
      publishedDate: '2023-06-01',
      duration: '15 hours',
      language: 'English',
      availability: 'available',
      rating: 4.8,
      downloads: 1456,
      tags: ['programming', 'algorithms', 'data structures', 'coding'],
      fileSize: '2.1 GB',
      format: 'MP4'
    },
    {
      id: '8',
      title: 'Scientific Journal: Nature Physics',
      author: 'Various Authors',
      type: 'journal',
      category: 'Research',
      subject: 'Physics',
      description: 'Latest research articles in physics including quantum computing, materials science, and theoretical physics.',
      publishedDate: '2023-08-01',
      pages: 120,
      language: 'English',
      availability: 'available',
      rating: 4.7,
      downloads: 345,
      tags: ['research', 'physics', 'quantum computing', 'materials'],
      fileSize: '25.4 MB',
      format: 'PDF'
    },
    {
      id: '9',
      title: 'Mathematical Modeling Handbook',
      author: 'Dr. Anna Rodriguez',
      type: 'reference',
      category: 'Reference',
      subject: 'Mathematics',
      description: 'Reference guide for mathematical modeling techniques and their applications in various fields.',
      publishedDate: '2023-07-20',
      pages: 456,
      language: 'English',
      availability: 'available',
      rating: 4.6,
      downloads: 567,
      tags: ['mathematical modeling', 'applications', 'techniques', 'reference'],
      fileSize: '11.7 MB',
      format: 'PDF'
    },
    {
      id: '10',
      title: 'Audio Lectures: English Literature',
      author: 'Prof. Catherine Brown',
      type: 'audio',
      category: 'Academic',
      subject: 'English',
      description: 'Audio lecture series covering major works of English literature from different periods.',
      publishedDate: '2023-05-30',
      duration: '20 hours',
      language: 'English',
      availability: 'available',
      rating: 4.5,
      downloads: 789,
      tags: ['literature', 'audio lectures', 'english', 'analysis'],
      fileSize: '850 MB',
      format: 'MP3'
    }
  ];

  const borrowedBooks = [
    { id: '2', title: 'Modern Physics: Concepts and Applications', dueDate: '2024-09-15', renewals: 1 },
    { id: '11', title: 'Advanced Statistics', dueDate: '2024-09-20', renewals: 0 }
  ];

  const favorites = ['1', '3', '5', '7'];
  const recentlyViewed = ['1', '2', '4', '7', '9'];

  const filteredResources = resources.filter(resource => {
    const searchMatch = searchTerm === '' || 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const categoryMatch = selectedCategory === 'all' || resource.category === selectedCategory;
    const typeMatch = selectedType === 'all' || resource.type === selectedType;
    const subjectMatch = selectedSubject === 'all' || resource.subject === selectedSubject;
    
    return searchMatch && categoryMatch && typeMatch && subjectMatch;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'book':
      case 'ebook':
        return <BookOpen className="h-5 w-5 text-blue-600" />;
      case 'video':
        return <Video className="h-5 w-5 text-red-600" />;
      case 'audio':
        return <Headphones className="h-5 w-5 text-green-600" />;
      case 'journal':
      case 'article':
        return <FileText className="h-5 w-5 text-purple-600" />;
      case 'reference':
        return <Globe className="h-5 w-5 text-orange-600" />;
      default:
        return <BookOpen className="h-5 w-5 text-gray-600" />;
    }
  };

  const getAvailabilityBadge = (availability: string) => {
    switch (availability) {
      case 'available':
        return <Badge className="bg-green-100 text-green-800">Available</Badge>;
      case 'borrowed':
        return <Badge className="bg-red-100 text-red-800">Borrowed</Badge>;
      case 'reserved':
        return <Badge className="bg-yellow-100 text-yellow-800">Reserved</Badge>;
      default:
        return <Badge variant="outline">{availability}</Badge>;
    }
  };

  const stats = {
    totalResources: resources.length,
    available: resources.filter(r => r.availability === 'available').length,
    borrowed: borrowedBooks.length,
    favorites: favorites.length,
    recentlyViewed: recentlyViewed.length
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Digital Library</h1>
          <p className="text-muted-foreground">Access books, journals, videos, and other learning resources</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => onNavigate('assignments')}>
            <FileText className="h-4 w-4 mr-2" />
            Assignments
          </Button>
          <Button onClick={() => onNavigate('schedule')}>
            <Calendar className="h-4 w-4 mr-2" />
            Schedule
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Resources</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalResources}</div>
            <p className="text-xs text-muted-foreground">Available materials</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Currently Borrowed</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.borrowed}</div>
            <p className="text-xs text-muted-foreground">Items checked out</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Favorites</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.favorites}</div>
            <p className="text-xs text-muted-foreground">Saved resources</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Views</CardTitle>
            <History className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.recentlyViewed}</div>
            <p className="text-xs text-muted-foreground">Recently accessed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Now</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.available}</div>
            <p className="text-xs text-muted-foreground">Ready to access</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="browse">Browse ({filteredResources.length})</TabsTrigger>
          <TabsTrigger value="borrowed">My Books ({borrowedBooks.length})</TabsTrigger>
          <TabsTrigger value="favorites">Favorites ({favorites.length})</TabsTrigger>
          <TabsTrigger value="recent">Recent ({recentlyViewed.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-4">
          {/* Search and Filters */}
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
                    placeholder="Search books, authors, topics..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="book">Books</SelectItem>
                    <SelectItem value="ebook">E-books</SelectItem>
                    <SelectItem value="video">Videos</SelectItem>
                    <SelectItem value="audio">Audio</SelectItem>
                    <SelectItem value="journal">Journals</SelectItem>
                    <SelectItem value="reference">Reference</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.length === 0 ? (
              <div className="col-span-full">
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-16">
                    <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No resources found</h3>
                    <p className="text-muted-foreground">Try adjusting your search or filters.</p>
                  </CardContent>
                </Card>
              </div>
            ) : (
              filteredResources.map((resource) => (
                <Card key={resource.id} className="overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(resource.type)}
                        <Badge variant="outline">{resource.type}</Badge>
                      </div>
                      {getAvailabilityBadge(resource.availability)}
                    </div>
                    <CardTitle className="text-lg line-clamp-2">{resource.title}</CardTitle>
                    <CardDescription>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>{resource.author}</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {resource.description}
                    </p>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Subject:</span>
                        <Badge variant="outline">{resource.subject}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Published:</span>
                        <span>{new Date(resource.publishedDate).toLocaleDateString()}</span>
                      </div>
                      {resource.pages && (
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Pages:</span>
                          <span>{resource.pages}</span>
                        </div>
                      )}
                      {resource.duration && (
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Duration:</span>
                          <span>{resource.duration}</span>
                        </div>
                      )}
                      {resource.fileSize && (
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Size:</span>
                          <span>{resource.fileSize}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(resource.rating)
                                ? 'text-yellow-500 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {resource.rating} ({resource.downloads} downloads)
                      </span>
                    </div>

                    <div className="flex gap-2">
                      {resource.availability === 'available' && (
                        <Button size="sm" className="flex-1">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        <Bookmark className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Heart className={`h-4 w-4 ${favorites.includes(resource.id) ? 'fill-current text-red-500' : ''}`} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="borrowed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Currently Borrowed Books</CardTitle>
              <CardDescription>Manage your borrowed library materials</CardDescription>
            </CardHeader>
            <CardContent>
              {borrowedBooks.length === 0 ? (
                <div className="text-center py-8">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No books currently borrowed</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {borrowedBooks.map((book) => {
                    const resource = resources.find(r => r.id === book.id);
                    if (!resource) return null;
                    
                    return (
                      <div key={book.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                            {getTypeIcon(resource.type)}
                          </div>
                          <div>
                            <h3 className="font-medium">{resource.title}</h3>
                            <p className="text-sm text-muted-foreground">{resource.author}</p>
                            <p className="text-sm text-muted-foreground">
                              Due: {new Date(book.dueDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            Renew ({book.renewals}/3)
                          </Button>
                          <Button size="sm">
                            Return
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="favorites" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.length === 0 ? (
              <div className="col-span-full">
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-16">
                    <Heart className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No favorites yet</h3>
                    <p className="text-muted-foreground">Add resources to your favorites to see them here.</p>
                  </CardContent>
                </Card>
              </div>
            ) : (
              resources
                .filter(resource => favorites.includes(resource.id))
                .map((resource) => (
                  <Card key={resource.id} className="overflow-hidden">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg line-clamp-2">{resource.title}</CardTitle>
                      <CardDescription>{resource.author}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <Heart className="h-4 w-4 fill-current text-red-500" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recently Viewed</CardTitle>
              <CardDescription>Resources you've accessed recently</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {resources
                  .filter(resource => recentlyViewed.includes(resource.id))
                  .map((resource) => (
                    <div key={resource.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                          {getTypeIcon(resource.type)}
                        </div>
                        <div>
                          <h3 className="font-medium">{resource.title}</h3>
                          <p className="text-sm text-muted-foreground">{resource.author}</p>
                          <p className="text-sm text-muted-foreground">{resource.subject}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          View Again
                        </Button>
                        <Button size="sm" variant="outline">
                          <Heart className={`h-4 w-4 ${favorites.includes(resource.id) ? 'fill-current text-red-500' : ''}`} />
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}