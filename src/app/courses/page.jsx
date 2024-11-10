"use client"
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import Link from 'next/link';

const mockFetchCourses = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    {
      id: 1,
      title: 'Stacks Developer Degree',
      description: 'A comprehensive degree for developers looking to build on top of Bitcoin and tap into the over $1T of unproductive liquidity locked into Bitcoin today.',
      imageUrl: '/api/placeholder/400/200',
      organization: {
        name: 'Stacks',
        logoUrl: '/api/placeholder/40/40',
        date: 'April 22nd, 2024'
      },
      stats: {
        courses: 1,
        lessons: 6,
        xp: 100000
      },
      badges: ['Introduction to Stacks'],
      theme: 'bg-orange-500'
    },
    {
      id: 2,
      title: 'Stacks Developer Degree',
      description: 'A comprehensive degree for developers looking to build on top of Bitcoin and tap into the over $1T of unproductive liquidity locked into Bitcoin today.',
      imageUrl: '/api/placeholder/400/200',
      organization: {
        name: 'Stacks',
        logoUrl: '/api/placeholder/40/40',
        date: 'April 22nd, 2024'
      },
      stats: {
        courses: 1,
        lessons: 6,
        xp: 100000
      },
      badges: ['Introduction to Stacks'],
      theme: 'bg-orange-500'
    },
    {
      id: 3,
      title: 'Stacks Developer Degree',
      description: 'A comprehensive degree for developers looking to build on top of Bitcoin and tap into the over $1T of unproductive liquidity locked into Bitcoin today.',
      imageUrl: '/api/placeholder/400/200',
      organization: {
        name: 'Stacks',
        logoUrl: '/api/placeholder/40/40',
        date: 'April 22nd, 2024'
      },
      stats: {
        courses: 1,
        lessons: 6,
        xp: 100000
      },
      badges: ['Introduction to Stacks'],
      theme: 'bg-orange-500'
    },
    {
      id: 4,
      title: 'Stacks Developer Degree',
      description: 'A comprehensive degree for developers looking to build on top of Bitcoin and tap into the over $1T of unproductive liquidity locked into Bitcoin today.',
      imageUrl: '/api/placeholder/400/200',
      organization: {
        name: 'Stacks',
        logoUrl: '/api/placeholder/40/40',
        date: 'April 22nd, 2024'
      },
      stats: {
        courses: 1,
        lessons: 6,
        xp: 100000
      },
      badges: ['Introduction to Stacks'],
      theme: 'bg-orange-500'
    },
  ];
};

const CourseCard = ({ course }) => {
  if (!course) return null;

  return (
    <Link href={`/courses/${course.id}`} className="block">
      <div className="flex flex-col md:flex-row gap-6 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
        <div className={`w-full md:w-72 h-48 rounded-lg ${course.theme} flex items-center justify-center`}>
          <img
            src={course.imageUrl}
            alt={course.title}
            className="w-full h-full object-cover rounded-lg opacity-80"
          />
        </div>
        
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <h2 className="text-2xl font-bold mb-2">{course.title}</h2>
            <div className="text-gray-500 text-right">3K+</div>
          </div>
          
          <div className="flex gap-3 mb-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {course.stats.courses} Courses
            </span>
            <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
              {course.stats.lessons} Lessons
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
              +{course.stats.xp.toLocaleString()} XP
            </span>
          </div>
          
          <p className="text-gray-600 mb-4">{course.description}</p>
          
          {course.badges?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {course.badges.map((badge, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                >
                  {badge}
                </span>
              ))}
            </div>
          )}
          
          <div className="flex items-center gap-2 mt-4">
            <img
              src={course.organization.logoUrl}
              alt={course.organization.name}
              className="w-6 h-6 rounded-full"
            />
            <span className="font-medium">{course.organization.name}</span>
            <span className="text-gray-500">{course.organization.date}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

const LoadingSkeleton = () => (
  <div className="animate-pulse flex flex-col md:flex-row gap-6 bg-white rounded-xl p-4">
    <div className="w-full md:w-72 h-48 bg-gray-200 rounded-lg"></div>
    <div className="flex-1 space-y-4">
      <div className="h-8 bg-gray-200 rounded w-3/4"></div>
      <div className="flex gap-3">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-6 bg-gray-200 rounded-full w-24"></div>
        ))}
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    </div>
  </div>
);

const CoursesAndDegrees = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await mockFetchCourses();
        setCourses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Courses & Degrees</h1>
        <p className="text-gray-600">
          Are you a protocol, DAO, or company? Get in touch to have your own courses
        </p>
      </div>
      
      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Search Courses & Degrees"
          className="w-full p-4 pl-12 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      {error && (
        <div className="text-red-600 bg-red-50 p-4 rounded-lg mb-6">
          Error loading courses: {error}
        </div>
      )}
      
      <div className="space-y-6">
        {loading ? (
          <>
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
          </>
        ) : (
          filteredCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))
        )}
        
        {!loading && filteredCourses.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No courses found{searchQuery ? ' matching your search' : ''}
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesAndDegrees;