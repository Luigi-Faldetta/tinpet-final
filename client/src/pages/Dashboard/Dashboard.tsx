import TinderCard from "react-tinder-card";
import React, { useEffect, useState } from "react";
import ChatContainer from "../../components/ChatContainer/ChatContainer";
import axios from "axios";
import { useCookies } from "react-cookie";
import "./dashboard.css";
import UserService from "../../UserService";

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
      console.log(userId);
      // const response = await axios
      //   .get(`http://localhost:3000/user/${userId}`)
      const response = await UserService.getUser(userId).then((response) => {
        console.log("Yes!");
        setUser(response.data);
        console.log(setUser);
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
        <div className="dashboard">
          <ChatContainer currentUser={user} />
          <div className="swiper-container">
            <div className="card-container">
              {filteredUsers.map((user) => (
                <TinderCard
                  className="swipe"
                  key={user._id}
                  onSwipe={(dir) => swiped(dir, userId, user._id)}
                  onCardLeftScreen={() => outOfFrame(user.ownerName)}
                >
                  <div
                    style={{ backgroundImage: "url(" + user.avatar + ")" }}
                    className="card"
                  >
                    <h3>
                      {user.dogName + ", Age: "}
                      {user.dogAge}
                      {user._id}
                    </h3>
                    <h3>{user.about}</h3>
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
