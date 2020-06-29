import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from '../context/userContext';

const PageLayout = (props) => {
    const user = useContext(UserContext);

    return (
        <>
            <header>
                <nav>
                    <ul>
                        <li>
                            <NavLink to="/">Posts</NavLink>
                        </li>
                        <li>
                            <NavLink to="/profile">Profile</NavLink>
                        </li>
                    </ul>
                </nav>

                <div>
                    {user.first_name}
                </div>
            </header>
            <main>
                {props.children}
            </main>
            <footer>
                Footer
            </footer>
        </>
    );
};

export default PageLayout;
