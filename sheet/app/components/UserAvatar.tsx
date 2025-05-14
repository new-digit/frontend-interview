import Avatar from '@/components/ui/avatar';
import { FunctionComponent } from 'react';

interface UserAvatarProps {
  name: string;
  src: string;
  status: 'online' | 'offline';
}

const UserAvatar: FunctionComponent<UserAvatarProps> = ({ name, src, status }) => {
  return (
    <div className="relative inline-block">
      <Avatar src={src} alt={name} className="w-10 h-10" />
      <span
        className={`absolute bottom-0 right-0 block w-2 h-2 rounded-full ring-2 ring-white
          ${status === 'online' ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}
        `}
        aria-label={status === 'online' ? 'Online' : 'Offline'}
      />
    </div>
  );
};

export default UserAvatar;
