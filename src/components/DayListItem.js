import React from 'react';

import "components/DayListItem.scss";
const classNames = require('classnames')

export default function DayListItem(props) {
  
  let dayClass = classNames({
    "day-list__item": true,
    "day-list__item--selected": props.selected === true,
    "day-list__item--full": props.spots === 0,
  })

  const formatSpots = function(spots) {
    if (spots === 1) {
      return '1 spot';
    }
    return (spots === 0 ? 'no spots' : `${spots} spots`);
  }
  
  return (
    <li 
      className = {dayClass}
      onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)} remaining</h3>
    </li>
  );
}