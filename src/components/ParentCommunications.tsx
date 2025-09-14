import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  MessageSquare, 
  Send, 
  Search, 
  Phone, 
  Video, 
  Calendar, 
  Clock, 
  Users, 
  Filter, 
  Star, 
  Paperclip,
  CheckCircle,
  AlertCircle,
  Mail,
  User,
  BookOpen,
  MessageCircle,
  Bell
} from 'lucide-react';

interface ParentCommunicationsProps {
  onNavigate: (screen: import("../App").Screen) => void;
}

interface Message {
  id: string;
  sender: {
    name: string;
    role: 'teacher' | 'admin' | 'parent';
    subject?: string;
    avatar?: string;
  };
  recipient: {
    name: string;
    role: 'teacher' | 'admin' | 'parent';
  };
  subject: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  priority: 'high' | 'medium' | 'low';
  category: 'academic' | 'behavior' | 'attendance' | 'general' | 'announcement';
  childRelated?: string;
  hasAttachment?: boolean;
  replies?: Message[];
}

interface Teacher {
  id: string;
  name: string;
  subject: string;
  email: string;
  phone: string;
  avatar?: string;
  availability: string;
  childrenTaught: string[];
}

export function ParentCommunications({ onNavigate }: ParentCommunicationsProps) {
  const [activeTab, setActiveTab] = useState('messages');
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [messageCategory, setMessageCategory] = useState('general');
  const [searchTerm, setSearchTerm] = useState('');

  const children = [
    { id: 'sarah', name: 'Sarah Johnson', grade: 'Grade 10A' },
    { id: 'mike', name: 'Mike Johnson', grade: 'Grade 7B' }
  ];

  const teachers: Teacher[] = [
    {
      id: '1',
      name: 'Dr. Sarah Wilson',
      subject: 'Mathematics',
      email: 'sarah.wilson@school.edu',
      phone: '+1-555-0123',
      availability: 'Mon-Fri 9:00 AM - 4:00 PM',
      childrenTaught: ['sarah']
    },
    {
      id: '2',
      name: 'Mr. Robert Johnson',
      subject: 'Physics',
      email: 'robert.johnson@school.edu',
      phone: '+1-555-0124',
      availability: 'Mon-Fri 10:00 AM - 5:00 PM',
      childrenTaught: ['sarah']
    },
    {
      id: '3',
      name: 'Ms. Emily Davis',
      subject: 'Science',
      email: 'emily.davis@school.edu',
      phone: '+1-555-0125',
      availability: 'Mon-Fri 8:00 AM - 3:00 PM',
      childrenTaught: ['mike']
    },
    {
      id: '4',
      name: 'Mrs. Jennifer Brown',
      subject: 'English',
      email: 'jennifer.brown@school.edu',
      phone: '+1-555-0126',
      availability: 'Mon-Fri 9:00 AM - 4:00 PM',
      childrenTaught: ['sarah', 'mike']
    },
    {
      id: '5',
      name: 'Mr. David Taylor',
      subject: 'Class Teacher - Grade 7B',
      email: 'david.taylor@school.edu',
      phone: '+1-555-0127',
      availability: 'Mon-Fri 8:00 AM - 4:00 PM',
      childrenTaught: ['mike']
    }
  ];

  const messages: Message[] = [
    {
      id: '1',
      sender: { name: 'Dr. Sarah Wilson', role: 'teacher', subject: 'Mathematics' },
      recipient: { name: 'Parent', role: 'parent' },
      subject: 'Sarah\'s Outstanding Performance in Mathematics',
      content: 'I wanted to share some great news about Sarah\'s performance in mathematics this term. She has shown exceptional understanding of calculus concepts and scored 94% in the recent unit test. Her problem-solving approach is very methodical and impressive.',
      timestamp: '2024-09-02T10:30:00',
      isRead: false,
      priority: 'medium',
      category: 'academic',
      childRelated: 'sarah'
    },
    {
      id: '2',
      sender: { name: 'Mr. David Taylor', role: 'teacher', subject: 'Class Teacher' },
      recipient: { name: 'Parent', role: 'parent' },
      subject: 'Mike\'s Attendance Improvement',
      content: 'I\'m pleased to inform you that Mike\'s attendance has improved significantly this month. He has been present for all classes and is actively participating in classroom discussions. This positive change is reflecting in his academic performance as well.',
      timestamp: '2024-09-01T14:20:00',
      isRead: true,
      priority: 'low',
      category: 'attendance',
      childRelated: 'mike'
    },
    {
      id: '3',
      sender: { name: 'Mrs. Jennifer Brown', role: 'teacher', subject: 'English' },
      recipient: { name: 'Parent', role: 'parent' },
      subject: 'Parent-Teacher Meeting Request',
      content: 'I would like to schedule a meeting to discuss both Sarah and Mike\'s progress in English literature. Sarah is excelling in creative writing, while Mike would benefit from additional support in essay structure. Could we arrange a meeting next week?',
      timestamp: '2024-08-30T16:45:00',
      isRead: true,
      priority: 'high',
      category: 'general',
      childRelated: 'both'
    },
    {
      id: '4',
      sender: { name: 'School Administration', role: 'admin' },
      recipient: { name: 'Parent', role: 'parent' },
      subject: 'Upcoming Science Fair - Registration Open',
      content: 'The annual science fair is approaching on September 15th. Both Sarah and Mike are eligible to participate. Registration forms are available in the school office. This is a great opportunity for students to showcase their scientific knowledge and creativity.',
      timestamp: '2024-08-28T09:15:00',
      isRead: true,
      priority: 'medium',
      category: 'announcement'
    },
    {
      id: '5',
      sender: { name: 'Ms. Emily Davis', role: 'teacher', subject: 'Science' },
      recipient: { name: 'Parent', role: 'parent' },
      subject: 'Mike\'s Science Project Excellence',
      content: 'Mike\'s volcano project was absolutely fantastic! His understanding of geological processes and the quality of his presentation impressed the entire class. He has shown great enthusiasm for hands-on science experiments.',
      timestamp: '2024-08-25T11:30:00',
      isRead: true,
      priority: 'medium',
      category: 'academic',
      childRelated: 'mike'
    }
  ];

  const filteredMessages = messages.filter(message => {
    const searchMatch = message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       message.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       message.sender.name.toLowerCase().includes(searchTerm.toLowerCase());
    return searchMatch;
  });

  const unreadCount = messages.filter(m => !m.isRead).length;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-4 border-l-red-500';
      case 'medium': return 'border-l-4 border-l-yellow-500';
      case 'low': return 'border-l-4 border-l-green-500';
      default: return '';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'academic': return <BookOpen className="h-4 w-4 text-blue-600" />;
      case 'behavior': return <User className="h-4 w-4 text-orange-600" />;
      case 'attendance': return <Clock className="h-4 w-4 text-green-600" />;
      case 'announcement': return <AlertCircle className="h-4 w-4 text-purple-600" />;
      default: return <MessageCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedTeacher) {
      // Handle message sending logic here
      console.log('Sending message:', {
        to: selectedTeacher,
        category: messageCategory,
        content: newMessage
      });
      setNewMessage('');
      // Show success message or update UI
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Communications</h1>
          <p className="text-muted-foreground">Stay connected with teachers and school administration</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => onNavigate('children')}>
            <Users className="h-4 w-4 mr-2" />
            Children Overview
          </Button>
          <Button onClick={() => onNavigate('notifications')}>
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{messages.length}</div>
            <p className="text-xs text-muted-foreground">All conversations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread</CardTitle>
            <Badge variant="destructive" className="text-xs">
              {unreadCount}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unreadCount}</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Teachers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teachers.length}</div>
            <p className="text-xs text-muted-foreground">Available contacts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">Within 24 hours</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="messages">Messages ({messages.length})</TabsTrigger>
          <TabsTrigger value="teachers">Teachers ({teachers.length})</TabsTrigger>
          <TabsTrigger value="compose">Compose</TabsTrigger>
        </TabsList>

        <TabsContent value="messages" className="space-y-4">
          {/* Search */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search messages..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Messages List */}
          <div className="space-y-4">
            {filteredMessages.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No messages found</h3>
                  <p className="text-muted-foreground">Try adjusting your search terms.</p>
                </CardContent>
              </Card>
            ) : (
              filteredMessages.map((message) => (
                <Card key={message.id} className={`${getPriorityColor(message.priority)} ${!message.isRead ? 'bg-blue-50' : ''}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={message.sender.avatar} />
                          <AvatarFallback>
                            {message.sender.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className={`font-medium ${!message.isRead ? 'font-bold' : ''}`}>
                              {message.subject}
                            </h3>
                            {!message.isRead && (
                              <Badge variant="destructive" className="text-xs">New</Badge>
                            )}
                            {message.priority === 'high' && (
                              <Badge className="bg-red-100 text-red-800 text-xs">High Priority</Badge>
                            )}
                            {getCategoryIcon(message.category)}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span className="font-medium">{message.sender.name}</span>
                            {message.sender.subject && (
                              <>
                                <span>•</span>
                                <span>{message.sender.subject}</span>
                              </>
                            )}
                            {message.childRelated && (
                              <>
                                <span>•</span>
                                <span>Re: {message.childRelated === 'both' ? 'Both children' : 
                                  children.find(c => c.id === message.childRelated)?.name}</span>
                              </>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {message.content}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>{new Date(message.timestamp).toLocaleString()}</span>
                            {message.hasAttachment && (
                              <div className="flex items-center gap-1">
                                <Paperclip className="h-3 w-3" />
                                <span>Attachment</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 ml-4">
                        <Button size="sm" variant="outline">
                          Reply
                        </Button>
                        <Button size="sm" variant="outline">
                          <Star className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="teachers" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {teachers.map((teacher) => (
              <Card key={teacher.id}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={teacher.avatar} />
                      <AvatarFallback className="text-lg">
                        {teacher.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div>
                        <h3 className="font-semibold text-lg">{teacher.name}</h3>
                        <p className="text-muted-foreground">{teacher.subject}</p>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          <span>{teacher.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          <span>{teacher.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{teacher.availability}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Teaches:</span>
                        {teacher.childrenTaught.map((childId) => {
                          const child = children.find(c => c.id === childId);
                          return child ? (
                            <Badge key={childId} variant="outline" className="text-xs">
                              {child.name}
                            </Badge>
                          ) : null;
                        })}
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                        <Button size="sm" variant="outline">
                          <Calendar className="h-4 w-4 mr-2" />
                          Schedule
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="compose" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Compose New Message</CardTitle>
              <CardDescription>Send a message to your child's teacher or school administration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Recipient</label>
                  <Select value={selectedTeacher} onValueChange={setSelectedTeacher}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select teacher..." />
                    </SelectTrigger>
                    <SelectContent>
                      {teachers.map((teacher) => (
                        <SelectItem key={teacher.id} value={teacher.id}>
                          {teacher.name} - {teacher.subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <Select value={messageCategory} onValueChange={setMessageCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="academic">Academic</SelectItem>
                      <SelectItem value="behavior">Behavior</SelectItem>
                      <SelectItem value="attendance">Attendance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Subject</label>
                <Input placeholder="Enter message subject..." />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Message</label>
                <Textarea
                  placeholder="Type your message here..."
                  className="min-h-32"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Button variant="outline">
                  <Paperclip className="h-4 w-4 mr-2" />
                  Attach File
                </Button>
                <Button onClick={handleSendMessage} disabled={!newMessage.trim() || !selectedTeacher}>
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}