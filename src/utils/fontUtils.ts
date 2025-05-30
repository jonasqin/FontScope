import { FontData } from '../types';

export function parseFontUrl(url: string): FontData[] {
  const fonts: FontData[] = [];
  
  try {
    // Parse URL parameters
    const urlObj = new URL(url);
    const familyParams = urlObj.searchParams.getAll('family');
    
    // Process each family parameter
    familyParams.forEach(familyParam => {
      const [familyName, weightString] = familyParam.split(':');
      
      // Create font object
      const font: FontData = {
        family: familyName.replace(/\+/g, ' '),
        weights: [],
        category: guessFontCategory(familyName)
      };
      
      // Parse weights
      if (weightString) {
        const weightParts = weightString.split('@');
        if (weightParts.length > 1) {
          const weights = weightParts[1].split(';');
          weights.forEach(weight => {
            font.weights.push({
              weight: weight
            });
          });
        }
      } else {
        // Default weight if none specified
        font.weights.push({
          weight: '400'
        });
      }
      
      fonts.push(font);
    });
    
    return fonts;
  } catch (error) {
    console.error('Error parsing font URL:', error);
    return [];
  }
}

// Helper function to guess font category based on name
// In a real application, this would be more sophisticated or use a proper API
function guessFontCategory(fontName: string): string {
  fontName = fontName.toLowerCase().replace(/\+/g, ' ');
  
  // Common serif fonts
  if (
    fontName.includes('serif') || 
    fontName.includes('georgia') || 
    fontName.includes('times') || 
    fontName.includes('garamond') ||
    fontName.includes('baskerville') ||
    fontName.includes('didot') ||
    fontName.includes('bodoni') ||
    fontName.includes('caslon') ||
    fontName.includes('playfair') ||
    fontName.includes('merriweather')
  ) {
    return 'serif';
  }
  
  // Common monospace fonts
  if (
    fontName.includes('mono') || 
    fontName.includes('code') || 
    fontName.includes('console') ||
    fontName.includes('terminal') ||
    fontName.includes('courier') ||
    fontName.includes('fira code') ||
    fontName.includes('source code') ||
    fontName.includes('menlo') ||
    fontName.includes('consolas')
  ) {
    return 'monospace';
  }
  
  // Common display fonts
  if (
    fontName.includes('display') || 
    fontName.includes('black') ||
    fontName.includes('poster') ||
    fontName.includes('headline') ||
    fontName.includes('decorative')
  ) {
    return 'display';
  }
  
  // Common handwriting/script fonts
  if (
    fontName.includes('script') || 
    fontName.includes('hand') ||
    fontName.includes('brush') ||
    fontName.includes('calligraphy') ||
    fontName.includes('cursive') ||
    fontName.includes('dancing') ||
    fontName.includes('pacifico')
  ) {
    return 'handwriting';
  }
  
  // Default to sans-serif
  return 'sans-serif';
}