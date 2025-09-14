import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  MessageSquare,
  Send,
  Search,
  Filter,
  Users,
  Calendar,
  Clock,
  Paperclip,
  Star,
  Archive,
  Trash2,
  Reply,
  Forward,
  MoreHorizontal
} from 'lucide-react';
import { toast } from "sonner";

interface MessagesProps {
  onNavigate: (screen: import("../App").Screen) => void;
}

interface Message {
  id: string;
  sender: string;
  senderRole: 'teacher' | 'student' | 'parent' | 'admin';
  recipient: string;
  subject: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  isStarred: boolean;
  hasAttachment: boolean;
  category: 'general' | 'academic' | 'administrative' | 'urgent';
}

interface Conversation {
  id: string;
  participants: string[];
  lastMessage: Message;
  unreadCount: number;
}

export function Messages({ onNavigate }: MessagesProps) {
  const [activeTab, setActiveTab] = useState('inbox');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showComposeDialog, setShowComposeDialog] = useState(false);

  const [messages] = useState<Message[]>([
    {
      id: '1',
      sender: 'Dr. Sarah Wilson',
      senderRole: 'teacher',
      recipient: 'You',
      subject: 'Assignment Submission Reminder',
      content: 'Hi! Just a gentle reminder that your Mathematics assignment is due tomorrow. Please make sure to submit it before the deadline. If you have any questions, feel free to reach out. Good luck!',
      timestamp: '2025-09-01T10:30:00',
      isRead: false,
      isStarred: false,
      hasAttachment: false,
      category: 'academic'
    },
    {
      id: '2',
      sender: 'Principal Johnson',
      senderRole: 'admin',
      recipient: 'All Students',
      subject: 'School Event - Sports Day Registration',
      content: 'Dear Students, We are excited to announce that registration for our Annual Sports Day is now open! Please register by September 15th. Various events including track and field, basketball, and swimming competitions will be held.',
      timestamp: '2025-09-01T09:15:00',
      isRead: true,
      isStarred: true,
      hasAttachment: true,
      category: 'general'
    },
    {
      id: '3',
      sender: 'Mr. David Brown',
      senderRole: 'teacher',
      recipient: 'You',
      subject: 'Great Work on Physics Lab',
      content: 'Excellent work on your physics laboratory experiment! Your methodology was thorough and your conclusions were well-supported. Keep up the great work!',
      timestamp: '2025-08-31T16:45:00',
      isRead: true,
      isStarred: false,
      hasAttachment: false,
      category: 'academic'
    },
    {
      id: '4',
      sender: 'Library Administration',
      senderRole: 'admin',
      recipient: 'You',
      subject: 'Book Return Reminder',
      content: 'This is a reminder that you have books due for return by September 5th. Please return them to avoid late fees. You can also renew them online if needed.',
      timestamp: '2025-08-31T14:20:00',
      isRead: false,
      isStarred: false,
      hasAttachment: false,
      category: 'administrative'
    },
    {
      id: '5',
      sender: 'Ms. Emily Davis',
      senderRole: 'teacher',
      recipient: 'You',
      subject: 'Parent-Teacher Conference Schedule',
      content: 'Dear Parent, We would like to schedule a conference to discuss your child\'s academic progress. Please let us know your availability for next week.',
      timestamp: '2025-08-30T11:00:00',
      isRead: true,
      isStarred: false,
      hasAttachment: false,
      category: 'general'
    }
  ]);

  const [conversations] = useState<Conversation[]>([
    {
      id: '1',
      participants: ['You', 'Dr. Sarah Wilson'],
      lastMessage: messages[0],
      unreadCount: 1
    },
    {
      id: '2',
      participants: ['You', 'Mr. David Brown'],
      lastMessage: messages[2],
      unreadCount: 0
    }
  ]);

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || message.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'teacher':
        return 'bg-blue-100 text-blue-800';
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      case 'student':
        return 'bg-green-100 text-green-800';
      case 'parent':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'academic':
        return 'bg-blue-100 text-blue-800';
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'administrative':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent successfully!");
    setShowComposeDialog(false);
  };

  const handleMarkAsRead = (messageId: string) => {
    toast.success("Message marked as read");
  };

  const handleStarMessage = (messageId: string) => {
    toast.success("Message starred");
  };

  const handleDeleteMessage = (messageId: string) => {
    toast.success("Message deleted");
  };

  const unreadCount = messages.filter(m => !m.isRead).length;
  const starredMessages = messages.filter(m => m.isStarred);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Messages</h1>
          <p className="text-muted-foreground">Stay connected with teachers, students, and staff</p>
        </div>
        <Dialog open={showComposeDialog} onOpenChange={setShowComposeDialog}>
          <DialogTrigger asChild>
            <Button>
              <Send className="h-4 w-4 mr-2" />
              Compose Message
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Compose New Message</DialogTitle>
              <DialogDescription>Send a message to teachers or staff</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSendMessage} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="recipient">To</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select recipient" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="teacher1">Dr. Sarah Wilson (Math Teacher)</SelectItem>
                    <SelectItem value="teacher2">Mr. David Brown (Physics Teacher)</SelectItem>
                    <SelectItem value="admin">Principal Johnson</SelectItem>
                    <SelectItem value="library">Library Administration</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="Enter subject" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  placeholder="Type your message..." 
                  className="min-h-32"
                />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setShowComposeDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Starred</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{starredMessages.length}</div>
            <p className="text-xs text-muted-foreground">Important messages</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversations</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversations.length}</div>
            <p className="text-xs text-muted-foreground">Active chats</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-64">
              <Label htmlFor="search">Search Messages</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by subject, sender, or content..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="academic">Academic</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="administrative">Administrative</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Messages Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Messages</CardTitle>
            <CardDescription>{filteredMessages.length} messages found</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="inbox" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="inbox">Inbox ({unreadCount})</TabsTrigger>
                <TabsTrigger value="starred">Starred ({starredMessages.length})</TabsTrigger>
                <TabsTrigger value="sent">Sent</TabsTrigger>
              </TabsList>
              
              <TabsContent value="inbox" className="space-y-4 mt-4">
                {filteredMessages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors ${
                      !message.isRead ? 'bg-blue-50 border-blue-200' : ''
                    } ${
                      selectedMessage?.id === message.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedMessage(message)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge className={getRoleColor(message.senderRole)}>
                          {message.senderRole}
                        </Badge>
                        <Badge className={getCategoryColor(message.category)}>
                          {message.category}
                        </Badge>
                        {!message.isRead && (
                          <Badge variant="destructive" className="text-xs">
                            New
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        {message.hasAttachment && <Paperclip className="h-3 w-3" />}
                        {message.isStarred && <Star className="h-3 w-3 fill-current text-yellow-500" />}
                        <Clock className="h-3 w-3" />
                        {new Date(message.timestamp).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{message.sender}</span>
                        <span className="text-sm text-muted-foreground">
                          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <h3 className="font-medium">{message.subject}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {message.content}
                      </p>
                    </div>
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="starred" className="space-y-4 mt-4">
                {starredMessages.map((message) => (
                  <div key={message.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <Badge className={getRoleColor(message.senderRole)}>
                        {message.senderRole}
                      </Badge>
                      <Star className="h-4 w-4 fill-current text-yellow-500" />
                    </div>
                    <div className="space-y-1">
                      <span className="font-medium">{message.sender}</span>
                      <h3 className="font-medium">{message.subject}</h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(message.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="sent" className="mt-4">
                <div className="text-center py-8">
                  <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-2 text-sm font-medium">No sent messages</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Messages you send will appear here.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Message Details */}
        <Card>
          <CardHeader>
            <CardTitle>Message Details</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedMessage ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge className={getRoleColor(selectedMessage.senderRole)}>
                      {selectedMessage.senderRole}
                    </Badge>
                    <Badge className={getCategoryColor(selectedMessage.category)}>
                      {selectedMessage.category}
                    </Badge>
                  </div>
                  <h3 className="font-medium">{selectedMessage.subject}</h3>
                  <div className="text-sm text-muted-foreground">
                    <div>From: {selectedMessage.sender}</div>
                    <div>To: {selectedMessage.recipient}</div>
                    <div>Date: {new Date(selectedMessage.timestamp).toLocaleString()}</div>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <p className="text-sm leading-relaxed">{selectedMessage.content}</p>
                </div>
                
                <div className="flex gap-2 pt-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleMarkAsRead(selectedMessage.id)}
                  >
                    <Reply className="h-4 w-4 mr-1" />
                    Reply
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleStarMessage(selectedMessage.id)}
                  >
                    <Star className="h-4 w-4 mr-1" />
                    Star
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeleteMessage(selectedMessage.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-2 text-sm font-medium">Select a message</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Choose a message from the list to view details.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}