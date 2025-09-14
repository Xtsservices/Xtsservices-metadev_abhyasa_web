import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Bell, 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  AlertCircle, 
  Info, 
  CheckCircle, 
  Star, 
  Eye,
  Bookmark,
  Share2,
  Download,
  User,
  School,
  GraduationCap,
  Trophy,
  FileText,
  MapPin
} from 'lucide-react';

interface StudentAnnouncementsProps {
  onNavigate: (screen: import("../App").Screen) => void;
}

interface Announcement {
  id: string;
  title: string;
  content: string;
  summary: string;
  category: 'academic' | 'sports' | 'events' | 'general' | 'urgent' | 'deadline';
  priority: 'high' | 'medium' | 'low';
  publishedDate: string;
  expiryDate?: string;
  author: string;
  authorRole: string;
  targetAudience: string[];
  tags: string[];
  isRead: boolean;
  isBookmarked: boolean;
  attachments?: string[];
  relatedLinks?: { title: string; url: string }[];
  location?: string;
  eventDate?: string;
}

export function StudentAnnouncements({ onNavigate }: StudentAnnouncementsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [showRead, setShowRead] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  const announcements: Announcement[] = [
    {
      id: '1',
      title: 'Mid-Term Examination Schedule Released',
      content: 'The mid-term examination schedule for all subjects has been finalized and is now available. Students are advised to check their individual timetables and prepare accordingly. The examinations will commence from September 15th and conclude on September 25th. Please note that there have been some changes to the original schedule due to facility constraints.',
      summary: 'Mid-term exams start September 15th. Check your individual timetable for updates.',
      category: 'academic',
      priority: 'high',
      publishedDate: '2024-09-02T09:00:00',
      expiryDate: '2024-09-15T23:59:59',
      author: 'Dr. Patricia Williams',
      authorRole: 'Academic Director',
      targetAudience: ['Grade 10', 'Grade 11', 'Grade 12'],
      tags: ['examinations', 'mid-term', 'schedule', 'academic'],
      isRead: false,
      isBookmarked: true,
      attachments: ['Exam_Schedule_2024.pdf', 'Exam_Guidelines.pdf'],
      relatedLinks: [
        { title: 'Student Portal', url: '/student-portal' },
        { title: 'Exam Guidelines', url: '/exam-guidelines' }
      ]
    },
    {
      id: '2',
      title: 'Annual Sports Day - Registration Open',
      content: 'We are excited to announce that registration for the Annual Sports Day is now open! This year\'s event will take place on September 20th at the school sports complex. Students can participate in various track and field events, team sports, and fun activities. Registration deadline is September 10th. Don\'t miss this opportunity to showcase your athletic abilities!',
      summary: 'Sports Day registration is open until September 10th. Event on September 20th.',
      category: 'sports',
      priority: 'medium',
      publishedDate: '2024-08-30T14:30:00',
      expiryDate: '2024-09-10T23:59:59',
      author: 'Coach Michael Johnson',
      authorRole: 'Sports Director',
      targetAudience: ['All Students'],
      tags: ['sports', 'registration', 'annual event', 'athletics'],
      isRead: true,
      isBookmarked: false,
      location: 'School Sports Complex',
      eventDate: '2024-09-20T08:00:00',
      attachments: ['Sports_Day_Events.pdf'],
      relatedLinks: [
        { title: 'Register Now', url: '/sports-registration' },
        { title: 'Event Schedule', url: '/sports-schedule' }
      ]
    },
    {
      id: '3',
      title: 'Library Extended Hours During Exam Period',
      content: 'To support students during the upcoming examination period, the library will be extending its operating hours. From September 10th to September 30th, the library will remain open until 10:00 PM on weekdays and until 8:00 PM on weekends. Additional study spaces have been arranged, and all digital resources will be available 24/7.',
      summary: 'Library extends hours during exam period: weekdays until 10 PM, weekends until 8 PM.',
      category: 'academic',
      priority: 'medium',
      publishedDate: '2024-08-28T11:15:00',
      author: 'Ms. Sarah Peterson',
      authorRole: 'Head Librarian',
      targetAudience: ['All Students'],
      tags: ['library', 'extended hours', 'study space', 'examinations'],
      isRead: true,
      isBookmarked: true
    },
    {
      id: '4',
      title: 'Science Fair Project Submission Deadline',
      content: 'This is a reminder that the deadline for Science Fair project submissions is September 12th at 5:00 PM. All projects must be submitted through the online portal along with the required documentation. Late submissions will not be accepted. If you need assistance with your project, please contact your science teacher or visit the science department office.',
      summary: 'Science Fair projects due September 12th at 5 PM. No late submissions accepted.',
      category: 'deadline',
      priority: 'high',
      publishedDate: '2024-09-01T16:45:00',
      expiryDate: '2024-09-12T17:00:00',
      author: 'Dr. Robert Chen',
      authorRole: 'Science Department Head',
      targetAudience: ['Grade 9', 'Grade 10', 'Grade 11'],
      tags: ['science fair', 'deadline', 'project submission', 'academic'],
      isRead: false,
      isBookmarked: false,
      relatedLinks: [
        { title: 'Submit Project', url: '/science-fair-submission' },
        { title: 'Project Guidelines', url: '/science-fair-guidelines' }
      ]
    },
    {
      id: '5',
      title: 'New Mental Health Support Program',
      content: 'We are pleased to introduce our new Mental Health Support Program designed to help students manage stress and maintain emotional well-being. The program includes counseling services, stress management workshops, and peer support groups. All services are confidential and free of charge. To schedule an appointment or learn more, visit the counseling office or call the student support hotline.',
      summary: 'New mental health program offers counseling, workshops, and peer support.',
      category: 'general',
      priority: 'medium',
      publishedDate: '2024-08-25T10:00:00',
      author: 'Dr. Jennifer Martinez',
      authorRole: 'Student Counselor',
      targetAudience: ['All Students'],
      tags: ['mental health', 'counseling', 'support', 'wellness'],
      isRead: true,
      isBookmarked: false,
      relatedLinks: [
        { title: 'Book Appointment', url: '/counseling-appointment' },
        { title: 'Support Resources', url: '/mental-health-resources' }
      ]
    },
    {
      id: '6',
      title: 'Parent-Teacher Conference Schedule',
      content: 'Parent-Teacher conferences have been scheduled for September 18th and 19th. Students are encouraged to attend these sessions with their parents to discuss academic progress and set goals for the remainder of the semester. Conference slots are 20 minutes each and must be booked in advance through the parent portal.',
      summary: 'Parent-Teacher conferences on September 18-19. Book slots through parent portal.',
      category: 'events',
      priority: 'medium',
      publishedDate: '2024-08-27T13:20:00',
      author: 'Ms. Linda Thompson',
      authorRole: 'Academic Coordinator',
      targetAudience: ['All Students', 'Parents'],
      tags: ['parent teacher conference', 'academic progress', 'meetings'],
      isRead: true,
      isBookmarked: false,
      eventDate: '2024-09-18T09:00:00',
      location: 'School Campus - Various Classrooms'
    },
    {
      id: '7',
      title: 'WiFi Network Maintenance - Temporary Disruption',
      content: 'Please be advised that the school WiFi network will undergo scheduled maintenance on September 5th from 2:00 AM to 6:00 AM. During this time, internet connectivity may be intermittent or unavailable. We apologize for any inconvenience and appreciate your understanding as we work to improve our network infrastructure.',
      summary: 'WiFi maintenance September 5th, 2-6 AM. Expect connectivity issues during this time.',
      category: 'general',
      priority: 'low',
      publishedDate: '2024-09-03T08:30:00',
      author: 'IT Support Team',
      authorRole: 'Technical Services',
      targetAudience: ['All Students', 'Staff'],
      tags: ['wifi', 'maintenance', 'network', 'infrastructure'],
      isRead: false,
      isBookmarked: false
    },
    {
      id: '8',
      title: 'Emergency Evacuation Drill - September 6th',
      content: 'A mandatory emergency evacuation drill will be conducted on September 6th at 11:00 AM. All students and staff must participate. When the alarm sounds, please follow your teachers\' instructions and proceed to your designated assembly areas. The drill is expected to last approximately 15 minutes. This is an important safety exercise, so please take it seriously.',
      summary: 'Mandatory evacuation drill September 6th at 11 AM. Follow teacher instructions.',
      category: 'urgent',
      priority: 'high',
      publishedDate: '2024-09-04T07:45:00',
      author: 'Security Office',
      authorRole: 'Campus Safety',
      targetAudience: ['All Students', 'Staff'],
      tags: ['emergency drill', 'safety', 'evacuation', 'mandatory'],
      isRead: false,
      isBookmarked: true,
      eventDate: '2024-09-06T11:00:00'
    },
    {
      id: '9',
      title: 'Scholarship Application Deadline Approaching',
      content: 'This is a friendly reminder that applications for the Annual Academic Excellence Scholarship are due on September 15th. This scholarship is available to students maintaining a GPA of 3.5 or higher. Application forms are available in the guidance office or can be downloaded from the school website. Don\'t miss this opportunity to apply for financial assistance for your educational journey.',
      summary: 'Academic Excellence Scholarship applications due September 15th. GPA 3.5+ required.',
      category: 'deadline',
      priority: 'medium',
      publishedDate: '2024-08-29T12:00:00',
      expiryDate: '2024-09-15T23:59:59',
      author: 'Ms. Rebecca Adams',
      authorRole: 'Guidance Counselor',
      targetAudience: ['Grade 11', 'Grade 12'],
      tags: ['scholarship', 'deadline', 'academic excellence', 'financial aid'],
      isRead: true,
      isBookmarked: true,
      relatedLinks: [
        { title: 'Download Application', url: '/scholarship-application' },
        { title: 'Eligibility Criteria', url: '/scholarship-criteria' }
      ]
    },
    {
      id: '10',
      title: 'New Cafeteria Menu Options',
      content: 'We\'re excited to introduce new healthy and diverse menu options in our school cafeteria starting September 10th. The new menu includes vegetarian, vegan, and gluten-free options to cater to various dietary preferences and requirements. Nutritional information for all items will be displayed, and we\'ve partnered with local suppliers to ensure fresh, quality ingredients.',
      summary: 'New cafeteria menu starts September 10th with vegetarian, vegan, and gluten-free options.',
      category: 'general',
      priority: 'low',
      publishedDate: '2024-09-01T14:15:00',
      author: 'Food Services Team',
      authorRole: 'Cafeteria Management',
      targetAudience: ['All Students', 'Staff'],
      tags: ['cafeteria', 'menu', 'healthy options', 'dietary requirements'],
      isRead: true,
      isBookmarked: false,
      relatedLinks: [
        { title: 'View New Menu', url: '/cafeteria-menu' },
        { title: 'Nutritional Info', url: '/nutrition-facts' }
      ]
    }
  ];

  const filteredAnnouncements = announcements.filter(announcement => {
    const searchMatch = searchTerm === '' || 
      announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const categoryMatch = selectedCategory === 'all' || announcement.category === selectedCategory;
    const priorityMatch = selectedPriority === 'all' || announcement.priority === selectedPriority;
    const readMatch = showRead || !announcement.isRead;
    
    return searchMatch && categoryMatch && priorityMatch && readMatch;
  });

  const getTabAnnouncements = (tab: string) => {
    switch (tab) {
      case 'unread':
        return announcements.filter(a => !a.isRead);
      case 'bookmarked':
        return announcements.filter(a => a.isBookmarked);
      case 'urgent':
        return announcements.filter(a => a.priority === 'high' || a.category === 'urgent');
      case 'deadlines':
        return announcements.filter(a => a.category === 'deadline');
      default:
        return filteredAnnouncements;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'academic':
        return <GraduationCap className="h-5 w-5 text-blue-600" />;
      case 'sports':
        return <Trophy className="h-5 w-5 text-green-600" />;
      case 'events':
        return <Calendar className="h-5 w-5 text-purple-600" />;
      case 'urgent':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      case 'deadline':
        return <Clock className="h-5 w-5 text-orange-600" />;
      default:
        return <Info className="h-5 w-5 text-gray-600" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">High Priority</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>;
      case 'low':
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const getCategoryBadge = (category: string) => {
    const categoryColors = {
      academic: 'bg-blue-100 text-blue-800',
      sports: 'bg-green-100 text-green-800',
      events: 'bg-purple-100 text-purple-800',
      urgent: 'bg-red-100 text-red-800',
      deadline: 'bg-orange-100 text-orange-800',
      general: 'bg-gray-100 text-gray-800'
    };
    
    return (
      <Badge className={categoryColors[category as keyof typeof categoryColors] || categoryColors.general}>
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </Badge>
    );
  };

  const stats = {
    total: announcements.length,
    unread: announcements.filter(a => !a.isRead).length,
    urgent: announcements.filter(a => a.priority === 'high' || a.category === 'urgent').length,
    bookmarked: announcements.filter(a => a.isBookmarked).length,
    deadlines: announcements.filter(a => a.category === 'deadline').length
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Announcements</h1>
          <p className="text-muted-foreground">Stay updated with important school news and notifications</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => onNavigate('schedule')}>
            <Calendar className="h-4 w-4 mr-2" />
            View Schedule
          </Button>
          <Button onClick={() => onNavigate('notifications')}>
            <Bell className="h-4 w-4 mr-2" />
            All Notifications
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">All announcements</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.unread}</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Urgent</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.urgent}</div>
            <p className="text-xs text-muted-foreground">High priority</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deadlines</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.deadlines}</div>
            <p className="text-xs text-muted-foreground">Important dates</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bookmarked</CardTitle>
            <Bookmark className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.bookmarked}</div>
            <p className="text-xs text-muted-foreground">Saved items</p>
          </CardContent>
        </Card>
      </div>

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
                placeholder="Search announcements..."
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
                <SelectItem value="academic">Academic</SelectItem>
                <SelectItem value="sports">Sports</SelectItem>
                <SelectItem value="events">Events</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="deadline">Deadlines</SelectItem>
                <SelectItem value="general">General</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedPriority} onValueChange={setSelectedPriority}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Announcements Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
          <TabsTrigger value="unread">Unread ({stats.unread})</TabsTrigger>
          <TabsTrigger value="urgent">Urgent ({stats.urgent})</TabsTrigger>
          <TabsTrigger value="deadlines">Deadlines ({stats.deadlines})</TabsTrigger>
          <TabsTrigger value="bookmarked">Saved ({stats.bookmarked})</TabsTrigger>
        </TabsList>

        {['all', 'unread', 'urgent', 'deadlines', 'bookmarked'].map((tab) => (
          <TabsContent key={tab} value={tab} className="space-y-4">
            {getTabAnnouncements(tab).length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No announcements found</h3>
                  <p className="text-muted-foreground">No announcements match your current filters.</p>
                </CardContent>
              </Card>
            ) : (
              getTabAnnouncements(tab).map((announcement) => (
                <Card key={announcement.id} className={`${!announcement.isRead ? 'bg-blue-50/30 border-blue-200' : ''}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                          {getCategoryIcon(announcement.category)}
                        </div>
                        <div className="flex-1 space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className={`font-semibold ${!announcement.isRead ? 'font-bold' : ''}`}>
                                  {announcement.title}
                                </h3>
                                {!announcement.isRead && (
                                  <Badge variant="destructive" className="text-xs">New</Badge>
                                )}
                                {announcement.isBookmarked && (
                                  <Bookmark className="h-4 w-4 text-yellow-500 fill-current" />
                                )}
                              </div>
                              <div className="flex items-center gap-2 flex-wrap">
                                {getCategoryBadge(announcement.category)}
                                {getPriorityBadge(announcement.priority)}
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-muted-foreground">{announcement.summary}</p>
                          
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              {announcement.author} - {announcement.authorRole}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {new Date(announcement.publishedDate).toLocaleDateString()}
                            </div>
                            {announcement.location && (
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {announcement.location}
                              </div>
                            )}
                            {announcement.eventDate && (
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                Event: {new Date(announcement.eventDate).toLocaleDateString()}
                              </div>
                            )}
                          </div>

                          {announcement.expiryDate && (
                            <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                              <div className="flex items-center gap-2">
                                <AlertCircle className="h-4 w-4 text-yellow-600" />
                                <span className="text-sm font-medium text-yellow-800">
                                  Expires: {new Date(announcement.expiryDate).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          )}

                          {announcement.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {announcement.tags.map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}

                          {announcement.attachments && announcement.attachments.length > 0 && (
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">
                                {announcement.attachments.length} attachment(s)
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2 ml-4">
                        <Button size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Read Full
                        </Button>
                        <Button size="sm" variant="outline">
                          <Bookmark className={`h-4 w-4 ${announcement.isBookmarked ? 'fill-current text-yellow-500' : ''}`} />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Share2 className="h-4 w-4" />
                        </Button>
                        {announcement.attachments && announcement.attachments.length > 0 && (
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}