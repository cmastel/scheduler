import React from 'react';
import DayListItem from './DayListItem'

export default function DayList(props) {
  const { days } = props;

  const renderDays = days.map(day => <DayListItem {...day} />)
    return (
      <section class="days-container">
        {renderDays}
      </section>
    )
  }
  