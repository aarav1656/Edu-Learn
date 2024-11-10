import React from 'react';
import { Check, BookOpen, Notebook, DollarSign, Award } from 'lucide-react';

const StacksDegree = () => {
  const topics = [
    'Bitcoin',
    'Clarity',
    'SIP-009',
    'Nakamoto Upgrade',
    'Clarinet',
    'DeFi',
    'Stacks',
    'SIP-010',
    'sBTC',
    'Proof of Transfer',
    'stacks.js'
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="w-full h-48 bg-orange-400 rounded-xl mb-6"></div>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Stacks Developer Degree</h1>
        <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm">
          +100,000 XP
        </span>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2">
          <h2 className="text-xl font-semibold mb-4">What you'll learn</h2>
          <div className="grid grid-cols-2 gap-4">
            {topics.map((topic, index) => (
              <div key={index} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>{topic}</span>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Courses</h2>
            <div className="text-sm text-gray-600 mb-4">
              1 courses • 6 lessons
            </div>
            <div className="border rounded-lg p-4 flex justify-between items-center">
              <span className="font-medium">Introduction to Stacks</span>
              <span className="text-sm text-gray-600">6 Lessons</span>
            </div>
          </div>

          {/* About Section */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">About</h2>
            <p className="text-gray-700">
              A comprehensive degree for developers looking to build on top of Bitcoin and tap into the over $1T of unproductive liquidity locked into Bitcoin today.
            </p>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl h-fit">
          <h3 className="font-semibold mb-6">This degree includes:</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-gray-600" />
              <span>1 Courses</span>
            </div>
            <div className="flex items-center gap-3">
              <Notebook className="w-5 h-5 text-gray-600" />
              <span>6 Lessons</span>
            </div>
            <div className="flex items-center gap-3">
              <DollarSign className="w-5 h-5 text-gray-600" />
              <span>Forever free access</span>
            </div>
            <div className="flex items-center gap-3">
              <Award className="w-5 h-5 text-gray-600" />
              <span>Proof of knowledge badges</span>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 mb-4">
              Join thousands of other developers doing this degree and earn 100,000 XP!
            </p>
            <button className="w-full bg-red-500 text-white py-3 rounded-lg mb-4 hover:bg-red-600 transition-colors">
              Start Journey
            </button>
            <div className="text-sm text-gray-500">Or jump straight to</div>
            <button className="w-full bg-black text-white py-3 rounded-lg mt-2 hover:bg-gray-800 transition-colors">
              Introduction to Stacks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StacksDegree;