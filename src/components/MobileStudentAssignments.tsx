import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  FileText,
  Calendar,
  ChevronRight,
  Filter
} from 'lucide-react';

interface MobileStudentAssignmentsProps {
  onNavigate: (screen: import("../App").Screen) => void;
}

export function MobileStudentAssignments({ onNavigate }: MobileStudentAssignmentsProps) {
  const [activeTab, setActiveTab] = useState('pending');

  const assignments = {
    pending: [
      {
        id: 1,
        title: 'Mathematics Quiz - Chapter 5',
        subject: 'Mathematics',
        dueDate: '2024-12-25',
        dueTime: '11:59 PM',
        priority: 'high',
        type: 'Quiz',
        description: 'Complete all problems from Chapter 5: Quadratic Equations',
        progress: 0
      },
      {
        id: 2,
        title: 'History Essay - World War II',
        subject: 'History',
        dueDate: '2024-12-28',
        dueTime: '11:59 PM',
        priority: 'medium',
        type: 'Essay',
        description: 'Write a 1000-word essay on the causes of World War II',
        progress: 30
      },
      {
        id: 3,
        title: 'Science Lab Report',
        subject: 'Physics',
        dueDate: '2024-12-30',
        dueTime: '2:00 PM',
        priority: 'low',
        type: 'Lab Report',
        description: 'Submit lab report on pendulum experiment',
        progress: 80
      }
    ],
    completed: [
      {
        id: 4,
        title: 'English Literature Review',
        subject: 'English',
        completedDate: '2024-12-20',
        grade: 'A-',
        type: 'Review',
        description: 'Analysis of Shakespeare\'s Hamlet'
      },
      {
        id: 5,
        title: 'Chemistry Problems Set 3',
        subject: 'Chemistry',
        completedDate: '2024-12-18',
        grade: 'B+',
        type: 'Problem Set',
        description: 'Chemical bonding and molecular structure'
      }
    ]
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-400';
      case 'medium': return 'bg-yellow-400';
      case 'low': return 'bg-green-400';
      default: return 'bg-gray-400';
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
    return `${diffDays} days left`;
  };

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Assignments</h1>
          <p className="text-sm text-muted-foreground">
            {assignments.pending.length} pending tasks
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="pending" className="text-xs">
            Pending ({assignments.pending.length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="text-xs">
            Completed ({assignments.completed.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-3 mt-4">
          {assignments.pending.map((assignment) => (
            <Card key={assignment.id} className="p-4">
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start gap-3">
                  <div className={`h-3 w-3 rounded-full ${getPriorityColor(assignment.priority)} mt-2 flex-shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm leading-tight">
                      {assignment.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {assignment.subject}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {assignment.type}
                      </Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground">
                  {assignment.description}
                </p>

                {/* Progress */}
                {assignment.progress > 0 && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="text-muted-foreground">{assignment.progress}%</span>
                    </div>
                    <Progress value={assignment.progress} className="h-2" />
                  </div>
                )}

                {/* Due date */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Due {assignment.dueDate}</span>
                  </div>
                  <span className={`text-xs font-medium ${
                    getDaysUntilDue(assignment.dueDate).includes('overdue') 
                      ? 'text-red-600' 
                      : getDaysUntilDue(assignment.dueDate).includes('today') || getDaysUntilDue(assignment.dueDate).includes('tomorrow')
                        ? 'text-orange-600'
                        : 'text-muted-foreground'
                  }`}>
                    {getDaysUntilDue(assignment.dueDate)}
                  </span>
                </div>

                {/* Action Button */}
                <Button 
                  className="w-full" 
                  size="sm"
                  disabled={assignment.progress === 100}
                >
                  {assignment.progress === 0 ? 'Start Assignment' : 
                   assignment.progress === 100 ? 'Completed' : 'Continue'}
                </Button>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-3 mt-4">
          {assignments.completed.map((assignment) => (
            <Card key={assignment.id} className="p-4">
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm leading-tight">
                      {assignment.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {assignment.subject}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {assignment.type}
                      </Badge>
                    </div>
                  </div>
                  <Badge variant="default" className="text-xs">
                    Grade: {assignment.grade}
                  </Badge>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground">
                  {assignment.description}
                </p>

                {/* Completion date */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Completed on {assignment.completedDate}</span>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}