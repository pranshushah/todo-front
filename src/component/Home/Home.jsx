import React from 'react';
import Styles from './Home.module.scss';
import logo from '../../asset/logo.png';
import Banner from '../../asset/welcome-center.png';
import GoogleButton from '../UI/GoogleButton/GoogleButton.jsx';
import TwitterButton from '../UI/TwitterButton/TwitterButton.jsx';
export function Home() {
  return (
    <div className={Styles.container}>
      <img className={Styles.logo} src={logo} alt='logo of company' />
      <h1 className={Styles.heading}>Task Manager By Pranshu Shah</h1>
      <img className={Styles.banner} src={Banner} alt={'banner'} />
      <GoogleButton />
      <TwitterButton />
    </div>
  );
}
