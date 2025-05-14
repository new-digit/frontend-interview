import React from 'react';
import Image from 'next/image';

interface UserAvatarProps {
  alt?: string;
  src?: string;
  className?: string;
  width?: number;
  height?: number;
}

const DEFAULT_AVATAR = '/profile-1.png';

const Avatar: React.FC<UserAvatarProps> = ({
  alt = 'User Avatar',
  src = DEFAULT_AVATAR,
  className = '',
  width = 32,
  height = 32,
}) => (
  <Image
    src={src}
    alt={alt}
    width={width}
    height={height}
    className={`w-8 h-8 rounded-full border ${className}`}
  />
);

export default Avatar;
