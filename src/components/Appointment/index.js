import React from 'react';

import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";


const classNames = require('classnames')

export default function Appointment(props) {
  const appointmentClass = classNames({
    "appointment": true,

  })

  let toDisplay = '';
  (props.interview ? 
    toDisplay = <Show 
      student={props.interview.student} 
      interviewer={props.interview.interviewer}/> : 
    toDisplay = <Empty />);

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {toDisplay}
    </article>
  );
}