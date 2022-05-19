
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import AddPostForm from './AddPostComponent/AddPostComponent'
import { useSelector, useDispatch } from 'react-redux';
import logo from '../images/mare-nostrum-logo.png'
import home_logo from '../images/Home.png'
import profile_icon from '../images/Profile.png'


const NavBar = () => {

  const sessionUser = useSelector(state => state.session.user)



  return (
    <>
    { sessionUser &&
    <nav className="navbar">
      <ul className="nav-ul">
        <li className="nav-item" id="navbar-logo">
          <NavLink to='/feed' exact={true} activeClassName='active'>
            <img src={logo} alt="Mare Nostrum logo" />
          </NavLink>
        </li>
        <li className="nav-item" id="navbar-home">
          <NavLink to='/feed' exact={true} activeClassName='active'>
            <img src={home_logo} alt="Home" />
          </NavLink>
        </li>
        <li>
        <p><img src={profile_icon} alt="profile" />{sessionUser?.username}</p>
        </li>
        <li>
          <AddPostForm />
        </li>
        <li className="nav-item" id="navbar-logout-button">
          <LogoutButton />
        </li>
      </ul>
    </nav>
    }</>
  );
}

export default NavBar;

// {/* <li className="nav-item" id="navbar-login">
//   <NavLink to='/login' exact={true} activeClassName='active'>
//     Login
//   </NavLink>
// </li>
// <li className="nav-item" id="navbar-signup">
//   <NavLink to='/sign-up' exact={true} activeClassName='active'>
//     Sign Up
//   </NavLink>
// </li> */}
