import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { motion } from 'motion/react';
import { 
  Bell, 
  CheckCircle, 
  AlertTriangle,
  Info,
  Calendar,
  BookOpen,
  Users,
  Award,
  MessageSquare,
  Clock,
  TrendingUp,
  Star,
  Filter,
  MoreVertical
} from 'lucide-react';

interface ActivityScreenProps {
  userRole: 'student' | 'parent';
  onNavigate: (screen: string) => void;
}

export function ActivityScreen({ userRole, onNavigate }: ActivityScreenProps) {
  const [selectedTab, setSelectedTab] = useState('all');

  const studentActivities = {
    all: [
      {
        id: 1,
        type: 'assignment',
        title: 'Mathematics Quiz - Chapter 5',
        description: 'Due tomorrow at 11:59 PM',
        time: '2 hours ago',
        icon: BookOpen,
        priority: 'high',
        read: false,
        color: 'text-red-600 bg-red-50'
      },
      {
        id: 2,
        type: 'grade',
        title: 'History Essay Graded',
        description: 'You received an A- (89%) on your World War II essay',
        time: '5 hours ago',
        icon: Star,
        priority: 'medium',
        read: false,
        color: 'text-blue-600 bg-blue-50'
      },
      {
        id: 3,
        type: 'announcement',
        title: 'Science Fair Registration',
        description: 'Register for the annual science fair by December 30th',
        time: '1 day ago',
        icon: Award,
        priority: 'medium',
        read: true,
        color: 'text-purple-600 bg-purple-50'
      },
      {
        id: 4,
        type: 'schedule',
        title: 'Schedule Change',
        description: 'Mathematics class moved to Room 205 tomorrow',
        time: '2 days ago',
        icon: Calendar,
        priority: 'low',
        read: true,
        color: 'text-green-600 bg-green-50'
      }
    ]
  };

  const parentActivities = {
    all: [
      {
        id: 1,
        type: 'meeting',
        title: 'Parent-Teacher Meeting Reminder',
        description: 'Meeting with Ms. Davis about Emma scheduled for Dec 25',
        time: '1 hour ago',
        icon: Users,
        priority: 'high',
        read: false,
        color: 'text-blue-600 bg-blue-50',
        child: 'Emma'
      },
      {
        id: 2,
        type: 'grade',
        title: 'Noah\'s Science Project Graded',
        description: 'Received B+ (87%) on renewable energy project',
        time: '3 hours ago',
        icon: Star,
        priority: 'medium',
        read: false,
        color: 'text-green-600 bg-green-50',
        child: 'Noah'
      },
      {
        id: 3,
        type: 'payment',
        title: 'School Fee Reminder',
        description: 'Q3 fees due by January 15th - Emma Johnson',
        time: '1 day ago',
        icon: AlertTriangle,
        priority: 'high',
        read: true,
        color: 'text-orange-600 bg-orange-50',
        child: 'Emma'
      },
      {
        id: 4,
        type: 'event',
        title: 'Science Fair Invitation',
        description: 'You\'re invited to attend Noah\'s science fair presentation',
        time: '2 days ago',
        icon: Award,
        priority: 'medium',
        read: true,
        color: 'text-purple-600 bg-purple-50',
        child: 'Noah'
      }
    ]
  };

  const activities = userRole === 'student' ? studentActivities : parentActivities;
  const unreadCount = activities.all.filter(item => !item.read).length;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-300';
    }
  };

  const getTimeAgo = (time: string) => {
    return time;
  };

  return (
    <div className="p-4 space-y-6 pb-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold">Activity</h1>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="rounded-full">
                {unreadCount} new
              </Badge>
            )}
          </div>
          <Button variant="ghost" size="sm">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-muted-foreground">
          Stay updated with your {userRole === 'student' ? 'academic' : 'children\'s'} activities
        </p>
      </motion.div>

      {/* Activity Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-3 rounded-xl">
            <TabsTrigger value="all" className="rounded-lg">All</TabsTrigger>
            <TabsTrigger value="urgent" className="rounded-lg">Urgent</TabsTrigger>
            <TabsTrigger value="today" className="rounded-lg">Today</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4 mt-6">
            {activities.all.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <Card className={`card-elevated cursor-pointer border-l-4 ${getPriorityColor(activity.priority)} ${
                  !activity.read ? 'bg-primary/5 border-primary/20' : ''
                }`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <motion.div 
                        className={`h-10 w-10 rounded-xl ${activity.color} flex items-center justify-center flex-shrink-0`}
                        whileHover={{ scale: 1.1 }}
                      >
                        <activity.icon className="h-5 w-5" />
                      </motion.div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className={`font-medium ${!activity.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {activity.title}
                          </h3>
                          <div className="flex items-center gap-2">
                            {!activity.read && (
                              <div className="h-2 w-2 bg-primary rounded-full" />
                            )}
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <MoreVertical className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                          {activity.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {getTimeAgo(activity.time)}
                            </span>
                          </div>
                          
                          {userRole === 'parent' && 'child' in activity && (
                            <Badge variant="outline" className="text-xs">
                              {activity.child}
                            </Badge>
                          )}
                          
                          <Badge 
                            variant={activity.priority === 'high' ? 'destructive' : 'secondary'} 
                            className="text-xs"
                          >
                            {activity.priority}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="urgent" className="space-y-4 mt-6">
            {activities.all
              .filter(activity => activity.priority === 'high')
              .map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                >
                  <Card className="card-elevated border-l-4 border-l-red-500">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className={`h-10 w-10 rounded-xl ${activity.color} flex items-center justify-center flex-shrink-0`}>
                          <activity.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium mb-1">{activity.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{activity.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">{activity.time}</span>
                            <Badge variant="destructive" className="text-xs">Urgent</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </TabsContent>

          <TabsContent value="today" className="space-y-4 mt-6">
            {activities.all
              .filter(activity => activity.time.includes('hour') || activity.time.includes('today'))
              .map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                >
                  <Card className="card-elevated">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className={`h-10 w-10 rounded-xl ${activity.color} flex items-center justify-center flex-shrink-0`}>
                          <activity.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium mb-1">{activity.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{activity.description}</p>
                          <span className="text-xs text-muted-foreground">{activity.time}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                className="h-12 flex-col gap-1"
                onClick={() => onNavigate('notifications')}
              >
                <Bell className="h-4 w-4" />
                <span className="text-xs">All Notifications</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-12 flex-col gap-1"
                onClick={() => onNavigate(userRole === 'student' ? 'schedule' : 'events')}
              >
                <Calendar className="h-4 w-4" />
                <span className="text-xs">{userRole === 'student' ? 'Schedule' : 'Events'}</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}