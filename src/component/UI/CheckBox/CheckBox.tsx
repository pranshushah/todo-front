import React from 'react';
import Styles from './CheckBox.module.scss';

function CheckBox(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const id = Math.random().toString();
  return (
    <div>
      <input
        id={id}
        type='checkbox'
        {...props}
        className={Styles.inputCheckBox}
      />
      <label htmlFor={id} className={Styles.checkBox} />
    </div>
  );
}

export default CheckBox;
