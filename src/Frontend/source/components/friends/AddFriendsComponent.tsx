// import { UsersList } from '@/constants/UsersList';

import Form from 'react-bootstrap/Form';
import FriendRequestCard from './FriendRequestCard';
import { IconPlus } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import FriendServices from '@/services/friendServices';
import { toast } from '@/hooks/use-toast';

const AddFriends = () => {
  const [message, setMessage] = useState('');

  const [UsersList, setUserList] = useState([]);
  const [searchUser, setsearchUser] = useState('');
  const [FiltredUsers, setFiltredUsers] = useState([]);

  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await FriendServices.getPlayers();
        if (response.message){
          setUserList(response.data);
        }
      } catch (error) {
        toast({
          title: 'Authentication failed',
          description: 'Oups Somthing went wrong !',
          variant: 'destructive',
          className: 'bg-primary-dark border-none text-white',
        });
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    setFiltredUsers(UsersList);
    return () => {};
  }, [UsersList]);
  
  const sendFriendRequest = async (receiverUsername: string) => {
    try {
      const response = await FriendServices.sendFriendRequest(receiverUsername);
      

      if (response.message) {
        console.log(response.message);
        setMessage(`Friend request sent to ${receiverUsername}`);
        // I need to delete or update the userList to exclude the cuurent one
        const updatedUsersList = UsersList.filter((user: any) => user.username !== receiverUsername);
        setUserList(updatedUsersList);
        setFiltredUsers(updatedUsersList);
      } else if (response.error) {
        console.log(response.error);
        setMessage(`Error sending friend request to ${receiverUsername}: ${response.error}`);
      }
    } catch (error: any) {
      toast({
        title: 'Authentication failed',
        description: 'Oups Somthing went wrong !',
        variant: 'destructive',
        className: 'bg-primary-dark border-none text-white',
      });
    }
  };

  const setsearchQuery = (username: string) => {
    if (username == '') {
      setFiltredUsers(UsersList);
    } else {
      setFiltredUsers(
        UsersList.filter((User: any) =>
          User.username.toLowerCase().includes(username.toLowerCase())
        )
      );
    }
    setsearchUser(username);
  };
  
  
  // const addUser = (newUser: any) => {
  //   setUserList((prevUsers) => {
  //     const updatedUsers = [...prevUsers, newUser];
  //     setFiltredUsers(updatedUsers);
  //     return updatedUsers;
  //   });
  // };


  return (
    <div className="bg-black-crd flex size-full flex-col items-center justify-between gap-10 overflow-visible rounded-lg pt-10">
      <Form className="flex h-[70px] w-[65%] items-center justify-center rounded-[30px] bg-cyan-100 bg-opacity-20 shadow-2xl">
        <Form.Control
          placeholder="Enter Friend's username or ID ..."
          className="font-coustard ml-10 size-full rounded-lg bg-transparent text-white text-opacity-[70%] placeholder:text-gray-300 focus:outline-none lg:text-[20px] xl:text-[26px] 2xl:text-[30px] dark:placeholder:text-gray-700"
          onChange={(e: any) => setsearchQuery(e.target.value)}
        />
      </Form>
      <div className="custom-scrollbar-container h-[calc(100%-200px)] w-full overflow-y-scroll">
        {FiltredUsers.length > 0 ? (
          FiltredUsers.map((user: any) => (
            <FriendRequestCard
              key={user.id}
              name={user.username}
              ProfilePhoto={user.avatar}
              vari={user.level}
              actions={[
                <IconPlus
                key={user.id}
                className="ml-[100px] size-[40px] text-white cursor-pointer"
                onClick={() => sendFriendRequest(user.username)}
                />,
              ]}
              customStyles={{ backgroundColor: 'transparent' }}
              />
            ))
          ) : (
          <div className="text-center font-bold text-white">No results found for {searchUser} </div>
        )
        }
      </div>
      {message && <div className="text-center font-bold text-white">{message}</div>}
    </div>
  );
};
export default AddFriends;
