import DatePicker from 'react-datepicker';
import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import Styles from './AddDueDate.module.scss';

type CustomInputProps = {
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

function CustomInput({ onClick }: CustomInputProps) {
  return (
    <div className={Styles.textContainer} onClick={onClick}>
      <span className={Styles.text}>Add Due Date</span>
    </div>
  );
}

type DueDateProps = {
  changeHandler: (date: Date) => Promise<void>;
};

export default function DueDatePicker({ changeHandler }: DueDateProps) {
  return (
    <DatePicker
      onChange={changeHandler}
      selected={null}
      customInput={<CustomInput />}
      minDate={new Date()}
    />
  );
}
