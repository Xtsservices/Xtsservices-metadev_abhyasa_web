import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { 
  School,
  CheckCircle,
  Clock,
  FileText,
  Shield,
  Award,
  Users,
  Building2,
  ArrowRight,
  Star,
  Globe,
  Phone,
  Mail
} from 'lucide-react';

interface OnboardingLandingProps {
  onStartOnboarding: () => void;
  onNavigate: (screen: string) => void;
}

export function OnboardingLanding({ onStartOnboarding, onNavigate }: OnboardingLandingProps) {
  const benefits = [
    {
      icon: Shield,
      title: "Secure & Verified",
      description: "Government-backed verification process ensures credibility and trust"
    },
    {
      icon: Users,
      title: "Complete Management",
      description: "Manage students, teachers, fees, and academics in one platform"
    },
    {
      icon: Award,
      title: "Compliance Ready",
      description: "Meet all regulatory requirements with automated compliance tracking"
    },
    {
      icon: Globe,
      title: "Multi-Board Support",
      description: "CBSE, ICSE, State Board, and university affiliations supported"
    }
  ];

  const steps = [
    {
      step: 1,
      title: "Basic Registration",
      description: "Provide institute name, contact details, and verify with OTP",
      duration: "5 minutes"
    },
    {
      step: 2,
      title: "Document Upload",
      description: "Upload required legal and accreditation documents",
      duration: "15 minutes"
    },
    {
      step: 3,
      title: "Institutional Details",
      description: "Complete profile with courses, capacity, and signatory information",
      duration: "10 minutes"
    },
    {
      step: 4,
      title: "Review & Submit",
      description: "Review all information and submit for verification",
      duration: "5 minutes"
    }
  ];

  const documentTypes = [
    "Registration Certificate",
    "PAN Card",
    "Affiliation Letter", 
    "Board Recognition Certificate",
    "Trust/Society Registration",
    "Fire Safety Certificate (optional)",
    "Building Safety Certificate (optional)"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center">
              <School className="h-7 w-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Abhyasa</h1>
              <p className="text-lg text-muted-foreground">Educational Institution Management System</p>
            </div>
          </div>
          
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Join the Future of Education Management
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Streamline your educational institution with our comprehensive management platform. 
            From student enrollment to academic tracking, manage everything seamlessly.
          </p>
          
          <div className="flex items-center justify-center gap-4 mb-8">
            <Button size="lg" onClick={onStartOnboarding} className="text-lg px-8 py-4">
              Start Your Registration
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <Button variant="outline" size="lg" onClick={() => onNavigate('login')} className="text-lg px-8 py-4">
              Already Registered? Login
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Free Registration</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-500" />
              <span>~35 minutes setup</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-purple-500" />
              <span>Government Verified</span>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card key={index} className="text-center border-2 hover:border-primary/20 transition-colors">
                <CardContent className="p-6">
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Registration Process */}
        <Card className="mb-16">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Simple 4-Step Registration Process</CardTitle>
            <CardDescription>Complete your onboarding in just 35 minutes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="relative mb-4">
                    <div className="h-16 w-16 bg-primary rounded-full flex items-center justify-center mx-auto">
                      <span className="text-xl font-bold text-primary-foreground">{step.step}</span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-8 left-full w-full border-t-2 border-dashed border-muted -translate-x-8"></div>
                    )}
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                  <Badge variant="outline" className="text-xs">{step.duration}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Document Requirements */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Required Documents
              </CardTitle>
              <CardDescription>Prepare these documents for quick registration</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {documentTypes.map((doc, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{doc}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Institution Types Supported
              </CardTitle>
              <CardDescription>We support various educational institutions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {[
                  'CBSE Schools',
                  'ICSE Schools', 
                  'State Board Schools',
                  'Kendriya Vidyalayas',
                  'Engineering Colleges',
                  'Medical Colleges',
                  'Arts & Science Colleges',
                  'Management Institutes',
                  'Technical Institutes',
                  'Universities'
                ].map((type, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Star className="h-3 w-3 text-yellow-500" />
                    <span className="text-sm">{type}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Institution?</h2>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of educational institutions already using Abhyasa to streamline their operations 
              and enhance educational outcomes.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Button size="lg" variant="secondary" onClick={onStartOnboarding} className="text-lg px-8 py-4">
                Begin Registration Now
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <div className="text-center">
                <p className="text-sm text-blue-100">Questions? We're here to help</p>
                <div className="flex items-center justify-center gap-4 mt-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4" />
                    <span>+91 98765 43210</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4" />
                    <span>support@edumanage.com</span>
                  </div>
                </div>
              </div>
            </div>
            
            <Separator className="bg-blue-400 mb-6" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <h4 className="text-2xl font-bold">500+</h4>
                <p className="text-blue-100">Institutions Registered</p>
              </div>
              <div>
                <h4 className="text-2xl font-bold">50,000+</h4>
                <p className="text-blue-100">Students Managed</p>
              </div>
              <div>
                <h4 className="text-2xl font-bold">98%</h4>
                <p className="text-blue-100">Satisfaction Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}