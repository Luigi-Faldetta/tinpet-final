import TinderCard from "react-tinder-card";
import React, { useEffect, useState } from "react";
import ChatContainer from "../../components/ChatContainer/ChatContainer";
import axios from "axios";
import { useCookies } from "react-cookie";
import "./dashboard.css";

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
      const response = await axios
        .get(`http://localhost:3000/user/${userId}`)
        .then((response) => {
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
      const response = await axios.get("http://localhost:3000/users", {
        params: { userId },
      });
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

  const updateMatches = async (matchedUserId: string) => {
    try {
      console.log(userId);
      await axios.put("http://localhost:3000/addmatch", {
        userId,
        matchedUserId,
      });
      getUser();
    } catch (error) {
      console.log(error);
    }
  };

  const swiped = (direction: string, swipedId: string) => {
    if (direction === "right") {
      updateMatches(swipedId);
    }
    setLastDirection(direction);
  };

  const outOfFrame = (ownerName: string) => {
    console.log(ownerName + " left the screen!");
  };

  const filteredUsers = users.filter((user) => {
    console.log(user);
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
                  onSwipe={(dir) => swiped(dir, user._id)}
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
