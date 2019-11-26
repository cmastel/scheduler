import React from 'react';
import InterviewerListItem from './InterviewerListItem'
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  const { interviewers, interviewer: idProp, setInterviewer } = props;

  const renderInterviewers = interviewers.map(interviewer => 
    <InterviewerListItem 
      key={idProp}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === idProp}
      setInterviewer={() => setInterviewer(idProp)} />
  )

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {renderInterviewers}
      </ul>
    </section>
  )
}