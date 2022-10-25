import CurrencyInput from 'react-currency-input';
import "./styles.css"

function Modal(props){
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

  return(
    /* Essa funçao handleOutsideClick, é para fechar a Modal quando clicar fora da conatiner  */
    <div className='modal' id='modal' onClick={handleOutsideClick}>
      <div className='modal__container'>
        {/* Ao clicar n o x dentro do container fechamos a modal*/}
        <button className='close' onClick={props.onClose}></button>
        <form className='form__modal'>
          <div  className='modal__title'>Pagamento e listagem de cartões</div>
          <div className='modal__name'> Pagamento para {[props.payment[0]]} </div>
           {/* Instalei o Currency Input para fazer a mascara de moeda*/}
          <CurrencyInput
            className="modal__value"
            prefix="R$"
            decimalslimit="2"
            decimalSeparator=","
            thousandSeparator="."
          />
          <select className="Modal__select">
            {
              //Percorrer a let cards para gerar options e trazer apenas os últimos quatronumeros do cartão
              cards.map((item,index)=>
                <option value={item} key={index}>
                  Cartão com final {item.card_number.slice(12)}
                </option>
              )
            }
          </select>
          <button onClick={(e)=>{
            e.preventDefault() 
            console.log('clicou')
            }} 
            className='modal__button'
          >
            Pagar
          </button>
        </form>
      </div>
    </div>
  )

}

export default Modal;