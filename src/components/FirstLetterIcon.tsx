import { useState } from 'react';

interface FirstLetterIconProps {
  text: string;
  imageUrl?: string;
  alt?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  gradient?: string;
}

const sizeClasses = {
  sm: 'w-12 h-12 text-lg',
  md: 'w-16 h-16 text-xl',
  lg: 'w-24 h-24 text-3xl',
  xl: 'w-32 h-32 text-4xl',
};

const defaultGradients = [
  'from-blue-500 to-purple-600',
  'from-purple-500 to-pink-600',
  'from-green-500 to-teal-600',
  'from-orange-500 to-red-600',
  'from-indigo-500 to-blue-600',
  'from-pink-500 to-rose-600',
  'from-cyan-500 to-blue-600',
  'from-yellow-500 to-orange-600',
];

export function FirstLetterIcon({
  text,
  imageUrl,
  alt,
  className = '',
  size = 'lg',
  gradient,
}: FirstLetterIconProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const firstLetter = text.charAt(0).toUpperCase();
  const gradientClass = gradient || defaultGradients[text.charCodeAt(0) % defaultGradients.length];

  if (!imageUrl || imageError) {
    return (
      <div
        className={`flex items-center justify-center rounded-lg bg-gradient-to-br ${gradientClass} ${sizeClasses[size]} ${className}`}
      >
        <span className="font-bold text-white drop-shadow-lg">
          {firstLetter}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-lg ${sizeClasses[size]} ${className}`}>
      {!imageLoaded && (
        <div
          className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${gradientClass}`}
        >
          <span className="font-bold text-white drop-shadow-lg">
            {firstLetter}
          </span>
        </div>
      )}
      <img
        src={imageUrl}
        alt={alt || text}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
      />
    </div>
  );
}
