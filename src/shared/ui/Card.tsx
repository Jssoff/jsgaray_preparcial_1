import React from 'react';
import Image from 'next/image';

interface CardProps {
  imageUrl: string;
}

const Card = ({ imageUrl }: CardProps) => {
  return (
    <div className="border rounded-xl shadow-xl overflow-hidden max-w-lg w-full">
      <Image
        src={imageUrl}
        alt={`Image for ${imageUrl}`}
        width={900}
        height={600}
        className="w-full h-80 object-cover" 
      />
    </div>
  );
};

export default Card;
