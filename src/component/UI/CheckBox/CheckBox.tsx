import React from 'react';
import Styles from './CheckBox.module.scss';

interface checkboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  small?: boolean;
}

function CheckBox({ small, ...props }: checkboxProps) {
  const id = Math.random().toString();
  return (
    <div>
      <input
        id={id}
        type='checkbox'
        {...props}
        className={Styles.inputCheckBox}
      />
      <label
        htmlFor={id}
        className={small ? Styles.smallCheckBox : Styles.checkBox}
      />
    </div>
  );
}

export default CheckBox;
