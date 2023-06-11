/* eslint-disable no-unused-vars */
import TinderCard from 'react-tinder-card';
import { useEffect, useState } from 'react';
import ChatContainer from '../components/ChatContainer';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const Dashboard = () => {
  const db = [
    {
      name: 'Richard Hendricks',
      url: 'https://images.pexels.com/photos/7752789/pexels-photo-7752789.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      name: 'Erlich Bachman',
      url: 'https://images.pexels.com/photos/5046669/pexels-photo-5046669.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      name: 'Monica Hall',
      url: 'https://images.pexels.com/photos/7514959/pexels-photo-7514959.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      name: 'Jared Dunn',
      url: 'https://images.pexels.com/photos/7112208/pexels-photo-7112208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      name: 'Dinesh Chugtai',
      url: 'https://images.pexels.com/photos/7101908/pexels-photo-7101908.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  ];
  const [user, setUser] = useState();
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  const userId = cookies.UserId;

  const getUser = async () => {
    try {
      const response = await axios.get('http://localhost:3000/user', {
        params: { userId },
      });
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };




  useEffect(() => {
    getUser();
  }, []);

  console.log('user', user);

  const characters = db;
  const [lastDirection, setLastDirection] = useState();

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete);
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!');
  };

  return (
    <>
      {user && (
        <div className='dashboard'>
          <ChatContainer user={user} />
          <div className='swiper-container'>
            <div className='card-container'>
              {characters.map((character) => (
                <TinderCard
                  className='swipe'
                  key={character.name}
                  onSwipe={(dir) => swiped(dir, character.name)}
                  onCardLeftScreen={() => outOfFrame(character.name)}
                >
                  <div
                    style={{ backgroundImage: 'url(' + character.url + ')' }}
                    className='card'
                  >
                    <h3>{character.name}</h3>
                  </div>
                </TinderCard>
              ))}
              <div className='swipe-info'>
                {lastDirection ? <p>You swiped {lastDirection}</p> : <p />}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
