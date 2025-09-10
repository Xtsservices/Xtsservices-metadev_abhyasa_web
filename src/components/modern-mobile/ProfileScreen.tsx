import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { motion } from 'motion/react';
import { 
  User, 
  Settings, 
  Bell,
  Moon,
  Shield,
  HelpCircle,
  LogOut,
  Edit,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  BookOpen,
  Users,
  TrendingUp,
  Star,
  Download
} from 'lucide-react';

interface ProfileScreenProps {
  userRole: 'student' | 'parent';
  onNavigate: (screen: string) => void;
  onLogout: () => void;
}

export function ProfileScreen({ userRole, onNavigate, onLogout }: ProfileScreenProps) {
  const studentData = {
    name: 'Alex Smith',
    email: 'alex.smith@student.modernschool.edu',
    phone: '+1 (555) 123-4567',
    class: 'Grade 10-A',
    studentId: 'MS2024001',
    joinDate: 'September 2023',
    avatar: 'AS',
    stats: [
      { label: 'GPA', value: '3.8', icon: Star, color: 'text-blue-600 bg-blue-50' },
      { label: 'Attendance', value: '95%', icon: Calendar, color: 'text-green-600 bg-green-50' },
      { label: 'Assignments', value: '28/30', icon: BookOpen, color: 'text-purple-600 bg-purple-50' },
      { label: 'Certificates', value: '6', icon: Award, color: 'text-orange-600 bg-orange-50' }
    ]
  };

  const parentData = {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@gmail.com',
    phone: '+1 (555) 987-6543',
    address: '123 Oak Street, Springfield',
    parentId: 'MP2024001',
    joinDate: 'September 2023',
    avatar: 'SJ',
    children: [
      { name: 'Emma Johnson', class: 'Grade 10-A', status: 'Active' },
      { name: 'Noah Johnson', class: 'Grade 7-B', status: 'Active' }
    ],
    stats: [
      { label: 'Children', value: '2', icon: Users, color: 'text-blue-600 bg-blue-50' },
      { label: 'Meetings', value: '8', icon: Calendar, color: 'text-green-600 bg-green-50' },
      { label: 'Messages', value: '42', icon: Mail, color: 'text-purple-600 bg-purple-50' },
      { label: 'Years', value: '3', icon: Star, color: 'text-orange-600 bg-orange-50' }
    ]
  };

  const data = userRole === 'student' ? studentData : parentData;

  const menuItems = [
    { icon: Edit, label: 'Edit Profile', action: () => onNavigate(`${userRole}-profile`) },
    { icon: Bell, label: 'Notifications', action: () => onNavigate('notifications') },
    { icon: Settings, label: 'Settings', action: () => onNavigate('settings') },
    { icon: Shield, label: 'Privacy & Security', action: () => {} },
    { icon: HelpCircle, label: 'Help & Support', action: () => {} },
    { icon: Download, label: 'Download Data', action: () => {} },
  ];

  const quickActions = userRole === 'student' 
    ? [
        { icon: BookOpen, label: 'My Assignments', action: () => onNavigate('assignments') },
        { icon: TrendingUp, label: 'My Grades', action: () => onNavigate('grades') },
        { icon: Award, label: 'Certificates', action: () => onNavigate('certificates') },
        { icon: Calendar, label: 'Schedule', action: () => onNavigate('schedule') }
      ]
    : [
        { icon: Users, label: 'My Children', action: () => onNavigate('children') },
        { icon: TrendingUp, label: 'Academic Reports', action: () => onNavigate('academic') },
        { icon: Calendar, label: 'School Events', action: () => onNavigate('events') },
        { icon: Award, label: 'Certificates', action: () => onNavigate('child-certificates') }
      ];

  return (
    <div className="p-4 space-y-6 pb-24">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="card-elevated bg-gradient-to-br from-primary/5 to-accent/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Avatar className="h-20 w-20 ring-4 ring-primary/20">
                  <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-primary to-accent text-white">
                    {data.avatar}
                  </AvatarFallback>
                </Avatar>
              </motion.div>
              
              <div className="flex-1 min-w-0">
                <motion.h1 
                  className="text-2xl font-bold text-foreground mb-1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  {data.name}
                </motion.h1>
                
                <motion.div 
                  className="space-y-1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground truncate">{data.email}</span>
                  </div>
                  
                  {userRole === 'student' ? (
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      {studentData.class} • ID: {studentData.studentId}
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Parent • {parentData.children.length} Children
                    </Badge>
                  )}
                </motion.div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <Button 
                  variant="outline" 
                  size="sm"
                  className="rounded-full"
                  onClick={() => onNavigate(`${userRole}-profile`)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="grid grid-cols-2 gap-3">
          {data.stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="card-elevated">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 rounded-xl ${stat.color} flex items-center justify-center`}>
                        <Icon className="h-5 w-5" />
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
        </div>
      </motion.div>

      {/* Children Info (Parent Only) */}
      {userRole === 'parent' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                My Children
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {parentData.children.map((child, index) => (
                <motion.div
                  key={child.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-xl bg-muted/30"
                >
                  <div>
                    <p className="font-medium text-foreground">{child.name}</p>
                    <p className="text-sm text-muted-foreground">{child.class}</p>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    {child.status}
                  </Badge>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <motion.div
                    key={action.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="outline"
                      className="h-16 flex-col gap-2 w-full"
                      onClick={action.action}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="text-xs font-medium">{action.label}</span>
                    </Button>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Menu Items */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
      >
        <Card className="card-elevated">
          <CardContent className="p-0">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Button
                    variant="ghost"
                    className="w-full justify-start h-auto p-4 rounded-none border-b border-border/50 last:border-b-0"
                    onClick={item.action}
                  >
                    <Icon className="h-5 w-5 text-muted-foreground mr-3" />
                    <span className="flex-1 text-left">{item.label}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </motion.div>
              );
            })}
          </CardContent>
        </Card>
      </motion.div>

      {/* Logout Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.8 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          variant="outline"
          className="w-full h-12 text-destructive border-destructive/20 hover:bg-destructive/10"
          onClick={onLogout}
        >
          <LogOut className="h-5 w-5 mr-2" />
          Sign Out
        </Button>
      </motion.div>
    </div>
  );
}