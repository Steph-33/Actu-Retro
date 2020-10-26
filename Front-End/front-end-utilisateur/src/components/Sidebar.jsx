import React from 'react'; 
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import UserCard from './UserCard';

export default function Sidebar() {
    return (
        <Menu>
            <Link className="header-link" to="/">ACCUEIL</Link>
            <Link className="header-link">ACTURETRO C'EST QUOI ? </Link>
            <Link className="header-link">ACTURETRO C'EST QUI ? </Link>
            <UserCard />
            <div></div>
            <Link className="header-link">CONTACT</Link>
        </Menu>
    )
}
