import React, { useState } from 'react';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';

interface MenuSection {
  title: string;
  items: Array<{
    name: string;
    href: string;
    external?: boolean;
  }>;
}

const menuData: Record<string, MenuSection[]> = {
  academics: [
    {
      title: 'Programs',
      items: [
        { name: 'Departments', href: '#departments' },
        { name: 'Engineering Courses', href: '#departments' },
        { name: 'Technology Programs', href: '#departments' },
        { name: 'Research Programs', href: '#departments' }
      ]
    },
    {
      title: 'Resources',
      items: [
        { name: 'Student Dashboard', href: '#student-dashboard' },
        { name: 'Academic Calendar', href: '#academics' },
        { name: 'Syllabi & Curriculum', href: '#academics' },
        { name: 'Fee Structure', href: '#fees' }
      ]
    }
  ],
  admissions: [
    {
      title: 'Apply Now',
      items: [
        { name: 'Online Application', href: '#home', external: true },
        { name: 'Admission Guidelines', href: '#home' },
        { name: 'Eligibility Criteria', href: '#departments' },
        { name: 'Important Dates', href: '#notices' }
      ]
    },
    {
      title: 'Information',
      items: [
        { name: 'Entrance Exams', href: '#notices' },
        { name: 'Counselling Process', href: '#contact' },
        { name: 'Document Requirements', href: '#home' },
        { name: 'Contact Admission Cell', href: '#contact' }
      ]
    }
  ],
  portals: [
    {
      title: 'Student Portals',
      items: [
        { name: 'Student Dashboard', href: '#student-dashboard' },
        { name: 'Teacher Dashboard', href: '#teacher-dashboard' },
        { name: 'ERP System', href: '#home', external: true },
        { name: 'Results Portal', href: '#home', external: true }
      ]
    },
    {
      title: 'External Links',
      items: [
        { name: 'VBU Main Website', href: 'https://vbu.ac.in', external: true },
        { name: 'NAAC Portal', href: 'https://naac.gov.in', external: true },
        { name: 'AICTE Portal', href: 'https://aicte-india.org', external: true }
      ]
    }
  ]
};

export const MegaMenu: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (menu: string) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    const id = setTimeout(() => {
      setActiveMenu(null);
    }, 200);
    setTimeoutId(id);
  };

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Academics', key: 'academics' },
    { name: 'Admissions', key: 'admissions' },
    { name: 'Departments', href: '#departments' },
    { name: 'Alumni Network', href: '#alumni' },
    { name: 'Notices', href: '#notices' },
    { name: 'Portals', key: 'portals' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <div className="relative" style={{ overflow: 'visible' }}>
      <ul className="flex items-center space-x-6" style={{ overflow: 'visible' }}>
        {navItems.map((item) => (
          <li
            key={item.name}
            className="relative"
            style={{ overflow: 'visible' }}
            onMouseEnter={() => item.key && handleMouseEnter(item.key)}
            onMouseLeave={() => item.key && handleMouseLeave()}
          >
            {item.key ? (
              <Button
                variant="ghost"
                className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-blue-600"
                aria-haspopup="true"
                aria-expanded={activeMenu === item.key}
              >
                <span>{item.name}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            ) : (
              <a
                href={item.href}
                className="block py-2 px-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors"
              >
                {item.name}
              </a>
            )}

            {/* Mega Menu Dropdown */}
            {item.key && activeMenu === item.key && (
              <div 
                className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-auto min-w-96 max-w-4xl bg-white dark:bg-gray-800 shadow-xl rounded-lg border border-gray-200 dark:border-gray-700 z-50"
                style={{
                  height: 'auto',
                  maxHeight: 'none',
                  overflowY: 'visible',
                  overflowX: 'visible'
                }}
              >
                <div 
                  className="p-6 w-full"
                  style={{
                    height: 'auto',
                    maxHeight: 'none',
                    overflow: 'visible'
                  }}
                >
                  <div className="grid grid-cols-2 gap-8 w-full">
                    {menuData[item.key]?.map((section) => (
                      <div key={section.title} className="flex flex-col space-y-3">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {section.title}
                        </h3>
                        <ul className="flex flex-col space-y-2">
                          {section.items.map((link) => (
                            <li key={link.name}>
                              <a
                                href={link.href}
                                className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors whitespace-nowrap"
                                target={link.external ? '_blank' : '_self'}
                                rel={link.external ? 'noopener noreferrer' : undefined}
                                aria-label={link.external ? `${link.name} (opens in new tab)` : link.name}
                              >
                                <span>{link.name}</span>
                                {link.external && <ExternalLink className="h-3 w-3 flex-shrink-0" />}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};