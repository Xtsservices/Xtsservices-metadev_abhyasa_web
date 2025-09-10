import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { 
  School, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Calendar, 
  Users, 
  GraduationCap, 
  Trophy, 
  Star, 
  Clock,
  Building,
  BookOpen,
  Award,
  Target,
  Heart,
  Wifi,
  Car,
  Utensils,
  Activity,
  Microscope,
  Computer,
  Palette,
  Music,
  FileText,
  Download,
  ExternalLink,
  Facebook,
  Twitter,
  Instagram,
  Youtube
} from 'lucide-react';

interface StudentInstitutionProfileProps {
  onNavigate: (screen: string) => void;
}

export function StudentInstitutionProfile({ onNavigate }: StudentInstitutionProfileProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const institutionData = {
    name: 'Modern Public School',
    logo: '/school-logo.png',
    tagline: 'Excellence in Education, Character in Life',
    type: 'Public School',
    established: 1995,
    affiliation: 'Central Board of Secondary Education (CBSE)',
    accreditation: 'NAAC A+ Grade',
    address: {
      street: '123 Education Street',
      city: 'New Delhi',
      state: 'Delhi',
      zipCode: '110001',
      country: 'India'
    },
    contact: {
      phone: '+91-11-2345-6789',
      email: 'info@modernpublicschool.edu.in',
      website: 'www.modernpublicschool.edu.in',
      fax: '+91-11-2345-6790'
    },
    socialMedia: {
      facebook: 'facebook.com/modernpublicschool',
      twitter: 'twitter.com/mpschool',
      instagram: 'instagram.com/modernpublicschool',
      youtube: 'youtube.com/modernpublicschool'
    },
    statistics: {
      totalStudents: 2500,
      totalTeachers: 150,
      totalClasses: 75,
      studentTeacherRatio: '16:1',
      passPercentage: 98.5,
      avgGrade: 'A',
      campusArea: '25 acres',
      establishedYears: new Date().getFullYear() - 1995
    },
    academics: {
      curriculum: ['CBSE', 'NCERT'],
      grades: ['Pre-K', 'Kindergarten', 'Grade 1-12'],
      subjects: [
        'Mathematics', 'Science', 'English', 'Hindi', 'Social Studies',
        'Computer Science', 'Physical Education', 'Arts', 'Music'
      ],
      languages: ['English', 'Hindi', 'Sanskrit', 'French'],
      specialPrograms: [
        'Advanced Placement (AP)',
        'International Baccalaureate (IB)',
        'Skill Development Program',
        'Career Counseling',
        'Remedial Classes'
      ]
    },
    facilities: [
      { name: 'Smart Classrooms', icon: Computer, description: '75 digitally equipped classrooms with interactive boards' },
      { name: 'Science Laboratories', icon: Microscope, description: 'Physics, Chemistry, Biology, and Computer labs' },
      { name: 'Library', icon: BookOpen, description: '50,000+ books, digital resources, and study spaces' },
      { name: 'Sports Complex', icon: Activity, description: 'Indoor/outdoor sports facilities, swimming pool, gymnasium' },
      { name: 'Arts & Music', icon: Music, description: 'Dedicated spaces for visual arts, music, and performing arts' },
      { name: 'Cafeteria', icon: Utensils, description: 'Hygienic food preparation with nutritious meal options' },
      { name: 'Medical Room', icon: Heart, description: '24/7 medical facility with qualified nursing staff' },
      { name: 'Transportation', icon: Car, description: 'Safe school bus service covering entire city' },
      { name: 'WiFi Campus', icon: Wifi, description: 'High-speed internet connectivity throughout campus' },
      { name: 'Hostel', icon: Building, description: 'Separate hostels for boys and girls with modern amenities' }
    ],
    achievements: [
      { title: 'Best School Award 2023', description: 'Recognized as the Best CBSE School in Delhi', year: 2023 },
      { title: 'Academic Excellence', description: '100% pass rate in Board Examinations', year: 2023 },
      { title: 'Sports Championship', description: 'Inter-School Sports Meet Champions', year: 2023 },
      { title: 'Science Olympiad', description: 'National Science Olympiad Winners', year: 2022 },
      { title: 'Environmental Award', description: 'Green School Certification', year: 2022 },
      { title: 'Digital Learning', description: 'Best Digital Learning Initiative', year: 2021 }
    ],
    faculty: {
      principal: {
        name: 'Dr. Priya Sharma',
        qualification: 'Ph.D. in Education',
        experience: '25 years',
        specialization: 'Educational Leadership and Management'
      },
      viceprincipals: [
        {
          name: 'Mr. Rajesh Kumar',
          qualification: 'M.Ed., M.A. English',
          experience: '20 years',
          department: 'Academic Affairs'
        },
        {
          name: 'Ms. Sunita Patel',
          qualification: 'M.Sc., B.Ed.',
          experience: '18 years',
          department: 'Student Affairs'
        }
      ],
      departments: [
        { name: 'Mathematics', headOfDepartment: 'Dr. Amit Verma', teachers: 15 },
        { name: 'Science', headOfDepartment: 'Dr. Kavita Singh', teachers: 18 },
        { name: 'English', headOfDepartment: 'Mrs. Neha Gupta', teachers: 12 },
        { name: 'Social Studies', headOfDepartment: 'Mr. Vikram Joshi', teachers: 10 },
        { name: 'Languages', headOfDepartment: 'Ms. Ritu Agarwal', teachers: 8 },
        { name: 'Arts & Crafts', headOfDepartment: 'Mr. Suresh Yadav', teachers: 5 },
        { name: 'Physical Education', headOfDepartment: 'Coach Ramesh Sharma', teachers: 6 }
      ]
    },
    events: [
      { name: 'Annual Day', date: 'March 15, 2024', description: 'Grand celebration showcasing student talents' },
      { name: 'Science Fair', date: 'October 20, 2024', description: 'Inter-class science project exhibition' },
      { name: 'Sports Day', date: 'November 10, 2024', description: 'Athletic competitions and team sports' },
      { name: 'Cultural Fest', date: 'December 5, 2024', description: 'Music, dance, and cultural performances' },
      { name: 'Parent-Teacher Meet', date: 'Monthly', description: 'Regular academic progress discussions' }
    ],
    policies: [
      { title: 'Academic Policy', description: 'Guidelines for curriculum delivery and assessment' },
      { title: 'Attendance Policy', description: 'Minimum 75% attendance required for all students' },
      { title: 'Discipline Policy', description: 'Code of conduct and behavioral expectations' },
      { title: 'Anti-Bullying Policy', description: 'Zero tolerance policy for bullying and harassment' },
      { title: 'Fee Policy', description: 'Fee structure and payment guidelines' },
      { title: 'Uniform Policy', description: 'Dress code and uniform requirements' }
    ]
  };

  const getFacilityIcon = (IconComponent: any) => {
    return <IconComponent className="h-6 w-6 text-primary" />;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Institution Profile</h1>
          <p className="text-muted-foreground">Learn more about your school</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => onNavigate('dashboard')}>
            <School className="h-4 w-4 mr-2" />
            Dashboard
          </Button>
          <Button onClick={() => window.open(institutionData.contact.website, '_blank')}>
            <ExternalLink className="h-4 w-4 mr-2" />
            Visit Website
          </Button>
        </div>
      </div>

      {/* Institution Header Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 bg-primary/10 rounded-lg flex items-center justify-center">
              <School className="h-12 w-12 text-primary" />
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-2xl font-bold">{institutionData.name}</h2>
                <p className="text-lg text-muted-foreground italic">{institutionData.tagline}</p>
                <div className="flex items-center gap-4 mt-2">
                  <Badge className="bg-blue-100 text-blue-800">{institutionData.type}</Badge>
                  <Badge className="bg-green-100 text-green-800">{institutionData.accreditation}</Badge>
                  <Badge className="bg-purple-100 text-purple-800">Est. {institutionData.established}</Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{institutionData.statistics.totalStudents} Students</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{institutionData.statistics.totalTeachers} Teachers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{institutionData.statistics.campusArea} Campus</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{institutionData.statistics.passPercentage}% Pass Rate</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="academics">Academics</TabsTrigger>
          <TabsTrigger value="facilities">Facilities</TabsTrigger>
          <TabsTrigger value="faculty">Faculty</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* About Section */}
            <Card>
              <CardHeader>
                <CardTitle>About Our School</CardTitle>
                <CardDescription>Learn about our mission, vision, and values</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Mission</h4>
                  <p className="text-sm text-muted-foreground">
                    To provide quality education that develops intellectual curiosity, critical thinking, 
                    and moral values in students, preparing them to be responsible global citizens.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Vision</h4>
                  <p className="text-sm text-muted-foreground">
                    To be a premier educational institution that nurtures young minds and shapes 
                    future leaders through innovative teaching and holistic development.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Core Values</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Excellence', 'Integrity', 'Innovation', 'Inclusivity', 'Compassion'].map((value) => (
                      <Badge key={value} variant="outline">{value}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Key Statistics</CardTitle>
                <CardDescription>Important numbers about our institution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{institutionData.statistics.establishedYears}</div>
                    <div className="text-sm text-muted-foreground">Years of Excellence</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{institutionData.statistics.studentTeacherRatio}</div>
                    <div className="text-sm text-muted-foreground">Student-Teacher Ratio</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{institutionData.statistics.avgGrade}</div>
                    <div className="text-sm text-muted-foreground">Average Grade</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{institutionData.statistics.totalClasses}</div>
                    <div className="text-sm text-muted-foreground">Total Classes</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Important dates and events in our academic calendar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {institutionData.events.map((event, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{event.name}</h4>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{event.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="academics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Curriculum */}
            <Card>
              <CardHeader>
                <CardTitle>Curriculum & Programs</CardTitle>
                <CardDescription>Our academic framework and special programs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Curriculum</h4>
                  <div className="flex gap-2">
                    {institutionData.academics.curriculum.map((curr) => (
                      <Badge key={curr} className="bg-blue-100 text-blue-800">{curr}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Grade Levels</h4>
                  <div className="flex flex-wrap gap-2">
                    {institutionData.academics.grades.map((grade) => (
                      <Badge key={grade} variant="outline">{grade}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Languages Offered</h4>
                  <div className="flex flex-wrap gap-2">
                    {institutionData.academics.languages.map((lang) => (
                      <Badge key={lang} className="bg-green-100 text-green-800">{lang}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Subjects */}
            <Card>
              <CardHeader>
                <CardTitle>Subjects Offered</CardTitle>
                <CardDescription>Core and elective subjects available</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {institutionData.academics.subjects.map((subject) => (
                    <div key={subject} className="flex items-center gap-2 p-2">
                      <BookOpen className="h-4 w-4 text-primary" />
                      <span className="text-sm">{subject}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Special Programs */}
          <Card>
            <CardHeader>
              <CardTitle>Special Programs</CardTitle>
              <CardDescription>Additional programs for enhanced learning</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {institutionData.academics.specialPrograms.map((program, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="h-5 w-5 text-primary" />
                      <h4 className="font-semibold">{program}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Specialized program designed to enhance student capabilities and skills.
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Policies */}
          <Card>
            <CardHeader>
              <CardTitle>Academic Policies</CardTitle>
              <CardDescription>Important policies and guidelines</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {institutionData.policies.map((policy, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <h4 className="font-semibold">{policy.title}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{policy.description}</p>
                    <Button size="sm" variant="outline" className="mt-2">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="facilities" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {institutionData.facilities.map((facility, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      {getFacilityIcon(facility.icon)}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{facility.name}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{facility.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="faculty" className="space-y-6">
          {/* Principal */}
          <Card>
            <CardHeader>
              <CardTitle>Leadership</CardTitle>
              <CardDescription>Our administrative leadership team</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{institutionData.faculty.principal.name}</h4>
                    <p className="text-sm text-muted-foreground">Principal</p>
                    <p className="text-sm">{institutionData.faculty.principal.qualification}</p>
                    <p className="text-sm text-muted-foreground">{institutionData.faculty.principal.experience}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {institutionData.faculty.viceprincipals.map((vp, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{vp.name}</h4>
                        <p className="text-sm text-muted-foreground">Vice Principal - {vp.department}</p>
                        <p className="text-sm">{vp.qualification}</p>
                        <p className="text-sm text-muted-foreground">{vp.experience}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Departments */}
          <Card>
            <CardHeader>
              <CardTitle>Academic Departments</CardTitle>
              <CardDescription>Our faculty departments and their heads</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {institutionData.faculty.departments.map((dept, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{dept.name}</h4>
                      <Badge variant="outline">{dept.teachers} Teachers</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Head: {dept.headOfDepartment}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {institutionData.achievements.map((achievement, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Trophy className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{achievement.title}</CardTitle>
                      <Badge className="bg-yellow-100 text-yellow-800">{achievement.year}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{achievement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Get in touch with us</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-sm text-muted-foreground">
                      {institutionData.address.street}, {institutionData.address.city}, 
                      {institutionData.address.state} {institutionData.address.zipCode}, 
                      {institutionData.address.country}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">{institutionData.contact.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{institutionData.contact.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Website</p>
                    <p className="text-sm text-muted-foreground">{institutionData.contact.website}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media & Office Hours */}
            <Card>
              <CardHeader>
                <CardTitle>Connect With Us</CardTitle>
                <CardDescription>Follow us on social media and visit us</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium mb-3">Social Media</p>
                  <div className="flex gap-3">
                    <Button size="sm" variant="outline">
                      <Facebook className="h-4 w-4 mr-2" />
                      Facebook
                    </Button>
                    <Button size="sm" variant="outline">
                      <Twitter className="h-4 w-4 mr-2" />
                      Twitter
                    </Button>
                    <Button size="sm" variant="outline">
                      <Instagram className="h-4 w-4 mr-2" />
                      Instagram
                    </Button>
                    <Button size="sm" variant="outline">
                      <Youtube className="h-4 w-4 mr-2" />
                      YouTube
                    </Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <p className="font-medium mb-3">Office Hours</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span>8:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span>8:00 AM - 1:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span>Closed</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <Button className="w-full">
                    <MapPin className="h-4 w-4 mr-2" />
                    Get Directions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}