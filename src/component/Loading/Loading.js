import React from 'react';
import Logo from '../../asset/logo.png';
import Styles from './Loading.module.scss';
export default function Loading() {
  return (
    <div className={Styles.container}>
      <img src={Logo} alt='logo' className={Styles.logo} />
      <div className={Styles.loader} />
    </div>
  );
}
