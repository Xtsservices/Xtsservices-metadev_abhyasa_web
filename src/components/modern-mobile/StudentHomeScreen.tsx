import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
  Calendar,
  Award,
  ChevronRight,
  Bell,
  Target,
  Users,
  Star
} from 'lucide-react';

interface StudentHomeScreenProps {
  onNavigate: (screen: string) => void;
}

export function StudentHomeScreen({ onNavigate }: StudentHomeScreenProps) {
  const upcomingAssignments = [
    {
      id: 1,
      title: 'Mathematics Quiz',
      subject: 'Mathematics',
      dueDate: 'Tomorrow',
      priority: 'high',
      color: 'bg-red-500'
    },
    {
      id: 2,
      title: 'History Essay',
      subject: 'History',
      dueDate: 'Dec 28',
      priority: 'medium',
      color: 'bg-yellow-500'
    }
  ];

  const todaySchedule = [
    { time: '09:00', subject: 'Mathematics', room: 'Room 101', teacher: 'Mr. Smith' },
    { time: '10:30', subject: 'Science', room: 'Lab 2', teacher: 'Dr. Johnson' },
    { time: '13:00', subject: 'History', room: 'Room 205', teacher: 'Ms. Davis' }
  ];

  const quickStats = [
    { label: 'Attendance', value: '95%', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Avg Grade', value: 'A-', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Assignments', value: '8/10', icon: BookOpen, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Rank', value: '#3', icon: Award, color: 'text-orange-600', bg: 'bg-orange-50' }
  ];

  return (
    <div className="p-4 space-y-6 pb-24">
      {/* Welcome Section */}
      <motion.div 
        className="abhyvasa-gradient-soft p-6 rounded-2xl border border-primary/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <motion.h1 
              className="text-2xl font-semibold text-foreground mb-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              Good morning, Alex! 👋
            </motion.h1>
            <motion.p 
              className="text-muted-foreground"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              You have 3 classes today and 2 assignments due this week
            </motion.p>
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Avatar className="h-12 w-12 ring-2 ring-primary/30">
              <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white font-semibold">
                AS
              </AvatarFallback>
            </Avatar>
          </motion.div>
        </div>
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

      {/* Today's Schedule */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <Card className="card-elevated">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Today's Schedule
              </CardTitle>
              <Button 
                variant="ghost" 
                size="sm"
                className="tap-scale"
                onClick={() => onNavigate('schedule')}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {todaySchedule.map((item, index) => (
              <motion.div 
                key={index} 
                className="flex items-center gap-4 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.01 }}
              >
                <div className="text-sm font-semibold text-primary min-w-12 text-center bg-primary/10 py-1 px-2 rounded-lg">
                  {item.time}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{item.subject}</p>
                  <p className="text-sm text-muted-foreground">{item.room} • {item.teacher}</p>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Upcoming Assignments */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <Card className="card-elevated">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Target className="h-5 w-5 text-accent" />
                Upcoming Tasks
              </CardTitle>
              <Button 
                variant="ghost" 
                size="sm"
                className="tap-scale"
                onClick={() => onNavigate('assignments')}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingAssignments.map((assignment, index) => (
              <motion.div 
                key={assignment.id} 
                className="flex items-center gap-3 p-3 border border-border/50 rounded-xl hover:shadow-md transition-all"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.01 }}
              >
                <div className={`h-3 w-3 rounded-full ${assignment.color}`} />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{assignment.title}</p>
                  <p className="text-sm text-muted-foreground">{assignment.subject}</p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {assignment.dueDate}
                </Badge>
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
        transition={{ duration: 0.3, delay: 0.6 }}
      >
        {[
          { icon: BookOpen, label: 'Library', screen: 'library', color: 'bg-indigo-50 text-indigo-600' },
          { icon: Award, label: 'Certificates', screen: 'certificates', color: 'bg-emerald-50 text-emerald-600' }
        ].map((action, index) => {
          const Icon = action.icon;
          return (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
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