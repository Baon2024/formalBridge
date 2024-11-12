import { useNavigate } from "react-router-dom";
import styles from './ticketCard.module.css';




function TicketCard({ticket}) {

    const { formalTicketCollege, formalTicketCollegeBackgroundImage, formalTicketDietary, formalTicketDate, formalTicketTime, formalEventName, formalTicketPrice, formalTicketID } = ticket;
    
    //console.log("data from ticketCard", formalTicketCollege, formalTicketCollegeBackgroundImage, formalTicketDietary, formalTicketDate, formalTicketTime, formalEventName, formalTicketPrice, formalTicketID);
    console.log("the formalTicketCollegeBackgroundImage currently is: ", formalTicketCollegeBackgroundImage);
    
    const formalTicketCollegeBackgroundImageURL = formalTicketCollegeBackgroundImage?.url;
    console.log(formalTicketCollegeBackgroundImageURL);

    console.log("This is your formalTicketID to be used for navigation: ", formalTicketID);
    const navigate = useNavigate();
    function handleClick() {
        navigate(`/ticketPage/${formalTicketID}`);
        console.log("You are navigating to: ", `/ticketPage/${formalTicketID}`);
    }
    //need to create this in react router, '/TicketPage/:name' and on the TicketPage
    //define width - to make each card a percentage of container boundary - 25%?

    //need to add the css styling for the card

    //crucial to add the localhost address for the media URL: see below

    return (
      <div className={styles.cardContainer} onClick={handleClick} key={formalTicketID}>
        <img src={formalTicketCollegeBackgroundImageURL ? `http://localhost:1337/${formalTicketCollegeBackgroundImageURL}` : 'public/queens.jpeg'} alt="Background" className={styles.cardImage} />
        <div className={styles.tagsContainer}>
          <div className={styles.tagPrice}>{`£${formalTicketPrice}`}</div>
          <div className={styles.tagDietary}>{formalTicketDietary}</div>
        </div>
        <div className={styles.content}>
          <div className={styles.title}>{formalEventName}</div>
          <div className={styles.subtitle}>{formalTicketCollege}</div>
        </div>
        <div className={styles.tagsContainerBottom}>
          <div className={styles.tagDate}>{formalTicketDate}</div>
          <div className={styles.tagTime}>{formalTicketTime}</div>
        </div>
      </div>
    )
}

export default TicketCard;