import React from 'react';

interface CustomTextInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const CustomTextInput: React.FC<CustomTextInputProps> = ({ 
  value, 
  onChange 
}) => {
  const presetTexts = [
    'The quick brown fox jumps over the lazy dog',
    'Pack my box with five dozen liquor jugs',
    'How vexingly quick daft zebras jump!',
    'Amazingly few discotheques provide jukeboxes',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all">
      <div className="space-y-4">
        <div>
          <label 
            htmlFor="customText" 
            className="block text-sm font-medium mb-2"
          >
            Custom Preview Text
          </label>
          <textarea
            id="customText"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter custom text to preview with the loaded fonts..."
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                     bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 
                     focus:ring-blue-500 dark:focus:ring-blue-400 min-h-[80px]"
          />
        </div>
        
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Preset pangrams:
          </p>
          <div className="flex flex-wrap gap-2">
            {presetTexts.map((text, index) => (
              <button
                key={index}
                onClick={() => onChange(text)}
                className="text-xs px-3 py-1.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 
                         dark:hover:bg-gray-600 rounded-full transition-colors"
              >
                {text.length > 30 ? `${text.substring(0, 30)}...` : text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};