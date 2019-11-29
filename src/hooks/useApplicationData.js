import React, { useEffect, useReducer } from "react";
const axios = require("axios").default;


export default function useApplicationData() {
  
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return { 
          ...state, 
          day: action.day 
        }
      case SET_APPLICATION_DATA:
        return { 
          ...state, 
          days: action.days,
          appointments: action.appointments,
          interviewers: action.interviewers
        }
      case SET_INTERVIEW:
        return {
          ...state,
          appointments: action.appointments,
          days: action.newDays,
         }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => dispatch({ type: SET_DAY, day });

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ]).then(res => {
      dispatch({ 
        type: SET_APPLICATION_DATA, 
        days: res[0].data, 
        appointments: res[1].data,
        interviewers: res[2].data
      });
    });
  }, []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const dayIndex = Math.floor((id - 1)/ 5)
    const newSpots = state.days[dayIndex].spots - 1;
    const newDays = [
      ...state.days.slice(0, (dayIndex)), 
      { ...state.days[dayIndex], spots: newSpots },
      ...state.days.slice((dayIndex + 1))
    ]     
    return axios.put(`http://localhost:8001/api/appointments/${id}`, 
      {interview: appointment.interview}
    )
    .then(() => {
      dispatch({
        type: SET_INTERVIEW,
        appointments,
        newDays,
      });
    });
  };

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then(() => {
      dispatch({
        type: SET_INTERVIEW,
        appointments,
        spotChange: 1,
      });
    });
  };

  return { state, setDay, bookInterview, cancelInterview }

}