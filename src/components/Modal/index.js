import { useState } from 'react';
import CurrencyInput from 'react-currency-input';
import "./styles.css"

function Modal(props){
  const [sendPayment, setSendPayment] = useState()
  const api = `https://run.mocky.io/v3/533cd5d7-63d3-4488-bf8d-4bb8c751c989`;
  let cards = [
    // valid card
    {
      card_number: '1111111111111111',
      cvv: 789,
      expiry_date: '01/18',
    },
    // invalid card
    {
      card_number: '4111111111111234',
      cvv: 123,
      expiry_date: '01/20',
    },
  ];
  /* Ao clicar fora do container, vamos alterar o valor da show modal para false, conforme 
    o que passamos por atributo lá, assim volatamos a ficar com o layout de usuário visivel*/
  function handleOutsideClick(e){
    if(e.target.id === 'modal')
     props.onClose()
  }
  /* função para realizar o pagamento */
  function addPayment(e){
    e.preventDefault()
    const amount = document.querySelector('#modal__value').value
    const card  = document.querySelector('#modal__select').value
    /* se o cartão for o final x, adiciona esses dados à const sendPayment, 
    senão adiciona outros dados e depois manda a conts sendPayment, através do méwtodo POST
    para avaliar se pagamento foi realizado com suucesso ou não */
    if(card === cards[0].card_number){
      setSendPayment({
        name: props.payment[0],
        card_number: card,
        amount: amount,
        cvv: cards[0].cvv,
        expiry_date: cards[0].expiry_date
      })
      } else{
      setSendPayment({
        name: props.payment[0],
        card_number: card,
        amount: amount,
        cvv: cards[1].cvv,
        expiry_date: cards[1].expiry_date
      })
    }
    fetch(api,{
      method: "POST",
      headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendPayment),
    }).then((res)=>{
      return res.json()
    }).then((data)=>{
      if(data.success){
        console.log( 'pagamento aprovado para')
      } else{
        console.log( 'pagamento reprovado')
      }
    }).catch((err)=>{
       console.log(err)
    })
  }
  return(
    /* Essa funçao handleOutsideClick, é para fechar a Modal quando clicar fora da conatiner  */
    <div className='modal' id='modal' onClick={handleOutsideClick}>
      <div className='modal__container'>
        {/* Ao clicar n o x dentro do container fechamos a modal*/}
        <button className='close' onClick={props.onClose}></button>
        <form className='form__modal'>
          <div className= "modal__title">Pagamento e listagem de cartões</div>
          <div className='modal__name' id='modal__name'> Pagamento para {[props.payment[0]]} </div>
           {/* Instalei o Currency Input para fazer a mascara de moeda*/}
          <CurrencyInput
            className="modal__value"
            id='modal__value'
            prefix="R$"
            decimalslimit="2"
            decimalSeparator=","
            thousandSeparator="."
          />
          <select className="modal__select" id="modal__select">
            {
              //Percorrer a let cards para gerar options e trazer apenas os últimos quatronumeros do cartão
              cards.map((item, index)=>
                <option value={item.card_number} key={index}>
                  Cartão com final {item.card_number.slice(12)}
                </option>
              )
            }
          </select>
          <button onClick={addPayment} className='modal__button'>Pagar</button>
        </form>
      </div>
    </div>
  )

}

export default Modal;