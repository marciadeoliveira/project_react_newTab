import React, { useEffect, useState } from 'react';
import Modal from './components/Modal/index';

function App(){
  const api = `https://www.mocky.io/v2/5d531c4f2e0000620081ddce`;
  const[ user, setUser ] = useState([])

  async function getApi(){
    const res = await fetch(api);
    const userApi = await res.json()
    const array=[]
    userApi.map(item =>  array.push({
      ...user,
      id: item.id,
      img: item.img,
      name: item.name,
      username: item.username,
    }))
    setUser([...array])
  }

  useEffect(() => {
    getApi()
  },[])
  console.log(user, 'esse é o User')
  return(
    <>
    <div>
      {
       user.map((item, index )=> 
       <div key={index}>
         <div>{[item.id]}</div>
         <div>{[item.name]}</div>
         <div>{[item.username]}</div>
         <img src={[item.img]} alt="images"/>
         <button>Pagar</button>
       </div>
       )

      }

    </div>

    <Modal />
    </>
)}
export default App;
