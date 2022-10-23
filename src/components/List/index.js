import React, { useEffect, useState } from 'react';
import "./styles.css"

function List() {
  const api = `https://www.mocky.io/v2/5d531c4f2e0000620081ddce`;
  const[ user, setUser ] = useState([])

  useEffect(() => {
    getApi()
  },[])

  async function getApi(){
    const res = await fetch(api);
    const userApi = await res.json()
    const userData = []
    userApi.map(item =>  userData.push({
      ...user,
      id: item.id,
      img: item.img,
      name: item.name,
      username: item.username,
    }))
   setUser([...userData])
  } 
return(
  <>
     <h1>Lista de Usuários</h1>
    <div className='list'>
    {
      user.map((item, index )=> 
        <div className='listItem' key={index}>
          <div className='listUser'>
            <img src={[item.img]} alt="images"/>
            <div className='listName'>
              <div>{[item.name]}</div>
              <div className='listId'>
                <div>ID: {[item.id]}</div>
                <div className='listUsername'>Username: {[item.username]}</div>
              </div>
            </div>
          </div>
          <div className='listButton'>
            <button>Pagar</button>
          </div>
        </div>
      )
    }
    </div>
  </>
  )
}

export default List;