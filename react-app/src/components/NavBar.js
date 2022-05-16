
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import AddPostForm from './AddPostComponent/AddPostComponent'

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-ul">
        <li className="nav-item" id="navbar-logo">
          <NavLink to='/' exact={true} activeClassName='active'>
            <img src="/mare-nostrum-logo.png" alt="Mare Nostrum logo"/>
          </NavLink>
        </li>
        <li className="nav-item" id="navbar-home">
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li className="nav-item" id="navbar-login">
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li className="nav-item" id="navbar-signup">
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li>
        <li className="nav-item" id="navbar-users">
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
        <li className="nav-item" id="navbar-logout-button">
          <LogoutButton />
        </li>
        <li>
        <AddPostForm />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
