import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Clock,
  Calendar,
  BookOpen,
  MapPin,
  User,
  Bell,
  ChevronLeft,
  ChevronRight,
  Download
} from 'lucide-react';
import { toast } from "sonner";

interface StudentScheduleProps {
  onNavigate: (screen: string) => void;
}

interface ScheduleItem {
  id: string;
  subject: string;
  teacher: string;
  teacherAvatar?: string;
  time: string;
  duration: number;
  room: string;
  type: 'lecture' | 'lab' | 'practical' | 'test' | 'break';
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
}

interface DaySchedule {
  date: string;
  day: string;
  schedule: ScheduleItem[];
}

export function StudentSchedule({ onNavigate }: StudentScheduleProps) {
  const [currentWeek, setCurrentWeek] = useState(0);

  const weekSchedule: DaySchedule[] = [
    {
      date: '2024-09-02',
      day: 'Monday',
      schedule: [
        {
          id: '1',
          subject: 'Mathematics',
          teacher: 'Dr. Priya Sharma',
          time: '08:00',
          duration: 60,
          room: 'Room 101',
          type: 'lecture',
          status: 'completed'
        },
        {
          id: '2',
          subject: 'Physics',
          teacher: 'Rajesh Kumar',
          time: '09:00',
          duration: 60,
          room: 'Physics Lab',
          type: 'lab',
          status: 'completed'
        },
        {
          id: '3',
          subject: 'Break',
          teacher: '',
          time: '10:00',
          duration: 15,
          room: 'Cafeteria',
          type: 'break',
          status: 'completed'
        },
        {
          id: '4',
          subject: 'English',
          teacher: 'Sneha Patel',
          time: '10:15',
          duration: 60,
          room: 'Room 102',
          type: 'lecture',
          status: 'completed'
        },
        {
          id: '5',
          subject: 'Chemistry',
          teacher: 'Amit Singh',
          time: '11:15',
          duration: 60,
          room: 'Chemistry Lab',
          type: 'practical',
          status: 'completed'
        },
        {
          id: '6',
          subject: 'Biology',
          teacher: 'Kavya Reddy',
          time: '12:15',
          duration: 60,
          room: 'Biology Lab',
          type: 'lecture',
          status: 'completed'
        }
      ]
    },
    {
      date: '2024-09-03',
      day: 'Tuesday',
      schedule: [
        {
          id: '7',
          subject: 'Physics',
          teacher: 'Rajesh Kumar',
          time: '08:00',
          duration: 60,
          room: 'Room 101',
          type: 'lecture',
          status: 'ongoing'
        },
        {
          id: '8',
          subject: 'Mathematics',
          teacher: 'Dr. Priya Sharma',
          time: '09:00',
          duration: 60,
          room: 'Room 101',
          type: 'test',
          status: 'upcoming'
        },
        {
          id: '9',
          subject: 'Break',
          teacher: '',
          time: '10:00',
          duration: 15,
          room: 'Cafeteria',
          type: 'break',
          status: 'upcoming'
        },
        {
          id: '10',
          subject: 'Computer Science',
          teacher: 'Kavya Reddy',
          time: '10:15',
          duration: 60,
          room: 'Computer Lab',
          type: 'lab',
          status: 'upcoming'
        },
        {
          id: '11',
          subject: 'English',
          teacher: 'Sneha Patel',
          time: '11:15',
          duration: 60,
          room: 'Room 102',
          type: 'lecture',
          status: 'upcoming'
        }
      ]
    },
    {
      date: '2024-09-04',
      day: 'Wednesday',
      schedule: [
        {
          id: '12',
          subject: 'Chemistry',
          teacher: 'Amit Singh',
          time: '08:00',
          duration: 60,
          room: 'Chemistry Lab',
          type: 'practical',
          status: 'upcoming'
        },
        {
          id: '13',
          subject: 'Biology',
          teacher: 'Kavya Reddy',
          time: '09:00',
          duration: 60,
          room: 'Biology Lab',
          type: 'lecture',
          status: 'upcoming'
        },
        {
          id: '14',
          subject: 'Break',
          teacher: '',
          time: '10:00',
          duration: 15,
          room: 'Cafeteria',
          type: 'break',
          status: 'upcoming'
        },
        {
          id: '15',
          subject: 'Physical Education',
          teacher: 'Sports Teacher',
          time: '10:15',
          duration: 60,
          room: 'Sports Ground',
          type: 'practical',
          status: 'upcoming'
        },
        {
          id: '16',
          subject: 'Mathematics',
          teacher: 'Dr. Priya Sharma',
          time: '11:15',
          duration: 60,
          room: 'Room 101',
          type: 'lecture',
          status: 'upcoming'
        }
      ]
    },
    {
      date: '2024-09-05',
      day: 'Thursday',
      schedule: [
        {
          id: '17',
          subject: 'English',
          teacher: 'Sneha Patel',
          time: '08:00',
          duration: 60,
          room: 'Room 102',
          type: 'lecture',
          status: 'upcoming'
        },
        {
          id: '18',
          subject: 'Physics',
          teacher: 'Rajesh Kumar',
          time: '09:00',
          duration: 60,
          room: 'Physics Lab',
          type: 'lab',
          status: 'upcoming'
        },
        {
          id: '19',
          subject: 'Break',
          teacher: '',
          time: '10:00',
          duration: 15,
          room: 'Cafeteria',
          type: 'break',
          status: 'upcoming'
        },
        {
          id: '20',
          subject: 'Biology Test',
          teacher: 'Kavya Reddy',
          time: '10:15',
          duration: 60,
          room: 'Biology Lab',
          type: 'test',
          status: 'upcoming'
        },
        {
          id: '21',
          subject: 'Chemistry',
          teacher: 'Amit Singh',
          time: '11:15',
          duration: 60,
          room: 'Room 103',
          type: 'lecture',
          status: 'upcoming'
        }
      ]
    },
    {
      date: '2024-09-06',
      day: 'Friday',
      schedule: [
        {
          id: '22',
          subject: 'Mathematics',
          teacher: 'Dr. Priya Sharma',
          time: '08:00',
          duration: 60,
          room: 'Room 101',
          type: 'lecture',
          status: 'upcoming'
        },
        {
          id: '23',
          subject: 'Computer Science',
          teacher: 'Kavya Reddy',
          time: '09:00',
          duration: 60,
          room: 'Computer Lab',
          type: 'practical',
          status: 'upcoming'
        },
        {
          id: '24',
          subject: 'Break',
          teacher: '',
          time: '10:00',
          duration: 15,
          room: 'Cafeteria',
          type: 'break',
          status: 'upcoming'
        },
        {
          id: '25',
          subject: 'Art & Craft',
          teacher: 'Art Teacher',
          time: '10:15',
          duration: 60,
          room: 'Art Room',
          type: 'practical',
          status: 'upcoming'
        },
        {
          id: '26',
          subject: 'Study Hall',
          teacher: 'Class Teacher',
          time: '11:15',
          duration: 60,
          room: 'Room 101',
          type: 'lecture',
          status: 'upcoming'
        }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lecture':
        return <BookOpen className="h-4 w-4" />;
      case 'lab':
      case 'practical':
        return <User className="h-4 w-4" />;
      case 'test':
        return <Bell className="h-4 w-4" />;
      case 'break':
        return <Clock className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  const formatTime = (time: string) => {
    return new Date(`2024-01-01 ${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getCurrentTimeSlot = () => {
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5);
    return currentTime;
  };

  const isCurrentClass = (time: string, duration: number) => {
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5);
    const [hours, minutes] = time.split(':').map(Number);
    const classStart = hours * 60 + minutes;
    const classEnd = classStart + duration;
    const [currentHours, currentMinutes] = currentTime.split(':').map(Number);
    const currentMinutesTotal = currentHours * 60 + currentMinutes;
    
    return currentMinutesTotal >= classStart && currentMinutesTotal < classEnd;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Schedule</h1>
          <p className="text-muted-foreground">View your weekly class schedule and upcoming activities</p>
        </div>
        <Button variant="outline" onClick={() => toast.success("Schedule exported")}>
          <Download className="h-4 w-4 mr-2" />
          Export Schedule
        </Button>
      </div>

      {/* Week Navigation */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Week Schedule</CardTitle>
              <CardDescription>September 2-6, 2024 • Grade 10A</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                Today
              </Button>
              <Button variant="outline" size="sm">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Daily Schedule Tabs */}
      <Tabs defaultValue="tuesday" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          {weekSchedule.map((day) => (
            <TabsTrigger key={day.day.toLowerCase()} value={day.day.toLowerCase()}>
              <div className="text-center">
                <div className="font-medium">{day.day}</div>
                <div className="text-xs text-muted-foreground">{day.date.split('-')[2]}</div>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>

        {weekSchedule.map((day) => (
          <TabsContent key={day.day.toLowerCase()} value={day.day.toLowerCase()}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {day.day}, {new Date(day.date).toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </CardTitle>
                <CardDescription>
                  {day.schedule.filter(s => s.type !== 'break').length} classes scheduled
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {day.schedule.map((item) => (
                  <div 
                    key={item.id} 
                    className={`p-4 rounded-lg border-2 transition-all ${
                      isCurrentClass(item.time, item.duration) && day.day === 'Tuesday' 
                        ? 'bg-green-50 border-green-300 shadow-md' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex flex-col items-center">
                          <div className="text-lg font-bold">{formatTime(item.time)}</div>
                          <div className="text-xs text-muted-foreground">{item.duration}min</div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            {getTypeIcon(item.type)}
                          </div>
                          <div className="space-y-1">
                            <h3 className="font-semibold text-lg">{item.subject}</h3>
                            {item.teacher && (
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <User className="h-3 w-3" />
                                <span>{item.teacher}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin className="h-3 w-3" />
                              <span>{item.room}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Badge 
                          variant="outline" 
                          className={`${getStatusColor(item.status)} font-medium`}
                        >
                          {item.status === 'ongoing' ? 'Live Now' : item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </Badge>
                        
                        <Badge variant="secondary" className="capitalize">
                          {item.type === 'break' ? 'Break' : item.type}
                        </Badge>
                      </div>
                    </div>
                    
                    {item.type === 'test' && (
                      <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-center gap-2 text-sm text-yellow-800">
                          <Bell className="h-4 w-4" />
                          <span className="font-medium">Assessment Alert:</span>
                          <span>Make sure to bring your calculator and reference materials</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {day.schedule.length === 0 && (
                  <div className="text-center py-12">
                    <Calendar className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-2 text-sm font-medium">No classes scheduled</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Enjoy your free day!
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-600">25</div>
            <p className="text-sm text-muted-foreground">Classes this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600">3</div>
            <p className="text-sm text-muted-foreground">Lab sessions</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-yellow-600">2</div>
            <p className="text-sm text-muted-foreground">Tests scheduled</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-purple-600">30h</div>
            <p className="text-sm text-muted-foreground">Total study time</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}