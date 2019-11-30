import React from 'react';
import { NavLink } from 'react-router-dom';

import './MainNav.css';

const MainNav = ({ props }) => (
    <header>
        <nav>
            <ul>
                <li>
                    <NavLink to="/" exact>accueil</NavLink>
                </li>
                <li>
                    <NavLink to="/auth">login</NavLink>
                </li>
                <li>
                    <NavLink to="/events">évènements</NavLink>
                </li>
                <li>
                    <NavLink to="/bookings">reservations</NavLink>
                </li>
            </ul>
        </nav>
    </header>
);

export default MainNav;