import React from "react";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="max-w-[1440px] mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 py-16">
        <div className="flex flex-col justify-center">
          <div className="mb-8">
            <div className="w-32">
              <div className="relative">
                <div className="absolute left-0 top-0">
                  <div className="w-32 h-24 flex items-end">
                    <div className="w-24 h-16 border-2 border-black transform -rotate-12"></div>
                    <div className="w-6 h-6 bg-black rounded-full ml-2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h1 className="text-[56px] font-bold leading-tight mb-6 text-black">
            Knowledge At Your
            <br />
            Fingertips Explore Our
            <br />
            Decentraised E-Learning Platform
          </h1>

          <p className="text-lg text-gray-600 mb-8 max-w-xl">
            Our platform offers a diverse range of courses designed to cater to
            various interests and skill levels, from beginner to advanced. With
            a user-friendly interface
          </p>

          <button className="bg-black text-white px-8 py-3 rounded w-fit text-lg font-medium hover:bg-gray-900">
            Book A Demo
          </button>

          <div className="mt-16">
            <div className="w-40 h-40 relative">
              <div className="w-32 h-40 border-2 border-black transform rotate-12"></div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="relative w-full aspect-square bg-gray-50 rounded-full flex items-center justify-center">
            <div className="absolute right-16 top-1/2 transform -translate-y-1/2">
              <div className="w-[400px]">
                <div className="aspect-square relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-64 h-64 bg-gray-100 rounded-full"></div>
                    <img
                      src="https://mycloudpulse.com/image/media-entertainment-solutions/media-and-entertainment-it-solutions.jpg"
                      alt=""
                    />
                  </div>
                  <div className="absolute top-8 right-8 w-16 h-16 bg-gray-200 rounded"></div>
                  <div className="absolute bottom-8 left-8 w-16 h-16 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200">
        <div className="grid grid-cols-6 gap-8 py-6">
          {["slack", "peng", "verox-floor", "slack", "Linear", "Dropbox"].map(
            (logo, index) => (
              <div
                key={index}
                className="flex items-center justify-center grayscale hover:grayscale-0 transition-all"
              >
                <div className="h-6">
                  <div className="w-24 h-full bg-gray-200 rounded"></div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
