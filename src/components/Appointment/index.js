import React from 'react';
// import InterviewerListItem from './InterviewerListItem'
import "components/Appointment/styles.scss";
const classNames = require('classnames')

export default function Appointment(props) {
  const appointmentClass = classNames({
    "appointment": true,

  })

  return (
    <article className="appointment">

    </article>
  );
}