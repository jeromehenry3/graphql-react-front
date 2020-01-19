import React from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../context/auth-context';

import './MainNav.css';

const MainNav = ({ props }) => (
    <AuthContext.Consumer>
        {(context) => {

            return (<header>
                <nav>
                    <ul>
                        <li>
                            <NavLink to="/" exact>accueil</NavLink>
                        </li>
                        {!context.token && <li>
                            <NavLink to="/auth">login</NavLink>
                        </li>}
                        <li>
                            <NavLink to="/events">évènements</NavLink>
                        </li>
                        {context.token && (
                            <>
                                <li>
                                    <NavLink to="/bookings">reservations</NavLink>
                                </li>
                                <li>
                                    <button className="nav-button" onClick={context.logout}>déconnexion</button>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </header>)
        }}
    </AuthContext.Consumer>
);

export default MainNav;