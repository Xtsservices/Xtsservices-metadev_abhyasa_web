import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Clock, 
  MapPin, 
  Users, 
  BookOpen, 
  Bell,
  Edit,
  Trash2,
  Eye,
  Filter,
  Download,
  Upload,
  Search,
  AlertCircle,
  CheckCircle,
  User,
  School,
  GraduationCap,
  FileText,
  Target
} from 'lucide-react';

interface TeacherCalendarProps {
  onNavigate: (screen: import("../App").Screen) => void;
}

interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  type: 'class' | 'meeting' | 'exam' | 'deadline' | 'holiday' | 'personal' | 'school-event';
  location?: string;
  participants?: string[];
  subject?: string;
  class?: string;
  priority: 'high' | 'medium' | 'low';
  recurring?: 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly';
  reminders?: number[]; // minutes before event
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  isAllDay?: boolean;
}

export function TeacherCalendar({ onNavigate }: TeacherCalendarProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [isNewEventDialogOpen, setIsNewEventDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [activeTab, setActiveTab] = useState('calendar');

  const events: CalendarEvent[] = [
    {
      id: '1',
      title: 'Grade 10 Mathematics',
      description: 'Calculus - Derivatives and Applications',
      date: '2024-09-02',
      startTime: '09:00',
      endTime: '10:00',
      type: 'class',
      location: 'Room 201',
      subject: 'Mathematics',
      class: 'Grade 10-A',
      participants: ['32 students'],
      priority: 'high',
      recurring: 'weekly',
      status: 'scheduled'
    },
    {
      id: '2',
      title: 'Grade 11 Mathematics',
      description: 'Integration Techniques',
      date: '2024-09-02',
      startTime: '11:00',
      endTime: '12:00',
      type: 'class',
      location: 'Room 201',
      subject: 'Mathematics',
      class: 'Grade 11-B',
      participants: ['28 students'],
      priority: 'high',
      recurring: 'weekly',
      status: 'scheduled'
    },
    {
      id: '3',
      title: 'Faculty Meeting',
      description: 'Monthly faculty meeting to discuss curriculum updates and student progress',
      date: '2024-09-03',
      startTime: '14:00',
      endTime: '15:30',
      type: 'meeting',
      location: 'Conference Room',
      participants: ['Dr. Sarah Wilson', 'Mr. Robert Johnson', 'Dr. Emily Brown', 'Ms. Jennifer Davis'],
      priority: 'medium',
      recurring: 'monthly',
      status: 'scheduled'
    },
    {
      id: '4',
      title: 'Mid-term Examination',
      description: 'Grade 10 Mathematics Mid-term Exam',
      date: '2024-09-15',
      startTime: '09:00',
      endTime: '12:00',
      type: 'exam',
      location: 'Exam Hall A',
      subject: 'Mathematics',
      class: 'Grade 10-A',
      participants: ['32 students'],
      priority: 'high',
      recurring: 'none',
      status: 'scheduled'
    },
    {
      id: '5',
      title: 'Assignment Deadline',
      description: 'Calculus Problem Set 5 submission deadline',
      date: '2024-09-10',
      startTime: '23:59',
      endTime: '23:59',
      type: 'deadline',
      subject: 'Mathematics',
      class: 'Grade 10-A',
      priority: 'high',
      recurring: 'none',
      status: 'scheduled',
      isAllDay: true
    },
    {
      id: '6',
      title: 'Parent-Teacher Conference',
      description: 'Individual meetings with parents to discuss student progress',
      date: '2024-09-18',
      startTime: '14:00',
      endTime: '18:00',
      type: 'meeting',
      location: 'Room 201',
      participants: ['Various parents'],
      priority: 'medium',
      recurring: 'none',
      status: 'scheduled'
    },
    {
      id: '7',
      title: 'Professional Development',
      description: 'Workshop on Modern Teaching Methodologies',
      date: '2024-09-20',
      startTime: '09:00',
      endTime: '17:00',
      type: 'personal',
      location: 'Auditorium',
      priority: 'medium',
      recurring: 'none',
      status: 'scheduled'
    },
    {
      id: '8',
      title: 'Grade Submission Deadline',
      description: 'Submit mid-term grades for all classes',
      date: '2024-09-25',
      startTime: '17:00',
      endTime: '17:00',
      type: 'deadline',
      priority: 'high',
      recurring: 'none',
      status: 'scheduled',
      isAllDay: true
    },
    {
      id: '9',
      title: 'Independence Day',
      description: 'National Holiday - No classes',
      date: '2024-08-15',
      startTime: '00:00',
      endTime: '23:59',
      type: 'holiday',
      priority: 'low',
      recurring: 'yearly',
      status: 'completed',
      isAllDay: true
    },
    {
      id: '10',
      title: 'Annual Sports Day',
      description: 'School-wide sports competition and events',
      date: '2024-09-20',
      startTime: '08:00',
      endTime: '17:00',
      type: 'school-event',
      location: 'Sports Complex',
      participants: ['All students and staff'],
      priority: 'medium',
      recurring: 'yearly',
      status: 'scheduled'
    }
  ];

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'class':
        return <BookOpen className="h-4 w-4 text-blue-600" />;
      case 'meeting':
        return <Users className="h-4 w-4 text-green-600" />;
      case 'exam':
        return <GraduationCap className="h-4 w-4 text-red-600" />;
      case 'deadline':
        return <AlertCircle className="h-4 w-4 text-orange-600" />;
      case 'holiday':
        return <Calendar className="h-4 w-4 text-purple-600" />;
      case 'personal':
        return <User className="h-4 w-4 text-gray-600" />;
      case 'school-event':
        return <School className="h-4 w-4 text-indigo-600" />;
      default:
        return <Calendar className="h-4 w-4 text-gray-600" />;
    }
  };

  const getEventTypeBadge = (type: string) => {
    const typeColors = {
      class: 'bg-blue-100 text-blue-800',
      meeting: 'bg-green-100 text-green-800',
      exam: 'bg-red-100 text-red-800',
      deadline: 'bg-orange-100 text-orange-800',
      holiday: 'bg-purple-100 text-purple-800',
      personal: 'bg-gray-100 text-gray-800',
      'school-event': 'bg-indigo-100 text-indigo-800'
    };
    
    return (
      <Badge className={typeColors[type as keyof typeof typeColors] || typeColors.personal}>
        {type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
      </Badge>
    );
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Badge variant="outline" className="text-blue-600 border-blue-600">Scheduled</Badge>;
      case 'ongoing':
        return <Badge className="bg-green-100 text-green-800">Ongoing</Badge>;
      case 'completed':
        return <Badge className="bg-gray-100 text-gray-800">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredEvents = events.filter(event => {
    const searchMatch = searchTerm === '' || 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (event.subject && event.subject.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const typeMatch = filterType === 'all' || event.type === filterType;
    
    return searchMatch && typeMatch;
  });

  const getTodayEvents = () => {
    const today = new Date().toISOString().split('T')[0];
    return events.filter(event => event.date === today);
  };

  const getUpcomingEvents = () => {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate > today && eventDate <= nextWeek;
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const stats = {
    todayEvents: getTodayEvents().length,
    thisWeekEvents: getUpcomingEvents().length,
    totalClasses: events.filter(e => e.type === 'class').length,
    upcomingExams: events.filter(e => e.type === 'exam' && new Date(e.date) > new Date()).length,
    pendingDeadlines: events.filter(e => e.type === 'deadline' && new Date(e.date) >= new Date()).length
  };

  const generateCalendar = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const calendar = [];
    const current = new Date(startDate);
    
    for (let week = 0; week < 6; week++) {
      const weekDays = [];
      for (let day = 0; day < 7; day++) {
        const dayEvents = events.filter(event => 
          event.date === current.toISOString().split('T')[0]
        );
        
        weekDays.push({
          date: new Date(current),
          events: dayEvents,
          isCurrentMonth: current.getMonth() === month,
          isToday: current.toDateString() === new Date().toDateString()
        });
        current.setDate(current.getDate() + 1);
      }
      calendar.push(weekDays);
    }
    
    return calendar;
  };

  const calendar = generateCalendar();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Teacher Calendar</h1>
          <p className="text-muted-foreground">Manage your schedule, classes, and important dates</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => onNavigate('classes')}>
            <BookOpen className="h-4 w-4 mr-2" />
            My Classes
          </Button>
          <Button onClick={() => setIsNewEventDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.todayEvents}</div>
            <p className="text-xs text-muted-foreground">Scheduled for today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.thisWeekEvents}</div>
            <p className="text-xs text-muted-foreground">Upcoming events</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Regular Classes</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalClasses}</div>
            <p className="text-xs text-muted-foreground">Weekly schedule</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Exams</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.upcomingExams}</div>
            <p className="text-xs text-muted-foreground">To be conducted</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deadlines</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingDeadlines}</div>
            <p className="text-xs text-muted-foreground">Pending items</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="schedule">Daily Schedule</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
          <TabsTrigger value="all-events">All Events</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-4">
          {/* Calendar Navigation */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="sm" onClick={() => {
                    const newDate = new Date(selectedDate);
                    newDate.setMonth(newDate.getMonth() - 1);
                    setSelectedDate(newDate);
                  }}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <h2 className="text-xl font-semibold">
                    {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </h2>
                  <Button variant="outline" size="sm" onClick={() => {
                    const newDate = new Date(selectedDate);
                    newDate.setMonth(newDate.getMonth() + 1);
                    setSelectedDate(newDate);
                  }}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setSelectedDate(new Date())}>
                    Today
                  </Button>
                  <Select value={viewMode} onValueChange={(value: 'month' | 'week' | 'day') => setViewMode(value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="month">Month</SelectItem>
                      <SelectItem value="week">Week</SelectItem>
                      <SelectItem value="day">Day</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {/* Day headers */}
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="p-2 text-center font-medium text-muted-foreground border-b">
                    {day}
                  </div>
                ))}
                
                {/* Calendar days */}
                {calendar.map((week, weekIndex) =>
                  week.map((day, dayIndex) => (
                    <div
                      key={`${weekIndex}-${dayIndex}`}
                      className={`min-h-24 p-1 border cursor-pointer hover:bg-muted/50 ${
                        day.isToday ? 'bg-primary/10 border-primary' : ''
                      } ${!day.isCurrentMonth ? 'text-muted-foreground bg-muted/20' : ''}`}
                      onClick={() => setSelectedDate(day.date)}
                    >
                      <div className={`text-sm font-medium mb-1 ${
                        day.isToday ? 'text-primary' : ''
                      }`}>
                        {day.date.getDate()}
                      </div>
                      <div className="space-y-1">
                        {day.events.slice(0, 3).map((event) => (
                          <div
                            key={event.id}
                            className={`text-xs p-1 rounded cursor-pointer truncate ${
                              event.type === 'class' ? 'bg-blue-100 text-blue-800' :
                              event.type === 'exam' ? 'bg-red-100 text-red-800' :
                              event.type === 'meeting' ? 'bg-green-100 text-green-800' :
                              'bg-gray-100 text-gray-800'
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedEvent(event);
                              setIsEventDialogOpen(true);
                            }}
                          >
                            {event.title}
                          </div>
                        ))}
                        {day.events.length > 3 && (
                          <div className="text-xs text-muted-foreground">
                            +{day.events.length - 3} more
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Today's Schedule - {new Date().toLocaleDateString()}</CardTitle>
              <CardDescription>Your classes and appointments for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getTodayEvents().length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No events scheduled for today</p>
                  </div>
                ) : (
                  getTodayEvents()
                    .sort((a, b) => a.startTime.localeCompare(b.startTime))
                    .map((event) => (
                      <div key={event.id} className="flex items-center gap-4 p-4 border rounded-lg">
                        <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                          {getEventTypeIcon(event.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{event.title}</h3>
                            {getEventTypeBadge(event.type)}
                            {getPriorityBadge(event.priority)}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {event.startTime} - {event.endTime}
                            </div>
                            {event.location && (
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {event.location}
                              </div>
                            )}
                            {event.class && (
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                {event.class}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => {
                            setSelectedEvent(event);
                            setIsEventDialogOpen(true);
                          }}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Events scheduled for the next 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getUpcomingEvents().length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No upcoming events in the next week</p>
                  </div>
                ) : (
                  getUpcomingEvents().map((event) => (
                    <div key={event.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                        {getEventTypeIcon(event.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{event.title}</h3>
                          {getEventTypeBadge(event.type)}
                          {getPriorityBadge(event.priority)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(event.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {event.startTime} - {event.endTime}
                          </div>
                          {event.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {event.location}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => {
                          setSelectedEvent(event);
                          setIsEventDialogOpen(true);
                        }}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="all-events" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4 items-center">
                <div className="flex-1 relative max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search events..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="class">Classes</SelectItem>
                    <SelectItem value="meeting">Meetings</SelectItem>
                    <SelectItem value="exam">Exams</SelectItem>
                    <SelectItem value="deadline">Deadlines</SelectItem>
                    <SelectItem value="holiday">Holidays</SelectItem>
                    <SelectItem value="personal">Personal</SelectItem>
                    <SelectItem value="school-event">School Events</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Events List */}
          <div className="space-y-4">
            {filteredEvents.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No events found</h3>
                  <p className="text-muted-foreground">No events match your current search or filter.</p>
                </CardContent>
              </Card>
            ) : (
              filteredEvents.map((event) => (
                <Card key={event.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                          {getEventTypeIcon(event.type)}
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold">{event.title}</h3>
                            {getEventTypeBadge(event.type)}
                            {getPriorityBadge(event.priority)}
                            {getStatusBadge(event.status)}
                          </div>
                          
                          <p className="text-muted-foreground">{event.description}</p>
                          
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {new Date(event.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {event.isAllDay ? 'All Day' : `${event.startTime} - ${event.endTime}`}
                            </div>
                            {event.location && (
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {event.location}
                              </div>
                            )}
                            {event.class && (
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                {event.class}
                              </div>
                            )}
                            {event.subject && (
                              <div className="flex items-center gap-1">
                                <BookOpen className="h-4 w-4" />
                                {event.subject}
                              </div>
                            )}
                          </div>

                          {event.recurring && event.recurring !== 'none' && (
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Target className="h-4 w-4" />
                              Recurring: {event.recurring}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2 ml-4">
                        <Button size="sm" onClick={() => {
                          setSelectedEvent(event);
                          setIsEventDialogOpen(true);
                        }}>
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Event Details Dialog */}
      <Dialog open={isEventDialogOpen} onOpenChange={setIsEventDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Event Details</DialogTitle>
            <DialogDescription>
              View detailed information about this event
            </DialogDescription>
          </DialogHeader>
          
          {selectedEvent && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold">{selectedEvent.title}</h3>
                {getEventTypeBadge(selectedEvent.type)}
                {getPriorityBadge(selectedEvent.priority)}
              </div>
              
              <p className="text-muted-foreground">{selectedEvent.description}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Date</Label>
                  <p className="text-sm">{new Date(selectedEvent.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Time</Label>
                  <p className="text-sm">
                    {selectedEvent.isAllDay ? 'All Day' : `${selectedEvent.startTime} - ${selectedEvent.endTime}`}
                  </p>
                </div>
                {selectedEvent.location && (
                  <div>
                    <Label className="text-sm font-medium">Location</Label>
                    <p className="text-sm">{selectedEvent.location}</p>
                  </div>
                )}
                {selectedEvent.subject && (
                  <div>
                    <Label className="text-sm font-medium">Subject</Label>
                    <p className="text-sm">{selectedEvent.subject}</p>
                  </div>
                )}
                {selectedEvent.class && (
                  <div>
                    <Label className="text-sm font-medium">Class</Label>
                    <p className="text-sm">{selectedEvent.class}</p>
                  </div>
                )}
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <div className="mt-1">{getStatusBadge(selectedEvent.status)}</div>
                </div>
              </div>
              
              {selectedEvent.participants && selectedEvent.participants.length > 0 && (
                <div>
                  <Label className="text-sm font-medium">Participants</Label>
                  <ul className="text-sm mt-1">
                    {selectedEvent.participants.map((participant, index) => (
                      <li key={index}>• {participant}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsEventDialogOpen(false)}>
                  Close
                </Button>
                <Button>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Event
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* New Event Dialog */}
      <Dialog open={isNewEventDialogOpen} onOpenChange={setIsNewEventDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Event</DialogTitle>
            <DialogDescription>
              Add a new event to your calendar
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Event Title</Label>
              <Input id="title" placeholder="Enter event title" />
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Enter event description" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" />
              </div>
              <div>
                <Label htmlFor="type">Event Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="class">Class</SelectItem>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="exam">Exam</SelectItem>
                    <SelectItem value="deadline">Deadline</SelectItem>
                    <SelectItem value="personal">Personal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="start-time">Start Time</Label>
                <Input id="start-time" type="time" />
              </div>
              <div>
                <Label htmlFor="end-time">End Time</Label>
                <Input id="end-time" type="time" />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="Enter location" />
              </div>
              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsNewEventDialogOpen(false)}>
                Cancel
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Event
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}