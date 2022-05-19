import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import Popup from 'reactjs-popup';
import LoginForm from '../../components/auth/LoginForm'
import SignUpForm from '../../components/auth/SignUpForm'
import ig_splash1 from '../../images/ig-splash-1.png'
import ig_splash2 from '../../images/ig-splash-2.png'
import ig_splash3 from '../../images/ig-splash-3.png'
import github from '../../images/github.png'
import linkedin from '../../images/linkedin.png'
import { login } from '../../store/session';
import './SplashPage.css'



const SplashPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      history.push('/feed')
    }
  };

  const demoUser = (e) => {
    e.preventDefault();
    dispatch(login("demo@aa.io", "password"));
    history.push('/feed')
  }
  return (
    <div>
      <div className="container">
        <div className="splash-image">
          <h1>Splash Page</h1>
          <img src={ig_splash1} alt="slideshow 1" />
        </div>
        <div>
          <Popup trigger={<button>Login</button>} modal>
            <div className="modal">
              <div className="content">
                <LoginForm />
              </div>
            </div>
          </Popup>
          <Popup trigger={<button>Signup</button>} modal>
            <div className="modal">
              <div className="content">
                <SignUpForm />
              </div>
            </div>
          </Popup>
          <button className="btn-demo" onClick={demoUser}>Demo</button>
        </div>
      </div>
      <footer>
        <p>Developed by Roger Camps</p>
        <div>
          <a href="https://github.com/rogercamps" target="_blank" rel="noopener noreferrer">
            <img border="0" alt="Github" src={github} className="social" />
          </a>
        </div>
        <div>
          <a href="https://www.linkedin.com/in/rogercamps/" target="_blank" rel="noopener noreferrer" >
            <img border="0" alt="Linkedin" src={linkedin}  className="social" />
          </a>
        </div>
      </footer>
    </div>
  )
}

export default SplashPage;
