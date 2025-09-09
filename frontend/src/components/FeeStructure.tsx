import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  CreditCard, 
  Download, 
  Calculator, 
  Award, 
  Calendar,
  IndianRupee,
  FileText,
  Users,
  GraduationCap
} from 'lucide-react';
import { feeStructure, academicCalendar } from '../data/mockData';

export const FeeStructure: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'general' | 'reserved'>('general');

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const currentFees = feeStructure.btech.categories[selectedCategory];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900" id="fees">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Fee Structure & Payment Information
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Transparent and affordable fee structure for all B.Tech programs with scholarship opportunities
          </p>
        </div>

        {/* Category Selection */}
        <div className="flex justify-center mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-2 shadow-sm">
            <div className="flex space-x-2">
              <Button
                variant={selectedCategory === 'general' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('general')}
                className="flex items-center space-x-2"
              >
                <Users className="h-4 w-4" />
                <span>General Category</span>
              </Button>
              <Button
                variant={selectedCategory === 'reserved' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('reserved')}
                className="flex items-center space-x-2"
              >
                <GraduationCap className="h-4 w-4" />
                <span>Reserved Category</span>
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="annual-fees" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="annual-fees">Annual Fees</TabsTrigger>
            <TabsTrigger value="payment-schedule">Payment Schedule</TabsTrigger>
            <TabsTrigger value="scholarships">Scholarships</TabsTrigger>
            <TabsTrigger value="calculator">Fee Calculator</TabsTrigger>
          </TabsList>

          {/* Annual Fees Tab */}
          <TabsContent value="annual-fees" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Academic Fees */}
              <Card className="bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
                    <FileText className="h-5 w-5" />
                    <span>Academic Fees ({currentFees.name})</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(currentFees.annualFees).map(([key, value]) => {
                      if (key === 'total') return null;
                      const feeNames: { [key: string]: string } = {
                        tuitionFee: 'Tuition Fee',
                        developmentFee: 'Development Fee',
                        libraryFee: 'Library Fee',
                        labFee: 'Laboratory Fee',
                        examFee: 'Examination Fee',
                        miscFee: 'Miscellaneous Fee'
                      };
                      return (
                        <div key={key} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                          <span className="text-gray-700 dark:text-gray-300">{feeNames[key]}</span>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {formatAmount(value as number)}
                          </span>
                        </div>
                      );
                    })}
                    <div className="flex justify-between items-center py-3 bg-blue-50 dark:bg-blue-900/20 px-3 rounded-lg mt-4">
                      <span className="font-semibold text-blue-700 dark:text-blue-300">Total Annual Fees</span>
                      <span className="font-bold text-xl text-blue-700 dark:text-blue-300">
                        {formatAmount(currentFees.annualFees.total)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Hostel Fees */}
              <Card className="bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                    <CreditCard className="h-5 w-5" />
                    <span>Hostel & Accommodation</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-gray-700 dark:text-gray-300">Hostel Fee</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {formatAmount(currentFees.hostelFees.hostelFee)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-gray-700 dark:text-gray-300">Mess Fee</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {formatAmount(currentFees.hostelFees.messFee)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-3 bg-green-50 dark:bg-green-900/20 px-3 rounded-lg mt-4">
                      <span className="font-semibold text-green-700 dark:text-green-300">Total Hostel Fees</span>
                      <span className="font-bold text-xl text-green-700 dark:text-green-300">
                        {formatAmount(currentFees.hostelFees.total)}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">
                      <strong>Note:</strong> Hostel accommodation is optional. Girls hostel available on campus, 
                      boys accommodation in nearby PG facilities.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Other Fees */}
              <Card className="bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-purple-600 dark:text-purple-400">
                    <IndianRupee className="h-5 w-5" />
                    <span>One-time & Other Fees</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-gray-700 dark:text-gray-300">Caution Money</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {formatAmount(currentFees.otherFees.cautionMoney)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-gray-700 dark:text-gray-300">Admission Fee</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {formatAmount(currentFees.otherFees.admissionFee)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-gray-700 dark:text-gray-300">University Fee</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {formatAmount(currentFees.otherFees.universityFee)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-3 bg-purple-50 dark:bg-purple-900/20 px-3 rounded-lg mt-4">
                      <span className="font-semibold text-purple-700 dark:text-purple-300">Total Other Fees</span>
                      <span className="font-bold text-xl text-purple-700 dark:text-purple-300">
                        {formatAmount(currentFees.otherFees.total)}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong>Note:</strong> Caution money is refundable at the time of course completion.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Total Cost Summary */}
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardContent className="p-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4">Total Course Cost Summary</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <div className="text-3xl font-bold mb-2">
                        {formatAmount(currentFees.annualFees.total * 4 + currentFees.otherFees.total)}
                      </div>
                      <div className="text-blue-100">Total Academic Cost (4 years)</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold mb-2">
                        {formatAmount(currentFees.hostelFees.total * 4)}
                      </div>
                      <div className="text-blue-100">Total Hostel Cost (4 years)</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold mb-2">
                        {formatAmount((currentFees.annualFees.total + currentFees.hostelFees.total) * 4 + currentFees.otherFees.total)}
                      </div>
                      <div className="text-blue-100">Grand Total (4 years)</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Schedule Tab */}
          <TabsContent value="payment-schedule" className="space-y-6">
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <span>Semester-wise Payment Schedule</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {feeStructure.btech.paymentSchedule.map((payment, index) => (
                    <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-gray-900 dark:text-white">
                          Semester {payment.semester}
                        </span>
                        <Badge variant="outline">
                          Due: {payment.dueDate}
                        </Badge>
                      </div>
                      <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                        {payment.amount}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <h4 className="font-semibold text-yellow-700 dark:text-yellow-300 mb-2">Payment Methods Accepted:</h4>
                  <ul className="text-sm text-yellow-600 dark:text-yellow-400 space-y-1">
                    <li>• Online Payment (Net Banking, UPI, Credit/Debit Cards)</li>
                    <li>• Demand Draft in favor of "University College of Engineering & Technology"</li>
                    <li>• Cash Payment at University Counter (up to ₹2,00,000)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Scholarships Tab */}
          <TabsContent value="scholarships" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {feeStructure.btech.scholarships.map((scholarship, index) => (
                <Card key={index} className="bg-white dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                      <Award className="h-5 w-5" />
                      <span>{scholarship.name}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Eligibility:</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{scholarship.eligibility}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Benefit:</h4>
                        <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                          {scholarship.amount}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
              <CardContent className="p-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-4">Additional Scholarship Opportunities</h3>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <strong>Government Scholarships</strong>
                      <p className="text-green-100 mt-1">National Scholarship Portal scholarships available</p>
                    </div>
                    <div>
                      <strong>Sports Quota</strong>
                      <p className="text-green-100 mt-1">Fee concessions for state/national level athletes</p>
                    </div>
                    <div>
                      <strong>Alumni Scholarships</strong>
                      <p className="text-green-100 mt-1">Scholarships sponsored by successful alumni</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Fee Calculator Tab */}
          <TabsContent value="calculator" className="space-y-6">
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calculator className="h-5 w-5 text-blue-600" />
                  <span>Fee Calculator</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-4">
                      Calculate Your Total Education Cost
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Category</label>
                        <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700">
                          <option value="general">General Category</option>
                          <option value="reserved">Reserved Category</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Hostel Required</label>
                        <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700">
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>
                    </div>
                    <Button className="mt-4" onClick={() => alert('Fee calculation feature will be implemented with interactive form')}>
                      Calculate Total Fees
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="space-y-4">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 mr-4"
              onClick={() => window.open('#', '_blank')}
            >
              <Download className="h-5 w-5 mr-2" />
              Download Fee Structure PDF
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Contact Admission Office
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};