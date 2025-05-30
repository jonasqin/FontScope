import React from 'react';
import { FontFamily } from './FontFamily';
import { FontData } from '../types';

interface FontDisplayProps {
  fontData: FontData[];
  customText: string;
}

export const FontDisplay: React.FC<FontDisplayProps> = ({ 
  fontData,
  customText 
}) => {
  return (
    <div className="space-y-12">
      {fontData.map((font, index) => (
        <FontFamily 
          key={index} 
          font={font} 
          customText={customText}
        />
      ))}
    </div>
  );
};