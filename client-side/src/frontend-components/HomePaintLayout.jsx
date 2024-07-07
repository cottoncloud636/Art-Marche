import React from 'react';

const MasonryLayout = ({ artworks }) => {
  return (
    <div className="container mx-auto p-6 columns-1 md:columns-2 lg:columns-3 gap-6">
      {artworks.map((art, index) => (
        <div key={index} className="mb-6">
          <img src={art.imgUrl} alt={`Art ${index + 1}`} className="w-full h-auto object-cover rounded-lg hover:opacity-75 transition-opacity duration-300" />
        </div>
      ))}
    </div>
  );
};

export default MasonryLayout;
