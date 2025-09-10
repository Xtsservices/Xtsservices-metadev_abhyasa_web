import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { motion } from 'motion/react';
import { 
  Search, 
  BookOpen, 
  Users, 
  Calendar,
  FileText,
  Award,
  Clock,
  TrendingUp,
  Filter,
  X,
  History
} from 'lucide-react';

interface SearchScreenProps {
  userRole: 'student' | 'parent';
  onNavigate: (screen: string) => void;
}

export function SearchScreen({ userRole, onNavigate }: SearchScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const studentCategories = [
    { id: 'all', label: 'All', icon: Search },
    { id: 'assignments', label: 'Assignments', icon: BookOpen },
    { id: 'teachers', label: 'Teachers', icon: Users },
    { id: 'subjects', label: 'Subjects', icon: FileText },
    { id: 'resources', label: 'Resources', icon: Award }
  ];

  const parentCategories = [
    { id: 'all', label: 'All', icon: Search },
    { id: 'children', label: 'Children', icon: Users },
    { id: 'teachers', label: 'Teachers', icon: Users },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'reports', label: 'Reports', icon: TrendingUp }
  ];

  const studentSuggestions = [
    { title: 'Mathematics Quiz Chapter 5', category: 'assignments', urgent: true },
    { title: 'Mr. Smith - Mathematics Teacher', category: 'teachers', urgent: false },
    { title: 'Physics Lab Equipment', category: 'resources', urgent: false },
    { title: 'History Essay Guidelines', category: 'assignments', urgent: false },
    { title: 'Chemistry Periodic Table', category: 'resources', urgent: false }
  ];

  const parentSuggestions = [
    { title: 'Emma Johnson - Grade 10-A', category: 'children', urgent: false },
    { title: 'Parent-Teacher Meeting Dec 25', category: 'events', urgent: true },
    { title: 'Mrs. Davis - History Teacher', category: 'teachers', urgent: false },
    { title: 'Noah Academic Report Q2', category: 'reports', urgent: false },
    { title: 'Science Fair Registration', category: 'events', urgent: true }
  ];

  const recentSearches = userRole === 'student' 
    ? ['Mathematics quiz', 'Mr. Smith contact', 'Library hours']
    : ['Emma grades', 'Teacher meeting', 'School calendar'];

  const categories = userRole === 'student' ? studentCategories : parentCategories;
  const suggestions = userRole === 'student' ? studentSuggestions : parentSuggestions;

  const filteredSuggestions = selectedCategory === 'all' 
    ? suggestions 
    : suggestions.filter(item => item.category === selectedCategory);

  return (
    <div className="p-4 space-y-6 pb-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-semibold mb-2">Search</h1>
        <p className="text-muted-foreground">
          Find {userRole === 'student' ? 'assignments, teachers, and resources' : 'information about your children\'s education'}
        </p>
      </motion.div>

      {/* Search Bar */}
      <motion.div 
        className="relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder={`Search ${userRole === 'student' ? 'assignments, teachers...' : 'children, teachers, events...'}`}
          className="pl-12 pr-12 h-12 rounded-xl bg-muted/30 border-0 text-base"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <motion.button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-muted"
            onClick={() => setSearchQuery('')}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </motion.button>
        )}
      </motion.div>

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  className={`flex items-center gap-2 rounded-full whitespace-nowrap ${
                    selectedCategory === category.id 
                      ? 'bg-primary text-primary-foreground shadow-md' 
                      : 'bg-background hover:bg-muted/50'
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <Icon className="h-4 w-4" />
                  {category.label}
                </Button>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Recent Searches */}
      {!searchQuery && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <History className="h-5 w-5 text-muted-foreground" />
                Recent Searches
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {recentSearches.map((search, index) => (
                <motion.button
                  key={index}
                  className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-muted/50 transition-colors text-left"
                  onClick={() => setSearchQuery(search)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{search}</span>
                </motion.button>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Search Results / Suggestions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">
            {searchQuery ? 'Search Results' : 'Quick Access'}
          </h2>
          {selectedCategory !== 'all' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedCategory('all')}
              className="text-muted-foreground"
            >
              Clear filter
            </Button>
          )}
        </div>

        <div className="space-y-3">
          {filteredSuggestions.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <Card className="card-elevated cursor-pointer hover:shadow-lg transition-all">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground mb-1">{item.title}</h3>
                      <Badge variant="secondary" className="text-xs capitalize">
                        {item.category}
                      </Badge>
                    </div>
                    {item.urgent && (
                      <Badge variant="destructive" className="text-xs">
                        Urgent
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* No Results */}
      {searchQuery && filteredSuggestions.length === 0 && (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No results found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search terms or browse by category
          </p>
          <Button variant="outline" onClick={() => setSearchQuery('')}>
            Clear search
          </Button>
        </motion.div>
      )}
    </div>
  );
}