import { useUser } from '@/context/GlobalContext';
import BlockedComponent from './BlockedComponent';
import FriendServices from '@/services/friendServices';
import { useEffect, useState } from 'react';

export interface Blocked {
  id: number;
  username: string;
  avatar: string;
}
const BlockedList = () => {
  const [blockedList, setBlockedList] = useState<Blocked[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  function handleUnblock(name: string) {}
  useEffect(() => {
    const fetchBlockedList = async () => {
      try {
        const blocked = await FriendServices.getBlocked();
        setBlockedList(blocked);
      } catch (err) {
        console.error('Error fetching blocked list:', err);
        setError('Failed to fetch blocked users.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlockedList();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="size-full 2xl:p-28">
      <div className="custom-scrollbar-container h-[calc(100%-200px)] overflow-y-scroll bg-[#4C4D4E] shadow-2xl 2xl:rounded-[50px]">
        <div className="bg-black-crd h-fit w-full dark:bg-transparent">
          {blockedList.length > 0 ? (
            blockedList.map((user, index) => (
              <BlockedComponent
                key={index}
                name={user?.username}
                ProfilePhoto={`http://localhost:8080${user?.avatar}`}
                onUnblock={handleUnblock}
              />
            ))
          ) : (
            <div className="font-dayson flex items-center justify-center border-2 text-xl text-white">
              No blocked users found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default BlockedList;
