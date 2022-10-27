import "./styles.css"
function Message(props){
  function handleOutside(e){
    if(e.target.id === false){
      props.onCloseMessage()
    }
  }
  return(
    <>
    <div className="container__message" onClick={handleOutside} >
      <div className="message__title">Recibo de Pagamento</div>
        <div className="msg">
        <div className="msg__final">{props.message}</div>
          <div className="msg__transaction">
            <p>Em nome de: {props.sendPayment.name} - </p>
            <p>Valor: {props.sendPayment.amount} - </p>
            <p>Cartão final:{props.sendPayment.card_number.slice(12)}</p>
          </div>
          <button className="msg__button" onClick={props.closeMessage}>Fechar</button>
        </div>
    </div>
    </>
  )
}

export default Message;