import React from 'react';
import Image from 'next/image';

interface UserAvatarProps {
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
}

const DEFAULT_AVATAR = '/avatars/default.png';

const UserAvatar: React.FC<UserAvatarProps> = ({
  alt = 'User Avatar',
  className = '',
  width = 32,
  height = 32,
}) => (
  <Image
    src={DEFAULT_AVATAR}
    alt={alt}
    width={width}
    height={height}
    className={`w-8 h-8 rounded-full border ${className}`}
  />
);

export default UserAvatar;
