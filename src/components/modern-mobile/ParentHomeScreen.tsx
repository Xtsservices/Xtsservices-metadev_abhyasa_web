import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { motion } from 'motion/react';
import { 
  Users, 
  TrendingUp, 
  Calendar,
  MessageSquare,
  Award,
  ChevronRight,
  Bell,
  Clock,
  BookOpen,
  Heart,
  Star,
  AlertTriangle
} from 'lucide-react';

interface ParentHomeScreenProps {
  onNavigate: (screen: import("../../App").Screen) => void;
}

export function ParentHomeScreen({ onNavigate }: ParentHomeScreenProps) {
  const children = [
    {
      id: 1,
      name: 'Emma Johnson',
      class: 'Grade 10-A',
      avatar: 'EJ',
      attendance: 92,
      avgGrade: 'A-',
      status: 'excellent',
      recentActivity: 'Mathematics test completed',
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: 2,
      name: 'Noah Johnson',
      class: 'Grade 7-B',
      avatar: 'NJ',
      attendance: 88,
      avgGrade: 'B+',
      status: 'good',
      recentActivity: 'Science project submitted',
      color: 'from-green-500 to-blue-600'
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Parent-Teacher Meeting',
      date: 'Dec 25',
      time: '2:00 PM',
      type: 'meeting',
      child: 'Emma',
      color: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    {
      id: 2,
      title: 'Science Fair',
      date: 'Dec 28',
      time: 'All Day',
      type: 'event',
      child: 'Noah',
      color: 'bg-purple-50 text-purple-700 border-purple-200'
    }
  ];

  const quickStats = [
    { label: 'Children', value: '2', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'New Messages', value: '3', icon: MessageSquare, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Events', value: '2', icon: Calendar, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Alerts', value: '1', icon: AlertTriangle, color: 'text-orange-600', bg: 'bg-orange-50' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800 border-green-200';
      case 'good': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'needs-attention': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="p-4 space-y-6 pb-24">
      {/* Welcome Section */}
      <motion.div 
        className="bg-gradient-to-br from-primary/10 via-accent/10 to-green-500/10 p-6 rounded-2xl border border-primary/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.h1 
          className="text-2xl font-semibold text-foreground mb-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          Welcome back! 👨‍👩‍👧‍👦
        </motion.h1>
        <motion.p 
          className="text-muted-foreground"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          Here's what's happening with your children's education
        </motion.p>
      </motion.div>

      {/* Quick Stats Grid */}
      <motion.div 
        className="grid grid-cols-2 gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="card-elevated">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                      <Icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Children Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            Your Children
          </h2>
          <Button 
            variant="ghost" 
            size="sm"
            className="tap-scale"
            onClick={() => onNavigate('children')}
          >
            View All
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        
        <div className="space-y-4">
          {children.map((child, index) => (
            <motion.div
              key={child.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.01 }}
            >
              <Card className="card-elevated">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className={`h-14 w-14 ring-2 ring-primary/30`}>
                      <AvatarFallback className={`bg-gradient-to-br ${child.color} text-white font-semibold text-lg`}>
                        {child.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate">{child.name}</h3>
                      <p className="text-sm text-muted-foreground">{child.class}</p>
                      <Badge variant="outline" className={`text-xs mt-1 ${getStatusColor(child.status)}`}>
                        {child.status === 'excellent' ? '🌟 Excellent' : 
                         child.status === 'good' ? '👍 Good' : '⚠️ Needs Attention'}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Attendance</span>
                        <span className="text-sm font-medium">{child.attendance}%</span>
                      </div>
                      <Progress value={child.attendance} className="h-2" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Grade</span>
                      <Badge variant="outline" className="text-sm">{child.avgGrade}</Badge>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-muted/30 rounded-xl">
                    <p className="text-sm">
                      <span className="text-muted-foreground">Recent: </span>
                      <span className="text-foreground font-medium">{child.recentActivity}</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Upcoming Events */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
      >
        <Card className="card-elevated">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Upcoming Events
              </CardTitle>
              <Button 
                variant="ghost" 
                size="sm"
                className="tap-scale"
                onClick={() => onNavigate('events')}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingEvents.map((event, index) => (
              <motion.div 
                key={event.id} 
                className={`flex items-center gap-4 p-3 border rounded-xl ${event.color}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.01 }}
              >
                <div className="h-12 w-12 rounded-xl bg-white/80 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{event.title}</p>
                  <p className="text-sm opacity-80">{event.date} • {event.time}</p>
                  <Badge variant="secondary" className="text-xs mt-1">
                    {event.child}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div 
        className="grid grid-cols-2 gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.7 }}
      >
        {([
          { icon: TrendingUp, label: 'Reports', screen: 'academic', color: 'bg-blue-50 text-blue-600' },
          { icon: Award, label: 'Certificates', screen: 'child-certificates', color: 'bg-emerald-50 text-emerald-600' }
        ] as { icon: any; label: string; screen: import("../../App").Screen; color: string }[]).map((action, index) => {
          const Icon = action.icon;
          return (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                variant="outline" 
                className="h-20 flex-col gap-2 w-full card-elevated"
                onClick={() => onNavigate(action.screen)}
              >
                <Icon className={`h-6 w-6 ${action.color.split(' ')[1]}`} />
                <span className="font-medium">{action.label}</span>
              </Button>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}