import React, { useState } from 'react';
import { FontUrlInput } from './FontUrlInput';
import { FontDisplay } from './FontDisplay';
import { parseFontUrl } from '../utils/fontUtils';
import { FontData } from '../types';
import { CustomTextInput } from './CustomTextInput';
import { ExternalLink } from 'lucide-react';

const FONT_EXAMPLES = [
  {
    name: 'Playfair Display + Source Sans Pro',
    url: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Source+Sans+Pro:wght@300;400;600&display=swap',
    description: 'Classic serif + sans-serif pairing for editorial design'
  },
  {
    name: 'Roboto + Roboto Mono',
    url: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Roboto+Mono:wght@400;500&display=swap',
    description: 'Modern sans-serif with matching monospace for technical content'
  },
  {
    name: 'Lora + Open Sans',
    url: 'https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&family=Open+Sans:wght@300;400;600&display=swap',
    description: 'Elegant serif + readable sans-serif for long-form content'
  },
  {
    name: 'Montserrat + Merriweather',
    url: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Merriweather:wght@300;400;700&display=swap',
    description: 'Bold sans-serif headers with traditional serif body'
  },
  {
    name: 'Poppins + Inter',
    url: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap',
    description: 'Modern geometric sans-serif pairing for clean interfaces'
  },
  {
    name: 'DM Serif Display + DM Sans',
    url: 'https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;700&display=swap',
    description: 'Contemporary serif + sans-serif from the same family'
  },
  {
    name: 'Crimson Pro + Work Sans',
    url: 'https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;500;600&family=Work+Sans:wght@300;400;500;600&display=swap',
    description: 'Refined serif + geometric sans-serif for professional design'
  },
  {
    name: 'Space Grotesk + IBM Plex Sans',
    url: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Sans:wght@300;400;500&display=swap',
    description: 'Modern tech-inspired sans-serif combination'
  },
  {
    name: 'Fraunces + Outfit',
    url: 'https://fonts.googleapis.com/css2?family=Fraunces:wght@400;500;600;700&family=Outfit:wght@300;400;500;600&display=swap',
    description: 'Quirky serif + clean sans-serif for creative projects'
  },
  {
    name: 'Libre Franklin + Libre Baskerville',
    url: 'https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@300;400;500;600&family=Libre+Baskerville:wght@400;700&display=swap',
    description: 'Classic American type pairing'
  },
  {
    name: 'Raleway + Lato',
    url: 'https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&family=Lato:wght@300;400;700&display=swap',
    description: 'Elegant sans-serif combination for modern websites'
  },
  {
    name: 'Josefin Sans + Alegreya',
    url: 'https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;500;600&family=Alegreya:wght@400;500;600&display=swap',
    description: 'Distinctive sans-serif + warm serif for unique designs'
  },
  {
    name: 'Spectral + Karla',
    url: 'https://fonts.googleapis.com/css2?family=Spectral:wght@400;500;600;700&family=Karla:wght@300;400;500;600&display=swap',
    description: 'Modern serif + grotesque sans for contemporary layouts'
  },
  {
    name: 'Manrope + Source Serif Pro',
    url: 'https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&family=Source+Serif+Pro:wght@400;600;700&display=swap',
    description: 'Geometric sans-serif + traditional serif balance'
  },
  {
    name: 'Syne + Sora',
    url: 'https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700&family=Sora:wght@300;400;500;600&display=swap',
    description: 'Contemporary sans-serif pairing for modern aesthetics'
  },
  {
    name: 'Urbanist + Newsreader',
    url: 'https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700&family=Newsreader:wght@400;500;600&display=swap',
    description: 'Modern sans-serif + news-style serif for editorial'
  },
  {
    name: 'Plus Jakarta Sans + Bitter',
    url: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Bitter:wght@400;500;600&display=swap',
    description: 'Contemporary sans-serif + slab serif contrast'
  },
  {
    name: 'Cabinet Grotesk + Petrona',
    url: 'https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;500;600;700&family=Petrona:wght@400;500;600&display=swap',
    description: 'Modern grotesk + humanist serif for versatile design'
  },
  {
    name: 'Instrument Sans + Instrument Serif',
    url: 'https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=Instrument+Serif:wght@400&display=swap',
    description: 'Matching sans-serif and serif family for cohesive design'
  },
  {
    name: 'Albert Sans + Fraunces',
    url: 'https://fonts.googleapis.com/css2?family=Albert+Sans:wght@300;400;500;600;700&family=Fraunces:wght@400;500;600&display=swap',
    description: 'Clean sans-serif + expressive serif for creative contrast'
  }
];

export const FontPreview: React.FC = () => {
  const [fontUrl, setFontUrl] = useState<string>('');
  const [fontData, setFontData] = useState<FontData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [customText, setCustomText] = useState<string>(
    'The quick brown fox jumps over the lazy dog'
  );

  const handleFontUrlSubmit = async (url: string) => {
    setIsLoading(true);
    setFontUrl(url);
    
    try {
      // Remove any existing font stylesheet with the same URL
      const existingLinks = document.head.querySelectorAll(`link[href="${url}"]`);
      existingLinks.forEach(link => link.remove());
      
      // Add new stylesheet
      const linkElement = document.createElement('link');
      linkElement.rel = 'stylesheet';
      linkElement.href = url;
      document.head.appendChild(linkElement);
      
      await new Promise((resolve, reject) => {
        linkElement.onload = resolve;
        linkElement.onerror = reject;
        // Fallback timeout
        setTimeout(resolve, 2000);
      });
      
      const parsed = parseFontUrl(url);
      setFontData(parsed);
    } catch (error) {
      console.error('Error loading font:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-3">FontScope</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Visualize and explore Google Fonts with ease
        </p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar with font examples */}
        <div className="lg:w-1/3">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-20">
            <h2 className="text-lg font-semibold mb-4">Classic Font Combinations</h2>
            <div className="space-y-2">
              {FONT_EXAMPLES.map((example, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
                  onClick={() => handleFontUrlSubmit(example.url)}
                >
                  <div className="font-medium mb-1">{example.name}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {example.description}
                  </div>
                  <button
                    className="mt-2 inline-flex items-center text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    <ExternalLink size={14} className="mr-1" />
                    <span>Preview fonts</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="lg:w-2/3">
          <FontUrlInput onSubmit={handleFontUrlSubmit} isLoading={isLoading} />
          
          {fontData.length > 0 && (
            <div className="mt-8 space-y-6">
              <CustomTextInput 
                value={customText} 
                onChange={setCustomText}
              />
              
              <FontDisplay 
                fontData={fontData} 
                customText={customText}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};