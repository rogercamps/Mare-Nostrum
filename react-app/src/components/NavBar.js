
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import AddPostForm from './AddPostComponent/AddPostComponent'
import { useSelector, useDispatch } from 'react-redux';
import logo from '../images/mare-nostrum-logo.png'
import ig_logo from '../images/ig-home-icon.png'

const NavBar = () => {

  const sessionUser = useSelector(state => state.session.user)



  return (
    <>
    { sessionUser &&
    <nav className="navbar">
      <ul className="nav-ul">
        <li className="nav-item" id="navbar-logo">
          <NavLink to='/feed' exact={true} activeClassName='active'>
            {/* <img src="react-app/src/images/mare-nostrum-logo.png"/> */}
            <img src={logo} alt="Mare Nostrum logo" />
          </NavLink>
        </li>
        <li className="nav-item" id="navbar-home">
          <NavLink to='/feed' exact={true} activeClassName='active'>
            {/* <img src="/ig-home-icon.png" alt="Home"/> */}
            <img src={ig_logo} alt="Home" />
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
    }</>
  );
}

export default NavBar;
