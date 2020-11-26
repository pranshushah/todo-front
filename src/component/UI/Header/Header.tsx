import React from 'react';
import Styles from './Header.module.scss';
interface headerProps extends React.InputHTMLAttributes<HTMLHeadingElement> {
  displayTitle: string;
}

function Header({ displayTitle, ...props }: headerProps) {
  return (
    <h1 className={Styles.headingHeader} {...props}>
      {displayTitle}
    </h1>
  );
}

export default Header;
