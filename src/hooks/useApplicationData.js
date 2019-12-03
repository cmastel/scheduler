import React, { useEffect, useReducer } from "react";
import axios from 'axios';
if (process.env.NODE_ENV !== 'test'){
  axios.create({ baseURL: 'http://localhost:8001'})
}

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
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(res => {
      console.log('res', res)
      dispatch({ 
        type: SET_APPLICATION_DATA, 
        days: res[0].data, 
        appointments: res[1].data,
        interviewers: res[2].data
      });
    });
  }, []);

  function getNewDays(dayChange) {
    const dayName = state.day;
    const dayIndex = state.days.findIndex((element) => element.name === dayName);
    const newSpots = state.days[dayIndex].spots + dayChange;
    const newDays = [
      ...state.days.slice(0, (dayIndex)), 
      { ...state.days[dayIndex], spots: newSpots },
      ...state.days.slice((dayIndex + 1))
    ]   
    return newDays;
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const newDays = getNewDays(-1); 
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
    const newDays = getNewDays(1)
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then(() => {
      dispatch({
        type: SET_INTERVIEW,
        appointments,
        newDays,
      });
    });
  };

  return { state, setDay, bookInterview, cancelInterview }
}