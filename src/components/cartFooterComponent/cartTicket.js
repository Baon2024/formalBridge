import styles from './cartTicket.module.css'

function CartTicket({ticket, removeTicketFromCartHandler, key}) {




    return (
        <>
        <div onClick={() => removeTicketFromCartHandler(ticket)}  value={ticket} className={styles.cartTicket}>
          <span>{ticket.formalTicketCollege}</span>
        </div>
        </>
    )
}

export default CartTicket;