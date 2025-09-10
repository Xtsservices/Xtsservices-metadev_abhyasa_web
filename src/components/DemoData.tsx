// Comprehensive demo data for all user roles in the Education Management System

export const demoData = {
  // Super Admin Data
  superAdmin: {
    totalInstitutes: 127,
    totalUsers: 15420,
    pendingRequests: 12,
    activeInstitutions: 115,
    monthlyGrowth: 8.5,
    systemHealth: 99.2,
    
    recentInstitutes: [
      {
        id: 'inst001',
        name: 'Greenwood High School',
        type: 'High School',
        location: 'New York, NY',
        students: 850,
        teachers: 45,
        status: 'active',
        verified: true,
        joinDate: '2024-01-15'
      },
      {
        id: 'inst002',
        name: 'Riverside College',
        type: 'College',
        location: 'California, CA',
        students: 1200,
        teachers: 78,
        status: 'active',
        verified: true,
        joinDate: '2024-02-20'
      },
      {
        id: 'inst003',
        name: 'Sunshine Elementary',
        type: 'Elementary',
        location: 'Texas, TX',
        students: 420,
        teachers: 28,
        status: 'pending',
        verified: false,
        joinDate: '2024-11-10'
      }
    ],

    pendingRequests: [
      {
        id: 'req001',
        instituteName: 'Metro International School',
        type: 'International School',
        location: 'Florida, FL',
        requestDate: '2024-11-08',
        contactPerson: 'Dr. James Wilson',
        email: 'james.wilson@metro.edu',
        phone: '+1-555-0123',
        status: 'pending_review',
        documents: ['license.pdf', 'accreditation.pdf', 'facilities.pdf']
      },
      {
        id: 'req002',
        instituteName: 'Tech Academy Plus',
        type: 'Technical Institute',
        location: 'Washington, WA',
        requestDate: '2024-11-05',
        contactPerson: 'Sarah Mitchell',
        email: 'sarah.mitchell@techacademy.edu',
        phone: '+1-555-0456',
        status: 'pending_documents',
        documents: ['license.pdf']
      }
    ]
  },

  // Institution Admin Data
  institutionAdmin: {
    institutionInfo: {
      name: 'Greenwood High School',
      type: 'High School',
      address: '123 Education Blvd, New York, NY 10001',
      phone: '+1-555-0100',
      email: 'admin@greenwood.edu',
      website: 'www.greenwood.edu',
      established: '1995',
      accreditation: 'NEASC Accredited'
    },

    stats: {
      totalStudents: 1247,
      totalTeachers: 78,
      totalClasses: 42,
      pendingApplications: 12,
      thisMonthEnrollments: 23,
      feeCollection: 87.5,
      attendanceRate: 94.2,
      examScheduled: 8
    },

    departments: [
      { name: 'Mathematics', teachers: 12, students: 845, hod: 'Dr. Michael Johnson' },
      { name: 'Science', teachers: 15, students: 798, hod: 'Dr. Sarah Wilson' },
      { name: 'English', teachers: 10, students: 1024, hod: 'Ms. Emily Davis' },
      { name: 'Social Studies', teachers: 8, students: 678, hod: 'Mr. Robert Brown' },
      { name: 'Physical Education', teachers: 5, students: 1247, hod: 'Coach Mark Taylor' }
    ],

    recentActivities: [
      {
        action: 'New student enrollment',
        details: 'Emma Wilson - Grade 10A',
        time: '1 hour ago',
        type: 'enrollment'
      },
      {
        action: 'Teacher assignment',
        details: 'Mr. Davis assigned to Chemistry lab',
        time: '3 hours ago',
        type: 'assignment'
      },
      {
        action: 'Fee payment received',
        details: 'Payment from Grade 12 - Section B',
        time: '5 hours ago',
        type: 'payment'
      }
    ]
  },

  // Teacher Data
  teacher: {
    personalInfo: {
      name: 'Dr. Michael Johnson',
      employeeId: 'T001',
      department: 'Mathematics',
      subjects: ['Mathematics', 'Advanced Mathematics', 'Statistics'],
      experience: '12 years',
      qualification: 'PhD in Mathematics',
      joinDate: '2012-08-15'
    },

    classes: [
      {
        id: 'class001',
        name: 'Grade 10A',
        subject: 'Mathematics',
        students: 28,
        schedule: 'Mon, Wed, Fri - 9:00 AM',
        room: 'Room 101'
      },
      {
        id: 'class002',
        name: 'Grade 10B',
        subject: 'Mathematics',
        students: 25,
        schedule: 'Tue, Thu - 10:00 AM',
        room: 'Room 101'
      },
      {
        id: 'class003',
        name: 'Grade 12',
        subject: 'Advanced Mathematics',
        students: 22,
        schedule: 'Mon, Wed, Fri - 2:00 PM',
        room: 'Room 205'
      }
    ],

    assignments: [
      {
        id: 'assign001',
        title: 'Quadratic Equations Worksheet',
        class: 'Grade 10A',
        subject: 'Mathematics',
        assignedDate: '2024-11-12',
        dueDate: '2024-11-20',
        submitted: 23,
        total: 28,
        status: 'active'
      },
      {
        id: 'assign002',
        title: 'Calculus Problem Set',
        class: 'Grade 12',
        subject: 'Advanced Mathematics',
        assignedDate: '2024-11-10',
        dueDate: '2024-11-18',
        submitted: 19,
        total: 22,
        status: 'grading'
      }
    ],

    todaySchedule: [
      {
        time: '9:00 AM - 10:00 AM',
        subject: 'Mathematics',
        class: 'Grade 10A',
        room: 'Room 101',
        status: 'completed'
      },
      {
        time: '10:15 AM - 11:15 AM',
        subject: 'Mathematics',
        class: 'Grade 10B',
        room: 'Room 101',
        status: 'current'
      },
      {
        time: '2:00 PM - 3:00 PM',
        subject: 'Advanced Mathematics',
        class: 'Grade 12',
        room: 'Room 205',
        status: 'upcoming'
      }
    ]
  },

  // Student Data
  student: {
    personalInfo: {
      name: 'Sarah Wilson',
      studentId: 'S2024001',
      grade: 'Grade 10A',
      section: 'A',
      rollNumber: '15',
      dateOfBirth: '2008-05-15',
      parentName: 'Robert Wilson',
      parentPhone: '+1-555-0789',
      address: '456 Student Lane, New York, NY 10002'
    },

    academicInfo: {
      currentGPA: 3.67,
      attendanceRate: 95.2,
      totalCredits: 45,
      requiredCredits: 48,
      academicYear: '2024-2025',
      semester: 'Fall 2024'
    },

    subjects: [
      {
        name: 'Mathematics',
        teacher: 'Dr. Michael Johnson',
        currentGrade: 'A-',
        percentage: 87,
        credits: 4
      },
      {
        name: 'Physics',
        teacher: 'Dr. Sarah Smith',
        currentGrade: 'B+',
        percentage: 84,
        credits: 4
      },
      {
        name: 'English Literature',
        teacher: 'Ms. Emily Wilson',
        currentGrade: 'A',
        percentage: 92,
        credits: 3
      },
      {
        name: 'Chemistry',
        teacher: 'Dr. Robert Brown',
        currentGrade: 'B',
        percentage: 81,
        credits: 4
      },
      {
        name: 'History',
        teacher: 'Mr. James Davis',
        currentGrade: 'A-',
        percentage: 88,
        credits: 3
      }
    ],

    assignments: [
      {
        subject: 'Mathematics',
        title: 'Quadratic Equations Worksheet',
        dueDate: '2024-11-20',
        status: 'pending',
        priority: 'high'
      },
      {
        subject: 'Physics',
        title: 'Lab Report - Pendulum Experiment',
        dueDate: '2024-11-18',
        status: 'submitted',
        priority: 'medium',
        grade: 'A-'
      },
      {
        subject: 'English',
        title: 'Essay - Modern Literature Analysis',
        dueDate: '2024-11-25',
        status: 'in-progress',
        priority: 'medium'
      }
    ],

    todaySchedule: [
      {
        time: '9:00 AM - 10:00 AM',
        subject: 'Mathematics',
        teacher: 'Dr. Michael Johnson',
        room: 'Room 101',
        status: 'completed'
      },
      {
        time: '10:15 AM - 11:15 AM',
        subject: 'Physics',
        teacher: 'Dr. Sarah Smith',
        room: 'Lab 1',
        status: 'current'
      },
      {
        time: '11:30 AM - 12:30 PM',
        subject: 'English Literature',
        teacher: 'Ms. Emily Wilson',
        room: 'Room 203',
        status: 'upcoming'
      },
      {
        time: '2:00 PM - 3:00 PM',
        subject: 'Chemistry',
        teacher: 'Dr. Robert Brown',
        room: 'Lab 2',
        status: 'upcoming'
      }
    ]
  },

  // Parent Data
  parent: {
    personalInfo: {
      name: 'Robert Wilson',
      parentId: 'P001',
      relationship: 'Father',
      phone: '+1-555-0789',
      email: 'robert.wilson@email.com',
      address: '456 Student Lane, New York, NY 10002',
      occupation: 'Software Engineer'
    },

    children: [
      {
        id: 'sarah',
        name: 'Sarah Wilson',
        grade: 'Grade 10A',
        studentId: 'S2024001',
        class: 'Section A',
        gpa: 3.8,
        attendance: 96.5,
        upcomingExams: 3,
        pendingFees: 0,
        lastReportCard: '2024-10-15'
      },
      {
        id: 'mike',
        name: 'Mike Wilson',
        grade: 'Grade 7B',
        studentId: 'S2024156',
        class: 'Section B',
        gpa: 3.5,
        attendance: 94.2,
        upcomingExams: 2,
        pendingFees: 500,
        lastReportCard: '2024-10-15'
      }
    ],

    notifications: [
      {
        type: 'payment',
        title: 'Fee Payment Reminder',
        message: 'Monthly fee payment due for Mike Wilson',
        date: '2024-11-14',
        urgent: true
      },
      {
        type: 'meeting',
        title: 'Parent-Teacher Meeting',
        message: 'Scheduled meeting with Sarah\'s Mathematics teacher',
        date: '2024-11-12',
        urgent: false
      },
      {
        type: 'event',
        title: 'School Event',
        message: 'Annual Sports Day registration is now open',
        date: '2024-11-10',
        urgent: false
      }
    ],

    upcomingEvents: [
      {
        title: 'Parent-Teacher Meeting',
        date: '2024-11-15',
        time: '10:00 AM',
        type: 'meeting',
        child: 'Sarah Wilson'
      },
      {
        title: 'Annual Sports Day',
        date: '2024-11-20',
        time: '9:00 AM',
        type: 'event',
        child: 'Both Children'
      },
      {
        title: 'Mid-term Examinations',
        date: '2024-11-25',
        time: '9:00 AM',
        type: 'exam',
        child: 'Sarah Wilson'
      }
    ]
  },

  // Common data used across roles
  common: {
    announcements: [
      {
        id: 'ann001',
        title: 'Mid-term Exam Schedule Released',
        message: 'Check your exam timetable and preparation guidelines',
        date: '2024-11-14',
        type: 'exam',
        priority: 'high'
      },
      {
        id: 'ann002',
        title: 'Library Extended Hours',
        message: 'Library will be open until 8 PM during exam week',
        date: '2024-11-13',
        type: 'facility',
        priority: 'medium'
      },
      {
        id: 'ann003',
        title: 'Science Fair Registration',
        message: 'Register for the annual science fair by November 30th',
        date: '2024-11-12',
        type: 'event',
        priority: 'low'
      }
    ],

    holidays: [
      {
        name: 'Thanksgiving Break',
        startDate: '2024-11-28',
        endDate: '2024-12-01',
        type: 'holiday'
      },
      {
        name: 'Winter Break',
        startDate: '2024-12-23',
        endDate: '2025-01-06',
        type: 'holiday'
      },
      {
        name: 'Presidents Day',
        startDate: '2025-02-17',
        endDate: '2025-02-17',
        type: 'holiday'
      }
    ],

    examSchedule: [
      {
        subject: 'Mathematics',
        date: '2024-11-25',
        time: '9:00 AM - 11:00 AM',
        room: 'Exam Hall A',
        type: 'Mid-term'
      },
      {
        subject: 'Physics',
        date: '2024-11-26',
        time: '9:00 AM - 11:00 AM',
        room: 'Exam Hall B',
        type: 'Mid-term'
      },
      {
        subject: 'English Literature',
        date: '2024-11-27',
        time: '9:00 AM - 11:00 AM',
        room: 'Exam Hall A',
        type: 'Mid-term'
      }
    ]
  }
};

export default demoData;