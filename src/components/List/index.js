import React, { useEffect, useState } from 'react';
import "./styles.css"
import Modal from '../Modal/index';
import load from '../../assets/loading.png'

function List() {
  const api = `https://www.mocky.io/v2/5d531c4f2e0000620081ddce`;
  const [user, setUser] = useState([])
  const [payment, setPayment] = useState()
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getApi() 
  },[])

  // função para acessar uma api externa
  async function getApi(){
    setLoading(true);
    const res = await fetch(api);
    const userApi = await res.json()
    const userData = []
    /*percorro os dados que vieram da api e insiro no array, 
      que será setado na const user, através do state*/
    userApi.map(item =>  userData.push({
      ...user,
      id: item.id,
      img: item.img,
      name: item.name,
      username: item.username,
    }))
    setLoading(false);
   setUser([...userData])
   
  } 
  return(
  <>
  <div className='container__list'>
      { 
    /* o showModal for false, o layout visivel será a lista de usuários, 
      caso contrário, será o layout do modal*/
      !showModal ?
      <div className='list'>
        <div className='list__title'>Lista de Usuários</div>
          { 
            loading ?
             <div className='loading'>
                <img className='loading__img' src={load} alt='loading'/>
                ... Loading
             </div>
            : ''
          }
        {
          /* vamos percorrer a const user, que recebeu os dados dos usuários para 
            criar a lista na página principal, com nome, imagem e nome de usuário */
          user.map((item, index )=> 
            <div className='list__item' key={index}>
              <div className='list__user'>
                <img src={[item.img]} alt="images"/>
                <div className='list__name'>
                  <div>{[item.name]}</div>
                  <div className='list__id'>
                    <div>ID: {[item.id]}</div>
                    <div className='list__username'>Username: {[item.username]}</div>
                  </div>
                </div>
              </div>
              <div className='list__button'>
                <button className='button' onClick={()=>{ 
                  /*Ao clicar no botão pagar,vamos inserir na const payment , 
                    o nome do usuário, id, username e para que possamos mandar 
                    como atributo para o Modal onde será criada a prop */ 
                  setPayment([item.name, item.username, item.id])
                  /*Ao escolher o usuário, trocamos o valor da const showModal, 
                  para que o layput do modal fique visivel*/
                  setShowModal(true)}}
                >
                  Pagar
                </button>
              </div>
            </div>
          )
    }
  </div>
  :
    <Modal payment={payment} setPayment={setPayment} setShowModal={setShowModal} onClose={()=>setShowModal(false)}/>
    /*Aqui estou passando como atributo a const payment e setPayment com os 
      dados do usuário. E estou criando uma função onClose que vai chamar o 
      setShowModal, aletrando o valor do showModal para false, e deixando 
      assim o layout da pagina com usuários visível */
  }
  </div>
  </>
  )
}

export default List;