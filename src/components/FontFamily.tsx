import React, { useState } from 'react';
import { ClipboardCopy, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { FontData, FontWeight } from '../types';
import { FontWeightPreview } from './FontWeightPreview';

interface FontFamilyProps {
  font: FontData;
  customText: string;
}

export const FontFamily: React.FC<FontFamilyProps> = ({ font, customText }) => {
  const [expanded, setExpanded] = useState(true);
  const [showInfo, setShowInfo] = useState(false);

  const toggleExpanded = () => setExpanded(!expanded);
  const toggleInfo = () => setShowInfo(!showInfo);

  const copyFontImport = () => {
    const importCode = `<link href="https://fonts.googleapis.com/css2?family=${font.family.replace(' ', '+')}:wght@${font.weights.map(w => w.weight).join(';')}&display=swap" rel="stylesheet">`;
    navigator.clipboard.writeText(importCode)
      .then(() => {
        alert('Font import code copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  const copyFontCss = () => {
    const cssCode = `font-family: '${font.family}', ${font.category};`;
    navigator.clipboard.writeText(cssCode)
      .then(() => {
        alert('CSS code copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  // Sort weights numerically
  const sortedWeights = [...font.weights].sort((a, b) => Number(a.weight) - Number(b.weight));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <button
                onClick={toggleExpanded}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                aria-label={expanded ? "Collapse font details" : "Expand font details"}
              >
                {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              <h2 
                className="text-2xl font-bold" 
                style={{ fontFamily: `'${font.family}', ${font.category}` }}
              >
                {font.family}
              </h2>
              
              <button
                onClick={toggleInfo}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 ml-2"
                aria-label={showInfo ? "Hide font information" : "Show font information"}
              >
                <Info size={18} />
              </button>
            </div>
            
            <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              <span className="capitalize">{font.category}</span> · {font.weights.length} weights
            </div>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={copyFontImport}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 
                       hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
            >
              <ClipboardCopy size={14} />
              <span>HTML</span>
            </button>
            <button
              onClick={copyFontCss}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 
                       hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
            >
              <ClipboardCopy size={14} />
              <span>CSS</span>
            </button>
          </div>
        </div>
        
        {showInfo && (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-sm">
            <h3 className="font-medium mb-2">About this font</h3>
            <ul className="space-y-1">
              <li><strong>Family:</strong> {font.family}</li>
              <li><strong>Category:</strong> <span className="capitalize">{font.category}</span></li>
              <li>
                <strong>Available weights:</strong> {sortedWeights.map(w => w.weight).join(', ')}
              </li>
              <li>
                <strong>Recommended usage:</strong> {getRecommendedUsage(font.category)}
              </li>
            </ul>
          </div>
        )}
      </div>
      
      {expanded && (
        <div className="p-6 space-y-8">
          <div>
            <h3 className="text-lg font-medium mb-4">Sample text</h3>
            <div 
              className="text-4xl leading-tight" 
              style={{ fontFamily: `'${font.family}', ${font.category}` }}
            >
              {customText || 'The quick brown fox jumps over the lazy dog'}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Weights & Styles</h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {sortedWeights.map((weight, idx) => (
                <FontWeightPreview 
                  key={idx}
                  family={font.family}
                  category={font.category}
                  weight={weight}
                  customText={customText}
                />
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Typography Scale</h3>
            <div className="space-y-4 pb-2">
              {[
                { size: '3rem', label: 'H1', weight: getMidWeight(font.weights) },
                { size: '2.25rem', label: 'H2', weight: getMidWeight(font.weights) },
                { size: '1.875rem', label: 'H3', weight: getMidWeight(font.weights) },
                { size: '1.5rem', label: 'H4', weight: getMidWeight(font.weights) },
                { size: '1.25rem', label: 'H5', weight: getMidWeight(font.weights) },
                { size: '1rem', label: 'Body', weight: getBodyWeight(font.weights) },
                { size: '0.875rem', label: 'Small', weight: getBodyWeight(font.weights) }
              ].map((item, idx) => (
                <div key={idx} className="flex items-baseline">
                  <div className="w-16 text-xs text-gray-500 dark:text-gray-400">
                    {item.label} <span className="opacity-60">({item.size})</span>
                  </div>
                  <div 
                    style={{ 
                      fontFamily: `'${font.family}', ${font.category}`,
                      fontSize: item.size,
                      fontWeight: item.weight
                    }}
                    className="ml-4"
                  >
                    {shortenText(customText || 'The quick brown fox jumps over the lazy dog', idx)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper functions
function getMidWeight(weights: FontWeight[]): number {
  if (weights.length === 0) return 400;
  const sortedWeights = [...weights].sort((a, b) => Number(a.weight) - Number(b.weight));
  const midIndex = Math.floor(sortedWeights.length / 2);
  return Number(sortedWeights[midIndex].weight);
}

function getBodyWeight(weights: FontWeight[]): number {
  // Try to find 400 (regular) first
  const regularWeight = weights.find(w => Number(w.weight) === 400);
  if (regularWeight) return 400;
  
  // Otherwise find the closest to 400
  const sortedByCloseness = [...weights].sort((a, b) => 
    Math.abs(Number(a.weight) - 400) - Math.abs(Number(b.weight) - 400)
  );
  
  return Number(sortedByCloseness[0].weight);
}

function shortenText(text: string, index: number): string {
  // For headings, show less text as we go up the hierarchy
  const maxLength = Math.max(10, 50 - (index * 5));
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
}

function getRecommendedUsage(category: string): string {
  switch (category.toLowerCase()) {
    case 'serif':
      return 'Headings, editorial content, traditional or formal contexts';
    case 'sans-serif':
      return 'Body text, interfaces, modern and clean designs';
    case 'display':
      return 'Large headings, logos, and decorative elements';
    case 'handwriting':
      return 'Signatures, informal notes, creative contexts';
    case 'monospace':
      return 'Code snippets, technical content, tabular data';
    default:
      return 'General purpose typography';
  }
}