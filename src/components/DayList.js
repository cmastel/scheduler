import React from 'react';
import DayListItem from './DayListItem'

export default function DayList(props) {
  const { days, day: dayProp, setDay } = props;

  const renderDays = days.map(day => 
    <DayListItem 
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === dayProp}
      setDay={() => setDay(day.name)} />
  )

  return (
    <ul>
      {renderDays}
    </ul>
  )
}
  