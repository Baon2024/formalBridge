import { NavLink } from "react-router-dom";
import styles from './navigationBar.module.css';
import React from "react";
import avatarImage from './generic-avatar.svg';

//need to nail the header styling - do the font size, color, font family
//import the UI icon for user-stuff

//can't do the User link until authentication is set up
//would be something like "/users/${currentUser}" here, and "/users/:name" in the react router

//style the nav words - cursive for title, get materuial UI element for user

function NavigationBar() {

    return (
        <div className={styles.HeaderStyling}>
            <div className={styles.NavigationBarStyling}>
                <NavLink>
                    <button className={styles.customButton}>
                        FAQ
                    </button>
                </NavLink>
                <NavLink
                to="/"
                id={styles.title}
                className={ ({ isActive }) => isActive? `${styles.activeNavLink}` : `${styles.inactiveNavLink}`}
                >FormalBridge</NavLink>
                <NavLink
                id={styles.icon}
                className={ ({ isActive }) => isActive? `${styles.activeNavLink}` : `${styles.inactiveNavLink}`}
                >
                  <div className={styles.trial}>
                    <img 
                      src={avatarImage}
                      alt="Generic Avatar"
                      className={styles.avatarImage}
                      />
                  </div>
                </NavLink>
            </div>
        </div>
    )
}

export default NavigationBar;

//should be possible to dictate icon color, based on whether isLoggedIn is true or not
//should hvae inverse colors - purplse outline, when not notLoggedIn