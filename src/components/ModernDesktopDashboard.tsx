import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Users, 
  BookOpen, 
  Award,
  Calendar,
  Bell,
  ChevronRight,
  Star,
  Target,
  BarChart3
} from 'lucide-react';

interface ModernDesktopDashboardProps {
  userRole: 'student' | 'parent';
  onNavigate: (screen: string) => void;
}

export function ModernDesktopDashboard({ userRole, onNavigate }: ModernDesktopDashboardProps) {
  const studentStats = [
    { label: 'GPA', value: '3.8', change: '+0.2', icon: Star, color: 'text-blue-600 bg-blue-50' },
    { label: 'Attendance', value: '95%', change: '+2%', icon: Calendar, color: 'text-green-600 bg-green-50' },
    { label: 'Assignments', value: '28/30', change: '2 pending', icon: BookOpen, color: 'text-purple-600 bg-purple-50' },
    { label: 'Rank', value: '#3', change: '↑1', icon: Award, color: 'text-orange-600 bg-orange-50' }
  ];

  const parentStats = [
    { label: 'Children', value: '2', change: 'Active', icon: Users, color: 'text-blue-600 bg-blue-50' },
    { label: 'Avg Grade', value: 'A-', change: '+0.1', icon: TrendingUp, color: 'text-green-600 bg-green-50' },
    { label: 'Events', value: '3', change: 'This week', icon: Calendar, color: 'text-purple-600 bg-purple-50' },
    { label: 'Meetings', value: '2', change: 'Scheduled', icon: Target, color: 'text-orange-600 bg-orange-50' }
  ];

  const stats = userRole === 'student' ? studentStats : parentStats;

  return (
    <div className="p-8 space-y-8">
      {/* Hero Section */}
      <motion.div 
        className="bg-gradient-to-br from-primary/10 via-accent/10 to-purple-500/10 p-8 rounded-3xl border border-primary/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="max-w-4xl">
          <motion.h1 
            className="text-4xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            Modern Mobile-First Design
          </motion.h1>
          <motion.p 
            className="text-xl text-muted-foreground mb-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            Experience our education management system with enhanced mobile responsiveness, 
            modern design tokens, and intuitive navigation across all devices.
          </motion.p>
          <motion.div 
            className="flex gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-xl font-semibold">
              View Mobile Demo
            </Button>
            <Button variant="outline" className="px-6 py-3 rounded-xl font-semibold border-2">
              Desktop Features
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Design Features Grid */}
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {/* Mobile First */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="h-10 w-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                📱
              </div>
              Mobile-First Design
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Floating bottom navigation with blur effects</li>
              <li>• Touch-optimized 44px minimum targets</li>
              <li>• Responsive breakpoints: 390px, 768px, 1280px</li>
              <li>• Safe area support for modern devices</li>
            </ul>
          </CardContent>
        </Card>

        {/* Design Tokens */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="h-10 w-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
                🎨
              </div>
              Modern Design System
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Inter/SF Pro font family with weight hierarchy</li>
              <li>• 4pt base grid with 8pt spacing multiples</li>
              <li>• Rounded cards (12-16px) with elevation shadows</li>
              <li>• Vibrant accent colors and neutral backgrounds</li>
            </ul>
          </CardContent>
        </Card>

        {/* Interactions */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="h-10 w-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
                ⚡
              </div>
              Smart Interactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Bottom nav icons scale and animate on tap</li>
              <li>• Cards animate with smart transitions</li>
              <li>• Component variants for active/inactive states</li>
              <li>• Gesture-based navigation support</li>
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Role-Specific Overview</h2>
          <Badge variant="outline" className="text-sm px-3 py-1">
            {userRole === 'student' ? 'Student Dashboard' : 'Parent Dashboard'}
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="card-elevated">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`h-12 w-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {stat.change}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Mobile Screens Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="text-2xl">Mobile Screen Variants</CardTitle>
            <p className="text-muted-foreground">
              Responsive layouts optimized for different user roles and device sizes
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {['Home', 'Search', 'Activity', 'Profile'].map((screen, index) => (
                <motion.div
                  key={screen}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="cursor-pointer"
                  onClick={() => onNavigate(screen.toLowerCase())}
                >
                  <div className="bg-muted/30 rounded-2xl p-4 h-48 flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/20 hover:border-primary/50 transition-colors">
                    <div className="h-16 w-12 bg-gradient-to-b from-primary/20 to-accent/20 rounded-lg mb-4 border border-primary/30"></div>
                    <h3 className="font-semibold mb-1">{screen} Screen</h3>
                    <p className="text-xs text-muted-foreground text-center">
                      {userRole === 'student' ? 'Student' : 'Parent'} view
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}