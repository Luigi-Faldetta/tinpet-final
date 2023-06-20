import TinderCard from "react-tinder-card";
import React, { useEffect, useState } from "react";
import ChatContainer from "../../components/ChatContainer/ChatContainer";
import axios from "axios";
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
declare global {
  interface Window {
    my_modal_5: HTMLDialogElement;
  }
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [cookies, setCookie, removeCookie] = useCookies([
    "AuthToken",
    "UserId",
  ]);
  const [lastDirection, setLastDirection] = useState<string | null>(null);
  // console.log(cookies, "coo");

  const userId: string = cookies.UserId;
  // console.log(userId, "UUUU");

  const getUser = async () => {
    try {
      // const response = await axios
      //   .get(`http://localhost:3000/user/${userId}`)
      const response = await UserService.getUser(userId).then((response) => {
        setUser(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  //test

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

  // const updateMatches = UserService.updateMatch("userId", "matchedUserId");

  const swiped = (direction: string, userId: string, swipedId: string) => {
    setLastDirection(direction);
    if (direction === "right") {
      // updateMatches(userId, swipedId);
      UserService.updateMatch(userId, swipedId);
    }
  };

  const outOfFrame = (ownerName: string) => {
    console.log(ownerName + " left the screen!");
  };

  const filteredUsers = users.filter((user) => {
    // console.log(user);
    return user._id !== userId;
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
                    className='card'
                  >
                    {/* Open the modal using ID.showModal() method */}
                    <button
                      className='btn'
                      onClick={() => window.my_modal_5.showModal()}
                    >
                      open modal
                    </button>
                    <dialog
                      id='my_modal_5'
                      className='modal modal-bottom sm:modal-middle'
                    >
                      <form method='dialog' className='modal-box'>
                        <h3 className='font-bold text-lg'>Hello!</h3>
                        <p className='py-4'>
                          Press ESC key or click the button below to close
                        </p>
                        <div className='modal-action'>
                          {/* if there is a button in form, it will close the modal */}
                          <button className='btn'>Close</button>
                        </div>
                      </form>
                    </dialog>
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
