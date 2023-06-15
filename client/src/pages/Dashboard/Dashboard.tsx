// /* eslint-disable no-unused-vars */
// import TinderCard from "react-tinder-card";
// import { useEffect, useState } from "react";
// import ChatContainer from "../../components/ChatContainer/ChatContainer";
// import axios from "axios";
// import { useCookies } from "react-cookie";
// import "./dashboard.css";
// import React from "react";

// interface User {
//   user_id: string;
//   name: string;
//   age: number;
//   gender: string;
//   url: string;
//   about: string;
//   matches: string[];
// }

// const Dashboard: React.FC = () => {
//   const [user, setUser] = useState<User | null>(null);
//   const [users, setUsers] = useState<User[]>([]);
//   const [cookies] = useCookies(["user"]);
//   const [lastDirection, setLastDirection] = useState<string | null>(null);

//   const userId = cookies.user?.UserId;

//   const getUser = async () => {
//     try {
//       const response = await axios.get("http://localhost:3000/user", {
//         params: { userId },
//       });
//       setUser(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getAllUsers = async () => {
//     try {
//       const response = await axios.get("http://localhost:3000/users", {
//         params: { userId },
//       });
//       setUsers(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getUser();
//   }, []);

//   useEffect(() => {
//     if (user) {
//       getAllUsers();
//     }
//   }, [user]);

//   const updateMatches = async (matchedUserId: string) => {
//     try {
//       await axios.put("http://localhost:3000/addmatch", {
//         userId,
//         matchedUserId,
//       });
//       getUser();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const swiped = (direction: string, swipedId: string) => {
//     if (direction === "right") {
//       updateMatches(swipedId);
//     }
//     setLastDirection(direction);
//   };

//   const outOfFrame = (name: string) => {
//     console.log(name + " left the screen!");
//   };

//   const filteredUsers = users.filter((user) => user.user_id !== userId);

//   return (
//     <>
//       {user && (
//         <div className="dashboard">
//           <ChatContainer user={user} />
//           <div className="swiper-container">
//             <div className="card-container">
//               {filteredUsers.map((user) => (
//                 <TinderCard
//                   className="swipe"
//                   key={user.user_id}
//                   onSwipe={(dir) => swiped(dir, user.user_id)}
//                   onCardLeftScreen={() => outOfFrame(user.name)}
//                 >
//                   <div
//                     style={{ backgroundImage: "url(" + user.url + ")" }}
//                     className="card"
//                   >
//                     <h3>
//                       {user.name + ", Age: "}
//                       {user.age}
//                     </h3>
//                   </div>
//                 </TinderCard>
//               ))}
//               <div className="swipe-info">
//                 {lastDirection ? <p>You swiped {lastDirection}</p> : <p />}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Dashboard;

/* eslint-disable no-unused-vars */

//@ts-nocheck
import TinderCard from "react-tinder-card";
import React, { useEffect, useState } from "react";
import ChatContainer from "../../components/ChatContainer/ChatContainer";
import axios from "axios";
import { useCookies } from "react-cookie";
import "./dashboard.css";
import React from "react";

const Dashboard: React.FC = () => {
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [lastDirection, setLastDirection] = useState();

  const userId = cookies.UserId;

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:3000/user", {
        params: { userId },
      });
      setUser(response.data);
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

  const updateMatches = async (matchedUserId) => {
    try {
      await axios.put("http://localhost:3000/addmatch", {
        userId,
        matchedUserId,
      });
      getUser();
    } catch (error) {
      console.log(error);
    }
  };

  const swiped = (direction, swipedId) => {
    if (direction === "right") {
      updateMatches(swipedId);
    }
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  const filteredUsers = users.filter((user) => user.user_id !== userId);

  return (
    <>
      {user && (
        <div className="dashboard">
          <ChatContainer user={user} />
          <div className="swiper-container">
            <div className="card-container">
              {filteredUsers.map((user) => (
                <TinderCard
                  className="swipe"
                  key={user.user_id}
                  onSwipe={(dir) => swiped(dir, user.user_id)}
                  onCardLeftScreen={() => outOfFrame(user.name)}
                >
                  <div
                    style={{ backgroundImage: "url(" + user.url + ")" }}
                    className="card"
                  >
                    <h3>
                      {user.name + ", Age: "}
                      {user.age}
                    </h3>
                    <h3>{user.about}</h3>
                  </div>
                </TinderCard>
              ))}
              {/* <div className="swipe-info">
                {lastDirection ? <p>You swiped {lastDirection}</p> : <p />}
              </div> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
