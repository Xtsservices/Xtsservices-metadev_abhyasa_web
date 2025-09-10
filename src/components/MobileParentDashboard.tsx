import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback } from './ui/avatar';
import { 
  Users, 
  TrendingUp, 
  Calendar,
  MessageSquare,
  Award,
  ChevronRight,
  Bell,
  Clock,
  BookOpen
} from 'lucide-react';

interface MobileParentDashboardProps {
  onNavigate: (screen: string) => void;
}

export function MobileParentDashboard({ onNavigate }: MobileParentDashboardProps) {
  const children = [
    {
      id: 1,
      name: 'Emma Johnson',
      class: 'Grade 10-A',
      avatar: 'EJ',
      attendance: 92,
      avgGrade: 'A-',
      recentActivity: 'Mathematics test completed'
    },
    {
      id: 2,
      name: 'Noah Johnson',
      class: 'Grade 7-B',
      avatar: 'NJ',
      attendance: 88,
      avgGrade: 'B+',
      recentActivity: 'Science project submitted'
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Parent-Teacher Meeting',
      date: 'Dec 25',
      time: '2:00 PM',
      type: 'meeting'
    },
    {
      id: 2,
      title: 'Science Fair',
      date: 'Dec 28',
      time: '10:00 AM',
      type: 'event'
    }
  ];

  const recentCommunications = [
    {
      id: 1,
      from: 'Mrs. Smith - Mathematics',
      subject: 'Emma\'s Test Results',
      time: '2 hours ago',
      unread: true
    },
    {
      id: 2,
      from: 'School Administration',
      subject: 'Holiday Schedule Update',
      time: '1 day ago',
      unread: false
    }
  ];

  return (
    <div className="p-4 space-y-4">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 rounded-lg">
        <h1 className="text-xl font-semibold mb-1">Good morning!</h1>
        <p className="text-muted-foreground">Here's what's happening with your children</p>
      </div>

      {/* Children Overview */}
      <div className="space-y-3">
        {children.map((child) => (
          <Card key={child.id} className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {child.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate">{child.name}</h3>
                <p className="text-sm text-muted-foreground">{child.class}</p>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onNavigate('children')}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Attendance</span>
                  <span className="text-sm font-medium">{child.attendance}%</span>
                </div>
                <Progress value={child.attendance} className="h-2" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Average Grade</span>
                <Badge variant="outline">{child.avgGrade}</Badge>
              </div>
            </div>
            
            <div className="mt-3 p-2 bg-muted/50 rounded text-sm">
              <span className="text-muted-foreground">Recent: </span>
              {child.recentActivity}
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <MessageSquare className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">3</p>
              <p className="text-sm text-muted-foreground">New Messages</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">2</p>
              <p className="text-sm text-muted-foreground">Upcoming Events</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Upcoming Events */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Upcoming Events</CardTitle>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onNavigate('events')}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="flex items-center gap-3 p-3 border rounded-lg">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{event.title}</p>
                <p className="text-sm text-muted-foreground">{event.date} • {event.time}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Communications */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Recent Messages</CardTitle>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onNavigate('communication')}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentCommunications.map((comm) => (
            <div key={comm.id} className={`flex items-start gap-3 p-3 border rounded-lg ${
              comm.unread ? 'bg-primary/5 border-primary/20' : ''
            }`}>
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                <MessageSquare className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{comm.from}</p>
                <p className="text-sm text-muted-foreground truncate">{comm.subject}</p>
                <p className="text-xs text-muted-foreground mt-1">{comm.time}</p>
              </div>
              {comm.unread && (
                <div className="h-2 w-2 bg-primary rounded-full flex-shrink-0 mt-2" />
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button 
          variant="outline" 
          className="h-16 flex-col gap-2"
          onClick={() => onNavigate('academic')}
        >
          <TrendingUp className="h-5 w-5" />
          Academic Reports
        </Button>
        <Button 
          variant="outline" 
          className="h-16 flex-col gap-2"
          onClick={() => onNavigate('child-certificates')}
        >
          <Award className="h-5 w-5" />
          Certificates
        </Button>
      </div>
    </div>
  );
}