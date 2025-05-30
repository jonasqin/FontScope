import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface FontUrlInputProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

export const FontUrlInput: React.FC<FontUrlInputProps> = ({ 
  onSubmit, 
  isLoading 
}) => {
  const [inputValue, setInputValue] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      onSubmit(inputValue.trim());
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text && text.includes('fonts.googleapis.com')) {
        setInputValue(text);
        onSubmit(text);
      }
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err);
    }
  };

  const exampleUrl = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Merriweather:wght@300;400;700&display=swap';

  const handleUseExample = () => {
    setInputValue(exampleUrl);
    onSubmit(exampleUrl);
  };

  return (
    <div className="rounded-lg bg-white dark:bg-gray-800 shadow-md p-6 transition-all">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label 
            htmlFor="fontUrl" 
            className="block text-sm font-medium mb-2"
          >
            Google Fonts URL
          </label>
          <div className="flex">
            <input
              id="fontUrl"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="https://fonts.googleapis.com/css2?family=..."
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md 
                         bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 
                         focus:ring-blue-500 dark:focus:ring-blue-400"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 
                         transition-colors disabled:bg-blue-300 dark:disabled:bg-blue-700 
                         disabled:cursor-not-allowed flex items-center justify-center min-w-[100px]"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                'Preview'
              )}
            </button>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-3">
          <button
            type="button"
            onClick={handlePaste}
            className="text-sm px-3 py-1 text-blue-600 dark:text-blue-400 
                     hover:bg-blue-50 dark:hover:bg-gray-700 rounded transition-colors"
          >
            Paste from clipboard
          </button>
          <button
            type="button"
            onClick={handleUseExample}
            className="text-sm px-3 py-1 text-blue-600 dark:text-blue-400 
                     hover:bg-blue-50 dark:hover:bg-gray-700 rounded transition-colors"
          >
            Use example
          </button>
        </div>
      </form>
      
      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        <p>
          Paste a Google Fonts URL like:{' '}
          <code className="text-xs bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">
            {exampleUrl.length > 60 ? `${exampleUrl.substring(0, 60)}...` : exampleUrl}
          </code>
        </p>
      </div>
    </div>
  );
};