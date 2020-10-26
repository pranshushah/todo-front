import React from 'react';
import Styles from './Header.module.scss';
type headerProps = {
  title: string;
};

function Header({ title }: headerProps) {
  return <h1 className={Styles.headingHeader}>{title}</h1>;
}

export default Header;
