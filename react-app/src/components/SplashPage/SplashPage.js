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
import marenostrum_logo from '../../images/mare-nostrum-logo.png'
import { login } from '../../store/session';
import './SplashPage.css'




const SplashPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  // const onLogin = async (e) => {
  //   e.preventDefault();
  //   const data = await dispatch(login(email, password));
  //   if (data) {
  //     setErrors(data);
  //   } else {
  //     history.push('/feed')
  //   }
  // };

  const demoUser = (e) => {
    e.preventDefault();
    dispatch(login("demo@aa.io", "password"));
    history.push('/feed')
  }
  return (
    <div>
      <div className="container">
        <section className="splash-mid-section">
          <div className="splash-image-div">
            <img src={ig_splash1} className="splash-image" alt="slideshow 1" />
          </div>
          <div className="login-signup-div">
            <div className="splash-logo-div">
              <img src={marenostrum_logo} className="splash-logo" alt="logo" />
            </div>
            <Popup trigger={<button className="splash-btn">Login</button>} modal>
              <div className="modal">
                <div className="content">
                  <LoginForm />
                </div>
              </div>
            </Popup>
            <Popup trigger={<button className="splash-btn">Signup</button>} modal>
              <div className="modal">
                <div className="content">
                  <SignUpForm />
                </div>
              </div>
            </Popup>
            <button className="btn-demo splash-btn" onClick={demoUser}>Demo user</button>
            <div>
              <p>
                This ocean themed app, is an Instagram inspired project to showcase my learnings at <a href="http://appacademy.io" target="_blank" rel="noopener noreferrer">App Academy</a>.
              </p>
              <p>
                Mare Nostrum, from the latin "our sea", was the name the Romans gave the Mediterranean. This is the sea I grew up with and made me develop the love for all seas.
              </p>
            </div>
          </div>
        </section>
        <section>
          {/* <h5>
          This ocean themed app, is an Instagram inspired project to showcase my learnings at <a href="http://appacademy.io">App Academy</a>.
          Mare Nostrum, from the latin "our sea" was the name the Romans gave the Mediterranean. This is the ocean I grew up with and made me develop the love for all seas.
          </h5> */}
        </section>
      </div>
      <div className="foot-div">
        <footer>
          <p>Developed by Roger Camps</p>
          <div>
            <a href="https://github.com/rogercamps" target="_blank" rel="noopener noreferrer">
              <img border="0" alt="Github" src={github} className="social" />
            </a>
          </div>
          <div>
            <a href="https://www.linkedin.com/in/rogercamps/" target="_blank" rel="noopener noreferrer" >
              <img border="0" alt="Linkedin" src={linkedin} className="social" />
            </a>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default SplashPage;
