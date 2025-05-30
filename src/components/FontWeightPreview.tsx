import React from 'react';
import { ClipboardCopy } from 'lucide-react';
import { FontWeight } from '../types';

interface FontWeightPreviewProps {
  family: string;
  category: string;
  weight: FontWeight;
  customText: string;
}

export const FontWeightPreview: React.FC<FontWeightPreviewProps> = ({
  family,
  category,
  weight,
  customText
}) => {
  const copyCss = () => {
    const css = `font-family: '${family}', ${category};\nfont-weight: ${weight.weight};`;
    navigator.clipboard.writeText(css)
      .then(() => alert('CSS copied to clipboard!'))
      .catch(err => console.error('Failed to copy: ', err));
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-700 rounded-md p-4">
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm font-medium">
          Weight: {weight.weight}
        </div>
        <button
          onClick={copyCss}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          aria-label="Copy CSS"
        >
          <ClipboardCopy size={16} />
        </button>
      </div>
      
      <div 
        className="mt-3"
        style={{ 
          fontFamily: `'${family}', ${category}`,
          fontWeight: weight.weight
        }}
      >
        <div className="mb-2 text-2xl">
          {customText ? truncateText(customText, 30) : 'Aa Bb Cc 123'}
        </div>
        
        <div className="text-sm opacity-80">
          {getWeightDescription(Number(weight.weight))}
        </div>
      </div>
    </div>
  );
};

function truncateText(text: string, maxLength: number): string {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
}

function getWeightDescription(weight: number): string {
  if (weight < 300) return 'Light / Thin weight';
  if (weight < 400) return 'Light weight';
  if (weight < 500) return 'Regular weight';
  if (weight < 600) return 'Medium weight';
  if (weight < 700) return 'Semi-bold weight';
  if (weight < 800) return 'Bold weight';
  return 'Extra bold / Black weight';
}