import {NavLink} from 'react-router-dom';
import React from 'react';

type PropsType = { path: string, title: string }

export const NavBarLink: React.FC<PropsType> = ({path, title}) => {

    const activeStyle = {
        color: 'gold',
        fontWeight: 'bold',
        textDecoration: 'none',
    };
    const defaultStyle = {
        color: 'white',
        textDecoration: 'none',
    };

    return (
        <div>
            <NavLink to={path} style={({isActive}) => isActive ? activeStyle : defaultStyle}>
                {title}
            </NavLink>
        </div>)
}