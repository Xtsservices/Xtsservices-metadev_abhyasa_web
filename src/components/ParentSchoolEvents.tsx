import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Calendar, MapPin, Clock, Users, Star, CheckCircle, XCircle, AlertCircle, Camera, Trophy, Music, BookOpen, Zap, Heart } from 'lucide-react';

interface ParentSchoolEventsProps {
  onNavigate: (screen: import("../App").Screen) => void;
}

interface SchoolEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: 'academic' | 'sports' | 'cultural' | 'social' | 'announcement';
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  participants?: string[];
  organizer: string;
  registrationRequired: boolean;
  registrationDeadline?: string;
  maxParticipants?: number;
  currentParticipants?: number;
  isRegistered?: boolean;
  priority: 'high' | 'medium' | 'low';
  attachments?: string[];
  childrenEligible?: string[];
}

export function ParentSchoolEvents({ onNavigate }: ParentSchoolEventsProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedChild, setSelectedChild] = useState('all');

  const children = [
    { id: 'sarah', name: 'Sarah Johnson', grade: 'Grade 10A' },
    { id: 'mike', name: 'Mike Johnson', grade: 'Grade 7B' }
  ];

  const events: SchoolEvent[] = [
    {
      id: '1',
      title: 'Annual Science Fair 2024',
      description: 'Showcase innovative science projects by students from all grades. Parents are invited to view and vote for their favorite projects.',
      date: '2024-09-15',
      time: '9:00 AM - 4:00 PM',
      location: 'Main Auditorium & Science Labs',
      category: 'academic',
      status: 'upcoming',
      organizer: 'Science Department',
      registrationRequired: false,
      priority: 'high',
      childrenEligible: ['sarah', 'mike'],
      attachments: ['Science_Fair_Schedule.pdf', 'Project_Guidelines.pdf']
    },
    {
      id: '2',
      title: 'Parent-Teacher Conference',
      description: 'Individual meetings with teachers to discuss your child\'s academic progress and areas for improvement.',
      date: '2024-09-12',
      time: '2:00 PM - 6:00 PM',
      location: 'Respective Classrooms',
      category: 'academic',
      status: 'upcoming',
      organizer: 'Academic Department',
      registrationRequired: true,
      registrationDeadline: '2024-09-10',
      priority: 'high',
      isRegistered: true,
      childrenEligible: ['sarah', 'mike']
    },
    {
      id: '3',
      title: 'Inter-House Sports Championship',
      description: 'Annual sports competition between different houses. Multiple events including track and field, swimming, and team sports.',
      date: '2024-09-20',
      time: '8:00 AM - 5:00 PM',
      location: 'School Sports Complex',
      category: 'sports',
      status: 'upcoming',
      organizer: 'Sports Department',
      registrationRequired: false,
      priority: 'medium',
      childrenEligible: ['sarah', 'mike']
    },
    {
      id: '4',
      title: 'Cultural Festival - Diwali Celebration',
      description: 'Traditional Diwali celebration with cultural performances, food stalls, and art exhibitions. Family-friendly event.',
      date: '2024-10-28',
      time: '5:00 PM - 9:00 PM',
      location: 'School Grounds',
      category: 'cultural',
      status: 'upcoming',
      organizer: 'Cultural Committee',
      registrationRequired: false,
      priority: 'medium',
      childrenEligible: ['sarah', 'mike']
    },
    {
      id: '5',
      title: 'Mathematics Olympiad Training',
      description: 'Special coaching sessions for students interested in participating in the National Mathematics Olympiad.',
      date: '2024-09-08',
      time: '10:00 AM - 12:00 PM',
      location: 'Mathematics Department',
      category: 'academic',
      status: 'upcoming',
      organizer: 'Mr. Johnson',
      registrationRequired: true,
      registrationDeadline: '2024-09-06',
      maxParticipants: 30,
      currentParticipants: 22,
      priority: 'medium',
      isRegistered: false,
      childrenEligible: ['sarah']
    },
    {
      id: '6',
      title: 'Grade 7 Field Trip - Science Museum',
      description: 'Educational visit to the National Science Museum with guided tours and interactive exhibits.',
      date: '2024-09-25',
      time: '9:00 AM - 4:00 PM',
      location: 'National Science Museum',
      category: 'academic',
      status: 'upcoming',
      organizer: 'Grade 7 Teachers',
      registrationRequired: true,
      registrationDeadline: '2024-09-20',
      maxParticipants: 40,
      currentParticipants: 35,
      priority: 'medium',
      isRegistered: true,
      childrenEligible: ['mike']
    },
    {
      id: '7',
      title: 'School Annual Day Rehearsal',
      description: 'Final rehearsal for the annual day performance. Parents of participating students are welcome to attend.',
      date: '2024-11-10',
      time: '3:00 PM - 6:00 PM',
      location: 'Main Auditorium',
      category: 'cultural',
      status: 'upcoming',
      organizer: 'Cultural Department',
      registrationRequired: false,
      priority: 'low',
      childrenEligible: ['sarah', 'mike']
    },
    {
      id: '8',
      title: 'Health & Wellness Workshop',
      description: 'Workshop on nutrition, mental health, and physical wellness for parents and students.',
      date: '2024-09-05',
      time: '2:00 PM - 4:00 PM',
      location: 'School Library',
      category: 'social',
      status: 'completed',
      organizer: 'Health Department',
      registrationRequired: false,
      priority: 'medium',
      childrenEligible: ['sarah', 'mike']
    },
    {
      id: '9',
      title: 'Grade 10 Career Guidance Session',
      description: 'Information session about career options and stream selection for Grade 10 students and their parents.',
      date: '2024-08-28',
      time: '4:00 PM - 6:00 PM',
      location: 'Conference Hall',
      category: 'academic',
      status: 'completed',
      organizer: 'Counseling Department',
      registrationRequired: false,
      priority: 'high',
      childrenEligible: ['sarah']
    },
    {
      id: '10',
      title: 'Emergency Drill Practice',
      description: 'Mandatory emergency evacuation drill for all students and staff. Parents will be notified via SMS.',
      date: '2024-09-03',
      time: '11:00 AM',
      location: 'Entire School Campus',
      category: 'announcement',
      status: 'completed',
      organizer: 'Administration',
      registrationRequired: false,
      priority: 'high',
      childrenEligible: ['sarah', 'mike']
    }
  ];

  const filteredEvents = events.filter(event => {
    const categoryMatch = selectedCategory === 'all' || event.category === selectedCategory;
    const statusMatch = selectedStatus === 'all' || event.status === selectedStatus;
    const childMatch = selectedChild === 'all' || event.childrenEligible?.includes(selectedChild);
    return categoryMatch && statusMatch && childMatch;
  });

  const getEventIcon = (category: string) => {
    switch (category) {
      case 'academic':
        return <BookOpen className="h-5 w-5 text-blue-600" />;
      case 'sports':
        return <Trophy className="h-5 w-5 text-green-600" />;
      case 'cultural':
        return <Music className="h-5 w-5 text-purple-600" />;
      case 'social':
        return <Heart className="h-5 w-5 text-pink-600" />;
      case 'announcement':
        return <Zap className="h-5 w-5 text-yellow-600" />;
      default:
        return <Calendar className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Badge className="bg-blue-100 text-blue-800">Upcoming</Badge>;
      case 'ongoing':
        return <Badge className="bg-green-100 text-green-800">Ongoing</Badge>;
      case 'completed':
        return <Badge className="bg-gray-100 text-gray-800">Completed</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-4 border-l-red-500';
      case 'medium':
        return 'border-l-4 border-l-yellow-500';
      case 'low':
        return 'border-l-4 border-l-green-500';
      default:
        return '';
    }
  };

  const upcomingEvents = events.filter(event => event.status === 'upcoming').length;
  const registeredEvents = events.filter(event => event.isRegistered).length;
  const completedEvents = events.filter(event => event.status === 'completed').length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">School Events</h1>
          <p className="text-muted-foreground">Stay updated with all school activities and important events</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => onNavigate('calendar')}>
            <Calendar className="h-4 w-4 mr-2" />
            Calendar View
          </Button>
          <Button onClick={() => onNavigate('notifications')}>
            <CheckCircle className="h-4 w-4 mr-2" />
            Event Notifications
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingEvents}</div>
            <p className="text-xs text-muted-foreground">Next 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Registered</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{registeredEvents}</div>
            <p className="text-xs text-muted-foreground">Events registered</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedEvents}</div>
            <p className="text-xs text-muted-foreground">This academic year</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Event types</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="academic">Academic</SelectItem>
                <SelectItem value="sports">Sports</SelectItem>
                <SelectItem value="cultural">Cultural</SelectItem>
                <SelectItem value="social">Social</SelectItem>
                <SelectItem value="announcement">Announcements</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="ongoing">Ongoing</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedChild} onValueChange={setSelectedChild}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Children" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Children</SelectItem>
                {children.map((child) => (
                  <SelectItem key={child.id} value={child.id}>
                    {child.name} - {child.grade}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Events List */}
      <Tabs defaultValue="list" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          {filteredEvents.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No events found</h3>
                <p className="text-muted-foreground">Try adjusting your filters to see more events.</p>
              </CardContent>
            </Card>
          ) : (
            filteredEvents.map((event) => (
              <Card key={event.id} className={`${getPriorityColor(event.priority)}`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                        {getEventIcon(event.category)}
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-lg">{event.title}</h3>
                          {getStatusBadge(event.status)}
                          {event.priority === 'high' && (
                            <Badge variant="destructive" className="text-xs">High Priority</Badge>
                          )}
                          {event.registrationRequired && (
                            <Badge variant="outline" className="text-xs">Registration Required</Badge>
                          )}
                        </div>
                        
                        <p className="text-muted-foreground">{event.description}</p>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(event.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {event.time}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {event.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {event.organizer}
                          </div>
                        </div>

                        {event.registrationRequired && (
                          <div className="flex items-center gap-4 text-sm">
                            {event.registrationDeadline && (
                              <span className="text-orange-600">
                                Registration Deadline: {new Date(event.registrationDeadline).toLocaleDateString()}
                              </span>
                            )}
                            {event.maxParticipants && (
                              <span className="text-blue-600">
                                Participants: {event.currentParticipants}/{event.maxParticipants}
                              </span>
                            )}
                          </div>
                        )}

                        {event.childrenEligible && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Eligible children:</span>
                            {event.childrenEligible.map((childId) => {
                              const child = children.find(c => c.id === childId);
                              return child ? (
                                <Badge key={childId} variant="outline" className="text-xs">
                                  {child.name}
                                </Badge>
                              ) : null;
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 ml-4">
                      {event.status === 'upcoming' && event.registrationRequired && !event.isRegistered && (
                        <Button size="sm">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Register
                        </Button>
                      )}
                      {event.isRegistered && (
                        <Button size="sm" variant="outline" disabled>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Registered
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      {event.attachments && event.attachments.length > 0 && (
                        <Button size="sm" variant="outline">
                          <Camera className="h-4 w-4 mr-2" />
                          Attachments
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Calendar View</CardTitle>
              <CardDescription>Visual calendar representation of all school events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="p-2 text-center font-medium bg-muted rounded">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
                  const dayEvents = events.filter(event => 
                    new Date(event.date).getDate() === day && 
                    new Date(event.date).getMonth() === 8 // September
                  );
                  return (
                    <div key={day} className="min-h-24 p-2 border rounded-lg">
                      <div className="font-medium">{day}</div>
                      {dayEvents.map((event) => (
                        <div
                          key={event.id}
                          className="mt-1 p-1 text-xs bg-blue-100 text-blue-800 rounded truncate"
                          title={event.title}
                        >
                          {event.title}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}