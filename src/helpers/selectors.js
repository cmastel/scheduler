// returns an array of appointments for a given day
export function getAppointmentsForDay(state, day) {
  let returnDay = [];
  for (let eachDay of state.days) {
    if (day === eachDay.name) {
      const appointments = eachDay.appointments;
      for (let eachAppointment of appointments) {
        returnDay.push(state.appointments[eachAppointment]);
      }
    }
  }
  return returnDay;
}

// returns an object containing the interview details for a given id
export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  let returnInterview = {};
  const interviewerId = interview.interviewer;
  const interviewerDetails = state.interviewers[interviewerId];
  returnInterview = {
    student: interview.student,
    interviewer: interviewerDetails
  };
  return returnInterview;
}

// returns an array with the interviewers available for a given day
export function getInterviewersForDay(state, day) {
  let returnDay = [];
  for (let eachDay of state.days) {
    if (day === eachDay.name) {
      const interviewers = eachDay.interviewers;
      for (let eachAppointment of interviewers) {
        returnDay.push(state.interviewers[eachAppointment]);
      }
    }
  }
  return returnDay;
}
