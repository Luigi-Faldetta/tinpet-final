import TinderCard from "react-tinder-card";
import React, { useEffect, useState } from "react";
import ChatContainer from "../../components/ChatContainer/ChatContainer";

import { useCookies } from "react-cookie";
import "./dashboard.css";
import UserService from "../../Services/UserService";

interface User {
  _id: string;
  ownerName: string;
  dogName: string;
  matches: User[];
  about: string;
  dogAge: number;
  ownerAge: number;
  gender: string;
  avatar: string;
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [cookies, setCookie, removeCookie] = useCookies([
    "AuthToken",
    "UserId",
  ]);
  const [lastDirection, setLastDirection] = useState<string | null>(null);

  const userId: string = cookies.UserId;

  const getUser = async () => {
    try {
      const response = await UserService.getUser(userId).then((response) => {
        setUser(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getAllUsers = async () => {
    try {
      const response = await UserService.getUsers();
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (user) {
      getAllUsers();
    }
  }, [user]);

  const swiped = (direction: string, userId: string, swipedId: string) => {
    setLastDirection(direction);

    if (direction === "right") {
      if (
        user?.matches &&
        !user.matches.some((match) => match._id === swipedId)
      ) {
        UserService.updateMatch(userId, swipedId);
      }
    }
  };

  const outOfFrame = (ownerName: string) => {
    console.log(ownerName + " left the screen!");
  };

  const filteredUsers = users.filter((user) => {
    return (
      user._id !== userId &&
      (!user.matches || !user.matches.some((match) => match._id === match._id))
    );
  });
  return (
    <>
      {user && (
        <div className='dashboard'>
          <ChatContainer currentUser={user} userId={userId} />
          <div className='swiper-container'>
            <div className='card-container'>
              {filteredUsers.map((user) => (
                <TinderCard
                  className='swipe'
                  key={user._id}
                  onSwipe={(dir) => swiped(dir, userId, user._id)}
                  onCardLeftScreen={() => outOfFrame(user.ownerName)}
                >
                  <div
                    style={{ backgroundImage: "url(" + user.avatar + ")" }}
                    className='card z-10'
                  >
                    <label
                      htmlFor={`my_modal_${user._id}`}
                      className='btn px-2 py-1 rounded-3xl text-sm'
                      style={{
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        color: "#ffffff",
                        margin: "10px",
                      }}
                    >
                      Info about {user.ownerName} and {user.dogName}
                    </label>

                    {/* Put this part before </body> tag */}
                    <input
                      type='checkbox'
                      id={`my_modal_${user._id}`}
                      className='modal-toggle'
                    />
                    <div className='modal z-20 rounded-3xl'>
                      <div className='modal-box bg-white rounded'>
                        <div className='modalInfo'>
                          <h3 className='text-lg font-bold'>Info about us:</h3>
                          <p className='py-4'>my age: {user.ownerAge}</p>
                          <p className='py-4'>my dog age: {user.dogAge}</p>
                          <p className='py-4'>my dog gender: {user.gender}</p>
                          <p className='py-4'>info about us: {user.about}</p>
                        </div>
                      </div>
                      <label
                        className='modal-backdrop'
                        htmlFor={`my_modal_${user._id}`}
                      >
                        Close
                      </label>
                    </div>
                  </div>
                </TinderCard>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
