import React from 'react';

const About = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-300 to-red-200 p-10">
      <div className="w-150 h-96 bg-white shadow-lg rounded-full overflow-hidden flex items-center justify-center">
        <div className="p-10 text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">About Us</h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Welcome to Art Marche, where creativity meets quality. Our platform is dedicated to showcasing unique and original artworks from talented artists around the world.
          </p>
          <p className="mt-4 text-lg text-gray-700 leading-relaxed">
            We believe in supporting artists and providing them with a space to share their passion and stories. Join us in celebrating the vibrant world of art.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
