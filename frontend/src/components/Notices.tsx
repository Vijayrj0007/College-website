import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Bell, Calendar, FileText, ExternalLink, ChevronRight } from 'lucide-react';
import { mockNotices } from '../data/mockData';
import { Notice } from '../types';

export const Notices: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'notices' | 'tenders'>('notices');
  const [showAll, setShowAll] = useState(false);

  const notices = mockNotices.filter(notice => notice.category !== 'tender');
  const tenders = mockNotices.filter(notice => notice.category === 'tender');

  const displayNotices = activeTab === 'notices' ? notices : tenders;
  const visibleNotices = showAll ? displayNotices : displayNotices.slice(0, 5);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: Notice['category']) => {
    const colors = {
      general: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      admission: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      exam: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      tender: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
    };
    return colors[category];
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-800" id="notices">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Latest Updates
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Stay informed with our latest notices, announcements, and tender notifications
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-1 inline-flex">
            <Button
              variant={activeTab === 'notices' ? 'default' : 'ghost'}
              className={`rounded-md ${
                activeTab === 'notices' 
                  ? 'bg-white dark:bg-gray-600 shadow-sm' 
                  : 'text-gray-600 dark:text-gray-400'
              }`}
              onClick={() => {
                setActiveTab('notices');
                setShowAll(false);
              }}
            >
              <Bell className="h-4 w-4 mr-2" />
              Notices & Announcements
            </Button>
            <Button
              variant={activeTab === 'tenders' ? 'default' : 'ghost'}
              className={`rounded-md ${
                activeTab === 'tenders' 
                  ? 'bg-white dark:bg-gray-600 shadow-sm' 
                  : 'text-gray-600 dark:text-gray-400'
              }`}
              onClick={() => {
                setActiveTab('tenders');
                setShowAll(false);
              }}
            >
              <FileText className="h-4 w-4 mr-2" />
              Tenders
            </Button>
          </div>
        </div>

        {/* Notice List */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {visibleNotices.map((notice) => (
              <Card 
                key={notice.id} 
                className="hover:shadow-md transition-shadow cursor-pointer group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700"
                onClick={() => alert(`Opening notice: ${notice.title}`)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 mr-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <Badge className={getCategoryColor(notice.category)}>
                          {notice.category.charAt(0).toUpperCase() + notice.category.slice(1)}
                        </Badge>
                        {notice.isNew && (
                          <Badge variant="destructive">
                            New
                          </Badge>
                        )}
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(notice.date)}
                        </div>
                      </div>
                      
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
                        {notice.title}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                        {notice.content}
                      </p>
                    </div>
                    
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {displayNotices.length === 0 && (
            <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
              <CardContent className="p-8 text-center">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                  No {activeTab} available
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  There are currently no {activeTab} to display. Please check back later.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Show More/Less Button */}
          {displayNotices.length > 5 && (
            <div className="text-center mt-8">
              <Button
                variant="outline"
                onClick={() => setShowAll(!showAll)}
                className="border-blue-300 text-blue-700 hover:bg-blue-50 dark:border-blue-600 dark:text-blue-400 dark:hover:bg-blue-900/20"
              >
                {showAll ? 'Show Less' : `View All ${displayNotices.length} ${activeTab}`}
                <ChevronRight className={`h-4 w-4 ml-2 transition-transform ${showAll ? 'rotate-90' : ''}`} />
              </Button>
            </div>
          )}
        </div>

        {/* External Links */}
        <div className="text-center mt-12">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            For archived notices and detailed information:
          </p>
          <div className="flex justify-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => alert('Opening notice archive... (External link)')}
              className="flex items-center space-x-2"
            >
              <span>Notice Archive</span>
              <ExternalLink className="h-3 w-3" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => alert('Opening tender portal... (External link)')}
              className="flex items-center space-x-2"
            >
              <span>Tender Portal</span>
              <ExternalLink className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};