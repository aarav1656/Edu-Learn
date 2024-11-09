import React from 'react';
import { 
  BarChart3, 
  MessageSquare, 
  BookOpen, 
  ClipboardCheck, 
  Users, 
  Smartphone 
} from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
    <div className="mb-4">
      <Icon className="w-6 h-6 text-gray-800" />
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

const Introduction = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Interactive Courses",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna"
    },
    {
      icon: BarChart3,
      title: "Progress Tracking",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna"
    },
    {
      icon: MessageSquare,
      title: "Discussion Forums",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna"
    },
    {
      icon: ClipboardCheck,
      title: "Quizzes and Assessments",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna"
    },
    {
      icon: Users,
      title: "Personalized Learning",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna"
    },
    {
      icon: Smartphone,
      title: "Mobile Compatibility",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900">Unlock Your Learning Potential</h2>
        <button className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors">
          View All
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Introduction;